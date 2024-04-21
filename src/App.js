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
import 'moment/locale/ky';
import Admin from './screens/admin';
import AdminConsole from './screens/admin_console';
import Info from './screens/content';
import About from './screens/about';
import Invoice from './screens/invoice';
function App() {
  return (
    <div className='container-fluid p-0'>
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
                  <Route path='/about-us' element={<About/>} />
                  <Route path='/invoice' element={<Invoice/>} />
              </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;