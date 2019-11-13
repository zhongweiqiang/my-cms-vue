<template>
  <a-row>
    <a-col :span="12" :offset="6" style="margin-top: 200px;">
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
          >Remember me</a-checkbox>
          <a class="login-form-forgot" href>Forgot password</a>
          <a-button type="primary" html-type="submit" class="login-form-button">Log in</a-button>Or
          <a href>register now!</a>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
import { Modal } from "ant-design-vue";
import { login } from "@/api/user";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  data() {
    return {
      visible: false
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);

          this.$store.dispatch('user/login', values)
            .then(() => {
              this.$router.push({
                name: 'Dashboard'
              })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
          // login(values)
          //   .then(response => {
          //     console.log(response);
          //   })
          //   .catch(err => {
          //     console.log(err);
          //     this.visible = true;

          //     this.$error({
          //       title: "登录失败, 可能原因：",
          //       content: "1, 用户名密码错误; 2, 账户被禁用; 3, 账户过期",
          //       okText: '确定'
          //     });
          //   });
        }
      });
    },

    // showModal() {
    //   this.visible = true;
    // },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    }
  }
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>