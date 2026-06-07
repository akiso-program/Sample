import React, { useState } from "react";
import { supabase } from "../utils/supabase";
import ImageUploader from "../utils/ImageUploader";

const AddItemPage: React.FC = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [youtube, setYoutube] = useState("");

  const handleSubmit = async () => {
    const { error } = await supabase.from("Items").insert({
      name,
      category,
      image: imageUrl,
      youtube
    });

    if (error) {
      alert("保存に失敗しました");
      return;
    }

    alert("追加しました！");
  };

  return (
    <div>
      <h2>項目追加ページ</h2>

      <label>名前</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <label>カテゴリ</label>
      <input value={category} onChange={(e) => setCategory(e.target.value)} />

      <label>画像</label>
      <ImageUploader onUploaded={setImageUrl} />

      <label>YouTube URL</label>
      <input value={youtube} onChange={(e) => setYoutube(e.target.value)} />

      <button onClick={handleSubmit}>追加</button>
    </div>
  );
};

export default AddItemPage;
