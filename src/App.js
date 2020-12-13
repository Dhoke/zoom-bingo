import './App.css';
import JoinPage from './Components/JoinPage/JoinPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import GamePage from './Components/GamePage/GamePage';
import WebSocketContextProvider from './Contexts/WebSocketContext';
import AdminPage from './Components/AdminPage/AdminPage';

function App() {
  return (
    <div className="App">
      <WebSocketContextProvider>
        <Router>
          <Switch>
            <Route path='/admin'>
              <AdminPage />
            </Route>
            <Route path='/game'>
              <GamePage />
            </Route>
            <Route path='/'>
              <JoinPage />
            </Route>
          </Switch>
        </Router>
      </WebSocketContextProvider>
    </div>
  );
}

export default App;
