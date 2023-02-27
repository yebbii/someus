import axios from "axios";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import NaviDiary from "../navigation/NaviDiary";
import AddGroup from "./AddGroup";
import './groupList.css';
import jwt_decode from "jwt-decode";
import GroupShareEach from "./GroupShareEach";
import AddGroupNext from "./AddGroupNext";


const GroupList = ({ name, history, match }) => {

    const { shareroomid } = match.params;
    // 모달
    const [ modalState, setModalState ] = useState(false);
    const [ modalStateN, setModalStateN ] = useState(0);
    
    const [ groupList, setGroupList ] = useState([]);
    const [ memberId, setMemberId ] = useState('');

    const closeModal = () => {
        setModalState(false);
    };

    // 일기
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setMemberId(decode_token.sub);
        console.log(modalStateN);
        console.log(modalState);
        let memberId = decode_token.sub;
        axios.get(`http://localhost:8080/api/someus/share/grouplist/${memberId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                setGroupList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    const result = () => {
        return groupList && groupList.map((list, index) => {
            return (
                <div key={index} id={list.shareRoomName}>
                <div><GroupShareEach history={history} list={list} /></div>
                </div>

            )
        })
    };

    const handlerClickNext = () => {
        console.log(modalStateN);
        setModalStateN(1)
    };

    const handlerSubmit = () => {
        setModalState(false);
    }

    const onClickPlus = () => {
        setModalState(true); 

    }

    return (
        <>
            <NaviDiary history={history}/>
            <div className="groupList_background">
                <div className="grouplist_box">
                    <input type="button"
                        className="groupAddbtn"
                        onClick={ ()=> setModalState(true) }></input>
                        {modalState && (modalStateN === 0) &&
                        <AddGroup history={ history } 
                                    match={ match }
                                    modalState={ modalState }
                                    setModalState={ setModalState }
                                    modalStateN={ modalStateN }
                                    handlerClickNext={handlerClickNext}
                                    closeModal={closeModal} 
                                        />
                        }

                        {modalState && (modalStateN === 1) &&
                        <AddGroupNext history={ history } 
                                        match={ match }
                                        modalState={ modalState }
                                        setModalState={ setModalState }
                                        handlerSubmit={ handlerSubmit }
                                        closeModal={closeModal}
                                        
                                    />
                        }
                        { result() }
                    {/* {modalState && <AddGroup closeModal={closeModal} />} */}

                    {/* // TODO. grouplist가 null이 아닐 때 맵 돌리도록 */}
                    {/* {groupList.map((groupList, index) =>
                        <div key={index}>
                            <p>{groupList.title}</p>
                            <p>{groupList.img}</p>
                        </div>)} */}
                </div>
            </div>
        </>
    );
}


export default GroupList;