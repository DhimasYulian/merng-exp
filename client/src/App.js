import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import {AuthProvider} from './context/auth'
import AuthRoute from "./utils/AuthRoutes";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <AuthRoute path="/login" exact component={Login} />
            <AuthRoute path="/register" exact component={Register} />
            <Route path="/post/:postId" exact component={PostDetail} />
          </Switch>
        </Router>
      </AuthProvider>
  );
}

export default App;
