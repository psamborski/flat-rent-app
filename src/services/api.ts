import data from '@/static/data.json'

export const getAllCities = async (): Promise<City[]> => {
  // data latency simulation
  await new Promise((resolve) => setTimeout(resolve, 200))

  // return cities
  return data
}

export const getFilteredCities = async (filter: string): Promise<City[]> => {
  // data latency simulation
  await new Promise((resolve) => setTimeout(resolve, 200))

  // cities filtering
  const lowerFilter = filter.toLocaleLowerCase()
  return data.filter((city: City) => city.name.toLocaleLowerCase().startsWith(lowerFilter))
  // .slice(0, 20)
  // .map((city: City) => ({
  //   id: city.id,
  //   name: city.name,
  // }))
}
