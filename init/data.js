const sampleRecipes = [
  {
    name: "Bisi Bele Bath",
    description: "A spicy and flavorful rice dish cooked with lentils, vegetables, and a special spice mix.",
    email: "chef21@example.com",
    instructions: "1. Cook rice and lentils separately. 2. Prepare a spice mix and sauté with vegetables. 3. Combine with rice and lentils and simmer.",
    ingredients: [
      "1 cup rice",
      "1/2 cup toor dal",
      "2 tbsp bisi bele bath powder",
      "1/2 cup tamarind juice",
      "1 cup mixed vegetables",
      "2 tbsp ghee",
      "Salt to taste"
    ],
    category: "South-Indian",
    dietType: "Vegetarian",
    image: "https://www.theculinarypeace.com/wp-content/uploads/2019/09/IMG-6010-2-757x1024.jpg",
    user: "677a9d7dd9ae00cc71093ea3"
  },
  {
    name: "Mysore Pak",
    description: "A rich and traditional sweet made with ghee, gram flour, and sugar.",
    email: "chef22@example.com",
    instructions: "1. Roast gram flour in ghee. 2. Prepare a sugar syrup and mix with the roasted flour. 3. Cook until thick and set.",
    ingredients: [
      "1 cup gram flour",
      "2 cups sugar",
      "1 cup ghee",
      "1/2 cup water"
    ],
    category: "Kashmiri-Dishes",
    dietType: "Vegetarian",
    image: "https://t3.ftcdn.net/jpg/09/99/15/96/360_F_999159657_CA6dSwsclqvFl5pIdGKDkfH33LIMuFAm.jpg",
    user: "677a9d7dd9ae00cc71093ea3"
  },
  {
    name: "Ragi Mudde",
    description: "A nutritious finger millet ball, traditionally served with spicy sambar or curry.",
    email: "chef23@example.com",
    instructions: "1. Boil water and add ragi flour. 2. Stir continuously to make a thick paste. 3. Shape into balls and serve.",
    ingredients: [
      "1 cup ragi flour",
      "2 cups water",
      "Salt to taste"
    ],
    category: "South-Indian",
    dietType: "Gluten-Free",
    image: "https://faridascookbook.com/wp-content/uploads/2023/05/ragi-mudde-i-4-jpg.webp",
    user: "677a9d7dd9ae00cc71093ea3"
  },
  {
    name: "Mangalore Buns",
    description: "Soft and fluffy banana puris, a popular breakfast or snack item from coastal Karnataka.",
    email: "chef24@example.com",
    instructions: "1. Mash bananas and mix with flour, sugar, and yogurt. 2. Knead to form a dough and rest. 3. Roll into discs and deep fry.",
    ingredients: [
      "2 ripe bananas",
      "2 cups wheat flour",
      "1/4 cup sugar",
      "1/2 cup yogurt",
      "1/2 tsp baking soda",
      "Salt to taste"
    ],
    category: "South-Indian",
    dietType: "Vegetarian",
    image: "https://th-i.thgim.com/public/migration_catalog/article14354618.ece/alternates/FREE_1200/07BGMBUN",
    user: "677a9d7dd9ae00cc71093ea3"
  },
  {
    name: "Neer Dosa",
    description: "A delicate, paper-thin rice crepe, a signature dish from coastal Karnataka.",
    email: "chef25@example.com",
    instructions: "1. Soak and grind rice to a thin batter. 2. Add water to make it flowy. 3. Pour on a hot pan and cook until done.",
    ingredients: [
      "1 cup rice",
      "2 cups water",
      "Salt to taste"
    ],
    category: "South-Indian",
    dietType: "Gluten-Free",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ20KmCozQDhRVlsJQ4_36SQiVzN-4Dqs99Q&s",
    user: "677a9d7dd9ae00cc71093ea3"
  },
  {
    name: "Obbattu (Holige)",
    description: "A traditional sweet flatbread stuffed with jaggery and lentils, served during festivals.",
    email: "chef26@example.com",
    instructions: "1. Prepare a dough using flour and water. 2. Cook lentils and jaggery to make the filling. 3. Roll dough, stuff with filling, and cook on a hot griddle.",
    ingredients: [
      "2 cups all-purpose flour",
      "1 cup jaggery",
      "1 cup chana dal",
      "2 tbsp ghee",
      "1/2 tsp cardamom powder",
      "Water as needed"
    ],
    category: "South-Indian",
    dietType: "Vegetarian",
    image: "https://t4.ftcdn.net/jpg/04/08/03/13/360_F_408031370_Y1p70pw0pa5fOyYDXFJSPn1j2mGsP5rn.jpg",
    user: "677a9d7dd9ae00cc71093ea3"
  },
  {
    name: "Kane Rava Fry",
    description: "A coastal Karnataka delicacy of ladyfish marinated in spices and fried with semolina.",
    email: "chef27@example.com",
    instructions: "1. Marinate fish with spices. 2. Coat with semolina and shallow fry. 3. Serve hot.",
    ingredients: [
      "500g ladyfish",
      "2 tbsp chili powder",
      "1 tsp turmeric powder",
      "Salt to taste",
      "1/2 cup semolina",
      "2 tbsp coconut oil"
    ],
    category: "South-Indian",
    dietType: "Non-Vegetarian",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4uHr-sODQ5pJI8LY30p8VjjFx6t1sdDf7Pg&s",
    user: "677a9d7dd9ae00cc71093ea3"
  },
  {
    name: "Akki Roti",
    description: "A simple rice flour flatbread flavored with onions and green chilies.",
    email: "chef28@example.com",
    instructions: "1. Mix rice flour with water, onions, and spices to form a dough. 2. Flatten and cook on a griddle. 3. Serve with chutney.",
    ingredients: [
      "2 cups rice flour",
      "1/2 cup finely chopped onions",
      "2 green chilies, chopped",
      "1 tbsp grated coconut",
      "Salt to taste",
      "Water as needed"
    ],
    category: "South-Indian",
    dietType: "Gluten-Free",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgiEer2raJXsAXymjQ6P6JvFHsCtkdn12XvrCYjSAYpMDJJTBSzPWqHF8eVmoBpdjdNx8yl1uekCf7T53NH60EU_3KjrXDBEQtKXjTyVoUdHR-jJhbTdHQBpwwONm2by4yVDGDs3q_YVacD/s1600/Akki+Rotti+with+BY+W.JPG",
    user: "677a9d7dd9ae00cc71093ea3"
  },
  {
    name: "Goli Baje",
    description: "Soft and fluffy fritters made with maida, yogurt, and spices, a favorite tea-time snack.",
    email: "chef29@example.com",
    instructions: "1. Mix flour, yogurt, and spices to make a batter. 2. Rest the batter for 1 hour. 3. Deep fry small portions until golden.",
    ingredients: [
      "2 cups all-purpose flour",
      "1 cup yogurt",
      "1 tsp baking soda",
      "1 tbsp finely chopped ginger",
      "1 tbsp green chilies, chopped",
      "Salt to taste",
      "Oil for frying"
    ],
    category: "South-Indian",
    dietType: "Vegetarian",
    image: "https://www.vegrecipesofindia.com/wp-content/uploads/2018/11/goli-baje-recipe-1.jpg",
    user: "677a9d7dd9ae00cc71093ea3"
  },
  {
    name: "Kharabath",
    description: "A spicy semolina dish flavored with vegetables and aromatic spices, often served for breakfast.",
    email: "chef30@example.com",
    instructions: "1. Roast semolina and set aside. 2. Sauté vegetables and spices. 3. Add water and semolina, cook until thick.",
    ingredients: [
      "1 cup semolina",
      "1/2 cup mixed vegetables",
      "2 tbsp ghee",
      "1 tsp mustard seeds",
      "1 tsp turmeric powder",
      "1 tbsp bisi bele bath powder",
      "Salt to taste"
    ],
    category: "South-Indian",
    dietType: "Vegetarian",
    image: "https://www.yummyoyummy.com/wp-content/uploads/2017/12/DSC_0466.jpg",
    user: "677a9d7dd9ae00cc71093ea3"
  }
];

module.exports = { Data: sampleRecipes };
