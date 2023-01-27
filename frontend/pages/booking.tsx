import LoadingModal from "@components/LoadingModal";
import { BookingCalendarEvent, LoadingSpinner, useFulfillment, useTranslation } from "@jamalsoueidan/bsf.bsf-pkg";
import { useBookings } from "@services/booking";
import { useGroup } from "@services/group";
import { Badge, Card, FooterHelp, Page } from "@shopify/polaris";
import { Suspense, lazy, useCallback, useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const locales = {
  da: {
    title: "Behandlinger",
    create: "Opret en ny behandlingstid",
    in_progress: "I process",
    footer_help: "Kan ikke ændre i bookinger der er refunderet eller oprettet tidligere end dagens dato.",
  },
  en: {
    title: "Bookings",
    create: "Create new booking",
    in_progress: "In progress",
    footer_help: "You can't edit bookings that are refunded or created before today.",
  },
};

const BookingModal = lazy(() =>
  import("../components/booking/booking-modal/booking-modal").then((module) => ({
    default: module.BookingModal,
  })),
);

const StaffSelection = lazy(() =>
  import("@jamalsoueidan/bsf.bsf-pkg").then((module) => ({
    default: module.BookingStaff,
  })),
);

const BookingCalendar = lazy(() =>
  import("@jamalsoueidan/bsf.bsf-pkg").then((module) => ({
    default: module.BookingCalendar,
  })),
);

export default () => {
  const navigate = useNavigate();
  const [staff, setStaff] = useState<Staff>();
  const [date, setDate] = useState<Pick<GetBookingsRequest, "start" | "end">>();

  const { t } = useTranslation({ id: "bookings", locales });

  const { options } = useFulfillment();
  const { data: staffier } = useGroup();
  const { data: bookings, isLoading } = useBookings({
    start: date?.start,
    end: date?.end,
    staff: staff?._id,
  });

  const badges = useMemo(
    () =>
      options.map((o, _) => (
        <Badge key={_} status={o.bannerStatus} progress="complete">
          {o.label ? o.label.charAt(0).toUpperCase() + o.label.slice(1) : t("in_progress")}
        </Badge>
      )),
    [options, t],
  );

  const onClickBooking = useCallback(
    (state: BookingCalendarEvent) => {
      navigate(state.booking._id);
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
        <Card.Section title={badges}>
          <Suspense fallback={<LoadingSpinner />}>
            <StaffSelection
              isLoadingBookings={isLoading}
              data={staffier}
              selected={staff}
              onSelect={setStaff}
            ></StaffSelection>
          </Suspense>
        </Card.Section>
        <Card.Section>
          <Suspense fallback={<LoadingSpinner />}>
            <BookingCalendar data={bookings} onChangeDate={setDate} onClickBooking={onClickBooking} />
          </Suspense>
        </Card.Section>
      </Card>
      <FooterHelp>{t("footer_help")}</FooterHelp>
    </Page>
  );
};
