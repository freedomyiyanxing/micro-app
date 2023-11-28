/** *
 * Copyright (c) 2023 湖南数字侠软件有限公司
 * @author freedom.yi
 * @date 2023/11/27
 * @project micro-app
 *
 * */
import { h, defineComponent } from "vue";
import { bus, preloadApp, startApp as rawStartApp, destroyApp, setupApp } from "wujie";

const wujieVueOptions = {
  name: "WuJie",
  props: {
    width: { type: String, default: "" },
    height: { type: String, default: "" },
    name: { type: String, default: "" },
    loading: { type: HTMLElement, default: undefined },
    url: { type: String, default: "" },
    sync: { type: Boolean, default: undefined },
    prefix: { type: Object, default: undefined },
    alive: { type: Boolean, default: undefined },
    props: { type: Object, default: undefined },
    attrs: { type: Object, default: undefined },
    replace: { type: Function, default: undefined },
    fetch: { type: Function, default: undefined },
    fiber: { type: Boolean, default: undefined },
    degrade: { type: Boolean, default: undefined },
    plugins: { type: Array, default: null },
    beforeLoad: { type: Function, default: null },
    beforeMount: { type: Function, default: null },
    afterMount: { type: Function, default: null },
    beforeUnmount: { type: Function, default: null },
    afterUnmount: { type: Function, default: null },
    activated: { type: Function, default: null },
    deactivated: { type: Function, default: null },
    loadError: { type: Function, default: null },
  },
  data() {
    return {
      startAppQueue: Promise.resolve(),
    };
  },
  created() {
    console.log('112233--- created')
  },
  mounted() {
    console.log('mounted')
    bus.$onAll(this.handleEmit);
    this.execStartApp();
    this.$watch(
      () => this.name + this.url,
      () => this.execStartApp()
    );
  },
  beforeDestroy() {
    bus.$offAll(this.handleEmit);
  },
  methods: {
    handleEmit(event, ...args) {
      this.$emit(event, ...args);
    },
    async startApp() {
      try {
        console.log(this);
        await rawStartApp({
          name: this.name,
          url: this.url,
          el: this.$refs.wujie,
          loading: this.loading,
          alive: this.alive,
          fetch: this.fetch,
          props: this.props,
          attrs: this.attrs,
          replace: this.replace,
          sync: this.sync,
          prefix: this.prefix,
          fiber: this.fiber,
          degrade: this.degrade,
          plugins: this.plugins,
          beforeLoad: this.beforeLoad,
          beforeMount: this.beforeMount,
          afterMount: this.afterMount,
          beforeUnmount: this.beforeUnmount,
          afterUnmount: this.afterUnmount,
          activated: this.activated,
          deactivated: this.deactivated,
          loadError: this.loadError,
        });
      } catch (error) {
        console.log(error);
      }
    },
    execStartApp() {
      this.startAppQueue = this.startAppQueue.then(this.startApp);
    },
    destroy() {
      destroyApp(this.name);
    },
  },
  render() {
    console.log(this);
    console.log('====111');
    return h("div", {
      style: {
        width: this.width,
        height: this.height,
      },
      ref: "wujie",
    });
  },
};

const WuJieVue = defineComponent(wujieVueOptions);

WuJieVue.setupApp = setupApp;
WuJieVue.preloadApp = preloadApp;
WuJieVue.bus = bus;
WuJieVue.destroyApp = destroyApp;
WuJieVue.install = function (app) {
  app.component("WuJie", WuJieVue);
};

export default WuJieVue;
