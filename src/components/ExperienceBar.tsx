import { useContext } from 'react';
import styles from '../styles/components/ExperienceBar.module.css';
import { ChallengersContext } from '../contexts/ChallengersContext'

export function ExperienceBar() {
    const { CurrentExperience, experienceToNextLevel } = useContext(ChallengersContext)

    const percentToNextLevel = Math.round((CurrentExperience * 100)) / experienceToNextLevel

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
                   { CurrentExperience } xp
                </span>
            </div>
            <span>{ experienceToNextLevel } xp</span>
        </header>
    );
}