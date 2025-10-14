
// "rafce" snippet:
// import React from 'react';

// const App = () => {
//   return (
//     <div>App</div>
//   )
// }

// export default App

// "ednf" snippet:
// export default function App() { 


//   return (
//     <div>

//     </div>
//   )
// }


import React from 'react';
import Home from './pages/Home/Home';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';


export default function App() { 


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/player/:id' element={<Player/>} />
      </Routes>
    </div>
  )
}