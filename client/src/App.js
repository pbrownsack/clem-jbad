import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './routers/PrivateRoute';
import Container from './components/Container/Container';
import Titlebar from './components/Titlebar/Titlebar';

// Pages
import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/Login';
import HoursPage from './pages/Hours';

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path="/login" component={LoginPage} />
        <Container>
          <PrivateRoute exact path="/" component={DashboardPage} />
          <PrivateRoute path ="/hours" component={HoursPage} />
        </Container>
      </Router>
    </div>
  );
}

export default App;
