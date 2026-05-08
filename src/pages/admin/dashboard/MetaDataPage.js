// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";

// import Modal from "../../../components/modal/Modal";

// import "./Dashboard.css";

// import config from "../../../config";

// import leftArrow from "../../../assets/images/left_arrow_icon.svg";
// import rightArrow from "../../../assets/images/right_arrow_icon.svg";

// const MetaDataPage= () => {

//   const [metaData, setMetaData] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [isLoading, setIsLoading] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);

//   const [totalPages, setTotalPages] = useState(1);

//   const [modalIsOpen, setModalIsOpen] = useState(false);

//   const [deleteModalIsOpen, setDeleteModalIsOpen] =
//     useState(false);

//   const [editMeta, setEditMeta] = useState(null);

//   const [deleteMeta, setDeleteMeta] = useState(null);

//   const [formMeta, setFormMeta] = useState({
//     page_name: "",
//     page_url: "",
//     title: "",
//     description: "",
//     image: null,
//   });

//   const [formErrors, setFormErrors] = useState({
//     page_name: "",
//     page_url: "",
//     title: "",
//     description: "",
//     image: "",
//   });

//   const navigate = useNavigate();

//   useEffect(() => {

//     if (!localStorage.getItem("token")) {
//       navigate("/");
//     }

//     fetchMetaData();

//   }, [navigate]);

//   /* FETCH META DATA */

//   const fetchMetaData = async () => {
//     try {

//       const response = await fetch(
//         `${config.api.baseURL}${config.api.metaDataEndpoint}`
//       );

//       const data = await response.json();

//       if (Array.isArray(data.metaData)) {
//         setMetaData(data.metaData);
//       }

//     } catch (error) {

//       console.error("Error fetching metadata:", error);

//     } finally {

//       setLoading(false);
//     }
//   };

//   /* PAGINATION */

//   const itemsPerPage = 8;

//   const totalPagesCount = Math.ceil(
//     metaData.length / itemsPerPage
//   );

//   const paginatedData = metaData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleNextPage = () => {

//     if (currentPage < totalPagesCount) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePrevPage = () => {

//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   /* OPEN EDIT */

//   const openEditModal = (meta) => {

//     setEditMeta(meta);

//     setFormMeta({ ...meta });

//     setModalIsOpen(true);
//   };

//   /* OPEN DELETE */

//   const openDeleteModal = (meta) => {

//     setDeleteMeta(meta);

//     setDeleteModalIsOpen(true);
//   };

//   /* CLOSE MODAL */

//   const closeModal = () => {

//     setModalIsOpen(false);

//     setDeleteModalIsOpen(false);

//     setEditMeta(null);

//     setDeleteMeta(null);

//     setFormMeta({
//       page_name: "",
//       page_url: "",
//       title: "",
//       description: "",
//       image: null,
//     });

//     setFormErrors({
//       page_name: "",
//       page_url: "",
//       title: "",
//       description: "",
//       image: "",
//     });
//   };

//   /* HANDLE INPUT */

//   const handleChange = (e) => {

//     const { name, value } = e.target;

//     setFormMeta((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (value) {
//       setFormErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   /* HANDLE IMAGE */

//   const handleFileChange = (e) => {

//     const file = e.target.files[0];

//     setFormMeta((prev) => ({
//       ...prev,
//       image: file,
//     }));

//     if (file) {
//       setFormErrors((prev) => ({
//         ...prev,
//         image: "",
//       }));
//     }
//   };

//   /* VALIDATE */

//   const validateForm = () => {

//     const errors = {};

//     if (!formMeta.page_name) {
//       errors.page_name = "Page Name is required";
//     }

//     if (!formMeta.page_url) {
//       errors.page_url = "Page URL is required";
//     }

//     if (!formMeta.title) {
//       errors.title = "Title is required";
//     }

//     if (!formMeta.description) {
//       errors.description = "Description is required";
//     }

//     setFormErrors(errors);

//     return Object.keys(errors).length === 0;
//   };

//   /* SUBMIT */

//   const handleSubmit = async () => {

//     setIsLoading(true);

//     if (!validateForm()) {
//       setIsLoading(false);
//       return;
//     }

//     try {

//       const formData = new FormData();

//       formData.append(
//         "page_name",
//         formMeta.page_name
//       );

//       formData.append(
//         "page_url",
//         formMeta.page_url
//       );

//       formData.append(
//         "title",
//         formMeta.title
//       );

//       formData.append(
//         "description",
//         formMeta.description
//       );

//       if (formMeta.image instanceof File) {
//         formData.append(
//           "image",
//           formMeta.image
//         );
//       }

//       const url = editMeta
//         ? `${config.api.baseURL}${config.api.metaDataEndpoint}/${editMeta._id}`
//         : `${config.api.baseURL}${config.api.metaDataEndpoint}`;

//       const method = editMeta
//         ? "PUT"
//         : "POST";

//       const response = await fetch(url, {
//         method,
//         body: formData,
//       });

//       const result = await response.json();

//       if (result.success) {

//         fetchMetaData();

//         closeModal();
//       }

//     } catch (error) {

//       console.error("Error submitting metadata:", error);

//     } finally {

//       setIsLoading(false);
//     }
//   };

//   /* DELETE */

//   const handleDeleteSubmit = async () => {

//     setIsLoading(true);

//     try {

//       const response = await fetch(
//         `${config.api.baseURL}${config.api.metaDataEndpoint}/${deleteMeta._id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       const result = await response.json();

//       if (result.success) {

//         fetchMetaData();

//         closeModal();
//       }

//     } catch (error) {

//       console.error("Error deleting metadata:", error);

//     } finally {

//       setIsLoading(false);
//     }
//   };

//   return (
//     <>
//       <header className="admin-dashboard">

//         <div>Hello Admin</div>

//          <div>
//         <button className="setting-btn" onClick={() => {
          
//           navigate("/admin/dashboard");
//         }}>
//           Dashboard
//         </button>
//         <button className="logout-btn" onClick={() => {
//           localStorage.removeItem("token");
//           navigate("/");
//         }}>
//           Logout
//         </button>
//         </div>

//       </header>

//       <div className="dashboard-container">

//         <div className="dashboard-header">

//           <h1>SEO Metadata Dashboard</h1>

//           <button
//             className="upload-btn"
//             onClick={() => setModalIsOpen(true)}
//           >
//             Add Metadata
//           </button>

//         </div>

//         {loading ? (

//           <div className="loading-message">
//             Loading...
//           </div>

//         ) : metaData.length === 0 ? (

//           <div className="car-list-no-data">

//             <div className="no-cars-message">
//               Metadata not available!
//             </div>

//           </div>

//         ) : (

//           <div className="car-list">

//             {paginatedData.map((meta) => (

//               <div
//                 key={meta._id}
//                 className="car-card"
//               >

//                 <div className="car-image-box">

//                   <img
//                     src={`${config.api.baseURL}${meta.image}`}
//                     alt={meta.title}
//                     className="car-image"
//                   />

//                 </div>

//                 <div className="car-details">

//                   <h3>{meta.page_name}</h3>

//                   <p>{meta.page_url}</p>

//                   <div className="actions">

//                     <FaEdit
//                       className="edit"
//                       onClick={() =>
//                         openEditModal(meta)
//                       }
//                     />

//                     <FaTrashAlt
//                       className="delete"
//                       onClick={() =>
//                         openDeleteModal(meta)
//                       }
//                     />

//                   </div>

//                 </div>

//               </div>
//             ))}

//           </div>
//         )}

//         {/* PAGINATION */}

//         {totalPagesCount > 1 && (

//           <div className="pagination">

//             <button
//               onClick={handlePrevPage}
//               disabled={currentPage === 1}
//             >
//               <img src={leftArrow} />
//             </button>

//             <span>
//               Page {currentPage} of {totalPagesCount}
//             </span>

//             <button
//               onClick={handleNextPage}
//               disabled={
//                 currentPage === totalPagesCount
//               }
//             >
//               <img src={rightArrow} />
//             </button>

//           </div>
//         )}

//         {/* MODAL */}

//         <Modal
//           isOpen={modalIsOpen}
//           onClose={closeModal}
//         >

//           <h2>
//             {editMeta
//               ? "Edit Metadata"
//               : "Add Metadata"}
//           </h2>

//           <form className="modal-form">

//             <input
//               type="text"
//               name="page_name"
//               placeholder="Page Name"
//               value={formMeta.page_name}
//               onChange={handleChange}
//             />

//             {formErrors.page_name && (
//               <p className="error-message">
//                 {formErrors.page_name}
//               </p>
//             )}

//             <input
//               type="text"
//               name="page_url"
//               placeholder="Page URL"
//               value={formMeta.page_url}
//               onChange={handleChange}
//             />

//             {formErrors.page_url && (
//               <p className="error-message">
//                 {formErrors.page_url}
//               </p>
//             )}

//             <input
//               type="text"
//               name="title"
//               placeholder="SEO Title"
//               value={formMeta.title}
//               onChange={handleChange}
//             />

//             {formErrors.title && (
//               <p className="error-message">
//                 {formErrors.title}
//               </p>
//             )}

//             <textarea
//               name="description"
//               placeholder="SEO Description"
//               value={formMeta.description}
//               onChange={handleChange}
//             />

//             {formErrors.description && (
//               <p className="error-message">
//                 {formErrors.description}
//               </p>
//             )}

//             <input
//               type="file"
//               onChange={handleFileChange}
//             />

//             {formMeta.image && (

//               <div className="upload-car-image">

//                 <img
//                   src={
//                     formMeta.image instanceof File
//                       ? URL.createObjectURL(
//                           formMeta.image
//                         )
//                       : `${config.api.baseURL}${formMeta.image}`
//                   }
//                   alt="SEO"
//                 />

//                 <FaTrashAlt
//                   onClick={() =>
//                     setFormMeta((prev) => ({
//                       ...prev,
//                       image: null,
//                     }))
//                   }
//                 />

//               </div>
//             )}

//             <button
//               type="button"
//               className={`${
//                 isLoading ? "loading" : ""
//               }`}
//               onClick={handleSubmit}
//             >

//               {editMeta
//                 ? "Update Metadata"
//                 : "Add Metadata"}

//               <div className="loader-wrap">
//                 <span className="loader"></span>
//               </div>

//             </button>

//           </form>

//         </Modal>

//         {/* DELETE MODAL */}

//         <Modal
//           isOpen={deleteModalIsOpen}
//           onClose={closeModal}
//         >

//           <h2 className="deletepopup">
//             Are you sure you want to delete
//             this metadata?
//           </h2>

//           <div className="btn-wrap-delete">

//             <button
//               className={`btn deletebtn ${
//                 isLoading ? "loading" : ""
//               }`}
//               onClick={handleDeleteSubmit}
//             >

//               Delete

//               <div className="loader-wrap">
//                 <span className="loader"></span>
//               </div>

//             </button>

//             <button
//               className="btn cancelbtn"
//               onClick={closeModal}
//             >
//               Cancel
//             </button>

//           </div>

//         </Modal>

//       </div>
//     </>
//   );
// };

// export default MetaDataPage;















import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import Modal from "../../../components/modal/Modal";

import "./Dashboard.css";

import config from "../../../config";

import leftArrow from "../../../assets/images/left_arrow_icon.svg";
import rightArrow from "../../../assets/images/right_arrow_icon.svg";

const MetaDataPage = () => {

  const [metaData, setMetaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [editMeta, setEditMeta] = useState(null);
  const [deleteMeta, setDeleteMeta] = useState(null);
  const [formMeta, setFormMeta] = useState({
    page_name: "",
    page_url: "",
    title: "",
    description: "",
    image: null,
  });
  const [formErrors, setFormErrors] = useState({
    page_name: "",
    page_url: "",
    title: "",
    description: "",
    image: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    fetchMetaData();
  }, [navigate]);

  /* FETCH META DATA */
  const fetchMetaData = async () => {
    try {
      const response = await fetch(
        `${config.api.baseURL}${config.api.metaDataEndpoint}`
      );
      const data = await response.json();
      if (Array.isArray(data.metaData)) {
        setMetaData(data.metaData);
      }
    } catch (error) {
      console.error("Error fetching metadata:", error);
    } finally {
      setLoading(false);
    }
  };

  /* PAGINATION */
  const itemsPerPage = 8;
  const totalPagesCount = Math.ceil(metaData.length / itemsPerPage);
  const paginatedData = metaData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPagesCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  /* OPEN EDIT */
  const openEditModal = (meta) => {
    setEditMeta(meta);
    setFormMeta({ ...meta });
    setModalIsOpen(true);
  };

  /* OPEN DELETE */
  const openDeleteModal = (meta) => {
    setDeleteMeta(meta);
    setDeleteModalIsOpen(true);
  };

  /* CLOSE MODAL */
  const closeModal = () => {
    setModalIsOpen(false);
    setDeleteModalIsOpen(false);
    setEditMeta(null);
    setDeleteMeta(null);
    setFormMeta({
      page_name: "",
      page_url: "",
      title: "",
      description: "",
      image: null,
    });
    setFormErrors({
      page_name: "",
      page_url: "",
      title: "",
      description: "",
      image: "",
    });
  };

  /* HANDLE INPUT */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormMeta((prev) => ({ ...prev, [name]: value }));
    if (value) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /* HANDLE IMAGE */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormMeta((prev) => ({ ...prev, image: file }));
    if (file) {
      setFormErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  /* VALIDATE */
  const validateForm = () => {
    const errors = {};
    if (!formMeta.page_name) errors.page_name = "Page Name is required";
    if (!formMeta.page_url) errors.page_url = "Page URL is required";
    if (!formMeta.title) errors.title = "Title is required";
    if (!formMeta.description) errors.description = "Description is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /* SUBMIT */
  const handleSubmit = async () => {
    setIsLoading(true);
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
    try {
      const formData = new FormData();
      formData.append("page_name", formMeta.page_name);
      formData.append("page_url", formMeta.page_url);
      formData.append("title", formMeta.title);
      formData.append("description", formMeta.description);
      if (formMeta.image instanceof File) {
        formData.append("image", formMeta.image);
      }
      const url = editMeta
        ? `${config.api.baseURL}${config.api.metaDataEndpoint}/${editMeta._id}`
        : `${config.api.baseURL}${config.api.metaDataEndpoint}`;
      const method = editMeta ? "PUT" : "POST";
      const response = await fetch(url, { method, body: formData });
      const result = await response.json();
      if (result.success) {
        fetchMetaData();
        closeModal();
      }
    } catch (error) {
      console.error("Error submitting metadata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  /* DELETE */
  const handleDeleteSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${config.api.baseURL}${config.api.metaDataEndpoint}/${deleteMeta._id}`,
        { method: "DELETE" }
      );
      const result = await response.json();
      if (result.success) {
        fetchMetaData();
        closeModal();
      }
    } catch (error) {
      console.error("Error deleting metadata:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header className="admin-dashboard">
        <div>Hello Admin</div>
        <div>
          <button className="setting-btn" onClick={() => navigate("/admin/dashboard")}>
            Dashboard
          </button>
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-container">

        <div className="dashboard-header">
          <h1>SEO Metadata Dashboard</h1>
          <button className="upload-btn" onClick={() => setModalIsOpen(true)}>
            Add Metadata
          </button>
        </div>

        {loading ? (

          <div className="loading-message">Loading...</div>

        ) : metaData.length === 0 ? (

          <div className="car-list-no-data">
            <div className="no-cars-message">Metadata not available!</div>
          </div>

        ) : (

          // ─── TABLE STARTS HERE ───────────────────────────────────────
          <div className="table-wrapper">
            <table className="meta-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Page Name</th>
                  <th>Page URL</th>
                  <th>SEO Title</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((meta, index) => (
                  <tr key={meta._id}>

                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>

                    {/* <td>
                      <img
                        src={`${config.api.baseURL}${meta.image}`}
                        alt={meta.title}
                        className="table-meta-image"
                      />
                    </td> */}

                    <td>{meta.page_name}</td>

                    <td>{meta.page_url}</td>

                    <td>{meta.title}</td>

                    <td className="desc-cell">{meta.description}</td>

                    <td>
                      <div className="actions">
                        <FaEdit
                          className="edit"
                          onClick={() => openEditModal(meta)}
                        />
                        <FaTrashAlt
                          className="delete"
                          onClick={() => openDeleteModal(meta)}
                        />
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          // ─── TABLE ENDS HERE ─────────────────────────────────────────
        )}

        {/* PAGINATION */}
        {totalPagesCount > 1 && (
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              <img src={leftArrow} />
            </button>
            <span>Page {currentPage} of {totalPagesCount}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPagesCount}>
              <img src={rightArrow} />
            </button>
          </div>
        )}

        {/* ADD / EDIT MODAL */}
        <Modal isOpen={modalIsOpen} onClose={closeModal}>
          <h2>{editMeta ? "Edit Metadata" : "Add Metadata"}</h2>
          <form className="modal-form">
            <input
              type="text"
              name="page_name"
              placeholder="Page Name"
              value={formMeta.page_name}
              onChange={handleChange}
            />
            {formErrors.page_name && (
              <p className="error-message">{formErrors.page_name}</p>
            )}

            <input
              type="text"
              name="page_url"
              placeholder="Page URL"
              value={formMeta.page_url}
              onChange={handleChange}
            />
            {formErrors.page_url && (
              <p className="error-message">{formErrors.page_url}</p>
            )}

            <input
              type="text"
              name="title"
              placeholder="SEO Title"
              value={formMeta.title}
              onChange={handleChange}
            />
            {formErrors.title && (
              <p className="error-message">{formErrors.title}</p>
            )}

            <textarea
              name="description"
              placeholder="SEO Description"
              value={formMeta.description}
              onChange={handleChange}
            />
            {formErrors.description && (
              <p className="error-message">{formErrors.description}</p>
            )}

            <input type="file" onChange={handleFileChange} />

            {formMeta.image && (
              <div className="upload-car-image">
                <img
                  src={
                    formMeta.image instanceof File
                      ? URL.createObjectURL(formMeta.image)
                      : `${config.api.baseURL}${formMeta.image}`
                  }
                  alt="SEO"
                />
                <FaTrashAlt
                  onClick={() =>
                    setFormMeta((prev) => ({ ...prev, image: null }))
                  }
                />
              </div>
            )}

            <button
              type="button"
              className={`${isLoading ? "loading" : ""}`}
              onClick={handleSubmit}
            >
              {editMeta ? "Update Metadata" : "Add Metadata"}
              <div className="loader-wrap">
                <span className="loader"></span>
              </div>
            </button>
          </form>
        </Modal>

        {/* DELETE MODAL */}
        <Modal isOpen={deleteModalIsOpen} onClose={closeModal}>
          <h2 className="deletepopup">
            Are you sure you want to delete this metadata?
          </h2>
          <div className="btn-wrap-delete">
            <button
              className={`btn deletebtn ${isLoading ? "loading" : ""}`}
              onClick={handleDeleteSubmit}
            >
              Delete
              <div className="loader-wrap">
                <span className="loader"></span>
              </div>
            </button>
            <button className="btn cancelbtn" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </Modal>

      </div>
    </>
  );
};

export default MetaDataPage;