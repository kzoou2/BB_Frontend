import React, { useEffect, useRef, useState } from 'react';
import { Overlay, ModalWrap, Contents, Button } from '../../style/PostModal_Style';
import ModalContainer from '../../components/ModalContainer';
import useOutSideClick from '../../components/useOutSideClick';
import FeedPicChoose from './FeedPicChoose';

function MusicChoose({ onClose }) {
    const modalRef = useRef(null)
    const [isFeedPicChooseOpen, setIsFeedPicChooseOpen] = useState(false);
    const goFeedPicChoose = () => {
        console.log("음악 선택 완료")
        setIsFeedPicChooseOpen(true);
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
            <ModalContainer>
                <Overlay>
                    <ModalWrap ref={modalRef}>
                        <Contents>
                            <h3 className='d-flex justify-content-center'>New Post (MusicChoose)</h3>
                            <div className='d-flex justify-content-center mb-3'>
                                <hr style={{ width: "80%" }} />
                            </div>

                            <div className='d-flex justify-content-center mt-5 mb-5'>
                                <h3>앨범 사진 리스트</h3>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <Button onClick={() => goFeedPicChoose()}>Next</Button>
                            </div>
                        </Contents>
                    </ModalWrap>
                </Overlay>
            </ModalContainer>

            {isFeedPicChooseOpen && (<FeedPicChoose
                open={isFeedPicChooseOpen}
                onClose={() => {
                    setIsFeedPicChooseOpen(false);
                }}
            />)}
        </div>
    );
}

export default MusicChoose;