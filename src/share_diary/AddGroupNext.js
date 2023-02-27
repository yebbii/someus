import axios from "axios";
import { useState, useRef, useEffect } from "react";
import './addgroup.css';
import jwt_decode from "jwt-decode";


const AddGroupNext = (props, { history }) => {

    const [memberId, setMemberId] = useState('');
    const [shareRoomId, setShareRoomId] = useState(0);
    const [shareMemberId, setShareMemberId] = useState('');
    const { modalState, setModalState } = props;

    useEffect(() => {

        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setMemberId(decode_token.sub);

        let memberId = decode_token.sub;


        axios.get(`http://localhost:8080/api/someus/addgroup/${memberId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setShareRoomId(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/someus/addgroupnext`,

            [{
                "shareRoomId": shareRoomId,
                "memberId": memberId
            },
            {
                "shareRoomId": shareRoomId,
                "memberId": shareMemberId
            }
            ],
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } }
        )
            .then((response) => {
                console.log(response);
                console.log(memberId);
                console.log(shareMemberId);
                alert(`정상적으로 등록되었습니다.`);
                props.handlerSubmit();

            })
            .catch((error) => {
                alert(`해당 아이디를 이용하는 사용자가 없습니다.`);
                console.log(error);
            })
    };

    const handlerChangeShareMemberId = (e) => {
        setShareMemberId(e.target.value);
    };

    return (
        <>
            <div className="add-modal" onClick={() => props.closeModal}>
                <div className="add-modalBody" onClick={(e) => e.stopPropagation()}>
                    <div className="addgroup_background" >
                        <div className="addgroup_box">
                            <div className="groupdiary" alt="GroupDiaryNew"></div>
                            <div className="add-form">
                                <div className="grouptitle">
                                    <span className="grouptitleimg"></span>
                                    <input className="add-input" type="text"
                                        value={shareMemberId}
                                        onChange={handlerChangeShareMemberId}
                                        placeholder='함께할 친구의 아이디를 입력해 주세요.' />
                                </div>
                                <button className="add-button" type="button" onClick={onSubmit}>등록</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddGroupNext;