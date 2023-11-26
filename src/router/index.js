import * as VueRouter from 'vue-router';
import Home from "../views/Home";
import Octagon from "../views/Octagon";
import RecoveryZone from "../views/RecoveryZone";
import Dojo from "../views/Dojo";
import Leaderboard from "../views/Leaderboard";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/dojo",
        name: "Dojo",
        component: Dojo,
    },
    {
        path: "/octagon",
        name: "Octagon",
        component: Octagon,
    },
    {
        path: "/recovery",
        name: "RecoveryZone",
        component: RecoveryZone,
    },
    {
        path: "/leaderboard",
        name: "Leaderboard",
        component: Leaderboard,
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

export default router