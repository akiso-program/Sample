import React, { useEffect, useState } from "react";
import HeaderNav from "./HeaderNav";
import CategorySection from "./CategorySection";
import ItemModal from "./ItemModal";
import EditItemModal from "./EditItemModal";
import { supabase } from "../utils/supabase";
import { toEmbedUrl } from "../utils/toEmbedUrl";
import { useModalStore, type Item } from "../store/useModalStore";

const PageLayout: React.FC<{ mode: "view" | "edit" }> = ({ mode }) => {
  const [items, setItems] = useState<Item[]>([]);
  
  const fetchItems = async () => {
    const { data } = await supabase
      .from("Items")
      .select()
      .order("created_at", { ascending: true });

    setItems(
      (data ?? []).map(item => ({
        ...item,
        youtube: item.youtube ? toEmbedUrl(item.youtube) : null
      }))
    );
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const openModal = useModalStore((s) => s.openModal);
  const categories = [...new Set(items.map(item => item.category))];
  return (
    <div>
      <HeaderNav categories={categories} />
      {mode === "edit" && (
        <button
          className="add-button"
          onClick={() => openModal({})}  // ← 空オブジェクトで「追加モード」
        >
          Add Item
        </button>
      )}
      <main>
        {categories.map(category => {
          const categoryItems = items.filter(item => item.category === category);
          return (
            <CategorySection
              key={category}
              id={category}
              title={category}
              items={categoryItems}
            />
          );
        })}
      </main>

      {/* 閲覧モーダル（通常モード） */}
      {mode === "view" && (
        <ItemModal />
      )}

      {/* 編集モーダル（編集モード） */}
      {mode === "edit" && (
        <EditItemModal fetchItems={fetchItems} />
      )}
    </div>
  );
};

export default PageLayout;