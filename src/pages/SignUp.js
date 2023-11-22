import React, { useState } from 'react';
import { PC, Mobile } from '../components/Responsive';
import '../css/Login.css';
// import axios from 'axios';


function SignUp() {

    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ userid, setUserid ] = useState("");
    const [ password, setPassword] = useState("");

    const [ errorMessage, setErrorMessage] = useState([]);

    function onChange(event) {
        if(event.target.name === "username") {
            setUsername(event.target.value)
        } else if( event.target.name === "userid" ){
            setUserid(event.target.value)
        } else if ( event.target. name === "email"){
            setEmail(event.target.value)
        } else if ( event.target.name === " password"){
            setPassword(event.target.value)
        } 
    }

    async function onSubmit(event) {
        event.preventDefault();

        const newErrorMessages = [];
        if(username === "") {
            newErrorMessages.push("")
        }
        if(userid === ""){
            newErrorMessages.push("")
        }
        if(password === ""){
            newErrorMessages.push("")
        }
        if(email ===  "") {
            newErrorMessages.push("")
        }

        setErrorMessage(newErrorMessages);

        // if(newErrorMessages.length === 0 ) {
        //     try {
        //         const result = await axios.post("http://localhost:8080",{
        //             email:
        //             username:
        //             userid:
        //             password:
        //         })
        //         if(result.status === 200 ){
        //             Navigate("/")
        //         }
        //     } catch(error){
        //         //console.log(error.response.data);
        //         if (error.response && error.response.data) {
        //             // 서버에서 반환한 에러메세지 출력
        //             // alert(error.response.data);
        //             setErrorMessage([error.response.data]);
        //             setUsername("")
        //             setUserid("")
        //             setPassword("")
        //             setPasswordConfirm("")
        //             setEmail("")
        //         } else {
        //             console.log(error);
        //         }
        //     }
        // }
    }

    return (
        <div>
            
            <PC>
                <div className='container' >
                    <div className='content'>
                    <h1>BeatBuddy</h1>
                        <div>
                            <div className='content__forgot-buttons'>
                                <button>
                                    <span><b> Facebook으로 로그인 </b></span>
                                </button>
                            </div>

                            <div className='content__or-text'>
                                <span></span>
                                <span> or </span>
                                <span></span>
                            </div>
                            <br/>

                            <form className='content__form'>
                                <div className='content__input'>
                                    <label className='form-label' htmlFor='email'>
                                        <input onChange={onChange} type="email" id="email" name="email" placeholder="이메일" ></input>
                                    </label>

                                    <label className='form-label' htmlFor='username'>
                                        <input onChange={onChange} type='text' id="username" name='username' placeholder='성명' ></input>
                                    </label>

                                    <label className='form-label' htmlFor='userid'>
                                        <input onChange={onChange} value={userid} type='text' id="userid" name='userid' placeholder='사용자이름 '></input>
                                    </label>
                                    <label className='form-label' htmlFor='password'>
                                        <input onChange={onChange} type="password"  id="password" name="password" placeholder="비밀번호" autoComplete="new-password"></input>
                                    </label>
                                </div>
                                <br/>
                                <button type='submit'><b>가입</b></button>
                            </form>
                        </div>
                    </div>
                </div>
            </PC>

            <Mobile>
                <div className='container'>
                    <div className='content'>
                    <h1>BeatBuddy</h1>
                        <div>
                            <div className='content__forgot-buttons'>
                                <button>
                                    <span><b> Facebook으로 로그인 </b></span>
                                </button>
                            </div>

                            <div className='content__or-text'>
                                <span></span>
                                <span> or </span>
                                <span></span>
                            </div>
                            <br/>

                            <form className='content__form'>
                                <div className='content__input'>
                                    <label className='form-label' htmlFor='email'>
                                        <input onChange={onChange} type="email" id="email" name="email" placeholder="이메일" ></input>
                                    </label>
                                    
                                    <label className='form-label' htmlFor='username'>
                                        <input onChange={onChange} type='text' id="username" name='username' placeholder='성명' ></input>
                                    </label>
                                    <label className='form-label' htmlFor='userid'>
                                        <input onChange={onChange} value={userid} type='text' id="userid" name='userid' placeholder='사용자이름 '></input>
                                    </label>
                                    <label className='form-label' htmlFor='password'>
                                        <input onChange={onChange} type="password"  id="password" name="password" placeholder="비밀번호" autoComplete="new-password"></input>
                                    </label>
                                </div>
                                <br/>
                                <button type='submit'><b>가입</b></button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </Mobile>

        </div>
    );
}

export default SignUp;