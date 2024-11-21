import {Create, TextInput, SimpleForm, RadioButtonGroupInput, ReferenceField, AutocompleteInput, ReferenceInput} from "react-admin";
import RichTextInput from 'ra-input-rich-text';
import {validateName, validateTel} from "../../validators/mixin";

function create(props: any) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" label="名称" />
                <ReferenceInput label="默认单位" reference="unit" source="unit_id">
                    <AutocompleteInput optionText="name"  />
                </ReferenceInput>
                <TextInput type="tel" source="tel" label="单位" />
            </SimpleForm>
        </Create>);
}

export default create;