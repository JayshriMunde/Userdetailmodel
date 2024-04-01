import React, { useState, useEffect, useRef } from "react";
import "./XModel.css";

function XModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
  });

  const modalRef = useRef(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      setIsOpen(false);
      setFormData({
        username: "",
        email: "",
        dob: "",
        phone: "",
      });
    }
  };

  const validateForm = () => {
    let formValid = true;

    // Validate Username
    if (!formData.username.trim()) {
      formValid = false;
      document
        .getElementById("username")
        .setCustomValidity("Username is required.");
    } else {
      document.getElementById("username").setCustomValidity("");
    }

    // Validate Email
    if (!formData.email.trim()) {
      formValid = false;
      document.getElementById("email").setCustomValidity("Email is required.");
    } else if (!validateEmail(formData.email)) {
      formValid = false;
      document
        .getElementById("email")
        .setCustomValidity("Invalid email format.");
    } else {
      document.getElementById("email").setCustomValidity("");
    }

    // Validate Date of Birth
    if (!formData.dob.trim()) {
      formValid = false;
      document
        .getElementById("dob")
        .setCustomValidity("Date of Birth is required.");
    } else {
      document.getElementById("dob").setCustomValidity("");
    }

    // Validate Phone Number
    if (!formData.phone.trim()) {
      formValid = false;
      document
        .getElementById("phone")
        .setCustomValidity("Phone Number is required.");
    } else if (!validatePhone(formData.phone)) {
      formValid = false;
      document
        .getElementById("phone")
        .setCustomValidity("Invalid phone number. Must be 10 digits.");
    } else {
      document.getElementById("phone").setCustomValidity("");
    }

    return formValid;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFormData({
        username: "",
        email: "",
        dob: "",
        phone: "",
      });
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
      setFormData({
        username: "",
        email: "",
        dob: "",
        phone: "",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div>
      <div className="button-container">
        <button className="open-form-button" onClick={toggleModal}>
          Open Form
        </button>
      </div>

      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-content" ref={modalRef}>
          <span className="close" onClick={toggleModal}>
            &times;
          </span>
          <h2>User Details Model</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />

            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </div>

      {isOpen && <div className="backdrop" onClick={toggleModal}></div>}
    </div>
  );
}

export default XModal;
