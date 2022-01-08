import { MainBreadcrumbs } from './types'

interface MainBreadcrumbsState {
  Infos: Array<MainBreadcrumbs>
  Active: MainBreadcrumbs
}

const HomePageBreadcrumbs = {
  icon: 'home',
  label: 'Home',
  target: '/',
  caption: 'Home Page'
}

function state (): MainBreadcrumbsState {
  return {
    Infos: [HomePageBreadcrumbs],
    Active: HomePageBreadcrumbs
  }
}

export {
  state,
  MainBreadcrumbsState,
  HomePageBreadcrumbs
}
