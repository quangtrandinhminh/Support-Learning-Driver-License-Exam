import React, { useEffect, useState } from "react";
import "./class-create-form.scss"; // You can create the styles accordingly
import api from "../../../../../config/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { Button, Modal } from "react-bootstrap";


// ------------------------------ CreateTheoryLesson ------------------------------
function CreateTheoryLesson() {
  const courseId = localStorage.getItem('courseId');
  const [error, setError] = useState(null);
  const [courseIdList, setCourseIdList] = useState([]);
  const [firstCourseDetail, setFirstCourseDetail] = useState(null);
  const [curriculum, setCurriculum] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [curriculumInput, setCurriculumInput] = useState({
    content: "",
    isTheory: true
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const initialData = ['lessonContent', 'location', 'date']

  // const [courseIdSelected, setCourseIdSelected] = useState('')

  // Fill the inputData with 1 element which is empty
  const [inputData, setInputData] = useState(Array(1).fill({}));

  // const [courseOptions, setCourseOptions] = useState([]);
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

  const getCurriculum = async () => {
    try {
      const response = await api.get('Curriculum/list');
      const res = response.data;
      setCurriculum(res);
    } catch (error) {
      console.log(error);
    }
  }

  const getFirstCourseDetails = async () => {
    try {
      const response = await api.get('CourseDetail/' + courseId);
      const res = response.data[0];
      setFirstCourseDetail(res);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInputChange = (index, fieldName, value) => {
    const newInputData = [...inputData];
    newInputData[index][fieldName] = value;
    setInputData(newInputData);
  };

  const handleAddCurriculum = async () => {
    try {
      await api.post("Curriculum/add", curriculumInput);
      handleClose();
      toast.success('Thêm nội dung thành công');
      await getCurriculum();
      console.log(curriculumInput);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
        return;
      }
    }
  }

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
      navigate("/quan-ly-lich-hoc/lop-ly-thuyet");
      toast.success("Tạo lịch học lý thuyết thành công!");
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
        setShowAlert(true);
      }
    }
  };

  const formatDate = (dbDate) => {
    const date = new Date(dbDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Sweet Alert should have returned something
  const showSweetAlert = (error) => {
    if (showAlert) {
      Swal.fire({
        title: "Lỗi",
        text: error,
        icon: "error",
        confirmButtonText: "Đóng",
        animation: true,

        allowEscapeKey: true,
        // another type of animation not tada
      });

      // Reset showAlert to false after showing the alert
      setShowAlert(false);

      // Return a placeholder element (e.g., null) when not showing the alert
      return null;
    }

    return null; // or another placeholder element if needed
  };

  useEffect(() => {
    getCourseList();
    getFirstCourseDetails();
    getCurriculum();
  }, [])

  return (
    <div className="template-container">
      <div className="create-class-container">
        <div className="create-class-title">
          <h1 className="text-center text-uppercase">Tạo lịch học lý thuyết</h1>
        </div>
        <div className="create-class-form">
          {
            firstCourseDetail ? (
              <div className="tw-mb-5">
                <h5 className="tw-italic tw-text-realRed">Đào tạo lý thuyết từ ngày: {formatDate(firstCourseDetail.courseTimeStart)} - {formatDate(firstCourseDetail.courseTimeEnd)}</h5>
              </div>
            ) : (
              null
            )
          }
          {error && showSweetAlert(error)}
          <form onSubmit={handleSubmit}>
            {/* Course ID */}
            {
              courseId ? (
                <>
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
                  <div className="mb-2 tw-justify-self-end">
                    <Button className="btn btn-primary"
                      onClick={() => handleShow()}>Thêm chi tiết</Button>
                  </div>
                </>
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
                      <select
                        className="form-control"
                        id="lessonContent"
                        placeholder="lessonContent"
                        name="lessonContent"
                        value={inputData[idx].lessonContent || ""}
                        required
                        onChange={(e) => handleInputChange(idx, 'lessonContent', e.target.value)}
                      >
                        <option value="" disabled className="tw-italic">Chọn nội dung</option>
                        {
                          curriculum.map((curriculum) => (
                            <option value={curriculum.content}
                              key={curriculum.content}>{curriculum.content}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  {/* Locaion and Date*/}
                  {/* Location */}
                  <div className="form-group row tw-mt-3">
                    <label htmlFor="location" className="col-sm-2 col-form-label">
                      Địa điểm:{" "}
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        name="location"
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
              onClick={() => console.log(inputData)}
              type="button"
            >
              Show info
            </button>
          </form>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        backdropClassName='backdrop'
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 className='tw-text-center'>Thêm chi tiết</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="courseContentAdd row">
            <label htmlFor="courseContent" className="col-sm-2 col-form-label">
              Nội dung:
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control"
                onChange={(e) => setCurriculumInput({ ...curriculumInput, content: e.target.value })} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button className="btn btn-primary" onClick={() => { handleAddCurriculum(); }}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateTheoryLesson;



// ------------------------------ CreatePracticeLesson ------------------------------
export function CreatePracticeLesson() {
  const classId = localStorage.getItem('classId');
  const courseId = JSON.parse(localStorage.getItem('courseId'));
  const [error, setError] = useState(null);
  const [courseDetails, setCourseDetails] = useState([]);
  const initialData = ['courseDetailsId', 'location', 'date']
  const [inputData, setInputData] = useState(Array(1).fill({}));
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [dateByClassList, setDateByClassList] = useState([]);

  const handleInputChange = (index, fieldName, value) => {
    const newInputData = [...inputData];
    newInputData[index][fieldName] = value;
    setInputData(newInputData);
  };

  const formatDate = (dbDate) => {
    const date = new Date(dbDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDateByClass = async () => {
    try {
      const response = await api.get('Class/' + classId + '/dates');
      const res = response.data;
      setDateByClassList(res);
    } catch (error) {
      console.log(error);
    }
  }

  const getCourseDetails = async () => {
    try {
      const response = await api.get('CourseDetail/' + courseId);
      const res = response.data;
      const filter = res.filter((course) => !course.courseContent.includes('Lý Thuyết'));
      console.log(filter);
      setCourseDetails(filter);
    } catch (error) {
      console.log(error);
    }
  }

  const showSweetAlert = (error) => {
    if (showAlert) {
      Swal.fire({
        title: "Lỗi",
        text: error,
        icon: "error",
        confirmButtonText: "Đóng",
        animation: true,

        allowEscapeKey: true,
        // another type of animation not tada
      });

      // Reset showAlert to false after showing the alert
      setShowAlert(false);

      // Return a placeholder element (e.g., null) when not showing the alert
      return null;
    }
    return null; // or another placeholder element if needed
  };

  // adding more input field
  const handleAddInput = () => {
    setInputData((prevInputData) => [
      ...prevInputData,
      initialData.reduce((acc, field) => {
        return acc;
      }, {}),
    ]);
  };

  useEffect(() => {
    // Fetch all courseId options
    getCourseDetails();
    getDateByClass();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await api.post("Lesson/createPracticeLesson?classId=" + classId, inputData);
      toast.success("Tạo lịch học thực hành thành công!");
      navigate("/quan-ly-lich-hoc/lop-thuc-hanh");
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
        setShowAlert(true);
      }
    }
  };

  return (
    <div className="template-container">
      <div className="create-class-container">
        <div className="create-class-title">
          <h1 className="text-center text-uppercase">Tạo lịch học thực hành</h1>
        </div>
        <div className="create-class-form">
          {error && showSweetAlert(error)}
          <form onSubmit={handleSubmit}>
            <div className="tw-text-realRed tw-italic">
              {
                courseDetails.length > 0 ? (
                  courseDetails.map((content, i) => (
                    <div key={i} className="">
                      <li className="tw-text-lg">{content.courseContent}: {formatDate(content.courseTimeStart)} - {formatDate(content.courseTimeEnd)}</li>
                    </div>
                  ))
                ) : (
                  <h1>bitch</h1>
                )
              }
            </div>
            {/* Class ID */}
            {
              classId ? (
                <>
                  <div className="form-group row">
                    <label htmlFor="classId" className="col-sm-2 col-form-label">
                      Mã lớp học:{" "}
                    </label>
                    <div className="col-sm-10">
                      <select
                        className="form-control"
                        id="classId"
                        placeholder="classId"
                        name='classId'
                        value={classId}  // Ensure that it's not undefined
                        disabled
                      >
                        {
                          <option value={classId}>{classId}</option>
                        }
                      </select>
                    </div>
                  </div>
                  {/* <div className="mb-2 tw-justify-self-end">
                    <Button className="btn btn-primary"
                      onClick={() => handleShow()}>Thêm chi tiết</Button>
                  </div> */}
                </>
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
                      <select
                        className="form-control"
                        id="courseDetailsId"
                        placeholder="courseDetailsId"
                        name="courseDetailsId"
                        value={inputData[idx].courseDetailsId || ""}
                        required
                        onChange={(e) => handleInputChange(idx, 'courseDetailsId', e.target.value)}
                      >
                        <option value="" disabled className="tw-italic">Chọn nội dung</option>
                        {
                          courseDetails.map((details) => (
                            <option value={details.courseDetailsId}
                              key={details.courseDetailsId}>{details.courseContent}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  {/* Locaion and Date*/}
                  {/* Location */}
                  <div className="form-group row tw-mt-3">
                    <label htmlFor="location" className="col-sm-2 col-form-label">
                      Địa điểm:{" "}
                    </label>
                    <div className="col-sm-4">
                      <input
                        type="text"
                        className="form-control"
                        name="location"
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
                      <select
                        className="form-control"
                        id="date"
                        placeholder="date"
                        name="date"
                        value={inputData[idx].date || ""}
                        required
                        onChange={(e) => handleInputChange(idx, 'date', e.target.value)}
                      >
                        <option value="" disabled className="tw-italic">Chọn ngày</option>
                        {
                          dateByClassList.map((date) => (
                            <option value={date}
                              key={date}>{formatDate(date)}</option>
                          ))
                        }
                      </select>
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
            {/* <button
              className="btn btn-primary w-20 justify-self-end"
              onClick={() => console.log(inputData)}
              type="button"
            >
              Show info
            </button> */}
          </form>
        </div>
      </div>
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        backdropClassName='backdrop'
        centered
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h1 className='tw-text-center'>Thêm chi tiết</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="courseContentAdd row">
            <label htmlFor="courseContent" className="col-sm-2 col-form-label">
              Nội dung:
            </label>
            <div className="col-sm-10">
              <input type="text" className="form-control"
                onChange={(e) => setCourseContenInput({ ...courseContentInput, courseContent1: e.target.value })} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal> */}
    </div>
  );
}
