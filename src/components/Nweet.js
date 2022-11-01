import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { dbService, storageService } from "fbase";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';

const Nweet = ({ nweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async() => {
        const ok = window.confirm('삭제하시겠습니까?');
        if (ok) {
            await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
            if (nweetObj.attachmentUrl !== "") {
                // await storageService
                const desertRef = await ref(storageService, nweetObj.attachmentUrl);
                deleteObject(desertRef);
            }
        }
    };
    const toggleEditing = () => setEditing((prev) => !prev);
    const onChange = (event) => {
        const {
            target : { value },
        } = event;
        setNewNweet(value);
    }
    const onSubmit = async(event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {text: newNweet});
        setEditing(false);
    }
    const date = dayjs(new Date(nweetObj.createdAt)).format('YYYY-MM-DD HH:mm A');
    return (
        <div className="nweet">
            {editing ? (
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input value={newNweet} onChange={onChange} placeholder="Edit your nweet" className="formInput" autofocus required />
                        <input type="submit" value="Update Nweet" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && (
                        <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
                    )}
                    <div className="info">
                        <p><strong>User</strong> : {nweetObj.displayName}</p>
                        <p><strong>Date</strong> : {dayjs(new Date(nweetObj.createdAt)).format('YYYY-MM-DD A hh:mm')}</p>
                    </div>
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}><FontAwesomeIcon icon={faTrash} /></span>
                            <span onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt} /></span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;