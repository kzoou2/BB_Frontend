import React, { useEffect, useRef, useState } from 'react';
import ModalContainer from '../../components/ModalContainer';
import { Button, Contents, ModalWrap, Overlay } from '../../style/PostModal_Style';
import { AiFillPicture } from "react-icons/ai";
import useOutSideClick from '../../components/useOutSideClick';
import PlayListText from '../PlayList/PlayListText';

function PlayListPicChoose({ onClose }) {
    const modalRef = useRef(null);
    const [isPlayListTextOpen, setIsPlayListTextOpen] = useState(false);
    const goPlayListText = () => {
        console.log("사진 선택 완료")
        setIsPlayListTextOpen(true);
    }
    const handleClose = () => {
        onClose?.();
    };
    useEffect(() => {
        const $body = document.querySelector("body");
        const overflow = $body.style.overflow;
        $body.style.overflow = "hidden";
        return () => {
            $body.style.overflow = overflow
        };
    }, []);

    useOutSideClick(modalRef, handleClose);

    return (
        <div>
            {isPlayListTextOpen ? null : (
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
                                    <Button className='btn btn-primary' onClick={() => goPlayListText()}>Next</Button>
                                </div>
                            </Contents>
                        </ModalWrap>
                    </Overlay>
                </ModalContainer>
            )}

            {isPlayListTextOpen && (<PlayListText
                open={isPlayListTextOpen}
                onClose={() => {
                    setIsPlayListTextOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
            />)}
        </div>
    );
}

export default PlayListPicChoose;