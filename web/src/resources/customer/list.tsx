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
    EditButton, ShowButton, useListContext, useDataProvider
} from "react-admin";
import Toolbar from "../../common/toolbar/list";

function list(props: any) {


    return (
        <List  {...props} actions={<Toolbar/>}>
            <Datagrid>
                <TextField source="name"/>

                <EditButton />
                <ShowButton/>
            </Datagrid>
        </List>);
}

export default list;