import {
  Title,
  TitleLevel,
  Avatar,
  BusyIndicator,
} from "@ui5/webcomponents-react";
import Grid from "@mui/material/Grid";
import "@ui5/webcomponents-icons/dist/locked";
import { useTranslations } from "translations/i18nContext";

export default function VerifyLogin() {
  const { getI18nText } = useTranslations();

  return (
    <Grid container spacing={0} direction="row">
      <Grid item xs={12}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "70vh" }}
        >
          <Grid item xs={6} style={{ marginBottom: "0.5rem" }}>
            <Avatar
              style={{ background: "#6BD3FF", color: "#2B3640" }}
              icon="locked"
              shape="Circle"
              size="M"
            />
          </Grid>
          <Grid item xs={6} style={{ marginTop: "2rem" }}>
            <BusyIndicator active size="Large" />
          </Grid>
          <Grid item xs={6} style={{ marginTop: "2rem" }}>
            <Title level={TitleLevel.H2}>
              {getI18nText("login.verifyLogin.message")}
            </Title>
          </Grid>
          <Grid item xs={6} style={{ marginTop: "2rem" }}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
