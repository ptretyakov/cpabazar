import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { configureStore } from './configureStore'
import { syncHistoryWithStore } from 'react-router-redux'
import { App, Campaigns, LoginPage } from './containers'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'

const Store = configureStore()

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(hashHistory, Store, {
  adjustUrlOnReplay: false,
})

ReactDOM.render(
  <Provider store={Store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={App}>
        {(() => {
          if(!Store.getState().app.fetching) {
            return(
              <div>
                <IndexRoute component={Campaigns} />
                <Route path="campaigns/:id" component={Campaigns} />
                <Route path="/login" component={LoginPage} />
              </div>
            )
          }
        })()}
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
