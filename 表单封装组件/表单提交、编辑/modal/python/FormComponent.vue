<template>
  <div>
    <modal-layout :show="visibly" @after-enter="onActive" @after-leave="onLeave">
      <modal-form-layout
        :width="500"
        :title="isEdit ? t('修改') : t('新增')"
        @on-cancel="closeModal"
        @on-confirm="submit"
      >
        <n-form
          ref="formRef"
          :label-width="120"
          :model="FormData"
          :rules="rules"
          label-placement="left"
        >
          <n-form-item :label="$t('协议')" path="pact" size="small">
            <n-radio-group v-model:value="FormData.pact" name="radioGroup">
              <n-radio-button value="null">{{ $t('命令行启动') }}</n-radio-button>
              <n-radio-button value="uwsgi">{{ $t('uwsgi') }}</n-radio-button>
              <n-radio-button value="gunicrn">{{ $t('gunicrn') }}</n-radio-button>
            </n-radio-group>
          </n-form-item>
          <template v-if="FormData.pact === 'null'">
            <n-form-item :label="$t('项目名称')" path="name" size="small">
              <n-input
                style="width: 350px"
                v-model:value="FormData.name"
                clearable
                maxlength="60"
                :placeholder="$t('请输入项目名称')"
              />
            </n-form-item>
            <n-form-item :label="$t('虚拟环境')" path="selectValue" size="small">
              <n-select
                style="width: 350px"
                v-model:value="FormData.selectValue"
                :placeholder="$t('请选择版本')"
                :options="Options.VersionOptions"
              />
            </n-form-item>
            <n-form-item :label="$t('项目根目录')" path="root" size="small">
              <div class="flex-box">
                <select-directory
                  style="width: 350px"
                  v-model:value="FormData.xPath"
                ></select-directory>
                <n-checkbox v-model:checked="FormData.checkbox">
                  {{ $t('自动下载依赖环境（当前目录存在requirements.txt文件时生效）') }}
                </n-checkbox>
              </div>
            </n-form-item>
            <n-form-item :label="$t('进程守护')" path="root" size="small">
              <n-checkbox v-model:checked="FormData.checkbox">
                {{ $t('是否开启进程守护（默认开机启动）') }}
              </n-checkbox>
            </n-form-item>
            <n-form-item :label="$t('启动命令')" path="root" size="small">
              <n-input
                style="width: 350px"
                v-model:value="value"
                type="textarea"
                :autosize="{
                  minRows: 3,
                  maxRows: 5,
                }"
                maxlength="200"
                show-count
                clearable
                :placeholder="$t('请输入执行参数')"
              />
            </n-form-item>
            <n-form-item :label="$t('环境变量')" path="env" size="small">
              <div class="flex-box">
                <n-radio-group v-model:value="FormData.env" name="radioGroup">
                  <n-radio value="null">{{ $t('无') }}</n-radio>
                  <n-radio value="env">{{ $t('指定变量') }}</n-radio>
                  <n-radio value="file">{{ $t('从文件加载') }}</n-radio>
                </n-radio-group>
                <div>
                  <n-input
                    v-if="FormData.env === 'env'"
                    style="width: 350px"
                    v-model:value="value"
                    type="textarea"
                    :autosize="{
                      minRows: 3,
                      maxRows: 5,
                    }"
                    maxlength="200"
                    show-count
                    clearable
                    :placeholder="$t('请输入执行参数')"
                  />
                  <select-directory
                    v-if="FormData.env === 'file'"
                    style="width: 350px"
                    v-model:value="FormData.xPath"
                  ></select-directory>
                </div>
              </div>
            </n-form-item>
            <n-form-item :label="$t('运行用户')" path="user" size="small">
              <div class="flex-box">
                <n-select
                  style="width: 350px"
                  v-model:value="FormData.user"
                  :placeholder="$t('请选择运行用户')"
                  :options="Options.UserOptions"
                />
                <span>* {{ $t('无特殊需求请选择www用户') }}</span>
              </div>
            </n-form-item>
            <n-form-item :label="$t('备注')" path="root" size="small">
              <n-input
                style="width: 350px"
                v-model:value="value"
                type="textarea"
                :autosize="{
                  minRows: 2,
                  maxRows: 4,
                }"
                maxlength="150"
                show-count
                clearable
                :placeholder="$t('请输入备注')"
              />
            </n-form-item>
          </template>
          <template v-if="FormData.pact === 'uwsgi'">
            <n-form-item :label="$t('项目名称')" path="name" size="small">
              <n-input
                style="width: 350px"
                v-model:value="FormData.name"
                clearable
                maxlength="60"
                :placeholder="$t('请输入项目名称')"
              />
            </n-form-item>
            <n-form-item :label="$t('虚拟环境')" path="selectValue" size="small">
              <n-select
                style="width: 350px"
                v-model:value="FormData.selectValue"
                :placeholder="$t('请选择版本')"
                :options="Options.VersionOptions"
              />
            </n-form-item>
            <n-form-item :label="$t('项目根目录')" path="root" size="small">
              <div class="flex-box">
                <select-directory
                  style="width: 350px"
                  v-model:value="FormData.xPath"
                ></select-directory>
                <n-checkbox v-model:checked="FormData.checkbox">
                  {{ $t('自动下载依赖环境（当前目录存在requirements.txt文件时生效）') }}
                </n-checkbox>
              </div>
            </n-form-item>
            <n-form-item :label="$t('进程守护')" path="root" size="small">
              <n-checkbox v-model:checked="FormData.checkbox">
                {{ $t('是否开启进程守护（默认开机启动）') }}
              </n-checkbox>
            </n-form-item>
            <n-form-item :label="$t('入口文件')" path="root" size="small">
              <select-directory
                style="width: 350px"
                v-model:value="FormData.xPath"
              ></select-directory>
            </n-form-item>
            <n-form-item :label="$t('通讯协议')" path="selectValue" size="small">
              <n-select
                style="width: 350px"
                v-model:value="FormData.selectValue"
                :placeholder="$t('请选择通讯协议')"
                :options="Options.VersionOptions"
              />
            </n-form-item>
            <n-form-item :label="$t('应用名称')" path="name" size="small">
              <n-input
                style="width: 350px"
                v-model:value="FormData.name"
                clearable
                maxlength="60"
                :placeholder="$t('请输入项目名称')"
              />
            </n-form-item>
            <n-form-item :label="$t('环境变量')" path="env" size="small">
              <div class="flex-box">
                <n-radio-group v-model:value="FormData.env" name="radioGroup">
                  <n-radio value="null">{{ $t('无') }}</n-radio>
                  <n-radio value="env">{{ $t('指定变量') }}</n-radio>
                  <n-radio value="file">{{ $t('从文件加载') }}</n-radio>
                </n-radio-group>
                <div>
                  <n-input
                    v-if="FormData.env === 'env'"
                    style="width: 350px"
                    v-model:value="value"
                    type="textarea"
                    :autosize="{
                      minRows: 3,
                      maxRows: 5,
                    }"
                    maxlength="200"
                    show-count
                    clearable
                    :placeholder="$t('请输入执行参数')"
                  />
                  <select-directory
                    v-if="FormData.env === 'file'"
                    style="width: 350px"
                    v-model:value="FormData.xPath"
                  ></select-directory>
                </div>
              </div>
            </n-form-item>
            <n-form-item :label="$t('运行用户')" path="user" size="small">
              <div class="flex-box">
                <n-select
                  style="width: 350px"
                  v-model:value="FormData.user"
                  :placeholder="$t('请选择运行用户')"
                  :options="Options.UserOptions"
                />
                <span>* {{ $t('无特殊需求请选择www用户') }}</span>
              </div>
            </n-form-item>
            <n-form-item :label="$t('备注')" path="root" size="small">
              <n-input
                style="width: 350px"
                v-model:value="value"
                type="textarea"
                :autosize="{
                  minRows: 2,
                  maxRows: 4,
                }"
                maxlength="150"
                show-count
                clearable
                :placeholder="$t('请输入备注')"
              />
            </n-form-item>
          </template>
          <template v-if="FormData.pact === 'gunicrn'">
            <n-form-item :label="$t('项目名称')" path="name" size="small">
              <n-input
                style="width: 350px"
                v-model:value="FormData.name"
                clearable
                maxlength="60"
                :placeholder="$t('请输入项目名称')"
              />
            </n-form-item>
            <n-form-item :label="$t('虚拟环境')" path="selectValue" size="small">
              <n-select
                style="width: 350px"
                v-model:value="FormData.selectValue"
                :placeholder="$t('请选择版本')"
                :options="Options.VersionOptions"
              />
            </n-form-item>
            <n-form-item :label="$t('项目根目录')" path="root" size="small">
              <div class="flex-box">
                <select-directory
                  style="width: 350px"
                  v-model:value="FormData.xPath"
                ></select-directory>
                <n-checkbox v-model:checked="FormData.checkbox">
                  {{ $t('自动下载依赖环境（当前目录存在requirements.txt文件时生效）') }}
                </n-checkbox>
              </div>
            </n-form-item>
            <n-form-item :label="$t('进程守护')" path="root" size="small">
              <n-checkbox v-model:checked="FormData.checkbox">
                {{ $t('是否开启进程守护（默认开机启动）') }}
              </n-checkbox>
            </n-form-item>
            <n-form-item :label="$t('入口文件')" path="root" size="small">
              <select-directory
                style="width: 350px"
                v-model:value="FormData.xPath"
              ></select-directory>
            </n-form-item>
            <n-form-item :label="$t('通讯协议')" path="selectValue" size="small">
              <n-select
                style="width: 350px"
                v-model:value="FormData.selectValue"
                :placeholder="$t('请选择通讯协议')"
                :options="Options.VersionOptions"
              />
            </n-form-item>
            <n-form-item :label="$t('应用名称')" path="name" size="small">
              <n-input
                style="width: 350px"
                v-model:value="FormData.name"
                clearable
                maxlength="60"
                :placeholder="$t('请输入项目名称')"
              />
            </n-form-item>
            <n-form-item :label="$t('环境变量')" path="env" size="small">
              <div class="flex-box">
                <n-radio-group v-model:value="FormData.env" name="radioGroup">
                  <n-radio value="null">{{ $t('无') }}</n-radio>
                  <n-radio value="env">{{ $t('指定变量') }}</n-radio>
                  <n-radio value="file">{{ $t('从文件加载') }}</n-radio>
                </n-radio-group>
                <div>
                  <n-input
                    v-if="FormData.env === 'env'"
                    style="width: 350px"
                    v-model:value="value"
                    type="textarea"
                    :autosize="{
                      minRows: 3,
                      maxRows: 5,
                    }"
                    maxlength="200"
                    show-count
                    clearable
                    :placeholder="$t('请输入执行参数')"
                  />
                  <select-directory
                    v-if="FormData.env === 'file'"
                    style="width: 350px"
                    v-model:value="FormData.xPath"
                  ></select-directory>
                </div>
              </div>
            </n-form-item>
            <n-form-item :label="$t('运行用户')" path="user" size="small">
              <div class="flex-box">
                <n-select
                  style="width: 350px"
                  v-model:value="FormData.user"
                  :placeholder="$t('请选择运行用户')"
                  :options="Options.UserOptions"
                />
                <span>* {{ $t('无特殊需求请选择www用户') }}</span>
              </div>
            </n-form-item>
            <n-form-item :label="$t('备注')" path="root" size="small">
              <n-input
                style="width: 350px"
                v-model:value="value"
                type="textarea"
                :autosize="{
                  minRows: 2,
                  maxRows: 4,
                }"
                maxlength="150"
                show-count
                clearable
                :placeholder="$t('请输入备注')"
              />
            </n-form-item>
          </template>
        </n-form>
      </modal-form-layout>
    </modal-layout>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, ref, reactive, useTemplateRef } from 'vue';
  import { NForm, type FormRules } from 'naive-ui';
  import modalLayout from '@glob/components/ModalLayout.vue';
  import modalFormLayout from '@glob/components/ModalFormLayout.vue';
  import { useI18n } from 'vue-i18n';
  import { useEditForm } from './useEditForm.ts';
  import { useCreateForm } from '@deploy/modal/java/useCreateForm.ts';
  import SelectDirectory from '@glob/components/SelectDirectory.vue'; // 引入编辑逻辑

  const { t } = useI18n();

  /** 创建Emit */
  const emit = defineEmits<{
    success: [status: string]; // 具名元组语法
    'update:visibly': [value: boolean]; // 具名元组语法
    submit: [{ done: () => void }]; // 具名元组语法
  }>();

  /** 创建Props */
  const { isEdit, visibly, row } = defineProps<{
    isEdit: boolean;
    visibly: boolean;
    row?: { name: string }; // row 对象可选，表示修改时传入的数据
  }>();

  /** 加载状态 */
  const loading = ref(false);

  /** 默认数据 */
  const info = () => ({
    name: '',
  });

  /** 数据 */
  const FormData = ref(info());

  /** 数据-选项 */
  const Options = reactive({
    VersionOptions: [],
    UserOptions: [],
  });

  /** 获取DOM vue3.5+ useTemplateRef 获取DOM */
  const formRef = useTemplateRef<InstanceType<typeof NForm>>('formRef'); // 明确告知 TypeScript，formRef 是一个 n-form 实例的引用

  /** 校验 */
  const rules: FormRules = {
    name: {
      required: true,
      validator(_, value: string) {
        if (!value) return new Error(t('请输入'));
        return true;
      },
      trigger: ['blur', 'input'],
    },
  };

  /** 使用编辑表单逻辑 */
  const { loadFormEditOptionsData, loadFormEditData, submitEditForm } = useEditForm(
    FormData.value,
    row,
  );
  const { loadFormCreateOptionsData, submitCreateForm } = useCreateForm(FormData.value);

  /** 进入表单 */
  const onActive = () => {
    if (isEdit) {
      loadFormEditData(); // 获取详情
      loadFormEditOptionsData(); // 获取预备资源
    } else {
      loadFormCreateOptionsData(); // 获取预备资源
    }
  };

  /** 退出表单 */
  const onLeave = () => {
    Object.assign(FormData.value, info()); // 重置表单数据
  };

  /** 提交 */
  const submit = ({ done }) => {
    loading.value = true;
    nextTick(() => {
      formRef.value?.validate((errors: any) => {
        if (!errors) {
          if (isEdit) {
            submitEditForm({ done });
          } else {
            submitCreateForm({ done });
          }
        } else {
          done(); // 关闭按钮loading
        }
      });
    });
  };

  /** 取消 */
  const closeModal = () => {
    Object.assign(FormData.value, info()); // 重置表单数据
    emit('update:visibly', false); // 关闭窗口
  };
</script>
<style scoped lang="scss">
  .flex-box {
    display: flex;
    flex-direction: column;
  }
</style>
