import {
  TextInput,
  SimpleForm,
  RadioButtonGroupInput,
  ReferenceField,
  AutocompleteInput,
  NumberInput,
  ArrayInput,
  SimpleFormIterator,
  TabbedForm,
  FormTab,
  DateInput,
  ReferenceInput,
  Validator,
  ValidationError,
  CheckboxGroupInput,
  BooleanInput,
  FormDataConsumer,
  SelectInput,
  useCreateController,
  Edit,
  Button,
  ListButton,
  ShowButton,
  TopToolbar,
  required,
  useGetList,
  useRecordContext,
  useGetManyReference,
  useEditContext,
  TextField,
  useSimpleFormIterator,
  Loading,
  useGetMany,
  DatagridLoading,
  LoadingIndicator,
  LinearProgress,
  number,
} from "react-admin";
import { validateDuplicateArray, validateName, validateRange, validateTel } from "../../validators/mixin";
import { cloneDeep, compact, get, isEmpty, isNumber, isUndefined, map, pick, toNumber } from "lodash";
import Alert from "@material-ui/lab/Alert";
import { RichTextInput } from "ra-input-rich-text";
import React, { useContext, useState } from "react";
import { canPropertyRemoveById, canPropertyRemoveByName, getParseObjectFromRecord, setNewPointers, setPointer, setRelation } from "../utility";
import Create from "./create";
import Parse from "parse";

interface MaterialComponentProps {
  isEdit: boolean;
  props: any;
}

export const validateUnqinue: Validator = (values: object) => {
  return null;
};

export const transform = (data: any) => {
  const postData = { ...data };

  setPointer(postData, "unit", "unit");
  setPointer(postData, "materialCategory", "category");
  setNewPointers(postData, "material", "units", "unitConversion", (postData) => {
    setPointer(postData, "unit", "unit");
  });
  setRelation(postData, "materialProperty", "properties", "material", "property");

  return postData;
};

export const getUnitIDs = (form: object): string[] => {
  const array = map(compact(get(form, "units") || []), (item) => get(item, "unit"));
  const unit = get(form, "unit");

  return compact([unit, ...array]);
};

export const getUnitFilter = (form: object) => {
  return {
    $proxy: (parse: any) => {
      parse.notContainedIn("objectId", getUnitIDs(form));
    },
  };
};

export const filterTemplate = (filter: string) => ({
  $proxy: (parse: Parse.Query) => {
    parse.notEqualTo("isVariant", true);
  },
});

export const BaseInformationArea = (props: Partial<MaterialComponentProps>) => (
  <FormDataConsumer>
    {({ formData, ...rest }) => (
      <div>
        <TextInput source="name" label="名称" key="name" isRequired validate={validateName} />
        <BooleanInput label="这是一个变体" source="isVariant" disabled={props.isEdit}></BooleanInput>
        {formData.isVariant && (
          <ReferenceInput label="模板" source="variantOf" reference="material" filterToQuery={filterTemplate} isRequired={true}>
            <AutocompleteInput optionText="name" />
          </ReferenceInput>
        )}
        {!formData.isVariant && (
          <ReferenceInput source="category" reference="materialCategory">
            <AutocompleteInput optionText="name" label="分组" isRequired={true} />
          </ReferenceInput>
        )}
        <ReferenceInput disabled source="unit" reference="unit">
          <AutocompleteInput label="默认单位" disabled={formData.isVariant} isRequired={true} optionText="name" />
        </ReferenceInput>
        <RichTextInput source="description" label="备注" />
      </div>
    )}
  </FormDataConsumer>
);

export const VariantArea = ({ isEdit }: Partial<MaterialComponentProps>) => {
  const context = useEditContext();
  const { data } = useGetManyReference("material", {
    id: get(context.record, "id"),
    meta: { field: "properties" },
  });

  if (context && context.record) {
    context.record.properties = data;

    return (
      <FormDataConsumer>
        {({ formData, ...rest }) => {
          return !formData.isVariant ? (
            <div style={{ maxWidth: "460px" }}>
              <BooleanInput label="包含变体" disabled={isEdit && formData.hasVariant} source="hasVariant"></BooleanInput>

              {formData.hasVariant && (
                <ArrayInput source="properties" label="特征">
                  <SimpleFormIterator disableRemove={canPropertyRemoveByName(formData, "properties")}>
                    <FormDataConsumer>
                      {({ getSource, scopedFormData }) => {
                        return (
                          <ReferenceInput record={scopedFormData} source={getSource!("id")} reference="materialProperty">
                            <SelectInput disabled={!isEmpty(scopedFormData && scopedFormData.name)} validate={validateDuplicateArray("properties", "property")} label="属性" optionText="name" isRequired={true} />
                          </ReferenceInput>
                        );
                      }}
                    </FormDataConsumer>
                  </SimpleFormIterator>
                </ArrayInput>
              )}
            </div>
          ) : (
            <div>
              <Alert style={{ maxWidth: 320 }} severity="info">
                要添加变体，请先取消 这是一个变体
              </Alert>
            </div>
          );
        }}
      </FormDataConsumer>
    );
  }
  return null;
};

export const PricesArea = ({ isEdit, props }: Partial<MaterialComponentProps>) => (
  <ArrayInput source="prices">
    <SimpleFormIterator>
      <ReferenceInput source="unit" reference="unit">
        <SelectInput label="单位" optionText="name" />
      </ReferenceInput>

      <TextInput label="原价（元/单位）" source="originalPrice"></TextInput>
      <TextInput label="售价（元/单位）" source="salePrice"></TextInput>
      <TextInput label="租赁价格（元/单位/天）" source="rentPrice"></TextInput>
    </SimpleFormIterator>
  </ArrayInput>
);

export const UnitArea = ({ isEdit, props }: Partial<MaterialComponentProps>) => {
  const context = useEditContext();
  const { data: unitConversions } = useGetList("unitConversion", {
    filter: {
      material: getParseObjectFromRecord("material", context.record),
    },
  });

  if (context && unitConversions) {
    context.record.unitConversions = unitConversions;

    return (
      <FormDataConsumer>
        {({ formData }) => {
          return (
            <ArrayInput source="unitConversions" label="其它单位">
              <SimpleFormIterator disableRemove={canPropertyRemoveById(formData, "units")}>
                <FormDataConsumer>
                  {({ getSource, scopedFormData }) => {
                    console.log(scopedFormData);
                    return (
                      <div>
                        <ReferenceInput record={scopedFormData} source={getSource!("unit.id")} reference="unit">
                          <SelectInput label="单位" validate={validateDuplicateArray("unitConversions", "unit.id")} optionText="name" required />
                        </ReferenceInput>

                        <TextInput type="number" label="转换系数" validate={[number()]} source={getSource!("factor")}></TextInput>
                      </div>
                    );
                  }}
                </FormDataConsumer>
              </SimpleFormIterator>
            </ArrayInput>
          );
        }}
      </FormDataConsumer>
    );
  }

  return <LinearProgress></LinearProgress>;
};

export const StockArea = ({ isEdit }: Partial<MaterialComponentProps>) => <FormDataConsumer>{({ formData, ...rest }) => !formData.hasVariant && <NumberInput source="count" label="期初库存" disabled={formData.hasVariant} />}</FormDataConsumer>;
