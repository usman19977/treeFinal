const categories = [
  // ================ writing ==================
  {
    name: "writing",
    subCategories: [
      {
        name: "NoteBooks",
        subCategories: [],
      },
      {
        name: "Natural",
        subCategories: [],
      },
      {
        name: "Journal",
        subCategories: [],
      },
    ],
  },
  // ================ bags ==================
  {
    name: "bags",
    subCategories: [
      {
        name: "Shopping bags",
        subCategories: [
          {
            link: `/products/bags/shopping`,
            dataName: "bags",
            name: "all",
          },
          {
            link: `/products/bags/shopping/cotton`,
            dataName: "bags",
            name: "cotton",
          },
          {
            link: `/products/bags/shopping/nonWoven`,
            dataName: "bags",
            name: "non-woven",
          },
        ],
      },
      {
        name: "Backpacks",
        subCategories: [
          {
            link: `/products/bags/backpacks/drawstring`,
            dataName: "bags",
            name: "Drawstring",
          },
          {
            link: `/products/bags/backpacks/rucksack`,
            dataName: "bags",
            name: "Rucksacks",
          },
          {
            link: `/products/bags/business/messenger`,
            dataName: "bags",
            name: "Messenger",
          },
        ],
      },
      {
        name: "Sports",
        subCategories: [
          {
            link: `/products/bags/sports/duffel`,
            dataName: "bags",
            name: "duffle",
          },
          {
            link: `/products/bags/sports/cooler`,
            dataName: "bags",
            name: "cooler",
          },
        ],
      },
    ],
  },
  // ================ drinkware ==================
  {
    name: "drinkware",
    subCategories: [
      {
        name: "Ceramics",
        subCategories: [
          {
            link: `/products/drinkware/ceramic`,
            dataName: "drinkware",
            name: "all",
          },
          {
            link: `/products/drinkware/ceramic/mug`,
            dataName: "drinkware",
            name: "mugs",
          },
          {
            link: `/products/drinkware/ceramic/tumbler`,
            dataName: "drinkware",
            name: "tumblers",
          },
        ],
      },
      {
        name: "Sports Bottle",
        subCategories: [
          {
            link: `/products/drinkware/sports_bottle`,
            dataName: "drinkware",
            name: "all",
          },
          {
            link: `/products/drinkware/sports_bottle/aluminium`,
            dataName: "drinkware",
            name: "alumimium",
          },
          {
            link: `/products/drinkware/sports_bottle/stainless steel`,
            dataName: "drinkware",
            name: "stainless steel",
          },
          {
            link: `/products/drinkware/sports_bottle/plastic`,
            dataName: "drinkware",
            name: "plastic",
          },
        ],
      },
      {
        name: "Insultated",
        subCategories: [
          {
            link: `/products/drinkware/insulated`,
            dataName: "drinkware",
            name: "all",
          },
          {
            link: `/products/drinkware/insulated/tumbler`,
            dataName: "drinkware",
            name: "tumblers",
          },
          {
            link: `/products/drinkware/insulated/mug`,
            dataName: "drinkware",
            name: "mugs",
          },
          {
            link: `/products/drinkware/insulated/bottle`,
            dataName: "drinkware",
            name: "bottles",
          },
          {
            link: `/products/drinkware/insulated/growler`,
            dataName: "drinkware",
            name: "growler",
          },
        ],
      },
    ],
  },
  // ================ clothing ==================
  {
    name: "clothing",
    subCategories: [
      {
        name: "T-Shirt",
        subCategories: [
          {
            link: `/products/clothing/t_shirt`,
            dataName: "clothing",
            name: "all",
          },
          {
            link: `/products/clothing/t_shirt/t_shirt`,
            dataName: "clothing",
            name: "t_shirt",
          },
          {
            link: `/products/clothing/t_shirt/polo`,
            dataName: "clothing",
            name: "polo shirt",
          },
        ],
      },

      {
        name: "sweatshirt",
        subCategories: [
          {
            link: `/products/clothing/sweatshirt`,
            dataName: "clothing",
            name: "all",
          },
          {
            link: `/products/clothing/sweatshirt/hoodie`,
            dataName: "clothing",
            name: "hoodie",
          },
        ],
      },
      {
        name: "jacket",
        subCategories: [
          {
            link: `/products/clothing/jacket`,
            dataName: "clothing",
            name: "all",
          },
          {
            link: `/products/clothing/jacket/mens`,
            dataName: "clothing",
            name: "mens",
          },
          {
            link: `/products/clothing/jacket/womens`,
            dataName: "clothing",
            name: "womens",
          },

          {
            link: `/products/clothing/jacket/knitwear`,
            dataName: "clothing",
            name: "knitware",
          },
          {
            link: `/products/clothing/jacket/recyled_sythetic`,
            dataName: "clothing",
            name: "recyled-sythetics",
          },
        ],
      },
      {
        name: "headware",
        subCategories: [
          {
            link: `/products/clothing/headware`,
            dataName: "clothing",
            name: "all",
          },
          {
            link: `/products/clothing/headware/cap`,
            dataName: "clothing",
            name: "cap",
          },
          {
            link: `/products/clothing/headware/mesh_backed_cap`,
            dataName: "clothing",
            name: "mesh-backed cap",
          },
          {
            link: `/products/clothing/headware/sports_headgear`,
            dataName: "clothing",
            name: "sports headgear",
          },
        ],
      },
    ],
  },
  // ================ bags ==================
  {
    name: "safety",
    subCategories: [
      {
        name: "Masks",
        subCategories: [
          {
            link: `/products/safety`,
            dataName: "safety",
            name: "all",
          },
          {
            link: `/products/safety/facemask`,
            dataName: "safety",
            name: "facemasks",
          },
          {
            link: `/products/safety/snood`,
            dataName: "safety",
            name: "snood",
          },
        ],
      },

    ],
  },
];

module.exports = categories;
