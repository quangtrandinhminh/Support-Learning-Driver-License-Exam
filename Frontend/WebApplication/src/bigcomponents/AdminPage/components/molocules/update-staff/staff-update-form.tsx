import React, { useState, useEffect } from "react";
import "./staff-update-form.scss"; // Make sure to have the corresponding CSS file
import api from "../../../../../config/axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface StaffData {
  staffId: number;
  fullName: string;
  email: string;
  phone: string;
}

function UpdateStaffForm() {
  const { staffId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [inputData, setInputData] = useState<StaffData>({
    staffId: 0,
    fullName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await api.get(`Staff/getById/${staffId}`);
        const staffData = response.data;
        setInputData(staffData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStaffData();
  }, [staffId]);

  const updateStaff = async () => {
    try {
      // Validate input data
      if (
        !inputData.staffId ||
        !inputData.fullName ||
        !inputData.email ||
        !inputData.phone
      ) {
        setError("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      // Additional conditions check if needed

      await api.put(`Staff/update`, {
        staffId: inputData.staffId,
        fullName: inputData.fullName,
        email: inputData.email,
        phone: inputData.phone,
      });

      toast.success("Cập nhật nhân viên thành công");
      setError(null);
      navigate("/quan-ly-nhan-vien");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Email đã tồn tại.");
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        console.log(err); // Log other errors
      }
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateStaff();
  };

  return (
    <div className="update-staff-container">
      <div className="update-staff-title">
        <h1 className="text-center text-uppercase">Cập nhật nhân viên</h1>
      </div>
      <div className="update-staff-form">
        {error && <h5 className="error-message mb-3 text-danger">{error}</h5>}
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="staffId" className="col-sm-3 col-form-label">
              Staff ID:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="staffId"
                placeholder="Staff ID"
                name="staffId"
                value={inputData.staffId}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value));
                  setInputData({ ...inputData, staffId: value });
                }}
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
          <button
            className="btn btn-primary w-20 justify-self-end"
            type="submit"
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStaffForm;
