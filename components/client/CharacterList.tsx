'use client'

import { Character } from '@/store/useCharacters'
import { useEffect, useState } from 'react'
import CharacterCard from './CharacterCard'
import fetchApi from '@/utils/fetchApi'

interface CharacterListProps {
  initialCharacters: Character[]
  totalPages: number
}

export default function CharacterList({ initialCharacters, totalPages }: CharacterListProps) {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (currentPage === 1) return

    async function fetchCharacters() {
      const res = await fetchApi(`character?page=${currentPage}`)
      setCharacters(res.results)
    }

    fetchCharacters()
  }, [currentPage])

  return (
    <>
      <ul className="flex gap-x-2">
        {Array.from({ length: totalPages }, (_, i) => {
          const isActive = currentPage === i + 1

          return (
            <li key={i}>
              <button
                className={`${isActive ? 'font-bold' : ''}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          )
        })}
      </ul>

      <ul className="flex flex-col gap-y-5">
        {characters.map(c => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </ul>
    </>
  )
}
