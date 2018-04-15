import React, { Component } from "react";
import { withRouter }       from 'react-router';

import TopPanelDashboard from '../dashboard/TopPanelDashboard';

class TopPanelSecondary extends Component {
  render() {
    return (
      <div className="top-panel__secondary">
        {
          (() => {
            switch(this.props.location.pathname.slice(1)) {
              case 'dashboard':
                return <TopPanelDashboard />;
              default:
                return <TopPanelDashboard />;
            }
          })()
        }
      </div>
    );
  }
}

export default withRouter(TopPanelSecondary);