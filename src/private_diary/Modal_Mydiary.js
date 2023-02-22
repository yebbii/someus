import { useEffect, useState } from "react";
import './modal_mydiary.css';

const Modal_Mydiary = (props) => {

    useEffect(() => {
        document.body.style.cssText = `
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;

        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = '';
            window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
        };
    }, []);

    const modalClose = () => {
        props.closeModal();
        console.log(props.closeModal());
    }

    const dairyContents = '아니한 우리는 그들의 맺어, 피가 끓는다. 이상을 풀이 것은 몸이 동산에는 꽃이 있는가? 만천하의 뼈 얼음이 예가 끓는 능히 산야에 끓는 것이다. 들어 꽃이 튼튼하며, 구하기 있는 무한한 것이다. 그러므로 피에 사랑의 있는 이상, 끓는 위하여서. 되려니와, 힘차게 미묘한 보라. 천지는 힘차게 위하여 이상 가슴이 것이다. 얼마나 없는 청춘을 위하여, 것이다. 우리는 가슴에 불러 커다란 청춘에서만 황금시대의 가치를 것이다. 듣기만 되는 보이는 시들어 곳이 무엇을 교향악이다. 방황하였으며, 얼마나 천지는 천하를 있는가? 미묘한 없으면, 청춘에서만 온갖 인생을 군영과 꽃이 보라. 청춘은 놀이 인도하겠다는 갑 가는 것은 앞이 가는 황금시대다. 날카로우나 이것은 타오르고 .'

    return (
        <>
            <div className="modal" onClick={modalClose}>
                <div className="modalBody" onClick={(e) => e.stopPropagation()}>
                    <div className="modelLeft">
                    <img className="modalImg" src={require("../img/mood_2.png")} />
                    </div>
                    <div className="modalRight">
                        <div className="modalRightHeader">
                            <span>2023. 02. 17</span>
                            <div className="modalRightHeaderRight">
                                <span>흐림</span>
                                <span>무지개</span>
                            </div>
                        </div>
                        <div className="middleLine"></div>
                        <hr id="middleLine" />
                        <p className="dairyContents">{dairyContents}</p>
                        <div className="bottom">
                            <button className="modalCloseBtn">연필</button>
                            <button className="modalCloseBtn" onClick={modalClose}>휴지통</button>
                        </div>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal_Mydiary;