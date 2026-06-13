import React from "react";
import { useModalStore } from "../store/useModalStore";

type Props = {
  item: any;
};

const ItemCard: React.FC<Props> = ({ item }) => {
  const openModal = useModalStore((s) => s.openModal);

  return (
    <div className="item-card" onClick={() => openModal(item)}>
      <img src={item.image} alt={item.name} />
      <div className="name">{item.name}</div>
    </div>
  );
};

export default ItemCard;
