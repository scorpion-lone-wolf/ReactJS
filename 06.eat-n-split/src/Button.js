export function Button({ children, onClick, type = "button" }) {
  return (
    <button className="button" onClick={onClick} type={type}>
      {children}
    </button>
  );
}
