import { AttachMoneyTwoTone } from "@material-ui/icons";
import { isArray, map } from "lodash";
import { ReactNode } from "react";
import {
  Create,
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
  useGetOne,
  useEditContext,
  useRecordContext,
  useGetManyReference,
} from "react-admin";
import {
  QueryClient,
  QueryClientProvider,
  QueryFunctionContext,
  useQuery,
} from "react-query";
import { useParams } from "react-router-dom";
import { fetchRelation } from "../utility";
import {
  BaseInformationArea,
  PricesArea,
  StockArea,
  transform,
  UnitArea,
  VariantArea,
} from "./common";

function MaterialEdit(props: any) {
  const opts = {
    ...props,
    transform,
  };

  const queryOptions = {
    select: (data: any) => {

      if (data.category && data.category.id) {
        data.category = data.category.id;
      }

      if (data.unit && data.unit.id) {
        data.unit = data.unit.id;
      }

      if (!isArray(data.properties)) {
        data.properties = [];
      }

      return data;
    },
  };

  return (
    <Edit {...opts} queryOptions={queryOptions}>
      <TabbedForm mode="onChange" reValidateMode="onChange">
        <FormTab label="基本信息" key="basic">
          <BaseInformationArea isEdit={true} props={opts}></BaseInformationArea>
        </FormTab>
        <FormTab label="计量单位" key="units">
          <UnitArea isEdit={true} props={props}></UnitArea>
        </FormTab>
        <FormTab label="其他型号" key="variant">
          <VariantArea isEdit={true} props={props}></VariantArea>
        </FormTab>
        <FormTab label="价格列表" key="prices">
          <PricesArea isEdit={true} props={props}></PricesArea>
        </FormTab>
        <FormTab label="库存" key="stock">
          <StockArea isEdit={true} props={props}></StockArea>
        </FormTab>
      </TabbedForm>
    </Edit>
  );
}

export default MaterialEdit;
