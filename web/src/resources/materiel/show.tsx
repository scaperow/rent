import { each, find, get, map, set } from "lodash";
import {
  ArrayField,
  BooleanField,
  ChipField,
  Datagrid,
  FunctionField,
  LinearProgress,
  Loading,
  RaRecord,
  ReferenceArrayField,
  ReferenceField,
  RichTextField,
  Show,
  SimpleShowLayout,
  SingleFieldList,
  TextField,
  useGetList,
  useGetMany,
  useGetManyReference,
  useGetOne,
  useRecordContext,
} from "react-admin";
import { fetchRelation, getParseObjectFromRecord } from "../utility";
import Parse from "parse";

const resource = "material";
function Properties() {
  const record = useRecordContext();
  const { data } = useGetManyReference(resource, {
    id: record?.id,
    meta: { field: "properties" },
  });

  if (record && data) {
    record.properties = data;

    return (
      <ArrayField source="properties">
        <Datagrid>
          <TextField source="name" />
        </Datagrid>
      </ArrayField>
    );
  }

  return <LinearProgress></LinearProgress>;
}

function UnitConversion() {
  const record = useRecordContext();
  const parseObject = getParseObjectFromRecord(resource, record);
  const { data: unitConversions } = useGetList("unitConversion", {
    filter: {
      material: parseObject,
    },
  });

  // console.log(unitConversions);
  // const UnitClass = Parse.Object.extend("unit");
  // if (record && unitConversions) {
  // Promise.all(
  //   map(unitConversions, (unitConversion) => {
  //     // console.log(unitConversion);

  //     return new Promise<void>(async (resolve) => {
  //       const { data } = useGetOne("unit", { id: unitConversion.unit.id });
  //       // if (unitConversion.unit.constructor === Parse.Object) {
  //       // await unitConversion.unit.fetch();
  //       // const unit = unitConversion.unit.toJSON();
  //       // set(unitConversion, "unit", unit);
  //       await unitConversion.fetchWithInclude("unit");
  //       // }
  //       resolve();
  //     });
  //   })
  // ).then(() => {
  if (record && unitConversions) {
    record.unitConversions = unitConversions;
    return (
      <ArrayField source="unitConversions">
        <Datagrid>
          <ReferenceField reference="unit" source="unit.id" label="Name">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="factor" />
        </Datagrid>
      </ArrayField>
    );
  }

  return <LinearProgress></LinearProgress>;
}

function MaterialShow(props: any) {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="name" />
        <TextField source="category.attributes.name" />
        <TextField source="unit.attributes.name" />
        <BooleanField source="isVariant" />
        <BooleanField source="hasVariant" />
        <RichTextField source="description" />
        <Properties></Properties>
        <UnitConversion></UnitConversion>
      </SimpleShowLayout>
    </Show>
  );
}

export default MaterialShow;
