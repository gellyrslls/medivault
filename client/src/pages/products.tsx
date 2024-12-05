import { useState } from 'react';
import './products.css';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: '',
    price: 0,
    stock: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleAddEditProduct = () => {
    if (isEditing && selectedProduct) {
      const updatedProducts = products.map((product) =>
        product.id === selectedProduct.id ? selectedProduct : product
      );
      setProducts(updatedProducts);
    } else {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
    }
    setIsEditing(false);
    setNewProduct({ id: 0, name: '', price: 0, stock: 0 });
  };

  const handleDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter((product) => product.id !== productToDelete.id));
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setProductToDelete(null);
  };

  const handleStockUpdate = (product: Product, newStock: number) => {
    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, stock: newStock } : p
      )
    );
  };

  return (
    <div className="products-container">
      <h1>Pharmacy Inventory</h1>
      
      <div className="product-form">
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <input
          type="text"
          value={isEditing ? selectedProduct?.name : newProduct.name}
          onChange={(e) =>
            isEditing
              ? setSelectedProduct({ ...selectedProduct!, name: e.target.value })
              : setNewProduct({ ...newProduct, name: e.target.value })
          }
          placeholder="Product Name"
        />
        <input
          type="number"
          value={isEditing ? selectedProduct?.price : newProduct.price}
          onChange={(e) =>
            isEditing
              ? setSelectedProduct({ ...selectedProduct!, price: +e.target.value })
              : setNewProduct({ ...newProduct, price: +e.target.value })
          }
          placeholder="Price"
        />
        <input
          type="number"
          value={isEditing ? selectedProduct?.stock : newProduct.stock}
          onChange={(e) =>
            isEditing
              ? setSelectedProduct({ ...selectedProduct!, stock: +e.target.value })
              : setNewProduct({ ...newProduct, stock: +e.target.value })
          }
          placeholder="Stock"
        />
        <button onClick={handleAddEditProduct}>
          {isEditing ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      <h2>Products List</h2>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <span>{product.name}</span>
            <span>${product.price.toFixed(2)}</span>
            <span>Stock: {product.stock}</span>
            <button onClick={() => handleStockUpdate(product, product.stock + 1)}>
              +1 Stock
            </button>
            <button onClick={() => setSelectedProduct(product) && setIsEditing(true)}>
              Edit
            </button>
            <button onClick={() => handleDeleteProduct(product)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {showDeleteConfirm && productToDelete && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete {productToDelete.name}?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
}

export default Products;