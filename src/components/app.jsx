import React from 'react';
import AboutPage from '../pages/about';

import {
  App,
  Panel,
  View,
  Page
} from 'framework7-react';


import routes from '../js/routes';
import store from '../js/store';

const MyApp = () => {
  // Framework7 Parameters
  const f7params = {
    name: 'location-based-service', // App name
      theme: 'auto', // Automatic theme detection
      // App store
      store: store,
      // App routes
      routes: routes,
  };

  return (
    <App { ...f7params } >
        {/* Right panel with cover effect*/}
        <Panel right cover dark>
          <View>
            <Page>
              <AboutPage/>
            </Page>
          </View>
        </Panel>
      	
        <View id="view-home" main tab tabActive url="/" />
    </App>
  )
}
export default MyApp;