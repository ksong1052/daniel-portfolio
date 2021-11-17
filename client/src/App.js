import Home from "./pages/Home/Home";
import TopBar from "./components/TopBar/TopBar";
import Single from "./pages/Single/Single";
import Write from "./pages/Write/Write";
import Settings from "./pages/Settings/Settings";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import NotFound from "./pages/NotFound/NotFound";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const user = false;

  return (
    <>      
      <Router>
        <TopBar />
        <Routes>
          <Route exact path="/" element={<Home />} />          
          <Route exact path="/register" element={ user ? <Home /> : <Register />} />
          <Route exact path="/login" element={ user ? <Home /> : <Login />} />
          <Route exact path="/write" element={ user ? <Write /> : <Register />} />
          <Route exact path="/settings" element={ user ? <Settings /> : <Register />} />
          <Route exact path="/post/:postId" element={<Single />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router> 
    </>
  );
}

export default App;
