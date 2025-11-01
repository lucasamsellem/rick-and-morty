import { create } from 'zustand';

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

interface CharacterState {
  characters: Character[];
  setCharacters: (chars: Character[]) => void;
}

export const useCharacters = create<CharacterState>((set) => ({
  characters: [],
  setCharacters: (characters: Character[]) => set({ characters }),
}));
