import { LoginFrame } from "@components/application/LoginFrame";
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
  TextContainer,
  TextField,
} from "@shopify/polaris";
import { useField, useForm } from "@shopify/react-form";
import { useLocation, useNavigate } from "react-router-dom";

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useLogin();

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
      if (response.error) {
        return {
          status: "fail",
          errors: [{ field: ["phone"], message: "bad form data" }],
        };
      }
      navigate("/dashboard");
    },
  });

  return (
    <LoginFrame title="Log ind">
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
              <Link url="phone">Receive code on phone</Link>
            </Stack>
          </FormLayout>
        </Form>
      </Card>
    </LoginFrame>
  );
};
