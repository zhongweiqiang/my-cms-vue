<template>
  <div style="display: inline;">
    <a-button size="small" type="primary" @click="showDrawer">菜单</a-button>
    <a-drawer
      title="分配菜单"
      placement="right"
      :closable="true"
      @close="onClose"
      :visible="visible"
      :width="300"
    >
      <!-- tree 控件 -->
      <div style="width: 200px; margin: 0 auto;">
        <a-tree
          checkable
          @expand="onExpand"
          :expandedKeys="expandedKeys"
          :autoExpandParent="autoExpandParent"
          v-model="checkedKeys"
          @select="onSelect"
          :selectedKeys="selectedKeys"
          :treeData="treeData"
        />
        <div style="margin-top: 30px;">
          <a-button type="primary" size="small" @click="add">确认</a-button>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script>
import { tree } from "@/api/menu";
import { store, index } from "@/api/role_menu";
import { resolve } from "q";
export default {
  props: {
    id: Number
  },
  mounted() {
    // console.log(this.id)
  },
  data() {
    return {
      visible: false,
      // tree数据
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [], // 选中的数据
      selectedKeys: [],
      treeData: []
    };
  },

  watch: {
    checkedKeys(val) {
      console.log("onCheck", val);
    }
  },
  methods: {
    showDrawer() {
      this.getTreeMenu();

      setTimeout(() => {
        this.visible = true;
      }, 300);
    },
    onClose() {
      this.visible = false;
    },

    getTreeMenu() {
      new Promise(resolve => {
        tree().then(response => {
          this.treeData = response.data;
          // console.log("tree", response);
          resolve()
        });
      }).then(() => {
        this.getSelectedMenu()
      })
    },

    add() {
      store({ role_id: this.id, menu_id: this.checkedKeys }).then(
        response => {
          this.$message.success('分配成功')
          this.onClose()
        }
      );
    },

    getSelectedMenu() {
      index({ role_id: this.id }).then(response => {
        this.checkedKeys = response.data.menu_id;
        this.expandedKeys = response.data.menu_id
      });
    },

    // tree methods
    onExpand(expandedKeys) {
      console.log("onExpand", expandedKeys);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onCheck(checkedKeys) {
      console.log("onCheck", checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onSelect(selectedKeys, info) {
      console.log("onSelect", info);
      this.selectedKeys = selectedKeys;
    }
  }
};
</script>
