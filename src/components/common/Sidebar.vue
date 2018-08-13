<template>
	<div class="sidebar">
		<el-menu class="site-menu" text-color="#a3afb7" active-text-color="#ffffff" background-color="#263238" :default-active="$route.path" router unique-opened>

			<template v-for="(item,index) in treeData">

				<el-menu-item :index="item.path" v-if="!item.children"><i :class="item.icon"></i><span>{{item.name}}</span></el-menu-item>

				<el-submenu :index="'' + index" v-else>
					<template slot="title"><i :class="item.icon"></i><span>{{item.name}}</span></template>
					
					<template v-for="itemTwo in item.children">
						
						<el-menu-item :index="itemTwo.path">
							<span>{{itemTwo.name}}</span>
						</el-menu-item>

					</template>

				</el-submenu>
			</template>
		</el-menu>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				treeData: [{
					path: '/Home',
					icon: 'el-icon-web-home',
					name: '主页',
					children: null
				},{
					path: '/',
					icon: 'el-icon-web-heart',
					name: '车辆管理',
					children: [{
						path: '/carManager/carInfo',
						icon: '',
						name: '车辆信息',
						children: null
					}]
				},{
					path: '/',
					icon: 'el-icon-web-customer',
					name: '客户管理',
					children: [{
						path: '/Home1',
						icon: '',
						name: '客户信息',
						children: null
					},{
						path: '/Home2',
						icon: '',
						name: '贷款申请',
						children: null
					}]
				},{
					path: '/',
					icon: 'el-icon-web-globe',
					name: '商机管理',
					children: [{
						path: '/Home1',
						icon: '',
						name: '跟进管理',
						children: null
					},{
						path: '/Home2',
						icon: '',
						name: '战败客户',
						children: null
					},{
						path: '/Home2',
						icon: '',
						name: '成交客户',
						children: null
					}]
				},{
					path: '/',
					icon: 'el-icon-web-jianguanmoshi',
					name: '统计报表',
					children: [{
						path: '/Home1',
						icon: '',
						name: '销售统计',
						children: null
					},{
						path: '/Home2',
						icon: '',
						name: '客户统计',
						children: null
					}]
				},{
					path: '/',
					icon: 'el-icon-web-users',
					name: '推广管理',
					children: [{
						path: '/Home1',
						icon: '',
						name: '消息推送',
						children: null
					},{
						path: '/Home2',
						icon: '',
						name: '广告管理',
						children: null
					}]
				},{
					path: '/',
					icon: 'el-icon-setting',
					name: '系统设置',
					children: [{
						path: '/sysManager/shopsManager',
						icon: '',
						name: '门店管理',
						children: null
					},{
						path: '/Home2',
						icon: '',
						name: '用户管理',
						children: null
					},{
						path: '/sysManager/roleManager',
						icon: '',
						name: '角色管理',
						children: null
					},{
						path: '/sysManager/log',
						icon: '',
						name: '系统日志',
						children: null
					}]
				}]
			}
		},
		created() {
		},
		methods: {
		}
	}
</script>
<style scoped>
	.sidebar {
		position: absolute;
		top: 60px;
		bottom: 0;
		left: 0;
		width: 220px;
		background: #263238;
				overflow-y: auto;
	}
	.site-menu {
		padding-bottom: 20px;
		background: none;
		border: none;
	}
</style>