<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="用户名" :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }">
      <a-input
        v-decorator="['name', { rules: [{ required: true, message: '用户名必须填写' }] }]"
        placeholder="请输入用户名"
      />
    </a-form-item>
    <a-form-item style="height: 0px; margin: 0; padding: 0;">
          <a-input type="hidden" v-decorator="['id', { rules: [{ required: false }] }]" />
    </a-form-item>
    <a-form-item label="角色" :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }">
      <a-select
        v-decorator="[
          'role_id',
          { rules: [{ required: true, message: '必须选择角色' }] },
        ]"
        placeholder="请选择角色"
      >
        <a-select-option v-for="role in roles" :value="role.id" :key="role.id">{{ role.name }}</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
      <a-row>
        <a-col :span="4" :style="{ textAlign: 'left' }">
          <a-button type="primary" html-type="submit">提交</a-button>
        </a-col>
        <a-col :span="4" :style="{ textAlign: 'left' }">
          <a-button type="primary" @click="go">返回</a-button>
        </a-col>
      </a-row>
    </a-form-item>
  </a-form>
</template>

<script>
import { index } from "@/api/role";
import { edit, detail } from "@/api/user";
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      roles: []
    };
  },
  mounted() {
    this.userDetail(this.$route.query.id);
    this.getRoleList();
  },

  methods: {
    // 获取角色列表
    getRoleList() {
      index().then(response => {
        console.log(response);
        this.roles = response.data;
      });
    },
    userDetail(id) {
      detail({ id }).then(response => {
        console.log(response);
        let { id, name, role_id } = response.data;
        this.form.setFieldsValue({ id, name, role_id });
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          edit(values).then(response => {
            console.log(values)
            this.$message.success(response.message);
            setTimeout(() => {
              this.go();
            }, 100);
          });
        }
      });
    },

    go() {
      this.form.resetFields();
      this.$router.push({
        name: "UserList"
      });
    }
  }
};
</script>