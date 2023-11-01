import React, { useEffect, useState } from 'react';
import './news-update-form.scss';
import api from '../../../../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateNewsForm() {
    const { newsId } = useParams();
    const [error, setError] = useState(null);
    const [inputData, setInputData] = useState({
        title: '',
        description: '',
        content: '',
        status: true,
    });
    const navigate = useNavigate();

    const createNewCourse = async () => {
        try {
            if (inputData.title === ''
                || inputData.content === '') {
                setError("Vui lòng nhập đủ thông tin");
                return;
            }

            await api.put('News/update', inputData);
            toast.success('Cập nhật tin tức thành công');
            setError(null);
            navigate('/quan-ly-tin-tuc');
        } catch (err) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            }
        }
    }

    const getNewsById = async () => {
        try {
            const response = await api.get(`News/${newsId}`);
            const res = response.data;
            setInputData(res);
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createNewCourse();
    }

    useEffect(() => {
        getNewsById();
    }, [])

    return (
        <div className='update-news-container'>
            <div className='update-news-title'>
                <h1 className='text-center text-uppercase'>Cập nhật tin tức</h1>
            </div>
            <div className='update-news-form'>
                {error && <h5 className="error-message mb-3 text-danger">{error}</h5>}
                <form onSubmit={handleSubmit}>
                    <div className='form-group row'>
                        <label htmlFor="title" className="col-sm-3 col-form-label">Tiêu đề: </label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                placeholder="tiêu đề"
                                name='title'
                                value={inputData.title}
                                onChange={e => setInputData({ ...inputData, title: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor="description" className="col-sm-3 col-form-label">Mô tả: </label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                placeholder="mô tả"
                                name='description'
                                value={inputData.description}
                                onChange={e => setInputData({ ...inputData, description: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor="content" className="col-sm-3 col-form-label">Nội dung: </label>
                        <div className="col-sm-9 text-box row">
                            <textarea
                                className="form-control"
                                id="content"
                                placeholder="nội dung"
                                style={{ resize: 'none', height: '200px' }}
                                name='content'
                                value={inputData.content}
                                onChange={e => setInputData({ ...inputData, content: e.target.value })}
                            />
                            <button className='btn btn-warning clear-text-btn' type='button' onClick={() => setInputData({ ...inputData, content: '' })}>
                                Clear Text
                            </button>
                        </div>
                    </div>
                    <button className='btn btn-primary w-25' type='submit'>Cập nhật</button>
                </form>
            </div>
        </div>
    );
}


export default UpdateNewsForm;
