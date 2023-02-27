import { Booking } from "@jamalsoueidan/pkg.bsb-types";
import { LoadingModal, LoadingSpinner, useBookings, useTranslation } from "@jamalsoueidan/pkg.bsf";
import { useGroup } from "@services/group";
import { Card, FooterHelp, Page } from "@shopify/polaris";
import { Suspense, lazy, useCallback, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Pick<Booking, "start" | "end">>();

  const { t } = useTranslation({ id: "bookings", locales });

  const { data: staffier } = useGroup();
  const { data: bookings } = useBookings({
    end: date?.end,
    start: date?.start,
  });

  const onClickBooking = useCallback(
    (booking: Booking) => {
      navigate(booking._id);
    },
    [navigate],
  );

  return (
    <Page
      fullWidth
      title={t("title")}
      primaryAction={{
        content: t("create"),
        onAction: () => navigate("new"),
      }}
    >
      <Routes>
        <Route
          path="/:id/*"
          element={
            <Suspense fallback={<LoadingModal />}>
              <BookingModal />
            </Suspense>
          }
        />
      </Routes>
      <Card sectioned>
        <Card.Section>
          <Suspense fallback={<LoadingSpinner />}>
            <BookingCalendar data={bookings} onChangeDate={setDate} onClickBooking={onClickBooking} staff={staffier} />
          </Suspense>
        </Card.Section>
      </Card>
      <FooterHelp>{t("footer_help")}</FooterHelp>
    </Page>
  );
};

const BookingModal = lazy(() =>
  import("../components/booking/booking-modal/booking-modal").then((module) => ({
    default: module.BookingModal,
  })),
);

const BookingCalendar = lazy(() =>
  import("@jamalsoueidan/pkg.bsf").then((module) => ({
    default: module.BookingCalendar,
  })),
);

const locales = {
  da: {
    create: "Opret en ny behandlingstid",
    footer_help: "Kan ikke ændre i bookinger der er refunderet eller oprettet tidligere end dagens dato.",
    in_progress: "I process",
    title: "Behandlinger",
  },
  en: {
    create: "Create new booking",
    footer_help: "You can't edit bookings that are refunded or created before today.",
    in_progress: "In progress",
    title: "Bookings",
  },
};
