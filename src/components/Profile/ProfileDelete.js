import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PC,Mobile } from "../Responsive";
import ModalContainer from "../Modal/Config/ModalContainer";
import { Contents, ModalWrap, Overlay} from "../../style/styled_components/PostModal_Style";
import useOutSideClick from "../../hooks/useOutSideClick";
import { CloseButton } from 'react-bootstrap';

function ProfileDelete({onClose}){
    const modalRef = useRef(null);
    const navigate = useNavigate();
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
            navigate("/login")
            handleClose();
            
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
                            <CloseButton class="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}></CloseButton>
                                <Contents>
                                <h3 className='d-flex justify-content-center'>회원탈퇴</h3>
                                    <div className='d-flex justify-content-center mb-3'>
                                        <hr style={{ width: "80%" }} />
                                    </div>
                                
                                    <h4 className="d-flex justify-content-center mt-5 pt-5">정말로 회원 탈퇴하시겠습니까?</h4>
                                    <div className='d-flex justify-content-center mt-5 pt-5'>
                                        <div className='me-5'>
                                            <button  className='btn btn-primary' onClick={handleDeleteUser} >탈퇴</button>
                                        </div>
                                        <div className='me-5'>
                                            <button className='btn btn-primary' onClick={handleClose}>취소</button>
                                        </div>
                                    </div>
                                    

                                </Contents>
                            </ModalWrap>
                        </Overlay>
                    </ModalContainer>
                </div>
            </PC>
            <Mobile></Mobile>
        </div>
    )
};

export default ProfileDelete;