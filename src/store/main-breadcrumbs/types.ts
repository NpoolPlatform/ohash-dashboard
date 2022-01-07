interface MainBreadcrumbs {
  icon: string
  label: string
  target: string
  caption: string
}

interface GetMainBreadcrumbsResponse {
  Infos: ReadonlyArray<MainBreadcrumbs>
}

interface GetCurHeadBreadcrumbsResponse {
  CurHead: Readonly<MainBreadcrumbs>
}

export {
  MainBreadcrumbs,
  GetMainBreadcrumbsResponse,
  GetCurHeadBreadcrumbsResponse
}
