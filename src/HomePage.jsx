import { useEffect, useState } from 'react';

function HomePage() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

useEffect(() => {
  const token = localStorage.getItem('token');
  fetch('/api/items', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(data => Array.isArray(data) ? setItems(data) : setItems([]))
    .catch(() => setItems([]));
}, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '2rem' }}>
      <div style={{ flex: 2 }}>
        <h2>Products</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {items.length === 0 && <p>No items found.</p>}
          {items.map(item => (
            <div key={item._id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, background: '#fff' }}>
              {item.image && (
                <img src={item.image} alt={item.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 4, marginBottom: 8 }} />
              )}
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <button onClick={() => addToCart(item)} style={{ marginTop: 8 }}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 250, background: '#f9f9f9', border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
        <h2>Cart</h2>
        {cart.length === 0 ? <p>Your cart is empty.</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map(item => (
              <li key={item._id} style={{ marginBottom: 12 }}>
                <strong>{item.name}</strong>
                <button onClick={() => removeFromCart(item._id)} style={{ marginLeft: 8 }}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default HomePage;
