<template>
  <div>
    <a-row>
      <a-col :span="3" :xs="24" :sm="5" :md="4" :lg="3">
        <a-button type="primary" size="small" style="margin-top: 4px;" @click="userAdd">
          <a-icon type="plus" />用户
        </a-button>
      </a-col>
      <a-col :span="8" :xs="24" :sm="10" :md="9" :lg="8">
        <a-input-search
          allowClear
          v-model="name"
          placeholder="请输入用户名"
          @search="onSearch"
          enterButton
        />
      </a-col>
      <a-col :span="2" :offset="7" style="margin-top: 5px;">
        <a-tag color="#108ee9">总用户数: {{ total }}</a-tag>
      </a-col>
      <a-col :span="2" :offset="1" style="margin-top: 5px;">
        <a-tag color="#2db7f5">启用用户: {{ start }}</a-tag>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-table
          :columns="columns"
          :rowKey="record => record.id"
          :dataSource="data"
          :pagination="pagination"
          :loading="loading"
          @change="handleTableChange"
        >
          <span slot="role" slot-scope="text">{{text.name}}</span>
          <span slot="status" slot-scope="text, record">
            <a-switch
              checkedChildren="启"
              unCheckedChildren="禁"
              :checked="text"
              @click="status(record.id, record.status)"
            />
          </span>
          <template slot="name" slot-scope="name">{{name.first}} {{name.last}}</template>
          <span slot="action" slot-scope="text">
            <a-button size="small" type="primary" @click="edit(text.id)" icon="edit" />
            <a-button size="small" type="danger" @click="del(text.id)" icon="delete" />
            <a-button type="danger" size="small" @click="reset_password(text.id)">重置密码</a-button>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-divider></a-divider>
  </div>
</template>

<script>
// import reqwest from "reqwest";
import { index, status, del, reset_password, tag_data } from "@/api/user";
const columns = [
  {
    title: "id",
    dataIndex: "id",
    sorter: true,
    align: "center"
  },
  {
    title: "用户名",
    dataIndex: "name",
    align: "center"
  },
  {
    title: "角色",
    dataIndex: "role",
    scopedSlots: { customRender: "role" },
    align: "center"
  },
  {
    title: "上次登陆ip",
    dataIndex: "last_login_ip",
    align: "center"
  },
  {
    title: "上次登陆时间",
    dataIndex: "last_login_time",
    align: "center"
  },
  {
    title: "状态",
    dataIndex: "status",
    filters: [{ text: "禁用", value: "2" }, { text: "启用", value: "1" }],
    scopedSlots: { customRender: "status" },
    align: "center"
  },
  {
    title: "操作",
    key: "action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];
export default {
  data() {
    return {
      data: [],
      pagination: { pageSize: 15 },
      loading: false,
      columns,
      checked: false,

      // 给监听器使用的
      name,
      filters: {},

      // tag数据
      total: "",
      start: ""
    };
  },
  mounted() {
    // 首次加载页面获取数据
    this.fetch({ pageSize: this.pagination.pageSize });
    // this.tag_data();
  },
  watch: {
    name: function(newVal, oldVal) {
      if (newVal == "") {
        this.fetch({ pageSize: this.pagination.pageSize });
      }
    }
  },
  methods: {
    // 页面搜索
    onSearch(value) {
      console.log(value);
      if (!value.trim()) {
        return false;
      }
      index({ name: value }).then(response => {
        console.log(response);
        console.log(typeof response.data);
        this.data = response.data.data;
        const pager = { ...this.pagination };
        pager.total = response.data.total;
        this.pagination = pager;
      });
    },

    userAdd() {
      this.$router.push({
        name: "UserAdd"
      });
    },

    // 表格参数改变时
    handleTableChange(pagination, filters, sorter) {
      // console.log(pagination);
      const pager = { ...this.pagination };
      // 将必要参数都放入pagination
      pager.current = pagination.current;
      pager.sortField = sorter.field;
      pager.sortOrder = sorter.order;
      this.pagination = pager;
      this.filters = filters;
      this.fetch({
        pageSize: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters // 此处放搜索字段
      });
    },

    // 获取首页数据
    fetch(params = {}) {
      // console.log("params:", params);
      this.loading = true;
      index(params).then(response => {
        console.log(response.data);
        const pagination = { ...this.pagination };
        let data = response.data;
        this.data = data.data;
        pagination.total = data.total;
        this.pagination = pagination;
        this.loading = false;
      });
      // 每次加载数据都重新获取一遍数据
      this.tag_data();
    },

    edit(id) {
      this.$router.push({
        name: "UserEdit",
        query: { id }
      });
    },

    // 删除用户
    del(id) {
      const self = this;
      this.$confirm({
        content: "确认删除？",
        cancelText: "取消",
        okText: "删除",
        onOk() {
          return new Promise((resolve, reject) => {
            // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)

            del({ id }).then(response => {
              self.$message.success("删除成功");
              self.fetch({
                pageSize: self.pagination.pageSize,
                page: self.pagination.current,
                sortField: self.pagination.sortField,
                sortOrder: self.pagination.sortOrder,
                ...self.filters
              });
              self.destroyAll();
            });
          });
        },
        onCancel() {
          self.destroyAll();
          self.$message.info("取消删除", 2);
        }
      });
    },

    destroyAll() {
      this.$destroyAll();
    },

    // 用户启用禁用
    status(id, state) {
      status({ id, status: state }).then(response => {
        // 获取数据按之前的排序和页码
        this.fetch({
          pageSize: this.pagination.pageSize,
          page: this.pagination.current,
          sortField: this.pagination.sortField,
          sortOrder: this.pagination.sortOrder,
          ...this.filters
        });
        setTimeout(() => {
          this.$message.success(response.message);
        }, 400);
      });
    },

    // 重置密码
    reset_password(id) {
      const self = this;
      this.$confirm({
        content: "重置后不可回复, 确认重置？",
        cancelText: "取消",
        okText: "重置",
        onOk() {
          return new Promise((resolve, reject) => {
            reset_password({ id }).then(response => {
              self.$message.success(response.message);
              self.destroyAll();
            });
          });
        },
        onCancel() {
          self.destroyAll();
          self.$message.info("取消重置", 2);
        }
      });
    },

    // tag标签数据
    tag_data() {
      tag_data().then(response => {
        this.total = response.data.total;
        this.start = response.data.start;
      });
    }
  }
};
</script>

<style>
.ant-table-tbody > tr > td {
  padding: 4px 8px;
  text-align: center;
}
</style>