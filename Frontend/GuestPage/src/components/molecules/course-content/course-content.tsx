import './course-content.scss'

function CourseContent() {
    return (
        <div className='course-content-container'>
            <div className="course-theory">
                <h1 className="course-theory-title">A/ Đào tạo lí thuyết</h1>
                <p className="course-theory-content">
                    Học trực tiếp tại các cơ sở của trường hoặc học online tại nhà. Chương trình lý thuyết theo quy chế mới gồm 4 buổi – mỗi tuần học 1 buổi, hoàn tất chương trình lý thuyết trong vòng 4 tuần. Tuy nhiên nhà trường sẽ đào tạo lý thuyết không giới hạn nên các bạn học viên nếu chưa nắm vững sẽ được học đi học lại hoàn toàn miễn phí đến khi nào cảm thấy tự tin. Mặt khác, nếu bạn học viên nào bận quá không đến lớp được sẽ được giáo viên hướng dẫn phương pháp tự học tại nhà.
                </p>
            </div>
            <div className="course-practice">
                <h1 className="course-practice-title">B/ Đào tạo thực hành</h1>
                <h2 className="course-practice-subtitle">Chương trình học tổng cộng 40 giờ tập lái xe. Bao gồm các hạng mục:</h2>
                <li>
                    <strong>+ 02 buổi học đầu tiên (khoảng 6h): </strong>Học viên học lái xe cơ bản tại sân tập để biết cách điều khiển xe (đề máy, vào ga, đạp phanh, vào số tiến, lùi, rẽ trái rẽ phải…) Đây là bước rất quan trọng tạo tiền đề cho học viên bước qua các bài tập nâng cao sau này. Một số trường thiếu đạo đức vì để giảm chi phí nên chỉ dạy khoảng 1h-2h tập cơ bản dẫn đến việc học viên rất hoang mang & thiếu tự tin trong suốt quá trình tập lái và thi cử sau này. Mặt khác việc đào tạo kĩ năng cơ bản qua loa sơ sài gây nguy hiểm cho học viên rất nhiều khi tập lái đường trường, trên thực tế đã có không ít tai nạn thương tâm xảy ra trong quá trình đào tạo trên địa bàn thành phố. Các bạn học viên cần phải chú ý thật kĩ vấn đề này để đảm bảo an toàn cho bản thân.
                </li>
                <li>
                    <strong>+ 02 buổi tập lái tiếp theo (khoảng 6h): </strong>Học viên tập trên xe Cabin mô phỏng theo các tình huống xảy ra trên đường (mô phỏng thực tế ảo) theo quy chế mới của Bộ GTVT. Hiện khoá khai giảng này chưa áp dụng phần thi Cabin vào thi sát hạch nhưng bắt buộc phải học thì mới đủ điều kiện để được thi.
                </li>
                <li>
                    <strong>+ 03 buổi học tiếp theo (khoảng 10h): </strong>Các bạn được học 13 bài sa hình tại các sân tập của trường để luyện thi, phần này cực kì quan trọng vì 90% khả năng thi đậu sát hạch cuối khoá của Sở GTVT sẽ phụ thuộc vào phần thi sa hình =&gt; Học viên lưu ý phần này nhé.
                </li>
                <li>
                    <strong>+ 06 buổi tập cuối cùng (khoảng 18h): </strong>Học viên chạy thực tế quãng đường hỗn hợp (đường trường) sao cho đủ kinh nghiệm lái xe 710km theo quy chế mới – chạy đường trường có camera ghi hình và truyền tải về Sở GTVT để kiểm tra. Trong phần đào tạo này các bạn học viên sẽ được truyền tải rất nhiều kĩ năng xử lý khi điều khiển xe trên đường như:
                    <div className='driving-skills'>
                        <li className=''>Kỹ năng lái xe ban đêm</li>
                        <li className=''>Kĩ năng lái xe đường đèo, dốc...</li>
                        <li className=''>Kĩ năng xử lý tình huống nguy cấp</li>
                        <li className=''>Kĩ năng vượt xe an toàn</li>
                        <li className=''>Kĩ năng lái xe trời mưa, đường trơn trượt</li>
                        <li className=''>Kĩ năng lái xe đường dài...</li>
                    </div>
                </li>
            </div>
        </div>
    )
}

export default CourseContent