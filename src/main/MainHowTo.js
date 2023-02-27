import { useEffect, useRef } from 'react';
import Navigation from '../navigation/Navigation';
import './main.css';
// import howtoBg from 'C:/Javascript/someus-app/src/img/bgB_detail.png';
import howto from 'C:/javascript/someus-app/src/img/mood_1.png';

const MainHowTo = ({ history }) => {

    const howtoDivRef = useRef();
    useEffect(() => {
        const wheelHandler = (e) => {
            e.preventDefault();
            const { deltaY } = e;
            const { scrollTop } = howtoDivRef.current; // 스크롤 위쪽 끝부분 위치
            const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같습니다.

            //스크롤 행동구현
            if (deltaY > 0) {
                // 스크롤 내릴 때
                if (scrollTop >= 0 && scrollTop < pageHeight) {
                    console.log("현재 1페이지, down")
                    howtoDivRef.current.scrollTo({
                        top: pageHeight,
                        left: 0,
                        behavior: "smooth",
                    });
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
                    console.log("현재 2페이지, down")
                    howtoDivRef.current.scrollTo({
                        top: pageHeight * 2,
                        left: 0,
                        behavior: "smooth",
                    });
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
                    console.log("현재 3페이지, down")
                    howtoDivRef.current.scrollTo({
                        top: pageHeight * 3,
                        left: 0,
                        behavior: "smooth",
                    });
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 4) {
                    console.log("현재 4페이지, down")
                    howtoDivRef.current.scrollTo({
                        top: pageHeight * 4,
                        left: 0,
                        behavior: "smooth",
                    });
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 5) {
                    console.log("현재 5페이지, down")
                    howtoDivRef.current.scrollTo({
                        top: pageHeight * 5,
                        left: 0,
                        behavior: "smooth",
                    });
                } else {
                    console.log("현재 6페이지, down")
                    howtoDivRef.current.scrollTo({
                        top: pageHeight * 5,
                        left: 0,
                        behavior: "smooth",
                    });
                }
            } else {
                //스크롤 올릴때 
                if (scrollTop >= 0 && scrollTop < pageHeight) {
                    console.log("현재 1페이지, up")
                    howtoDivRef.current.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
                    console.log("현재 2페이지, up")
                    howtoDivRef.current.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                    });
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 3) {
                    console.log("현재 3페이지, up")
                    howtoDivRef.current.scrollTo({
                        top: pageHeight,
                        left: 0,
                        behavior: "smooth",
                    });
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 4) {
                    console.log("현재 4페이지, up")
                    howtoDivRef.current.scrollTo({
                        top: pageHeight * 2,
                        left: 0,
                        behavior: "smooth",
                    });
                } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 5) {
                    console.log("현재 5페이지, up")
                    howtoDivRef.current.scrollTo({
                        top: pageHeight * 3,
                        left: 0,
                        behavior: "smooth",
                    });
                } else {
                    console.log("현재 6페이지, up")
                    howtoDivRef.current.scrollTo({
                        top: pageHeight * 4,
                        left: 0,
                        behavior: "smooth",
                    });
                }
            }
        };
        const howtoDivRefCurrent = howtoDivRef.current;
        howtoDivRefCurrent.addEventListener("wheel", wheelHandler);
        return () => {
            howtoDivRefCurrent.removeEventListener("wheel", wheelHandler);
        };
    }, []);

    return (
        <>
            <Navigation history={history} />
            <div className="howto_background">
                <div ref={howtoDivRef} className="howto_container">
                    <div className='ht-intro'>
                        <div className='ht-intro_logo' />
                        <h1 className='ht-intro_title'>SOMEUS</h1>
                        <p className='ht-intro_contents'>하루 하루의 일상을 기록하는 법을 알려드립니다</p>
                    </div>
                    <div className='ht-choice'>
                        <p className='ht-choice_contents'> SOMEUS는 일상을 적는 일기장 입니다 <br></br>하늘색과 연두색 일기를 준비해두었습니다<br></br>마우스를 올려 용도를 확인하세요</p>
                        <div className='ht-choice_box'>
                            <div className='ht-choice_privateD'><p className='ht-choice_privateD_ex'>하늘색 일기장은 나만의 일상을<br></br>기록하는 일기입니다</p></div>
                            <div className='ht-choice_groupD'><p className='ht-choice_privateD_ex'>연두색 일기장은 상대방과 함께<br></br>기록하는 교환 일기입니다</p></div>
                        </div>
                    </div>
                    <div className='ht-private'>
                        <div className='ht-private_title'>나의 일기에는</div>
                        <div className='ht-private_contents'> 월별 목표를 추가하고 관리 할 수 있습니다 </div>
                        <div className='ht-private_use'>
                            <div className='ht-private_newcontents'>버튼을 눌러 새로운 목표을 추가하세요</div>
                            <div className='ht-private_editcontents'>지우개를 눌러 목표를 수정할 수 있습니다</div>
                            <div className='ht-private_todotitle'>하트의 상태로 목표의 진행 상황을 확인하세요</div>
                            <div className='ht-private_todo'>
                                <div className='ht-private_todocontents'>분홍색으로 꽉찬 하트는 목표를<br></br>완료 했다는 의미입니다</div>
                                <div className='ht-private_todocontents'>테두리만 분홍색인 하트는 목표를 진행중이라는 의미입니다 </div>
                                <div className='ht-private_todocontents'>하트의 안과 테두리가 하얀색인<br></br>하트는 목표를 아직 시작하지<br></br>않았다는 의미입니다</div>
                            </div>
                        </div>
                    </div>
                    <div className='ht-group'>
                        <div className='ht-group_title'>교환 일기에는</div>
                        <div className='ht-group_contents'> 상대방과 교환일기를 생성할 수 있습니다 </div>
                        <div className='ht-group_add'>
                            <p className='ht-group_addme'>마우스를 올려주세요</p>
                        </div>
                        <div className='ht-group_use'></div>
                    </div>
                    <div className='ht-mood'>
                        <h1 className='ht-mood_title'>오늘의 기분을 하트 색으로 나타내세요</h1>
                        <div className='ht-mood_box'>
                            <div className='ht-mood_1' /> <div className='ht-mood_2' /> <div className='ht-mood_3' />
                            <div className='ht-mood_4' /> <div className='ht-mood_5' />
                        </div>
                        <div className='ht-mood_box'>
                            <p className='ht-mood_text'> <b>무지개 하트</b>는 다채로운 색처럼 환상적인 기분을 의미합니다 이 하트를 사용하는 날은 더없이 행복했던 하루였군요</p>
                            <p className='ht-mood_text'> <b>빨간색 하트</b>는 행복한 기분을 의미합니다 이 하트를 사용하는 날은 행복한 하루였군요</p>
                            <p className='ht-mood_text'> <b>보라색 하트</b>는 그럭저럭한 기분을 의미합니다 이 하트를 사용하는 날은 그럭저럭한 하루군요</p>
                            <p className='ht-mood_text'> <b>파란색 하트</b>는 별로 좋지 못한 기분을 의미합니다 이 하트를 사용하는 날은 조금 좋지 못 한 하루였군요</p>
                            <p className='ht-mood_text'> <b>검정색 하트</b>는 최악의 기분을 의미합니다 이 하트를 사용하는 날은 힘든 하루였군요</p>
                        </div>
                    </div>
                    <div className='ht-weather'>
                        <h1 className='ht-weather_title'>오늘의 날씨는 어땠나요?</h1>
                        <p className='ht-weather_contents'>맑음 흐림 비 천둥 눈으로 오늘의 날씨를 기록해주세요 </p>
                        <div className='ht-weather_box'>
                            <div className='ht-weather_1' /> <div className='ht-weather_2' /> <div className='ht-weather_3' />
                            <div className='ht-weather_4' />
                            <div className='ht-weather_5' />
                        </div>
                    </div>
                    <div className='gickbutton'>
                        <div className='ht_home' />
                        <div className='ht_mypage' />
                    </div>
                </div>
                <div className="footer">
                    <div className="copyright"> Copyright &copy; SOMEUS </div>
                </div>
            </div>

        </>
    );
}

export default MainHowTo;