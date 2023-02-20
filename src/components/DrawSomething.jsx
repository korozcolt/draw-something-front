import React, { useState } from "react";

import { DRAW_URL } from "../constant/env";
import axios from "axios";

export default function DrawSomething() {
    const [letters, setLetters] = useState("");
    const [wordLength, setWordLength] = useState(0);
    const [words, setWords] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(DRAW_URL, { letters, wordLength });
            setWords(response.data);
            setError("");
        } catch (error) {
            setWords([]);
            setError(error.message);
        }
        setIsLoading(false);
    }

    return (
        <div className="p-4">
            <div className="p-4">
                <form onSubmit={handleSubmit} className="mb-4" >
                    <div className="flex">
                        <label className="mr-2">
                            Letters:
                            <input
                                type="text"
                                value={letters}
                                onChange={(e) => setLetters(e.target.value)}
                                className="ml-2 p-2 rounded border-gray-400 border-2"
                                pattern="[a-zA-Z]+"
                                title="Letters must only contain letters"
                            />
                        </label>
                        <label className="mr-2">
                            Word length:
                            <input
                                type="number"
                                value={wordLength}
                                onChange={(e) => setWordLength(parseInt(e.target.value))}
                                className="ml-2 p-2 rounded border-gray-400 border-2"
                                title="Word length must be a number"
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={
                            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" + (isLoading ? " opacity-50 cursor-not-allowed" : "")
                        }
                    >
                        {isLoading ? "Loading..." : "Get Words"}
                    </button>
                </form>
            </div>
            <div className="p-4">
                <h2>Palabras encontradas: </h2>
                {words.length === 0 ? (
                    <p>No se encontraron palabras con las letras {letters} y longitud {wordLength}.</p>
                ) : (
                    <div>
                        <p>Se encontraron {words.length} palabras con las letras {letters} y longitud {wordLength}:</p>
                        {words.reduce((acc, word, index) => {
                            if (index % 6 === 0) {
                                acc.push([]);
                            }
                            acc[acc.length - 1].push(word);
                            return acc;
                        }, []).map((group, index) => (
                            <div key={index}>
                                {group.join(', ')}
                            </div>
                        ))}
                    </div>
                )}
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}
