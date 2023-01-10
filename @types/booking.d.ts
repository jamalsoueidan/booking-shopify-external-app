interface Booking {
  _id: string;
  productId: number;
  orderId: number;
  lineItemId: number;
  lineItemTotal: number;
  customerId: number;
  staff: string;
  start: Date;
  end: Date;
  shop: string;
  anyAvailable?: boolean;
  fulfillmentStatus: FulfillmentStatus;
  title: string;
  timeZone: string;
  isEdit?: boolean;
  isSelfBooked?: boolean;
}

interface GetBookingsResponse extends Booking {
  customer: Customer;
  product: Product;
  staff: Staff;
  start: string;
  end: string;
}

interface GetBookingsRequest {
  start: string;
  end: string;
  staff: string;
}

interface BookingBodyUpdateRequest extends Pick<Booking, "staff"> {
  start: string;
  end: string;
}

interface BookingBodyCreateRequest
  extends Pick<Booking, "productId" | "customerId" | "staff"> {
  start: string;
  end: string;
}
