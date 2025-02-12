import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "../../../components/modal/Modal";
import "./Dashboard.css"; // You can create an external CSS file or use inline styles for this

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editCar, setEditCar] = useState(null);
  console.log(editCar, "editCar");
  const [newCar, setNewCar] = useState({
    name: "",
    modal: "",
    type: "",
    image: null,
  });
  const [deleteCar, setDeleteCar] = useState(null);

  console.log(deleteCar, "deleteCar");
  const fetchCars = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cars");
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };
  useEffect(() => {
    fetchCars();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  const openEditModal = (car) => {
    setEditCar(car);
    setModalIsOpen(true);
  };

  const openDeleteModal = (car) => {
    setDeleteCar(car);
    setDeleteModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDeleteModalIsOpen(false);
    setEditCar(null);
    setDeleteCar(null);
    setNewCar({ name: "", modal: "", type: "", image: null });
  };

  const handleEditSubmit = async () => {
if(!editCar.image){
  alert("Please select an image to upload");
  return;
}

    try {
      const formData = new FormData();
      formData.append("name", editCar.name);
      formData.append("modal", editCar.modal);
      formData.append("type", editCar.type);
  
      if (editCar.image instanceof File) {
        formData.append("image", editCar.image); // Only append if it's a new file
      }
  
      const response = await fetch(
        `http://localhost:5000/api/cars/${editCar._id}`,
        {
          method: "PUT",
          body: formData, // Send as FormData
        }
      );
  
      const updatedCar = await response.json();
      if (updatedCar.success) {
        fetchCars();
      }
      closeModal();
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };
  

  const handleDeleteSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/cars/${deleteCar._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success === true) {
        fetchCars();
      }
      closeModal();
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleUploadSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", newCar.name);
      formData.append("modal", newCar.modal);
      formData.append("type", newCar.type);
      formData.append("image", newCar.image);

      const response = await fetch("http://localhost:5000/api/cars", {
        method: "POST",
        body: formData,
      });
      const uploadedCar = await response.json();
      if (uploadedCar.success === true) {
        fetchCars();
      }
      setCars([...cars, uploadedCar]);
      closeModal();
    } catch (error) {
      console.error("Error uploading car:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          zIndex: "999",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "black",
          color: "white",
          height: "80px",
          fontSize: "24px",
          padding: "0 20px",
        }}
      >
        <div>Hello Admin</div>
        <div>
          <button
            style={{
              padding: "10px 20px",
              margin: "20px",
              backgroundColor: "red",
              borderRadius: "5px",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div
        className="dashboard-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            margin: "40px 0 0 0",
          }}
        >
          Welcome to the Dashboard
        </h1>

        {/* Upload Car Button */}
        <button
          style={{
            padding: "10px 20px",
            margin: "80px ",
          }}
          className="upload-btn"
          onClick={() => setModalIsOpen(true)}
        >
          Upload Car
        </button>

        {/* Car List */}
        <div
          className=""
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "50px",
            margin: "32PX",
            padding: "20px",
          }}
        >
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <img
                src={`http://localhost:5000/${car.image}`}
                alt={car.name}
                className="car-image"
              />
              <h3
                style={{
                  margin: "10px 0",
                  fontSize: "24px",
                }}
              >
                {car.name}
              </h3>
              <p
                style={{
                  fontSize: "20px",
                }}
              >
                {car.modal}{" "}
              </p>
              <div
                className=""
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                  fontSize: "20px",
                }}
              >
                <FaEdit
                  style={{
                    cursor: "pointer",
                    color: "green",
                  }}
                  onClick={() => openEditModal(car)}
                />
                <FaTrashAlt
                  style={{
                    cursor: "pointer",
                    color: "red",
                  }}
                  onClick={() => openDeleteModal(car)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Edit/Upload Car Modal */}
        <Modal isOpen={modalIsOpen} onClose={closeModal}>
          <h2
            style={{
              color: "black",
              textAlign: "center",
              margin: "10px 0",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "Arial",
            }}
          >
            {editCar ? "Edit Car" : "Upload Car"}
          </h2>
          <form className="modal-form">
            <input
              type="text"
              placeholder="Car Name"
              value={editCar ? editCar.name : newCar.name}
              onChange={(e) =>
                editCar
                  ? setEditCar({ ...editCar, name: e.target.value })
                  : setNewCar({ ...newCar, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Modal"
              value={editCar ? editCar.modal : newCar.modal}
              onChange={(e) =>
                editCar
                  ? setEditCar({ ...editCar, modal: e.target.value })
                  : setNewCar({ ...newCar, modal: e.target.value })
              }
              required
            />
            <select
              value={editCar ? editCar.type : newCar.type}
              onChange={(e) =>
                editCar
                  ? setEditCar({ ...editCar, type: e.target.value })
                  : setNewCar({ ...newCar, type: e.target.value })
              }
              required
            >
              <option value="" disabled>
                Select Car Type
              </option>
              <option value="CARS">CARS</option>
              <option value="SUVS">SUVS</option>
              <option value="VANS">VANS</option>
            </select>

            <input
              type="file"
              onChange={(e) =>
                editCar
                  ? setEditCar({ ...editCar, image: e.target.files[0] })
                  : setNewCar({ ...newCar, image: e.target.files[0] })
              }
              required
            />
            {/* image preview */}
            {(editCar?.image || newCar.image) && (
              <div
                style={{
                  position: "relative",
                  textAlign: "center",
                  margin: "10px 0",
                }}
              >
                <img
                  src={
                    editCar && editCar.image instanceof File
                      ? URL.createObjectURL(editCar.image)
                      : editCar
                      ? `http://localhost:5000/${editCar.image}`
                      : newCar.image
                      ? URL.createObjectURL(newCar.image)
                      : ""
                  }
                  alt="Selected Car"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "15px",
                  }}
                />
                <FaTrashAlt
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    cursor: "pointer",
                    color: "red",
                    fontSize: "20px",
                    backgroundColor: "white",
                  }}
                  onClick={() => {
                    if (editCar) {
                      setEditCar({
                        ...editCar,
                        image: null,
                        removeImage: "true",
                      });
                    } else {
                      setNewCar({ ...newCar, image: null });
                    }
                  }}
                />
              </div>
            )}
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                borderRadius: "5px",
                padding: "5px 10px",
                margin: "10px 0",
                border: "none",
                cursor: "pointer",
                width: "100%",
                height: "40px",
              }}
              type="button"
              onClick={editCar ? handleEditSubmit : handleUploadSubmit}
            >
              {editCar ? "Upload Car" : "Add Car"}
            </button>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={deleteModalIsOpen} onClose={closeModal}>
          <h2
            style={{
              color: "black",
              textAlign: "center",
              margin: "20px 0",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "Arial",
            }}
          >
            Are you sure you want to delete this car?
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "50%",
              margin: "0 auto",
            }}
          >
            <button
              style={{
                backgroundColor: "green",
                color: "white",
                borderRadius: "5px",
                padding: "5px 10px",
                margin: "10px 0",
                border: "none",
                width: "100px",
                height: "40px",
                cursor: "pointer",
              }}
              onClick={handleDeleteSubmit}
            >
              Yes
            </button>
            <button
              style={{
                backgroundColor: "gray",
                color: "white",
                borderRadius: "5px",
                padding: "5px 10px",
                margin: "10px 0",
                border: "none",
                width: "100px",
                cursor: "pointer",
                height: "40px",
              }}
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;
