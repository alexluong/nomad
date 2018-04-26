import React, { Component }     from 'react';
import { Provider }             from 'react-redux';
import { Router }               from 'react-router';
import { Route, Switch }        from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Layout
import TopPanel  from './components/top-panel/TopPanel';
import SidePanel from './components/SidePanel';

// Pages
import DashboardListPage  from './components/dashboard/DashboardListPage';
import DashboardPage      from './components/dashboard/DashboardPage'    ;
import ProgressPage       from './components/ProgressPage'               ;
import Profile            from './components/Profile'                    ;
import Settings           from './components/Settings'                   ; 
import SignInPage         from './components/auth/SignInPage'            ;
import SignOutPage        from './components/auth/SignOutPage'           ;

export const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <Provider store={this.props.store} >
        <Router history={history}>
          <Switch>
            <Route path="/signin"  component={SignInPage}  />
            <Route path="/signup"  component={SignInPage}  />
            <Route path="/signout" component={SignOutPage} />
            <Route path="/"        component={MainApp}     />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

class MainApp extends Component {
  render() {
    return (
      <div id="app">
        <SidePanel />
        <TopPanel />
        <main className="main">
          <Switch>
            <Route path='/dashboard/list' component={DashboardListPage} />
            <Route path='/dashboard'      component={DashboardPage}     />
            <Route path='/progress'       component={ProgressPage}      />
            <Route path='/profile'        component={Profile}           />
            <Route path='/settings'       component={Settings}          />
            <Route path='/' render={props => { props.history.push('/dashboard'); return null; }} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
