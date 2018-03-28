import React, { Component } from "react";
import { Provider } from 'react-redux';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Material UI
// import Drawer from 'material-ui/Drawer';
// import MenuItem from 'material-ui/MenuItem';
import TopPanel from './components/top-panel/TopPanel';
import Sidebar from './components/Sidebar';

// Pages
// import SampleApp from './components/SampleApp';
import Dashboard  from './components/Dashboard';
import Progress   from './components/Progress' ;
import Profile    from './components/Profile'  ;
import Settings   from './components/Settings' ; 
import SignInPage from './components/auth/SignInPage';

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store} >
        <Router>
          <div id="app">
            <Sidebar />
            {/* <Drawer
              open={true}
              width={200}
            >
              <p>LOGO</p>
              <NavLink to="/"><MenuItem>Dashboard</MenuItem></NavLink>
              <NavLink to="/progress"><MenuItem>Progress</MenuItem></NavLink>
              <NavLink to="/profile"><MenuItem>Profile</MenuItem></NavLink>
              <NavLink to="/settings"><MenuItem>Settings</MenuItem></NavLink>
            </Drawer> */}
            <div id="main">
              <TopPanel />
              <Switch>
                <Route path="/progress" component={Progress} />
                <Route path="/profile" component={Profile} />
                <Route path="/settings" component={Settings} />
                <Route path="/signin" component={SignInPage} />
                {/* <Route path="/" component={SampleApp} /> */}
                <Route path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
