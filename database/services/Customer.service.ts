import CustomerModel from "@models/Customer.model";

interface FindCustomerProps {
  shop: string;
  name: string;
}

const findCustomer = ({ shop, name }: FindCustomerProps) => {
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const searchRgx = rgx(name);

  return CustomerModel.find(
    {
      $or: [
        { firstName: { $regex: searchRgx, $options: "i" } },
        { lastName: { $regex: searchRgx, $options: "i" } },
      ],
      shop,
    },
    "customerId firstName lastName"
  )
    .limit(10)
    .lean();
};

export default { findCustomer };
