import { Routes , Route } from 'react-router'
import Week from './pages/Week.jsx'
import HomePage from './pages/HomePage.jsx'
import WeekAnalytics from './pages/WeekAnalytics.jsx' 
import Settings  from './pages/Settings.jsx' ;
import Todolist from './pages/Todolist.jsx' ;
import './App.css'


 

function App() {
  return (  
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='week' element={<Week />} />
        <Route path='weekanalytics' element={<WeekAnalytics />} /> 
        <Route path='settings' element={<Settings />} />
        <Route path='Todolist' element={<Todolist />} />
      </Routes>
    </>
  )
}

export default App
