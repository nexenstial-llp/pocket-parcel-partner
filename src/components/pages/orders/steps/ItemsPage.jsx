/* eslint-disable react/prop-types */

import ItemDetails from "./ItemDetails";
import ItemsInShipment from "./ItemsInShipment";

const ItemsPage = ({ order_type }) => {
  return (
    <div className="flex flex-col gap-4">
      <ItemDetails />
      {order_type === "b2bGlobal" && <ItemsInShipment />}
    </div>
  );
};

export default ItemsPage;
