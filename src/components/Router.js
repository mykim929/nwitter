import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <div style={{ maxWidth: 890, width: "100%", margin: "0 auto", display: "flex", justifyContent: "center" }}>
                <Routes>
                    {isLoggedIn ? (
                        <>
                            <Route exact path="/" element={ <Home userObj={userObj} /> } />
                            <Route excat path="/profile" element={ <Profile refreshUser={refreshUser} userObj={userObj} /> } />
                        </>
                    ) : (
                        <Route exact path="/" element={ <Auth refreshUser={refreshUser} /> } />
                    ) }
                </Routes>
            </div>
        </Router>
    );
};

export default AppRouter;