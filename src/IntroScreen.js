import React, { useState } from 'react';
import { PlayCircle, HelpCircle, UserCheck } from 'lucide-react';
import HowToPlayModal from './HowToPlayModal.js';

const IntroScreen = ({ playerName, setPlayerName, startGame, t }) => {
  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);

  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url("/api/placeholder/1600/900")',
        backgroundSize: 'cover'
      }}
    >
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-red-500 tracking-wide drop-shadow-lg">
          {t.title}
        </h1>
        <h2 className="text-8xl font-extrabold text-yellow-400 mb-8 animate-pulse">
          {t.subtitle}
        </h2>
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-96">
              <label className="block text-yellow-400 text-xl mb-2 flex items-center justify-center">
                <UserCheck className="mr-2" /> {t.enterName}
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className={`w-full px-4 py-2 bg-gray-900 text-white rounded 
                  border-2 focus:outline-none text-center text-lg
                  ${playerName.trim().length < 2 && playerName.trim().length > 0
                    ? 'border-red-600'
                    : 'border-yellow-600 focus:border-yellow-400'
                  }`}
                placeholder={t.enterName}
                minLength={2}
              />
              {playerName.trim().length < 2 && playerName.trim().length > 0 && (
                <p className="text-red-400 text-sm mt-2">
                  {t.nameTooShort}
                </p>
              )}
            </div>
          </div>
          <div className="space-x-4 flex items-center justify-center">
  <button 
    onClick={startGame}
    disabled={playerName.trim().length < 2}
    className={`px-10 py-4 bg-red-600 text-white rounded-full text-2xl 
      transform transition duration-300 shadow-lg flex items-center
      ${playerName.trim().length >= 2 
        ? 'hover:bg-red-700 hover:scale-105 hover:shadow-red-500/50' 
        : 'opacity-50 cursor-not-allowed'}`}
  >
    <PlayCircle className="mr-2" size={24} /> {t.startMission}
  </button>
  <button
    onClick={() => setIsHowToPlayOpen(true)}
    className="px-8 py-4 bg-gray-700 text-white rounded-full text-2xl
      transform transition duration-300 shadow-lg flex items-center
      hover:bg-gray-600 hover:scale-105 hover:shadow-gray-500/50"
  >
    <HelpCircle className="mr-2" size={24} /> {t.howToPlay}
  </button>
</div>
        </div>
      </div>

      <HowToPlayModal
        isOpen={isHowToPlayOpen}
        onClose={() => setIsHowToPlayOpen(false)}
        t={t}
      />
    </div>
  );
};

export default IntroScreen;