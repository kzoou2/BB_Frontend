import React, { useRef } from 'react';
import ModalContainer from '../Config/ModalContainer';
import { Contents, ModalWrap, Overlay, Button } from '../../../style/styled_components/PostModal_Style';
import useOutSideClick from '../../../hooks/useOutSideClick';
import { CloseButton } from 'react-bootstrap';

function NewDm({ onClose }){
    const modalRef = useRef(null);

    const handleClose = () => {
        onClose?.();
    }

    useOutSideClick(modalRef, handleClose)

    return(
        <div>
            <ModalContainer>
                <Overlay>
                    <ModalWrap ref={modalRef}>
                        <Contents>
                            <div className='d-flex justify-content-center align-items-center'>
                                <h5><b> 새로운 메시지 </b></h5>
                                <CloseButton onClick={handleClose}>&times;</CloseButton>
                            </div>

                            <hr/>
                            <div className='d-flex justify-content-center align-items-center'>
                                <span><b> 받는사람: </b></span>
                                <div style={{ width: '10px' }}></div> 
                                <input type='text' className="form-control" style={{ width: "80%" }}  placeholder='검색...' />
                            </div>
                            <hr/>
                            
                            <div>
                                <h5> 검색 결과 리스트 </h5>
                            </div>

                            <div className='justify-content-center'>
                                <Button> 채팅 </Button>
                            </div>
                        </Contents>
                    </ModalWrap>
                </Overlay>
            </ModalContainer>

        </div>
    );
}

export default NewDm;