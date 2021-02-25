import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="images/hilton.jpg" alt="Hilton Bacelar" />
            <div>
                <strong>Hilton Bacelar</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1
                </p>
            </div>
        </div>
    );
}