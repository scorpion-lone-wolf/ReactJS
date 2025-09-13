import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import EmptyCart from "../cart/EmptyCart";
import { getTotalCartQuantityAndPrice } from "../cart/cartSlice";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
// eslint-disable-next-line react-refresh/only-export-components
export const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const formErrors = useActionData();
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);
  const { totalPrice } = useSelector(getTotalCartQuantityAndPrice);
  const cart = useSelector((state) => state.cart.cart);
  const isAddressLoading = addressStatus === "loading";
  const isSubmitting = navigation.state === "submitting";
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const finalPrice = totalPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="post" action="/order/new">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              type="text"
              name="customer"
              required
              defaultValue={userName}
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              disabled={isAddressLoading}
              defaultValue={address}
              className="input w-full"
            />
          </div>
          {addressError && (
            <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
              {addressError}
            </p>
          )}
          {!position.latitude && !position.longitude && (
            <span
              className={`absolute top-9.5 right-[5px] -z-10 sm:top-1.5 ${addressError ? "sm:right-48" : ""} md:top-0.5`}
            >
              <Button
                disabled={isAddressLoading}
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
            className="bg-white"
          />
          <Button type="primary" disabled={isSubmitting || isAddressLoading}>
            {isSubmitting
              ? "placing order"
              : `Order now ${formatCurrency(finalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
