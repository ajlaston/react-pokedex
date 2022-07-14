import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './route/Home';
import Details from './route/Details';
import Captured from './route/Captured';

function App() {

  return (
    <div className="app">
          <Routes>

            <Route path="/" element={<Home />} />

              <Route path="/details">
                <Route path=':name'  element={<Details/>}/>
              </Route>

            <Route path='/captured' element={<Captured />} />

          </Routes>
    </div>
  );
}

export default App;
