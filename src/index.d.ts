
import { AxiosInstance } from 'axios';

declare module 'vue/types/vue' {
    // 3. 声明为 Vue 补充的东西
    interface Vue {
        $http: AxiosInstance,
        $message: any,
        $notify: any,
        $confirm: any
    }
}