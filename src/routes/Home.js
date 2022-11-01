import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore';
import { dbService } from 'fbase';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);
    
    /*
    const getNweets = async () => {
        const dbNweets = await getDocs(collection(dbService, 'nweets'));
        dbNweets.forEach((document) => {
            const nweetObject = { ...document.data(), id: document.id}
            setNweets((prev) => [nweetObject, ...prev]);
        })
    };*/
    useEffect(()=>{
        const q = query(collection(dbService, 'nweets'), orderBy("createdAt", "desc"));
        onSnapshot(q ,(snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });
    }, []);
    return (
        <div className="container" style={{ marginTop: 80 }}>
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </div>
    );
};

export default Home;