import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { dbService } from 'fbase';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState('');
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
        onSnapshot(collection(dbService, 'nweets'),(snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setNweets(newArray);
        });
    }, []);
    console.log(nweets);
    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            await addDoc(collection(dbService, 'nweets'), {
                text: nweet,
                createdAt: Date.now(),
                creatorId: userObj.uid,
            });
            setNweet("");
        } catch (e) {
            console.error('Error adding document: ', e);
        }
    };

    const onChange = (event) => {
        event.preventDefault();
        const {
            target: { value }
        } = event;
        setNweet(value);
    };
    
    return (
        <>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="what's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid} />
                ))}
            </div>
        </>
    );
};

export default Home;