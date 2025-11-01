'use client'

import Image from 'next/image'
import type { Character } from '../server/CharacterList'
import { useState } from 'react'

type CharacterCardProps = {
  character: Character
}

const addPlural = (occurences: number, word: string) => {
  return occurences > 1 ? word + 's' : word
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const [{ isGuessingGender, isGenderGuessed, guessedGender }, setIsGuessingGender] = useState({
    isGuessingGender: false,
    isGenderGuessed: false,
    guessedGender: '',
  })

  const hasGuessedGender = guessedGender === character.gender.toLowerCase()
  const nbEpisodes = character.episode.length

  const handleGuessGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsGuessingGender(prev => ({ ...prev, isGenderGuessed: true }))
    setIsGuessingGender(prev => ({ ...prev, guessedGender: event.target.value }))
  }

  return (
    <li
      key={character.id}
      className="grid grid-cols-[auto_1fr_1fr] rounded-xl items-center gap-x-5 shadow-white p-2 transition"
    >
      <Image
        src={character.image}
        alt={character.name}
        width={150}
        height={150}
        className="rounded-full"
      />

      <div>
        <h2 className="text-2xl font-semibold">{character.name}</h2>
        <h3 className="text-lg">
          Appeared in {nbEpisodes} {addPlural(nbEpisodes, 'episode')}
        </h3>
        <h4 className="opacity-70">{character.status}</h4>
      </div>

      <div className="flex items-center gap-x-5">
        <button
          onClick={() =>
            setIsGuessingGender(prev => ({ ...prev, isGuessingGender: !prev.isGuessingGender }))
          }
          className={`bg-slate-800 px-3 py-1 rounded-lg font-semibold hover:bg-slate-700 ${
            isGuessingGender ? 'bg-slate-700!' : ''
          }`}
        >
          Guess gender
        </button>

        {isGuessingGender && (
          <select
            name="guessedGender"
            className="border px-1 rounded-lg py-1 border-white focus:outline-none"
            onChange={handleGuessGender}
          >
            <option disabled selected value="Choose">
              Choose
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
        )}

        {isGenderGuessed && (
          <p className="text-lg font-semibold">{hasGuessedGender ? 'Correct' : 'Wrong'}</p>
        )}
      </div>
    </li>
  )
}
