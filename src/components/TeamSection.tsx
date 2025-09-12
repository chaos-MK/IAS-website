import React from 'react';

const TeamSection: React.FC = () => {
    return (
      <section className="text-white" style={{ backgroundColor: '#26353A' }}>
        <img 
          src="/images/team.png" 
          alt="Team Members" 
          className="w-full object-cover mb-4"
        />
      </section>
    );
  };

export default TeamSection;
