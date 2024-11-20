import naiveUi from '@glob/js/naiveUi.ts';

export function useCreateForm(row: any) {
  function loadFormCreateOptionsData() {
    // 获取预备资源
  }
  function submitCreateForm({ done }) {
    console.log('新增数据:', row.name); // 使用 formCreate 而不是 form
    try {
      // 模拟 API 请求成功后的处理
      const { msg } = { msg: '创建成功' }; // 假设 API 返回消息
      naiveUi.message.success(msg); // 显示成功消息
      // emit('success', true); // 你可以通过 emit 触发事件来刷新父组件
    } finally {
      done(); // 关闭按钮 loading
    }
  }

  return {
    loadFormCreateOptionsData,
    submitCreateForm,
  };
}
