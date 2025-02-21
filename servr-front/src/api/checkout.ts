import { checkoutApi } from "./api";

type checkoutItem = {
  name: string;
  quantity: number;
  unitAmount: number;
};

export type checkoutReq = {
  customerEmail: string;
  storeId?: string;
  items: checkoutItem[];
};
export const checkoutPost = async (checkout: checkoutReq): Promise<string> => {
  const res: any = await checkoutApi.post(
    `/checkout/${process.env.NEXT_PUBLIC_NH_CHECKOUT_USER}?gateway=STRIPE&env=${process.env.NEXT_PUBLIC_CHECKOUT_ENV}`, //id of user in checkout, change later
    checkout
  );

  return res.data.url;
};
