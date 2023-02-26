import { AbilityBuilder, AbilityTuple, PureAbility } from "@casl/ability";
import { createContextualCan, useAbility as useA } from "@casl/react";
import { createContext } from "react";

type Actions = "all" | "create" | "read" | "update" | "delete";
type Subjects = "booking" | "staff" | "schedule";

type AppAbility = PureAbility<AbilityTuple<Actions, Subjects>>;

export default function defineAbilityFor(user: any): AppAbility {
  const { can, rules, build } = new AbilityBuilder<AppAbility>(PureAbility);

  if (user.isAdmin) {
    can("create", "booking");
  }

  can("read", "booking");

  return build();
}

export const AbilityContext = createContext<AppAbility>(undefined);
export const Can = createContextualCan(AbilityContext.Consumer);

export const useAbility = () => {
  return useA(AbilityContext);
};

export const AbilityProvider = ({ children }: { children: JSX.Element }) => {
  const parse = parseJwt(localStorage.getItem("token"));
  const ability = defineAbilityFor(parse);
  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
};

function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
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
