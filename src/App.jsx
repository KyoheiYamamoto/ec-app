import React from 'react';
import Router from './Router';
import './assets/reset.css';
import './assets/style.css';
import { Header } from './components/Header';
import { Footer, Loading, ScrollToTop } from './components/UIkit';

const App = () => {
  return (
    <>
      <Header />
      <main className="c-main">
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default App;
