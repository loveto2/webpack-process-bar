export default [
  /* ----------------------路由管理----------------------- */
  {
    key: 'testmenu1-testmenu1-1',
    loader: () => import('@views/Home'),
    path: '/test'
  },
  {
    key: 'menu_code_1',
    loader: () => import('@views/Home'),
    path: '/page1'
  },
  {
    key: 'menu_code_2',
    loader: () => import('@views/Home'),
    path: '/page2'
  },
  {
    key: 'menu_code_3',
    loader: () => import('@views/Home'),
    path: '/page3'
  },
  {
    key: 'menu_code_4',
    loader: () => import('@views/Home'),
    path: '/page4'
  },
  {
    key: 'menu_code_5',
    loader: () => import('@views/Home'),
    path: '/page5'
  }
];
