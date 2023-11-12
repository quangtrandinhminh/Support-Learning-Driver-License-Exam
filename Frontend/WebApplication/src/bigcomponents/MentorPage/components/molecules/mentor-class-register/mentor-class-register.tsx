import './mentor-class-register.scss'

function MentorClassRegister() {
    return (
        <>
            <div className="class-register-title">
                <h1>Danh sách các khóa học</h1>
            </div>
            <div className="class-register-container">
                <form action="">
                    <table>
                        <thead>
                            <tr>
                                <td>STT</td>
                                <td>Mã khóa học</td>
                                <td>Thời gian</td>
                                <td>Trạng thái</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>123456</td>
                                <td>20/10/2021</td>
                                <td>Đã đăng kí</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>123456</td>
                                <td>20/10/2021</td>
                                <td><a href='danh-sach-khoa-hoc-giao-vien/dang-ki-lich-day'>Đăng kí</a></td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>123456</td>
                                <td>20/10/2021</td>
                                <td><a href='danh-sach-khoa-hoc-giao-vien/dang-ki-lich-day'>Đăng kí</a></td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>123456</td>
                                <td>20/10/2021</td>
                                <td><a href='danh-sach-khoa-hoc-giao-vien/dang-ki-lich-day'>Đăng kí</a></td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>123456</td>
                                <td>20/10/2021</td>
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