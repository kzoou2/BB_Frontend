import React, { useEffect, useRef } from 'react';
import { SiHeadspace } from "react-icons/si";
import { useNavigate } from 'react-router-dom';
import { Overlay, ModalWrap, Contents, Button } from '../../style/PostModal_Style';
import ModalContainer from '../../components/ModalContainer';
import useOutSideClick from '../../components/useOutSideClick';

function FeedTextInput({ onClose }) {
    const navigate = useNavigate();
    const modalRef = useRef(null)
    const postFeed = () => {
        console.log("글 게시 완료")
        navigate(`/`)
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
                            <h3 className='d-flex justify-content-center'>New Post (FeedTextInput)</h3>
                            <div className='d-flex justify-content-center'>
                                <hr style={{ width: "80%" }} />
                            </div>

                            <div className='d-flex justify-content-center mb-3'>
                                <a href='/profile'><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                            </div>

                            <div className='d-flex flex-column align-items-center mb-3'>
                                <input type="text" className="form-control mb-2" placeholder="" style={{ width: "70%", height: "200px" }} />
                                <input type="text" className="form-control" placeholder="해시태그를 추가하세요." style={{ width: "70%", height: "100px" }} />
                            </div>

                            <div className='d-flex justify-content-center'>
                                <Button className='btn btn-primary' onClick={() => postFeed()}>Post</Button>
                            </div>
                        </Contents>
                    </ModalWrap>
                </Overlay>
            </ModalContainer>
        </div>
    );
}

export default FeedTextInput;