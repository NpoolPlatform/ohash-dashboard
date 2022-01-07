interface MainBreadcrumbs {
  icon: string
  label: string
  target: string
  caption: string
}

interface GetMainBreadcrumbsResponse {
  Infos: ReadonlyArray<MainBreadcrumbs>
}

interface GetCurActiveBreadcrumbsResponse {
  CurActive: Readonly<MainBreadcrumbs>
}

export {
  MainBreadcrumbs,
  GetMainBreadcrumbsResponse,
  GetCurActiveBreadcrumbsResponse
}
