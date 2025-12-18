import { act, renderHook } from '@testing-library/react'

import { useAriaLiveRegion } from './useAriaLiveRegion'

describe('useAriaLiveRegion', () => {
  it('should return initial message as empty string', () => {
    const { result } = renderHook(() => useAriaLiveRegion())

    expect(result.current.message).toBe('')
  })

  it('should update message when setMessage is called', () => {
    const { result } = renderHook(() => useAriaLiveRegion())

    const newMessage = 'Test announcement'
    act(() => {
      result.current.setMessage(newMessage)
    })

    expect(result.current.message).toBe(newMessage)
  })

  it('should return ariaLiveRegionElement', () => {
    const { result } = renderHook(() => useAriaLiveRegion())

    expect(result.current.ariaLiveRegionElement).toBeDefined()
  })
})
