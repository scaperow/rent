import {Button, CreateButton, ExportButton, sanitizeListRestProps, TopToolbar} from "react-admin";


function toolbar(props: any) {

    const {
        className,
        maxResults,
        ...rest
    } = props;

    return (
        <TopToolbar {...sanitizeListRestProps(rest)}>
            <CreateButton/>
            <ExportButton/>
            {/*<Button*/}
            {/*    onClick={() => {*/}
            {/*        alert('Your custom action');*/}
            {/*    }}*/}
            {/*    label="Show calendar"*/}
            {/*>*/}
            {/*    <IconEvent/>*/}
            {/*</Button>*/}
        </TopToolbar>);
};

export default toolbar;

