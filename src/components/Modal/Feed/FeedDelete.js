import React, {useState,useRef} from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { PC,Mobile } from "../../Responsive";
import ModalContainer from "../Config/ModalContainer";
import { Contents, DeleteModalWrap, Overlay } from "../../../style/styled_components/PostModal_Style";
import useOutSideClick from "../../../hooks/useOutSideClick";
import { CloseButton } from 'react-bootstrap';
import { MdDeleteForever } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

function FeedDelete({ onClose, feedId }){
    const modalRef = useRef(null);
    const navigate = useNavigate();
    const [step, setStep] = useState("confirm");
    const handleClose = () => {
        onClose?.();
    };

    const handleDeleteClick = async () =>{
        try{
            const res = await axios.delete(`http://localhost:8080/api/feeds/${feedId}`,{
                headers: {
                    'Content-Type': `application/json`,
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            console.log("삭제성공",res.data);
            // handleClose();
            setStep("success");
            setTimeout(() => {
                handleClose(); // 삭제 후 2초 뒤 모달 닫기
            }, 3000);

        } catch(error){
            console.error("에러발생", error);
        }
    }

    useOutSideClick(modalRef, handleClose)

    return(
        <div>
            <PC>
                <div>
                    <ModalContainer>
                        <Overlay>
                            <DeleteModalWrap ref={modalRef}>
                                <CloseButton className="btn-close btn-close-white" aria-label="Close" onClick={handleClose} style={{ position: 'absolute', top: '10px', right: '10px' }}></CloseButton>
                                <Contents style={{ padding: '20px', margin: '0 auto', textAlign: 'center'}}>
                                    {step === "confirm" && (
                                    <>
                                        <MdDeleteForever size={50} color="#dc3545" style={{ margin: '15px' }} />
                                        <h3 className="mb-3" style={{ color: '#fff' }}>게시글을 삭제할까요?</h3>
                                        <p style={{ fontSize: '16px', color: '#ccc' }}>삭제한 게시글은 복구할 수 없습니다.</p>
                                        <div className="d-flex justify-content-center">
                                            <hr style={{ width: "80%", borderColor: "#555" }} />
                                        </div>
                                        <div className="d-flex justify-content-center mt-2 pt-2">
                                            <div className="me-3">
                                                <button className="btn btn-danger px-4 py-2" style={{ fontSize: '16px' }} onClick={handleDeleteClick}>
                                                    삭제하기
                                                </button>
                                            </div>
                                            <div>
                                                <button className="px-4 py-2" style={{borderRadius: '8px',backgroundColor: '#ffffff15',border: '1px solid #555',color: '#fff', padding: '8px 16px',transition: 'background-color 0.3s ease' }} onClick={handleClose}>
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
                                                게시글 삭제가 완료되었습니다.
                                            </h5>
                                        </div>
                                        </>
                                    )}
                                </Contents>
                            </DeleteModalWrap>
                        </Overlay>
                    </ModalContainer>
                </div>
            </PC>


            <Mobile></Mobile>
        </div>
    );
}

export default FeedDelete;