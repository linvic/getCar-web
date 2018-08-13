<template>
	<div>
		<el-form ref="form" status-icon :rules="form_rules" :model="form" label-width="120px">
			<span>角色信息:</span>
			<div class="treeBox">
				
				<el-form-item label="角色ID">
					<p>---</p>
				</el-form-item>
				<el-form-item label="创建时间">
					<p>---</p>
				</el-form-item>
				<el-form-item label="角色名" prop="roleName">
					<el-input v-model="form.roleName"></el-input>
				</el-form-item>
				<el-form-item label="角色描述" prop="roleDesc">
					<el-input v-model="form.roleDesc" type="textarea" :row="4"></el-input>
				</el-form-item>
				<el-form-item label="角色等级" prop="roleLev">
					<el-select v-model="form.roleLev" placeholder="请选择">
						<el-option label="1级" :value="1"></el-option>
						<el-option label="2级" :value="2"></el-option>
					</el-select>
				</el-form-item>
			
			</div>
			<span>权限列表:</span>
			<div class="treeBox">
				<el-tree
					:data="treeData"
					show-checkbox
					:expand-on-click-node="false"
					default-expand-all
					node-key="id"
					ref="tree"
					highlight-current
					@check-change="handleCheckChange"
					:props="defaultProps">
				</el-tree>
			</div>
			<el-form-item>
				<el-button type="primary" @click="submit()">保存</el-button>
				<el-button @click="closeDialog()">取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
export default {
	data () {
		return {
			form: {
				roleName: '', // 角色名
				roleDesc: '', // 角色描述
				roleLev: '', // 角色等级
			},
			form_rules: {
				roleName: [
					{ required: true, message: '请输入角色名', trigger: 'blur' }
				],
				roleDesc: [
					{ required: true, message: '请输入角色描述', trigger: 'blur' }
				],
				org_id: [
					{ required: true, message: '请选择角色等级', trigger: 'change' }
				]
			},
			treeData: [
				{
					"parentId": "0",
					"id": "1",
					"text": "主页",
					"value": "home",
					"isexpand": true,
					"hasChildren": false,
					"icon": "el-icon-web-home",
					"title": "1",
					"level": null,
					"sort": 0,
					"attrKey": "True",
					"attrValue": "/Index",
					"children": null
				}, {
					"parentId": "0",
					"id": "17",
					"text": "我的",
					"value": "zjb",
					"isexpand": true,
					"hasChildren": true,
					"icon": "el-icon-web-daiban",
					"title": "1",
					"level": null,
					"sort": 0,
					"attrKey": "True",
					"attrValue": "/",
					"children": [{
						"parentId": "17",
						"id": "28",
						"text": "我的申请记录",
						"value": "wdsq",
						"isexpand": true,
						"hasChildren": false,
						"icon": "el-icon",
						"title": "1",
						"level": null,
						"sort": 0,
						"attrKey": "True",
						"attrValue": "/Controls/MyApply",
						"children": null
					}, {
						"parentId": "17",
						"id": "18",
						"text": "删除申请",
						"value": "scsq",
						"isexpand": true,
						"hasChildren": false,
						"icon": "el-icon",
						"title": "1",
						"level": null,
						"sort": 0,
						"attrKey": "True",
						"attrValue": "/Controls/DeleteApply/Lists",
						"children": null
					}, {
						"parentId": "17",
						"id": "27",
						"text": "变更业务员",
						"value": "bjywy",
						"isexpand": true,
						"hasChildren": false,
						"icon": "el-icon",
						"title": "1",
						"level": null,
						"sort": 0,
						"attrKey": "True",
						"attrValue": "/Controls/ChangeSalesman/Lists",
						"children": null
					}, {
						"parentId": "17",
						"id": "29",
						"text": "锁盘申请",
						"value": "LockingApply",
						"isexpand": true,
						"hasChildren": false,
						"icon": "el-icon",
						"title": "1",
						"level": null,
						"sort": 0,
						"attrKey": "True",
						"attrValue": "/Controls/LockingApply/Lists",
						"children": null
					}, {
						"parentId": "17",
						"id": "30",
						"text": "私盘申请",
						"value": "PrivateApply",
						"isexpand": true,
						"hasChildren": false,
						"icon": "el-icon",
						"title": "1",
						"level": null,
						"sort": 0,
						"attrKey": "True",
						"attrValue": "/Controls/PrivateApply/Lists",
						"children": null
					}]
				}
			],
			defaultProps: {
                label: 'text'
            }
		}
	},
	created() {
		// this.getDataBase();
	},
	computed: {
	},
	watch: {
	},
	methods: {
		getDataBase() { // 获取基础数据
            this.$https.get('/api/company_role/list_module?status=1&parent_id=0').then((result) => {
                if (result.data.code == 0) {
                    this.treeData = result.data.data;
                    this.getOldData(); // 获取原配置
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        getOldData() { // 获取编辑数据

            this.$https.get('/api/company_role/list_company_role_app_map?role_id=' + this.id).then((result) => {
                if (result.data.code == 0) {
                    let _data = result.data.data;
                    for(var item of _data) {
                        this.$refs.tree.setChecked(item.app_id, true, false);
                    }
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        submit() { // 提交
            let checkedKeys = this.$refs.tree.getCheckedKeys();
            let _postData = {
                role_id: this.id,
                list_app_id: checkedKeys
            };
            // for(var valItem of checkedKeys) {
            //     let item = {
            //         role_id: this.id,
            //         app_id: valItem
            //     }
            //     _postData.push(item)
            // }
            // _postData.app_id = this.id;
            // _postData.list_role_id = checkedKeys;

            this.$https.post('/api/company_role/create_company_role_app_map', _postData).then((result) => {
                if (result.data.code == 0) {
                    this.$message({
                        type: 'success',
                        showClose: true,
                        message: '配置成功',
                        duration: 1500,
                        onClose: () => {
                            // 关闭当前dialog，
                            this.closeDialog('dialogRolePower');
                            // 刷新列表
                            this.$emit('parentGetDataList');
                        }
                    })
                } else {
                    this.$message({
                        type: 'error',
                        showClose: true,
                        message: result.data.message
                    })
                }
            })
        },
        handleCheckChange(node, checked, indeterminate) {
            let _halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys();
            if(_halfCheckedKeys.length != 0) {
                this.$refs.tree.setChecked(_halfCheckedKeys[0], true, false);
            }
            if (checked) {
                this.$refs.tree.setChecked(node.parentId, true, false);
            }
        },
		closeDialog(name) { // 关闭当前
			// this.$refs.form.resetFields(); // 重置表单
			if (!name) {
				this.$emit('closeDialog', 'dialogRoleAdd'); // 执行父组件关闭方法
			} else {
				this.$emit('closeDialog', name); // 执行父组件关闭方法
			}
		}
	}
}
</script>
<style scoped>
	.treeBox {
		border: 1px dashed #eaeefb;
	    padding: 10px 5px;
	    max-height: 400px;
	    overflow-y: auto;
	}
</style>