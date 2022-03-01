import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CentralComputer from './pages/centralcomputer';
import Scout from './pages/scout';
import { ThemeProvider } from '@material-ui/core';
import theme from './helpers/theme';
import TeamProfile from './pages/team-profile';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <ThemeProvider theme={theme}>
          <Routes>
              <Route path='/' element={ <Home/> } exact />
              <Route path='/central-computer' element={ <CentralComputer /> } exact />
              <Route path='/scout' element={ <Scout /> } exact />
              <Route path='/team-profile/:teamId' element={ <TeamProfile /> } exact />
          </Routes>
        </ThemeProvider>
      </HashRouter>
    </div>
  );
}

export default App;
