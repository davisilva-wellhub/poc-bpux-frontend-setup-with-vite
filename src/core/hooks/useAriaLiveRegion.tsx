import { useState } from 'react'

import { ScreenReaderOnlyText } from '@/core/components/ScreenReaderOnlyText'

interface AriaLiveRegionProps {
  message: string
}

const AriaLiveRegion = ({ message }: AriaLiveRegionProps) => {
  return (
    <ScreenReaderOnlyText role="region" aria-live="polite" aria-atomic="true">
      {message}
    </ScreenReaderOnlyText>
  )
}

const useAriaLiveRegion = () => {
  const [message, setMessage] = useState('')
  const ariaLiveRegionElement = <AriaLiveRegion message={message} />

  return {
    message,
    setMessage,
    ariaLiveRegionElement,
  }
}

export { AriaLiveRegion, useAriaLiveRegion }
