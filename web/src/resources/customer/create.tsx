import {
  Create,
  TextInput,
  SimpleForm,
  RadioButtonGroupInput,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import { validateName, validateTel } from "../../validators/mixin";

function create(props: any) {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" label="名称" />
        <RadioButtonGroupInput
          source="gender"
          label="性别"
          choices={[
            { id: "male", name: "男" },
            { id: "female", name: "女" },
            { id: "", name: "未设置" },
          ]}
        />
        <TextInput type="tel" source="tel" label="联系电话" />
        <TextInput source="address" label="地址" />
        <RichTextInput height="4" source="description" label="备注" />
      </SimpleForm>
    </Create>
  );
}

export default create;
