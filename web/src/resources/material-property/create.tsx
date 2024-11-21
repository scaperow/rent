import {Create, TextInput, SimpleForm} from "react-admin";

function create(props: any) {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" label="名称" />
            </SimpleForm>
        </Create>);
}

export default create;