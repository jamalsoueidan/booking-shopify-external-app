import { useLogin } from "@services/login";
import {
  Banner,
  Button,
  Card,
  Form,
  FormLayout,
  Frame,
  Link,
  Page,
  Stack,
  Text,
  TextField,
} from "@shopify/polaris";
import { useField, useForm } from "@shopify/react-form";
import { useLocation, useNavigate } from "react-router-dom";
import CenterScreen from "styled/CenterScreen";

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
    <Frame>
      <CenterScreen>
        <Page narrowWidth>
          <Card title="Login">
            <Card.Section>
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
                    label="Email/Phone"
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
            </Card.Section>
          </Card>
        </Page>
      </CenterScreen>
    </Frame>
  );
};
