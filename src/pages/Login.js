import React, { useState } from 'react';
import { PC, Mobile } from '../components/Responsive';
import '../css/Login.css';
import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";


function Login({isLogin, setIsLogin}) {

    const [ userid, setUserid ] = useState("");
    const [ password, setPassword ] = useState(""); 
    const [ inputValue, setInputValue ] = useState("");


    function onChange(event){
        if(event.target.name === "userid"){
            setUserid(event.target.value)
        } else if(event.target.name === "password"){
            setPassword(event.target.value)
        }
    };
    
    const clientId = '293049760557-j0ki70fdjtfcltgd712dtghlf8gntq33.apps.googleusercontent.com'

    return (

        <div>
            <PC>
                <div className='container' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                    <div className='content'>
                        <h1>BeatBuddy</h1>
                        <div>
                            <form  className='content__form'>
                            {/* <form > */}

                                <div className='content__input'>
                                <label htmlFor='userid'>
                                    <input onChange={onChange} type='text' id='userid' name='userid' placeholder='전화번호, 사용자 이름 또는 이메일'></input>
                                    {/* <span>전화번호, 사용자 이름 또는 이메일 </span> */}
                                </label>
                                <label className="form-label" htmlFor="password">
                                    <input onChange={onchange} type='password' id='password' name='password' placeholder='비밀번호' autoComplete='current-password' />
                                    {/* <span>Password</span> */}
                                </label>
                            </div>

                                <button type="sumbit"><b>Login</b></button>
                                <br/>

                            </form>
                        </div>

                        <div class="content__or-text">
                            <span></span>
                            <span> or </span>
                            <span></span>
                        </div>
                        <div class="content__forgot-buttons">
                        <button>
                            <GoogleOAuthProvider clientId={clientId}>
                                <GoogleLogin
                                    onSuccess={(res) => {
                                        console.log(res);
                                    }}
                                    onFailure={(err) => {
                                        console.log(err);
                                    }}
                                />
                            </GoogleOAuthProvider>
                        </button>
                            <button>비밀번호를 잊으셨나요?</button>
                        </div>

                    </div>
                </div>

                
            </PC>


            <Mobile>
                <h1>모바일</h1>
                <div className='container' style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <div className='content'>
                            <h1>BeatBuddy</h1>
                            <div>
                                <form  className='content__form'>
                                {/* <form > */}

                                    <div className='content__input'>
                                    <label className='form-label' htmlFor='userid'>
                                        <input onChange={onChange} type='text' id='userid' name='userid' placeholder='전화번호, 사용자 이름 또는 이메일'></input>
                                        {/* <span>전화번호, 사용자 이름 또는 이메일 </span> */}
                                    </label>
                                    <label className="form-label" htmlFor="password">
                                        <input onChange={onchange} type='password' id='password' name='password' placeholder='비밀번호' autoComplete='current-password' />
                                        {/* <span>Password</span> */}
                                    </label>
                                </div>

                                    <button type="sumbit"><b>Login</b></button>
                                    <br/>

                                </form>
                            </div>

                            <div class="content__or-text">
                                <span></span>
                                <span> or </span>
                                <span></span>
                            </div>
                            <div class="content__forgot-buttons">
                                <button>
                                <GoogleOAuthProvider clientId={clientId}>
                                    <GoogleLogin
                                        onSuccess={(res) => {
                                            console.log(res);
                                        }}
                                        onFailure={(err) => {
                                            console.log(err);
                                        }}
                                    />
                                </GoogleOAuthProvider>
                            </button>
                                <button>비밀번호를 잊으셨나요?</button>
                            </div>

                        </div>
                    </div>
            </Mobile>
        </div>

    );
}

export default Login;