import { useState, useEffect } from 'react';
import './products.css';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    _id: '',
    name: '',
    price: 0,
    quantity: 0,
  });

  // Fetch products from the server
  useEffect(() => {
    fetch('/api/products')  
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Add a new product
  const handleAddProduct = () => {
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((createdProduct) => {
        setProducts([...products, createdProduct]);
        setNewProduct({ _id: '', name: '', price: 0, quantity: 0 });
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  // Delete a product
  const handleDeleteProduct = (id: string) => {
    fetch(`/api/products/${id}`, { method: 'DELETE' })
      .then(() => setProducts(products.filter((product) => product._id !== id)))
      .catch((error) => console.error('Error deleting product:', error));
  };

  return (
    <div className="products-container">
      <h1>Product List</h1>
      <div className="product-form">
        <h2>Add New Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: +e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: +e.target.value })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      <h2>Available Products</h2>
      <ul className="products-list">
        {products.map((product) => (
          <li key={product._id}>
            <span>{product.name}</span>
            <span>₱{product.price.toFixed(2)}</span>
            <span>Stock: {product.quantity}</span>
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;