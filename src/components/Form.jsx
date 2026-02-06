import '../styles/week.css'
export function Form({input , setInput , addHabit , handleKeyPressForm , selectedTime , setselectedTime , editIndex }) {

  return (
    <div className="habit-form">
    <input
      placeholder='Add a habit'
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => handleKeyPressForm(e , addHabit , setInput)}
    />
    <input value={selectedTime} onChange={(e) => setselectedTime(e.target.value)} type='time'/>
    <button 
    className='add-button' 
    onClick={addHabit}
    disabled={input.trim() === ''}
    >{editIndex !== null ? 'UpdateMood' : 'ADD'}</button>
    </div>
  )
}