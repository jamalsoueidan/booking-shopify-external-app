import { Navigation } from "@shopify/polaris";
import { HomeMajor, OrdersMajor } from "@shopify/polaris-icons";
import { useNavigate } from "react-router-dom";

export const AppNavigation = () => {
  const navigate = useNavigate();
  return (
    <Navigation location="/">
      <Navigation.Section
        title="Booking Application"
        items={[
          {
            label: "Dashboard",
            icon: HomeMajor,
            onClick: () => navigate("/dashboard"),
          },
          {
            label: "Bookings",
            icon: OrdersMajor,
            onClick: () => navigate("/dashboard/bookings"),
          },
          {
            label: "Create new booking",
            icon: OrdersMajor,
            onClick: () => navigate("/dashboard/create"),
          },
          ,
        ]}
      />
    </Navigation>
  );
};
