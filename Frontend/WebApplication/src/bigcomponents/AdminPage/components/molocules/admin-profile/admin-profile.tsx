import React, { useEffect, useState } from "react";
import { NavLink as Forward, useNavigate } from "react-router-dom";
import "./admin-profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import api from "../../../../../config/axios";

const UserInformation: React.FC = () => {
  const user = sessionStorage.getItem("loginedUser")
    ? JSON.parse(sessionStorage.getItem("loginedUser"))
    : null;

  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.roleId === 1) {
        try {
          const response = await api.get("Users");
          const data = response.data;

          // Find the user with the matching username
          const matchingUser = data.find(
            (apiUser) => apiUser.username === user.username
          );

          if (matchingUser) {
            // Extract only the required fields
            const { fullName, email, phone } = matchingUser;

            // Set the state with the extracted data
            setUserData({ fullName, email, phone });
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div className="body">
      <div className="user-information">
        <div className="profile">
          <div className="profile-img">
            <FontAwesomeIcon icon={faUserCircle} className="icon" />
          </div>
          <div className="contain">
            <p className="line_content">
              <strong className="information_content">Fullname:</strong>{" "}
              {userData.fullName}
            </p>
            <p className="line_content">
              <strong>Email:</strong> {userData.email}
            </p>
            <p className="line_content">
              <strong>Phone:</strong> {userData.phone}
            </p>
          </div>
        </div>
        <div className="Description">
          <p className="line_description">
            Một số thông tin quan trọng sẽ được ẩn đi bớt
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
