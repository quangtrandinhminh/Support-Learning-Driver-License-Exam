import React, { useState, useEffect } from "react";
import "./mentor-update-form.scss"; // Make sure to have the corresponding CSS file
import api from "../../../../../config/axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface MentorData {
  mentorId: number;
  fullName: string;
  email: string;
  phone: string;
  residenceAddress: string;
  isTeachingTheory: boolean;
  isTeachingPractice: boolean;
}

function UpdateMentorForm() {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [inputData, setInputData] = useState<MentorData>({
    mentorId: 0,
    fullName: "",
    email: "",
    phone: "",
    residenceAddress: "",
    isTeachingTheory: true,
    isTeachingPractice: true,
  });

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await api.get(`Mentor/getById/${mentorId}`);
        const mentorData = response.data;
        setInputData(mentorData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMentorData();
  }, [mentorId]);

  const updateMentor = async () => {
    try {
      // Validate input data
      if (
        !inputData.mentorId ||
        !inputData.fullName ||
        !inputData.email ||
        !inputData.phone ||
        !inputData.residenceAddress
      ) {
        setError("Vui lòng điền đầy đủ thông tin.");
        return;
      }

      // Additional conditions check if needed

      await api.put(`Mentor/update`, {
        mentorId: inputData.mentorId,
        fullName: inputData.fullName,
        email: inputData.email,
        phone: inputData.phone,
        residenceAddress: inputData.residenceAddress,
        isTeachingTheory: inputData.isTeachingTheory,
        isTeachingPractice: inputData.isTeachingPractice,
      });

      toast.success("Cập nhật giáo viên thành công");
      setError(null);
      navigate("/quan-ly-giao-vien");
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
    updateMentor();
  };

  return (
    <div className="update-mentor-container">
      <div className="update-mentor-title">
        <h1 className="text-center text-uppercase">Cập nhật giáo viên</h1>
      </div>
      <div className="update-mentor-form">
        {error && <h5 className="error-message mb-3 text-danger">{error}</h5>}
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="mentorId" className="col-sm-3 col-form-label">
              Mentor ID:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="mentorId"
                placeholder="Mentor ID"
                name="mentorId"
                value={inputData.mentorId}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value));
                  setInputData({ ...inputData, mentorId: value });
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

export default UpdateMentorForm;
