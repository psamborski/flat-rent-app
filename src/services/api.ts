import data from '@/static/data.json'

interface City {
  id: number
  name: string
}

interface CityOption {
  id: number
  name: string
}

export const getCities = async (filter: string): Promise<CityOption[]> => {
  // data latency simulation
  await new Promise((resolve) => setTimeout(resolve, 200))

  // cities filtering
  const lowerFilter = filter.toLocaleLowerCase()
  return data
    .filter((city: City) => city.name.toLocaleLowerCase().startsWith(lowerFilter))
    .slice(0, 20) // Ograniczenie do 20 wyników
    .map((city: City) => ({
      id: city.id,
      name: city.name,
    }))
}
