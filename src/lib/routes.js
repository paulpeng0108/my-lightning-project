import {Home} from "../pages/Home"
import {Boot} from "../pages/Boot"
import {NotFound} from "../pages/NotFound"
import {Detail} from "../pages/Detail"

export default {
    routes: [
        {
            path: '$',
            component: Boot
        },
        {
            path: '*',
            component: NotFound
        },
        {
            path: 'home',
            component: Home
        },
        {
            path: 'detail/:movieID',
            component: Detail
        }
    ]
}