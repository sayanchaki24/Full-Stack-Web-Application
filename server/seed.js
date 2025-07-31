const mongoose = require('mongoose');
require('dotenv').config();
const Item = require('./models/Item');

const items = [
  {
    name: 'Gaming Laptop',
    description: 'High performance laptop for gaming and work.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with blue switches.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Gaming Mouse',
    description: 'Ergonomic mouse with customizable DPI.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: '4K Monitor',
    description: 'Ultra HD 27-inch monitor for crisp visuals.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'SSD 1TB',
    description: 'Fast 1TB solid state drive for storage.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Item.deleteMany({});
  await Item.insertMany(items);
  console.log('Database seeded!');
  mongoose.disconnect();
}

seed();
