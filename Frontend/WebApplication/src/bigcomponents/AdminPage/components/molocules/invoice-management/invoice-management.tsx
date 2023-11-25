import React, { useEffect, useState } from 'react'
import './invoice-management.scss'
import api from '../../../../../config/axios';

function InvoiceTable() {
    const [invoice, setInvoice] = useState<any[]>([])

    const getAllInvoices = async () => {
        try {
            const response = await api.get('Invoice/list');
            const res = response.data;
            setInvoice(res);
        } catch (error) {
            console.log(error);
        }
    }

    //paganition part
    const [currentPage, setCurrentPage] = useState(1);
    const recordPage = 10;
    const lastIndex = currentPage * recordPage;
    const firsIndex = lastIndex - recordPage;
    const records = invoice.slice(firsIndex, lastIndex);
    const npage = Math.ceil(invoice.length / recordPage);
    const numbers = [...Array(npage + 1).keys()].slice(1);
    const overallIndex = (currentPage - 1) * recordPage;

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const changeCPage = (id: number) => {
        setCurrentPage(id);
    }

    const nextPage = () => {
        if (currentPage !== npage) {
            setCurrentPage(currentPage + 1);
        }
        console.log(npage);
    }

    useEffect(() => {
        getAllInvoices();
    }, []);

    return (
        <div className='result-table-container'>
            <div className="result-table-title text-center text-uppercase">
                <h1>Danh sách thanh toán</h1>
            </div>
            <div className='result-table-content'>
                <form action="">
                    <table className='table table-hover table-striped' border={1}>
                        <thead className='table-primary'>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Mã thanh toán</th>
                                <th scope='col'>Nhân viên thanh toán</th>
                                <th scope='col'>Học viên</th>
                                <th scope='col'>Khoá học</th>
                                <th scope='col'>Ngày thanh toán</th>
                                <th scope='col'>Số tiền</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider align-middle'>
                            {records.length > 0 ? (
                                records.map((invoice, i) => (
                                    <tr key={i}>
                                        <td>{overallIndex + i + 1}</td>
                                        <td>{invoice.invoiceId}</td>
                                        <td>{invoice.staffName}</td>
                                        <td>{invoice.memberName}</td>
                                        <td>{invoice.courseId}</td>
                                        <td>{invoice.invoiceTime}</td>
                                        <td>{invoice.amountPaid.toLocaleString()} VNĐ</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>
                                        <h1 className='text-center text-red-600 p-5'>
                                            Không tìm thấy thông tin. Vui lòng kiểm tra lại!
                                        </h1>
                                    </td>
                                </tr>
                            )
                            }
                        </tbody>
                    </table>
                    <nav>
                        <ul className='pagination'>
                            <li className='page-item'>
                                <button type='button' className='page-link' onClick={prePage}>Prev</button>
                            </li>
                            {
                                numbers.map((n, i) => (
                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                        <button type='button' className='page-link' onClick={() => changeCPage(n)}>{n}</button>
                                    </li>
                                ))
                            }
                            <li className='page-item'>
                                <button type='button' className='page-link' onClick={nextPage}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </form>
            </div>
        </div>
    )
}

export default InvoiceTable
