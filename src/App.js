
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import SignUp from './pages/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/DashBoard';
import Login from './pages/Login';
import Browse from './pages/Browse';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import Feed from './pages/Feed';





function App() {

  return (  
        <Router>
              <AuthProvider>
                <Switch>
                   <Route exact path="/" component={Login} /> 

                  <Route path="/signup" component={SignUp} />  

                  <PrivateRoute  path="/dashboard" component={Dashboard} />

                  <Route  path="/browse" component={Browse} />

                  <Route path="/forgot-password" component={ForgotPassword} />

                  <Route path="/feed" component={Feed} />

                  
                </Switch>
              </AuthProvider>
        </Router>

  );
}

export default App;