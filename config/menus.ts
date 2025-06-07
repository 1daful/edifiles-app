import { NavList, NavLink, VComponent, TabType, ComponentType } from "../src/utils/DataTypes";
import Home from "../src/pages/Home.vue";
import Billing from "../src/pages/Billing.vue";
//import { TabType } from "@edifiles/services";

const HomeComponent: ComponentType = {
    component: Home
}

const BillingComponent: ComponentType = {
    component: Billing
}

export const menus1: NavList = new NavList({
    id: "",
    links: [
        {
            path: '/',
            name: 'Home',
            //query: {},
            //params: {}
        },
        {
            path: '/billing',
            name: 'Billing',
            //query: {},
            //params: {}
        },
        {
            path: '/tools',
            name: 'Tools',
            //query: {},
            //params: {}
        },
    ],
    navType: 'xTab'
})

export const createMenus = (id: string, navType: TabType, menus: string[]) => {
    let navList: NavList = new NavList({
        id: id,
        links: [],
        navType: navType
    })
    menus.forEach(menu => {
        navList.links.push({
            path: "/" + menu,
            name: menu
        })
    });

    return navList
}

export const menus = createMenus(
    'mainMain',
    'xTab',
    [
        'services', 
        'groups', 
        'announcement', 
        'members', 
        'messages',
        'events',
        'reachouts'
    ],
    )