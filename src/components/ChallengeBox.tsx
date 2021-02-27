import { useContext } from 'react'
import { ChallengersContext } from '../contexts/ChallengersContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox () {
    const { activeChallenge, resetChallenge } = useContext(ChallengersContext)

    return (
       <div className= {styles.challengeBoxContainer}>
          {activeChallenge ? (
              <div className={styles.challengeActive}>
                  <header>
                      Ganhe { activeChallenge.amount}
                  </header>

                  <main>
                    <img src={`icons/${activeChallenge.type}.svg`} alt="Body"/>
                    <strong>Novo Desafio</strong>
                    <p>{ activeChallenge.description }</p>
                  </main>

                  <footer>
                      <button 
                      type="button"
                      className={styles.challengeFailedButton}
                      onClick={resetChallenge}
                      >
                          Falhei
                      </button>
                      <button 
                      type="button"
                      className={styles.challengeSucceededButton}
                      >
                          Completei
                      </button>
                  </footer>
              </div>
          ) : ( <div className= {styles.challengeNotActive}>
                <strong>
                    Finalize um ciclo para receber um desafio
                </strong>
                <p>
                    <img src="icons/level-up.svg" alt="Level Up"/>
                    Avance de level completando desafios.
                </p>
           </div>)}
       </div>
    )
}