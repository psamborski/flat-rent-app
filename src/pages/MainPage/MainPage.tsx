import React, { useMemo, useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { SearchSelect } from '@/components/ui/custom/SearchSelect'

import './MainPage.scss'

import { getAllCities } from '@/services/api.ts'

const MainPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedValue, setSelectedValue] = useState<string>('')

  const { data: cities, isLoading: citiesLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: () => getAllCities(),
  })

  const getFilteredCities = useMemo(
    () =>
      (cities ?? []).filter((city: City) =>
        city.name.toLocaleLowerCase().startsWith(searchValue.toLocaleLowerCase()),
      ),
    [cities, searchValue],
  )

  return (
    <div className='flex h-screen w-screen flex-col items-center justify-center bg-amber-300 px-4 py-16'>
      <h1 className='mb-6 text-3xl font-bold'>Znajdź swój dom</h1>
      <div className='flex w-full max-w-3xl overflow-hidden rounded-xl bg-white shadow-lg'>
        <SearchSelect
          selectedValue={selectedValue}
          onSelectedValueChange={setSelectedValue}
          searchValue={searchValue}
          onSearchValueChange={setSearchValue}
          items={getFilteredCities.map((city) => ({ value: city.id.toString(), label: city.name }))}
          // items={[{value: '1', label: 'asd'}]}
          isLoading={citiesLoading}
          emptyMessage='Nie znaleziono miasta.'
        />
        {/*<Input*/}
        {/*  type='text'*/}
        {/*  placeholder='Cena maksymalna (PLN)'*/}
        {/*  className='h-12 w-full rounded-none border-none px-3 py-0 shadow-none'*/}
        {/*/>*/}
        {/*<Input*/}
        {/*  type='text'*/}
        {/*  placeholder='Cena maksymalna (PLN)'*/}
        {/*  className='h-12 w-full rounded-none border-none px-3 py-0 shadow-none'*/}
        {/*/>*/}
        <Button className='col-span-full w-full rounded-none bg-blue-600 py-4 text-white hover:bg-blue-700 sm:col-span-1'>
          Szukaj
        </Button>
      </div>
    </div>
  )
}

export default MainPage
