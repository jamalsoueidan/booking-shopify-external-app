import {
  Button,
  Card,
  Checkbox,
  Form,
  FormLayout,
  Frame,
  Link,
  Page,
  TextField,
} from "@shopify/polaris";
import { useCallback, useState } from "react";

export default () => {
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback((event: any) => {
    setEmail("");
  }, []);

  const handleEmailChange = useCallback((value: any) => setEmail(value), []);

  return (
    <Frame>
      <div className="inline-block align-middle">
        <Page
          narrowWidth
          title="Receive password by phone"
          breadcrumbs={[{ content: "Login", url: "/" }]}
        >
          <Card sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={email}
                  onChange={handleEmailChange}
                  label="Phone"
                  autoComplete="phone"
                />

                <Button submit>Receive password</Button>
              </FormLayout>
            </Form>
          </Card>
        </Page>
      </div>
    </Frame>
  );
};
