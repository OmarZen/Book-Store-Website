import React, { useState, useEffect } from "react";
import "./Stores.css"; // Make sure to create this CSS file
import Header from "../components/Header";
import profilePhoto from "../assets/images/profile.png";
import { CiSearch } from "react-icons/ci";
import { LiaPenSolid } from "react-icons/lia";
import { BsTrash } from "react-icons/bs";

// PrimeReact Components
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const Stores = () => {
  // Sample user object
  const user = {
    name: "Jacob Jones",
    profilePicture: profilePhoto,
  };

  // State to store the stores data
  const [stores, setStores] = useState([]);
  const [selectedStores, setSelectedStores] = useState(null); // To track selected rows
  const [isEditModalOpen, setEditModalOpen] = useState(false); // State for edit modal visibility
  const [isAddModalOpen, setAddModalOpen] = useState(false); // State for add modal visibility
  const [editStore, setEditStore] = useState({
    id: null,
    name: "",
    address: "",
  }); // State for editing store data
  const [newStore, setNewStore] = useState({ name: "", address: "" }); // State for new store data

  useEffect(() => {
    fetch("/api/stores")
      .then((response) => response.json())
      .then((data) => setStores(data))
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  }, []);

  // Function to delete a store by its ID
  const deleteStore = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this store?"
    );
    if (!confirmDelete) return;

    fetch(`/api/stores/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // If the response is OK, remove the store from the state
          setStores(stores.filter((store) => store.id !== id));
        } else {
          console.error("Failed to delete the store");
        }
      })
      .catch((error) => {
        console.error("Error deleting the store:", error);
      });
  };

  // Function to handle editing a store
  const handleEdit = (rowData) => {
    setEditStore({
      id: rowData.id,
      name: rowData.name,
      address: rowData.address,
    });
    setEditModalOpen(true); // Open the edit modal
  };

  // Function to update the store
  const updateStore = (e) => {
    e.preventDefault(); // Prevent form submission

    fetch(`/api/stores/${editStore.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editStore.name,
        address: editStore.address,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Update the local state
          setStores((prevStores) =>
            prevStores.map((store) =>
              store.id === editStore.id
                ? { ...store, name: editStore.name, address: editStore.address }
                : store
            )
          );
          setEditModalOpen(false); // Close the edit modal
        } else {
          console.error("Failed to update the store");
        }
      })
      .catch((error) => {
        console.error("Error updating the store:", error);
      });
  };

  // Function to handle adding a new store
  const handleAdd = () => {
    setNewStore({ name: "", address: "" }); // Reset new store data
    setAddModalOpen(true); // Open the add modal
  };

  // Function to create a new store
  const createStore = (e) => {
    e.preventDefault(); // Prevent form submission

    fetch("/api/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newStore.name,
        address: newStore.address,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the JSON response
        } else {
          console.error("Failed to create the store");
        }
      })
      .then((data) => {
        if (data) {
          setStores((prevStores) => [...prevStores, data]); // Add new store to the list
          setAddModalOpen(false); // Close the add modal
        }
      })
      .catch((error) => {
        console.error("Error creating the store:", error);
      });
  };

  // Action buttons for Edit and Delete
  const actionTemplate = (rowData) => {
    return (
      <div className="action-buttons">
        <button className="edit-button" onClick={() => handleEdit(rowData)}>
          <LiaPenSolid />
        </button>
        <button
          className="delete-button"
          onClick={() => deleteStore(rowData.id)}
        >
          <BsTrash />
        </button>
      </div>
    );
  };

  return (
    <div className="stores-page">
      <Header title="Stores" breadcrumb="Admin > Stores" user={user} />

      <div className="store-header">
        <div className="store-title">
          <span>Stores List</span>
          <div className="search-bar-container">
            <CiSearch className="search-icon" />
            <input
              type="text"
              className="search-bar"
              placeholder="Search"
              // Add search functionality later
            />
          </div>
        </div>
        <button className="add-store-button" onClick={handleAdd}>
          Add New Store
        </button>
      </div>

      {/* Store List Table */}
      <div className="store-list">
        <DataTable
          value={stores}
          paginator
          rows={10}
          tableStyle={{ minWidth: "50rem" }}
          selection={selectedStores} // Bind the selection state
          onSelectionChange={(e) => setSelectedStores(e.value)} // Handle row selection
          selectionMode="checkbox"
        >
          {/* Checkbox Column */}
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "5%" }}
            bodyStyle={{ textAlign: "center" }}
          />
          <Column
            field="id"
            header="Store ID"
            style={{ width: "10%" }}
          ></Column>
          <Column field="name" header="Name" style={{ width: "35%" }}></Column>
          <Column
            field="address"
            header="Address"
            style={{ width: "45%" }}
          ></Column>
          <Column
            body={actionTemplate}
            header="Actions"
            style={{ width: "10%" }}
          ></Column>
        </DataTable>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Store</h3>
            <form onSubmit={updateStore}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={editStore.name}
                  onChange={(e) =>
                    setEditStore({ ...editStore, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  value={editStore.address}
                  onChange={(e) =>
                    setEditStore({ ...editStore, address: e.target.value })
                  }
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setEditModalOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>New Store</h3>
            <form onSubmit={createStore}>
              <div className="form-group">
                <label>Store Name</label>
                <input
                  type="text"
                  value={newStore.name}
                  onChange={(e) =>
                    setNewStore({ ...newStore, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label>Store Address</label>
                <input
                  type="text"
                  value={newStore.address}
                  onChange={(e) =>
                    setNewStore({ ...newStore, address: e.target.value })
                  }
                  required
                />
              </div>
              <hr className="divider-form" />
              <div className="modal-actions">
                <button type="button" onClick={() => setAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stores;
