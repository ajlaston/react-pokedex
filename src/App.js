import './App.css';
import { Route, Routes, Link, useLocation } from "react-router-dom";
import Home from './route/Home';
import Details from './route/Details';
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

              <Route path="/details">
                <Route path=':name'  element={<Details/>}/>
                <Route path=':name/popup' element={<Details />}/>
              </Route>
            }
            <Route path='/captured' element={<Captured />} />

          </Routes>
    </div>
  );
}

export default App;
