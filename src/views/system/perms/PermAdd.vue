<template>
  <div>
    <a-button size="small" type="primary" @click="showDrawer" style="margin-top: 4px;">
      <a-icon type="plus" />权限
    </a-button>
    <a-drawer
      title="添加"
      :width="720"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
      :destroyOnClose="true"
    >
      <a-form :form="form" layout="vertical" @submit="handleSubmit">
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="权限名称">
              <a-input
                v-decorator="['name', {
                  rules: [{ required: true, message: '请输入权限名称' }]
                }]"
                placeholder="请输入权限名称"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="路由路径">
              <a-input
                v-decorator="['uri', {
                  rules: [{ required: true, message: '请输入路由路径' }]
                }]"
                style="width: 100%"
                addonBefore="http://example.com/api/v1/"
                placeholder="请输入路由路径"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="请求方式">
              <a-select
                v-decorator="['method', {
                  rules: [{ required: true, message: '请选择请求方式' }]
                }]"
                placeholder="请选择请求方式"
              >
                <a-select-option value="GET">GET</a-select-option>
                <a-select-option value="POST">POST</a-select-option>
                <a-select-option value="DELETE">DELETE</a-select-option>
                <a-select-option value="PUT">PUT</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="父级权限">
              <a-select
                v-decorator="['parent_id', {
                  rules: [{ required: true, message: '请选择父级权限' }]
                }]"
                placeholder="请选择父级权限"
              >
                <a-select-option
                  v-for="perm in perms"
                  :key="perm.id"
                  :value="perm.id"
                >{{ perm.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="权限描述">
              <a-textarea
                v-decorator="['description', {
                  rules: [{ required: true, message: '请输入权限描述' }]
                }]"
                :rows="4"
                placeholder="请输入权限描述"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-form-item :wrapper-col="{ span: 24, offset: 0 }">
          <a-row>
            <a-col :span="5" :offset="19">
              <a-button size="small" :style="{marginRight: '8px'}" @click="onClose">取消</a-button>
              <a-button size="small" type="primary" html-type="submit">提交</a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>
<script>
import { add, select } from "@/api/perm";
export default {
  name: "PermAdd",
  props: {
    onAdd: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      form: this.$form.createForm(this),
      visible: false,
      perms: []
    };
  },
  mounted() {},
  methods: {
    showDrawer() {
      this.visible = true;
      this.getPermList();
    },
    onClose() {
      this.visible = false;
    },

    getPermList() {
      select().then(response => {
        this.perms = response.data;
        console.log(response);
      });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          add(values).then(response => {
            // console.log(response);
            this.$message.success(response.message);
            if (this.onAdd) {
              this.onAdd();
            }
            setTimeout(() => {
              this.onClose();
            }, 100);
          });
        }
      });
    }
  }
};
</script>
