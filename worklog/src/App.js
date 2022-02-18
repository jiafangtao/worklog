import './App.css';
import addItem from './Item.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Simply log your work locally
        </p>

      </header>

      <div className="List">
        <input className="ListButton" type="button" value="Add" onClick={addItem}/>
      </div>
    </div>
  );
}

export default App;
