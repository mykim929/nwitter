
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { authService } from 'fbase';
import { useState } from 'react';

const AuthForm = ({ refreshUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === 'email') {
            setEmail(value);
        } else if(name === 'password') {
            setPassword(value);
        } else if(name === 'displayName') {
            setDisplayName(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if(newAccount) {
                // create newAccount
                data = await createUserWithEmailAndPassword(authService, email, password).then(() => {
                    updateProfile(authService.currentUser, {
                        displayName: displayName
                    }).then(()=> {
                        refreshUser();
                    });
                });

            } else {
                // log in
                data = await signInWithEmailAndPassword(authService, email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input name="email" type="email" placeholder="Email" value={email} onChange={onChange} className="authInput" required />
                {newAccount ? (<input name="displayName" type="text" placeholder="nick name" value={displayName} onChange={onChange} className="authInput" required />) : null}
                <input name="password" type="password" placeholder="Password" value={password} onChange={onChange} className="authInput" required />
                <input type="submit" className="authInput authSubmit" value={newAccount? 'Create Account' : 'Log In'} />
                { error && <span clasName="authError">{error}</span> }
            </form>
            <span onClick={toggleAccount} className="authSwitch">{newAccount ? 'Sign In' : 'Create Account'}</span>
        </>
    )
}

export default AuthForm;