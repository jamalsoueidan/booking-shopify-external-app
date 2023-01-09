import LoadingSpinner from "@components/LoadingSpinner";
import { useTranslation } from "@hooks";
import { Avatar, Button, Stack } from "@shopify/polaris";
import { memo, useCallback, useMemo } from "react";

interface Props {
  data: Staff[];
  selected: Staff;
  isLoadingBookings: boolean;
  onSelect: (value: Staff) => void;
}

export default memo(
  ({ data, selected, onSelect, isLoadingBookings }: Props) => {
    const { t } = useTranslation("bookings");

    const onClick = useCallback(() => {
      onSelect(null);
    }, [onSelect]);

    const buttons = useMemo(
      () =>
        data?.map((s) => (
          <StaffButton
            key={s._id}
            selectedStaff={selected}
            onSelect={onSelect}
            staff={s}
            isLoadingBookings={isLoadingBookings}
          />
        )),
      [data, selected, onSelect, isLoadingBookings]
    );

    if (!data) {
      return <LoadingSpinner />;
    }

    return (
      <Stack>
        <Button
          icon={<Avatar size="medium" />}
          size="large"
          onClick={onClick}
          pressed={!selected}
          loading={!selected ? isLoadingBookings : false}
        >
          {t("all")}
        </Button>
        {buttons}
      </Stack>
    );
  }
);

interface StaffButtonProps {
  selectedStaff: Staff;
  staff: Staff;
  onSelect: (value: Staff) => void;
  isLoadingBookings?: boolean;
}

const StaffButton = memo(
  ({ selectedStaff, staff, onSelect, isLoadingBookings }: StaffButtonProps) => {
    const onClick = useCallback(() => onSelect(staff), [onSelect]);

    return (
      <Button
        size="large"
        key={staff._id}
        onClick={onClick}
        pressed={selectedStaff?._id === staff._id}
        loading={selectedStaff?._id === staff._id ? isLoadingBookings : false}
        icon={
          <Avatar size="medium" name={staff.fullname} source={staff.avatar} />
        }
      >
        {staff.fullname}
      </Button>
    );
  }
);
