import React, { useEffect, useRef, useState } from 'react';
import data from '../../../Data/sample_music.json';
import { Overlay, ModalWrap, Contents, Button } from '../../../style/styled_components/PostModal_Style';
import ModalContainer from '../Config/ModalContainer';
import useOutSideClick from '../Config/useOutSideClick';
import FeedText from './PostText';

function FeedPicChoose({ onClose }) {
    const modalRef = useRef(null)
    const [isFeedTextOpen, setIsFeedTextOpen] = useState(false);
    const goFeedText = () => {
        console.log("사진 선택 완료")
        setIsFeedTextOpen(true);
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
            {isFeedTextOpen ? null : (
                <ModalContainer>
                    <Overlay>
                        <ModalWrap ref={modalRef}>
                            <Contents>
                                <h3 className='d-flex justify-content-center'>New Post (FeedPicChoose)</h3>
                                <div className='d-flex justify-content-center mb-3'>
                                    <hr style={{ width: "80%" }} />
                                </div>

                                <div className='d-flex justify-content-center mb-3'>
                                    <img style={{ width: "50%", height: "50%" }} src="https://image.bugsm.co.kr/album/images/500/40856/4085673.jpg" alt="Album cover"></img>
                                </div>

                                <div>
                                    <h3 className='d-flex justify-content-center'>{data[0].title}</h3>
                                    <h5 className='d-flex justify-content-center'>{data[0].artist}</h5>
                                    <p className='d-flex justify-content-center'>{data[0].album} · {data[0].release_year}</p>
                                </div>

                                <div className='d-flex justify-content-center mb-5'>
                                    <Button className='btn btn-primary me-3'>Change Picture</Button>
                                    <Button className='btn btn-primary' onClick={() => goFeedText()}>Next</Button>
                                </div>
                            </Contents>
                        </ModalWrap>
                    </Overlay>
                </ModalContainer>
            )}

            {isFeedTextOpen && (<FeedText
                open={isFeedTextOpen}
                onClose={() => {
                    setIsFeedTextOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
            />)}
        </div>
    );
}

export default FeedPicChoose;