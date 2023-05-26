import React from "react";
import NavBar from "../Navigation/NavBar";
import "./ProfileManager.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useState } from "react";

import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const ProfileManager = () => {

  const userId = localStorage.getItem("userId");
  const UserName = localStorage.getItem("userName");
  const UserEmail = localStorage.getItem("userEmail");
  const UserSurname = localStorage.getItem("userSurname");
  const UserPhone = localStorage.getItem("userPhone");
  const UserGender = localStorage.getItem("userGender");
  const userCountry = localStorage.getItem("userCountry");

  const [hasChanges, setHasChanges] = useState(false);
  const [formValues, setFormValues] = useState({
    name: UserName,
    surname: UserSurname,
    email: UserEmail,
    phone_number: UserPhone,
    gender: UserGender,
    country_id: userCountry,
  });


  const handleSubmit = (ev) => {
    ev.preventDefault();
    console.log(formValues);
    axios.get("http://localhost:8000/sanctum/csrf-cookie").then(() => {
      axios
        .put(`http://localhost:8000/api/updateUser/${userId}`, {
          name: formValues.name,
          surname: formValues.surname,
          email: formValues.email,
          phone_number: formValues.phone_number,
          gender: formValues.gender,
          country_id: 1,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            localStorage.setItem("userName", formValues.name);
            localStorage.setItem("userEmail", formValues.email);
            localStorage.setItem("userSurname", formValues.surname);
            localStorage.setItem("userPhone", formValues.phone_number);

            alertify.success("Profile updated successfully");
            setHasChanges(false);
            console.log("ALL OK");
          }
        })
        .catch(function (error) {
          console.error(error);
          alertify.error("Error updating profile");
        });
    });
  };

  const handleBack = (event) => {
    event.preventDefault();
    if (hasChanges) {
      alertify.confirm(
        "You have unsaved changes. Are you sure you want to leave?",
        async () => {
          window.location.href = "/profile";
        },
        () => {
          // Cancel callback
        }
      );
    } else {
      window.location.href = "/profile";
    }
  };

  return (
    <div>
      <NavBar />

      <div className="d-flex justify-content-center">
        <div className="edit-div">
          <h2 className="welcome">Edit Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                defaultValue={UserName}
                onChange={(e) => {
                  setFormValues({ ...formValues, name: e.target.value });
                  setHasChanges(true);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                id="surname"
                name="surname"
                defaultValue={UserSurname}
                onChange={(e) => {
                  setFormValues({ ...formValues, surname: e.target.value });
                  setHasChanges(true);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                id="email"
                name="email"
                defaultValue={UserEmail}
                onChange={(e) => {
                  setFormValues({ ...formValues, email: e.target.value });
                  setHasChanges(true);
                }}
              />
            </Form.Group>
            <Form.Label>Gender</Form.Label>
            <Form.Group className="mb-3">
              <Form.Check
                type="radio"
                name="gender"
                id="male"
                label="Male"
                inline
                value="male"
                onChange={(e) => {
                  setFormValues({ ...formValues, gender: e.target.value });
                  setHasChanges(true);
                }}
              />

              <Form.Check
                type="radio"
                name="gender"
                id="female"
                label="Female"
                inline
                value="female"
                onChange={(e) => {
                  setFormValues({ ...formValues, gender: e.target.value });
                  setHasChanges(true);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                id="phone_number"
                name="phone_number"
                defaultValue={UserPhone}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    phone_number: e.target.value,
                  });
                  setHasChanges(true);
                }}
              />
            </Form.Group>
          
            <button className="edit-button" type="submit">
              Submit
            </button>
            <button className="back-button" onClick={handleBack}>
              Back
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ProfileManager;
