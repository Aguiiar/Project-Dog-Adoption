import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import Home from './components/Home'
import Dogs from './components/Dogs'
import Contact from './components/Contact'
import SignUp from './components/SignUp'
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  return (
   <BrowserRouter>
<Routes>
  <Route path="/home" element={<Home/>}/>

  <Route path="/dogs" element={<PrivateRoute><Dogs/></PrivateRoute>}/>
 
   <Route path="/contact" element={<Contact/>}/>
   <Route path="/login" element={<Login/>}></Route>
   <Route path="/signUp" element={<SignUp/>}/>
   <Route path="/forgotPassword" element={<ForgotPassword/>}/>
   <Route path="/resetPassword" element={<ResetPassword/>}/>
</Routes>
   </BrowserRouter>
  

 
  );
}

export default App;
