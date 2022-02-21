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
    target: '/application',
    level: 0,
    children: [
      {
        menuId: uid(),
        label: '应用短信模板',
        caption: '管理应用短信模板',
        icon: 'perm_identity',
        target: '/application/sms/template',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '应用邮件模板',
        caption: '管理应用邮件模板',
        icon: 'perm_identity',
        target: '/application/email/template',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '应用内联系',
        caption: '管理应用内联系地址',
        icon: 'perm_identity',
        target: '/application/contacts',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '国际化',
        caption: '管理应用语言支持',
        icon: 'perm_identity',
        target: '/application/languages',
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
      }
    ]
  }, {
    menuId: uid(),
    label: '用户与角色',
    caption: '管理用户、角色以及资源授权',
    icon: 'reviews',
    target: '/users',
    level: 0,
    children: [
      {
        menuId: uid(),
        label: '用户列表',
        caption: '查看全部用户',
        icon: 'format_list_numbered',
        target: '/users/users',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '角色列表',
        caption: '查看全部角色',
        icon: 'format_list_numbered',
        target: '/users/roles',
        level: 1,
        children: []
      }, {
        menuId: uid(),
        label: '角色用户',
        caption: '管理角色用户',
        icon: 'format_list_numbered',
        target: '/users/roleusers',
        level: 1,
        children: []
      }
    ]
  }, {
    menuId: uid(),
    label: '国际化',
    caption: '管理国际化语言支持',
    icon: 'language',
    target: '/internationalization',
    level: 0,
    children: []
  }
]

export {
  MenuItem,
  MainDrawerMenus
}
