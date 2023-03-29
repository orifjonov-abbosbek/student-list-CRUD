import './App.css';
import Header from './components/Header/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import StudentList from './pages/studentList';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" index element={<h1>Home</h1>} />
        <Route path="/students" element={<StudentList />} />
      </Routes>
    </>
  );
}

export default App;
