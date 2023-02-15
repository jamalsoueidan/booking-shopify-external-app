import { SettingsProvider } from "@jamalsoueidan/pkg.bsf";
import { useUserSetting } from "@services/user";
import ApplicationRoutes from "Routes";
import { setDefaultOptions } from "date-fns";
import da from "date-fns/locale/da";
import { useMemo } from "react";
import { BrowserRouter } from "react-router-dom";

export default () => {
  const { data } = useUserSetting();

  const value = useMemo(
    () => ({
      language: data?.language || "da",
      timeZone: data?.timeZone || "Europe/Copenhagen",
    }),
    [data]
  );

  setDefaultOptions({ locale: value.language === "da" ? da : undefined });

  return (
    <SettingsProvider value={value}>
      <BrowserRouter>
        <ApplicationRoutes />
      </BrowserRouter>
    </SettingsProvider>
  );
};
