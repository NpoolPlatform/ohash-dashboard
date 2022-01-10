interface MenuItem {
  menuId: number
  label: string
  caption: string
  icon: string
  target: string
  level: number
  children: Array<MenuItem>
}

const MainDrawerMenus = [
  {
    menuId: 0,
    label: '审核',
    caption: '管理审核项目',
    icon: 'reviews',
    target: '/review',
    level: 0,
    children: [
      {
        menuId: 1,
        label: 'KYC',
        caption: '管理身份审核',
        icon: 'perm_identity',
        target: '/review/kyc',
        level: 1,
        children: []
      }, {
        menuId: 1,
        label: 'API',
        caption: '管理API授权',
        icon: 'perm_identity',
        target: '/review/api',
        level: 1,
        children: []
      }
    ]
  }, {
    menuId: 0,
    label: '用户',
    caption: '管理用户',
    icon: 'reviews',
    target: '/users',
    level: 0,
    children: []
  }, {
    menuId: 0,
    label: '语言包',
    caption: '管理国际化语言包',
    icon: 'language',
    target: '/internationalization',
    level: 0,
    children: []
  }, {
    menuId: 1,
    label: '商品',
    caption: '管理算力商品',
    icon: 'format_list_numbered',
    target: '/goods',
    level: 0,
    children: []
  }, {
    menuId: 2,
    label: '多层菜单',
    caption: '多层菜单',
    icon: 'menu',
    target: '/internationalization',
    level: 0,
    children: [
      {
        menuId: 0,
        label: '多层菜单',
        caption: '多层菜单',
        icon: 'menu',
        target: '/example',
        level: 1,
        children: [
          {
            menuId: 0,
            label: '多层菜单',
            caption: '多层菜单',
            icon: 'menu',
            target: '/example',
            level: 2,
            children: []
          }, {
            menuId: 1,
            label: '多层菜单',
            caption: '多层菜单',
            icon: 'menu',
            target: '/example',
            level: 2,
            children: []
          }
        ]
      }, {
        menuId: 1,
        label: '多层菜单',
        caption: '多层菜单',
        icon: 'menu',
        target: '/example',
        level: 1,
        children: []
      }
    ]
  }
]

export {
  MenuItem,
  MainDrawerMenus
}
