import logo from './logo.svg';
import './App.css';
import Header from "./comp/header"
import Body from "./comp/body"
import Input from "./comp/input"
const data = require("./people.json")
function App() {
  return (
    <div className="App">
      <Header/>
      <Input/>
      <Body probs ={data}/>
    </div>
  );
}

export default App;
