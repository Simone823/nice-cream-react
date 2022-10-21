import './App.css';

// import header
import Header from './components/Header';

// import ice creams component
import IceCreams from './components/IceCreams';

function App() {
  return (
    <div className="App">

      {/* header */}
      <Header/>

      {/* main */}
      <main>
        {/* ice creams */}
        <IceCreams/>
      </main>

    </div>
  );
}

export default App;
