import './App.css';
import { Route, Routes, Link} from "react-router-dom";
import Home from './route/Home';
import PokeStats from './route/PokeStats';
import Captured from './route/Captured';

function App() {

  const mobile = true;

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        {
          //if the window is below 764px then the pokemon stats will be rendered within the "stats" route
          mobile && 
          
          <Route path="/stats" element={<PokeStats />} >
            <Route path=':id' element={<PokeStats />} />
          </Route> 
        }
        <Route path='/captured' element={<Captured />} />
      </Routes>
    </div>
  );
}

export default App;
