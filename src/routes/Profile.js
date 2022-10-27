import { useNavigate } from 'react-router-dom';
import { authService, dbService } from "fbase";
import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect } from "react";

const Profile = ({ userObj }) => {
    const navigate = useNavigate();
    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    };
    const getMyNweets = async() => {
        onSnapshot(collection(dbService, 'nweets'),(snapshot) => {
        });
    }
    useEffect(() => {}, []);
    return(
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};

export default Profile;