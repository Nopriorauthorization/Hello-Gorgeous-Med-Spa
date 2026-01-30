import React from 'react';
import Header from '../components/Header';
import MascotAvatar from '../components/MascotAvatar';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Welcome to Hello Gorgeous Med Spa</h1>
            <p className={styles.subtitle}>Your journey to beauty and wellness starts here.</p>
          </div>
          <div className={styles.mascotContainer}>
            <MascotAvatar name="peppi" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;