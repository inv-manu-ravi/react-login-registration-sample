import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import { Register } from './Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Register/>} />
      </Routes>
    </Router>
  );
}

export default App;
