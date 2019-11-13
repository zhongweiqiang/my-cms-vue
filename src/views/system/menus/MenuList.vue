<template>
  <div>
    <a-row>
      <a-col :span="3" :xs="24" :sm="5" :md="4" :lg="3">
        <menu-add :on-add="onAdd"  />
      </a-col>
      <a-col :span="8" :xs="24" :sm="10" :md="9" :lg="8">
        <a-input-search
          allowClear
          v-model="title"
          placeholder="请输入菜单名称"
          @search="onSearch"
          enterButton
        />
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
          <span slot="parent" v-if="text" slot-scope="text">{{text.title}}</span>
          <span slot="parent" v-else>无</span>
          <span slot="action" slot-scope="text">
            <menu-edit :id="text.id" :on-edit="onEdit"></menu-edit>
            <a-button size="small" type="danger" @click="del(text.id)" icon="delete" />
          </span>
        </a-table>
      </a-col>
    </a-row>
    <a-divider></a-divider>
  </div>
</template>

<script>
import { index, del } from "@/api/menu";
import MenuAdd from './MenuAdd'
import MenuEdit from './MenuEdit'
const columns = [
  {
    title: "id",
    dataIndex: "id",
    sorter: true,
    align: "center"
  },
  {
    title: "菜单名称",
    dataIndex: "title",
    align: "center"
  },
  {
    title: "视图路径",
    dataIndex: "path",
    align: "center"
  },
  {
    title: "菜单排序",
    dataIndex: "order",
    align: "center"
  },
  {
    title: "父级菜单",
    dataIndex: "parent",
    align: "center",
    scopedSlots: { customRender: "parent" }
  },
  {
    title: "菜单标识",
    dataIndex: "slug",
    align: "center"
  },
  {
    title: "资源类型",
    dataIndex: "type",
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
  components: { MenuAdd, MenuEdit },
  data() {
    return {
      data: [],
      pagination: { pageSize: 10 },
      loading: false,
      columns,
      // checked: false,

      // 给监听器使用的
      title: "",
      filters: {}
    };
  },
  mounted() {
    // 首次加载页面获取数据
    this.fetch({ pageSize: this.pagination.pageSize });
    // this.tag_data();
    console.log(this.config);
  },
  watch: {
    title: function(newVal, oldVal) {
      if (newVal == "") {
        this.fetch({ pageSize: this.pagination.pageSize });
      }
    }
  },
  methods: {
    // 页面搜索
    onSearch(value) {
      if (value.trim() == "") {
        return false;
      }
      index({ title: value }).then(response => {
        console.log(response);
        this.data = response.data.data;
        const pager = { ...this.pagination };
        pager.total = response.data.total;
        this.pagination = pager;
      });
    },

    onAdd(){
      this.fetch({ pageSize: this.pagination.pageSize })
    },

    onEdit(){
      this.fetch(this.pagination)
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
      // this.tag_data();
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
    }

    // tag标签数据
    // tag_data() {
    //   tag_data().then(response => {
    //     this.total = response.data.total;
    //     this.start = response.data.start;
    //   });
    // }
  }
};
</script>

<style>
.ant-table-tbody > tr > td {
  padding: 4px 8px;
  text-align: center;
}
</style>