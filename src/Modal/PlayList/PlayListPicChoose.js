import React, { useRef } from 'react';
import ModalContainer from '../../components/ModalContainer';
import { Button, Contents, ModalWrap, Overlay } from '../../style/PostModal_Style';
import { AiFillPicture } from "react-icons/ai";
import useOutSideClick from '../../components/useOutSideClick';

function PlayListPicChoose({ onClose }) {
    const modalRef = useRef(null);
    const handleClose = () => {
        onClose?.();
    };

    useOutSideClick(modalRef, handleClose);

    return (
        <div>
            <ModalContainer>
                <Overlay>
                    <ModalWrap ref={modalRef}>
                        <Contents>
                            <h3 className='d-flex justify-content-center'>New PlayList (PlayListPicChoose)</h3>
                            <div className='d-flex justify-content-center mb-3'>
                                <hr style={{ width: "80%" }} />
                            </div>

                            <div className='d-flex justify-content-center'>
                                <AiFillPicture className='mb-3' size='300' color='lightblue' />
                            </div>

                            <div className='d-flex justify-content-center mb-5'>
                                <Button className='btn btn-primary me-3'>Change Picture</Button>
                                <Button className='btn btn-primary'>Next</Button>
                            </div>
                        </Contents>
                    </ModalWrap>
                </Overlay>
            </ModalContainer>
        </div>
    );
}

export default PlayListPicChoose;