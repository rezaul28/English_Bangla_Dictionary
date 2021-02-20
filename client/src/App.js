import logo from './logo.svg';
import './App.css';
import Header from "./comp/header"
import people from "./people"
function App() {
  return (
    <div className="App">
      <Header probs = {people[0]}/>
    </div>
  );
}

export default App;
