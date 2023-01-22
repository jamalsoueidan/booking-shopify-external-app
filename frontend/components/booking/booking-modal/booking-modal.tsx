import {
  BookingCalendarEvent,
  LoadingSpinner,
} from "@jamalsoueidan/bsf.bsf-pkg";
import { ModalProvider } from "@providers/modal";
import { useBookingGet } from "@services/booking";
import { Card, Tabs } from "@shopify/polaris";
import { useCallback, useMemo } from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { BookingDetailsEdit } from "../booking-details/booking-details-edit";
import { BookingDetailsView } from "../booking-details/booking-details-view";

export const BookingModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ id: string; "*": string }>();

  const { data } = useBookingGet({ id: params.id });
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

  return (
    <ModalProvider large open={true} onClose={onClose} title={data?.title}>
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          {!data ? (
            <LoadingSpinner />
          ) : (
            <Routes>
              <Route index element={<BookingDetailsView booking={data} />} />
              <Route path="notifications" element={<BookingDetailsEdit />} />
            </Routes>
          )}
        </Tabs>
      </Card>
    </ModalProvider>
  );
};
