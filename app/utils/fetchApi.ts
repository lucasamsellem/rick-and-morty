import { BASE_URL } from '../constants/constants'

const fetchApi = async (endpoint: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`)

    if (!res.ok) throw new Error('Failed to fetch')

    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export default fetchApi
