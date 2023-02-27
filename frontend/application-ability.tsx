import { AbilityBuilder, AbilityTuple, PureAbility } from "@casl/ability";
import { createContextualCan, useAbility as useA } from "@casl/react";
import { AppSession } from "@jamalsoueidan/pkg.bsb-types";
import { createContext } from "react";

type Actions = "all" | "create" | "read" | "update" | "delete";
type Subjects = "booking" | "staff" | "schedule";

type AppAbility = PureAbility<AbilityTuple<Actions, Subjects>>;

export default function defineAbilityFor(user: AppSession): AppAbility {
  const { can, build } = new AbilityBuilder<AppAbility>(PureAbility);

  if (user.isAdmin) {
    can("create", "booking");
  }

  can("read", "booking");

  return build();
}

export const AbilityContext = createContext<AppAbility>(undefined);
export const Can = createContextualCan(AbilityContext.Consumer);

export const useAbility = () => useA(AbilityContext);

export const AbilityProvider = ({ children }: { children: JSX.Element }) => {
  const parse = parseJwt(localStorage.getItem("token"));
  const ability = defineAbilityFor(parse);
  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
};

function parseJwt(token: string) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
}
