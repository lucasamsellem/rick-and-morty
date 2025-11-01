'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Character } from '@/store/useCharacters'
import Link from 'next/link'

type CharacterCardProps = {
  character: Character
}

function addPlural(count: number, word: string): string {
  return count > 1 ? `${word}s` : word
}

export default function CharacterCard({ character }: CharacterCardProps) {
  const { name, status, id, episode, gender, image } = character

  const [guess, setGuess] = useState({
    isGuessing: false,
    hasGuessed: false,
    guess: '',
  })

  const isCorrect = guess.guess === gender.toLowerCase()

  const toggleGuessMode = () =>
    setGuess(prev => ({ ...prev, isGuessing: !prev.isGuessing, hasGuessed: false, guess: '' }))

  const handleGuessChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGuess(prev => ({
      ...prev,
      guess: event.target.value,
      hasGuessed: true,
    }))
  }

  return (
    <li className="grid grid-cols-[auto_1fr_1fr] items-center gap-x-5 rounded-xl p-2 shadow-white transition">
      <Image src={image} alt={name} width={150} height={150} className="rounded-full" />

      <div>
        <Link href={`character/${id}`} className="text-2xl font-semibold hover:underline">
          {name}
        </Link>
        <h3 className="text-lg">
          Appeared in {episode.length} {addPlural(episode.length, 'episode')}
        </h3>
        <h4 className="opacity-70">{status}</h4>
      </div>

      <div className="flex items-center gap-x-5">
        <button
          onClick={toggleGuessMode}
          className={`rounded-lg bg-slate-800 px-3 text-white py-1 font-semibold hover:bg-slate-700`}
        >
          Guess gender
        </button>

        {guess.isGuessing && (
          <select
            name="guessedGender"
            className="rounded-lg border border-zinc-600 focus:outline-none"
            value={guess.guess}
            onChange={handleGuessChange}
          >
            <option value="" disabled>
              Choose
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unknown">Unknown</option>
          </select>
        )}

        {guess.hasGuessed && (
          <p className={`text-lg font-semibold ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect ? 'Correct' : 'Wrong'}
          </p>
        )}
      </div>
    </li>
  )
}
