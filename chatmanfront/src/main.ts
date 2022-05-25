import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import './registerServiceWorker';
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toolbar from "primevue/toolbar";
import SplitButton from "primevue/splitbutton";
import Listbox from "primevue/listbox";
import BadgeDirective from "primevue/badgedirective";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css";
import {jwtInterceptor} from "./helpers/jwt-interceptor";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
const app = createApp(App);
jwtInterceptor();
app.use(PrimeVue);
app.use(createPinia());
app.use(router);



app.component(`Dialog`, Dialog);
app.component(`Button`, Button);
app.component(`InputText`, InputText);
app.component(`Toolbar`, Toolbar);
app.component(`SplitButton`, SplitButton);
app.component(`Listbox`, Listbox);
app.directive(`badge`, BadgeDirective);
app.component(`Splitter`, Splitter);
app.component(`SplitterPanel`, SplitterPanel);

app.mount("#app");
