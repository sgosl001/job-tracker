import React, { useEffect } from 'react';

import AppNavbar from './components/AppNavbar';
import JobList from './components/JobList';
import JobModal from './components/JobModal';
import Container from 'react-bootstrap/Container';
import { loadUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <AppNavbar />
      <Container className='h-100 w-100'>
        <JobModal />
        <JobList />
      </Container>
    </Provider>
  );
}

export default App;
