import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "../../../components/modal/Modal";
import "./Dashboard.css";
import config from '../../../config'; 
import leftArrow from '../../../assets/images/left_arrow_icon.svg';
import rightArrow from '../../../assets/images/right_arrow_icon.svg';

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editCar, setEditCar] = useState(null);
  const [deleteCar, setDeleteCar] = useState(null);
  const [formCar, setFormCar] = useState({company_name: "", car_name: "", modal: "", passengers: "",luggage_type: "",type: "",image: null,description: ""});
  const [formErrors, setFormErrors] = useState({company_name: "", car_name: "", modal: "", passengers: "",luggage_type: "",type: "",image: ""});
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    fetchCars(currentPage);
  }, [currentPage, navigate]);

  // Fetch cars from the backend API
  const fetchCars = async (page) => {
    try {
      const response = await fetch(`${config.api.baseURL}${config.api.carsEndpoint}?page=${page}&limit=8`);
      const data = await response.json();
      if (Array.isArray(data.cars)) {
        setCars(data.cars); 
        setTotalPages(data.totalPages); 
      } else {
        console.error("Expected an array for data.cars, but got:", data.cars);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false); // Data is loaded, so set loading to false
    }
  };

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openEditModal = (car) => {
    setEditCar(car);
    setFormCar({ ...car }); // Reset image for new upload
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
    setFormCar({company_name: "", car_name: "", modal: "", passengers: "",luggage_type: "",type: "",image: null,description: ""});
    setFormErrors({company_name: "", car_name: "", modal: "", passengers: "",luggage_type: "",type: "",image: ""});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormCar((prev) => ({ ...prev, [name]: value }));
    if (value) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormCar((prev) => ({ ...prev, image: file }));
    if (file) {
      setFormErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formCar.company_name) errors.company_name = "Company Name is required";
    if (!formCar.car_name) errors.car_name = "Car Name is required";
    if (!formCar.modal) errors.modal = "Modal is required";
    if (!formCar.passengers) errors.passengers = "Passengers are required";
    if (!formCar.luggage_type) errors.luggage_type = "Luggage Type is required";
    if (!formCar.type) errors.type = "Car Type is required";
    if (!formCar.image && !editCar) errors.image = "Image is required"; // Validate image
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (!validateForm()){
      setIsLoading(false);
      return; // Prevent submission if there are validation errors
    } 
    try {
      const formData = new FormData();
      formData.append("company_name", formCar.company_name);
      formData.append("car_name", formCar.car_name);
      formData.append("modal", formCar.modal);
      formData.append("passengers", formCar.passengers);
      formData.append("luggage_type", formCar.luggage_type);
      formData.append("type", formCar.type);
      formData.append("description", formCar.description);
      if (formCar.image instanceof File) {
        formData.append("image", formCar.image);
      }
      const url = editCar ? `${config.api.baseURL}${config.api.carsEndpoint}/${editCar._id}` : `${config.api.baseURL}${config.api.carsEndpoint}`;
      const method = editCar ? "PUT" : "POST";
      const response = await fetch(url, { method, body: formData });
      const result = await response.json();
      if (result.success) {
        fetchCars(1);
        closeModal();
      }
    } catch (error) {
      console.error("Error submitting car:", error);
    } finally {
      setIsLoading(false); // Data is loaded, so set loading to false
    }
  };

  const handleDeleteSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${config.api.baseURL}${config.api.carsEndpoint}/${deleteCar._id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        fetchCars(1);
        closeModal();
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    } finally {
      setIsLoading(false); // Data is loaded, so set loading to false
    }
  };

  return (
    <>
      <header className="admin-dashboard">
        <div>Hello Admin</div>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}>
          Logout
        </button>
      </header>

      <div className="dashboard-container" >
        <div className="dashboard-header">
          <h1>Welcome to the Dashboard</h1>
          <button className="upload-btn" onClick={() => setModalIsOpen(true)}>
            Upload Car 
          </button>
        </div>
        
        {/* Car List */}
        
        {loading ? (
          <div className="loading-message">Loading...</div>
        ) : cars.length === 0 ? (
          <div className="car-list-no-data">
            <div className="no-cars-message">Car not available!</div>
          </div>
        ) : (
          <div className="car-list">
            {cars.map((car) => (
              <div key={car._id} className="car-card">
                <div className="car-image-box">
                  <img
                    src={`${config.api.baseURL}${car.image}`}
                    alt={car.name}
                    className="car-image"
                  />
                </div>
                <div className="car-details">
                  <h3>{car.company_name} {car.car_name}</h3>
                  <p>{car.modal}</p>
                  <div className="actions">
                    <FaEdit className="edit" onClick={() => openEditModal(car)} />
                    <FaTrashAlt className="delete" onClick={() => openDeleteModal(car)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 &&
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
            <img src={leftArrow} />
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <img src={rightArrow} />
            </button>
          </div>
        }

        {/* Edit/Upload Modal */}
        <Modal isOpen={modalIsOpen} onClose={closeModal}>
          <h2>{editCar ? "Edit Car" : "Upload Car"}</h2>
          <form className="modal-form">
            {/* Fields */}
            <input
              type="text"
              name="company_name"
              placeholder="Company Name"
              value={formCar.company_name}
              onChange={handleChange}
              required
            />
            {formErrors.company_name && <p className="error-message">{formErrors.company_name}</p>}

            <input
              type="text"
              name="car_name"
              placeholder="Car Name"
              value={formCar.car_name}
              onChange={handleChange}
              required
            />
            {formErrors.car_name && <p className="error-message">{formErrors.car_name}</p>}

            <input
              type="text"
              name="modal"
              placeholder="Modal"
              value={formCar.modal}
              onChange={handleChange}
              required
            />
            {formErrors.modal && <p className="error-message">{formErrors.modal}</p>}

            <input
              type="text"
              name="passengers"
              placeholder="Passengers"
              value={formCar.passengers}
              onChange={handleChange}
              required
            />
            {formErrors.passengers && <p className="error-message">{formErrors.passengers}</p>}

            <select
              name="luggage_type"
              value={formCar.luggage_type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select luggage Type</option>
              <option value="light">Light</option>
              <option value="heavy">Heavy</option>
            </select>
            {formErrors.luggage_type && <p className="error-message">{formErrors.luggage_type}</p>}

            <select
              name="type"
              value={formCar.type}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select Car Type</option>
              <option value="CARS">CARS</option>
              <option value="SUVS">SUVS</option>
              <option value="VANS">VANS</option>
            </select>
            {formErrors.type && <p className="error-message">{formErrors.type}</p>}

            <textarea
              name="description"
              placeholder="Description"
              value={formCar.description}
              onChange={handleChange}
              required
            ></textarea>

            <input type="file" onChange={handleFileChange}  />
            {formErrors.image && <p className="error-message">{formErrors.image}</p>}
            {/* Image Preview */}
            {formCar.image && (
              <div className="upload-car-image">
                <img src={formCar.image instanceof File ? URL.createObjectURL(formCar.image) : `${config.api.baseURL}${formCar.image}`} alt="Selected Car" />
                {/* <img src={URL.createObjectURL(formCar.image)} alt="Selected Car" style={styles.previewImg} /> */}
                <FaTrashAlt  onClick={() => setFormCar((prev) => ({ ...prev, image: null }))} />
              </div>
            )}

            <button type="button" className={`${isLoading ? 'loading' : ''}`} onClick={handleSubmit}>
              {editCar ? "Update Car" : "Add Car"}
              <div className="loader-wrap"><span className='loader'></span></div>
            </button>
          </form>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal isOpen={deleteModalIsOpen} onClose={closeModal}>
          <h2 className="deletepopup">Are you sure you want to delete this car?</h2>
          <div className="btn-wrap-delete">
            <button className={`btn deletebtn ${isLoading ? 'loading' : ''}`} onClick={handleDeleteSubmit}>Delete   <div className="loader-wrap"><span className='loader'></span></div></button>
            <button className="btn cancelbtn" onClick={closeModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;

