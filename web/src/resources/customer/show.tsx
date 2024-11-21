import {Show, SimpleShowLayout, TextInput, TextField, RichTextField, DateField} from "react-admin";

const show = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name"/>
            <TextField source="tel"/>
            <RichTextField source="description"/>
            <DateField label="Publication date" source="created_at"/>
        </SimpleShowLayout>
    </Show>
);

export default show;