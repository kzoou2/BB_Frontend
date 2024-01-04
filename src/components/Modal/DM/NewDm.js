import React, { useRef, useState} from 'react';
import ModalContainer from '../Config/ModalContainer';
import { Contents, ModalWrap, Overlay, Button } from '../../../style/styled_components/PostModal_Style';
import useOutSideClick from '../../../hooks/useOutSideClick';
import { CloseButton } from 'react-bootstrap';
import axios from 'axios';

function NewDm({ onClose }){
    const modalRef = useRef(null);
    const [nickname, setNickname] = useState('');

    const handleClose = () => {
        onClose?.();
    }

    const handleNewChatRoom = async () =>{
        try{
            const res = await axios.post(`https://9d71-121-143-39-62.ngrok-free.app/create-room`,
            {
                nickname: nickname,
            },
            // {
            //     headers: {
            //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
            //     },
            // }
            );

            if (res.ok){
                onClose?.();
            } else{
                console.error("새로운 채팅방 생성에 실패했습니다.")
            }
            
        } catch(error){
            console.error("새로운 채팅방 만드는 중 오류 발생했습니다.", error);
        }
    }

    useOutSideClick(modalRef, handleClose)

    return(
        <div>
            <ModalContainer>
                <Overlay>
                    <ModalWrap ref={modalRef}>
                        <Contents>
                            <div className='d-flex justify-content-center align-items-center'>
                                <h5><b> 새로운 메시지 </b></h5>
                                <CloseButton onClick={handleClose}>&times;</CloseButton>
                            </div>

                            <hr/>
                            <div className='d-flex justify-content-center align-items-center'>
                                <span><b> 받는사람: </b></span>
                                <div style={{ width: '10px' }}></div> 
                                <input type='text' className="form-control" style={{ width: "80%" }}  placeholder='검색...' onChange={(e) => setNickname(e.target.value)} />
                            </div>
                            <hr/>
                            
                            <div>
                                <h5> 검색 결과 리스트 </h5>
                            </div>

                            <div className='justify-content-center'>
                                <Button onClick={handleNewChatRoom}> 채팅 </Button>
                            </div>
                        </Contents>
                    </ModalWrap>
                </Overlay>
            </ModalContainer>

        </div>
    );
}

export default NewDm;