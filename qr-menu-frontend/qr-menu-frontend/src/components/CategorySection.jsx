import MenuCard from "./MenuCard";

function CategorySection({ category }) {
  return (
    <div className="category-section">

      <h2 className="category-title">
        {category.category_name}
      </h2>

      {category.items.map((item) => (
        <MenuCard
          key={item.id}
          item={item}
        />
      ))}

    </div>
  );
}

export default CategorySection;