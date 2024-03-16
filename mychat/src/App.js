import socketIO from 'socket.io-client'
import {Routes, Route} from 'react-router-dom'
import Join from './Components/Join'
import Chat from './Components/Chat'
import './App.css';
function App() {
 
  return (
    <div>
<Routes>
  <Route path='/' Component={Join}/>
  <Route path='/chat' Component={Chat}/>
 
</Routes>

    </div>
  );
}

export default App;
