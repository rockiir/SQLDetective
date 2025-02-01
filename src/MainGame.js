import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import IntroScreen from './IntroScreen';
import GameScreen from './GameScreen';
import { missions } from './missions';
import { executeQuery } from './gameLogic';
import LanguageSelector from './LanguageSelector';
import { translations } from './translations';

const MainGame = () => {
    const [playerName, setPlayerName] = useState('');
    const [nameSubmitted, setNameSubmitted] = useState(false);
    const [currentMission, setCurrentMission] = useState(0);
    const [query, setQuery] = useState('');
    const [hintsUsed, setHintsUsed] = useState(0);
    const [hintsList, setHintsList] = useState([]); // Estado para armazenar as dicas
    const [showHint, setShowHint] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [lastResult, setLastResult] = useState(null);
    const [timer, setTimer] = useState(300);
    const [score, setScore] = useState(0);
    const [showIntro, setShowIntro] = useState(true);
    const [currentHintIndex, setCurrentHintIndex] = useState(0);
    const [language, setLanguage] = useState('pt');
    const [gameOver, setGameOver] = useState(false);
    const t = translations[language];

    // Timer
    useEffect(() => {
        if (gameStarted && timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);

            return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
        } else if (timer === 0) {
            alert(t.timeUp); // Exibe uma mensagem de tempo esgotado
            setGameStarted(false); // Para o jogo
        }
    }, [gameStarted, timer, t]);

    // Lógica para mostrar dicas
    const handleShowHint = () => {
        if (hintsUsed < missions[currentMission].hints.length) {
            // Adiciona a próxima dica à lista
            setHintsList(prev => [...prev, missions[currentMission].hints[hintsUsed]]);
    
            // Incrementa o número de dicas usadas
            setHintsUsed(prev => prev + 1);
    
            // Mostra as dicas
            setShowHint(true);
        } else {
            // Alterna a visibilidade das dicas (oculta ou exibe todas)
            setShowHint(prev => !prev);
        }
    };

    const handleSubmit = () => {
        // Executa a query do jogador
        const playerResult = executeQuery(query);
    
        if (playerResult.success) {
            // Verifica se a query do jogador retornou algum dado
            if (playerResult.data.length === 0) {
                // Resposta incorreta (array vazio)
                setLastResult({
                    success: false,
                    message: "No results found. Check your query conditions.",
                    data: playerResult.data
                });
                return;
            }
    
            // Se a query retornou algum resultado, aceita-a como válida
            const timeBonus = timer * 10;
            setScore(prev => prev + 100 + timeBonus);
            setLastResult({
                success: true,
                message: `${t.missionAccomplished} ${missions[currentMission].location}! ${t.timeBonus}: ${timeBonus} points`,
                data: playerResult.data
            });
    
            if (currentMission < missions.length - 1) {
                setTimeout(() => {
                    setCurrentMission(prev => prev + 1);
                    setQuery('');
                    setTimer(300);
                    setCurrentHintIndex(0);
                    setShowHint(false);
                    setHintsList([]); // Limpa a lista de dicas ao avançar para a próxima missão
                }, 2000);
            } else {
                setGameOver(true);
            }
        } else {
            // Query inválida
            setLastResult({
                success: false,
                message: t.queryError
            });
        }
    };
    // Lógica para iniciar o jogo
    const startGame = () => {
        if (playerName.trim().length >= 2) {
            setNameSubmitted(true);
            setShowIntro(false);
            setGameStarted(true);
        }
    };

    // Tela de finalização
    if (gameOver) {
        return (
            <div className="text-center">
                <h1 className="text-4xl font-bold text-yellow-400">{t.gameOver}</h1>
                <p className="text-2xl mt-4">{t.finalScore}: {score}</p>
            </div>
        );
    }

    return (
        <div className="text-white min-h-screen bg-gradient-to-br from-gray-900 to-black">
            <LanguageSelector language={language} setLanguage={setLanguage} />
            {showIntro ? (
                <IntroScreen
                    playerName={playerName}
                    setPlayerName={setPlayerName}
                    startGame={startGame}
                    t={t}
                />
            ) : (
                <GameScreen
                    playerName={playerName}
                    currentMission={currentMission}
                    missions={missions}
                    query={query}
                    setQuery={setQuery}
                    hintsUsed={hintsUsed}
                    showHint={showHint}
                    handleShowHint={handleShowHint}
                    handleSubmit={handleSubmit}
                    timer={timer}
                    score={score}
                    lastResult={lastResult}
                    currentHintIndex={currentHintIndex}
                    t={t}
                    language={language}
                    hintsList={hintsList} // Passa a lista de dicas
                />
            )}
        </div>
    );
};

export default MainGame;