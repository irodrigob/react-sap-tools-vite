import { FC, ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import "@ui5/webcomponents-icons/dist/sys-help";
import "@ui5/webcomponents-icons/dist/menu2";
import "@ui5/webcomponents-icons/dist/account";
import "@ui5/webcomponents-icons/dist/settings";
import { Grid } from "@mui/material";
//import GeneralHelp from "main/frontend/layout/appBar/generalHelp/generalHelp";
//import MsgManagerToolbarContainer from "messageManager/infraestructure/frontend/components/msgManagerToolbarContainer";
import UserAvatarContainer from "main/frontend/layout/appToolbar/userAvatar/userAvatarContainer";
import { useSession } from "auth/authProvider";
//import useMessageManager from "messageManager/infraestructure/frontend/hooks/useMessageManager";
//import BreadCrumbsNav from "main/frontend/breadCrumbs/breadCrumbsNav";
//import AppSystemSelected from "systems/infraestructure/frontend/components/appSystemSelected/appSystemSelected";

export default function AppToolbarContainer() {
    const { session } = useSession();
    //const { messagesNumber } = useMessageManager();

    return (
        <>
            {session && (
                <AppBar
                    position="fixed"
                    sx={{ backgroundColor: "var(--sapShellColor)" }}
                >
                    <Toolbar variant="dense">
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="flex-start"
                        >
                            <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Grid container spacing={2}>
                                    <Grid item>

                                    </Grid>
                                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>

                                    </Grid>
                                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>


                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="flex-end"
                                    spacing={4}
                                >

                                    <Grid item>

                                    </Grid>
                                    <Grid item>
                                        <UserAvatarContainer />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            )}
        </>
    );
}
