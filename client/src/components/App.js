import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Home from './Home';
import DrillHoleList from './DrillHoleList';
import DrillHole from './DrillHole';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <div>
            <Header />
            <main>
              <Route exact path="/" component={Home} />
              <div className="container-table">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <Route exact path="/drillholes" component={DrillHoleList} />
                      <Route exact path="/drillholes/:id" component={DrillHole} />
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </BrowserRouter>
    </div>
  );
}

export default connect(null, actions)(App);
