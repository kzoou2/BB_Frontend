import React, { useEffect, useRef, useState } from 'react';
import ModalContainer from '../Config/ModalContainer';
import { Contents, ModalWrap, Overlay } from '../../../style/styled_components/PostModal_Style';
import { FaItunesNote } from "react-icons/fa6";
import { BsMusicNoteList } from "react-icons/bs";
import useOutSideClick from '../../../hooks/useOutSideClick';
import MusicSearch from './MusicSearch';
import PlayListSearch from '../PlayList/PlayListSearch';

function CreatePost({ onClose }) {
    const modalRef = useRef(null);
    const [isMusicSearchOpen, setIsMusicSearchOpen] = useState(false);
    const [isPlayListSearchOpen, setIsPlayListSearchOpen] = useState(false);

    const goMusicSearch = () => {
        setIsMusicSearchOpen(true);
    }

    const goPlayListSearch = () => {
        setIsPlayListSearchOpen(true);
    }

    const handleClose = () => {
        onClose?.();
    }
    
    useEffect(() => {
        const $body = document.querySelector("body");
        const overflow = $body.style.overflow;
        $body.style.overflow = "hidden";
        return () => {
            $body.style.overflow = overflow
        };
    }, []);

    useOutSideClick(modalRef, handleClose)

    return (
        <div>
            {isMusicSearchOpen || isPlayListSearchOpen ? null : (
                <ModalContainer>
                    <Overlay>
                        <ModalWrap ref={modalRef}>
                            <Contents>
                                <h3 className='d-flex justify-content-center'>New Post</h3>
                                <div className='d-flex justify-content-center mb-3'>
                                    <hr style={{ width: "80%" }} />
                                </div>

                                <div className='d-flex justify-content-center mt-5 pt-5'>
                                    <div className='me-5' onClick={() => goMusicSearch()} style={{ cursor: "pointer" }}>
                                        <FaItunesNote className='mb-3' size='130' color='black' />
                                        <h5 className='ms-3'>Create Post</h5>
                                    </div>
                                    <div className='ms-5' onClick={() => goPlayListSearch()} style={{ cursor: "pointer" }}>
                                        <BsMusicNoteList className='ms-4 mb-3' size='130' color='black' />
                                        <h5 className='ms-3'>Create PlayList</h5>
                                    </div>
                                </div>
                            </Contents>
                        </ModalWrap>
                    </Overlay>
                </ModalContainer>
            )}

            {isMusicSearchOpen && (<MusicSearch
                open={isMusicSearchOpen}
                onClose={() => {
                    setIsMusicSearchOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
            />)}

            {isPlayListSearchOpen && (<PlayListSearch
                open={isPlayListSearchOpen}
                onClose={() => {
                    setIsPlayListSearchOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
            />)}
        </div>
    );
}

export default CreatePost;