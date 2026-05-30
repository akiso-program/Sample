import React from "react";

type HeaderNavProps = {
  categories: string[];
};
const HeaderNav: React.FC<HeaderNavProps> = ({ categories }) => {
  return (
    <header className="header-nav">
      <div className="brand">廣億畜牧器具行</div>
      <nav>
        <ul>
          {categories.map(category => (
            <li key={category}>
              <a href={`#${category}`}>{category}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNav;
