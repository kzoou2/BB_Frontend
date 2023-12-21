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
    const [passwordMatchError,setPasswordMatchError] = useState("");
    const navigate = useNavigate();


    function onChange(event) {
        if (event.target.name === "nickname") {
            setNickname(event.target.value)
        } else if (event.target.name === "email") {
            setEmail(event.target.value)
        } else if (event.target.name === "password") {
            setPassword(event.target.value)
        } else if (event.target.name === "passwordConfirm"){
            setPasswordConfirm(event.target.value)
        } else if (event.target.name === "gender"){
            setGender(event.target.value)
        } else if (event.target.name === "birth") {
            setBirth(event.target.value);
        }
    }

    async function onSubmit(event) {
        event.preventDefault();

        const newErrorMessages = [];
        if (nickname === "") {
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


        if(newErrorMessages.length === 0 ) {
            window.localStorage.setItem('email', email);
            window.localStorage.setItem('password', password);
      
            try { 
                // const result = await axios.post("http://localhost:8080/api/v1/users/sign-up",{
                    const result = await axios.post("https://94ed-121-190-220-40.ngrok-free.app/api/v1/users/sign-up",{
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
                } else {
                    console.log("가입 실패:", error);
                }
            }
            
            //테스트
            // navigate('/login');
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
                                        <input onChange={onChange} type="password" id="password" name="password" placeholder="비밀번호" autoComplete="new-password" ></input>
                                    </label>
                                    <label className='form-label' htmlFor='passwordConfirm'>
                                        <input onChange={onChange} type="password" id="passwordConfirm" name="passwordConfirm" placeholder="비밀번호 확인" autoComplete="new-password" ></input>
                                    </label>
                                    {passwordMatchError && <div className="alert alert-danger">{passwordMatchError}</div>}

                                    <div class="input-box" style={{ display: 'flex', gap: '10px' }}>
                                        <label className='form-label' htmlFor='gender' style={{ flex: 1, minWidth: '130px' }}>
                                            <select onChange={onChange} id="gender" name="gender">
                                                <option value="">성별 선택</option>
                                                <option value="male">남</option>
                                                <option value="female">여</option>
                                            </select>
                                        </label>

                                        <label className='form-label' htmlFor='birth' style={{ flex: 1, minWidth: '130px' }}>
                                            <input onChange={onChange} id="birth" name="birth" required="" placeholder="생일" type="date"/>
                                        </label>
                                    </div>
                                </div>
                                <button type='submit'><b>Sign Up</b></button>

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
                                        <input onChange={onChange} type='text' id="nickname" name='nickname' placeholder='닉네임' ></input>
                                    </label>

                                    <label className='form-label' htmlFor='password'>
                                        <input onChange={onChange} type="password" id="password" name="password" placeholder="비밀번호" autoComplete="new-password" ></input>
                                    </label>
                                    <label className='form-label' htmlFor='passwordConfirm'>
                                        <input onChange={onChange} type="password" id="passwordConfirm" name="passwordConfirm" placeholder="비밀번호 확인" autoComplete="new-password" ></input>
                                    </label>
                                    {passwordMatchError && <div className="alert alert-danger">{passwordMatchError}</div>}

                                    <div class="input-box" style={{ display: 'flex', gap: '10px' }}>
                                        <label className='form-label' htmlFor='gender' style={{ flex: 1, minWidth: '130px' }}>
                                            <select onChange={onChange} id="gender" name="gender">
                                                <option value="">성별 선택</option>
                                                <option value="male">남</option>
                                                <option value="female">여</option>
                                            </select>
                                        </label>

                                        <label className='form-label' htmlFor='birth' style={{ flex: 1, minWidth: '130px' }}>
                                            <input onChange={onChange} id="birth" name="birth" required="" placeholder="생일" type="date"/>
                                        </label>
                                    </div>
                                </div>
                                <button type='submit'><b>Sign Up</b></button>

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