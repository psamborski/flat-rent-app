import data from '@/static/data.json'

// give a data appropriate type
const typedData = data as DummyData

export const getAllCities = async (): Promise<City[]> => {
  // data latency simulation
  await new Promise((resolve) => setTimeout(resolve, 200))

  return typedData.cities
}

export const getFilteredCities = async (filter: string): Promise<City[]> => {
  // data latency simulation
  await new Promise((resolve) => setTimeout(resolve, 200))

  // cities filtering
  const lowerFilter = filter.toLocaleLowerCase()
  return typedData.cities.filter((city: City) =>
    city.name.toLocaleLowerCase().startsWith(lowerFilter),
  )
  // .slice(0, 20)
  // .map((city: City) => ({
  //   id: city.id,
  //   name: city.name,
  // }))
}

export const getDistrictsByCity = async (cityId: number): Promise<District[]> => {
  // data latency simulation
  await new Promise((resolve) => setTimeout(resolve, 200))

  // return cities
  return typedData.districts[cityId.toString()] ?? []
}
