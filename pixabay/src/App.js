import "./App.css";
import HomePage from "./components/homePage/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import Functions from "./components/functions/Functions";
import { Route, Routes } from "react-router-dom";
import CreateImage from "./components/functions/createImage/CreateImage";
import Edit from "./components/functions/edit/Edit";
import Mainpage from "./components/homePage/mainPage/Mainpage";
import Navbar from "./components/navbar/Navbar";
import Profile from "./components/profile/Profile";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [searchTopic, setSearchTopic] = useState("");
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const [data, setData] = useState("");
  const [rev, setRev] = useState(true);

  return (
    <div className="App">
      <Navbar handleChangeSearch={handleChangeSearch} />
      <Routes>
        <Route
          path="/"
          element={<HomePage setData={setData} setRev={setRev} />}
        >
          <Route
            index
            element={<Mainpage search={search} data={data} rev={rev} />}
          ></Route>
          <Route path="mainpage" element={<Mainpage />} />
        </Route>
        <Route path="/function" element={<Functions />}>
          <Route index element={<CreateImage />} />
          <Route path="createImage" element={<CreateImage />} />
          <Route path="edit" element={<Edit />} />
        </Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </div>
  );
}

export default App;
