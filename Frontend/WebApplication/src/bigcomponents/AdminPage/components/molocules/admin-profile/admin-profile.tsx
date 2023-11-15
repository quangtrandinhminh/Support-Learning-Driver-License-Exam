import React, { useEffect, useState } from "react";
import { NavLink as Forward, useNavigate } from "react-router-dom";
import "./admin-profile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const UserInformation: React.FC = () => {
  const user = sessionStorage.getItem("loginedUser")
    ? JSON.parse(sessionStorage.getItem("loginedUser"))
    : null;
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleLogout = () => {
    sessionStorage.removeItem("loginedUser");
    console.log("user:", user);
    navigate("/");
  };

  useEffect(() => {
    // Lấy người dùng đã đăng nhập từ sessionStorage
    const user = sessionStorage.getItem("loginedUser")
      ? JSON.parse(sessionStorage.getItem("loginedUser"))
      : null;

    // Chỉ gửi yêu cầu API nếu người dùng đã đăng nhập và có roleId là 1
    if (user && user.roleId === 1) {
      // Sử dụng API URL của bạn
      const apiUrl = "https://fdriving.azurewebsites.net/api/Users";

      // Gửi một yêu cầu GET đến API
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Lọc người dùng có username trùng với username của người dùng đã đăng nhập
          const matchingUser = data.find(
            (user: { username: any }) => user.username === user.username
          );

          if (matchingUser) {
            // Lấy thông tin fullname, email, và phone từ dữ liệu người dùng trùng khớp
            const { fullName, email, phone } = matchingUser;
            setUserData({ fullName, email, phone });
            console.log("Dữ liệu người dùng:", userData);
          }
        })
        .catch((error) => {
          console.error("Lỗi khi lấy dữ liệu từ API:", error);
        });
    }
  }, []);

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
          <p className="line_description">Một số thông tin quan trọng sẽ được ẩn đi bớt</p>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
