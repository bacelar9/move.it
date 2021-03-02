import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengersContextData {
    level: number;
    CurrentExperience: number;
    ChallengersCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface ChallengersProviderProps {
    children: ReactNode
    level: number,
    CurrentExperience: number
    ChallengersCompleted: number
}

export const ChallengersContext = createContext({} as ChallengersContextData);

export function ChallengersProvider({ 
    children, 
    ...rest  // (ojeto) javaScript que contém as propriedades level, CurrentExperience e ChallengersCompleted
}: ChallengersProviderProps) {
  
    const [level, setLevel] = useState(rest.level ?? 1);//ternária se não existir o valor será 1
    const [CurrentExperience, setCurrentExperience] = useState(rest.CurrentExperience ?? 0)
    const [ChallengersCompleted, setChallengersCompleted] = useState(rest.ChallengersCompleted ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level)) //pode ser tambem -> level.toString
        Cookies.set('CurrentExperience', String(CurrentExperience))
        Cookies.set('ChallengersCompleted', String(ChallengersCompleted))
    }, [level, CurrentExperience, ChallengersCompleted])

    function levelUp() {
        setLevel(level + 1)
        setisLevelUpModalOpen(true)
    }

    function closeLevelUpModal () {
        setisLevelUpModalOpen(false)
    }

    function startNewChallenge() {
        const randomChallegeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallegeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
    }

    function resetChallenge() {
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
                closeLevelUpModal,
            }}>
            {children}
            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengersContext.Provider>
    );
}