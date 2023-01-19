import { AuthPage } from "@components/auth/AuthPage";
import { useTranslation } from "@jamalsoueidan/bsf.bsf-pkg";
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
    receive: "Modtag kode på mobil",
  },
  en: {
    receive: "Receive code on phone",
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
          errors: [
            { field: ["phone"], message: "Wrong email/phone or password!" },
          ],
        };
      } else {
        navigate("/dashboard");
      }
    },
  });

  return (
    <AuthPage title="login">
      <Card sectioned>
        {location.state?.message && (
          <>
            <Banner onDismiss={() => {}}>
              <p>Please type the password you received on your mobile.</p>
            </Banner>
            <br />
          </>
        )}

        <Form onSubmit={submit}>
          <FormLayout>
            <TextField
              label="Email or Phone"
              autoComplete="email"
              {...identification}
            />

            <TextField
              label="Password"
              type="password"
              autoComplete="false"
              {...password}
            />

            <Stack alignment="center" spacing="tight">
              <Button submit>Login</Button>
              <Text variant="bodyMd" as="span">
                or
              </Text>
              <Link url="phone">{t("receive")}</Link>
            </Stack>
          </FormLayout>
        </Form>
      </Card>
    </AuthPage>
  );
};
