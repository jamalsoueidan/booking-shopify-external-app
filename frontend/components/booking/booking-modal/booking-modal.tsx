import { ModalProvider } from "@providers/modal";
import { Card, Tabs } from "@shopify/polaris";
import { useCallback, useMemo } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { BookingDetails } from "../booking-details/booking-details";
import { BookingDetailsEdit } from "../booking-details/booking-details-edit";
import { BookingCalendarEvent } from "@jamalsoueidan/bsf.bsf-pkg";

export const BookingModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const info: BookingCalendarEvent = location.state;

  const onClose = useCallback(() => {
    navigate("../", { relative: "route" });
  }, [navigate]);

  const tabs = useMemo(() => {
    const t = [
      {
        id: null,
        content: "Behandling",
      },
      {
        id: "customer",
        content: "Kunde",
      },
      {
        id: "notifications",
        content: "Meddelelser",
      },
    ];

    return t;
  }, [info]);

  const handleTabChange = useCallback((selectedTabIndex: number) => {
    navigate(tabs[selectedTabIndex].id, {
      relative: "route",
      state: tabs[selectedTabIndex].id,
    });
  }, []);

  const selected = useMemo(
    () => tabs.findIndex((t) => t.id === location.state),
    [location]
  );

  console.log(params);

  return (
    <ModalProvider large open={true} onClose={onClose} title={"ok"}>
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Routes>
            <Route index element={<BookingDetails />} />
            <Route path="notifications" element={<BookingDetailsEdit />} />
          </Routes>
        </Tabs>
      </Card>
    </ModalProvider>
  );
};
