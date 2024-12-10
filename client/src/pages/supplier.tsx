import { useState, useEffect } from 'react';
import './supplier.css';

interface Supplier {
  _id?: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address?: string;
}

function Supplier() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [newSupplier, setNewSupplier] = useState<Supplier>({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
  });
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null);

  // Fetch suppliers from the server
  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers');
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error('Failed to fetch suppliers:', error);
    }
  };

  const handleAddEditSupplier = async () => {
    if (isEditing && selectedSupplier?._id) {
      try {
        const response = await fetch(`/api/suppliers/${selectedSupplier._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedSupplier),
        });
        if (response.ok) {
          fetchSuppliers();
        }
      } catch (error) {
        console.error('Failed to update supplier:', error);
      }
    } else {
      try {
        const response = await fetch('/api/suppliers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSupplier),
        });
        if (response.ok) {
          fetchSuppliers();
        }
      } catch (error) {
        console.error('Failed to add supplier:', error);
      }
    }

    setNewSupplier({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
    });
    setSelectedSupplier(null);
    setIsEditing(false);
  };

  const handleDeleteSupplier = (supplier: Supplier) => {
    setSupplierToDelete(supplier);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (supplierToDelete) {
      try {
        const response = await fetch(`/api/suppliers/${supplierToDelete._id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchSuppliers();
        }
      } catch (error) {
        console.error('Failed to delete supplier:', error);
      }
      setShowDeleteConfirm(false);
      setSupplierToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setSupplierToDelete(null);
  };

  return (
    <div className="supplier-container">
      <h1>Supplier Management</h1>

      <div className="supplier-form">
        <h2>{isEditing ? 'Edit Supplier' : 'Add New Supplier'}</h2>
        <input
          type="text"
          value={isEditing ? selectedSupplier?.name : newSupplier.name}
          onChange={(e) =>
            isEditing
              ? setSelectedSupplier({ ...selectedSupplier!, name: e.target.value })
              : setNewSupplier({ ...newSupplier, name: e.target.value })
          }
          placeholder="Supplier Name"
        />
        <input
          type="text"
          value={isEditing ? selectedSupplier?.contactPerson : newSupplier.contactPerson}
          onChange={(e) =>
            isEditing
              ? setSelectedSupplier({ ...selectedSupplier!, contactPerson: e.target.value })
              : setNewSupplier({ ...newSupplier, contactPerson: e.target.value })
          }
          placeholder="Contact Person"
        />
        <input
          type="email"
          value={isEditing ? selectedSupplier?.email : newSupplier.email}
          onChange={(e) =>
            isEditing
              ? setSelectedSupplier({ ...selectedSupplier!, email: e.target.value })
              : setNewSupplier({ ...newSupplier, email: e.target.value })
          }
          placeholder="Email"
        />
        <input
          type="text"
          value={isEditing ? selectedSupplier?.phone : newSupplier.phone}
          onChange={(e) =>
            isEditing
              ? setSelectedSupplier({ ...selectedSupplier!, phone: e.target.value })
              : setNewSupplier({ ...newSupplier, phone: e.target.value })
          }
          placeholder="Phone"
        />
        <input
          type="text"
          value={isEditing ? selectedSupplier?.address : newSupplier.address}
          onChange={(e) =>
            isEditing
              ? setSelectedSupplier({ ...selectedSupplier!, address: e.target.value })
              : setNewSupplier({ ...newSupplier, address: e.target.value })
          }
          placeholder="Address"
        />
        <button onClick={handleAddEditSupplier}>
          {isEditing ? 'Update Supplier' : 'Add Supplier'}
        </button>
      </div>

      <h2>Suppliers List</h2>
      <div className="supplier-list">
        {suppliers.map((supplier) => (
          <div key={supplier._id} className="supplier-item">
            <span>{supplier.name}</span>
            <span>Contact: {supplier.contactPerson}</span>
            <span>Email: {supplier.email}</span>
            <span>Phone: {supplier.phone}</span>
            <button onClick={() => { setSelectedSupplier(supplier); setIsEditing(true); }}>
              Edit
            </button>
            <button onClick={() => handleDeleteSupplier(supplier)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {showDeleteConfirm && supplierToDelete && (
        <div className="delete-confirmation">
          <p>Are you sure you want to delete {supplierToDelete.name}?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
}

export default Supplier;