import React, { useRef, useState } from 'react';
import { Overlay, ModalWrap, Contents, Button } from '../style/PostModal_Style';
import ModalContainer from '../components/ModalContainer';
import useOutSideClick from '../components/useOutSideClick';
import MusicChoose from './MusicChoose';

function MusicSearch({ onClose }) {
    const modalRef = useRef(null)
    const [isMusicSearchOpen, setIsMusicSearchOpen] = useState(false);
    const goMusicChoose = () => {
        console.log("음악 검색 완료")
        setIsMusicSearchOpen(true);
    }
    const handleClose = () => {
        onClose?.();
    };

    useOutSideClick(modalRef, handleClose);

    return (
        <div className='mt-3'>
            <ModalContainer>
                <Overlay>
                    <ModalWrap ref={modalRef}>
                        <Contents>
                            <h3 className='d-flex justify-content-center'>New Post (MusicSearch)</h3>
                            <div className='d-flex justify-content-center mb-3'>
                                <hr style={{ width: "80%" }} />
                            </div>

                            <div className='d-flex justify-content-center'>
                                <input type="text" className="form-control" placeholder="노래, 앨범, 아티스트 검색" style={{ width: "60%" }} />
                            </div>

                            <div className='d-flex justify-content-center mt-5 mb-5'>
                                <h3>검색 결과 리스트</h3>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <Button onClick={() => goMusicChoose()}>Next</Button>
                            </div>
                        </Contents>
                    </ModalWrap>
                </Overlay>
            </ModalContainer>

            {isMusicSearchOpen && (<MusicChoose
                open={isMusicSearchOpen}
                onClose={() => {
                    setIsMusicSearchOpen(false);
                }}
            />)}
        </div>
    );
}

export default MusicSearch;