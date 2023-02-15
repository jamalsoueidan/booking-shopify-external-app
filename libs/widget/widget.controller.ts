import {
  AppControllerProps,
  UserModel,
  WidgetServiceAvailability,
  WidgetServiceAvailabilityProps,
  WidgetServiceGetStaff,
  WidgetServiceGetStaffProps,
} from "@jamalsoueidan/pkg.bsb";

export const staff = ({ query }: AppControllerProps<WidgetServiceGetStaffProps>) => {
  const { productId, shop } = query;
  return WidgetServiceGetStaff({
    shop,
    productId: +productId,
  });
};

export const availability = ({ query, session }: AppControllerProps<Omit<WidgetServiceAvailabilityProps, "staff">>) => {
  console.log(query, session);
  return WidgetServiceAvailability({ ...query, staff: session.staff });
};

export const settings = () => {
  return UserModel.findOne({}, "language status timeZone");
};
