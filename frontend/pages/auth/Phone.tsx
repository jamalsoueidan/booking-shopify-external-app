import { FormErrors } from "@components/FormErrors";
import { useReceivePassword } from "@services/login";
import {
  Button,
  Card,
  Form,
  FormLayout,
  Frame,
  Page,
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
        <Page
          narrowWidth
          title="Receive password by phone"
          breadcrumbs={[{ content: "Login", url: "/" }]}
        >
          <FormErrors errors={submitErrors} />
          <Card sectioned>
            <Form onSubmit={submit}>
              <FormLayout>
                <TextField label="Phone" autoComplete="phone" {...phone} />

                <Button submit>Receive password</Button>
              </FormLayout>
            </Form>
          </Card>
        </Page>
      </CenterScreen>
    </Frame>
  );
};
