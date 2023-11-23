import React, { useEffect, useState } from "react";
import "./class-create-form.scss"; // You can create the styles accordingly
import api from "../../../../../config/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CreateTheoryLesson() {
  const courseId = localStorage.getItem('courseId');
  const [error, setError] = useState(null);
  const [courseIdList, setCourseIdList] = useState([]);
  // Initial data for input fields
  const initialData = ['lessonContent', 'location', 'date']

  // const [courseIdSelected, setCourseIdSelected] = useState('')

  // Fill the inputData with 1 element which is empty
  const [inputData, setInputData] = useState(Array(1).fill({}));

  const [courseOptions, setCourseOptions] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Fetch all courseId options
  //   fetchAllCourseId();
  // }, []);

  const getCourseList = async () => {
    try {
      const response = await api.get('Course/list');
      const res = response.data;
      let courseId = res.map(course => course.courseId);
      setCourseIdList(courseId);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (index, fieldName, value) => {
    const newInputData = [...inputData];
    newInputData[index][fieldName] = value;
    setInputData(newInputData);
  };

  // const fetchAllCourseId = async () => {
  //   try {
  //     const response = await api.get("Class");
  //     const classes = response.data;

  //     // Extract unique courseId values from the array of classes
  //     const uniqueCourseIds = [...new Set(classes.map((cls) => cls.courseId))];

  //     // Set course options for the combo box
  //     setCourseOptions(uniqueCourseIds);

  //   } catch (error) {
  //     console.error("Error fetching course IDs:", error);
  //   }
  // };

  const handleAddInput = () => {
    setInputData((prevInputData) => [
      ...prevInputData,
      initialData.reduce((acc, field) => {
        return acc;
      }, {}),
    ]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post("Lesson/createTheoryLesson?courseId=" + courseId, inputData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourseList();
    console.log(courseId);
  }, [])

  return (
    <div className="template-container">
      <div className="create-class-container">
        <div className="create-class-title">
          <h1 className="text-center text-uppercase">Tạo lớp học lý thuyết</h1>
        </div>
        <div className="create-class-form">
          {error && <h5 className="error-message mb-3 text-danger">{error}</h5>}
          <form onSubmit={handleSubmit}>
            {/* Course ID */}
            {
              courseId ? (
                <div className="form-group row">
                  <label htmlFor="courseId" className="col-sm-2 col-form-label">
                    Mã khóa học:{" "}
                  </label>
                  <div className="col-sm-10">
                    <select
                      className="form-control"
                      id="courseId"
                      placeholder="courseId"
                      name='courseId'
                      value={courseId}  // Ensure that it's not undefined
                      disabled
                    >
                      {/* <option value="" disabled className="tw-italic">Chọn khoá học</option> */}
                      {
                        <option value={courseId}>{courseId}</option>
                      }
                    </select>
                  </div>
                </div>
              ) : (
                null
              )
            }
            {
              inputData.map((value, idx) => (
                <div key={idx}>

                  {/* Content */}
                  <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Nội dung: {idx + 1}</label>
                    <div className="col-sm-10">
                      <input
                        className="form-control"
                        type="text"
                        name="lessonContent"
                        value={inputData[idx].lessonContent} // Convert to string
                        onChange={(e) =>
                          handleInputChange(idx, 'lessonContent', e.target.value)
                        }
                      >
                      </input>
                    </div>
                  </div>

                  {/* Locaion and Date*/}
                  {/* Location */}
                  <div className="form-group row tw-mt-3">
                    <label htmlFor="shift" className="col-sm-2 col-form-label">
                      Địa điểm:{" "}
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        name="shift"
                        value={inputData[idx].location}
                        onChange={(e) =>
                          handleInputChange(idx, 'location', e.target.value)
                        }
                      >
                      </input>
                    </div>

                    {/* Date */}
                    <label htmlFor="status" className="col-sm-2 col-form-label">
                      Ngày:{" "}
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="date"
                        className="form-control"
                        name="status"
                        value={inputData[idx].date} // Convert to string
                        onChange={(e) => handleInputChange(idx, 'date', e.target.value)}
                      >
                      </input>
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
              className="btn btn-primary w-20 justify-self-end"
              type="submit"
            >
              Tạo
            </button>
            <button
              className="btn btn-primary w-20 justify-self-end"
              type="button"
              onClick={() => console.log(inputData)}
            >
              Show info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTheoryLesson;



// ------------------------------ CreatePracticeLesson ------------------------------
export function CreatePracticeLesson() {
  const [error, setError] = useState(null);
  const [courseId, setCourseId] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [inputData, setInputData] = useState({
    courseId: "",
    isTheoryClass: true,
    mentorId: "",
    shift: "Sáng",
    status: true,
  });

  const getMentorTheory = async () => {
    try {
      const response = await api.get('Mentor/theory');
      const res = response.data;
      setMentor(res);
    } catch (error) {
      console.log(error);
    }
  }

  const [courseOptions, setCourseOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all courseId options
    fetchAllCourseId();
    getMentorTheory();
  }, []);

  const getCourseList = async () => {
    try {
      const response = await api.get('Course/list');
      const res = response.data;
      let courseId = res.map(course => course.courseId);
      setCourseId(courseId);
    } catch (error) {
      console.log(error);
    }
  }

  const createNewClass = async () => {
    try {
      // Validate input data
      if (!inputData.courseId) {
        setError("Vui lòng điền đầy đủ thông tin.");
        return;
      }
      await api.post("Class/add", inputData);
      toast.success("Tạo lớp học thành công");
      setError(null);
      navigate("/quan-ly-lop-hoc"); // Replace with the desired redirect path
    } catch (err) {
      if (err.response?.data?.error) {
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

  const fetchAllCourseId = async () => {
    try {
      const response = await api.get("Class");
      const classes = response.data;

      // Extract unique courseId values from the array of classes
      const uniqueCourseIds = [...new Set(classes.map((cls) => cls.courseId))];

      // Set course options for the combo box
      setCourseOptions(uniqueCourseIds);

      // Set the default courseId (optional)
      setInputData({
        ...inputData,
        courseId: (uniqueCourseIds[0] || "") as string,
      });
    } catch (error) {
      console.error("Error fetching course IDs:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createNewClass();
  };

  useEffect(() => {
    getCourseList();
  }, [])

  return (
    <div className="template-container">
      <div className="create-class-container">
        <div className="create-class-title">
          <h1 className="text-center text-uppercase">Tạo lớp học</h1>
        </div>
        <div className="create-class-form">
          {error && <h5 className="error-message mb-3 text-danger">{error}</h5>}
          <form onSubmit={handleSubmit}>
            {/* Course ID */}
            <div className="form-group row">
              <label htmlFor="courseId" className="col-sm-3 col-form-label">
                Mã khóa học:{" "}
              </label>
              <div className="col-sm-9">
                <select
                  className="form-control"
                  id="courseId"
                  placeholder="courseId"
                  name='courseId'
                  value={inputData.courseId || ''}  // Ensure that it's not undefined
                  onChange={e => setInputData({ ...inputData, courseId: e.target.value })}
                >
                  <option value="" disabled>Select a course</option>
                  {
                    courseId.map((course, index) => (
                      <option key={index} value={course}>{course}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            {/* MentorID */}
            <div className="form-group row">
              <label htmlFor="mentorId" className="col-sm-3 col-form-label">
                Mã giáo viên:{" "}
              </label>
              <div className="col-sm-9">
                <select
                  className="form-control"
                  id="mentorId"
                  placeholder="mentorId"
                  name='mentorId'
                  value={inputData.mentorId || ''}  // Ensure that it's not undefined
                  onChange={e => setInputData({ ...inputData, mentorId: e.target.value })}
                >
                  <option value="" disabled>Select a mentor</option>
                  {
                    mentor.map((mentor, index) => (
                      <option key={index} value={mentor.mentorId}>{mentor.fullName}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            {/* Is Theory Class */}
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Lý thuyết: </label>
              <div className="col-sm-9">
                <select
                  className="form-control"
                  name="isTheoryClass"
                  value={inputData.isTheoryClass ? "true" : "false"} // Convert to string
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      isTheoryClass: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">Có</option>
                  <option value="false">Không</option>
                </select>
              </div>
            </div>

            {/* Shift */}
            <div className="form-group row">
              <label htmlFor="shift" className="col-sm-3 col-form-label">
                Ca học:{" "}
              </label>
              <div className="col-sm-9">
                <select
                  className="form-control"
                  name="shift"
                  value={inputData.shift}
                  onChange={(e) =>
                    setInputData({ ...inputData, shift: e.target.value })
                  }
                >
                  <option value="Sáng">Sáng</option>
                  <option value="Chiều">Chiều</option>
                </select>
              </div>
            </div>

            {/* Status */}
            <div className="form-group row">
              <label htmlFor="status" className="col-sm-3 col-form-label">
                Trạng thái:{" "}
              </label>
              <div className="col-sm-9">
                <select
                  className="form-control"
                  name="status"
                  value={inputData.status.toString()} // Convert to string
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      status: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">Hoạt động</option>
                  <option value="false">Không hoạt động</option>
                </select>
              </div>
            </div>

            <button
              className="btn btn-primary w-20 justify-self-end"
              type="submit"
            >
              Tạo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
