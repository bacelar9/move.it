import { useContext } from 'react'
import { ChallengersContext } from '../contexts/ChallengersContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export function CompletedChallenges() {
    const { ChallengersConpleted } = useContext(ChallengersContext)
    return (
        <div className= {styles.completedChallengesContainer}>
            <span >Desafios completos</span>
            <span >{ ChallengersConpleted }</span>
        </div>
    );
}