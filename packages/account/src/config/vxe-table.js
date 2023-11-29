/**
 * @Description: VXETable 全局配置
 * @author Freedom.yi
 * @date 2021/8/31
 *
 */
import VXETable from 'vxe-table';

VXETable.renderer.add('NotData', {
  renderEmpty(h) {
    return [
      h(
        'div',
        {
          class: 'sht-vxe-table-empty',
        },
        [
          h('img', {
            domProps: {
              src: '/img/not-data.gif',
              alt: '404',
            },
          }),
          h('p', '亲，没有更多数据了！'),
        ],
      ),
    ];
  },
});

VXETable.setup({
  zIndex: 3000,
  size: 'mini',
  table: {
    stripe: true,
    resizable: true,
    align: 'center',
    border: 'full',
    size: 'mini',
    showFooter: true,
    showOverflow: 'tooltip',
    highlightHoverRow: true,
    tooltipConfig: {
      enterable: true,
    },
    emptyRender: {
      name: 'NotData',
    },
  },
  input: {
    controls: false,
  },
  textarea: {
    autosize: {
      minRows: 1.2,
      maxRows: 1.2,
    },
  },
});
