
import React from "react";
import { useModalStore } from "../store/useModalStore";

const ItemModal: React.FC = () => {
  const { selectedItem, closeModal } = useModalStore();

  if (!selectedItem) return null;

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={selectedItem.image} alt={selectedItem.name} />
        <h3>{selectedItem.name}</h3>
        {selectedItem.description && <p>{selectedItem.description}</p>}
        <button onClick={closeModal}>閉じる</button>
      </div>
    </div>
  );
};

export default ItemModal;
