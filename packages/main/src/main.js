import { createApp } from 'vue';
import VXETable from 'vxe-table';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import router from '@/router';
import pinia from '@/store';
import '@/assets/styles/reset.css'
import '@/assets/styles/arco.min.css';
import '@/assets/vxe-table/vxe-table.min.css';
import App from './App';

// const { setupApp } = WujieVue;
//
// setupApp({
//   name: "account",
//   url: 'http://localhost:8002/',
//   exec: true,
// });

function useImport(app) {
  app.use(VXETable);
  app.use(router);
  app.use(ArcoVue);
  app.use(ArcoVueIcon);
  app.use(pinia);
}

createApp(App).use(useImport).mount('#app')
