import React, { useState } from "react";
import "./mentor-create-form.scss";
import api from "../../../../../config/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateMentorForm() {
  const [error, setError] = useState(null);
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    residenceAddress: "",
    isTeachingTheory: true,
    isTeachingPractice: true,
  });

  const navigate = useNavigate();

  const createNewMentor = async () => {
    try {
      // Kiểm tra các điều kiện cho đầu vào dữ liệu
      if (
        !inputData.username ||
        !inputData.password ||
        !inputData.fullName ||
        !inputData.email ||
        !inputData.phone ||
        !inputData.residenceAddress
      ) {
        setError("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      // Thực hiện kiểm tra điều kiện khác nếu cần

      await api.post("Mentor/add", inputData);
      toast.success("Tạo giáo viên thành công");
      setError(null);
      navigate("/quan-ly-giao-vien");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Tên đăng nhập hoặc email đã tồn tại.");
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        console.log(err); // Log các lỗi khác
      }
    }
    window.scroll({
      top: 0,
      behavior: "instant",
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNewMentor();
  };

  return (
    <div className="create-mentor-container">
      <div className="create-mentor-title">
        <h1 className="text-center text-uppercase">Tạo giáo viên</h1>
      </div>
      <div className="create-mentor-form">
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
          <div className="form-group row">
            <label
              htmlFor="residenceAddress"
              className="col-sm-3 col-form-label"
            >
              Địa chỉ:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="residenceAddress"
                placeholder="Địa chỉ"
                name="residenceAddress"
                value={inputData.residenceAddress}
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    residenceAddress: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Dạy lý thuyết: </label>
            <div className="col-sm-9">
              <select
                className="form-control"
                name="isTeachingTheory"
                value={inputData.isTeachingTheory ? "true" : "false"} // Chuyển đổi thành chuỗi
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    isTeachingTheory: e.target.value === "true",
                  })
                }
              >
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Dạy thực hành: </label>
            <div className="col-sm-9">
              <select
                className="form-control"
                name="isTeachingPractice"
                value={inputData.isTeachingPractice ? "true" : "false"} // Chuyển đổi thành chuỗi
                onChange={(e) =>
                  setInputData({
                    ...inputData,
                    isTeachingPractice: e.target.value === "true",
                  })
                }
              >
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>
          </div>
          <button className="btn btn-primary w-20 justify-self-end" type="submit">Tạo</button>
        </form>
      </div>
    </div>
  );
}

export default CreateMentorForm;
