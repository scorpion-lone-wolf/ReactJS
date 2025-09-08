import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";

function Menu() {
  const { menuData } = useLoaderData();
  console.log(menuData);

  return (
    <ul>
      {menuData.map(pizza => {
        return <MenuItem pizza={pizza} key={pizza.id} />;
      })}
    </ul>
  );
}

export default Menu;
