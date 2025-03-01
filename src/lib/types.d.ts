interface DummyData {
  cities: City[]
  districts: Record<string, District[]>
}

interface City {
  id: number
  name: string
}

interface District {
  id: number
  name: string
}
