import { FaClock } from "react-icons/fa";
import "../styles/week.css";

export function Form({
  input,
  setInput,
  addHabit,
  handleKeyPressForm,
  selectedTime,
  setselectedTime,
  editIndex
}) {
  return (
    <div className="habit-form">
      <input
        placeholder="Add a habit"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => handleKeyPressForm(e, addHabit, setInput)}
      />

      <div className="time-picker">
        <button
          type="button"
          className="time-icon"
          onClick={() =>
            document.getElementById("habit-time-input").showPicker()
          }
          aria-label="Pick time"
        >
          <FaClock />
        </button>

        <input
          id="habit-time-input"
          type="time"
          value={selectedTime}
          onChange={(e) => setselectedTime(e.target.value)}
        />

        {selectedTime && (
          <span className="time-label">{selectedTime}</span>
        )}
      </div>
      
      <button
        className="add-button"
        onClick={addHabit}
        disabled={input.trim() === ""}
      >
        {editIndex !== null ? "Update" : "Add"}
      </button>
    </div>
  );
}
