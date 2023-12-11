import React, { useEffect, useRef, useState } from 'react';
import ModalContainer from '../Config/ModalContainer';
import { Button, Contents, ModalWrap, Overlay } from '../../../style/styled_components/PostModal_Style';
import useOutSideClick from '../../../hooks/useOutSideClick';
import PlayListPicSelect from './PlayListPicSelect';

function PlayListSearch({ onClose }) {
    const modalRef = useRef(null);
    const [isPlstListPicSelectOpen, setIsPlayListPicSelectOpen] = useState(false);
    const goPlayListPicSelect = () => {
        setIsPlayListPicSelectOpen(true);
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
            {isPlstListPicSelectOpen ? null : (
                <ModalContainer>
                    <Overlay>
                        <ModalWrap ref={modalRef}>
                            <Contents>
                                <h3 className='d-flex justify-content-center'>New PlayList (PlayListSearch)</h3>
                                <div className='d-flex justify-content-center mb-3'>
                                    <hr style={{ width: "80%" }} />
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <input type="text" className="form-control" placeholder="해시태그 검색" style={{ width: "60%" }} />
                                </div>

                                <div className='d-flex justify-content-center mt-5 mb-5'>
                                    <h3>검색 결과 리스트</h3>
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <Button onClick={() => goPlayListPicSelect()}>Next</Button>
                                </div>
                            </Contents>
                        </ModalWrap>
                    </Overlay>
                </ModalContainer>
            )}

            {isPlstListPicSelectOpen && (<PlayListPicSelect
                open={isPlstListPicSelectOpen}
                onClose={() => {
                    setIsPlayListPicSelectOpen(false);
                    if (onClose) {
                        onClose();
                    }
                }}
            />)}
        </div>
    );
}

export default PlayListSearch;