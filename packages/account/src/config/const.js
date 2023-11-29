/**
 * @Description: 整体项目常量配置
 * @author Freedom.yi
 * @date 2021/8/31
 *
 */
// 分页
export const PAGES = () => ({
  current: 1,
  total: 0,
  size: 20,
});

// 分页条数分组
export const PAGE_GROUP = [5, 10, 20, 50, 100, 300, 500];

// 列表table暂时最大高度
export const LIST_TABLE_MAX_HEIGHT = 700;

// 保存类型
export const SUBMIT_TYPE = 0;

// 保存并且审批类型
export const SUBMIT_APPROVE_TYPE = 1;

// 单价小数位数
export const UNIT_PRICE_DIGIT = 6;

// 总价小数位数
export const TOTAL_PRICE_DIGIT = 2;

// 最大复制行数
export const FILTER_COPY_NUMBER = 100;

// vxe-input 最大输入数字
export const VXE_INPUT_ENTER_NUMBER = 1000;

// 生成最大行数
export const ADD_GOODS_LIST_LENGTH = 30;

// el-form 的 label 宽度
export const EL_FORM_LABEL_WIDTH = '120px';

// 空替代符号
export const EMPTY_REPLACE_SYMBOL = '-';

export const START_TIME_STR = ' 00:00:00';
export const END_TIME_STR = ' 23:59:59';

export const RMB_TAX = 0.13;
