import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './routers/PrivateRoute';

// Pages
import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/Login';
import HoursPage from './pages/Hours';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route path="/" component={Navbar} />
        </Switch>
        <PrivateRoute exact path="/" component={DashboardPage} />
        <PrivateRoute path ="/hours" component={HoursPage} />
      </Router>
    </div>
  );
}

export default App;
