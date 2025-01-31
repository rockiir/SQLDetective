import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react'; // Importe o ícone Clock
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
    const [showHint, setShowHint] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [lastResult, setLastResult] = useState(null);
    const [timer, setTimer] = useState(300);
    const [score, setScore] = useState(0);
    const [showIntro, setShowIntro] = useState(true);
    const [currentHintIndex, setCurrentHintIndex] = useState(0);
    const [language, setLanguage] = useState('en');
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
        if (!showHint && hintsUsed < 3) {
            setHintsUsed(prev => prev + 1);
            setShowHint(true);
            if (currentHintIndex < missions[currentMission].hints.length - 1) {
                setCurrentHintIndex(prev => prev + 1);
            }
        } else if (showHint) {
            setShowHint(false);
        }
    };
    const handleSubmit = () => {
        const result = executeQuery(query);
        const expectedResult = executeQuery(missions[currentMission].solution);
    
        // Normaliza as queries para comparação
        const normalizeQueryString = (queryString) => {
            return queryString
                .replace(/\s+/g, ' ') // Remove espaços extras
                .replace(/\s*=\s*/g, '=') // Normaliza espaços ao redor do '='
                .toLowerCase()
                .trim();
        };
    
        const normalizedQuery = normalizeQueryString(query);
        const normalizedSolution = normalizeQueryString(missions[currentMission].solution);
    
        if (result.success) {
            // Verifica se a query do jogador corresponde exatamente à solução esperada
            if (normalizedQuery === normalizedSolution) {
                // Resposta correta
                const timeBonus = timer * 10;
                setScore(prev => prev + 100 + timeBonus);
                setLastResult({
                    success: true,
                    message: `${t.missionAccomplished} ${missions[currentMission].location}! ${t.timeBonus}: ${timeBonus} points`,
                    data: result.data
                });
    
                if (currentMission < missions.length - 1) {
                    setTimeout(() => {
                        setCurrentMission(prev => prev + 1);
                        setQuery('');
                        setTimer(300);
                        setCurrentHintIndex(0);
                        setShowHint(false);
                    }, 2000);
                } else {
                    setGameOver(true);
                }
            } else {
                // Resposta incorreta
                setLastResult({
                    success: false,
                    message: "Incorrect query. Make sure you follow the mission instructions.",
                    data: result.data
                });
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
                />
            )}
        </div>
    );
};

export default MainGame;