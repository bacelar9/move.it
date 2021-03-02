import { useContext } from 'react';
import { ChallengersContext } from '../contexts/ChallengersContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
    const { level, closeLevelUpModal } = useContext(ChallengersContext);
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>
                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>

                <button type="button" onClick={closeLevelUpModal} >
                    <img src="/icons/close.svg" alt="Fechar Modal" />
                </button>
            </div>
        </div>
    )
}