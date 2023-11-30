import React, { useEffect, useRef } from 'react';
import ModalContainer from '../../components/ModalContainer';
import { PCContents, MobileContents, PCModalWrap, MobileModalWrap, Overlay } from '../../style/FeedModal_Style';
import useOutSideClick from '../../components/useOutSideClick';
import { Mobile, PC } from '../../components/Responsive';
import { SiHeadspace } from "react-icons/si";
import '../../css/FeedDetail.css'

function FeedDetail({ onClose, music }) {
    const modalRef = useRef(null)
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

    useOutSideClick(modalRef, handleClose)

    return (
        <div>
            <PC>
                <ModalContainer>
                    <Overlay>
                        <PCModalWrap ref={modalRef}>
                            <PCContents>
                                <div className='d-flex justify-content-center'>
                                    <div className='col-md-7'>
                                        <img style={{ width: "100%", height: "100%" }} src={music.album_cover} alt={music.title}></img>
                                    </div>
                                    <div className='col-md-5 ms-3'>
                                        <div className='justify-content-start'>
                                            <a href='/BB_Frontend/profile'><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                                        </div>
                                        <hr />
                                        <div className='text-center'>
                                            <h5>{music.title} · {music.artist}</h5>
                                            <p>{music.album} · {music.release_year}</p>
                                        </div>
                                        <div className='text-start'>
                                            <p>글 내용</p>
                                            <p>해시태그</p>
                                        </div>
                                        <hr />
                                        <div className='text-start'>
                                            <p>댓글 1</p>
                                            <p>댓글 2</p>
                                            <p>댓글 3</p>
                                            <p>댓글 4</p>
                                            <p>댓글 5</p>
                                        </div>
                                        <div className="search">
                                            <input type="text" className="search__input" placeholder="댓글을 입력하세요." />
                                            <button className="search__button"></button>
                                        </div>
                                    </div>
                                </div>
                            </PCContents>
                        </PCModalWrap>
                    </Overlay>
                </ModalContainer>
            </PC>

            <Mobile>
                <ModalContainer>
                    <Overlay>
                        <MobileModalWrap ref={modalRef}>
                            <MobileContents>
                                <div>
                                    <div className='d-flex justify-content-start mb-3'>
                                        <a href='/BB_Frontend/profile'><SiHeadspace className='me-2' size='40' color='gray' />User Nickname</a>
                                    </div>
                                    <div className='d-flex justify-content-center mb-1'>
                                        <img style={{ width: "40%", height: "40%" }} src={music.album_cover} alt={music.title}></img>
                                    </div>
                                    <div className='justify-content-center'>
                                        <div className='text-center'>
                                            <h5>{music.title} · {music.artist}</h5>
                                            <p>{music.album} · {music.release_year}</p>
                                        </div>
                                        <div className='text-start'>
                                            <p>글 내용</p>
                                            <p>해시태그</p>
                                        </div>
                                        <hr />
                                        <div className='text-start'>
                                            <p>댓글 1</p>
                                            <p>댓글 2</p>
                                        </div>
                                        <div className="search">
                                            <input type="text" className="search__input" placeholder="댓글을 입력하세요." />
                                            <button className="search__button"></button>
                                        </div>
                                    </div>
                                </div>
                            </MobileContents>
                        </MobileModalWrap>
                    </Overlay>
                </ModalContainer>
            </Mobile>
        </div>
    );
}

export default FeedDetail;