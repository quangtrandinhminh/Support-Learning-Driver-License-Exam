import React, { useEffect, useState } from 'react';
import './news-create-form.scss';
import api from '../../../../../config/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CreateNewsForm() {
    const user = sessionStorage.getItem('loginedUser') ? JSON.parse(sessionStorage.getItem('loginedUser')) : null;
    const userID = Number(user.userID);

    const [error, setError] = useState(null);
    const [staff, setStaff] = useState(null);
    const [numberOfNews, setNumberOfNews] = useState([]);
    const [inputData, setInputData] = useState({
        // newsId: 0,
        title: '',
        description: '',
        content: '',
        // staffId: userID,
        // createdTime: '',
        status: true,
    });

    // const getStaffByUserID = async () => {
    //     const response = await api.get('Staff/' + userID);
    //     console.log(response.data);
    //     setStaff(response.data);
    // }

    const navigate = useNavigate();

    const createNewCourse = async () => {
        try {
            await api.post('News/add', inputData);
            toast.success('Tạo tin tức thành công');
            setError(null);
            navigate('/quan-ly-tin-tuc');
        } catch (err) {
            if (err.response?.data?.error) {
                setError(err.response.data.error);
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            createNewCourse();
        }
    }

    const getAllNews = async () => {
        try {
            const response = await api.get('News/list');
            const res = response.data;
            setNumberOfNews(res);

            setInputData((prevInputData) => ({
                ...prevInputData,
                newsId: Number(res.length + 1),
            }));

        } catch (err) {
            console.log(err);
        }
    }

    const validateForm = () => {
        if (
            inputData.title === '' ||
            inputData.content === ''
        ) {
            setError('Vui lòng nhập đủ thông tin.');
            return false;
        }
        return true;
    }

    useEffect(() => {
        getAllNews()
    }, [])

    // useEffect(() => {
    //     getStaffByUserID();
    // }, [numberOfNews]);

    return (
        <div className='create-news-container'>
            <div className='create-news-title'>
                <h1 className='text-center text-uppercase'>Tạo tin tức</h1>
            </div>
            <div className='create-news-form'>
                {error && <h5 className="error-message mb-3 text-danger">{error}</h5>}
                <form onSubmit={handleSubmit}>
                    {/* <div className='form-group row'>
                        <label htmlFor="title" className="col-sm-3 col-form-label">Mã tin tức: </label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                id="newsId"
                                placeholder="mã tin tức"
                                name='newsId'
                                value={inputData.newsId}
                                onChange={e => setInputData({ ...inputData, newsId: parseInt(e.target.value)})}
                            />
                        </div>
                    </div> */}
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
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className="form-control"
                                id="content"
                                placeholder="nội dung"
                                name='content'
                                value={inputData.content}
                                onChange={e => setInputData({ ...inputData, content: e.target.value })}
                            />
                        </div>
                    </div>
                    <button className='btn btn-primary w-20 justify-self-end' type='submit'>Tạo</button>
                </form>
            </div>
        </div>
    );
}


export default CreateNewsForm;
