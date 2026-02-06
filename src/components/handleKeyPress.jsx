export function handleKeyPressForm(e, add, clear) {
    if(e.key === "Enter") {
    add() ;
  }
    if(e.key === "Escape") {
      clear('') ;
    }
  }