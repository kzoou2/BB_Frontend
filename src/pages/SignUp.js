import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PC, Mobile } from '../components/Responsive';
import '../style/css/Login.css';
import { IoIosAlert } from "react-icons/io";

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
        } else if(password.length <8){
            newErrorMessages.push("비밀번호는 8자 이상이어야 합니다.")
        } else {
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(password)) {
                newErrorMessages.push("비밀번호는 8자 이상, 영문 대소문자, 숫자, 특수문자를 사용해야 합니다.");
            }
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

            try {
                const userImgSrc = "https://github.com/kzoou2/kzoou2/blob/main/assets/icon-user-profile-9803278.png?raw=true";
                const result = await axios.post("http://localhost:8080/api/v1/users/sign-up", {
                    email: email,
                    nickName: nickName,
                    password: password,
                    passwordConfirm: passwordConfirm,
                    userImgSrc: userImgSrc,
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
                    setErrorMessage(["회원가입에 실패했습니다. 다시 시도해주세요."]);
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
                        <div className='SignUp-wrapper'> 
                            <div className='SignUp-form-container'>
                                <div className="signup-form-header">
                                    <img src='https://raw.githubusercontent.com/kzoou2/kzoou2/main/assets/293721930-ba3957b2-2b3c-4f55-8426-008dfc56e00b1.png' alt='BeatBuddy' style={{width:'95%', marginTop:'-15px' }} />
                                    <div className="Singup-title">나만의 노래 아카이브, <br/> 지금 가입하고 만들어보세요!</div>
                                </div>

                                {errorMessage.length > 0 &&(
                                    <div className="form-error-box" >
                                        {errorMessage.map((message, index) => (<div key={index}> <IoIosAlert /> {message}</div>))}
                                    </div>
                                )}

                                <form className='form' onSubmit={onSubmit}>
                                    
                                    <div className="form-group">
                                        <label className="form-label" for="email">이메일</label>
                                        <input className="form-input" onChange={onChange} value={email} type='email' id="email" name='email'/>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" for="nickname">닉네임</label>
                                        <input className="form-input" onChange={onChange} type='text' id="nickname" name='nickname'/>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" for="password">비밀번호</label>
                                        <input className="form-input" onChange={onChange}type="password" id="password" name="password" placeholder="" autoComplete="new-password"/>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" for="email">비밀번호 확인</label>
                                        <input className="form-input" onChange={onChange}  type="password" id="passwordConfirm" name="passwordConfirm" placeholder="" autoComplete="new-password" />
                                    </div>

                                    <div className="submit-button">
                                        <button className="submitbtn" type="submit">가입하기</button>
                                    </div>

                                    <div className="content__or-text">
                                        <span></span>
                                        <span>or</span>
                                        <span></span>
                                    </div>

                                    <div className='sign-pass'>
                                        <span>이미 계정이 있으신가요?</span>
                                        <Link to="/login"><button className='signUp-button'>로그인</button></Link>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </PC>

            <Mobile>
                <div className='container' >
                    <div className='content'>
                    <div className='SignUp-wrapper'> 
                            <div className='SignUp-form-container'>
                                <div className="signup-form-header">
                                    <img src='https://raw.githubusercontent.com/kzoou2/kzoou2/main/assets/293721930-ba3957b2-2b3c-4f55-8426-008dfc56e00b1.png' alt='BeatBuddy' style={{width:'95%', marginTop:'-15px' }} />
                                    <div className="Singup-title">나만의 노래 아카이브, <br/> 지금 가입하고 만들어보세요!</div>
                                </div>

                                {errorMessage.length > 0 &&(
                                    <div className="form-error-box" >
                                        {errorMessage.map((message, index) => (<div key={index}> <IoIosAlert /> {message}</div>))}
                                    </div>
                                )}

                                <form className='form' onSubmit={onSubmit}>
                                    
                                    <div className="form-group">
                                        <label className="form-label" for="email">이메일</label>
                                        <input className="form-input" onChange={onChange} value={email} type='email' id="email" name='email'/>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" for="nickname">닉네임</label>
                                        <input className="form-input" onChange={onChange} type='text' id="nickname" name='nickname'/>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" for="password">비밀번호</label>
                                        <input className="form-input" onChange={onChange}type="password" id="password" name="password" placeholder="" autoComplete="new-password"/>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label" for="email">비밀번호 확인</label>
                                        <input className="form-input" onChange={onChange}  type="password" id="passwordConfirm" name="passwordConfirm" placeholder="" autoComplete="new-password" />
                                    </div>

                                    <div className="submit-button">
                                        <button className="submitbtn" type="submit">가입하기</button>
                                    </div>

                                    <div className="content__or-text">
                                        <span></span>
                                        <span>or</span>
                                        <span></span>
                                    </div>

                                    <div className='sign-pass'>
                                        <span>이미 계정이 있으신가요?</span>
                                        <Link to="/login"><button className='signUp-button'>로그인</button></Link>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </Mobile>
        </div >
    );
}

export default SignUp;