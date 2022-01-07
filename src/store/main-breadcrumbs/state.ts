import { MainBreadcrumbs } from './types'

interface MainBreadcrumbsState {
  Infos: Array<MainBreadcrumbs>
  Active: MainBreadcrumbs,
  loading: boolean
  error: string
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
    Active: HomePageBreadcrumbs,
    loading: false,
    error: ''
  }
}

export {
  state,
  MainBreadcrumbsState,
  HomePageBreadcrumbs
}
