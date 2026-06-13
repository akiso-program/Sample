import React, { useState, useEffect  } from "react";
import { supabase } from "../utils/supabase";
import ImageUploader from "../utils/ImageUploader";
import { useModalStore } from "../store/useModalStore";

const EditItemModal : React.FC<{ fetchItems: () => void; categories: string[]}> = ({ fetchItems, categories }) => {
  const { selectedItem, closeModal } = useModalStore();

  const [name, setName] = useState(selectedItem?.name ?? "");
  const [category, setCategory] = useState(selectedItem?.category ?? "");
  const [image, setImage] = useState(selectedItem?.image ?? "");
  const [youtube, setYoutube] = useState(selectedItem?.youtube ?? "");
  const [description, setDescription] = useState(selectedItem?.description ?? "");

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name?? "");
      setCategory(selectedItem.category?? "");
      setImage(selectedItem.image?? "");
      setYoutube(selectedItem.youtube ?? "");
      setDescription(selectedItem.description ?? "");
    }
  }, [selectedItem])
  const handleInsert = async () => {
    await supabase.from("Items").insert({
      name,
      category,
      image,
      youtube,
      description
    });
    await fetchItems();
    alert("Added");
    closeModal();
  };


  const handleUpdate = async () => {
    if (!selectedItem) return; 
    await supabase.from("Items").update({
      name,
      category,
      image,
      youtube,
      description
    }).eq("id", selectedItem.id);

    await fetchItems(); // ← これが超重要
    alert("Updated");
    closeModal();
  };

  const handleDelete = async () => {
    if (!selectedItem) return; 
    await supabase.from("Items").delete().eq("id", selectedItem.id);
    alert("Deleted");
    await fetchItems(); // ← これが超重要
    closeModal();
  };

  if (!selectedItem) return null;
  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />

        <label>Image</label>
        <ImageUploader onUploaded={setImage} />
        {image && <img src={image} width={200} />}

        <label>YouTube URL</label>
        <input value={youtube} onChange={(e) => setYoutube(e.target.value)} />

        <label>Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

        {selectedItem?.id 
          ? <button onClick={handleUpdate}>Update</button> 
          : <button onClick={handleInsert}>Add</button>
        }
        {selectedItem?.id && (
          <button onClick={handleDelete} className="delete-btn">Delete</button>
        )}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default EditItemModal;