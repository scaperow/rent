import {Create, TextInput, SimpleForm, RadioButtonGroupInput, CheckboxGroupInput, BooleanInput} from "react-admin";
import RichTextInput from 'ra-input-rich-text';
import {validateName, validateTel} from "../../validators/mixin";

function create(props: any) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" label="名称"/>
                <BooleanInput source="disabled" label="禁用"></BooleanInput>
            </SimpleForm>
        </Create>);
}

export default create;