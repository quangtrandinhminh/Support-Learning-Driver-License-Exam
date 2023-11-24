import './center-introduction.scss'
import CenterImg from '../../../../../../assets/imgs/about/trungtam-img.jpg'

function AboutCenter() {
    return (
        <>
            <div className='introduction-container' id='center-introduction'>
                <div className='relative img-container'>
                    <img src={CenterImg} alt="trungtam-img" className="center-img" />
                    <h2>Trung tâm dạy lái xe B2 FDriving</h2>
                </div>
            </div>
        </>
    )
}

export default AboutCenter