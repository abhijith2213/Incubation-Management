import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import SignupPage from './pages/SignupPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/Home';

import User from './Context/UserContext';
import Applications from './Context/ApplicationContext';

import ApplicationPage from './pages/ApplicationPage';
import SuccessPage from './pages/SuccessPage';

import AdminHomePage from './pages/Admin/AdminHomePage'; 
import AdminLoginPage from './pages/Admin/AdminLoginPage';
import AdminApprovedPage from './pages/Admin/AdminApprovedPage';
import AdminRejectedPage from './pages/Admin/AdminRejectedPage';
import AdminCreateSlot from './pages/Admin/AdminCreateSlot';
import AdminSlotBooking from './pages/Admin/AdminSlotBooking';
import AdminProgressPage from './pages/Admin/AdminProgressPage';

function App() {
  return (
    <div className="App">
    <Router>
      <User>
        <Applications>
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>     
            <Route path='/signup' element={<SignupPage/>}> </Route>
            <Route path='/signin'element={<SignInPage/>}></Route> 
            <Route path='/Application' element={<ApplicationPage/>}></Route>   
            <Route path='/success' element={<SuccessPage/>}></Route>   
          </Routes>

          <Routes>
            <Route path='/adminLogin' element={<AdminLoginPage/>}></Route>
            <Route path='/admin' element={<AdminHomePage/>}></Route>
            <Route path='/admin/approved' element={<AdminApprovedPage/>}></Route>
            <Route path='/admin/rejected' element={<AdminRejectedPage/>}></Route>
            <Route path='/admin/create_slot' element={<AdminCreateSlot/>}></Route>
            <Route path='/admin/book_slot' element={<AdminSlotBooking/>}></Route>
            <Route path='/admin/progress' element={<AdminProgressPage/>}></Route>

          </Routes>
        </Applications>
      </User>
    </Router>
      
    </div>
  );
}

export default App;
