import React, { useState } from "react";

interface Props {
  onUploaded: (url: string) => void;
}

const ImageUploader: React.FC<Props> = ({ onUploaded }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hang_sample"); // ←ここを変更

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dgpymo62q/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    setUploading(false);

    if (data.secure_url) {
      onUploaded(data.secure_url);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploading && <p>アップロード中…</p>}
    </div>
  );
};

export default ImageUploader;
