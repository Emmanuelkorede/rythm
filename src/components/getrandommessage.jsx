    
 export   function getRandomMessage(messageArray) {
        const randomIndex =Math.floor(Math.random() * messageArray.length) ; 
        return messageArray[randomIndex] ;
    }