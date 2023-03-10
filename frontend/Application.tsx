import { SettingsProvider } from "@jamalsoueidan/pkg.frontend";
import { useAccountSetting } from "@services/account";
import { ApplicationRoutes } from "application-routes";
import { setDefaultOptions } from "date-fns";
import da from "date-fns/locale/da";
import { useCallback, useMemo } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";

export const Application = () => (
  <BrowserRouter>
    <ApplicationSettings />
  </BrowserRouter>
);

const ApplicationSettings = () => {
  const { data } = useAccountSetting();

  const value = useMemo(
    () => ({
      LinkComponent,
      language: data?.language || "da",
      timeZone: data?.timeZone || "Europe/Copenhagen",
      useNavigate,
    }),
    [data],
  );

  setDefaultOptions({ locale: value.language === "da" ? da : undefined });

  return (
    <SettingsProvider value={value}>
      <ApplicationRoutes />
    </SettingsProvider>
  );
};

function LinkComponent({ url, children, external, ...rest }: any) {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(url);
  }, [navigate, url]);

  const IS_EXTERNAL_LINK_REGEX = /^(?:[a-z][a-z\d+.-]*:|\/\/)/;
  const DEFAULT_PROPS = url ? { cursor: "pointer" } : {};

  if (external || IS_EXTERNAL_LINK_REGEX.test(url)) {
    return (
      <a {...rest} href={url} target="_blank" rel="noopener noreferrer" style={DEFAULT_PROPS}>
        {children}
      </a>
    );
  }

  return (
    <a {...rest} onClick={handleClick} role="alert" style={DEFAULT_PROPS}>
      {children}
    </a>
  );
}
