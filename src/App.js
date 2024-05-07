import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Main from './Components/Main';




function App() {
  return (
    <BrowserRouter>

      <main className=' w-full bg-slate-200 h-screen flex justify-between items-start '>
        <Sidebar />
         <Main  />
        
      </main>



    </BrowserRouter>

  );
}

export default App;
