import React from 'react';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>Welcome to Hello Gorgeous Med Spa</h1>
        <p>Your journey to beauty and wellness starts here.</p>

        {/* Video Section - add your video files to /public/videos/ */}
        <section className="video-section">
          <h2>See Our Spa</h2>
          {/* 
            To use: 
            1. Add your video file to /public/videos/ (e.g., spa-intro.mp4)
            2. Uncomment the video tag below and update the src
          */}
          {/* <video 
            src="/videos/spa-intro.mp4" 
            controls 
            width="100%"
            style={{ maxWidth: '800px' }}
          >
            Your browser does not support the video tag.
          </video> */}
        </section>
      </main>
    </div>
  );
};

export default Home;