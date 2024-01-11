import "./Categories.css";

function Categories({ changeCat }) {
  const categories = [
    "Beauty",
    "Technology",
    "Furniture",
    "Guns",
    "Other",
    "All",
  ];

  return (
    <div id="categories">
      <div className="categories-header">
        <h1>Categories</h1>
      </div>
      <div>
        <ul>
          {categories.map((cat) => {
            return (
              <li key={cat}>
                <a
                  onClick={() => {
                    changeCat(cat);
                  }}
                >
                  {cat}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Categories;
