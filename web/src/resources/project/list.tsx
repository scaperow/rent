import {
    List,
    TopToolbar,
    FilterButton,
    CreateButton,
    ExportButton,
    Button,
    Datagrid,
    sanitizeListRestProps,
    TextField, ReferenceField, DateField, useDataProvider
} from "react-admin";
import Toolbar from "../../common/toolbar/list";


function list(props: any) {
    
    return (
        <List  {...props} actions={<Toolbar/>}>
            <Datagrid>
                <TextField source="name" label="工程名"/>
                <ReferenceField label="客户" source="customer.id" reference="customer">
                    <TextField source="name" />
                </ReferenceField>
                <DateField source="createdAt" label="创建时间"/>
                <DateField source="updatedAt" label="更新时间"/>
            </Datagrid>
        </List>);
}

export default list;
