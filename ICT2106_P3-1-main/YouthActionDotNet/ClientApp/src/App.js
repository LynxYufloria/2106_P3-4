import Nav, {  } from './Components/nav'
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Login from './Pages/Login';
import Register from './Pages/Register';
import useToken from './Components/useToken';
import Logout from './Pages/Logout';
import SlideDrawer, { Backdrop, DrawerItem, DrawerSection } from './Components/sideNav';

import homeImg from "./Assets/nav/house.png";
import userImg from "./Assets/nav/user.png";

import logoutImg from "./Assets/nav/logout.png";

import Users from './Pages/Users';

/* function getToken() {  
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
} */

export default function App() {
  const { token, setToken, logout } = useToken();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [active, setActive] = React.useState("Dashboard")
  const [height, setHeight] = React.useState(window.innerHeight);


  const drawerToggleClickHandler = () => {
    setDrawerOpen(!drawerOpen)
  }

  useEffect(()=>{
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight);
    });
  })

  let backdrop;
  if (drawerOpen) {
    backdrop = <Backdrop toggle={drawerToggleClickHandler} />;
  }

  const navigate = useNavigate();
  if (!token) {
    return (
        <div className="App" style={{maxHeight: height}}>
          <LoggedOutNav toggle={drawerToggleClickHandler}></LoggedOutNav>
          <div className="App-header" style={{maxHeight: height - 56}}>
            <SlideDrawer show={drawerOpen} toggle={drawerToggleClickHandler} direction="top">
              <DrawerSection label={"Modules"}>
                <DrawerItem label="Dashboard" to={"/"} logo={homeImg}></DrawerItem>
              </DrawerSection>
            </SlideDrawer>
            {backdrop}
            <Routes>
              <Route path="/" element={
                <Login setToken={setToken}></Login>}></Route>
              <Route path="/Register" element={<Register />}></Route>
            </Routes>
          </div>
        </div>
    )
  } else {
    return (
        <div className="App" style={{maxHeight: height}}>
          <LoggedInNav user={token} logout={logout} toggle={drawerToggleClickHandler} show={drawerOpen}></LoggedInNav>
          <header className="App-header" style={{maxHeight: height - 56}}>
            {backdrop}
            <SlideDrawer show={drawerOpen} toggle={drawerToggleClickHandler} direction={"top"}>
              
              <DrawerSection label={"Modules"}>
                <DrawerItem label="Users" to={"/"} logo={userImg} currentActive = {active} setActive={setActive}></DrawerItem>
                <DrawerItem label="Logout" to={"/Logout"} logo={logoutImg}></DrawerItem>
              </DrawerSection>
            </SlideDrawer>
            
            <Routes>
              <Route path="/" element={<Users user={token}/>}/>
              <Route path="/Logout" element={<Logout logout={logout}></Logout>}/>
            </Routes>
          </header>
        </div>
    );
  }
}


class LoggedInNav extends React.Component {

  state = {
    title: "MUSE"
  }
  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    const md = 768;
   if(window.innerWidth >= md){
        this.setState({
          title: "MUSE"
        })
    } else{
        this.setState({
          title: "MUSE"
        })
    }
  }
  render() {

    return (
      <Nav user={this.props.user} title={this.state.title
      } toggle={this.props.toggle} show={this.props.show}>
      </Nav>
    )
  }
}

class LoggedOutNav extends React.Component {
  render() {
    return (
      <Nav title={
        "MUSE"
      } toggle={this.props.toggle} >
      </Nav>
    )
  }
}