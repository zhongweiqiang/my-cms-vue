<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="用户名" :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }">
      <a-input
        v-decorator="['name', { rules: [{ required: true, message: '用户名必须填写' }] }]"
        placeholder="请输入用户名"
      />
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
import { index } from "@/api/role"
import { add } from "@/api/user"
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" }),
      roles: []
    };
  },
  created() {
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
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          add(values).then(response => {
            this.$message.success(response.message)
            setTimeout(()=> {
              this.go()
            }, 100)
          })
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