import './mentor-class-register.scss'

function MentorClassRegister() {
    return (
        <>
            <div className="class-register-title">
                <h1>Danh sách các khóa học B2</h1>
            </div>
            <div className="class-register-container">
                <form action="">
                    <table className='class-register-table'>
                        <thead className='class-register-table-header'>
                            <tr>
                                <th>STT</th>
                                <th>Mã khóa học</th>
                                <th>Tên khóa học</th>
                                <th>Thời gian</th>
                                <th>Phân loại</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody className='class-table-body'>
                            <tr>
                                <td>1</td>
                                <td>0101B2</td>
                                <td>236B2</td>
                                <td>2023-01-06 - 2024-04-06</td>
                                <td>Thực hành</td>
                                <td>Đã đăng kí</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>1101B2</td>
                                <td>230B2</td>
                                <td>2023-11-06 - 2024-02-06</td>
                                <td>Thực hành</td>
                                <td><a href='danh-sach-khoa-hoc-giao-vien/dang-ki-lich-day'>Đăng kí</a></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>1201B2</td>
                                <td>233B2</td>
                                <td>2023-12-06 - 2024-03-06</td>
                                <td>Thực hành</td>
                                <td><a href='danh-sach-khoa-hoc-giao-vien/dang-ki-lich-day'>Đăng kí</a></td>
                            </tr>
                        </tbody>
                    </table>
                </form>

            </div>
        </>
    )
}

export default MentorClassRegister