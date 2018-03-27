import React, { Component } from "react";
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

// Material UI
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import TopBar from './components/topbar/TopBar';
import TopBarSecondary from './components/topbar/TopBarSecondary';

// Pages
// import SampleApp from './components/SampleApp';
import Dashboard from './components/Dashboard';
import Progress  from './components/Progress' ;
import Profile   from './components/Profile'  ;
import Settings  from './components/Settings' ;

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store} >
        <MuiThemeProvider>
          <Router>
            <div>
              <Drawer
                open={true}
                width={200}
              >
                <p>LOGO</p>
                <NavLink to="/"><MenuItem>Dashboard</MenuItem></NavLink>
                <NavLink to="/progress"><MenuItem>Progress</MenuItem></NavLink>
                <NavLink to="/profile"><MenuItem>Profile</MenuItem></NavLink>
                <NavLink to="/settings"><MenuItem>Settings</MenuItem></NavLink>
              </Drawer>
              <div style={{marginLeft: 200 + 'px'}}>
                {/* <AppBar
                  title="Title"
                  iconClassNameRight="muidocs-icon-navigation-expand-more"
                  style={{}}
                /> */}
                <TopBar />
                <TopBarSecondary />
                <Switch>
                  <Route path="/progress" component={Progress} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/settings" component={Settings} />
                  {/* <Route path="/" component={SampleApp} /> */}
                  <Route path="/" component={Dashboard} />
                </Switch>
              </div>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
