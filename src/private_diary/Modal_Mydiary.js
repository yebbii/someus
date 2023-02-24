import axios from "axios";
import { useEffect, useState } from "react";
import './modal_mydiary.css';

const Modal_Mydiary = (props, { history }) => {
    //모달
    useEffect(() => {
        document.body.style.cssText = `a
        position: fixed;
        top: -${window.scrollY}px;
        overflow-y: scroll;
        width: 100%;`;
        
        console.log(props.list);
        setContents(props.list.diaryContent);
        setMood(props.list.moodId);
        setWeather(props.list.weatherId);

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
    //모달끝

    //일기 수정 확인 필요
    const [ diary, setDiary ] = useState({});
    
    const [ weather, setWeather ] = useState('');
    const [ mood, setMood ] = useState('');
    const [ contents, setContents ] = useState('');
    const image = `http://localhost:8080/api/getImage/` + props.list.diaryImg;

    const diaryId = props.list.diaryId;
    
    const moodImg = (mood) => {
        if (mood == 0) { return <img src={`/img/mood_1.png`} className="mood_detail" /> }
        else if (mood == 1) { return <img src={`/img/mood_2.png`} className="mood_detail" /> }
        else if (mood == 2) { return <img src={`/img/mood_3.png`} className="mood_detail" /> }
        else if (mood == 3) { return <img src={`/img/mood_4.png`} className="mood_detail" /> }
        else if (mood == 4) { return <img src={`/img/mood_5.png`} className="mood_detail" /> }
    };

    const weatherImg = (weather) => {
        if (weather == 0) { return <img src={`/img/weather_1.png`} className="weather_detail" /> }
        else if (weather == 1) { return <img src={`/img/weather_2.png`} className="weather_detail" /> }
        else if (weather == 2) { return <img src={`/img/weather_3.png`} className="weather_detail" /> }
        else if (weather == 3) { return <img src={`/img/weather_4.png`} className="weather_detail" /> }
        else if (weather == 4) { return <img src={`/img/weather_5.png`} className="weather_detail" /> }
    }
    const hanlderChangeContents = (e) => {
        setContents(e.target.value);
        console.log(contents);
    };

    const handlerOnClickUpdate = () => {
        axios.put(`http://localhost:8080/api/someus/private/${diaryId}`,
                    { "diaryContent": contents },
                    { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
            .then((response) => {
                if(response.data === 1) {
                    alert(`정상적으로 수정되었습니다.`);
                    props.closeModal();
                } else {
                    alert(`수정에 실패했습니다.`);
                    return;
                }
            })
            .catch((error) => {
                console.log(contents);
                console.log(error);
                alert(`수정에 실패했습니다.`);
                    return;
            })
    };

    const handlerOnClickDelete = () => {
        axios.delete(`http://localhost:8080/api/someus/private/${diaryId}`,
        { headers: { 'Authorization' : `Bearer ${ sessionStorage.getItem('token') }`}})
            .then((response) => {
                if(response.data === 1) {
                    alert(`정상적으로 삭제되었습니다.`);
                    //리스트 map다시 돌게 리프레쉬 추가 피룡!!!!
                    // props.setList(prevState => {
                    //     const updateArray = [...prevState];
                    //     return updateArray;
                    // });
                    //------------------------------------------
                    props.closeModal();
                } else {
                    alert(`삭제에 실패했습니다.`);
                    return;
                }
            })
            .catch((error) => {
                console.log(error);
                alert(`삭제에 실패했습니다.`);
                return;
            })
    };

    return (
        <>
            <div className="private_modal" onClick={props.closeModal}>
                <div className="private_modalBody" onClick={(e) => e.stopPropagation()}>
                    <div className="modelLeft">
                    <img className="modalImg" src={image} />
                    </div>
                    <div className="modalRight">
                        <div className="modalRightHeader">
                        <span className="write_day">{props.list.createdDt}</span>
                            <div className="modalRightHeaderRight">
                            <span>{weatherImg(weather)}</span>
                            <span>{moodImg(mood)}</span>
                            </div>
                        </div>
                        
                        <textarea className='dairyContents' value={contents} onChange={hanlderChangeContents}></textarea>
                        
                        <div className="bottom">
                            <button className="modalCloseBtn" onClick={handlerOnClickUpdate}>연필</button>
                            <button className="modalCloseBtn" onClick={handlerOnClickDelete}>휴지통</button>
                        </div>
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal_Mydiary;