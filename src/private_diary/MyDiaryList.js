import axios from "axios";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './datepicker.css';
import MyDiaryEach from "./MyDiaryEach";
import ko from 'date-fns/locale/ko';
import NaviDiary from "../navigation/NaviDiary";
import '../navigation/navi.css';
import './mydiarylist.css';
import jwt_decode from "jwt-decode";
import TodoList from "./TodoList";
import Modal_Mydiary from "./Modal_Mydiary";


const MyDiaryList = ({ match, history }) => {

    const [list, setList] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const { diaryId } = match.params;
    const [memberId, setMemberId] = useState('');
    const [memberName, setMemberName] = useState('');
    const [modalState, setModalState] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    //{ 변수 }TodoList 기본 데이터(서버에서 GET으로 받아와야 함.)setTodos(response.data.list)
    const [todos, setTodos] = useState([]);

    //{ 함수 }Todos를 받아오는 함수 설정, useEffect할 때 getTodos함수 실행 필요!!
    async function getTodos() {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);

        try {
            const response = await axios.get(`http://localhost:8080/api/someus/private/list/goal/${decode_token.sub}/${formatDate(startDate)}`,
                {
                    headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` }
                });
            console.log('response.data=', response.data);
            const dataA = response.data;
            setTodos(dataA);
            //데이터가 저장되어도 한박자 느리게 반응되니까 useCallback으로 조정해야 할 듯.
            console.log('response.data=todos');
            console.log(todos);
        } catch (error) {
            console.log(error);
            return;
        };
    };

    const closeModal = (index) => {
        setModalState(prevState => {
            const updateArray = [...prevState];
            updateArray[index] = false;
            return updateArray;
        });
    };

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const decode_token = jwt_decode(token);
        setMemberId(decode_token.sub);
        setMemberName(decode_token.name);
        getTodos();
        let memberId = decode_token.sub;

        axios.get(`http://localhost:8080/api/someus/private/page/${memberId}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                setList(response.data.diaryList);

                for (let i = 0; i < list.length; i++) {
                    setModalState(prevState => {
                        const updateModalArray = [...prevState];
                        updateModalArray[i] = false;
                        return updateModalArray;
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                return;
            })
    }, []);

    // 요일의 이름 반환
    const getDayName = (date) => {
        return date.toLocaleDateString('ko-KR', {
            weekday: 'long',
        }).substr(0, 1);
    };

    // 날짜를 년, 월, 일로 비교
    const createDate = (date) => {
        return new Date(new Date(date.getFullYear()
            , date.getMonth()
            , date.getDate()
            , 0
            , 0
            , 0));
    };

    const handlerClickWrite = () => {
        history.push(`/someus/private/write`)
    };

    const formatDate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    };

    // 날짜 변경 시 해당 날짜를 기준으로 목록이 리랜더링
    const handlerChangeDate = (date) => {
        setStartDate(date)
        console.log(formatDate(date))
        const createdDt = formatDate(date);
        axios.get(`http://localhost:8080/api/someus/private/page/${memberId}/${createdDt}`,
            { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` } })
            .then((response) => {
                console.log(response);
                // 해당하는 날짜에 대한 일기의 데이터가 없을 경우
                if (list === null) {
                    alert(`일기를 작성하지 않았어요.`);
                }
                // 해당하는 날짜에 대한 일기의 데이터가 있는 경우 리스트를 새로 만들어 map 함수 실행
                else {
                    setList(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handlerClickDetail = (index) => {
        setModalState(prevState => {
            const updateArray = [...prevState];
            updateArray[index] = true;
            return updateArray;
        });

    };

    const result = () => {
        return list && list.map((lst, index) => {
            return (
                <div key={index} id={lst.diaryId}>
                    {modalState[index] && <Modal_Mydiary match={match} closeModal={() => closeModal(index)} id={lst.diaryId} list={lst} />}
                    <button className="diaryeachbutton" type="button" value={lst.diaryId} onClick={() => handlerClickDetail(index)}>
                        <MyDiaryEach list={lst} />
                    </button>
                </div>
            );
        });
    };

    return (
        <>
            <div>
                <NaviDiary history={history} />
                <div className='diarylist_background'>
                    <div className="calendar-container">
                        <div className="calendar-box">
                            <DatePicker
                                // 시작 날짜 셋팅
                                // selected={startDate}
                                locale={ko}
                                selected={startDate}
                                // 날짜가 클릭되면 해당 날짜로 이동
                                onChange={handlerChangeDate}
                                inline
                                // 토, 일 색깔 변경
                                dayClassName={date =>
                                    getDayName(createDate(date)) === '토' ? "saturday"
                                        :
                                        getDayName(createDate(date)) === '일' ? "sunday" : undefined
                                }
                                todayButton="today"
                            />
                        </div>
                        <div className="todo-box">
                            <TodoList todos={todos} setTodos={setTodos} startDate={startDate} getTodos={getTodos} />
                        </div>
                    </div>
                    <div className='diary-container'>
                        <div>
                            <p className="name_diary">{memberName}의 일기</p>
                            <p className='date'>{startDate.getMonth() + 1} {startDate.toLocaleString("en-US", { month: "long" })}</p>
                        </div>

                        <button className='private_write' onClick={handlerClickWrite}>
                            <div className='privateWrite-button' />
                            <span className="private_writetext"> 일기쓰기 </span>
                        </button>

                        <div className='diary'>
                            <div className="diaryWrap">{list && result()}</div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );

}

export default MyDiaryList;