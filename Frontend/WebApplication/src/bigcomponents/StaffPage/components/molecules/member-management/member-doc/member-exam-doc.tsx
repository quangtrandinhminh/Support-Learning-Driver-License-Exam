import { Backdrop, CircularProgress } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import api from '../../../../../../config/axios';
import ComponentToPrint, { useReactToPrint } from 'react-to-print';
import './member-exam-doc.scss'

function MemberDoc() {
    const { memberId } = useParams();
    const [member, setMember] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const componentRef = useRef();
    const getMemberById = async () => {
        try {
            const response = await api.get(`Member?memberId=${memberId}`);
            setMember(response.data);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const formatDate = (dbDate) => {
        const date = new Date(dbDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Hồ sơ thi',
        onAfterPrint: () => window.alert('Đã in xong'),
        copyStyles: true,
    })

    useEffect(() => {
        getMemberById();
    }, [])

    return (
        <div className='member-doc-container'>
            <div className='member-doc-title'>
                <h1>Hồ sơ thi</h1>
            </div>
            {
                member != null ? (
                    !isLoading ? (
                        <div className='member-doc-form'>
                            <table ref={componentRef}>
                                <div className="first-part">
                                    <h2 className='text-center'>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h2>
                                    <h3 className='text-center'>Độc lập - Tự do - Hạnh phúc</h3>
                                    <div className='cross-line'></div>
                                </div>
                                <div className='second-part'>
                                    <li className='member-img-container'>
                                        <label htmlFor="member-img">ảnh thẻ</label>
                                    </li>
                                    <div className='exam-demand-title'>
                                        <h2>ĐƠN ĐỀ NGHỊ HỌC, SÁT HẠCH ĐỂ CẤP GIẤY PHÉP LÁI XE</h2>
                                        <p>Kính gửi: SỞ GIAO THÔNG VẬN TẢI THÀNH PHỐ HỒ CHÍ MINH</p>
                                    </div>
                                </div>
                                <li className='line-1'>
                                    <div className='name-container'>
                                        <label htmlFor="name">Tôi là:</label>
                                        <span> {member.fullName}</span>
                                    </div>
                                    <div className="nationality-container">
                                        <label htmlFor="nationality">Quốc tịch:</label>
                                        <span> {member.nationality}</span></div>
                                </li>
                                <li className='line-2'>
                                    <div className="dob-container">
                                        <label htmlFor="dob">Sinh ngày:</label>
                                        <span> {formatDate(member.dob)}</span>
                                    </div>
                                    <div className="gender-container">
                                        <label htmlFor="gender">Giới tính: </label>
                                        <span> {member.gender.charAt(0).toUpperCase() + member.gender.slice(1)}</span>
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="residenceAddress">Nơi đăng ký hộ khẩu thường trú: </label>
                                    <span> {member.residenceAddress}</span>
                                </li>
                                <li>
                                    <label htmlFor="tempAddress">Nơi cư trú: </label>
                                    <span> {member.temporaryAddress}</span>
                                </li>
                                <li>
                                    <label htmlFor="cccdNo">Số giấy CMND, hoặc thẻ căn cước công dân (hoặc hộ chiếu): </label>
                                    <span> {member.identityCardNumber}</span>
                                </li>
                                <li className='line-3'>
                                    <div className='cccdDate-container'>
                                        <label htmlFor="cccdDate">Cấp ngày: </label>
                                        <span> {formatDate(member.cardProvidedDate)}</span>
                                    </div>
                                    <div className='cccdLocation-container'>
                                        <label htmlFor="cccdLocation">Nơi cấp: </label>
                                        <span> {member.cardProvidedLocation}</span>
                                    </div>
                                </li>
                                <li className='line-4'>
                                    <div className='hasDrivingLicenseNo-container'>
                                        <label htmlFor="hasDrivingLicenseNo">Đã có giấy phép lái xe số: </label>
                                        <span> {member.drivingLicenseNumber}</span>
                                    </div>
                                    <div className="hasDrivingLicenseTier-container">
                                        <label htmlFor="hasDrivingLicenseTier">hạng: </label>
                                        <span> {member.drivingLicenseTier}</span>
                                    </div>
                                    <div className='hasDrivingLicenseBy-container'>
                                        <label htmlFor="hasDrivingLicenseBy">do: </label>
                                        <span> {member.drivingLicenseProvider}</span>
                                    </div>
                                    <div className="hasDrivingLicenseDate-container">
                                        <label htmlFor="hasDrivingLicenseDate">cấp ngày: </label>
                                        {/* <span> {formatDate(member.drivingLicenseProvidedDate)}</span> */}
                                    </div>
                                </li>
                                <li>
                                    <label htmlFor="drivingLicenseDemand">Đề nghị cho tôi được học, dự sát hạch để cấp giấy phép lái xe hạng: </label>
                                    <span> {member.drivingTestTier}</span>
                                </li>
                                <li className='integratedDrivingLicense'>
                                    <label htmlFor="integratedDrivingLicense">Đăng ký tích hợp giấy phép lái xe: </label>
                                    <input type="checkbox" checked={member.integratedDrivingLicense} disabled />
                                </li>
                                <li className='inline-block'>
                                    <label className='inline-block' htmlFor="">Vi phạm hành chính trong lĩnh vực giao thông đường
                                        bộ với hình thức tước quyền sử
                                        <br />
                                        dụng giấy phép lái xe: </label>
                                    <div className='check-result'>
                                        <div className='result-yes'>
                                            <label htmlFor="check">Có: </label>
                                            <input type="radio" name='check' defaultChecked={member.revokedDrivingLicense} disabled />
                                        </div>
                                        <div className='result-no'>
                                            <label htmlFor="check">Không: </label>
                                            <input type="radio" name='check' defaultChecked={!member.revokedDrivingLicense} disabled />
                                        </div>
                                    </div>
                                </li>
                                <li className='enclosed-document'>
                                    <label htmlFor="enclosedDocument">Xin gửi kèm theo: </label>
                                    <div className="enclosed-subLi">
                                        <li>01 giấy chứng nhận đủ sức khỏe.</li>
                                        <li>06 ảnh có màu cỡ 3cm x 4cm, chụp không quá 06 tháng.</li>
                                        <li>Bản sao giấy chứng minh nhân dân hoặc thẻ căn cước công dân hoặc hộ chiếu còn thời hạn
                                            có ghi số giấy chứng minh nhân dân hoặc thẻ căn cước công dân (đối với người Việt Nam)
                                            hoặc hộ chiếu (đối với người nước ngoài);</li>
                                        <li>Các tài liệu khác có liên quan gồm: </li>
                                    </div>
                                </li>
                                <p className='member-doc-commitment'>Tôi xin cam đoan những điều ghi trên là đúng sự thật,
                                    nếu sai tôi xin hoàn toàn chịu trách nhiệm.</p>
                                <div className='sign-container'>
                                    <p>TP. Hồ Chí Minh, ngày .......... tháng .......... năm 2023</p>
                                    <p>NGƯỜI LÀM ĐƠN</p>
                                    <p>(Ký và ghi rõ họ, tên)</p>
                                </div>
                            </table>
                            <div className='btn-container'>
                                <button className='btn print-btn btn-primary' onClick={handlePrint}>In đơn thi</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={true}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </>
                    )) : (
                    <h1 className='mt-5 text-danger'>Vui lòng đăng ký khoá học</h1>
                )
            }
        </div>
    )
}

export default MemberDoc
