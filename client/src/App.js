import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageTitleContext from './contexts/PageTitleContext';

// Components
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './routers/PrivateRoute';
import Container from './components/Container/Container';
import Titlebar from './components/Titlebar/Titlebar';

// Pages
import DashboardPage from './pages/Dashboard';
import LoginPage from './pages/Login';
import HoursPage from './pages/Hours';
import { useState } from 'react';

const App = () => {
  const [pageTitle, setPageTitle] = useState("Dashboard");

  return (
    <div>
      <Router>
        <Route exact path="/login" component={LoginPage} />
        <PageTitleContext.Provider value={[pageTitle, setPageTitle]}>
          <Container>
            <PrivateRoute exact path="/" component={DashboardPage} />
            <PrivateRoute path ="/hours" component={HoursPage} />
          </Container>
        </PageTitleContext.Provider>
      </Router>
    </div>
  );
}

export default App;
