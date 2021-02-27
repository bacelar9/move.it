import { useContext } from 'react'
import { ChallengersContext } from '../contexts/ChallengersContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
    const { ChallengersCompleted } = useContext(ChallengersContext)
    return (
        <div className= {styles.completedChallengesContainer}>
            <span >Desafios completos</span>
            <span >{ ChallengersCompleted }</span>
        </div>
    );
}