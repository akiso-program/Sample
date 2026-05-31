
import React from "react";
import { useModalStore } from "../store/useModalStore";

const ItemModal: React.FC = () => {
  const { selectedItem, closeModal } = useModalStore();

  if (!selectedItem) return null;

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={selectedItem.image} alt={selectedItem.name} />
        {/* YouTube 動画（あれば表示） */}
        {selectedItem.youtube && (
          <div className="youtube-wrapper">
            <iframe
              //width="100%"
              height="315"
              src={selectedItem.youtube}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
        <h3>{selectedItem.name}</h3>
        {selectedItem.description && <p>{selectedItem.description}</p>}
        <button onClick={closeModal}>閉じる</button>
      </div>
    </div>
  );
};

export default ItemModal;
