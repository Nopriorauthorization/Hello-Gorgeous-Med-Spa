import React, { useState } from 'react';
import Header from '../components/Header';
import MascotVideo from '../components/MascotVideo';
import { mascots, Mascot } from '../config/mascots';
import styles from '../styles/Chatbot.module.css';

const ChatbotPage: React.FC = () => {
  const [selectedMascot, setSelectedMascot] = useState<Mascot>(mascots[0]);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; message: string }>>([
    { sender: 'system', message: `Welcome! I'm ${mascots[0].displayName}. How can I help you today?` },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleMascotSelect = (mascot: Mascot) => {
    setSelectedMascot(mascot);
    setChatMessages((prev) => [
      ...prev,
      { sender: 'system', message: `You're now chatting with ${mascot.displayName}. ${mascot.description}!` },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', message: inputMessage },
      { sender: 'mascot', message: `Thanks for your message! ${selectedMascot.displayName} is here to help you with all your beauty and wellness needs.` },
    ]);
    setInputMessage('');
  };

  const handleVideoEnd = () => {
    setChatMessages((prev) => [
      ...prev,
      { sender: 'system', message: `${selectedMascot.displayName}'s introduction has finished. Feel free to ask any questions!` },
    ]);
  };

  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Chat with Our Mascots</h1>
          <p className={styles.pageSubtitle}>
            Meet our friendly team of mascots! Select one to watch their video introduction and start chatting.
          </p>

          <div className={styles.contentGrid}>
            {/* Mascot Selection Sidebar */}
            <aside className={styles.mascotSidebar}>
              <h2 className={styles.sidebarTitle}>Choose Your Mascot</h2>
              <div className={styles.mascotList}>
                {mascots.map((mascot) => (
                  <button
                    key={mascot.id}
                    className={`${styles.mascotButton} ${selectedMascot.id === mascot.id ? styles.active : ''}`}
                    onClick={() => handleMascotSelect(mascot)}
                  >
                    <span className={styles.mascotIcon}>
                      {mascot.displayName.charAt(0)}
                    </span>
                    <div className={styles.mascotButtonInfo}>
                      <span className={styles.mascotButtonName}>{mascot.displayName}</span>
                      <span className={styles.mascotButtonDesc}>{mascot.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            {/* Main Content Area */}
            <div className={styles.mainContent}>
              {/* Video Player */}
              <div className={styles.videoSection}>
                <MascotVideo
                  key={selectedMascot.id}
                  mascot={selectedMascot}
                  autoPlay={false}
                  loop={false}
                  muted={false}
                  onVideoEnd={handleVideoEnd}
                />
              </div>

              {/* Chat Section */}
              <div className={styles.chatSection}>
                <div className={styles.chatHeader}>
                  <h3>Chat with {selectedMascot.displayName}</h3>
                </div>
                
                <div className={styles.chatMessages}>
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`${styles.message} ${styles[msg.sender]}`}
                    >
                      {msg.sender === 'mascot' && (
                        <span className={styles.mascotAvatar}>
                          {selectedMascot.displayName.charAt(0)}
                        </span>
                      )}
                      <div className={styles.messageContent}>
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>

                <form className={styles.chatInput} onSubmit={handleSendMessage}>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={`Ask ${selectedMascot.displayName} a question...`}
                    className={styles.input}
                  />
                  <button type="submit" className={styles.sendButton}>
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ChatbotPage;
