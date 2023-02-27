import { useEffect, useState } from "react";
import Modal_GroupL from "./Modal_GroupL";
import Modal_GroupR from "./Modal_GroupR";
import './modal.css';


const Modal = (props) => {

    //일기 정보 1개 또는 2개 각각 뿌려줄 객체 배열 변수
    const [diaryDetailInfo, setDiaryDetailInfo] = useState([]);

    useEffect(() => {
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;


        //{ 반복문 } 같은 날짜인 거 골라서 diaryDetailInfo에 담음 변수 이름 바꾸는게 좋을 듯 어려움.
        for (let i = 0; i < props.allList.length; i++) {
            if (props.allList[i].createdDt === props.list.createdDt) {
                setDiaryDetailInfo(prevState => [...prevState, props.allList[i]]);
            } else {}
        }
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

    const modalClose = () => {
        props.closeModal();
    }

    //해당 날짜의 일기 0번이 있다면 modalL만 키고
    //해당 날짜의 일기 1번이 있다면 modalL, R 킨다.

    //props.list.number = 1
    console.log('list.number=', props.list.number);
    console.log('list.createdDt=', props.list.createdDt);
    // console.log('allList.createdDt=',props.allList);
    console.log('diaryDetailInfo=', diaryDetailInfo);
    //allList에서 날짜 같은 거 찾고 각자 내용 L 또는 R에 뿌리면 될 듯


    return (
        <>
            <div className="modal" onClick={modalClose}>
                { props.list.number === 0 ?
                <div className="group_modalBody" onClick={(e) => e.stopPropagation()}>
                    <Modal_GroupL diaryDetailInfo={diaryDetailInfo[0]} />
                    <div className="vertical_line"></div>
                    <Modal_GroupR />
                </div>
                :
                <div className="group_modalBody" onClick={(e) => e.stopPropagation()}>
                    <Modal_GroupL diaryDetailInfo={diaryDetailInfo[0]} />
                    <div className="vertical_line"></div>
                    <Modal_GroupR diaryDetailInfo={diaryDetailInfo[1]} />
                </div>
                }  
            </div>
        </>
    );
};

export default Modal;