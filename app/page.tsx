import CharacterList from './components/server/CharacterList'
import Header from './components/server/Header'

export default function Home() {
  return (
    <div className="p-5">
      <Header />
      <CharacterList />
    </div>
  )
}
