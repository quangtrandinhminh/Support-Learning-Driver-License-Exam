import React, { useState } from "react";
import "./staff-create-form.scss"; // Make sure to have the corresponding CSS file
import api from "../../../../../config/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateStaffForm() {
  const [error, setError] = useState(null);
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const createNewStaff = async () => {
    try {
      // Check conditions for input data
      if (
        !inputData.username ||
        !inputData.password ||
        !inputData.fullName ||
        !inputData.email ||
        !inputData.phone
      ) {
        setError("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      // Additional conditions check if needed

      await api.post("Staff/add", inputData);
      toast.success("Tạo nhân viên thành công");
      setError(null);
      navigate("/quan-ly-nhan-vien");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Tên đăng nhập hoặc email đã tồn tại.");
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        console.log(err); // Log other errors
      }
    }
    window.scroll({
      top: 0,
      behavior: "instant",
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNewStaff();
  };

  return (
    <div className="create-staff-container">
      <div className="create-staff-title">
        <h1 className="text-center text-uppercase">Tạo nhân viên</h1>
      </div>
      <div className="create-staff-form">
        {error && <h5 className="error-message mb-3 text-danger">{error}</h5>}
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="username" className="col-sm-3 col-form-label">
              Tên đăng nhập:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Tên đăng nhập"
                name="username"
                value={inputData.username}
                onChange={(e) =>
                  setInputData({ ...inputData, username: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-3 col-form-label">
              Mật khẩu:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Mật khẩu"
                name="password"
                value={inputData.password}
                onChange={(e) =>
                  setInputData({ ...inputData, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="fullName" className="col-sm-3 col-form-label">
              Họ và Tên:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Họ và Tên"
                name="fullName"
                value={inputData.fullName}
                onChange={(e) =>
                  setInputData({ ...inputData, fullName: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="email" className="col-sm-3 col-form-label">
              Email:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                name="email"
                value={inputData.email}
                onChange={(e) =>
                  setInputData({ ...inputData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="phone" className="col-sm-3 col-form-label">
              Điện thoại:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="tel"
                className="form-control"
                id="phone"
                placeholder="Điện thoại"
                name="phone"
                value={inputData.phone}
                onChange={(e) =>
                  setInputData({ ...inputData, phone: e.target.value })
                }
              />
            </div>
          </div>
          <button className="btn btn-primary w-20 justify-self-end" type="submit">Tạo</button>
        </form>
      </div>
    </div>
  );
}

export default CreateStaffForm;
