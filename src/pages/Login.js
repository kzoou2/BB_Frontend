import React, { useState } from 'react';
import { PC, Mobile } from '../components/Responsive';
import { Link, useNavigate } from 'react-router-dom';
import '../style/css/Login.css';
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from 'axios';

function Login() {
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const navigate = useNavigate();
    const clientId = '293049760557-j0ki70fdjtfcltgd712dtghlf8gntq33.apps.googleusercontent.com';

    const handleLogin = () => {
        setIsLogin(true);
        navigate("/");
    };

    const openSignUp = () => {
        setIsLogin(true);
        navigate("/signup");
    }

    function onChange(event) {
        if (event.target.name === "email") {
            setEmail(event.target.value);
        } else if (event.target.name === "password") {
            setPassword(event.target.value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        const newErrorMessages = [];
        if (email === "") {
            newErrorMessages.push("이메일을 입력하세요.");
        }
        if (password === "") {
            newErrorMessages.push("비밀번호를 입력하세요.");
        }

        setErrorMessage(newErrorMessages);

        if (newErrorMessages.length === 0) {
            await axios.post(
                `https://94ed-121-190-220-40.ngrok-free.app/api/v1/users/login`, {
                email: email,
                password: password
            })
                .then((response) => {
                    if (response.data.state === 200) {
                        console.log("로그인 성공");
                        setIsLogin(true);
                        const token = response.data.data.accessToken;
                        window.localStorage.setItem("email", email);
                        window.localStorage.setItem('isLogin', true);
                        window.localStorage.setItem("token", token);
                        navigate("/");
                    } else if (response.data.message === "비밀번호가 일치하지 않습니다.") {
                        console.log("로그인 실패");
                        alert("비밀번호가 일치하지 않습니다.");
                    } else {
                        console.log("로그인 실패");
                        alert("가입되지 않은 아이디입니다.")
                    }
                })
                .catch((error) => {
                    // setEmail("");
                    // setPassword("");
                    console.log("로그인 API 호출 중 호류: ", error);
                })
        }
    }

    return (
        <div>
            <PC>
                <div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className='content'>
                        <h1>BeatBuddy</h1>
                        <div>
                            <form className='content__form' onSubmit={onSubmit}>
                                <div className='content__input'>
                                    {errorMessage.length > 0 &&
                                        (<div className="alert alert-danger" role="alert">
                                            {errorMessage.map((message, index) => (<div key={index}>{message}</div>))}
                                        </div>)
                                    }

                                    <label className='form-lable' htmlFor='email'>
                                        <input onChange={onChange} type='email' id='email' name='email' placeholder='이메일'></input>
                                        {/* <span>전화번호, 사용자 이름 또는 이메일 </span> */}
                                    </label>
                                    <label className="form-label mt-2" htmlFor="password">
                                        <input onChange={onChange} type='password' id='password' name='password' placeholder='비밀번호' autoComplete='current-password' />
                                        {/* <span>Password</span> */}
                                    </label>
                                </div>

                                <button type="submit"><b>Login</b></button>
                                <br />
                            </form>
                        </div>

                        <div className="content__or-text">
                            <span></span>
                            <span> or </span>
                            <span></span>
                        </div>

                        <div className="content__forgot-buttons">
                            <button>
                                <GoogleOAuthProvider clientId={clientId}>
                                    <GoogleLogin
                                        onSuccess={async (response) => {
                                            console.log("구글 로그인 성공", response);
                                            setIsLogin(true);
                                            const token = response.credential;
                                            window.localStorage.setItem("email", email);
                                            window.localStorage.setItem('isLogin', true);
                                            window.localStorage.setItem("token", token);
                                            openSignUp();
                                        }}
                                        onFailure={(error) => {
                                            console.log("구글 로그인 실패", error);
                                        }}
                                    />
                                </GoogleOAuthProvider>
                            </button>
                            <div className="content__forgot-buttons">
                                <button><Link to="/signup"> <span>Don't have an account? Sign up</span> </Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </PC>

            <Mobile>
                <div className='container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className='content'>
                        <h1>BeatBuddy</h1>
                        <div>
                            <form className='content__form' onSubmit={onSubmit}>
                                <div className='content__input'>
                                    {errorMessage.length > 0 &&
                                        (<div className="alert alert-danger" role="alert">
                                            {errorMessage.map((message, index) => (<div key={index}>{message}</div>))}
                                        </div>)
                                    }

                                    <label className='form-lable' htmlFor='email'>
                                        <input onChange={onChange} type='email' id='email' name='email' placeholder='이메일'></input>
                                        {/* <span>전화번호, 사용자 이름 또는 이메일 </span> */}
                                    </label>
                                    <label className="form-label" htmlFor="password">
                                        <input onChange={onChange} type='password' id='password' name='password' placeholder='비밀번호' autoComplete='current-password' />
                                        {/* <span>Password</span> */}
                                    </label>
                                </div>

                                <button type="submit"><b>Login</b></button>
                                <br />
                            </form>
                        </div>

                        <div className="content__or-text">
                            <span></span>
                            <span> or </span>
                            <span></span>
                        </div>

                        <div className="content__forgot-buttons">
                            <button>
                                <GoogleOAuthProvider clientId={clientId}>
                                    <GoogleLogin
                                        onSuccess={async (response) => {
                                            console.log("구글 로그인 성공", response);
                                            setIsLogin(true);
                                            const token = response.credential;
                                            window.localStorage.setItem("email", email);
                                            window.localStorage.setItem('isLogin', true);
                                            window.localStorage.setItem("token", token);
                                            handleLogin();
                                        }}
                                        onFailure={(error) => {
                                            console.log("구글 로그인 실패", error);
                                        }}
                                    />
                                </GoogleOAuthProvider>
                            </button>
                            <div className="content__forgot-buttons">
                                <button><Link to="/signup"> <span>Don't have an account? Sign up</span> </Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </Mobile>
        </div>
    );
}

export default Login;