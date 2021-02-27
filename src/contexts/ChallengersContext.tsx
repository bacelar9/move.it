import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type:'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengersContextData {
    level: number;
    CurrentExperience: number;
    ChallengersConpleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp:() => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
}

interface ChallengersProviderProps {
    children: ReactNode
}

export const ChallengersContext = createContext({} as ChallengersContextData);

export function ChallengersProvider({ children }: ChallengersProviderProps) {
    const [level, setLevel] = useState(1);
    const [CurrentExperience, seturrentExperience] = useState(0)
    const [ChallengersConpleted, setChallengersConpleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallegeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallegeIndex]

        setActiveChallenge(challenge)
    }

    function resetChallenge () {
        setActiveChallenge(null)
    }

    return (
        < ChallengersContext.Provider
            value={{
                level,
                CurrentExperience,
                experienceToNextLevel,
                ChallengersConpleted,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
            }}>
            {children}
        </ChallengersContext.Provider>
    );
}