import { uid } from 'quasar'
interface MenuItem {
  menuId: string
  label: string
  caption: string
  icon: string
  target: string
  level: number
  children: Array<MenuItem>
}

const MainDrawerMenus = [
  {
    menuId: uid(),
    label: '应用',
    caption: '管理应用',
    icon: 'pending',
    target: '/applications',
    level: 0,
    children: [
      {
        menuId: uid(),
        label: '应用管理',
        caption: '管理应用',
        icon: 'perm_identity',
        target: '/applications/applications',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '应用短信模板',
        caption: '管理应用短信模板',
        icon: 'perm_identity',
        target: '/applications/sms/template',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '应用邮件模板',
        caption: '管理应用邮件模板',
        icon: 'perm_identity',
        target: '/applications/email/template',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '应用内联系',
        caption: '管理应用内联系地址',
        icon: 'perm_identity',
        target: '/applications/contacts',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '国际化',
        caption: '管理应用支持语言',
        icon: 'perm_identity',
        target: '/applications/languages',
        level: 1,
        children: []
      }
    ]
  }, {
    menuId: uid(),
    label: '审核',
    caption: '管理审核项目',
    icon: 'reviews',
    target: '/review',
    level: 0,
    children: [
      {
        menuId: uid(),
        label: 'KYC',
        caption: '管理身份审核',
        icon: 'perm_identity',
        target: '/review/kyc',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '商品',
        caption: '审核商品上下架',
        icon: 'format_list_numbered',
        target: '/review/good',
        level: 1,
        children: []
      }
    ]
  }, {
    menuId: uid(),
    label: 'API',
    caption: '管理API授权',
    icon: 'perm_identity',
    target: '/apis',
    level: 0,
    children: []
  }, {
    menuId: uid(),
    label: '用户',
    caption: '管理用户',
    icon: 'reviews',
    target: '/users',
    level: 0,
    children: []
  }, {
    menuId: uid(),
    label: '国际化',
    caption: '管理国际化语言支持',
    icon: 'language',
    target: '/internationalization',
    level: 0,
    children: []
  }, {
    menuId: uid(),
    label: '商品',
    caption: '管理算力商品',
    icon: 'format_list_numbered',
    target: '/goods',
    level: 0,
    children: []
  }, {
    menuId: uid(),
    label: '多层菜单',
    caption: '多层菜单',
    icon: 'menu',
    target: '/internationalization',
    level: 0,
    children: [
      {
        menuId: uid(),
        label: '多层菜单',
        caption: '多层菜单',
        icon: 'menu',
        target: '/example',
        level: 1,
        children: [
          {
            menuId: uid(),
            label: '多层菜单',
            caption: '多层菜单',
            icon: 'menu',
            target: '/example',
            level: 2,
            children: []
          }, {
            menuId: uid(),
            label: '多层菜单',
            caption: '多层菜单',
            icon: 'menu',
            target: '/example',
            level: 2,
            children: []
          }
        ]
      }, {
        menuId: uid(),
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
