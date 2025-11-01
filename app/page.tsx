import CharacterList from '@/components/client/CharacterList'
import { Character } from '@/store/useCharacters'
import fetchApi from '@/utils/fetchApi'

export default async function HomePage() {
  const res = await fetchApi('character')
  const initialCharacters: Character[] = res.results
  const totalPages = res.info.pages

  return <CharacterList initialCharacters={initialCharacters} totalPages={totalPages} />
}
