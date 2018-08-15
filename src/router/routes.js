export default [
	{
		path: '/',
		name: 'Layout',
        redirect: '../Home',
        component: resolve => require(['../components/common/Layout'], resolve),
        children:[
        	{
				path: '/Home',
				name: 'Home',
				component: resolve => require(['../pages/Home/Home'], resolve)
        	},
        	// 车辆管理
        	{
				path: '/carManager/carInfo',
				name: 'carInfo',
				component: resolve => require(['../pages/carManager/carInfo'], resolve)
        	},
        	// 系统管理-店铺管理
        	{
				path: '/sysManager/shopsManager',
				name: 'shopsManager',
				component: resolve => require(['../pages/sysManager/shopsManager'], resolve)
        	},
        	// 系统管理-角色管理
        	{
				path: '/sysManager/roleManager',
				name: 'roleManager',
				component: resolve => require(['../pages/sysManager/roleManager'], resolve)
        	},
        	// 系统管理-日志
        	{
				path: '/sysManager/log',
				name: 'log',
				component: resolve => require(['../pages/sysManager/log'], resolve)
        	}
        ]
	},
	{
		path: '/Login',
		name: 'Login',
		component: resolve => require(['../pages/Login'], resolve)
	},
	{ path: '*', component: resolve => require(['../pages/404'], resolve) }
]
