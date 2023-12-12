import React, { useState } from 'react';
import { PC, Mobile } from '../components/Responsive';
import { Link, useNavigate } from 'react-router-dom';
import '../style/css/Login.css';
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from 'axios';

function Login() {
    const [isLogin, setIsLogin ] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function onChange(event) {
    if (event.target.name === "email") {
      setEmail(event.target.value)
    } else if (event.target.name === "password") {
      setPassword(event.target.value)
    }
  };

  const clientId = '293049760557-j0ki70fdjtfcltgd712dtghlf8gntq33.apps.googleusercontent.com'

  async function onSubmit(event) {
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
      try {
        const result = await axios.post("http://localhost:8080/api/v1/users/login", {
          email: email,
          password: password
        })

        if (result.status === 200) {
          console.log("로그인 성공:", result);
          // 수정: setIsLogin 함수 호출 시 boolean 값을 전달
          setIsLogin(true);
          navigate("/");
        }
      } catch (error) {
        if (error.response && error.response.data) {
          // 수정: 오류 응답에서 오류 메시지를 문자열로 추출
          setErrorMessage([error.response.data.message]); // 오류 메시지가 'message' 속성에 있는 경우를 가정
          setEmail("");
          setPassword("");
        } else {
          console.log("로그인 실패:", error);
        }
      }
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
                  </label>
                  <label className="form-label" htmlFor="password">
                    <input onChange={onChange} type='password' id='password' name='password' placeholder='비밀번호' autoComplete='current-password' />
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
                    onSuccess={async(res) => {
                      console.log("Google Login Success:", res);
                      setIsLogin(true);
                      navigate("/");
                    }}
                    onFailure={(err) => {
                      console.log("Google Login Failure:", err);
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
    </div>
  );
}

export default Login;
