import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from 'routes/Auth';
import Home from 'routes/Home';
import Profile from 'routes/Profile';
import Navigation from 'components/Navigation';

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/" element={ <Home /> } />
                        <Route excat path="/profile" element={ <Profile /> } />
                    </>
                ) : (
                    <Route exact path="/" element={ <Auth /> } />
                ) }
            </Routes>
        </Router>
    );
};

export default AppRouter;