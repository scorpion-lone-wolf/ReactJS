import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

function Menu() {
  const { menuData } = useLoaderData();
  console.log(menuData);

  return (
    <ul className="divide-y divide-stone-300">
      {menuData.map((pizza) => {
        return <MenuItem pizza={pizza} key={pizza.id} />;
      })}
    </ul>
  );
}

export default Menu;
