import './App.css';
import LoginAuto from './loginAuto';
import {Route,Routes,BrowserRouter} from "react-router-dom";
import Myfiles from './myfiles';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginAuto/>}></Route>
      <Route path="/myfiles" element={<Myfiles/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
