import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import Navigation from './Components/Navigation/Navigation';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Register from './Authentication/Register';
import LoginForm from './Authentication/LoginForm';
import ForgotPassword from './Authentication/ForgotPassword';
import HomePage from './Components/HomePage/homePage'

function App() {
  document.body.style.margin = 0;
  document.body.style.padding = 0;
  document.body.style.overflow = "none";
  document.body.style.backgroundColor = "#121316";
  return (
    <RouterProvider router={createBrowserRouter([
      {
        path: "/",
        element:  <div style={{width:"100vw", height:"100vh", display:"flex", flexDirection:"column", flexWrap:"wrap", backgroundColor:"#121316", overflow:"none"}}>
        <Navigation/>
        <Dashboard/>
      </div>
      },
      {
        path: "/home",
        element: <HomePage/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/login",
        element: <LoginForm/>,
      },
      {
        path: "/ForgotPassword",
        element: <ForgotPassword/>
      }
    ])}/>
  );
}

export default App;
