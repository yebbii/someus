import axios from "axios";
import jwt_decode from "jwt-decode";
import { useState, useRef, useEffect } from "react";
import './addgroup.css';
import AddGroupNext from "./AddGroupNext";
import NaviDiary from "../navigation/NaviDiary";

const AddGroup = (props, { history }) => {
    //AddGroupNext모달 값
    // const [ modalState, setModalState ] = useState(false);
    const [shareRoomName, setShareRoomName] = useState('');

    const { handlerClickNext } = props;

    //모달 창
    useEffect(() => {
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
        console.log(props.handlerClickNext);
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

    const modalClose = () => {
        props.closeModal();
        console.log(props.closeModal());
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);

        axios.post(`http://localhost:8080/api/someus/addgroup`,
            {
                "shareRoomName": shareRoomName,
                "memberId": decode_token.sub
            },
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then((response) => {
                console.log(response);
                alert(`${shareRoomName} 정상적으로 등록되었습니다.`);
                setShareRoomName(shareRoomName);
                console.log(shareRoomName);
                handlerClickNext();
                console.log(props.modalStateN);
                console.log(props.modalState);
                // setModalState(false);
                // setModalState(false);

            })
            .catch((error) => {
                alert(`등록에 실패했습니다.`);
                console.log(error);
                return;
            })
    };

    const handlerChangeRoomName = (e) => {
        setShareRoomName(e.target.value);
    };

    return (
        <>
            <div className="add-modal" onClick={props.closeModal}>
                <div className="add-modalBody" onClick={(e) => e.stopPropagation()}>
                    <div className="addgroup_background" >
                        <div className="addgroup_box">
                            <div className="groupdiary" alt="PrivateDiaryNew"></div>
                            <div className="add-form">
                                <div className="grouptitle">
                                    <span className="grouptitleimg"></span>
                                    <input className="add-input" type="text"
                                        value={shareRoomName}
                                        onChange={handlerChangeRoomName}
                                        placeholder='교환 일기의 이름을 정해 주세요.'>
                                    </input>
                                </div>
                                <input className="add-button" type="button" onClick={onSubmit} value='짝꿍 등록하기'></input>
                                {/* {modalState 
                                    && 
                                    <AddGroupNext shareRoomName={shareRoomName} 
                                                    // closeModal={() => closeModal} 
                                                    modalState2 = { modalState2 }
                                                    setModalState2 = { setModalState2 }
                                                    />
                                                    
                                                    } */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default AddGroup;