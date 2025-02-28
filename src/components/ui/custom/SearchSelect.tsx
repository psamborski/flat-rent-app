// https://github.com/Balastrong/shadcn-autocomplete-demo
import { useMemo, useState } from 'react'

import { Command as CommandPrimitive } from 'cmdk'

import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../command'
import { Input } from '../input'
import { Popover, PopoverAnchor, PopoverContent } from '../popover'
import { Skeleton } from '../skeleton'

interface Props<T extends string> {
  selectedValue: T
  onSelectedValueChange: (value: T) => void
  searchValue: string
  onSearchValueChange: (value: string) => void
  items: { value: T; label: string }[]
  isLoading?: boolean
  emptyMessage?: string
  placeholder?: string
}

// todo selected item as tag option
// todo use user's location to autofill
// todo to arrow component

export function SearchSelect<T extends string>({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage = 'Nie znaleziono.',
  placeholder = 'Szukaj...',
}: Props<T>) {
  const [open, setOpen] = useState(false)

  const labels = useMemo(
    () =>
      items.reduce<Record<string, string>>((acc, item) => {
        acc[item.value] = item.label
        return acc
      }, {}),
    [items],
  )

  // const reset = () => {
  //   onSelectedValueChange('' as T)
  //   onSearchValueChange('')
  // }

  const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!e.relatedTarget?.hasAttribute('cmdk-list') && labels[selectedValue] !== searchValue) {
      // if users' input doesn't match any item on the list, reset input in blur - not necessary
      // reset()
    }
  }

  const onSelectItem = (inputValue: string) => {
    if (inputValue === selectedValue) {
      // "uncheck" value while clicking an item on the list for the second time - not necessary
      // reset()
    } else {
      onSelectedValueChange(inputValue as T)
      onSearchValueChange(labels[inputValue] ?? '')
    }
    setOpen(false)
  }

  return (
    <div className='flex items-center'>
      <Popover open={open} onOpenChange={setOpen}>
        <Command shouldFilter={false}>
          <PopoverAnchor asChild>
            <CommandPrimitive.Input
              asChild
              value={searchValue}
              onValueChange={onSearchValueChange}
              onKeyDown={(e) => {
                setOpen(e.key !== 'Escape')
              }}
              onMouseDown={() => {
                setOpen((open) => Boolean(searchValue) || !open)
              }}
              onFocus={() => {
                setOpen(true)
              }}
              onBlur={onInputBlur}
            >
              <Input placeholder={placeholder} />
            </CommandPrimitive.Input>
          </PopoverAnchor>
          {!open && <CommandList aria-hidden='true' className='hidden' />}
          <PopoverContent
            asChild
            onOpenAutoFocus={(e) => {
              e.preventDefault()
            }}
            onInteractOutside={(e) => {
              if (e.target instanceof Element && e.target.hasAttribute('cmdk-input')) {
                e.preventDefault()
              }
            }}
            className='w-[--radix-popover-trigger-width] p-0'
          >
            <CommandList>
              {isLoading && (
                <CommandPrimitive.Loading>
                  <div className='p-1'>
                    <Skeleton className='h-6 w-full' />
                  </div>
                </CommandPrimitive.Loading>
              )}
              {items.length > 0 && !isLoading ? (
                <CommandGroup>
                  {items.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault()
                      }}
                      onSelect={onSelectItem}
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}
              {!isLoading ? <CommandEmpty>{emptyMessage}</CommandEmpty> : null}
            </CommandList>
          </PopoverContent>
        </Command>
      </Popover>
    </div>
  )
}
