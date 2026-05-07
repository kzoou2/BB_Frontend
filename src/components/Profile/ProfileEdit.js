import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {PC, Mobile} from "../Responsive";

import Loading from "../Loading";
import { useParams } from "react-router-dom";

import "../../style/css/Edit.css";
import ProfileDelete from "../Modal/Profile/ProfileDelete";
import { GrEdit } from "react-icons/gr";
import { useSetRecoilState } from "recoil";
import {userNicknameAtom} from '../../state/UserAtom'
import { PrimaryButton,SecondaryButton,Button } from "../../style/styled_components/Button_Style";


function ProfileEdit (){
    const {nickName} = useParams();
    const navigate = useNavigate();
    const setUserNickname = useSetRecoilState(userNicknameAtom);
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [isUserDelete, setIsUserDelete] = useState(false);
    const [formData, setFormData] = useState({
        userName:"",
        nickName:"",
        imgSrc:"",
        gender:"",
        birth:"",
        profilePicture: null, // 파일 자체를 저장
        profilePictureUrl: "", // 파일 URL을 저장
    });

    const goProfileDelete = ()=>{
        setIsUserDelete(true);
    }
    
    const UserInfo = async (nickName) =>{
        setIsLoading(true); // API 호출 전에 true로 설정하여 로딩화면 띄우기
        try{
            const res = await axios.get(`http://localhost:8080/api/v1/users/info/${nickName}`, {
                headers: {
                    'Content-Type': `application/json`,
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            setUserData(res.data)
            setFormData({
                userName: res.data.userName,
                nickName: res.data.nickName,
                // imgSrc: res.data.imgSrc,
                gender: res.data.gender,
                birth: res.data.birth,
            });
        } catch(error){
            console.error('사용자 정보 api 호출 중 에러 발생', error)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(()=>{
        UserInfo(nickName);
    },[nickName]);

    const handleFormChange = (e)=>{
        const { name, value}= e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = async (e) =>{
        e.preventDefault();
        try{
            const formDataWithImage = new FormData();
            
            if (formData.profilePicture) {
                formDataWithImage.append('imageFile', formData.profilePicture);
            }

            const updateInfoJson = JSON.stringify({
                userName: formData.userName,
                nickName: formData.nickName,
                gender: formData.gender,
                birth: formData.birth,
            });
            formDataWithImage.append('updateInfo', new Blob([updateInfoJson], { type: 'application/json' }));

            const userUpdateRes = await axios.put(`http://localhost:8080/api/v1/users/updateUser`,formDataWithImage, {
                headers:{
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            console.log('유저정보 수정 성공', userUpdateRes.data);
            setUserNickname(formData.nickName);
            UserInfo(nickName);

            navigate(`/profile/${formData.nickName}`);
        } catch (error){
            console.log('유저정보 수정 중 오류 발생', error);
            }
    }

    const handleFormChangeFile = (e) => {
        const file = e.target.files[0];
        
        // 파일을 읽어오기 위한 FileReader 객체 생성
        const reader = new FileReader();

        // 파일 읽기가 완료되면 실행되는 콜백 함수
        reader.onloadend = () => {
          // 읽어온 파일의 URL을 formData에 추가
        setFormData((prevData) => ({...prevData, 
            profilePicture: file,
            // profilePictureUrl은 새로운 파일의 URL로 설정됩니다.
            profilePictureUrl: reader.result,
            }));
        };
        // 파일 읽기 시작
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleCancel = () =>{
        navigate(`/profile/${userData.nickName}`);
    };

    return(
        <div>
            <PC>
                {isLoading ? <Loading /> : null}
                <div className="P-container">
                    <div className="profile-edit-container">
                        <div className="profile-header">
                            <div className="header-text">프로필 편집</div>
                            <button className="withdraw-btn" type="submit" onClick={() => goProfileDelete()}>회원탈퇴</button>
                        </div>
                        
                        <form className="profile-edit-form" onSubmit={handleFormSubmit}>
                            <div className="profile-picture-section">
                                {formData.profilePictureUrl ? (
                                    <div className="profile-image-wrapper" onClick={() => document.getElementById("fileInput").click()}>
                                        <img className="profile-image" src={formData.profilePictureUrl} alt="프로필 이미지" />
                                        <div className="hover-overlay"><GrEdit/></div>
                                    </div>
                                ) : (
                                    userData.userImgSrc && (
                                        <div className="profile-image-wrapper" onClick={() => document.getElementById("fileInput").click()}>
                                            <img className="profile-image" src={userData.userImgSrc} alt="프로필 이미지" />
                                            <div className="hover-overlay"><GrEdit/></div>
                                        </div>
                                    )
                                )}
                                <label className="file-input-label">
                                    <input id="fileInput" type="file" name="userimgSrc" accept="image/*" onChange={handleFormChangeFile} style={{ display: 'none' }}/>
                                </label>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">이메일</label>
                                <div className="tooltip-wrapper" data-tooltip="이메일은 변경할 수 없습니다.">
                                    <input className="form-input read-only" readOnly value={userData.email} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">닉네임</label>
                                <input className="form-input" type="text" name="nickName" value={formData.nickName} onChange={handleFormChange} />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">이름</label>
                                <input className="form-input" type="text" name="userName" value={formData.userName} onChange={handleFormChange} />
                            </div>

                            <div className="form-group-inline">
                                <div className="form-group half-width">
                                    <label className="form-label">성별</label>
                                    <select className="form-select" name="gender" value={formData.gender} onChange={handleFormChange}>
                                        <option value="">선택</option>
                                        <option value="남">남</option>
                                        <option value="여">여</option>
                                    </select>
                                </div>
                                <div className="form-group half-width">
                                    <label className="form-label">생일</label>
                                    <input className="form-input" type="date" name="birth" value={formData.birth} onChange={handleFormChange} />
                                </div>
                            </div>

                            <div className="button-group">
                                <SecondaryButton className="btn" onClick={handleCancel} type="button" >취소</SecondaryButton>
                                <PrimaryButton className="btn" type="submit" >수정</PrimaryButton>
                            </div>
                        </form>

                    </div>
                </div>

                {isUserDelete &&(
                    <ProfileDelete
                        open={isUserDelete}
                        onClose={()=>{
                            setIsUserDelete(false);
                        }}
                    />
                )}
            </PC>

            <Mobile>
                <div className="P-container">
                    <div className="profile-edit-container">
                        <div className="profile-header">
                            <div className="header-text">프로필 편집</div>
                            <button className="withdraw-btn" type="submit" onClick={() => goProfileDelete()}>회원탈퇴</button>
                        </div>
                        
                        
                        <form className="profile-edit-form" onSubmit={handleFormSubmit}>
                            <div className="profile-picture-section">
                                {formData.profilePictureUrl ? (
                                    <div className="profile-image-wrapper" onClick={() => document.getElementById("fileInput").click()}>
                                        <img className="profile-image" src={formData.profilePictureUrl} alt="프로필 이미지" />
                                        <div className="hover-overlay"><GrEdit/></div>
                                    </div>
                                ) : (
                                    userData.userImgSrc && (
                                        <div className="profile-image-wrapper" onClick={() => document.getElementById("fileInput").click()}>
                                            <img className="profile-image" src={userData.userImgSrc} alt="프로필 이미지" />
                                            <div className="hover-overlay"><GrEdit/></div>
                                        </div>
                                    )
                                )}
                                <label className="file-input-label">
                                    <input id="fileInput" type="file" name="userimgSrc" accept="image/*" onChange={handleFormChangeFile} style={{ display: 'none' }}/>
                                </label>
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">이메일</label>
                                <div className="tooltip-wrapper" data-tooltip="이메일은 변경할 수 없습니다.">
                                    <input className="form-input read-only" readOnly value={userData.email} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">닉네임</label>
                                <input className="form-input" type="text" name="nickName" value={formData.nickName} onChange={handleFormChange} />
                            </div>
                            
                            <div className="form-group">
                                <label className="form-label">이름</label>
                                <input className="form-input" type="text" name="userName" value={formData.userName} onChange={handleFormChange} />
                            </div>

                            <div className="form-group-inline">
                                <div className="form-group half-width">
                                    <label className="form-label">성별</label>
                                    <select className="form-select" name="gender" value={formData.gender} onChange={handleFormChange}>
                                        <option value="">선택</option>
                                        <option value="남">남</option>
                                        <option value="여">여</option>
                                    </select>
                                </div>
                                <div className="form-group half-width">
                                    <label className="form-label">생일</label>
                                    <input className="form-input" type="date" name="birth" value={formData.birth} onChange={handleFormChange} />
                                </div>
                            </div>

                            <div className="button-group">
                                <SecondaryButton className="btn" Click={handleCancel} type="button" >취소</SecondaryButton>
                                <PrimaryButton className="btn" type="submit" >수정</PrimaryButton>
                            </div>


                        </form>

                    </div>
            </div>
            </Mobile>
        </div>

    );
}

export default ProfileEdit;