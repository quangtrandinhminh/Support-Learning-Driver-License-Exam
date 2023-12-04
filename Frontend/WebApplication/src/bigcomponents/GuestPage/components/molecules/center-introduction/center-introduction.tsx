import './center-introduction.scss'
import CenterImg from '../../../../../../assets/imgs/about/trungtam-img.jpg'
import { Button, Modal } from 'react-bootstrap'
import { useState } from 'react';

function AboutCenter() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='introduction-container' id='center-introduction'>
                <div className='notice-information'>
                    <a className='clickable-text' href='/' onClick={(e) => { e.preventDefault(); handleShow(); }}>Chú ý</a>
                </div>
                <div className='relative img-container'>
                    <img src={CenterImg} alt="trungtam-img" className="center-img" />
                    <h2 className='introduction-title'>Trung tâm dạy lái xe B2 FDriving</h2>
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                keyboard={true}
                backdrop='static'
                backdropClassName='backdrop'
                centered
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1 className='tw-text-center'>Chú ý</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='text-content'>
                        <h4 className='tw-leading-loose tw-p-2 tw-text-justify'>Hiện tại dữ liệu của web vẫn chưa hoàn thiện 100% và nghiệp vụ mà đội ngũ phát triển hướng tới vẫn chưa đúng
                            với nghiệp vụ thực tế. Vì vậy, để tránh những rắc rối không đáng có, chúng tôi khuyến khích bạn hãy liên hệ với
                            một trong các thành viên của đội ngũ phát triển để được hỗ trợ tốt nhất. Xin cảm ơn!
                        </h4>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AboutCenter