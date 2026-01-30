import React from 'react';
import styles from './MascotAvatar.module.css';

interface MascotAvatarProps {
  name: string;
  className?: string;
}

const MascotAvatar: React.FC<MascotAvatarProps> = ({ name, className }) => {
  return (
    <div className={`${styles.avatar} ${className || ''}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className={styles.video}
      >
        <source src={`/mascots/${name}.mp4`} type="video/mp4" />
        <source src={`/mascots/${name}.webm`} type="video/webm" />
      </video>
    </div>
  );
};

export default MascotAvatar;
