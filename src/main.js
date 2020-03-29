import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import { MdButton, MdCard, MdIcon } from "vue-material/dist/components";
import slide from "./directives/slide";

import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";

Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdIcon);
Vue.directive(slide.name, slide);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
