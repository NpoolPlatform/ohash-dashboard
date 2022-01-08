interface UserInfo {
  userId: number
  id: number
  title: string
  body: string
}

interface GetUserResponse {
  Logined: boolean
  Infos: ReadonlyArray<UserInfo>
}

export { UserInfo, GetUserResponse }
