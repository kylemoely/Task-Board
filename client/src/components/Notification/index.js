import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import trash from '../../assets/trash.png';

export default function Notification ({ notification, setReload }) {

    const { type, status, str1, str2, id, link } = notification;
    let content;
    switch(type){
        case 'taskMove':
            content = `${str1} moved your task to ${str2}`;
            break;
        case 'assignedYou':
            content = `${str1} assigned you to a task.`;
            break;
        case 'assignedUser':
            content = `${str1} assigned your task to ${str2}`;
            break;
        case 'invitedYou':
            content = `${str1} invited you to a project: ${str2}`;
            break;
    }

    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();

    const deleteNot = async (e) => {
        e.stopPropagation();
        await axiosPrivate.delete(`/api/notifications/${id}`);
        setReload(prev => !prev);
    }
    const handleClick = async (e) => {
        if(status===0){
            await axiosPrivate.put(`/api/notifications/${id}`, JSON.stringify({ status: 1 }));
        }
        navigate(link);
    }

    return (
        <div className='notification rounded ps-2 d-flex justify-content-between' onClick={handleClick}><div>{content}</div><img onClick={deleteNot} className='img h-25 align-self-center' src={trash} alt='delete' /></div>
    )
}