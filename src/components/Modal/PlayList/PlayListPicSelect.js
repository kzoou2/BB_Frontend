import React, { useEffect, useRef, useState } from 'react';
import ModalContainer from '../Config/ModalContainer';
import { Button, Contents, ModalWrap, Overlay } from '../../../style/styled_components/PostModal_Style';
import { AiFillPicture } from "react-icons/ai";
import useOutSideClick from '../../../hooks/useOutSideClick';
import PlayListText from './PlayListText';

function PlayListPicSelect({ onClose }) {
    const modalRef = useRef(null);
    const inputFileRef = useRef(null);
    const [isPlayListTextOpen, setIsPlayListTextOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState('');

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

    const onUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            setImageSrc(event.target.result);
        };
        reader.readAsDataURL(file);
    }

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
                                    {(imageSrc === '') ? (
                                        <AiFillPicture className='mb-3' size='300' color='lightblue' />
                                    ) : (
                                        <img style={{ width: "50%", height: "50%" }} src={imageSrc} alt="Album cover"></img>
                                    )}
                                </div>

                                <div className='d-flex justify-content-center mb-5'>
                                    <Button type="button" className="btn btn-primary me-3" onClick={() => inputFileRef.current.click()}>Change Image</Button>
                                    <input ref={inputFileRef} accept="image/*" multiple type="file" style={{ display: 'none' }} onChange={(e) => onUpload(e)} />
                                    <Button className='btn btn-primary' onClick={() => goPlayListText()}>Next</Button>
                                </div>
                            </Contents>
                        </ModalWrap>
                    </Overlay>
                </ModalContainer>
            )}

            {isPlayListTextOpen && (<PlayListText
                imageSrc={imageSrc}
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

export default PlayListPicSelect;