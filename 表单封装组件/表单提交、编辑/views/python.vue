<template>
  <n-button type="primary" @click="addRow">
    {{ t('项目部署') }}
  </n-button>
  <!-- 新增、修改 -->
  <form-component
    v-model:visibly="Visibly"
    @success="getListTable"
    :isEdit="isEdit"
    :form="form"
    :row="TableRow"
    @cancel="handleCancel"
  ></form-component>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { NButton } from 'naive-ui';
  // ==========类型==========
  import { Row } from '@deploy/type';
  // ==========类型END==========
  // ==========中英文==========
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  // ==========中英文==========
  // ==========新增、修改、容器==========
  import FormComponent from '@deploy/modal/python/FormComponent.vue';
  const isEdit = ref(false);
  const form = ref({});
  /** 取消区域 */
  function handleCancel() {
    console.log('取消操作');
  }
  /** 新增 */
  const addRow = () => {
    Visibly.value = true;
    isEdit.value = false;
  };
  // ==========新增、修改、容器END==========
  // ==========状态==========
  const Visibly = ref<boolean>(false); // 窗口
  // ==========状态END==========
  // ==========表格==========
  const data = ref<Row[]>([]);
  const TableRow = ref<Row>({}); // 存储表格单行数据
  const columns = [{}]; // 表格th及td
  const getListTable = () => {};
  // ==========表格END==========
</script>

<style lang="scss" scoped>
  .java-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
