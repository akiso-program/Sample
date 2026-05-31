import React from "react";
import HeaderNav from "./HeaderNav";
import CategorySection from "./CategorySection";
import ItemModal from "./ItemModal";
import rawItems  from "../data/items.json";

const PageLayout: React.FC = () => {
  // ここで BASE_URL を付けた items に変換する
  const items = rawItems.map(item => ({
    ...item,
    image: `${import.meta.env.BASE_URL}${item.image}`
  }));
  const categories = [...new Set(items.map(item => item.category))];
  return (
    <div>
      <HeaderNav categories={categories} />
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

      <ItemModal />
    </div>
  );
};

export default PageLayout;