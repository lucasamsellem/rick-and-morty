import fetchApi from '@/utils/fetchApi';
import type { Character } from '@/store/useCharacters';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CharacterPage({ params }: Props) {
  const { id } = await params;

  const character: Character = await fetchApi(`character/${id}`);

  if (!character) return <div>Character not found</div>;

  return (
    <div>
      <h2 className='font-bold text-center text-4xl'>Welcome to {character.name} page</h2>
      <p>{character.origin.name}</p>
    </div>
  );
}
