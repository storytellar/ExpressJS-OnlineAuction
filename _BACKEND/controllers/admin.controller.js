module.exports.welcome = async (req, res) => {
  res.render("home");
};

module.exports.showCategory = async (req, res) => {
  const list = [
    { CatID: 1, CatName: "Laptop" },
    { CatID: 2, CatName: "Smartphone" },
    { CatID: 3, CatName: "Tablet" },
    { CatID: 4, CatName: "Quần áo" },
    { CatID: 5, CatName: "Giày dép" },
    { CatID: 6, CatName: "Trang sức" }
  ];
  res.render("vwCategories/index", {
    categories: list,
    empty: list.length === 0
  });
};

module.exports.test = async (req, res) => {
  res.render("bs", {
    layout: false
  });
};
