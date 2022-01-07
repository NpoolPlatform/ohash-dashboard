import { MainBreadcrumbs } from './types'

interface MainBreadcrumbsState {
  Infos: Array<MainBreadcrumbs>
  loading: boolean
  error: string
}

function state (): MainBreadcrumbsState {
  return {
    Infos: [{
      icon: 'home',
      label: 'Home',
      target: '/'
    }],
    loading: false,
    error: ''
  }
}

export { state, MainBreadcrumbsState }
