import { AuthPage } from "@components/auth/AuthPage";
import { useTranslation } from "@jamalsoueidan/pkg.frontend";
import { useReceivePassword } from "@services/login";
import { AlphaCard, Button, Form, FormLayout, Inline, Link, Text, TextField } from "@shopify/polaris";
import { useField, useForm } from "@shopify/react-form";
import { useNavigate } from "react-router-dom";

const locales = {
  da: {
    error: "Forkert email/mobilnummer eller adgangskode!",
    login: "Log ind",
    or: "eller",
    phone: {
      label: "Indtast mobilnummer",
    },
    send_submit: "Send mig adgangskode!",
    title: "Modtag adgangskode på mobil",
  },
  en: {
    error: "Wrong email/phone or password!",
    login: "Login",
    or: "or",
    phone: {
      label: "Enter your phonenumber",
    },
    send_submit: "Send me password!",
    title: "Receive password on phone",
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
          errors: [{ field: ["phone"], message: t("error") }],
          status: "fail",
        };
      }
      navigate("/login", { state: { message: "login" } });
    },
  });

  return (
    <AuthPage title={t("title")}>
      <AlphaCard>
        <Form onSubmit={submit}>
          <FormLayout>
            <TextField label={t("phone.label")} autoComplete="phone" {...phone} />
            <Inline gap="1" blockAlign="center">
              <Button submit>{t("send_submit")}</Button>
              <Text variant="bodyMd" as="span">
                {t("or")}
              </Text>
              <Link onClick={() => navigate("/login")}>{t("login")}</Link>
            </Inline>
          </FormLayout>
        </Form>
      </AlphaCard>
    </AuthPage>
  );
};
