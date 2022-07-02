import './App.css';
import Twitter from './components/Twitter';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <h1 className='App-header'>Twitter Graphql App</h1>
      <Routes>
        <Route strict exact path='/' element={<Twitter />} />
      </Routes>
    </div>
  );
}

export default App;
