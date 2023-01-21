import { Modal, Tabs } from "@shopify/polaris";
import { useCallback, useRef, useState } from "react";
import { CreateManyShiftsModal } from "./create-many-shifts-modal";
import { CreateOneShiftModal } from "./create-one-shift-modal";
import {
  CreateManyShiftsRefMethod,
  CreateOneShiftRefMethod,
} from "@jamalsoueidan/bsf.bsf-pkg";

export default ({ info, setInfo }: any) => {
  const ref = useRef<CreateManyShiftsRefMethod | CreateOneShiftRefMethod>();
  const toggleActive = useCallback(() => setInfo(null), []);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex: number) => setSelected(selectedTabIndex),
    []
  );

  const submit = useCallback(() => {
    const noErrors = ref.current.submit().length === 0;
    setLoading(true);
    if (noErrors) {
      setInfo(null);
    }
  }, [ref]);

  const tabs = [
    {
      id: "create-all",
      content: "Create for range",
    },
    {
      id: "create-day",
      content: `Create for day`,
    },
  ];

  return (
    <Modal
      open={true}
      onClose={toggleActive}
      title="New availability"
      primaryAction={{
        content: `${tabs[selected].content}`,
        onAction: submit,
        loading,
      }}
      secondaryActions={[
        {
          content: "Luk",
          onAction: toggleActive,
        },
      ]}
    >
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <Modal.Section>
          {tabs[selected].id === "create-day" ? (
            <CreateOneShiftModal
              ref={ref}
              date={info.dateStr}
            ></CreateOneShiftModal>
          ) : (
            <CreateManyShiftsModal
              ref={ref}
              date={info.dateStr}
            ></CreateManyShiftsModal>
          )}
        </Modal.Section>
      </Tabs>
    </Modal>
  );
};
