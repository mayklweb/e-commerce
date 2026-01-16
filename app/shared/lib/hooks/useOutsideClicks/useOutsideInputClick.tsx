import { InputRef } from 'antd'
import { useEffect } from 'react'

export const useOutsideInputClick = (
  ref: React.RefObject<InputRef>,
  callback: () => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current?.input &&
        !ref.current.input.contains(event.target as Node)
      ) {
        callback()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, callback])
}
