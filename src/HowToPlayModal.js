import React from 'react';
import { X } from 'lucide-react';

const HowToPlayModal = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-2xl w-full m-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-yellow-500 mb-6 text-center">
          {t.howToPlayTitle || "Como Jogar"}
        </h2>

        <div className="space-y-6 text-white">
          <section className="space-y-2">
            <h3 className="text-xl font-semibold text-yellow-400">
              {t.objectiveTitle || "Objetivo"}
            </h3>
            <p className="text-gray-300">
              {t.objectiveText || "Encontre Carmen Sandiego resolvendo os desafios SQL em cada missão. Você precisará usar suas habilidades de banco de dados para rastrear suas pistas e localização."}
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-xl font-semibold text-yellow-400">
              {t.howToPlayTitle || "Como Jogar"}
            </h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>{t.step1 || "Cada missão apresenta um cenário com informações sobre o paradeiro de Carmen"}</li>
              <li>{t.step2 || "Escreva consultas SQL para buscar as informações necessárias no banco de dados"}</li>
              <li>{t.step3 || "Use as dicas disponíveis se precisar de ajuda"}</li>
              <li>{t.step4 || "Complete todas as missões para capturar Carmen Sandiego"}</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="text-xl font-semibold text-yellow-400">
              {t.tipsTitle || "Dicas"}
            </h3>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>{t.tip1 || "Leia atentamente a descrição da missão - ela contém pistas importantes"}</li>
              <li>{t.tip2 || "Examine a estrutura das tabelas antes de escrever suas consultas"}</li>
              <li>{t.tip3 || "Se ficar preso, use as dicas disponíveis - elas podem ajudar!"}</li>
            </ul>
          </section>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition-colors font-semibold"
          >
            {t.closeButton || "Entendi!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayModal;