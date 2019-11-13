<template>
  <div style="max-width: 80%;">
    <a-button size="small" type="primary" @click="roleAdd">
      <a-icon type="plus" />角色
    </a-button>
    <a-table
      :pagination="false"
      :columns="columns"
      :dataSource="data"
      :loading="loading"
      :rowKey="record => record.id"
    >
      <span slot="action" slot-scope="text">
        <a-button size="small" type="primary" @click="edit(text.id)" icon="edit" />
        <a-button size="small" type="danger" @click="del(text.id)" icon="delete" />
        <menu-drawer :id="text.id" />
        <perm-drawer :id="text.id" />
        <!-- <a-button size="small" type="primary" @click="perm_list(text.id)">权限</a-button> -->
      </span>
    </a-table>
  </div>
</template>
<script>
import { index, edit, del } from "@/api/role";
import MenuDrawer from "./MenuDrawer";
import PermDrawer from "./PermDrawer";
const columns = [
  {
    title: "id",
    dataIndex: "id",
    align: "center"
  },
  {
    title: "角色名称",
    dataIndex: "name",
    align: "center"
  },
  {
    title: "角色描述",
    dataIndex: "description",
    align: "center"
  },
  {
    title: "Action",
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

export default {
  components: { MenuDrawer, PermDrawer },
  data() {
    return {
      data: [],
      columns,
      loading: true
    };
  },
  created() {
    this.roleList();
  },
  mounted() {},

  methods: {
    roleList() {
      index().then(response => {
        this.data = response.data;
        this.loading = false;
      });
    },

    edit(id) {
      this.$router.push({
        name: "RoleEdit",
        query: { id }
      });
    },

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
              if (response.code == 200) {
                self.$message.success("删除成功");
                self.roleList();
                self.destroyAll();
              }
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

    roleAdd() {
      this.$router.push({
        name: "RoleAdd"
      });
    },

    perm_list(id) {
      console.log("this is perm list " + id);
      this.visible = true;
    },

    handleOk(e) {
      console.log(e);
      this.visible = false;
    }
  }
};
</script>
