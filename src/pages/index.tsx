
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css'
import React from 'react';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengersProvider } from '../contexts/ChallengersContext';

interface HomeProps {
  level: number,
  CurrentExperience: number
  ChallengersCompleted: number
}

export default function Home(props: HomeProps) {

  return (
    <ChallengersProvider 
    level={props.level}
    CurrentExperience={props.CurrentExperience}
    ChallengersCompleted={props.ChallengersCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengersProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, CurrentExperience, ChallengersCompleted } = ctx.req.cookies

  return {
    props: {
      level: Number(level),
      CurrentExperience: Number(CurrentExperience),
      ChallengersCompleted: Number(ChallengersCompleted)
    }
  }
}
