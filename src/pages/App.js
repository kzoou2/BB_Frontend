import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../css/App.css';
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import Alarm from './Alarm';
import DM from './DM';
import Search from './Search';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signUp" element={<SignUp />} />
                    <Route path="/alarm" element={<Alarm />} />
                    <Route path="/dm" element={<DM />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
