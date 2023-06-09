import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginStates from "./context/loginStatus/loginStates";
import AlertStates from "./context/alert/alertStates";
import Alert from "./components/Alert";
import Dashboard from "./components/Dashboard";
import LoadingStates from "./context/loading/loadingstate";
import UserStates from "./context/userDetails/userStates";
import ProfilePage from "./components/ProfilePage";
import TrackEmotionsPage from "./components/TrackEmotionsPage";
import OtherUserProfilePage from "./components/otherUsersProfile/OtherUserProfilePage";
import OtherUserStates from "./context/otherUserContext/otherUserStates";
import FriendsPage from "./components/FriendsPage";

function App() {
  return (
    <>
    {/* top priority Browser router */}
    <AlertStates>
    <BrowserRouter>
    <OtherUserStates>
    <LoadingStates>
    <UserStates>
    <LoginStates>
    <LoadingStates>
        <Alert/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/registration" element={<Registration/>} />
          <Route path="/trackemotions" element={<TrackEmotionsPage/>} />
          <Route path="/users/profile" element={<OtherUserProfilePage/>} />
          <Route path="/friends" element={<FriendsPage />} />
        </Routes>
    </LoadingStates>
    </LoginStates> 
    </UserStates>
    </LoadingStates>
    </OtherUserStates>
    </BrowserRouter>
    </AlertStates>
    </>
  );
}

export default App;
