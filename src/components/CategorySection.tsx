import React from "react";
import ItemCard from "./ItemCard";

type Props = {
  id: string;
  title: string;
  items: any[];
};

const CategorySection: React.FC<Props> = ({ id, title, items }) => {
  return (
    <section id={id} className="category-section">
      <h2>{title}</h2>
      <div className="grid">
        {items.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
