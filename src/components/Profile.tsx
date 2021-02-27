
import { useContext } from 'react';
import { ChallengersContext } from '../contexts/ChallengersContext';
import styles from '../styles/components/Profile.module.css'

export function Profile() {

    const { level } = useContext(ChallengersContext);

    return (
        <div className={styles.profileContainer}>
            <img src="images/hilton.jpg" alt="Hilton Bacelar" />
            <div>
                <strong>Hilton Bacelar</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level {level}
                </p>
            </div>
        </div>
    );
}