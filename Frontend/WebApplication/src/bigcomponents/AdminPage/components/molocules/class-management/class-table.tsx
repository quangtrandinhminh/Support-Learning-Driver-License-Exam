import { useState, useEffect } from "react";
import "./class-table.scss";
import api from "../../../../../config/axios";
import { Link } from "react-router-dom";

function ClassTable() {
  const [classs, setClasss] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordPage = 6;

  const getAllClasss = async () => {
    try {
      const response = await api.get("https://localhost:7066/api/Class");
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
  const lastIndex = currentPage * recordPage;
  const firstIndex = lastIndex - recordPage;
  const filteredClasss = classs.filter((classItem: any) => {
    if (classItem && classItem.courseId) {
      return classItem.courseId.toString().includes(searchValue);
    }
    return false; // If classId doesn't exist, exclude the item from the filtered result
  });

  const records = filteredClasss.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredClasss.length / recordPage);
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

  function handleAdd(isTheoryClass: any): void {
    // // Logic xử lý khi nhấn nút "Add"
    // console.log("Add button clicked for isTheoryClass:", isTheoryClass);
    // // Thêm logic tương ứng với việc thêm vào danh sách
  }

  return (
    <div className="mentor-table-container">
      <div className="mentor-table-title text-center text-uppercase">
        <h1>Danh sách lớp học</h1>
      </div>
      <div className="mentor-table-content">
        <form action="">
          <div className="d-grid mb-2">
            <div className="row">
              <div className="search-input col align-self-center">
                <input
                  type="text"
                  name="id"
                  placeholder="Họ và tên"
                  onChange={handleSearch}
                  autoComplete="off"
                />
              </div>
              <div className="d-flex btnCreate col justify-content-end">
                <Link to="tao-lop-hoc" className="btn btn-success">
                  + Add
                </Link>
              </div>
            </div>
          </div>
          <table className="table table-hover table-striped" border={1}>
            <thead className="table-primary">
              <tr>
                <th scope="col">Mã lớp học</th>
                <th scope="col">Mã giáo viên</th>
                <th scope="col">Mã khóa học</th>
                <th scope="col">Học phần</th>
                <th scope="col">Số ngày học</th>
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
                    <td>{classs.mentorId}</td>
                    <td>{classs.courseId}</td>
                    <td>{classs.isTheoryClass ? "Lý thuyết" : "Thực hành"}</td>
                    <td>{classs.dayOfWeek}</td>
                    <td>{classs.shift}</td>
                    <td className="button text-center">
                      {classs.isTheoryClass && (
                        <button className="btn btn-success" type="button" onClick={() => handleAdd(classs.isTheoryClass)}>
                          Add
                        </button>
                      )}
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
                  className={`page-item ${
                    currentPage === number ? "active" : ""
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
