import { RuxContainer } from '@astrouxds/react';

import GlobalStatusBar from './components/global-status-bar';
import './App.css';

const App = () => {
  return (
    <>
      <GlobalStatusBar />

      <main className='Main-container'>
        <RuxContainer className='Main-container__left-panel'>
          <header slot='header'>Left Panel</header>

          <ul>
            {Array.from({ length: 100 }, () => {
              const id = Math.random().toString(36).slice(2);
              return <li key={id}>{id}</li>;
            })}
          </ul>

          <footer slot='footer'>Left Panel Footer</footer>
        </RuxContainer>

        <div className='Main-container__tabs-bar'>Tabs bar</div>

        <div className='Main-container__buttons-bar'>Buttons Bar</div>

        <RuxContainer className='Main-container__center-top'>
          <header slot='header'>Center Panel</header>

          <div>Center Panel Body</div>

          <footer slot='footer'>Center Panel Footer</footer>
        </RuxContainer>

        <RuxContainer className='Main-container__center-bottom'>
          <header slot='header'>Center Bottom Panel</header>

          <ul>
            {Array.from({ length: 100 }, () => {
              const id = Math.random().toString(36).slice(2);
              return <li key={id}>{id}</li>;
            })}
          </ul>

          <footer slot='footer'>Center Bottom Panel Footer</footer>
        </RuxContainer>

        <div className='Main-container__right-panel'>
          <h2>Right Panel</h2>

          <ul>
            {Array.from({ length: 100 }, () => {
              const id = Math.random().toString(36).slice(2);
              return <li key={id}>{id}</li>;
            })}
          </ul>

          <p>Right Panel Footer</p>
        </div>
      </main>
    </>
  );
};

export default App;
