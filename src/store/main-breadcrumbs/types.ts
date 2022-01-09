interface MainBreadcrumbs {
  menuId: number
  icon: string
  label: string
  target: string
  caption: string
  level: number
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
