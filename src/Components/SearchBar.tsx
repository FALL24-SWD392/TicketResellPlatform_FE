import { Input } from '@nextui-org/react'
import { CiSearch } from 'react-icons/ci'
const SearchBar = () => {
  return (
    <>
      <div className='container-xs mx-auto mt-10 rounded-2xl px-10 flex justify-center items-center bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg'>
        <Input
          label=''
          isClearable
          radius='lg'
          color='primary'
          size='lg'
          classNames={{
            label: 'text-black/50 dark:text-white-light/90',
            input: ['bg-transparent', 'text-white-light', 'placeholder:text-default-700/50 dark:placeholder:text-white/60'],
            innerWrapper: 'bg-transparent',
            inputWrapper: [
              'shadow-xl',
              'bg-default-200/50',
              'dark:bg-default/60',
              'backdrop-blur-xl',
              'backdrop-saturate-200',
              'hover:bg-default-200/70',
              'dark:hover:bg-default/70',
              'group-data-[focus=true]:bg-default-200/50',
              'dark:group-data-[focus=true]:bg-default/60',
              '!cursor-text'
            ],
          }}
          placeholder='Type to search...'
          startContent={<CiSearch className='text-white-light/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0' />}
        />
      </div>
    </>
  )
}

export default SearchBar
