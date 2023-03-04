import { Product, ProductServiceUpdateBodyStaffProperty } from "@jamalsoueidan/pkg.backend-types";
import { DynamicList } from "@shopify/react-form/build/ts/hooks/list/dynamiclist";
import { Suspense, lazy, memo, useCallback, useState } from "react";
import FormContext from "./staff/form-context";
import { StaffList } from "./staff/staff-list";

const StaffModal = lazy(() => import("./staff/staff-modal"));

interface StaffCardProps {
  product: Product<ProductServiceUpdateBodyStaffProperty>;
  field: DynamicList<ProductServiceUpdateBodyStaffProperty>;
}

export default memo(({ product, field }: StaffCardProps) => {
  const [showModal, setShowModal] = useState(false);

  const show = useCallback(() => setShowModal(() => true), []);
  const hide = useCallback(() => setShowModal(() => false), []);

  return (
    <FormContext.Provider value={{ field, product }}>
      <StaffList action={show} />
      <Suspense>
        <StaffModal productId={product._id} show={showModal} close={hide} />
      </Suspense>
    </FormContext.Provider>
  );
});
