import { useUserSetting } from "@services/user";
import { I18nManager } from "@shopify/react-i18n";
import { useEffect, useMemo } from "react";

export const useSetting = () => {
  const { data } = useUserSetting();

  const manager = useMemo(() => {
    return new I18nManager({
      locale: data?.language || "da",
      onError: (details) => {
        console.log(details);
      },
    });
  }, [data?.language]);

  useEffect(() => {
    if (data?.language) {
      manager.update({ locale: data?.language });
    }
  }, [data?.language, manager]);

  return manager;
};
