import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Login from './screens/login';
import Register from './screens/register';
import Edit from './screens/edit_details';
import Main from './screens/main';
import Forgot from './screens/forgot_password';
import Profile from './screens/profile';
import Chat from './screens/chat';
import 'moment/locale/ru';
import Admin from './screens/admin';
import AdminConsole from './screens/admin_console';
import Info from './screens/content';
function App() {
  return (
    <div className='container-fluid'>
        <BrowserRouter>
              <Routes>
                  <Route path='/list' element={<Main/>}/>
                  <Route path='/' element={<Login/>}/>
                  <Route path='/register' element={<Register/>}/>
                  <Route path='/forgot-password' element={<Forgot/>}/>
                  <Route path='/edit' element={<Edit/>}/>
                  <Route path='/profile' element={<Profile/>} />
                  <Route path='/chat' element={<Chat/>} />
                  <Route path='/admin' element={<Admin/>} />
                  <Route path='/admin-console' element={<AdminConsole/>} />
                  <Route path='/content' element={<Info/>} />
              </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
