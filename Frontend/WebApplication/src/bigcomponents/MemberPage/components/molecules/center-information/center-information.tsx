import './center-information.scss';
import CenterInfImg from '../../../../../../assets/imgs/information/illustrate-img.jpeg'

function Information() {

  return (
    <>
      <div className='information-container'>
        <div className='box-container'>
          <img src={CenterInfImg} alt="" />
          <div className="center-information-content">
            <h1>Thông tin trung tâm</h1>
            <p>Trung tâm đào tạo lái xe FDRIVING là một trong những trung tâm đào tạo - hỗ trợ thi bằng lái xe hơi B2 uy tín nhất tại Hồ Chí Minh. Trung tâm cam kết khi các học viên theo học đều am hiểu luật GTĐB, tham giao giao thông an toàn sau khi khóa học kết thúc. Bên cạnh đó, từng học viên đều nhận được sự quan tâm, săn sóc tận tâm từ trung tâm. Khi hoàn thành khóa học, học viên không những am hiểu rõ về luật GTĐB, tham gia giao thông an toàn mà còn cảm thấy hài lòng về sự tận tâm của trung tâm. Các học viên đã hoàn thành khóa học đều có xu hướng giới thiệu bạn bè, người thân, người quen về trung tâm.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Information
