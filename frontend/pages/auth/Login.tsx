import { AuthPage } from "@components/auth/AuthPage";
import { FormErrors, useTranslation } from "@jamalsoueidan/bsf.bsf-pkg";
import { useLogin } from "@services/login";
import {
  Banner,
  Button,
  Card,
  Form,
  FormLayout,
  Link,
  Stack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useField, useForm } from "@shopify/react-form";
import { useLocation, useNavigate } from "react-router-dom";

const locales = {
  da: {
    title: "Log ind på BySisters",
    receive_action: "Modtag kode på mobil",
    received_msg: "Indtast det adgangskode du har modtaget på din mobil",
    login_submit: "Log ind",
    or: "eller",
    login: {
      label: "E-mail eller mobilnummer",
    },
    password: {
      label: "Adgangskode",
    },
    error: "Forkert email/mobilnummer eller adgangskode!",
  },
  en: {
    title: "Login on BySisters",
    receive_action: "Receive code on phone",
    received_msg: "Please type the password you received on your mobile.",
    login_submit: "Login",
    or: "or",
    login: {
      label: "Email or Phone",
    },
    password: {
      label: "Password",
    },
    error: "Wrong email/phone or password!",
  },
};

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useLogin();

  const { t } = useTranslation({ id: "login", locales });

  const {
    fields: { identification, password },
    submit,
    submitErrors,
  } = useForm({
    fields: {
      identification: useField("4531317428"),
      password: useField(""),
    },
    onSubmit: async (fieldValues) => {
      const response = await login(fieldValues);
      if (!response.success) {
        return {
          status: "fail",
          errors: [{ field: ["phone"], message: t("error") }],
        };
      } else {
        navigate("/dashboard");
      }
    },
  });

  return (
    <AuthPage title={t("title")}>
      <Card sectioned>
        {location.state?.message && (
          <>
            <Banner onDismiss={() => {}}>
              <p>{t("received_msg")}</p>
            </Banner>
            <br />
          </>
        )}

        <FormErrors errors={submitErrors} />

        <Form onSubmit={submit}>
          <FormLayout>
            <TextField
              label={t("login.label")}
              autoComplete="email"
              {...identification}
            />

            <TextField
              label={t("password.label")}
              type="password"
              autoComplete="false"
              {...password}
            />

            <Stack alignment="center" spacing="tight">
              <Button submit>{t("login_submit")}</Button>
              <Text variant="bodyMd" as="span">
                {t("or")}
              </Text>
              <Link onClick={() => navigate("/phone")}>
                {t("receive_action")}
              </Link>
            </Stack>
          </FormLayout>
        </Form>
      </Card>
    </AuthPage>
  );
};
