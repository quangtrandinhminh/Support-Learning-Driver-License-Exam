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
    status: true
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
                min={0}
                max={70}
                onChange={(e) => { (inputData.limitStudent = parseInt(e.target.value)); setInputData({ ...inputData, limitStudent: inputData.limitStudent }) }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="courseFee" className="col-sm-3 col-form-label">
              Học phí :{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="courseFee"
                name="courseFee"
                value={inputData.courseFee}
                min={0}
                max={1000}
                onChange={(e) => { (inputData.courseFee = parseInt(e.target.value)); setInputData({ ...inputData, courseFee: inputData.courseFee }) }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="passTheoryLs" className="col-sm-3 col-form-label">
              Số buổi học lý thuyết:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="passTheoryLs"
                name="passTheoryLs"
                value={inputData.passTheoryLs}
                min={0}
                max={70}
                onChange={(e) => { (inputData.passTheoryLs = parseInt(e.target.value)); setInputData({ ...inputData, passTheoryLs: inputData.passTheoryLs }) }}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="passKm" className="col-sm-3 col-form-label">
              Quãng đường cần thiết:{" "}
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control"
                id="passKm"
                name="passKm"
                value={inputData.passKm}
                min={0}
                max={100000000}
                placeholder="km"
                onChange={(e) => { (inputData.passKm = parseInt(e.target.value)); setInputData({ ...inputData, passKm: inputData.passKm }) }}
              />
            </div>
          </div>
          <button
            className="btn btn-primary tw-mb-5 justify-self-end"
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
  const course = JSON.parse(localStorage.getItem("course") || "{}");

  const [error, setError] = useState(null);

  const [inputData, setInputData] = useState({
    courseContent1: "",
    courseTimeStart1: "",
    courseTimeEnd1: "",
    courseContent2: "",
    courseTimeStart2: "",
    courseTimeEnd2: "",
    courseContent3: "",
    courseTimeStart3: "",
    courseTimeEnd3: "",
    courseContent4: "",
    courseTimeStart4: "",
    courseTimeEnd4: "",
    courseContent5: "",
    courseTimeStart5: "",
    courseTimeEnd5: "",
    courseContent6: "",
    courseTimeStart6: "",
    courseTimeEnd6: "",
    courseId: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Use Promise.all to run both API calls concurrently
      await Promise.all([
        api.post("Course/add", course),
        api.post("CourseDetails/add", inputData),
      ]);

      // Handle success or navigate to another page if needed
    } catch (err) {
      console.log(err);
      // Handle errors
    }
  };

  useEffect(() => {
    setInputData({ ...inputData, courseId: course.courseId });
  }, [inputData.courseContent1, inputData.courseContent2, inputData.courseContent3, inputData.courseContent4, inputData.courseContent5, inputData.courseContent6]);

  return (
    <div className="template-container">
      <div className="create-course-container">
        <div className="create-course-title">
          <h1 className="text-center text-uppercase">Chi tiết khoá học</h1>
        </div>
        <div className="create-course-form">
          {error && <h5 className="error-message mb-3 tw-text-realRed">{error}</h5>}
          <form onSubmit={handleSubmit}>
            {/* <div className="form-group row">
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
                  onChange={(e) =>
                    setInputData({ ...inputData, courseId: e.target.value })
                  }
                />
              </div>
            </div> */}
            {/* 1st detail */}
            <div className="form-group row">
              <label htmlFor="courseContent1" className="col-sm-2 col-form-label">
                Nội dung 1:{" "}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="courseContent1"
                  placeholder="nội dung số 1"
                  name="courseContent1"
                  value={inputData.courseContent1}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseContent1: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="startDate" className="col-sm-2 col-form-label">
                Ngày bắt đầu:{" "}
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  placeholder="start date"
                  name="startDate"
                  value={inputData.courseTimeStart1}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseTimeStart1: e.target.value })
                  }
                />
              </div>
              <label htmlFor="endDate" className="col-sm-2 col-form-label">
                Ngày kết thúc:{" "}
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  placeholder="end date"
                  name="endDate"
                  value={inputData.courseTimeEnd1}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseTimeEnd1: e.target.value })
                  }
                />
              </div>
            </div>

            {/* 2nd detail */}
            <div className="form-group row">
              <label htmlFor="courseContent2" className="col-sm-2 col-form-label">
                Nội dung 2:{" "}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="courseContent2"
                  placeholder="nội dung số 2"
                  name="courseContent2"
                  value={inputData.courseContent2}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseContent2: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="startDate" className="col-sm-2 col-form-label">
                Ngày bắt đầu:{" "}
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  placeholder="start date"
                  name="startDate"
                  value={inputData.courseTimeStart2}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseTimeStart2: e.target.value })
                  }
                />
              </div>
              <label htmlFor="endDate" className="col-sm-2 col-form-label">
                Ngày kết thúc:{" "}
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  placeholder="end date"
                  name="endDate"
                  value={inputData.courseTimeEnd2}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseTimeEnd2: e.target.value })
                  }
                />
              </div>
            </div>

            {/* 3rd detail */}
            <div className="form-group row">
              <label htmlFor="courseContent3" className="col-sm-2 col-form-label">
                Nội dung 3:{" "}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="courseContent3"
                  placeholder="nội dung số 3"
                  name="courseContent3"
                  value={inputData.courseContent3}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseContent3: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="startDate" className="col-sm-2 col-form-label">
                Ngày bắt đầu:{" "}
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  placeholder="start date"
                  name="startDate"
                  value={inputData.courseTimeStart3}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseTimeStart3: e.target.value })
                  }
                />
              </div>
              <label htmlFor="endDate" className="col-sm-2 col-form-label">
                Ngày kết thúc:{" "}
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  placeholder="end date"
                  name="endDate"
                  value={inputData.courseTimeEnd3}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseTimeEnd3: e.target.value })
                  }
                />
              </div>
            </div>

            {/* 4th detail */}
            <div className="form-group row">
              <label htmlFor="courseContent4" className="col-sm-2 col-form-label">
                Nội dung 4:{" "}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="courseContent4"
                  placeholder="nội dung số 4"
                  name="courseContent4"
                  value={inputData.courseContent4}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseContent4: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="startDate" className="col-sm-2 col-form-label">
                Ngày bắt đầu:{" "}
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  placeholder="start date"
                  name="startDate"
                  value={inputData.courseTimeStart4}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseTimeStart4: e.target.value })
                  }
                />
              </div>
              <label htmlFor="endDate" className="col-sm-2 col-form-label">
                Ngày kết thúc:{" "}
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  placeholder="end date"
                  name="endDate"
                  value={inputData.courseTimeEnd4}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseTimeEnd4: e.target.value })
                  }
                />
              </div>
            </div>

            {/* 5th detail */}
            <div className="form-group row">
              <label htmlFor="courseContent5" className="col-sm-2 col-form-label">
                Nội dung 5:{" "}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="courseContent5"
                  placeholder="nội dung số 5"
                  name="courseContent5"
                  value={inputData.courseContent5}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseContent5: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="startDate" className="col-sm-2 col-form-label">
                Ngày bắt đầu:{" "}
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  placeholder="start date"
                  name="startDate"
                  value={inputData.courseTimeStart5}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseTimeStart5: e.target.value })
                  }
                />
              </div>
              <label htmlFor="endDate" className="col-sm-2 col-form-label">
                Ngày kết thúc:{" "}
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  placeholder="end date"
                  name="endDate"
                  value={inputData.courseTimeEnd5}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseTimeEnd5: e.target.value })
                  }
                />
              </div>
            </div>

            {/* 6th detail */}
            <div className="form-group row">
              <label htmlFor="courseContent6" className="col-sm-2 col-form-label">
                Nội dung 6:{" "}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="courseContent6"
                  placeholder="nội dung số 6"
                  name="courseContent6"
                  value={inputData.courseContent6}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseContent6: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="startDate" className="col-sm-2 col-form-label">
                Ngày bắt đầu:{" "}
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  placeholder="start date"
                  name="startDate"
                  value={inputData.courseTimeStart6}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseTimeStart6: e.target.value })
                  }
                />
              </div>
              <label htmlFor="endDate" className="col-sm-2 col-form-label">
                Ngày kết thúc:{" "}
              </label>
              <div className="col-sm-4">
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  placeholder="end date"
                  name="endDate"
                  value={inputData.courseTimeEnd6}
                  onChange={(e) =>
                    setInputData({ ...inputData, courseTimeEnd6: e.target.value })
                  }
                />
              </div>
            </div>
            <button
              className="btn btn-primary tw-mb-5 justify-self-end"
              type="submit"
            >
              Tạo khoá học
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
