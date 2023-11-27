import { createApp } from 'vue';
import VXETable from 'vxe-table';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import App from './App';
import router from './router';
import '@/assets/styles/reset.css'
import '@/assets/styles/arco.min.css';
import '@/assets/vxe-table/vxe-table.min.css';
import pinia from '@/store';


function useImport(app) {
  app.use(VXETable);
  app.use(router);
  app.use(ArcoVue);
  app.use(ArcoVueIcon);
  app.use(pinia);
}

createApp(App).use(useImport).mount('#app')
