import { trackStructEvent } from '@snowplow/browser-tracker'
import { useEffect } from 'react'

import { useCorrelationId } from '@/core/providers/hooks/useCorrelationId'
import { useLoggedUser } from '@/modules/account/hooks/useLogged'

export type IParams = {
  category: string
  action: string
  label: string
  metadata: Record<string, string | number | boolean>
}

interface IUseEventTrackingParams {
  category: string
  action: string
  flow: string
  label: string
  metadata: Record<string, string | number | boolean>
}

function useSendSnowPlowEvent() {
  function trackWithSnowPlow(params: IParams) {
    const { category, action, label, metadata } = params

    trackStructEvent({
      category,
      action,
      label,
      context: [
        {
          schema: 'iglu:com.gympass/click_stream/jsonschema/1-0-0',
          data: {
            ...metadata,
            label,
          },
        },
      ],
    })
  }

  return trackWithSnowPlow
}

export function useTracking() {
  const sendEvent = useSendSnowPlowEvent()

  const correlationId = useCorrelationId()
  const loggedUser = useLoggedUser()

  function trackEvent(params: IUseEventTrackingParams) {
    const { category, action, flow, label, metadata } = params

    sendEvent({
      category,
      action: `${action}_${flow}`,
      label,
      metadata: {
        ...metadata,
        userReference: loggedUser?.id as string,
        'x-gympass-correlation-id': correlationId,
      },
    })
  }

  return {
    trackEvent,
  }
}

interface IUsePageViewParams {
  page: string
  label: string
  metadata: Record<string, string | number | boolean>
  trackReady: boolean
}

export function usePageViewTrack(params: IUsePageViewParams) {
  const { page, label, metadata, trackReady } = params

  const correlationId = useCorrelationId()
  const loggedUser = useLoggedUser()

  const sendEvent = useSendSnowPlowEvent()

  useEffect(() => {
    if (!trackReady) return

    sendEvent({
      category: 'PAGE_VIEW',
      action: `PAGE_VIEW_${page}`,
      label,
      metadata: {
        ...metadata,
        userReference: loggedUser?.id as string,
        'x-gympass-correlation-id': correlationId,
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackReady])
}
