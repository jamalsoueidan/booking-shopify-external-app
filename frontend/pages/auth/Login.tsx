import { useLogin } from "@services/auth";
import {
  Banner,
  Button,
  Card,
  Form,
  FormLayout,
  Frame,
  Link,
  Page,
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
      navigate("/login", { state: { message: "login" } });
    },
  });

  return (
    <Frame>
      <div className="inline-block align-middle">
        <Page narrowWidth title="Login">
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
                  label="Email/Phone"
                  type="email"
                  autoComplete="email"
                  {...identification}
                />

                <TextField
                  label="Password"
                  type="password"
                  autoComplete="false"
                  {...password}
                />

                <Button submit>Login</Button>
                <Link url="phone">Receive code by phone</Link>
              </FormLayout>
            </Form>
          </Card>
        </Page>
      </div>
    </Frame>
  );
};
