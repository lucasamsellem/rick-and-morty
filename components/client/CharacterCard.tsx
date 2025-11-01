'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Character } from '../server/CharacterList';

type CharacterCardProps = {
  character: Character;
};

function addPlural(count: number, word: string): string {
  return count > 1 ? `${word}s` : word;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const [state, setState] = useState({
    isGuessing: false,
    hasGuessed: false,
    guess: '',
  });

  const nbEpisodes = character.episode.length;
  const isCorrect = state.guess === character.gender.toLowerCase();

  const toggleGuessMode = () =>
    setState((prev) => ({ ...prev, isGuessing: !prev.isGuessing, hasGuessed: false, guess: '' }));

  const handleGuessChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setState((prev) => ({
      ...prev,
      guess: event.target.value,
      hasGuessed: true,
    }));
  };

  return (
    <li className='grid grid-cols-[auto_1fr_1fr] items-center gap-x-5 rounded-xl p-2 shadow-white transition'>
      <Image
        src={character.image}
        alt={character.name}
        width={150}
        height={150}
        className='rounded-full'
      />

      <div>
        <h2 className='text-2xl font-semibold'>{character.name}</h2>
        <h3 className='text-lg'>
          Appeared in {nbEpisodes} {addPlural(nbEpisodes, 'episode')}
        </h3>
        <h4 className='opacity-70'>{character.status}</h4>
      </div>

      <div className='flex items-center gap-x-5'>
        <button
          onClick={toggleGuessMode}
          className={`rounded-lg bg-slate-800 px-3 py-1 font-semibold hover:bg-slate-700 ${
            state.isGuessing ? 'ring-2 ring-slate-500' : ''
          }`}
        >
          Guess gender
        </button>

        {state.isGuessing && (
          <select
            name='guessedGender'
            className='rounded-lg border border-white bg-zinc-800 px-1 py-1 focus:outline-none'
            value={state.guess}
            onChange={handleGuessChange}
          >
            <option value='' disabled>
              Choose
            </option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='unknown'>Unknown</option>
          </select>
        )}

        {state.hasGuessed && (
          <p className={`text-lg font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'Correct' : 'Wrong'}
          </p>
        )}
      </div>
    </li>
  );
}
