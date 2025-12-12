import { AxiosError } from 'axios'
import { withAuth } from '../../hoc/withAuth'
import { useLoggedUser } from '../../modules/account/hooks/useLogged'
import { useBillingInformationQuery } from './useBillingInformationQuery'
import { useEffect } from 'react'

enum ERROR_REASON_KEYS {
  NOT_AUTHORIZED = 'NOT_AUTHORIZED',
}

const BillingInformation = () => {
  const loggedUser = useLoggedUser()

  const {
    data: currentBillingInfo,
    isFetched,
    isError,
    error,
  } = useBillingInformationQuery({
    userId: loggedUser?.id,
  })

  console.log({
    currentBillingInfo,
    isFetched,
    isError,
    error,
  })

  useEffect(() => {
    const shouldRedirect =
      isError &&
      error instanceof AxiosError &&
      error?.response?.data?.key === ERROR_REASON_KEYS.NOT_AUTHORIZED

    if (shouldRedirect) {
      window.location.href = `${import.meta.env.VITE_ACCOUNT_MANAGER_URL}`
    }
  }, [isError, error])

  if (isError) {
    return <></>
  }

  return <h1>Billing Information</h1>
}

const BillingInformationPage = withAuth(BillingInformation)
export default BillingInformationPage
