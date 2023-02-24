import NaviDiary from "../navigation/NaviDiary";
import './myPage.css';
import jwt_decode from "jwt-decode";

const MyPage = ({ history }) => {

    const token = sessionStorage.getItem('token');
    const decode_token = jwt_decode(token);
    const name = decode_token.name;

    const handlerPrivate = () => {
        history.push('/someus/private');
    };

    const handlerShare = () => {
        history.push('/someus/share/grouplist');
    };

    return (
        <>
        <NaviDiary history={history}/>
            <div className="mypageBackground">
                <div className="mypage">
                    <button className="myD"
                        onClick={handlerPrivate}>
                        <img src={require("./diary_blue.png")} />
                        { name }의 일기
                    </button>
                    <button className="groupD"
                        onClick={handlerShare}>
                        <img src={require("./diary_green.png")} />
                        { name }의 교환일기
                    </button>
                </div>
            </div>
        </>
    );
};

export default MyPage;