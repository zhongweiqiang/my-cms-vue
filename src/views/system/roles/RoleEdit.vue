<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="角色名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }">
      <a-input
        placeholder="请输入角色名称"
        v-decorator="['name', { rules: [{ required: true, message: '请输入角色名称' }] }]"
      />
    </a-form-item>
    <a-form-item label="角色描述" :label-col="{ span: 5 }" :wrapper-col="{ span: 8 }">
      <a-textarea
        placeholder="请输入角色描述"
        :autosize="{ minRows: 2, maxRows: 6 }"
        v-decorator="['description', { rules: [{ required: true, message: '请输入角色描述' }] }]"
      />
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
import { index, edit } from "@/api/role";
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  created() {
    this.roleList(this.$route.query.id);
  },
  mounted() {
    // this.roleList(this.$route.query.id);
  },
  methods: {
    roleList(id) {
      index(id).then(response => {
        let { name, description } = response.data;
        // 给表单赋原始值
        this.form.setFieldsValue({ name, description });
      });
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.id = this.$route.query.id;
          edit(values).then(response => {
            this.$message.success(response.message);
            this.$router.push({
              name: "RoleList"
            });
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