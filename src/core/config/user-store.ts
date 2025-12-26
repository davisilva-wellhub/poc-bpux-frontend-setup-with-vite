type TLoggedUser = {
  id: string
  email: string
}

let loggedUser: TLoggedUser | null = null

export const setLoggedUser = (user: TLoggedUser | null) => {
  loggedUser = user
}

export const getLoggedUser = (): TLoggedUser | null => loggedUser

export const setUserFromToken = (tokenParsed: any) => {
  if (!tokenParsed) {
    setLoggedUser(null)
    return
  }

  setLoggedUser({
    id: tokenParsed.uid as string,
    email: tokenParsed.email as string,
  })
}
