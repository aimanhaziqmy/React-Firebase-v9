import AddEvents from "./components/Event/AddEvents";
//import Articles from "./components/Articles";
import Article from "./components/Article";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Events from "./components/Event/Events";
import Users from "./components/User/Users";
import AddUser from "./components/User/AddUser";
function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/users" element={ <div className="row" style={{ marginTop: 100 }}>
                <div className="col-md-8">
                  <Users />
                </div>
                <div className="col-md-4">
                  <AddUser />
                </div>
              </div>}/>
          <Route
            path="/"
            element={
              <div className="row" style={{ marginTop: 100 }}>
                <div className="col-md-8">
                  <Events />
                </div>
                <div className="col-md-4">
                  <AddEvents />
                </div>
              </div>
            }
          />
        </Routes>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
