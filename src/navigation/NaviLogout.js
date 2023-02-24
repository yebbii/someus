import './navi.css'
import logo from 'C:/javascript/someus-app/src/img/logo_main.png'
import login from 'C:/javascript/someus-app/src/img/navicon_login.png'
import howTo from 'C:/javascript/someus-app/src/img/navicon_howTo.png'

const NaviLogout = ({ handlerClickHome,
    handlerClickHowTo,
    handlerClickLogin }) => {
    return (
        <>
            <div id='header'>
                <div className="menu">
                    <input type="image"
                        className='navi_icon'
                        src={logo}
                        alt="SOMEUS"
                        onClick={handlerClickHome}></input>
                    <button type="button"
                        className='howTo'
                        onClick={handlerClickHowTo}><img src={howTo} alt="howto" /></button>
                    <div className="loginMessage">
                        <button type="button"
                            className='login'
                            onClick={handlerClickLogin}><img src={login} alt="LOGIN" /></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NaviLogout;