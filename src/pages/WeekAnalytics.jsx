import { useEffect , useState  } from "react"; 
import {Navbar} from '../components/Navbar.jsx' ;
import { CircularProgressbar , buildStyles} from 'react-circular-progressbar' ;
import 'react-circular-progressbar/dist/styles.css' ;
import { goodMotivation, mediumMotivation, lowMotivation } from '../utils/Motivation.js';
import { getRandomMessage} from '../components/getrandommessage.jsx' ;
import '../App.css'
import '../styles/WeeklyAnalytics.css' ;


export function WeekAnalytics() {
    const [goals , setGoals] = useState([]) ;

    useEffect(() => {
        const saved = localStorage.getItem('goals') ;   
        setGoals(saved ? JSON.parse(saved) : []) ;
    }, [])



    return (
        <>
            <Navbar />
            <div className="weeklyAnalyticspage">
                <h1>Week Analytics Page</h1>

                {goals.length === 0  && <p>No data yet </p>}
                
                <div className="analytics-grid-con">
                    {goals.map((goal , index) => {
                        const completed = goal.days.filter(Boolean).length ;
                        const totalDays = goal.days.length || 7;
                        const percentage = Math.round((completed / totalDays) * 100);
                        let motivationMessage = "" ;

                        if (percentage >= 70) {
                            motivationMessage = getRandomMessage(goodMotivation)
                        } else if (percentage >= 40  && percentage < 70) {
                            motivationMessage = getRandomMessage(mediumMotivation)
                        } else {
                            motivationMessage = getRandomMessage(lowMotivation)
                        }

                        const progressColor = percentage === 100
                                    ? '#22c55e'     
                                    : percentage >= 50
                                    ? '#4f46e5'     
                                    : '#f97316';    

                  
                        return (
                            <div key={index} className="anayltics-card-con">
                                <div className="analytics-info">
                                    <h3>{goal.title}</h3>
                                    <p>
                                    {completed} / {totalDays} days completed
                                    </p>
                                    <p>{motivationMessage}</p>
                                </div>
                                <div className="progress-wrapper">
                                    <CircularProgressbar 
                                        value={percentage}
                                        text={`${percentage}%`}
                                        styles={buildStyles({
                                        pathColor: progressColor,
                                        textColor: '#111',
                                        trailColor: '#e5e7eb'
                                        })}
                                    />
                                </div>
                                
                            </div>
                            );
                    }) }
                </div>
            </div>
        </>
        
    )
}

export default WeekAnalytics ;