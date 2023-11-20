import React, { useState } from 'react';
import { PC, Mobile } from '../components/Responsive';
import { func } from 'prop-types';

function Login({isLogin, setIsLogin}) {

    const [ userid, setUserid ] = useState("");
    const [ password, setPassword ] = useState(""); 

    function onChange(event){
        if(event.target.name === "userid"){
            setUserid(event.target.value)
        } else if(event.target.name === "password"){
            setPassword(event.target.value)
        }
    }

    // async function onSubmit(event){
    //     event.preventDefault();
        
    //     const newErrorMessages = []
    //     if (userid === "") {
    //         newErrorMessages.push("아이디를 입력하세요.");
    //     }
    //     if (password === "") {
    //         newErrorMessages.push("비밀번호를 입력하세요.");
    //     }

    //     setErrorMessage(newErrorMessages);

    //     if (newErrorMessages.length === 0 ) {

    //     }
    // }
    return (

        <div>
            <PC>
                <div className='container my-3'>
                    <div >
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <form  style={{width: '400px'}}>
                                <div className='form-floating mb-3'>
                                    <input onChange={onChange} type='text' className='form-control' id='userid' name='userid' placeholder='사용자 이름'></input>
                                    <label className='form-label' htmlFor='userid'>아이디</label>
                                </div>

                                <div className='form-floating mb-3'>
                                    <input onChange={onchange} type='password' className='form-control' id='password' name='password' placeholder='password' autoComplete='current-password'></input>
                                    <label className="form-label" htmlFor="password">비밀번호</label>
                                </div>

                                <button type="sumbit" className="btn btn-primary" ><b>Login</b></button>
                                <hr/>

                            </form>
                        </div>

                        <div>
                            <h4>계정이 없으신가요?</h4>
                        </div>

                    </div>
                </div>
            </PC>


            <Mobile>
                <h1> 핸드폰 </h1>
            </Mobile>
        </div>

    );
}

export default Login;