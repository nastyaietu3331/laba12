import Vue from "vue";
import App from "./App.vue";
// import myWorker from "./components/myWorker.vue";

Vue.config.productionTip = false;

// Vue.component("appMyWorker", myWorker);

new Vue({
    render: (h) => h(App),
}).$mount("#app");
