import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TodoList from './pages/TodoList';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/todo" component={TodoList}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
