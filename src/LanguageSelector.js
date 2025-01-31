import React from 'react';
import { Globe } from 'lucide-react';

const LanguageSelector = ({ language, setLanguage }) => (
  <button
    onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
    className="fixed top-4 right-4 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
  >
    <Globe className="text-white" />
    <span className="ml-2 text-white">{language.toUpperCase()}</span>
  </button>
);

export default LanguageSelector;