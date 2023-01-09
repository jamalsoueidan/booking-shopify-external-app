import LoadingSpinner from "@components/LoadingSpinner";
import { DatesSetArg, EventClickArg } from "@fullcalendar/core";
import { padTo2Digits } from "@helpers/pad2Digits";
import { useDate } from "@hooks/useDate";
import { useFulfillment } from "@hooks/useFulfillment";
import { Avatar, Tooltip } from "@shopify/polaris";
import { Suspense, lazy, memo, useCallback, useMemo, useState } from "react";

const Calendar = lazy(() => import("../BaseCalendar"));

interface CalendarProps {
  data: Array<GetBookingsResponse>;
  onOpenModal: (info: GetBookingsResponse) => void;
  onChangeDate: (date: Pick<GetBookingsRequest, "start" | "end">) => void;
}

export default memo(({ data, onOpenModal, onChangeDate }: CalendarProps) => {
  const [date, setDate] = useState<Pick<GetBookingsRequest, "start" | "end">>();
  const { getColor } = useFulfillment();
  const { toTimeZone } = useDate();

  const dateChanged = useCallback(
    (props: DatesSetArg) => {
      const newDate = {
        start: props.start.toISOString().slice(0, 10),
        end: props.end.toISOString().slice(0, 10),
      };

      if (newDate.start !== date?.start || newDate.end !== date?.end) {
        setDate(newDate);
        onChangeDate(newDate);
      }
    },
    [date]
  );

  const events = useMemo(
    () =>
      data?.map((d) => ({
        ...d,
        start: toTimeZone(new Date(d.start)),
        end: toTimeZone(new Date(d.end)),
        backgroundColor: getColor(d.fulfillmentStatus),
        color: getColor(d.fulfillmentStatus),
        textColor: "#202223",
      })) || [],
    [data]
  );

  const eventContent = useCallback((arg: any) => {
    const booking: GetBookingsResponse = arg.event.extendedProps;
    const extendHour = (
      <i>
        {padTo2Digits(arg.event.start.getHours()) +
          ":" +
          padTo2Digits(arg.event.start.getMinutes())}{" "}
        -
        {padTo2Digits(arg.event.end.getHours()) +
          ":" +
          padTo2Digits(arg.event.end.getMinutes())}
      </i>
    );

    const fulfillmentStatus = booking.fulfillmentStatus || "In progress";

    return (
      <Tooltip content={fulfillmentStatus} dismissOnMouseOut>
        <div
          style={{ cursor: "pointer", padding: "4px", position: "relative" }}
        >
          <div>{extendHour}</div>
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: "4px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Avatar
              size="small"
              name={booking.staff?.fullname}
              shape="square"
              source={booking.staff?.avatar}
            />
          </div>
          <div
            style={{
              overflow: "hidden",
            }}
          >
            {arg.event.title}
          </div>
        </div>
      </Tooltip>
    );
  }, []);

  const showBooking = useCallback(({ event }: EventClickArg) => {
    /*onOpenModal({
      ...event._def.extendedProps,
      start: event.startStr,
      end: event.endStr,
      title: event.title,
    });*/
  }, []);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Calendar
        events={events}
        eventContent={eventContent}
        datesSet={dateChanged}
        eventClick={showBooking}
      />
    </Suspense>
  );
});
