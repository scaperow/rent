import {
    List,
    TopToolbar,
    FilterButton,
    CreateButton,
    ExportButton,
    Button,
    Datagrid,
    sanitizeListRestProps,
    TextField,
    EditButton, ShowButton, BooleanField, DateField
} from "react-admin";
import Toolbar from "../../common/toolbar/list";

function list(props: any) {
    return (
        <List  {...props} actions={<Toolbar/>} >
            <Datagrid>
                <TextField source="name"/>
                <BooleanField source="disabled"/>
                <DateField source="createdAt" label="创建时间"></DateField>
                <DateField source="updatedAt" label="更新时间"></DateField>
                <EditButton/>
                <ShowButton/>
            </Datagrid>
        </List>);
}

export default list;