import logo from "./logo.svg";
import "./App.css";
import LoginAdmin from "./components/loginAdmin/LoginAdmin";
import MainAdmin from "./components/mainAdmin/MainAdmin";
import { Route, Routes } from "react-router-dom";
import PostManagement from "./components/mainAdmin/postManagement/PostManagement";
import UserManagement from "./components/mainAdmin/userManagement/UserManagement";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginAdmin />}></Route>
        <Route path="/mainadmin" element={<MainAdmin />}>
          <Route index element={<PostManagement />}></Route>
          <Route path="postmanagement" element={<PostManagement />} />
          <Route path="usermanagement" element={<UserManagement />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
