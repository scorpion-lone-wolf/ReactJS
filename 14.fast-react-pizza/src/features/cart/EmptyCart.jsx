import LinkButton from "../../ui/LinkButton";

function EmptyCart() {
  return (
    <div className="px-3 py-5">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="my-7 font-bold tracking-wide">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
