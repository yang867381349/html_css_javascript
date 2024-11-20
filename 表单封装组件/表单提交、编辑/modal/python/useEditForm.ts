import naiveUi from '@glob/js/naiveUi.ts';

export function useEditForm(row: any, oldRow: any) {
  function loadFormEditOptionsData() {
    // 获取预备资源
  }
  function loadFormEditData() {
    // oldRow 获取详情使用其参数进行详情的资源获取。
    console.log(oldRow);
    // 使用 row 对象的内容填充表单
    row.name = '我是编辑获取详情';
    console.log('=>(useEditForm.ts:9) formEdit.name', row.name);
  }

  function submitEditForm({ done }) {
    console.log('=>(useEditForm.ts:13) formEdit.name', row.name);
    try {
      const { msg } = { msg: '修改成功' }; // 假设API返回消息
      naiveUi.message.success(msg);
    } finally {
      done(); // 关闭按钮 loading
    }
  }

  return {
    loadFormEditOptionsData,
    loadFormEditData,
    submitEditForm,
  };
}
