import React, { useEffect, useState } from "react";
import "./create-course-form.scss";
import api from "../../../../../config/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Modal } from 'react-bootstrap';


// ------------------ CreateCourseForm ------------------
function CreateCourseForm() {
  const [mentorName, setMentorName] = useState([]);
  const [error, setError] = useState(null);
  const [isDuplicateId, setIsDuplicateId] = useState(false);
  const [isDuplicateName, setIsDuplicateName] = useState(false);
  const [courseIdList, setCourseIdList] = useState([]);
  const [courseNameList, setCourseNameList] = useState([]);
  const [inputData, setInputData] = useState({
    courseId: "",
    name: "",
    startDate: "",
    endDate: "",
    limitStudent: 0,
    courseFee: 0,
    passTheoryLs: 0,
    passKm: 0,
    theoryTeacherId: "",
    status: false
  });

  const navigate = useNavigate();

  const getListMentorId = async () => {
    try {
      const response = await api.get("Mentor/theory");
      setMentorName(response.data);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
        return;
      }
    }
  }

  const handleContinue = () => {
    setError(false);
    setIsDuplicateId(false);
    setIsDuplicateName(false);
    if (courseIdList) {
      if (!(/^\d{3}B2$/).test(inputData.name)) {  //check name
        setError("Tên khoá học phải có định dạng XXXB2 với X là số.");
        return;
      } else if (inputData.endDate < inputData.startDate) {
        setError("Ngày bế giảng phải sau ngày khai giảng.");
        return;
      } else if (courseIdList.includes(inputData.courseId)) {
        setIsDuplicateId(true);
        setError("Mã khoá học đã tồn tại.");
        return;
      } else if (courseNameList.includes(inputData.name)) {
        setIsDuplicateName(true);
        setError("Tên khoá học đã tồn tại.");
        return;
      } else if (inputData.passKm > 1000) {
        setError("Quãng đường cần thiết phải nhỏ hơn hoặc bằng 100km.");
        return;
      } else if (inputData.passTheoryLs > 100) {
        setError("Số giờ học lý thuyết phải nhỏ hơn hoặc bằng 100%.");
        return;
      } else {
        localStorage.setItem("course", JSON.stringify(inputData));
        navigate("/quan-ly-khoa-hoc/chi-tiet");
      }
    }
  }

  const getCourseIdList = async () => {
    try {
      const response = await api.get("Course/list");
      const res = response.data;
      setCourseIdList(res.map((course) => course.courseId));
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
        return;
      }
    }
  }

  const getCourseNameList = async () => {
    try {
      const response = await api.get("Course/list");
      const res = response.data;
      setCourseNameList(res.map((course) => course.name));
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error); https://drive.google.com/drive/folders/1sYWJ5-R5I1asuvtaBxfwte-sDdkDCEDf?usp=sharing
        return;
      }
    }
  }

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

  useEffect(() => {
    getListMentorId();
    getCourseIdList();
    getCourseNameList();
  }, []);

  // useEffect(() => {
  //   setInputData(prevInputData => ({
  //     ...prevInputData,
  //     theoryTeacherId: mentorName[0]?.mentorId
  //   }))
  // }, [mentorName]);

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
            <label htmlFor="theoryTeacherId" className="col-sm-3 col-form-label">
              Giáo viên phụ trách:{" "}
            </label>
            <div className="col-sm-9">
              <select
                className="form-control"
                id="theoryTeacherId"
                placeholder="theoryTeacherId"
                name="theoryTeacherId"
                value={inputData.theoryTeacherId}
                required
                onChange={(e) =>
                  setInputData({ ...inputData, theoryTeacherId: e.target.value })}
              >
                <option value="" disabled className="tw-italic">Chọn giáo viên</option>
                {
                  mentorName.map((mentor) => (
                    <option value={mentor.mentorId}
                      key={mentor.mentorId}>{mentor.fullName}</option>
                  ))
                }
              </select>
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
            type="button"
            onClick={() => handleContinue()}
          >
            Tiếp tục
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCourseForm;


// ------------------ CreateCourseDetail ------------------
export function CreateCourseDetail() {
  const course = JSON.parse(localStorage.getItem('course') || '{}');
  const navigate = useNavigate();
  const [courseContent, setCourseContent] = useState([]);

  const [error, setError] = useState(null);
  const initialData = ['courseContent', 'courseTimeStart', 'courseTimeEnd', 'courseId'];
  const [inputData, setInputData] = useState(Array(1).fill({}));
  const [courseContentInput, setCourseContenInput] = useState({
    courseContent1: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const handleAddCourseContent = async () => {
    try {
      await api.post("CourseContent/add", courseContentInput);
      handleClose();
      toast.success('Thêm nội dung thành công');
      await getCourseContent();
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
        return;
      }
    }
  }

  const getCourseContent = async () => {
    try {
      const response = await api.get("CourseContent");
      const res = response.data;
      setCourseContent(res);
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
        acc[field] = field === 'courseId' ? course.courseId : '';
        return acc;
      }, {}),
    ]);
  };

  useEffect(() => {
    getCourseContent();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      // Prepare data to send to the server
      // for (let i = 0; i < inputData.length; i++) {
      //   if (inputData[i].courseTimeStart > inputData[i].courseTimeEnd) {
      //     setError(`Nội dung ${i + 1} có ngày không hợp lệ .`);
      //     return;
      //   } else if (i > 0) {
      //     if ((inputData[i].courseTimeStart < inputData[i - 1].courseTimeEnd && inputData[i].courseTimeStart > inputData[i - 1].courseTimeStart) ||
      //       (inputData[i].courseTimeEnd < inputData[i - 1].courseTimeEnd && inputData[i].courseTimeEnd > inputData[i - 1].courseTimeStart)) {
      //       setError(`Nội dung ${i + 1} có ngày không hợp lệ .`);
      //       return;
      //     }
      //   }
      // }
      if (course) {
        for (let i = 0; i < inputData.length; i++) {
          // for day
          const startDateParts = inputData[i].courseTimeStart.split("-");
          const endDateParts = inputData[i].courseTimeEnd.split("-");
          const startDate = parseInt(startDateParts[2]);
          const endDate = parseInt(endDateParts[2]);

          // for month 
          const startMonth = parseInt(startDateParts[1]);
          const endMonth = parseInt(endDateParts[1]);

          // ngày bắt đầu lớn hơn ngày kết thúc
          if (inputData[i].courseTimeStart > inputData[i].courseTimeEnd) {
            // console.log("1");
            setError(`Nội dung ${i + 1} có ngày bắt đầu lớn hơn ngày kết thúc.`);
            return;

            // ngày bắt đầu bé hơn ngày khai giảng
          } else if (inputData[i].courseTimeStart < course.startDate) {
            // console.log("2");
            setError(`Nội dung ${i + 1} có ngày bắt đầu bé hơn ngày khai giảng.`);
            return;

            // ngày kết thúc lớn hơn ngày bế giảng
          } else if (inputData[i].courseTimeEnd > course.endDate) {
            // console.log("3");
            setError(`Nội dung ${i + 1} có ngày kết thúc lớn hơn ngày bế giảng.`);
            return;

            // ngày kết thúc phải cách ngày bắt đầu là 7 ngày
          } else if (endMonth - startMonth < 1) {
            if (endDate - startDate < 7) {
              setError(`Nội dung ${i + 1} có ngày kết thúc phải cách ngày bắt đầu là 7 ngày.`);
              return;
            }
          }

          for (let j = i + 1; j < inputData.length; j++) {

            // so với các content trước đó
            // so nội dung bị trùng
            if (inputData[i].courseContent === inputData[j].courseContent) {
              // console.log("5");
              setError(`Nội dung ${i + 1} và nội dung ${j + 1} bị trùng.`);
              return;

              // so sánh trùng ngày bắt đầu
            } else if (inputData[i].courseTimeStart === inputData[j].courseTimeStart) {
              if ((inputData[i].courseContent === "Thực Hành Trên Đường" && inputData[j].courseContent === "Thực Hành Trên Xe Tự Động")) {
                // console.log("6");
                continue;
              } else {
                // console.log("5");
                setError(`Nội dung ${i + 1} và nội dung ${j + 1} có ngày bắt đầu trùng nhau.`);
                return;
              }

              // ngày bắt đầu của j phải lớn hơn ngày kết thúc của i
            } else if (inputData[j].courseTimeStart <= inputData[i].courseTimeEnd) {
              // console.log("7");
              setError(`Nội dung ${j + 1} có ngày bắt đầu bé hơn hoặc bằng ngày kết thúc của nội dung ${i + 1}.`);
              return;

              // ngày bắt đầu của j phải lớn hơn ngày kết thúc của i 7 ngày
            }
          }
        }
      }

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
        toast.success('Tạo khoá học thành công');
        navigate('/quan-ly-khoa-hoc/chua-mo');
      }
      console.log(inputData);

      // For example, if your response contains additional information, you can use it as needed.
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
        return;
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

  return (
    <div className="template-container">
      <div className="create-course-container">
        <div className="create-course-title">
          <h1 className="text-center text-uppercase">Chi tiết khoá học</h1>
        </div>
        <div className="create-course-form">
          {
            course ? (
              <h4 className="tw-text-realRed tw-italic tw-mb-10 ">Thời gian khoá học: {formatDate(course.startDate)} - {formatDate(course.endDate)}</h4>
            ) : (
              null
            )}
          {error && <h5 className="error-message mb-3 tw-text-realRed">{error}</h5>}
          <form onSubmit={handleSubmit}>
            <div className="mb-2 tw-justify-self-end">
              <Button className="btn btn-primary"
                onClick={() => handleShow()}>Thêm chi tiết</Button>
            </div>
            {inputData.map((data, index) => (
              <div key={index}>
                <div className="form-group row">
                  <label htmlFor={`courseContent${index + 1}`} className="col-sm-2 col-form-label">
                    Nội dung {index + 1}:
                  </label>
                  <div className="col-sm-10">
                    {/* <input
                      type="text"
                      className="form-control"
                      id={`courseContent${index + 1}`}
                      placeholder={`nội dung số ${index + 1}`}
                      name={`courseContent${index + 1}`}
                      value={inputData[index].courseContent}
                      required
                      onChange={(e) => handleChange(index, 'courseContent', e.target.value)}
                    /> */}
                    <select
                      className="form-control"
                      id="courseContent"
                      placeholder="theoryTeacherId"
                      name="courseContent"
                      value={inputData[index].courseContent}
                      required
                      onChange={(e) => handleChange(index, 'courseContent', e.target.value)
                      }
                    >
                      <option value="" disabled className="tw-italic">Chọn nội dung khoá học</option>
                      {
                        courseContent.map((content) => (
                          <option value={content.courseContent1}
                            key={content.courseContent1}>{content.courseContent1}</option>
                        ))
                      }
                    </select>
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
            {/* <button
              className="btn btn-primary tw-mb-5 tw-justify-self-center tw-w-1/4"
              type="button"
              onClick={e => showTest()}
            >
              Show test
            </button> */}
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
                onChange={(e) => setCourseContenInput({ ...courseContentInput, courseContent1: e.target.value })} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button className="btn btn-primary" onClick={() => { handleAddCourseContent(); }}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
