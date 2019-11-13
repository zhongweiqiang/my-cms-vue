<template>
  <div>
    <a-button size="small" type="primary" @click="showDrawer" style="margin-top: 4px;">
      <a-icon type="plus" />菜单
    </a-button>
    <a-drawer
      title="菜单添加"
      :width="400"
      @close="onClose"
      :visible="visible"
      :wrapStyle="{height: 'calc(100% - 108px)',overflow: 'auto',paddingBottom: '108px'}"
    >
      <a-form :form="form" @submit="handleSubmit" style="margin-top: 20px;">
        <a-form-item label="资源类型" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select
            v-decorator="[
          'type',
          { rules: [{ required: true, message: '必须选择资源类型' }] },
        ]"
            placeholder="请选择资源类型"
          >
            <a-select-option value="m">菜单</a-select-option>
            <a-select-option value="e">页面元素</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="父级菜单" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-select
            v-decorator="['parent_id', { rules: [{ required: true, message: '必须选择父级菜单' }] },]"
            placeholder="请选择父级菜单"
            showSearch
            :filterOption="filterOption"
          >
            <a-select-option value="0">无父级菜单</a-select-option>
            <a-select-option v-for="menu in menus" :value="menu.id" :key="menu.id">{{ menu.title }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="资源名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            allowClear
            v-decorator="['title', { rules: [{ required: true, message: '资源名称必须填写' }] }]"
            placeholder="请输入资源名称"
          />
        </a-form-item>
        <a-form-item label="资源标识" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            allowClear
            v-decorator="['slug', { rules: [{ required: true, message: '资源标识必须填写' }] }]"
            placeholder="请输入资源标识"
          />
        </a-form-item>
        <a-form-item label="视图路径" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            allowClear
            v-decorator="['path', { rules: [{ required: true, message: '视图路径必须填写' }] }]"
            placeholder="请输入视图路径"
          />
        </a-form-item>
        <a-form-item label="图标名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input allowClear v-decorator="['icon']" placeholder="请输入视图路径" />
        </a-form-item>
        <a-form-item label="菜单排序" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input
            allowClear
            v-decorator="['order', { rules: [{ required: true, type: 'number',                    transform(value) {
                      if(value){
                        return Number(value);
                      }
                    }, message: '必须为0-255数字' }] }]"
            placeholder="请输入菜单排序"
          />
        </a-form-item>

        <a-form-item
          :wrapper-col="{ span: 24 }"
          :style="{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px 0px',
          background: '#fff',
          textAlign: 'right',
          marginBottom: '0'
        }"
        >
          <a-row>
            <a-col :span="4" :offset="13" :style="{ textAlign: 'left' }">
              <a-button size="small" @click="onClose">返回</a-button>
            </a-col>
            <a-col :span="4" :style="{ textAlign: 'left' }">
              <a-button
                :style="{marginRight: '8px'}"
                size="small"
                type="primary"
                html-type="submit"
              >提交</a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>
<script>
import { add, select } from "@/api/menu";
export default {
  name: "MenuAdd",
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
      formLayout: "horizontal",
      menus: []
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.form.resetFields();
      this.visible = false;
    },
    // 获取菜单列表
    getMenuList() {
      select().then(response => {
        this.menus = response.data;
      });
    },

    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("values: ", values);
          if (Number(values.order) > 255) {
            this.$message.error("排序不能大于255");
            return false;
          }
          add(values).then(response => {
            this.$message.success(response.message);
            this.onAdd();
            setTimeout(() => {
              this.onClose();
            }, 100);
          });
        }
      });
    },

    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    }
  }
};
</script>
