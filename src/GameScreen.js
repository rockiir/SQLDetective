import React from 'react';
import {
    Terminal, Map, User, Database, Award, HelpCircle,
    Clock, Target, Compass, RadioTower, AlertCircle
} from 'lucide-react';
import QueryResultTable from './QueryResultTable';

const GameScreen = ({
    playerName,
    currentMission,
    missions,
    query,
    setQuery,
    hintsUsed,
    showHint,
    handleShowHint,
    handleSubmit,
    timer,
    score,
    lastResult,
    currentHintIndex,
    t,
    language 
}) => (
    <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-12 bg-gray-800 rounded-xl border border-blue-900 p-4 mb-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="bg-blue-900 px-4 py-2 rounded-lg">
                        <span className="text-blue-300">{t.agent}:</span>
                        <span className="ml-2 text-white font-bold">{playerName}</span>
                    </div>
                    <div className="bg-purple-900 px-4 py-2 rounded-lg">
                        <span className="text-purple-300">{t.mission}:</span>
                        <span className="ml-2 text-white font-bold">{currentMission + 1}/{missions.length}</span>
                    </div>
                    <div className="bg-yellow-900 px-4 py-2 rounded-lg">
                        <span className="text-yellow-300">{t.hints}:</span>
                        <span className="ml-2 text-white font-bold">{3 - hintsUsed} {t.remaining}</span>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="flex items-center">
                        <Clock className="mr-2 text-blue-400" />
                        <span className="text-lg">{timer}s</span>
                    </div>
                    <div className="flex items-center">
                        <Award className="mr-2 text-green-400" />
                        <span className="text-lg">{score} PTS</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="col-span-8 bg-gray-800 rounded-xl border border-yellow-900 shadow-2xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl text-yellow-400 flex items-center">
                    <Terminal className="mr-2" /> {t.terminal}
                </h2>
            </div>

            <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full h-32 bg-gray-900 text-green-300 p-4 rounded-lg border border-green-800 focus:ring-2 focus:ring-green-600 font-mono tracking-wider"
                placeholder="SELECT * FROM cities WHERE last_sighting = TARGET"
            />
            <div className="flex space-x-4 mt-4">
                <button
                    onClick={handleSubmit}
                    className="flex-grow px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center justify-center"
                >
                    <Target className="mr-2" /> {t.executeQuery}
                </button>
                <button
                    onClick={handleShowHint}
                    disabled={hintsUsed >= 3 && !showHint}
                    className={`px-6 py-3 rounded-lg transition flex items-center ${showHint ? 'bg-gray-600 text-white hover:bg-gray-700'
                            : hintsUsed >= 3 ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                : 'bg-yellow-600 text-black hover:bg-yellow-700'
                        }`}
                >
                    {hintsUsed >= 3 && !showHint ? (
                        <AlertCircle className="mr-2 inline" />
                    ) : (
                        <HelpCircle className="mr-2 inline" />
                    )}
                    {showHint ? t.hideHint : `${t.useHint} (${3 - hintsUsed} ${t.left})`}
                </button>
            </div>

            {showHint && (
                <div className="mt-4 p-4 bg-blue-900 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-yellow-300 font-bold">
                            {t.hints} {currentHintIndex + 1} of 3
                        </span>
                    </div>
                    <p className="text-white">
                        {missions[currentMission].hints[currentHintIndex][language] || missions[currentMission].hints[currentHintIndex].en}
                    </p>          </div>
            )}

            {lastResult && (
                <div className={`mt-4 p-4 rounded-lg ${lastResult.success ? 'bg-green-900' : 'bg-red-900'}`}>
                    <p className="mb-2">{lastResult.message}</p>
                    {lastResult.data && <QueryResultTable data={lastResult.data} t={t} />}
                </div>
            )}
        </div>

        <div className="col-span-4 bg-gray-800 rounded-xl border border-purple-900 p-6">
            <h2 className="text-2xl text-purple-400 mb-4 flex items-center">
                <Compass className="mr-2" /> {t.missionBrief}
            </h2>
            <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <p className="text-yellow-200">
                    {missions[currentMission].description[language] ?? missions[currentMission].description.en}
                </p>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <h3 className="text-lg text-blue-400 mb-2 flex items-center">
                    <RadioTower className="mr-2" /> {t.availableIntel}
                </h3>
                <div className="text-sm space-y-2">
                    <div className="flex items-center">
                        <Database className="mr-2 text-green-400" />
                        cities (id, name, country, last_sighting)
                    </div>
                    <div className="flex items-center">
                        <User className="mr-2 text-red-400" />
                        witnesses (id, name, city_id, testimony, credibility)
                    </div>
                    <div className="flex items-center">
                        <Map className="mr-2 text-purple-400" />
                        clues (id, city_id, description, timestamp)
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default GameScreen;