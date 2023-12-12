import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { PC, Mobile } from '../components/Responsive';
import '../style/css/Login.css';

function SignUp() {
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm ] = useState("");
    const [gender, setGender] = useState("");
    const [birth, setBirth] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const navigate = useNavigate();


    function onChange(event) {
        if (event.target.name === "nickname") {
            setNickname(event.target.value)
        } else if (event.target.name === "email") {
            setEmail(event.target.value)
        } else if (event.target.name === " password") {
            setPassword(event.target.value)
        } else if (event.target.name === " passwordConfirm"){
            setPasswordConfirm(event.target.value)
        } else if (event.target.name === " gender"){
            setGender(event.target.value)
        } else if (event.target.name === "birth"){
            setBirth(event.target.value)
        }
    }

    async function onSubmit(event) {
        event.preventDefault();

        const newErrorMessages = [];
        if (nickname === "") {
            newErrorMessages.push("");
        }
        if (password === "") {
            newErrorMessages.push("비밀번호는 필수 입력 항목입니다.");
        }
        if (passwordConfirm === "") {
            newErrorMessages.push("비밀번호 확인은 필수 입력 항목입니다.");
        }
        if (email === "") {
            newErrorMessages.push("이메일은 필수 입력 항목입니다.")
        }
        if (gender === "") {
            newErrorMessages.push("성별은 필수 입력 항목입니다.")
        }
        if (birth === "") {
            newErrorMessages.push("생일은 필수 입력 항목입니다.")
        }
        

        setErrorMessage(newErrorMessages);

        if(newErrorMessages.length === 0 ) {
            try {
                const result = await axios.post("http://localhost:8080//sign-up",{
                    email: email, 
                    nickname: nickname,
                    password: password,
                    passwordConfirm: passwordConfirm,
                    gender: gender,
                    birth: birth
                })
                if(result.status === 200 ){
                    console.log("가입 성공:", result);
                    navigate("/login")
                }
            } catch(error){
                if (error.response && error.response.data) {
                    setErrorMessage([error.response.data]);
                    setNickname("")
                    setPassword("")
                    setEmail("")
                    setPasswordConfirm("")
                    setBirth("")
                    setBirth("")
                } else {
                    console.log("가입 실패:", error);
                }
            }
        }
    }

    return (
        <div>
            <PC>
                <div className='container' >
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
                                    <label className='form-label' htmlFor='email'>
                                        <input onChange={onChange} value={email} type='email' id="email" name='email' placeholder='이메일'></input>
                                    </label>

                                    <label className='form-label' htmlFor='username'>
                                        <input onChange={onChange} type='text' id="nickname" name='nickname' placeholder='닉네임' ></input>
                                    </label>

                                    <label className='form-label' htmlFor='password'>
                                        <input onChange={onChange} type="password" id="password" name="password" placeholder="비밀번호" ></input>
                                    </label>
                                    <label className='form-label' htmlFor='passwordComfirm'>
                                        <input onChange={onChange} type="password" id="passwordComfirm" name="passwordComfirm" placeholder="비밀번호 확인"></input>
                                    </label>
                                    {/* <label className='form-label' htmlFor='gender'>
                                        <input onChange={onChange} type="text" id="gender" name="gender" placeholder="성별"></input>
                                    </label>
                                    <label className='form-label' htmlFor='birth'>
                                        <input onChange={onChange} type="text" id="birth" name="birth" placeholder="생일"></input>
                                    </label> */}

                                </div>
                                <button type='submit'><b>가입</b></button>

                                <br/>
                            </form>
                            <div className="content__or-text">
                                <span></span>
                                <span></span>
                            </div>
                            
                            <div className="content__forgot-buttons">
                                <button> <Link to ='/login'>
                                    <span>Already have an acount ?</span> </Link>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            
            </PC>

            <Mobile>
                <div className='container' >
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
                                    <label className='form-label' htmlFor='email'>
                                        <input onChange={onChange} value={email} type='email' id="email" name='email' placeholder='이메일'></input>
                                    </label>

                                    <label className='form-label' htmlFor='username'>
                                        <input onChange={onChange} type='text' id="username" name='username' placeholder='성명' ></input>
                                    </label>

                                    <label className='form-label' htmlFor='password'>
                                        <input onChange={onChange} type="password" id="password" name="password" placeholder="비밀번호" ></input>
                                    </label>

                                </div>
                                <button type='submit'><b>가입</b></button>

                                <br/>
                            </form>
                            <div className="content__or-text">
                                <span></span>
                                <span></span>
                            </div>
                            
                            <div className="content__forgot-buttons">
                                <button> <Link to ='/login'>
                                    <span>Already have an acount ?</span> </Link>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </Mobile>
        </div>
    );
}

export default SignUp;