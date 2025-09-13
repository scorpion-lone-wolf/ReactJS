// src/features/order/Order.jsx
// Test ID: IIDSAT

import { useEffect } from "react";
import { useFetcher, useLoaderData } from "react-router-dom";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "./OrderItem";
import UpdateOrder from "./UpdateOrder";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're excluding names or address
  const { order } = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  return (
    <div className="mx-auto max-w-3xl space-y-8 px-4 py-6">
      {/* Order Header */}
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wide text-white uppercase shadow-sm">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold tracking-wide text-white uppercase shadow-sm">
            {status} order
          </span>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-stone-100 px-6 py-5 shadow-sm">
        <p className="font-medium text-stone-700">
          {deliveryIn >= 0
            ? `Only ${deliveryIn} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      {/* Cart Items */}
      <ul className="divide-y divide-stone-200 border-t border-b border-stone-200">
        {cart.map((item) => {
          const menuItem = fetcher?.data?.menuData.find(
            (el) => el.id === item.pizzaId,
          );
          return (
            <OrderItem
              item={item}
              key={item.pizzaId}
              isLoadingIngredients={fetcher.state === "loading"}
              ingredients={menuItem?.ingredients}
            />
          );
        })}
      </ul>

      {/* Price Summary */}
      <div className="space-y-2 rounded-lg bg-stone-100 px-6 py-5 shadow-sm">
        <p className="text-sm font-medium text-stone-600">
          Pizza price: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Priority fee: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold text-stone-800">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

export default Order;
