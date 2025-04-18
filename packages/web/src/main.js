import { createApp } from 'vue'
import { installI18n } from '@prompt-optimizer/ui'
import App from './App.vue'

import '@prompt-optimizer/ui/dist/style.css'
import isInIcestark from '@ice/stark-app/lib/isInIcestark';
import setLibraryName from '@ice/stark-app/lib/setLibraryName';
import registerAppEnter from '@ice/stark-app/lib/registerAppEnter';
import registerAppLeave from '@ice/stark-app/lib/registerAppLeave';
import {createRouter, createWebHistory} from 'vue-router';
import getBasename from '@ice/stark-app/lib/getBasename';


const routes = [
    { path: '/', component: App },
    { path: '/index', component: App },
]


const app = createApp(App)
installI18n(app)
// app.mount('#app')
const history = createWebHistory(isInIcestark() ? getBasename() : "/");
const router = createRouter({
    history,
    routes,
});
app.use(router)



// 注意：`setLibraryName` 的入参需要与 webpack 工程配置的 output.library 保持一致
setLibraryName(__LIBRARY_NAME__)

export function mount({ container }) {
    // app = createApp(App);
    app.mount(container);
}


export function unmount() {
    app.unmount();
}



if (!isInIcestark()) {
    app.mount('#app');
}else{
    registerAppEnter((props) => {
        app.mount(props.container);
    });

    registerAppLeave((props) => {
        app.unmount()
    });
}





