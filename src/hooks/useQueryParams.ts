import { useSearchParams } from 'react-router-dom'

const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [Object.fromEntries([...searchParams]), setSearchParams]
}

export default useQueryParams