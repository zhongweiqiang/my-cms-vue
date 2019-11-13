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
import { add } from "@/api/role";
export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this, { name: "coordinated" })
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log("Received values of form: ", values);
          // 失败的提交在request.js中已经被拦截掉了，所以到不了这里
          add(values).then(response => {
            if (response.code == 201) {
              this.$message.success(response.message);
              this.form.resetFields();
              setTimeout(() => {
                this.go();
              }, 100);
            } else if (response.code == 40000) {
              this.$message.error(response.message);
            }
          });
        }
      });
    },

    go() {
      this.form.resetFields();
      this.$router.push({
        name: "RoleList"
      });
    }
  }
};
</script>