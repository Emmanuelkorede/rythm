import '../styles/week.css'

export function Display({ goals , toggleIndex , deleteHabit , resetHabit , HandleKeypressDisplay ,   editGoals , formatTime }) {
  return (
    <div className="habit-grid"> 
    {goals.map((goal , goalIndex) => (
      <div 
      key={goalIndex} 
      className="habit-card" 
      tabIndex={0}  
      onKeyDown={(e) => HandleKeypressDisplay(e , goalIndex)}>
        <p>{goal.title}</p>

        <p>{formatTime(goal.time)}</p>
        {goal.days.map((done, dayIndex) => (
          <div key={dayIndex} className='habit-days'>
                <label>
                  <input
                    type="checkbox"
                    checked={done}
                    onChange={() => toggleIndex(goalIndex, dayIndex)}
                  />
                  Day {dayIndex + 1}
                </label>
              </div>
        ))}


        <button 
          className='deltee-habit-btn' 
          onClick={() => deleteHabit(goalIndex)}
        >Delete</button>

        <button onClick={() => resetHabit(goalIndex)} >Reset</button>
        <button onClick={() => editGoals( goal, goalIndex)} >Edit</button>
      </div>
    ))}
    </div>
  )
}