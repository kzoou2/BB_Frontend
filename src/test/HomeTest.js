import React from 'react';
import Login from '../pages/Login';
import Home from '../pages/Home';

// Home 로그인 시 URL 변경 없는 거 테스트
function HomeTest() {
    const token = localStorage.getItem("token");

    return (
        <div>
            {token ? <Home /> : <Login />}
        </div>
    );
}

export default HomeTest;