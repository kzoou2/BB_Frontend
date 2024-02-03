import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PC, Mobile } from '../components/Responsive';
import '../style/css/Login.css';

function SignUp() {
    const [email, setEmail] = useState("");
    const [nickName, setNickName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const [passwordMatchError, setPasswordMatchError] = useState("");
    const navigate = useNavigate();
    const token = window.localStorage.getItem("accessToken");

    function onChange(event) {
        if (event.target.name === "nickname") {
            setNickName(event.target.value)
        } else if (event.target.name === "email") {
            setEmail(event.target.value)
        } else if (event.target.name === "password") {
            setPassword(event.target.value)
        } else if (event.target.name === "passwordConfirm") {
            setPasswordConfirm(event.target.value)
        }
    }

    async function onSubmit(event) {
        event.preventDefault();

        const newErrorMessages = [];
        if (nickName === "") {
            newErrorMessages.push("닉네임은 필수 입력 항목입니다.");
        }
        if (password === "") {
            newErrorMessages.push("비밀번호는 필수 입력 항목입니다.");
        }
        if (passwordConfirm === "") {
            newErrorMessages.push("비밀번호 확인은 필수 입력 항목입니다.");
        }
        if (email === "") {
            newErrorMessages.push("이메일은 필수 입력 항목입니다.");
        }
        if (password !== passwordConfirm) {
            setPasswordMatchError("비밀번호가 일치하지 않습니다.");
            newErrorMessages.push("비밀번호 확인이 일치하지 않습니다.");
        } else {
            setPasswordMatchError("");
        }
        setErrorMessage(newErrorMessages);

        // TODO: 구글 로그인 시 서버에서 이메일 정보 받아와야함 -> 그 후 수정하기

        if (newErrorMessages.length === 0) {
            window.localStorage.setItem('email', email);
            window.localStorage.setItem('password', password); //왜저장하지?

            try {
                const result = await axios.post("http://localhost:8080/api/v1/users/sign-up", {
                    email: email,
                    nickName: nickName,
                    password: password,
                    passwordConfirm: passwordConfirm,
                })
                if (result.status === 200) {
                    console.log("가입 성공:", result);

                    navigate("/login")
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    setErrorMessage([error.response.data]);
                    setNickName("")
                    setPassword("")
                    setEmail("")
                    setPasswordConfirm("")
                } else {
                    console.log("가입 실패:", error);
                }
            }
        }
    }

    return (
        <div>
                                                    {/* TODO: 프로필 사진 업로드 추가하기 */}
            <PC>
                <div className='container' >
                    <div className='content'>
                        {token ? (
                            <div className='signup-form-ui'>
                                <form className='google-form' onSubmit={onSubmit}>
                                    <div className='google-form-body'>
                                        <div className="welcome-lines">
                                            <div className="welcome-line-1">BeatBuddy</div>
                                            <div className="welcome-line-2"><b>가입하기</b></div>
                                        </div>
                                        <div className='input-area'>
                                            {errorMessage.length > 0 &&
                                                (<div className="alert alert-danger" role="alert">
                                                    {errorMessage.map((message, index) => (<div key={index}>{message}</div>))}
                                                </div>)
                                            }
                                            <div className='form-inp'>
                                                <input onChange={onChange} type='text' id="nickname" name='nickname' placeholder='닉네임'/>
                                            </div>
                                        </div>
                                        <div className="submit-button-cvr">
                                            <button className="submit-button" type='submit'><b>가입하기</b></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className='signup-form-ui'>
                                <form className='signup-form' onSubmit={onSubmit}>
                                    <div className='signup-form-body'>
                                        <div className="welcome-lines">
                                            <div className="welcome-line-1">BeatBuddy</div>
                                            <div className="welcome-line-2">가입하기</div>
                                        </div>
                                        <div className='input-area'>
                                            {errorMessage.length > 0 &&
                                                (<div className="alert alert-danger" role="alert">
                                                    {errorMessage.map((message, index) => (<div key={index}>{message}</div>))}
                                                </div>)
                                            }

                                            <div className="form-inp">
                                                <input  onChange={onChange} placeholder="이메일" value={email} type='email' id="email" name='email'/>
                                            </div>
                                            <div className='form-inp'>
                                                <input onChange={onChange} type='text' id="nickname" name='nickname' placeholder='닉네임'/>
                                            </div>
                                            <div className='form-inp'>
                                                <input onChange={onChange} type="password" id="password" name="password" placeholder="비밀번호" autoComplete="new-password"/>
                                            </div>
                                            <div className='form-inp'>
                                                <input onChange={onChange} type="password" id="passwordConfirm" name="passwordConfirm" placeholder="비밀번호 확인" autoComplete="new-password" />
                                            </div>
                                        </div>
                                        <div className="submit-button-cvr">
                                            <button className="submit-button" type='submit'><b>가입하기</b></button>
                                        </div>

                                        <div className="content__or-text">
                                            <span></span>
                                            <span> or </span>
                                            <span></span>
                                        </div>

                                        <div className='forgot-pass'>
                                            <button> <Link to='/login'><span>Already have an acount ?</span><button className='signUp-button'>Login</button> </Link></button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </PC>

            <Mobile>
                <div className='container' >
                    <div className='content'>
                        <h1>BeatBuddy</h1>
                        {token ? (
                            <div>
                                <form className='content__form' onSubmit={onSubmit}>
                                    <div className='content__input'>
                                        {errorMessage.length > 0 &&
                                            (<div className="alert alert-danger" role="alert">
                                                {errorMessage.map((message, index) => (<div key={index}>{message}</div>))}
                                            </div>)
                                        }

                                        {/* TODO: 프로필 사진 업로드 추가하기 */}

                                        <label className='form-label' htmlFor='username'>
                                            <input onChange={onChange} type='text' id="nickname" name='nickname' placeholder='닉네임' ></input>
                                        </label>
                                    </div>
                                    <button type='submit'><b>Sign Up</b></button>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <form className='content__form' onSubmit={onSubmit}>
                                    <div className='content__input'>
                                        {errorMessage.length > 0 &&
                                            (<div className="alert alert-danger" role="alert">
                                                {errorMessage.map((message, index) => (<div key={index}>{message}</div>))}
                                            </div>)
                                        }
                                        <label className='form-label' htmlFor='email'>
                                            <input onChange={onChange} value={email} type='email' id="email" name='email' placeholder='이메일'></input>
                                        </label>

                                        <label className='form-label' htmlFor='username'>
                                            <input onChange={onChange} type='text' id="nickname" name='nickname' placeholder='닉네임' ></input>
                                        </label>

                                        <label className='form-label' htmlFor='password'>
                                            <input onChange={onChange} type="password" id="password" name="password" placeholder="비밀번호" autoComplete="new-password" ></input>
                                        </label>
                                        <label className='form-label' htmlFor='passwordConfirm'>
                                            <input onChange={onChange} type="password" id="passwordConfirm" name="passwordConfirm" placeholder="비밀번호 확인" autoComplete="new-password" ></input>
                                        </label>
                                        {passwordMatchError && <div className="alert alert-danger">{passwordMatchError}</div>}
                                    </div>
                                    <button type='submit'><b>Sign Up</b></button>

                                    <br />
                                </form>
                                <div className="content__or-text">
                                    <span></span>
                                    <span></span>
                                </div>

                                <div className="content__forgot-buttons">
                                    <button> <Link to='/login'>
                                        <span>Already have an acount ?</span> </Link>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Mobile>
        </div >
    );
}

export default SignUp;