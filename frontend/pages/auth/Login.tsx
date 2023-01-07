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
  const [newsletter, setNewsletter] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback((event: any) => {
    setEmail("");
    setNewsletter(false);
  }, []);

  const handleNewsLetterChange = useCallback(
    (value: any) => setNewsletter(value),
    []
  );

  const handleEmailChange = useCallback((value: any) => setEmail(value), []);

  return (
    <Frame>
      <div className="inline-block align-middle">
        <Page narrowWidth title="Login">
          <Card sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={email}
                  onChange={handleEmailChange}
                  label="Email"
                  type="email"
                  autoComplete="email"
                />

                <TextField
                  value={email}
                  onChange={handleEmailChange}
                  label="Password"
                  type="password"
                  autoComplete="false"
                />

                <Button submit>Login</Button>
                <Link url="/phone">Receive code by phone</Link>
              </FormLayout>
            </Form>
          </Card>
        </Page>
      </div>
    </Frame>
  );
};
