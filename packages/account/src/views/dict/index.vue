<!--
* Copyright (c) 2023 湖南数字侠软件有限公司
* @author freedom.yi
* @date 2023/11/28
* @project micro-app
*
-->
<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <vxe-table
        :checkbox-config="{ highlight: true }"
        :data="tableData"
        :loading="loading"
        ref="multipleTable"
        :custom-config="{ storage: { resizable: true } }"
        id="system-login-device"
    >
      <vxe-column fixed="left" type="checkbox" width="50" />
      <vxe-column fixed="left" type="seq" width="50" />
      <vxe-column title="mac地址" field="mac" width="160" />
      <vxe-column title="ip地址" field="ip" width="160" />
      <vxe-column title="机器码" field="code" min-width="200" />
      <vxe-column title="名称" field="name" min-width="150" />
      <vxe-column title="别名" field="alias" min-width="150" />
      <vxe-column title="状态" field="status" width="100" />
      <vxe-column title="操作" field="operation" width="180">
        <template #default="{ row }">
          <el-button @click="handleLook(row)" type="primary">
            查看
          </el-button>
          <el-button @click="handleEdit(row)" type="primary">
            删除
          </el-button>
        </template>
      </vxe-column>
    </vxe-table>

    <el-dialog title="你好" :visible.sync="dialogVisible" :before-close="resetForm" width="800px" top="20px">
      <div>1</div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '../../api/dict';
import { PAGES } from '../../config/const';

export default {
  name: 'dict',

  data() {
    return {
      tableData: [],
      loading: false,
      dialogVisible: false,
      formInline: {
        user: '',
        region: ''
      }
    }
  },

  created() {
    console.log('window.__POWERED_BY_WUJIE__ ', window.__POWERED_BY_WUJIE__)

    console.log(window.parent.document.body)
    console.log(document.body)
    this.getData();
  },

  methods: {
    // 获取数据
    async getData() {
      try {
        this.loading = true;
        const res = await getList(PAGES()).catch(() => null);
        this.loading = false;
        if (res?.data.success) {
          this.tableData = res.data.data.records;
        }
      } catch (e) {
        console.log(e)
      }
    },
    onSubmit() {
    },
    handleLook(row) {
      this.dialogVisible = true;
    },

    handleEdit() {
      this.$confirm('确定将选择数据删除?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
          .then(async () => {
            this.$message({
              type: 'success',
              message: '操作成功!',
            });
          })
          .catch(() => null);
    },
    resetForm() {
      this.dialogVisible = false;
    },
  }
};
</script>

<style scoped lang="scss">
.demo-form-inline {
  display: flex;

  justify-content: space-around;
}
</style>
