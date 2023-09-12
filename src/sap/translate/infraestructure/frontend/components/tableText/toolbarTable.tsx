import {
    Toolbar,
    ToolbarSeparator,
    ToolbarSpacer,
    Button,
} from "@ui5/webcomponents-react";
import "@ui5/webcomponents-icons/dist/save";

export default function ToolbarTable() {


    return (
        <><Toolbar toolbarStyle="Clear">
            <ToolbarSpacer />
            <Button
                icon="save"
            />
        </Toolbar></>)

}