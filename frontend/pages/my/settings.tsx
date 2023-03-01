import {
  FormErrors,
  InputLanguage,
  InputTimeZone,
  LoadingPage,
  useForm,
  useToast,
  useTranslation,
} from "@jamalsoueidan/pkg.frontend";
import { useAccountSetting, useAccountSettingUpdate } from "@services/account";
import { Card, Form, FormLayout, Layout, Page, PageActions } from "@shopify/polaris";
import { useField } from "@shopify/react-form";

export default () => {
  const { data } = useAccountSetting();
  const { update } = useAccountSettingUpdate();

  const { t } = useTranslation({
    id: "settings",
    locales: { da, en },
  });

  const { show } = useToast();

  //https://codesandbox.io/s/1wpxz?file=/src/MyForm.tsx:2457-2473
  const { fields, submit, submitErrors, primaryAction } = useForm({
    fields: {
      language: useField<string>({
        validates: [],
        value: data?.language || "da",
      }),
      timeZone: useField<string>({
        validates: [],
        value: data?.timeZone,
      }),
    },
    onSubmit: async (fieldValues) => {
      await update(fieldValues);
      show({ content: t("toast") });
      return { status: "success" };
    },
  });

  if (!data) {
    return <LoadingPage title={t("loading")} />;
  }

  return (
    <Form onSubmit={submit}>
      <Page fullWidth title={t("title")}>
        <Layout>
          <FormErrors errors={submitErrors} />
          <Layout.AnnotatedSection title={t("user_settings.title")} description={t("user_settings.subtitle")}>
            <Card sectioned>
              <FormLayout>
                <InputTimeZone {...fields.timeZone} />
                <InputLanguage {...fields.language} />
              </FormLayout>
            </Card>
          </Layout.AnnotatedSection>
        </Layout>
        <br />
        <PageActions primaryAction={primaryAction} />
      </Page>
    </Form>
  );
};

const da = {
  loading: "Henter indstillinger",
  title: "Indstillinger",
  toast: "Ændringer er blevet opdateret",
  user_settings: {
    subtitle: "Ændre udefra din preference",
    title: "Bruger indstillinger",
  },
};

const en: typeof da = {
  loading: "Loading settings",
  title: "Settings",
  toast: "Changes is updated",
  user_settings: {
    subtitle: "Change to whatever you like",
    title: "User Settings",
  },
};
