import './App.css';

function ItemList({data}) {
  var items = data.map((item) =>
    <li key={item.id} id={item.id} value={item.value} status="loaded">{item.value}</li>
  );

  return (
    <ul>
      {items}
    </ul>
  );
}

// The below doesn't compile.
/*
function ItemList2({data}) {
  return (
    <ul>
      data.map((item) =>
      <li key={item.id} id={item.id} value={item.value} status="loaded">{item.value}</li>
      );
    </ul>
  );
}
*/

function App({items}) {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Simply log your work locally
        </p>

      </header>

      <div className="List">
        <input className="ListButton" type="button" value="Add" />
      </div>

      <ItemList data={items} />
    </div>
  );
}

export default App;
