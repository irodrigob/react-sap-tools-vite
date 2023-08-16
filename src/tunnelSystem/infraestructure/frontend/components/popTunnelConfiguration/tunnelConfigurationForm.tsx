import { useState, FC, useEffect } from "react";
import {
  Button,
  Bar,
  Form,
  FormItem,
  Text,
  FlexBox,
  Link,
} from "@ui5/webcomponents-react";
import TextField from "@mui/material/TextField";
import { useSession } from "auth/authProvider";
import { useForm, Controller } from "react-hook-form";
import { useTranslations } from "translations/i18nContext";
import Encrypt from "shared/utils/encrypt/encrypt";
import useMessages, {
  MessageType,
} from "shared/infraestructure/hooks/useMessages";
import ErrorGraphql from "shared/errors/ErrorGraphql";
import { useSystemData } from "systems/infraestructure/context/systemContext";
import TunnelController from "tunnelSystem/infraestructure/controller/tunnelController";
import TunnelConfiguration from "tunnelSystem/domain/entities/configuration";
import { responseTunnelConfigRepo } from "tunnelSystem/infraestructure/types/repository";

interface Props { }

type FormValues = {
  authToken: string;
  apiToken: string;
};
const TunnelConfigurationForm: FC<Props> = (props) => {
  const { } = props;
  const { getI18nText } = useTranslations();
  const {
    control,
    handleSubmit,
    setValue,
    watch,
  } = useForm<FormValues>();
  const { session } = useSession();
  const { tunnelConfiguration, setTunnelConfiguration } = useSystemData();
  const [configurationChanged, setConfigurationChanged] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const tunnelController = new TunnelController();
  const watchAuthToken = watch("authToken");
  const watchApiToken = watch("apiToken");
  const { showMessage, updateMessage, updateResultError } = useMessages();

  /*************************************
   * Funciones
   ************************************/
  const onSubmitForm = (data: FormValues) => {
    if (configurationChanged) {
      setBtnDisabled(true)

      let toastID = showMessage(
        getI18nText("tunneling.editConfiguration.saveInProcess"),
        MessageType.info,
        { autoClose: false, isLoading: true }
      );

      tunnelController
        .editConfiguration(
          new TunnelConfiguration(
            tunnelConfiguration._id,
            tunnelConfiguration.user != ""
              ? tunnelConfiguration.user
              : session.email,
            data.authToken != "" ? Encrypt.encryptText(data.authToken) : "",
            data.authToken != ""
              ? data.apiToken != ""
                ? Encrypt.encryptText(data.apiToken)
                : ""
              : "",
            "NGROK"
          )
        )
        .then((response: responseTunnelConfigRepo) => {
          if (response.isSuccess) {

            updateMessage(
              toastID,
              getI18nText("tunneling.editConfiguration.saveSuccess"),
              MessageType.success
            );

            setTunnelConfiguration(response.getValue() as TunnelConfiguration);

            setConfigurationChanged(false)

            // Reseteo los valores del form
            // reset();
          } else if (response.isFailure) {
            updateResultError(
              toastID,
              response.getErrorValue() as ErrorGraphql
            );

          }
        }).finally(() => { setBtnDisabled(false) });
    }
    else {
      showMessage(
        getI18nText("tunneling.editConfiguration.noDataChanged"),
        MessageType.info
      );
    }
  };

  /*************************************
   * Efectos
   ************************************/
  useEffect(() => {
    setValue("apiToken", tunnelConfiguration.apiToken);
    setValue("authToken", tunnelConfiguration.authToken);
  }, [tunnelConfiguration]);
  useEffect(() => {
    if (
      watchApiToken != tunnelConfiguration.apiToken ||
      watchAuthToken != tunnelConfiguration.authToken
    )
      setConfigurationChanged(true);
    else setConfigurationChanged(false);
  }, [watchApiToken, watchAuthToken]);

  return (
    <>
      <Form columnsL={1} columnsM={1} columnsXL={1} columnsS={1} labelSpanS={12} labelSpanM={12} labelSpanL={12} labelSpanXL={12}>
        <FormItem
          children={
            <Controller
              name="authToken"
              control={control}
              defaultValue=""
              render={({
                field: { onChange, value },
              }) => (
                <FlexBox direction="Column">
                  <TextField
                    label={getI18nText(
                      "tunneling.editConfiguration.labelAuthToken"
                    )}
                    variant="filled"
                    value={value}
                    onChange={onChange}
                    sx={{
                      width: "35em",
                      fontFamily: "var(--sapFontFamily)",
                      fontSize: "var(--sapFontSize)",
                    }}
                    type="password"
                  />
                  <Text style={{ marginTop: "1em" }}>
                    {getI18nText("tunneling.editConfiguration.helperAuthToken")}
                    <br />
                    {getI18nText(
                      "tunneling.editConfiguration.helperAuthToken2"
                    )}
                    <br />
                    <Link
                      href={getI18nText(
                        "tunneling.editConfiguration.urlAuthToken"
                      )}
                      target="_blank"
                    >
                      {getI18nText(
                        "tunneling.editConfiguration.helperAuthTokenNavigate"
                      )}
                    </Link>
                  </Text>
                </FlexBox>
              )}
            />
          }
        />
        {watchAuthToken && watchAuthToken.length > 0 && (
          <FormItem
            children={
              <Controller
                name="apiToken"
                control={control}
                defaultValue=""
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FlexBox direction="Column">
                    <TextField
                      style={{ marginTop: "1.5em" }}
                      label={getI18nText(
                        "tunneling.editConfiguration.labelApiToken"
                      )}
                      variant="filled"
                      required
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={
                        !!error
                          ? error.type === "validate"
                            ? getI18nText("general.fieldMandatory")
                            : error.message
                          : null
                      }
                      sx={{
                        width: "35em",
                        fontFamily: "var(--sapFontFamily)",
                        fontSize: "var(--sapFontSize)",
                      }}
                      type="password"
                    />
                    <Text style={{ marginTop: "1em" }}>
                      {getI18nText(
                        "tunneling.editConfiguration.helperApiToken"
                      )}
                      <br />
                      <Link
                        href={getI18nText(
                          "tunneling.editConfiguration.urlApiToken"
                        )}
                        target="_blank"
                      >
                        {getI18nText(
                          "tunneling.editConfiguration.helperApiTokenNavigate"
                        )}
                      </Link>
                    </Text>
                  </FlexBox>
                )}
                rules={{
                  validate: (value) => value !== "" && watchAuthToken != "",
                }}
              />
            }
          />
        )}
      </Form>
      <Bar
        design="Footer"
        endContent={
          <Button
            onClick={handleSubmit(onSubmitForm)}
            disabled={btnDisabled}
          >
            {getI18nText("systemConfiguration.btnSave")}
          </Button>
        }
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          background: "var(--_ui5_tc_content_background)",
        }}
      />
    </>
  );
};

export default TunnelConfigurationForm;
