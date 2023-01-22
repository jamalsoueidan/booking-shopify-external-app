import { SettingsProvider } from "@jamalsoueidan/bsf.bsf-pkg";
import { useUserSetting } from "@services/user";
import ApplicationRoutes from "Routes";
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

  return (
    <SettingsProvider value={value}>
      <BrowserRouter>
        <ApplicationRoutes />
      </BrowserRouter>
    </SettingsProvider>
  );
};
