import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PC,Mobile } from "../../Responsive";
import ModalContainer from "../Config/ModalContainer";
import { Contents, ModalWrap, Overlay} from "../../../style/styled_components/PostModal_Style";
import useOutSideClick from "../../../hooks/useOutSideClick";
import { CloseButton } from 'react-bootstrap';
import { FaCircleCheck } from "react-icons/fa6";

function ProfileDelete({onClose}){
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const [step, setStep] = useState("confirm");
    const handleClose = ()=>{
        onClose?.();
    };


    const handleDeleteUser = async () =>{
        try{
            const res = await axios.delete(`http://localhost:8080/api/v1/users/deleteUser`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            console.log("회원탈퇴 성공", res.data);
            setStep("success");

            setTimeout(() => {
                navigate("/login");
                handleClose();
            }, 4000);
            
        } catch(error){
            console.log("회원탈퇴 에러 발생", error);
        }
    }

    useOutSideClick(modalRef, handleClose)

    return(
        <div>
            <PC>
                <div>
                    <ModalContainer>
                        <Overlay>
                            <ModalWrap ref={modalRef}>
                            <CloseButton className="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}></CloseButton>
                                <Contents>
                                    <div className="d-flex flex-column align-items-center text-center px-4 py-4">
                                        <img className="mb-1" src='https://raw.githubusercontent.com/kzoou2/kzoou2/main/assets/293721930-ba3957b2-2b3c-4f55-8426-008dfc56e00b1.png' alt='BeatBuddy' width={'70%'} />
                                        <h3 className="fw-bold mb-1">회원탈퇴</h3>
                                        <hr className="my-3" style={{ width: "80%" }} />
                                        {step === "confirm" && (
                                        <>
                                            <p className="mt-3 fs-5">정말 탈퇴하시겠습니까?</p>
                                            <p className="mt-2" style={{ color:'#9CA3AF'}}>
                                                탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다.
                                            </p>

                                            <div className="d-flex justify-content-center gap-3 mt-5">
                                                <button className="btn btn-outline-secondary px-4" onClick={handleClose}>취소</button>
                                                <button className="btn px-4" style={{ backgroundColor: '#FF5E5E', color: 'white' }}  onClick={handleDeleteUser}>탈퇴</button>
                                            </div>
                                        </>
                                        )}

                                        {step === "success" && (
                                        <>
                                            <h5 className="mt-3"><FaCircleCheck /> 탈퇴가 완료되었습니다. </h5>
                                            <p className="text-muted small">이용해주셔서 감사합니다.</p>
                                        </>
                                        )}
                                    </div>

                                </Contents>
                            </ModalWrap>
                        </Overlay>
                    </ModalContainer>
                </div>
            </PC>
            <Mobile>
                
            </Mobile>
        </div>
    )
};

export default ProfileDelete;