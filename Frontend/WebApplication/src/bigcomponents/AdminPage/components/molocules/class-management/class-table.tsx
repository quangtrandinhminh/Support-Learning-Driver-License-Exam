import { useState, useEffect } from "react";
import "./class-table.scss";
import api from "../../../../../config/axios";
import { useNavigate } from "react-router-dom";


// ----------------- Class table -----------------
function ClassTable() {
  const [classs, setClasss] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordPage = 10;

  const getAllClasss = async () => {
    try {
      const response = await api.get("Class");
      const res = response.data;
      setClasss(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllClasss();
  }, []);

  // Pagination
  const overallIndex = (currentPage - 1) * recordPage;
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const filteredResult = classs.filter((classItem: any) => {
    if (classItem && classItem.courseId) {
      return classItem.courseId.toString().includes(searchValue);
    }
    return false; // If classId doesn't exist, exclude the item from the filtered result
  });

  const records = filteredResult.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredResult.length / recordPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <div className="class-table-container">
      <div className="class-table-title text-center text-uppercase">
        <h1>Danh sách lớp học</h1>
      </div>
      <div className="class-table-content">
        <form action="">
          <div className="d-grid mb-2">
            <div className="row">
              <div className="search-input col align-self-center">
                <input
                  type="text"
                  name="id"
                  placeholder="Mã khoá học"
                  onChange={handleSearch}
                  autoComplete="off"
                />
              </div>
              <div className="d-flex btnCreate col justify-content-end">
              </div>
            </div>
          </div>
          <table className="table table-hover table-striped" border={1}>
            <thead className="table-primary">
              <tr>
                <th scope='col'>#</th>
                <th scope="col">Mã lớp học</th>
                <th scope="col">Tên giáo viên</th>
                <th scope="col">Mã khóa học</th>
                <th scope="col">Học phần</th>
                <th scope="col">Ca học</th>
              </tr>
            </thead>
            <tbody className="table-group-divider align-middle">
              {records.length > 0 ? (
                records.map((classs, i) => (
                  <tr key={i}>
                    <td>{overallIndex + i + 1}</td>
                    <td>{classs.classId}</td>
                    <td>{classs.mentorName}</td>
                    <td>{classs.courseId}</td>
                    <td>{classs.isTheoryClass ? "Lý thuyết" : "Thực hành"}</td>
                    <td>{classs.shift}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>
                    <h1 className="text-center text-red-600 p-5">
                      Không tìm thấy thông tin. Vui lòng kiểm tra lại!
                    </h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <nav>
            <ul className="pagination">
              <li className="page-item">
                <button type="button" className="page-link" onClick={prePage}>
                  Prev
                </button>
              </li>
              {pageNumbers.map((number) => (
                <li
                  key={number}
                  className={`page-item ${currentPage === number ? "active" : ""
                    }`}
                >
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => changePage(number)}
                  >
                    {number}
                  </button>
                </li>
              ))}
              <li className="page-item">
                <button type="button" className="page-link" onClick={nextPage}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </form>
      </div>
    </div>
  );
}
export default ClassTable;


// ----------------- Theory class table -----------------
export function TheoryClassTable() {
  const [classs, setClasss] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordPage = 10;
  const navigate = useNavigate();

  const getAllClasss = async () => {
    try {
      const response = await api.get("Class");
      const res = response.data;
      const resValid = res.filter((classItem: any) => classItem.isTheoryClass);
      setClasss(resValid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllClasss();
  }, []);

  // Pagination
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;

  const filteredResult = classs.filter((classItem: any) => {
    if (classItem && classItem.courseId) {
      return classItem.courseId.toString().includes(searchValue);
    }
    return false; // If classId doesn't exist, exclude the item from the filtered result
  });

  const records = filteredResult.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredResult.length / recordPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  const handleCreateButton = async (courseId) => {
    localStorage.setItem('courseId', courseId);
    navigate('tao-lop-hoc');
  };

  return (
    <div className="template-container">
      <div className="class-table-container">
        <div className="class-table-title text-center text-uppercase">
          <h1>Danh sách lớp học lý thuyết</h1>
        </div>
        <div className="class-table-content">
          <form action="">
            <div className="d-grid mb-2">
              <div className="row">
                <div className="search-input col align-self-center">
                  <input
                    type="text"
                    name="id"
                    placeholder="Mã khoá học"
                    onChange={handleSearch}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <table className="table table-hover table-striped" border={1}>
              <thead className="table-primary">
                <tr>
                  <th scope="col">Mã lớp học</th>
                  <th scope="col">Tên giáo viên</th>
                  <th scope="col">Mã khóa học</th>
                  <th scope="col">Học phần</th>
                  <th scope="col" className="text-center">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider align-middle">
                {records.length > 0 ? (
                  records.map((classs, i) => (
                    <tr key={i}>
                      <td>{classs.classId}</td>
                      <td>{classs.mentorName}</td>
                      <td>{classs.courseId}</td>
                      <td>{classs.isTheoryClass ? "Lý thuyết" : "Thực hành"}</td>
                      <td className="button text-center">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => handleCreateButton(classs.courseId)}
                        >
                          Tạo lịch học
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8}>
                      <h1 className="text-center text-red-600 p-5">
                        Không tìm thấy thông tin. Vui lòng kiểm tra lại!
                      </h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <button type="button" className="page-link" onClick={prePage}>
                    Prev
                  </button>
                </li>
                {pageNumbers.map((number) => (
                  <li
                    key={number}
                    className={`page-item ${currentPage === number ? "active" : ""
                      }`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => changePage(number)}
                    >
                      {number}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button type="button" className="page-link" onClick={nextPage}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </form>
        </div>
      </div>
    </div>
  )
}


// ----------------- Practice Class Table -----------------
export function PracticeClassTable() {
  const navigate = useNavigate();
  const [classs, setClasss] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordPage = 10;

  // Get all class which is practice class
  const getAllClasss = async () => {
    try {
      const response = await api.get("Class");
      const res = response.data;
      const resValid = res.filter((classItem: any) => classItem.isTheoryClass === false);
      setClasss(resValid);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllClasss();
  }, []);

  const handleCreateButton = (classId, courseId) => {
    localStorage.setItem('classId', classId);
    localStorage.setItem('courseId', JSON.stringify(courseId));
    navigate('tao-lop-hoc');
  }

  // Pagination
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;

  const filteredResult = classs.filter((classItem: any) => {
    if (classItem && classItem.courseId) {
      return classItem.courseId.toString().includes(searchValue);
    }
    return false; // If classId doesn't exist, exclude the item from the filtered result
  });

  const records = filteredResult.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredResult.length / recordPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  return (
    <div className="template-container">
      <div className="class-table-container">
        <div className="class-table-title text-center text-uppercase">
          <h1>Danh sách lớp học thực hành</h1>
        </div>
        <div className="class-table-content">
          <form action="">
            <div className="d-grid mb-2">
              <div className="row">
                <div className="search-input col align-self-center">
                  <input
                    type="text"
                    name="id"
                    placeholder="Mã khoá học"
                    onChange={handleSearch}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <table className="table table-hover table-striped" border={1}>
              <thead className="table-primary">
                <tr>
                  <th scope="col">Mã lớp học</th>
                  <th scope="col">Tên giáo viên</th>
                  <th scope="col">Mã khóa học</th>
                  <th scope="col">Học phần</th>
                  <th scope="col">Thứ</th>
                  <th scope="col">Ca học</th>
                  <th scope="col" className="text-center">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="table-group-divider align-middle">
                {records.length > 0 ? (
                  records.map((classs, i) => (
                    <tr key={i}>
                      <td>{classs.classId}</td>
                      <td>{classs.mentorName}</td>
                      <td>{classs.courseId}</td>
                      <td>{classs.isTheoryClass ? "Lý thuyết" : "Thực hành"}</td>
                      <td>{classs.dayOfWeek}</td>
                      <td>{classs.shift}</td>
                      <td className="button text-center">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={() => handleCreateButton(classs.classId, classs.courseId)}
                        >
                          Tạo lịch học
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8}>
                      <h1 className="text-center text-red-600 p-5">
                        Không tìm thấy thông tin. Vui lòng kiểm tra lại!
                      </h1>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <button type="button" className="page-link" onClick={prePage}>
                    Prev
                  </button>
                </li>
                {pageNumbers.map((number) => (
                  <li
                    key={number}
                    className={`page-item ${currentPage === number ? "active" : ""
                      }`}
                  >
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => changePage(number)}
                    >
                      {number}
                    </button>
                  </li>
                ))}
                <li className="page-item">
                  <button type="button" className="page-link" onClick={nextPage}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </form>
        </div>
      </div>
    </div>
  )
}
