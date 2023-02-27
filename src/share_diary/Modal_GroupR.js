import { useEffect, useState } from "react";

const Modal_GroupR = (props) => {

    const dairyContents = ''

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
    };

   // moodId에 따라 moodImg 설정
   const moodImg = (mood) => {
    if (mood == 1) { return <img className="groupR_mood" src={`/img/moodC_1.png`} /> }
    else if (mood == 2) { return <img className="groupR_mood" src={`/img/moodC_2.png`} /> }
    else if (mood == 3) { return <img className="groupR_mood" src={`/img/moodC_3.png`} /> }
    else if (mood == 4) { return <img className="groupR_mood" src={`/img/moodC_4.png`} /> }
    else if (mood == 5) { return <img className="groupR_mood" src={`/img/moodC_5.png`} /> }
};

// weatherId에 따라 weatherImg 설정
const weatherImg = (weather) => {
    if (weather == 1) { return <img className="groupR_weather" src={`/img/weather_1.png`} /> }
    else if (weather == 2) { return <img className="groupR_weather" src={`/img/weather_2.png`} /> }
    else if (weather == 3) { return <img className="groupR_weather" src={`/img/weather_3.png`} /> }
    else if (weather == 4) { return <img className="groupR_weather" src={`/img/weather_4.png`} /> }
    else if (weather == 5) { return <img className="groupR_weather" src={`/img/weather_5.png`} /> }
};


    return (
        <>
            <div className="groupR_modal">
                <div className="groupR_modalImgbox">
                    <img className="groupR_modalImg" src={props.diaryDetailInfo? `http://localhost:8080/api/getImage/` + props.diaryDetailInfo.diary_img : ''}/>
                </div>
                <div className="groupL_write">
                    <div className="groupR_modalHeader">
                        <div className="groupR_date">{props.diaryDetailInfo ? props.diaryDetailInfo.createdDt : ""}</div>
                        <div className="groupR_modalHeaderRight">
                            <div className="groupR_weather">{ props.diaryDetailInfo ? weatherImg(props.diaryDetailInfo.weather_id) : '' }</div>
                            <div className="groupR_mood">{ props.diaryDetailInfo ? moodImg(props.diaryDetailInfo.mood_id) : '' }</div>
                        </div>
                    </div>
                    <div className="group_dairyContents">{props.diaryDetailInfo ? props.diaryDetailInfo.diaryContent : ""}</div>
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default Modal_GroupR;