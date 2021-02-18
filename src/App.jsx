import React from 'react';
import Router from './Router';
import { Header } from './components/header';

const App = () => {
  return (
    <>
      <Header />
      <main className="c-main">
        <Router />
      </main>
    </>
  )
}

export default App;