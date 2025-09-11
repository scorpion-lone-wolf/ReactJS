import { Form, useActionData, useNavigation } from "react-router-dom";

// https://uibakery.io/regex-library/phone-number
// eslint-disable-next-line react-refresh/only-export-components
export const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const formData = useActionData();
  const cart = fakeCart;
  const isSubmitting = navigation.state === "submitting";

  console.log(formData);
  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="post" action="/order/new">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required className="bg-white" />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required className="bg-white" />
          </div>
          {formData?.phone && <p>{formData.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input
              type="text"
              name="address"
              required
              className="focus:ring- w-full rounded-full border border-stone-200 px-4 py-2 transition-all duration-300 focus:ring focus:ring-yellow-400 focus:outline-none md:px-6 md:py-4"
            />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
            className="bg-white"
          />
          <button
            disabled={isSubmitting}
            className="rounded-full bg-yellow-400 px-4 py-3 font-semibold tracking-wide text-stone-800 uppercase transition-colors duration-300 hover:bg-yellow-300 focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed"
          >
            {isSubmitting ? "placing order" : "Order now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;
