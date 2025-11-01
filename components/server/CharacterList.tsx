import fetchApi from '@/utils/fetchApi';
import CharacterCard from '../client/CharacterCard';

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Male' | 'Female' | 'unknown' | string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export default async function CharacterList() {
  const res = await fetchApi('character');
  const characters: Character[] = res.results;

  return (
    <ul className='flex flex-col gap-y-5'>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </ul>
  );
}
