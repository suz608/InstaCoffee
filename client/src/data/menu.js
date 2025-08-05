// menu.js

const menu = [
  // Cold Beverages
  {
    id: 'cold001',
    name: 'Iced Latte',
    category: 'Cold Beverages',
    price: 4.99,
    detail: 'A refreshing iced version of the classic latte with espresso and cold milk over ice.',
    image: require('../assets/images/iced-latte.png'), // Replace with your actual image path
  },
  {
    id: 'cold002',
    name: 'Iced Americano',
    category: 'Cold Beverages',
    price: 3.99,
    detail: 'Espresso over ice, served without milk for a strong, bold flavor.',
    image: require('../assets/images/iced-americano.jpeg'), // Replace with your actual image path
  },
  {
    id: 'cold003',
    name: 'Iced Coffee',
    category: 'Cold Beverages',
    price: 3.49,
    detail: 'Brewed coffee served cold over ice, perfect for a quick caffeine boost.',
    image: require('../assets/images/iced-coffee.jpeg'), // Replace with your actual image path
  },
  {
    id: 'cold004',
    name: 'Iced Mocha',
    category: 'Cold Beverages',
    price: 5.49,
    detail: 'A decadent blend of espresso, chocolate syrup, milk, and ice.',
    image: require('../assets/images/iced-mocha.jpg'), // Replace with your actual image path
  },
  {
    id: 'cold005',
    name: 'Cold Brew Coffee',
    category: 'Cold Beverages',
    price: 4.49,
    detail: 'Smooth, slow-brewed coffee served cold for a less acidic taste.',
    image: require('../assets/images/cold-brew.jpeg'), // Replace with your actual image path
  },
  {
    id: 'cold006',
    name: 'Single Origin',
    category: 'Cold Beverages',
    price: 5.29,
    detail: 'Our Single Origin Coffee is carefully sourced from a single region or estate, ensuring a pure and distinctive flavor profile unique to its origin.',
    image: require('../assets/images/single2.png'), // Replace with your actual image path
  },
  {
    id: 'cold007',
    name: 'Iced Matcha Latte',
    category: 'Cold Beverages',
    price: 4.79,
    detail: 'A blend of matcha green tea, cold milk, and ice for a refreshing, creamy drink.',
    image: require('../assets/images/iced-matcha-latte.jpeg'), // Replace with your actual image path
  },
  {
    id: 'cold008',
    name: 'Iced Chai Latte',
    category: 'Cold Beverages',
    price: 4.99,
    detail: 'A blend of spiced chai tea and cold milk, served chilled over ice.',
    image: require('../assets/images/iced-chai-latte.jpg'), // Replace with your actual image path
  },

  // Hot Beverages
  {
    id: 'hot001',
    name: 'Hot Latte',
    category: 'Hot Beverages',
    price: 4.99,
    detail: 'A smooth blend of espresso and steamed milk, perfect for a cozy moment.',
    image: require('../assets/images/latte.png'), // Replace with your actual image path
  },
  {
    id: 'hot002',
    name: 'Hot Americano',
    category: 'Hot Beverages',
    price: 3.79,
    detail: 'Espresso diluted with hot water for a bolder, smoother taste.',
    image: require('../assets/images/hot-americano.jpeg'), // Replace with your actual image path
  },
  {
    id: 'hot003',
    name: 'Cappuccino',
    category: 'Hot Beverages',
    price: 4.49,
    detail: 'Espresso topped with a thick layer of steamed milk foam.',
    image: require('../assets/images/cappuccino.jpeg'), // Replace with your actual image path
  },
  {
    id: 'hot004',
    name: 'Hot Mocha',
    category: 'Hot Beverages',
    price: 5.49,
    detail: 'A blend of espresso, steamed milk, and chocolate syrup, topped with whipped cream.',
    image: require('../assets/images/hot-mocha.jpg'), // Replace with your actual image path
  },
  {
    id: 'hot005',
    name: 'Hot Chocolate',
    category: 'Hot Beverages',
    price: 3.99,
    detail: 'A rich and creamy hot chocolate, made with milk and chocolate syrup.',
    image: require('../assets/images/hot-chocolate.jpeg'), // Replace with your actual image path
  },
  {
    id: 'hot006',
    name: 'Chai Latte',
    category: 'Hot Beverages',
    price: 4.49,
    detail: 'Spiced chai tea combined with steamed milk for a sweet and aromatic drink.',
    image: require('../assets/images/chai-latte.png'), // Replace with your actual image path
  },
  {
    id: 'hot007',
    name: 'Flat White',
    category: 'Hot Beverages',
    price: 4.79,
    detail: 'Espresso combined with steamed milk and a thin layer of microfoam.',
    image: require('../assets/images/flat-white.jpeg'), // Replace with your actual image path
  },
  {
    id: 'hot008',
    name: 'Espresso',
    category: 'Hot Beverages',
    price: 2.49,
    detail: 'A rich, concentrated shot of espresso, perfect on its own or as a base for other drinks.',
    image: require('../assets/images/espresso.jpg'), // Replace with your actual image path
  },

  // Snacks
  {
    id: 'snack001',
    name: 'Chocolate Croissant',
    category: 'Snacks',
    price: 2.99,
    detail: 'Buttery, flaky pastry filled with rich chocolate.',
    image: require('../assets/images/chocolate-croissant.jpg'), // Replace with your actual image path
  },
  {
    id: 'snack002',
    name: 'Blueberry Muffin',
    category: 'Snacks',
    price: 2.49,
    detail: 'Soft and fluffy muffin packed with fresh blueberries.',
    image: require('../assets/images/blueberry-muffin.jpeg'), // Replace with your actual image path
  },
  {
    id: 'snack003',
    name: 'Almond Biscotti',
    category: 'Snacks',
    price: 1.99,
    detail: 'Crunchy almond biscuit, perfect for dipping into coffee.',
    image: require('../assets/images/almond-biscotti.jpg'), // Replace with your actual image path
  },
  {
    id: 'snack004',
    name: 'Cinnamon Roll',
    category: 'Snacks',
    price: 3.49,
    detail: 'A warm, sweet roll with cinnamon filling and a glaze.',
    image: require('../assets/images/cinnamon-roll.jpeg'), // Replace with your actual image path
  },

  // Add-ons
  {
    id: 'addon001',
    name: 'Almond Milk',
    category: 'Add Ons',
    price: 0.79,
    detail: 'Creamy almond milk to substitute regular milk.',
    image: require('../assets/images/almond-milk.jpeg'), // Replace with your actual image path
  },
  {
    id: 'addon002',
    name: 'Extra Shot of Espresso',
    category: 'Add Ons',
    price: 1.00,
    detail: 'Add an extra shot of espresso for more intensity.',
    image: require('../assets/images/extra-shot.jpeg'), // Replace with your actual image path
  },
  {
    id: 'addon003',
    name: 'Caramel Syrup',
    category: 'Add Ons',
    price: 0.50,
    detail: 'Sweet caramel syrup to add to your coffee.',
    image: require('../assets/images/caramel-syrup.jpeg'), // Replace with your actual image path
  },
  {
    id: 'addon004',
    name: 'Whipped Cream',
    category: 'Add Ons',
    price: 0.60,
    detail: 'A dollop of fluffy whipped cream to top your drink.',
    image: require('../assets/images/whipped-cream.jpg'), // Replace with your actual image path
  },
];

export default menu;
