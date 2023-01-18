import {
  FormErrors,
  LanguageInput,
  LoadingPage,
  TimeZoneInput,
  useForm,
  useToast,
  useTranslation,
} from "@jamalsoueidan/bsf.bsf-pkg";
import { useUserSetting, useUserSettingUpdate } from "@services/user";
import {
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  PageActions,
} from "@shopify/polaris";
import { useField } from "@shopify/react-form";

const da = {
  title: "Indstillinger",
  loading: "Henter indstillinger",
  user_settings: {
    title: "Bruger indstillinger",
    subtitle: "Ændre udefra din preference",
  },
  toast: "Ændringer er blevet opdateret",
};

const en: typeof da = {
  title: "Settings",
  loading: "Loading settings",
  user_settings: {
    title: "User Settings",
    subtitle: "Change to whatever you like",
  },
  toast: "Changes is updated",
};

export default () => {
  const { data } = useUserSetting();
  const { update } = useUserSettingUpdate();

  const { t } = useTranslation({
    id: "settings",
    locales: { da, en },
  });

  const { show } = useToast();

  //https://codesandbox.io/s/1wpxz?file=/src/MyForm.tsx:2457-2473
  const { fields, submit, submitErrors, primaryAction } = useForm({
    fields: {
      timeZone: useField<string>({
        value: data?.timeZone,
        validates: [],
      }),
      language: useField<string>({
        value: data?.language || "da",
        validates: [],
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
          <Layout.AnnotatedSection
            title={t("user_settings.title")}
            description={t("user_settings.subtitle")}
          >
            <Card sectioned>
              <FormLayout>
                <TimeZoneInput {...fields.timeZone} />
                <LanguageInput {...fields.language} />
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
