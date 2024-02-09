import { useEffect, useState } from "react";
import axios from "axios";
import {PC, Mobile} from "../Responsive";
import Navbar from "../Navigation/Navbar";
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import MiniPlayer from "../Player/MiniPlayer";
import "../../style/css/Edit.css";



function ProfileEdit (){
    const {nickName} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [formData, setFormData] = useState({
        userName:"",
        nickName:"",
        imgSrc:"",
        gender:"",
        birth:"",
        profilePicture: null, // 파일 자체를 저장
        profilePictureUrl: "", // 파일 URL을 저장
    })
    
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
                imgSrc: res.data.imgSrc,
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
            const userUpdateRes = await axios.put(`http://localhost:8080/api/v1/users/updateUser`,
            formData,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            console.log('유저정보 수정 성공', userUpdateRes.data);
            

             // 만약 프로필 이미지가 변경되었을 경우에만 사진 업데이트 엔드포인트 호출
            if (formData.profilePicture) {
                const pictureUpdateRes = await axios.post(
                    'http://localhost:8080/api/v1/users/updateImage',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                            'ngrok-skip-browser-warning': '69420',
                        },
                    }
                );
                console.log('프로필 이미지 업데이트 성공', pictureUpdateRes.data);
            }


            UserInfo(nickName);

        } catch (error){
            console.log('유저정보 수정 중 오류 발생', error);
            
            // 프로필 이미지 업데이트 에러 처리
            if (error.response && error.response.data) {
                console.error('프로필 이미지 업데이트 에러', error.response.data);
            }

            // 에러 메시지에 대한 처리를 원하는 대로 추가할 수 있습니다.
            // 예를 들면, 사용자에게 알림을 표시하거나 다른 작업을 수행할 수 있습니다.
            alert('유저정보 수정에 실패했습니다.');
            }
    }

    const handleFormChangeFile = (e) => {
        const file = e.target.files[0];
        
        // 파일을 읽어오기 위한 FileReader 객체 생성
        const reader = new FileReader();

        // 파일 읽기가 완료되면 실행되는 콜백 함수
        reader.onloadend = () => {
          // 읽어온 파일의 URL을 formData에 추가
        setFormData((prevData) => ({
            ...prevData,
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

    return(
        <div>
            <PC>
                <div className="row">
                    {isLoading ? <Loading /> : null}
                    <div className="col-md-2">
                        <Navbar/>
                    </div>

                    <div className="col-md-8">
                        <div className="P-container">
                            <div className="p-header-1"> 프로필 편집</div>
                            <hr/>

                            <div className="p-content">
                                <form className="p-edit-form" onSubmit={handleFormSubmit}>
                                    <div>
                                    {formData.profilePictureUrl ? (
                                            <img src={formData.profilePictureUrl} alt="프로필 이미지" style={{ width: '22%', height: '22%', borderRadius:'50%' }} />
                                        ) : (
                                            userData.userImgSrc && (
                                                <img src={userData.userImgSrc} alt="프로필 이미지" style={{ width: '22%', height: '22%', borderRadius:'50%' }} />
                                            )
                                        )}
                                        <label className="file-input-label">
                                            변경
                                            <input type="file" name="userimgSrc" accept="image/*" onChange={handleFormChangeFile} style={{ display: 'none' }} />
                                        </label>
                                        <p>{formData.email}</p>
                                    </div>


                                    <div className="p-inp">
                                        <label className="p-label">닉네임
                                            <form className="pform">
                                                <label for="search">
                                                    <input className="input" type="text" name="nickName" value={formData.nickName} onChange={handleFormChange}/>
                                                    <div className="fancy-bg"></div>
                                                </label>
                                            </form>
                                        </label>
                                        {/* <input className='p-inp-Field' type="text" name="nickName" value={formData.nickName} onChange={handleFormChange} /> */}

                                    </div>


                                    <div className="p-inp"> 
                                        <label>이름
                                            <div className="group">
                                                <input className='input' type="text" name="userName" value={formData.userName} onChange={handleFormChange}/>
                                            </div>
                                        </label>

                                    </div>


                                    <div className="p-inp">
                                        <label className="p-label">성별
                                            <select name="gender" value={formData.gender} onChange={handleFormChange}>
                                                <option value="">선택</option>
                                                <option value="남">남</option>
                                                <option value="여">여</option>
                                            </select>
                                        </label>
                                    </div>

                                    <div className="p-inp">
                                        <label className="p-label">생일
                                            <input  className='p-inp-Field' type="date" name="birth" value={formData.birth} onChange={handleFormChange} />
                                        </label>
                                        
                                    </div>
                                    <button type="submit" style={{color:'white', borderColor:'white'}}> 수정</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <MiniPlayer/>
                    </div>

                </div>
            </PC>
            <Mobile></Mobile>
        </div>

    );
}

export default ProfileEdit;