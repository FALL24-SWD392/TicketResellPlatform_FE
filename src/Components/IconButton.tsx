import { ReactNode } from 'react'

export interface IconButtonProps {
  width: number
  height: number
  src: string
  alt: string
  onClick?: () => void
}

const IconButton = ({ width, height, src, alt, onClick }: IconButtonProps): ReactNode => {
  return (
    <div className={`w-${width} h-${height} rounded-full border-1 border-white-light flex items-center justify-center cursor-pointer`} onClick={onClick}>
      <img src={src} alt={alt} className={`w-${width - 2} h-${height - 2}`} />
    </div>
  )
}

export default IconButton
