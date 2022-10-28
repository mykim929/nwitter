import { useNavigate } from 'react-router-dom';
import { authService, dbService } from "fbase";
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";

const Profile = ({ userObj, refreshUser }) => {
    const navigate = useNavigate();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        navigate('/');
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await updateProfile(authService.currentUser, {
                displayName: newDisplayName
            });
            refreshUser();
        }
    }
    /*
    const getMyNweets = async () => {
        const nweets = await query(collection(dbService, 'nweets'), where("creatorId", "==", userObj.uid), orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(nweets, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.data());
            });
        });
    };
    useEffect(() => {
        getMyNweets();
    }, []);
    */
    return(
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type="text" placeholder="Display name" value={newDisplayName} />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};

export default Profile;