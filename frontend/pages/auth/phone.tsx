import { AuthPage } from "@components/auth/AuthPage";
import { useTranslation } from "@jamalsoueidan/bsf.bsf-pkg";
import { useReceivePassword } from "@services/login";
import { Button, Card, Form, FormLayout, Link, Stack, Text, TextField } from "@shopify/polaris";
import { useField, useForm } from "@shopify/react-form";
import { useNavigate } from "react-router-dom";

const locales = {
  da: {
    title: "Modtag adgangskode på mobil",
    send_submit: "Send mig adgangskode!",
    login: "Log ind",
    or: "eller",
    phone: {
      label: "Indtast mobilnummer",
    },
    error: "Forkert email/mobilnummer eller adgangskode!",
  },
  en: {
    title: "Receive password on phone",
    send_submit: "Send me password!",
    login: "Login",
    or: "or",
    phone: {
      label: "Enter your phonenumber",
    },
    error: "Wrong email/phone or password!",
  },
};

export default () => {
  const navigate = useNavigate();
  const { receivePassword } = useReceivePassword();
  const { t } = useTranslation({ id: "password", locales });

  const {
    fields: { phone },
    submit,
  } = useForm({
    fields: {
      phone: useField("4531317428"),
    },
    onSubmit: async (fieldValues) => {
      const response = await receivePassword(fieldValues);
      if (!response.success) {
        return {
          status: "fail",
          errors: [{ field: ["phone"], message: t("error") }],
        };
      }
      navigate("/login", { state: { message: "login" } });
    },
  });

  return (
    <AuthPage title={t("title")}>
      <Card sectioned>
        <Form onSubmit={submit}>
          <FormLayout>
            <TextField label={t("phone.label")} autoComplete="phone" {...phone} />
            <Stack alignment="center" spacing="tight">
              <Button submit>{t("send_submit")}</Button>
              <Text variant="bodyMd" as="span">
                {t("or")}
              </Text>
              <Link onClick={() => navigate("/login")}>{t("login")}</Link>
            </Stack>
          </FormLayout>
        </Form>
      </Card>
    </AuthPage>
  );
};
