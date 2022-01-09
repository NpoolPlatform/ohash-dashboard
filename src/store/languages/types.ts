interface Language {
  Lang: string
  Logo: string
  Name: string
  Short: string
}

interface GetLanguagesResponse {
  Languages: ReadonlyArray<Language>
}

export {
  Language,
  GetLanguagesResponse
}
