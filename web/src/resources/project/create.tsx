import {
  Create,
  TextInput,
  SimpleForm,
  RadioButtonGroupInput,
  ReferenceInput,
  SelectInput,
  AutocompleteInput,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";

function create(props: any) {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput required source="name" label="工程名称" />
        <ReferenceInput
          label="客户"
          source="customer"
          reference="customer"
  
        >
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <TextInput source="address" label="地址" />
        <RichTextInput height="4" source="description" label="备注" />
      </SimpleForm>
    </Create>
  );
}

export default create;
