
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


import React, { useEffect } from 'react';
import Home from './pages/Home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Player from './pages/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

export default function App() { 

  const nav = useNavigate();

  useEffect(() => { 
    onAuthStateChanged(auth, async (user) => { 
      if (user) { 
        console.log("Logged In");
        nav('/');
      } else { 
        console.log("Logged Out");
        nav('/login');
      }
    })
  },[])

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