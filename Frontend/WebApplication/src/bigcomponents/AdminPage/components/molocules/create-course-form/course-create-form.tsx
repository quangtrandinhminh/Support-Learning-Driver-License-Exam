import React, { useEffect, useState } from "react";
import "./create-course-form.scss";
import api from "../../../../../config/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateCourseForm() {
  const [error, setError] = useState(null);
  const [inputData, setInputData] = useState({
    courseId: "",
    name: "",
    startDate: "",
    endDate: "",
    limitStudent: 0,
    courseFee: 0,
    passTheoryLs: 0,
    passKm: 0,
    status: false
  });

  const navigate = useNavigate();

  const createNewCourse = async () => {
    try {
      if (!/^(\d{4})B2$/.test(inputData.courseId)) {
        setError("Mã khoá học phải có định dạng XXXXB2 với X là số.");
        return;
      } else if (!/^(\d{3})B2$/.test(inputData.name)) {
        setError("Tên khoá học phải có định dạng XXXB2 với X là số.");
        return;
      }

      localStorage.setItem("course", JSON.stringify(inputData));
      navigate("/quan-ly-khoa-hoc/chi-tiet");

    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
        return;
      }
    }
    window.scroll({
      top: 0,
      behavior: "instant",
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNewCourse();
  };

  return (
    <div className="create-course-container">
      <div className="create-course-title">
        <h1 className="text-center text-uppercase">Tạo khoá học</h1>
      </div>
      <div className="create-course-form">
        {error && <h5 className="error-message mb-3 tw-text-realRed">{error}</h5>}
        <form onSubmit={handleSubmit}>
          <div className="form-group row">
            <label htmlFor="courseId" className="col-sm-3 col-form-label">
              Mã khoá học:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="courseId"
                placeholder="courseId"
                name="courseId"
                value={inputData.courseId}
                required
                onChange={(e) =>
                  setInputData({ ...inputData, courseId: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-3 col-form-label">
              Tên khoá học:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="name"
                name="name"
                value={inputData.name}
                required
                onChange={(e) =>
                  setInputData({ ...inputData, name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="startDate" className="col-sm-3 col-form-label">
              Ngày khai giảng:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="date"
                className="form-control"
                id="startDate"
                placeholder="start date"
                name="startDate"
                value={inputData.startDate}
                required
                onChange={(e) =>
                  setInputData({ ...inputData, startDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="endDate" className="col-sm-3 col-form-label">
              Ngày bế giảng:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="date"
                className="form-control"
                id="endDate"
                placeholder="end date"
                name="endDate"
                value={inputData.endDate}
                required
                onChange={(e) =>
                  setInputData({ ...inputData, endDate: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="limitStudent" className="col-sm-3 col-form-label">
              Số học viên tối đa:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="limitStudent"
                name="limitStudent"
                value={inputData.limitStudent}
                min={25}
                max={70}
                required
                onChange={(e) => { (inputData.limitStudent = parseInt(e.target.value)); setInputData({ ...inputData, limitStudent: inputData.limitStudent }) }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="courseFee" className="col-sm-3 col-form-label">
              Học phí (VNĐ):{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="courseFee"
                name="courseFee"
                value={inputData.courseFee}
                min={0}
                max={30000000}
                required
                onChange={(e) => { (inputData.courseFee = parseInt(e.target.value)); setInputData({ ...inputData, courseFee: inputData.courseFee }) }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="passTheoryLs" className="col-sm-3 col-form-label">
              Số giờ học lý thuyết (%):{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="passTheoryLs"
                name="passTheoryLs"
                value={inputData.passTheoryLs}
                min={0}
                max={100}
                required
                onChange={(e) => { (inputData.passTheoryLs = parseInt(e.target.value)); setInputData({ ...inputData, passTheoryLs: inputData.passTheoryLs }) }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="passKm" className="col-sm-3 col-form-label">
              Quãng đường cần thiết (km):{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="passKm"
                name="passKm"
                value={inputData.passKm}
                min={60}
                max={1000}
                placeholder="km"
                required
                onChange={(e) => { (inputData.passKm = parseInt(e.target.value)); setInputData({ ...inputData, passKm: inputData.passKm }) }}
              />
            </div>
          </div>
          <button
            className="btn btn-primary tw-mb-5 tw-justify-self-center tw-w-1/4"
            type="submit"
          >
            Tiếp tục
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourseForm;

export function CreateCourseDetail() {
  const course = JSON.parse(localStorage.getItem('course') || '{}');
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const initialData = ['courseContent', 'courseTimeStart', 'courseTimeEnd', 'courseId'];
  const [inputData, setInputData] = useState(Array(1).fill({}));

  useEffect(() => {
    setInputData((prevInputData) => (
      prevInputData.map(() => (
        initialData.reduce((acc, field) => {
          acc[field] = field === 'courseId' ? course.courseId : '';
          return acc;
        }, {})
      ))
    ));
    console.log(inputData);
  }, [course.courseId]);

  const handleChange = (index, field, value) => {
    setInputData((prevInputData) => {
      const newData = [...prevInputData];
      newData[index] = { ...newData[index], [field]: value };
      return newData;
    });
  };

  const handleAddInput = () => {
    setInputData((prevInputData) => [
      ...prevInputData,
      initialData.reduce((acc, field) => {
        acc[field] = field === 'courseId' ? course.courseId : '';
        return acc;
      }, {}),
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data to send to the server
      const formattedListObjects = inputData.map((data) => ({ ...data }));

      // Create course first
      const response = await api.post("Course/add", course);

      // If success then adding course details
      if (response.status === 200) {
        // Make an API request to the server using Axios
        await api.post(
          'CourseDetails/add',
          formattedListObjects,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
      }

      toast.success('Tạo khoá học thành công');
      navigate('/quan-ly-khoa-hoc/chua-mo')
        ;
      // For example, if your response contains additional information, you can use it as needed.
    } catch (error) {
      console.error('Error:', error);
      // Handle errors here
      setError('Error submitting data. Please try again.');
    }
  };

  return (
    <div className="template-container">
      <div className="create-course-container">
        <div className="create-course-title">
          <h1 className="text-center text-uppercase">Chi tiết khoá học</h1>
        </div>
        <div className="create-course-form">
          {error && <h5 className="error-message mb-3 tw-text-realRed">{error}</h5>}
          <form onSubmit={handleSubmit}>
            {inputData.map((data, index) => (
              <div key={index}>
                <div className="form-group row">
                  <label htmlFor={`courseContent${index + 1}`} className="col-sm-2 col-form-label">
                    Nội dung {index + 1}:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id={`courseContent${index + 1}`}
                      placeholder={`nội dung số ${index + 1}`}
                      name={`courseContent${index + 1}`}
                      value={inputData[index].courseContent}
                      required
                      onChange={(e) => handleChange(index, 'courseContent', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row tw-mt-4">
                  <label htmlFor={`startDate${index + 1}`} className="col-sm-2 col-form-label">
                    Ngày bắt đầu:
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="date"
                      className="form-control"
                      id={`startDate${index + 1}`}
                      placeholder={`start date ${index + 1}`}
                      name={`courseTimeStart${index + 1}`}
                      value={inputData[index].courseTimeStart}
                      required
                      onChange={(e) => handleChange(index, 'courseTimeStart', e.target.value)}
                    />
                  </div>
                  <label htmlFor={`endDate${index + 1}`} className="col-sm-2 col-form-label">
                    Ngày kết thúc:
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="date"
                      className="form-control"
                      id={`endDate${index + 1}`}
                      placeholder={`end date ${index + 1}`}
                      name={`courseTimeEnd${index + 1}`}
                      value={inputData[index].courseTimeEnd}
                      required
                      onChange={(e) => handleChange(index, 'courseTimeEnd', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              className="btn btn-info tw-mb-2 tw-justify-self-end tw-w-1/6"
              type="button" // Change to "button" to prevent form submission
              onClick={handleAddInput}
            >
              Thêm nội dung
            </button>
            <button
              className="btn btn-primary tw-mb-5 tw-justify-self-center tw-w-1/4"
              type="submit"
            >
              Tạo khoá học
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
