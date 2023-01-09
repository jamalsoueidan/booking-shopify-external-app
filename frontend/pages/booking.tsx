import LoadingSpinner from "@components/LoadingSpinner";
import Calendar from "@components/booking/Calendar";
import StaffSelection from "@components/booking/StaffSelection";
import { useFulfillment } from "@hooks/useFulfillment";
import { useTranslation } from "@hooks/useTranslation";
import { useBookingGetStaff, useBookings } from "@services/booking";
import { Badge, Card, FooterHelp, Page } from "@shopify/polaris";
import { Suspense, useMemo, useState } from "react";

export default () => {
  const [info, setInfo] = useState(null);
  const [staff, setStaff] = useState<Staff>();
  const [date, setDate] = useState<Pick<GetBookingsRequest, "start" | "end">>();

  const { t } = useTranslation("bookings");

  const { options } = useFulfillment();
  const { data: staffier } = useBookingGetStaff();
  const { data: bookings, isLoading } = useBookings({
    start: date?.start,
    end: date?.end,
    staff: staff?._id,
  });

  const badges = useMemo(
    () =>
      options.map((o) => (
        <Badge key={o.label} status={o.status} progress="complete">
          {o.label
            ? o.label.charAt(0).toUpperCase() + o.label.slice(1)
            : "In progress"}
        </Badge>
      )),
    [options]
  );

  return (
    <Page fullWidth title={t("title")}>
      <Card sectioned>
        <Card.Section title={badges}>
          <StaffSelection
            isLoadingBookings={isLoading}
            data={staffier}
            selected={staff}
            onSelect={setStaff}
          ></StaffSelection>
        </Card.Section>
        <Card.Section>
          <Suspense fallback={<LoadingSpinner />}>
            <Calendar
              data={bookings}
              onOpenModal={setInfo}
              onChangeDate={setDate}
            />
          </Suspense>
        </Card.Section>
      </Card>
      <FooterHelp>
        Kan ikke ændre i bookinger der er refunderet eller oprettet tidligere
        end dagens dato.
      </FooterHelp>
    </Page>
  );
};
