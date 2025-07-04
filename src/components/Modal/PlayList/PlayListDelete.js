import React, {useRef, useState} from "react";
import axios from 'axios';
import { PC,Mobile } from "../../Responsive";
import { useNavigate } from "react-router-dom";
import ModalContainer from "../Config/ModalContainer";
import { Contents, DeleteModalWrap, Overlay } from "../../../style/styled_components/PostModal_Style";
import useOutSideClick from "../../../hooks/useOutSideClick";
import { CloseButton } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


function PlayListDelete({ onClose,playlistId }){
    const modalRef = useRef(null);
    const [step, setStep] = useState("confirm");
    const navigate = useNavigate();

    const handleClose = () =>{
        onClose?.();
    };

    const handleDelete = async () =>{
        try{
            const res = await axios.delete(`http://localhost:8080/api/playlist/${playlistId}`,{
                headers: {
                    'Content-Type': `application/json`,
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            console.log("삭제 성공", res.data);
            // handleClose();
            setStep("success");
            setTimeout(() => {
                handleClose(); // 삭제 후 2초 뒤 모달 닫기
                navigate("/playlist");
            }, 3000);
        
        } catch(error){
            console.error("에러 발생", error);
        }
    }


    useOutSideClick(modalRef, handleClose)


    return(
        <div>
            <PC>
                <ModalContainer>
                    <Overlay>
                        <DeleteModalWrap>
                            <CloseButton className="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}></CloseButton>
                            {/* <Contents>
                                <h3 className='d-flex justify-content-center'>Delete Post</h3>
                                <div className='d-flex justify-content-center mb-3'>
                                    <hr style={{ width: "80%" }} />
                                </div>

                                <div className='d-flex justify-content-center mt-5 pt-5'>
                                    <div className='me-5'>
                                        <button  className='btn btn-primary' onClick={handleDelete} >삭제</button>
                                    </div>
                                    <div className='me-5'>
                                        <button className='btn btn-primary' onClick={handleClose}>취소</button>
                                    </div>
                                </div>
                            </Contents> */}
                            <Contents style={{ padding: '20px', margin: '0 auto', textAlign: 'center'}}>
                                {step === "confirm" && (
                                <>
                                    <MdDeleteForever size={50} color="#dc3545" style={{ margin: '15px' }} />
                                    <h3 className="mb-3" style={{ color: '#fff' }}>플레이리스트를 삭제할까요?</h3>
                                    <p style={{ fontSize: '16px', color: '#ccc' }}>삭제한 플레이리스트는 복구할 수 없습니다.</p>
                                    <div className="d-flex justify-content-center">
                                        <hr style={{ width: "80%", borderColor: "#555" }} />
                                    </div>
                                    <div className="d-flex justify-content-center mt-2 pt-2">
                                        <div className="me-3">
                                            <button className="btn btn-danger px-4 py-2" style={{ fontSize: '16px' }} onClick={handleDelete}>
                                                삭제하기
                                            </button>
                                        </div>
                                        <div>
                                            <button className="px-4 py-2" style={{borderRadius: '8px',backgroundColor: '#ffffff15',border: '1px solid #555',color: '#fff', padding: '8px 16px',transition: 'background-color 0.3s ease', }} onClick={handleClose}>
                                                취소
                                            </button>
                                        </div>
                                    </div>
                                    
                                </>
                                )}
                                {step === "success" && (
                                    <>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',marginTop:'15%' }}>
                                        <IoMdCheckmarkCircleOutline size={50} color="#FEF164" style={{ marginBottom: '15px' }} />
                                        <h5 className="mt-3" style={{ color: '#fff' }}>
                                            삭제가 완료되었습니다.
                                        </h5>
                                    </div>
                                    </>
                                )}
                            </Contents>
                        </DeleteModalWrap>
                    </Overlay>
                </ModalContainer>
            </PC>
        </div>

    )
};

export default PlayListDelete;