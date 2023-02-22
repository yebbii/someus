
import GroupShareList from './share_diary/GroupShareList';
import ShareDiaryDetail from './share_diary/GroupShareDetail';
import { Link, Route } from 'react-router-dom';
import NaviLogin from './navigation/NaviLogin';
import Main from './main/Main';
import MainHowTo from './main/MainHowTo';
import MyDiaryWrite from './private_diary/MyDiaryWrite';
import AddGroup from './share_diary/AddGroup';
import MyDiaryList from './private_diary/MyDiaryList';
import GroupShareEach from './share_diary/GroupShareEach';
import GroupList from './share_diary/GroupList';
import AddGroupNext from './share_diary/AddGroupNext';
import Modal_Mydiary from './private_diary/Modal_Mydiary';


function App() {

  let name = "김초원";
  
  
  return (
    <>
    {/* <ul>
      <li><Link to='/navi'>네비</Link></li>
      <li><Link to='/someus/main'>메인</Link></li>
      <li><Link to='/someus/howto'>설명법</Link></li>
    </ul>  */}
    
    
    <Route path='/navi' 
          component={ 
            // 로그인 된 상태
            (props) => <NaviLogin {...props} name={ name }/>
            } exact={ true } />
    {/* <hr />
    <Route path='/navi' 
          component={ 
            (props) => <NaviDiary {...props} name={ name }/>
            } exact={ true } />
    <hr /> */}
    {/* 로그인이 안 된 상태 */}
    {/* <NaviLogout /> */}
    
    <Route path='/someus/main' component={ Main } exact={true}/>
    <Route path='/someus/howto' 
          component={ 
            // 로그인 된 상태
            (props) => <MainHowTo {...props} name={ name }/>
            } exact={ true } />
    
    <Route path='/someus/share/grouplist' component={ GroupList } exact={true} />
    <Route path='/someus/share/:shareroomid/:createddt' component={ ShareDiaryDetail } exact={true} />
    <Route path='/someus/write' component={ MyDiaryWrite } exact={true} />
    <Route path='/someus/share/groupsharelist' component={ GroupShareList } exact={true} />
    {/* <Route path='/someus/addgroup' component={ AddGroup } exact={true} /> */}
    <Route path='/someus/addgroupnext' component={ AddGroupNext } exact={true} />
    {/* <Route parh='/someus/private' component={(props) => <MyDiaryList {...props} name={name} />} exact={true} /> */}
    <Route path='/someus/private' component={MyDiaryList} exact={true} />
    <Route path='/someus/detail' component={ Modal_Mydiary } exact={true} />
    </>
  );
}

export default App;
