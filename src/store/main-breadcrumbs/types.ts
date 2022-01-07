interface MainBreadcrumbs {
  icon: string
  label: string
  target: string
}

interface GetMainBreadcrumbsResponse {
  Infos: ReadonlyArray<MainBreadcrumbs>
}

export { MainBreadcrumbs, GetMainBreadcrumbsResponse }
