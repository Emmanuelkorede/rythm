import { useEffect, useState } from 'react'
import { Form } from '../components/Form';
import { Display } from '../components/Display';
import { Navbar } from "../components/Navbar";
import { useNavigate } from 'react-router';
import {FaChartBar } from 'react-icons/fa' ;
import {handleKeyPressForm} from '../components/handleKeyPress' ;


import '../styles/week.css' ;

function Weekly() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('goals') ;
    return saved ? JSON.parse(saved) : []
  })  ; 
  const [input , setInput] = useState('') ;
  const [selectedTime , setselectedTime] = useState('') ;
  const [editIndex , setEditIndex] = useState(null) ;

  useEffect(() => {
    localStorage.setItem('goals' , JSON.stringify(goals))
  } , [goals])
   
  const navigate = useNavigate() ;  

  function addHabit() {
    if(input.trim() === '') return ;
    if(editIndex !== null) {
      const updatedGoals = goals.map((goal , index) => {
        return index === editIndex ? {...goal ,title : input, time : selectedTime} : goal ;
      })
      setGoals(updatedGoals)
      setEditIndex(null)
      setInput('') ;
      setselectedTime('') ;
    } else {

    const newHabit = {
      title :  input ,
      days : Array(7).fill(false) ,
      time : selectedTime ,
      createdAt: Date.now()
    }
    setGoals([...goals , newHabit]) ;
    setInput('') ;
    setselectedTime('') ;
     }
  }

    function editGoals(goal , index) {
      setInput(goal.title)
      setselectedTime(goal.time)
      setEditIndex(index)
    }


  function deleteHabit(goalIndex) {
    const filtredGoals = goals.filter((goal , i) => i !== goalIndex) ;
    setGoals(filtredGoals)
  }

  

  function HandleKeypressDisplay(e , goalIndex) {
    if(e.key === "Delete" && e.target === e.currentTarget)   {
      deleteHabit(goalIndex) ;
    }
  }

  function resetHabit(goalIndex) {
    const updatedGoals = goals.map((goal , i) => {
      if (i !== goalIndex) return goal ;
      return {...goal , days : Array(7).fill(false)}

    })

    setGoals(updatedGoals)
  }
  function toggleIndex(goalIndex ,dayIndex) {
    const updatedGoals = goals.map((goal , i) => {
      if ( i !== goalIndex) return goal ;

      const newDays = goal.days.map((day , d) => 
        d === dayIndex ? !day : day
      )

      return {...goal , days : newDays}
    })

    setGoals(updatedGoals)

  }
  

  return (

    <>
    <Navbar />
    <div className='weekly-page'>
      
      <div className="weekly-header">
        <h1>Weekly Habit Tracker</h1>
        <button
          className="analytics-btn"
          onClick={() => navigate('/weekanalytics')}
          aria-label="View analytics"
        >
          <FaChartBar />
        </button>
      </div>

     <Form input={input} setInput={setInput} addHabit={addHabit} handleKeyPressForm={handleKeyPressForm}  selectedTime={selectedTime} setselectedTime={setselectedTime}
      editGoals={editGoals}  editIndex={editIndex}
     />
     <Display 
      goals={goals} 
      toggleIndex={toggleIndex} 
      deleteHabit={deleteHabit}
      resetHabit={resetHabit}
      HandleKeypressDisplay={HandleKeypressDisplay}
      selectedTime={selectedTime}
      editGoals={editGoals}
     />
    </div>
    </>
    
    
  )
}

export default Weekly
