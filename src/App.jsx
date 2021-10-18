import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import { FavouriteContextProvider } from './contexts/FavouriteContext';

const App = () => {
  return (
    <Router>
      <FavouriteContextProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/:city">
            <Detail />
          </Route>
        </Switch>
      </FavouriteContextProvider>
    </Router>
  );
};

export default App;
