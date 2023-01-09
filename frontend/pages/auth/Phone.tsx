import { FormErrors } from "@components/FormErrors";
import { useReceivePassword } from "@services/login";
import {
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
import { useNavigate } from "react-router-dom";
import CenterScreen from "styled/CenterScreen";

export default () => {
  const navigate = useNavigate();
  const { receivePassword } = useReceivePassword();

  const {
    fields: { phone },
    submit,
    submitErrors,
  } = useForm({
    fields: {
      phone: useField("4531317428"),
    },
    onSubmit: async (fieldValues) => {
      const response = await receivePassword(fieldValues);
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
      <CenterScreen>
        <Page narrowWidth>
          <FormErrors errors={submitErrors} />
          <Card title="Receive password by phone">
            <Card.Section>
              <Form onSubmit={submit}>
                <FormLayout>
                  <TextField label="Phone" autoComplete="phone" {...phone} />
                  <Stack alignment="center" spacing="tight">
                    <Button submit>Receive password</Button>
                    <Text variant="bodyMd" as="span">
                      or
                    </Text>
                    <Link url="/login">Login</Link>
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
