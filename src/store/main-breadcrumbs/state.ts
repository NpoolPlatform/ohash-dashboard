import { MainBreadcrumbs } from './types'

interface MainBreadcrumbsState {
  Infos: Array<MainBreadcrumbs>
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
    loading: false,
    error: ''
  }
}

export {
  state,
  MainBreadcrumbsState,
  HomePageBreadcrumbs
}
