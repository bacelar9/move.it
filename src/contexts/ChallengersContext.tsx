import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type:'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengersContextData {
    level: number;
    CurrentExperience: number;
    ChallengersCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp:() => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengersProviderProps {
    children: ReactNode
}

export const ChallengersContext = createContext({} as ChallengersContextData);

export function ChallengersProvider({ children }: ChallengersProviderProps) {
    const [level, setLevel] = useState(1);
    const [CurrentExperience, setCurrentExperience] = useState(0)
    const [ChallengersCompleted, setChallengersCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallegeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallegeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if(Notification.permission === 'granted'){
            new Notification('Novo Desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge () {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = CurrentExperience + amount;

        if (finalExperience > experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengersCompleted(ChallengersCompleted + 1);
    }

    return (
        < ChallengersContext.Provider
            value={{
                level,
                CurrentExperience,
                experienceToNextLevel,
                ChallengersCompleted,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
            }}>
            {children}
        </ChallengersContext.Provider>
    );
}