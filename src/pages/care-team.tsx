import React, { useState } from 'react';
import Header from '../components/Header';

// Care team mascots - your virtual care guides
const careTeam = [
  {
    id: 'founder',
    name: 'Founder',
    title: 'Trust Anchor',
    credentials: 'OWNER | RN-S | CMAA',
    specialty: 'Provider Translator',
    bio: 'I built No Prior Authorization because patients deserve clarity - not confusion. I explain how providers think - without defending bad medicine.',
    videoFile: 'founder.mp4',
    chatLink: '/chat?mascot=founder',
  },
  {
    id: 'beau-tox',
    name: 'Beau-Tox',
    title: 'Aesthetics Guide',
    specialty: 'Botox & Neuromodulators',
    bio: "Hey - I'm Beau-Tox. I say what injectors think - but won't say to your face. No sugar-coating here.",
    videoFile: 'beau-tox.mp4',
    chatLink: '/chat?mascot=beau-tox',
  },
  {
    id: 'filla-grace',
    name: 'Grace',
    title: 'Filler Expert',
    specialty: 'Fillers & Facial Anatomy',
    bio: "I explain fillers, facial anatomy, and why 'natural' is usually just good marketing. Fillers are about restoring harmony, not changing who you are.",
    videoFile: 'filla-grace.mp4',
    chatLink: '/chat?mascot=f-ill',
  },
  {
    id: 'slim-t',
    name: 'Slim-T',
    title: 'Metabolism Coach',
    specialty: 'Weight Loss & Hormones',
    bio: "Hormones and weight loss aren't magic. I'll tell you what actually moves the needle. No BS - just real talk about sustainable change.",
    videoFile: 'slim-t.mp4',
    chatLink: '/chat?mascot=slim-t',
  },
  {
    id: 'peppi',
    name: 'Peppi',
    title: 'Peptides Specialist',
    specialty: 'Peptide Science',
    bio: 'I break down peptides in simple terms - short chains of amino acids that signal processes in the body. I separate hype from real science.',
    videoFile: 'peppi.mp4',
    chatLink: '/chat?mascot=peppi',
  },
  {
    id: 'harmony',
    name: 'Harmony',
    title: 'Hormone Guide',
    specialty: 'Hormone Balance & Wellness',
    bio: "Hormone balance is about symptoms, patterns, and overall wellbeing - not a single number. I help you understand what's really going on.",
    videoFile: 'harmony.mp4',
    chatLink: '/chat?mascot=harmony',
  },
  {
    id: 'decode',
    name: 'Decode',
    title: 'Lab Decoder',
    specialty: 'Lab Results & Testing',
    bio: 'I translate complex lab results into plain English. Understanding your numbers is the first step to taking control of your health.',
    videoFile: 'decode.mp4',
    chatLink: '/chat?mascot=decode',
  },
  {
    id: 'roots',
    name: 'Roots',
    title: 'Family Health Guide',
    specialty: 'Family History & Genetics',
    bio: 'Your health story starts with your family tree. I help you understand how genetics and family history shape your wellness journey.',
    videoFile: 'roots.mp4',
    chatLink: '/chat?mascot=roots',
  },
];

interface TeamMember {
  id: string;
  name: string;
  title: string;
  credentials?: string;
  specialty: string;
  bio: string;
  videoFile: string;
  chatLink: string;
}

interface ChatBoxProps {
  member: TeamMember;
}

const TeamMemberChatBox: React.FC<ChatBoxProps> = ({ member }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="expert-chat-box">
      <div className="chat-header">
        <div className="expert-avatar">
          {member.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div className="expert-info">
          <h3>{member.name}</h3>
          <span className="expert-title">{member.title}</span>
          {member.credentials && (
            <span className="expert-credentials">{member.credentials}</span>
          )}
        </div>
        <div className="online-status">
          <span className="status-dot"></span>
          Available
        </div>
      </div>
      
      <div className="chat-content">
        <div className="message-bubble">
          <p><strong>Specialty:</strong> {member.specialty}</p>
          <p>{member.bio}</p>
        </div>
        
        <div className="video-section">
          {!isVideoOpen ? (
            <button 
              className="video-trigger"
              onClick={() => setIsVideoOpen(true)}
            >
              <span className="play-icon">▶</span>
              <span>Watch my introduction</span>
            </button>
          ) : (
            <div className="video-container">
              <video 
                src={`/videos/mascots/${member.videoFile}`}
                controls
                autoPlay
                width="100%"
              >
                Your browser does not support the video tag.
              </video>
              <button 
                className="close-video"
                onClick={() => setIsVideoOpen(false)}
              >
                Close video
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="chat-footer">
        <a href={member.chatLink} className="book-btn">
          Chat with {member.name}
        </a>
      </div>
    </div>
  );
};

const MeetYourCareTeam: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="experts-page">
        <div className="experts-header">
          <h1>Meet Your Care Team</h1>
          <p>Your personal guides to understanding health, wellness, and aesthetics. Watch their introductions and start a conversation.</p>
        </div>
        
        <div className="experts-grid">
          {careTeam.map((member) => (
            <TeamMemberChatBox key={member.id} member={member} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default MeetYourCareTeam;
