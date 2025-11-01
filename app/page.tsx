import CharacterCard from '@/components/client/CharacterCard';
import Header from '@/components/server/Header';
import { Character } from '@/store/useCharacters';
import fetchApi from '@/utils/fetchApi';

export default async function HomePage() {
  const res = await fetchApi('character');
  const characters: Character[] = res.results;

  return (
    <div className='p-5'>
      <Header />

      <ul className='flex flex-col gap-y-5'>
        {characters.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </ul>
    </div>
  );
}
