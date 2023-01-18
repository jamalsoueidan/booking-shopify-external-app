import { LoginFrame } from "@components/application/LoginFrame";
import { FormErrors } from "@jamalsoueidan/bsf.bsf-pkg";
import { useReceivePassword } from "@services/login";
import {
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
import { useNavigate } from "react-router-dom";

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
      if (!response.success) {
        return {
          status: "fail",
          errors: [{ field: ["phone"], message: "bad form data" }],
        };
      }
      navigate("/login", { state: { message: "login" } });
    },
  });

  return (
    <LoginFrame title="Receive password by phone">
      <FormErrors errors={submitErrors} />
      <Card sectioned>
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
      </Card>
    </LoginFrame>
  );
};
