import { EAuth, Mailer } from '@edifiles/services';
import { View, Action, PageView, ActionList, RoutePage } from "../src/utils/DataTypes";
import Search from "../src/components/ESearch.vue";
import { menus } from "./menus";
import Home from "../src/pages/Home.vue";
import { config } from "../public/config";
//import { firstTimer } from "./model";
import { Service } from "../model/Service";
import { ReachOut } from '../model/ReachOut';
import { Event } from '../model/Event';
import { Member } from '../model/Member';
import { Attendance } from '../model/Attendance';
import { Group } from '../model/Group';

//import { auth } from './model';

/*const postQuery = `
  query GetPost($postId: ID!) {
    post(id: $postId) {
      id
      title
      content
      author
      createdAt
    }
  }`;*/

/*const { data, fetching, error } = useQuery({
    query: postQuery,
    variables: { postId: 'your-post-id' },
});*/

//const repo = new Repository(config.api.Supabase)
//const recom = new Recommender(config)
const auth = new EAuth(config.api.Supabase)

const search: View = new View({
    id: 'search',
    sections: [{
        component: Search
    }]
})

const authAction = new ActionList({
    actions: [
        new Action({
            label: 'Sign In',
            event: 'Route',
            args: '/signin',
            style: {
                type: 'outline'
            },
            viewGuard: false
        }),
        new Action({
            label: 'Sign Up',
            event: 'Route',
            args: '/signup',
            viewGuard: false
        }),
        new Action({
            label: 'Sign Out',
            event: async () => {
                return await auth.logout()
            },
            onResult: {
                redirect: '/',
                args: ''
            },
            viewGuard: true
        })
    ],
    layout: 'Horizontal'
})

const home: PageView = new PageView({
    id: 'home',
    main: {
        sections: [{
            component: Home
        }]
    },
    children: []
})
const serviceModel = new Service()
const groupModel = new Group()
const eventModel = new Event()
const reachoutModel = new ReachOut()
const memberModel = new Member()
const attendanceModel = new Attendance()

async function userIcon() {
    const names = (await auth.getUser()).data.user?.user_metadata
    return names?.firstName
}
const userAvatar: Action = new Action({
    icon: await userIcon(),
    event: 'Modal'
})

const mainLayout: PageView = new PageView({
    id: 'mainLayout',
    main: {
        sections: [menus, search, authAction, userAvatar]
    },
    children: [
        //home, serviceModel, eventModel, reachoutModel, memberModel, attendanceModel, groupModel
    ]
})
export const GlobalView: {
    mainLayout: PageView,
    routePages: Record<string, RoutePage>
} = {
    mainLayout,
    routePages: {}
}

/*export const setGlobal = () => {
    Object.keys(GlobalView).forEach((key) => {
        const widgetKey = key as WidgetName;
        useWidgets().get(widgetKey).insert(...GlobalView[widgetKey])
      });
}*/

export const view = new PageView({
    id: '',
    main: [],
    children: []
})

/*const resolver = (type: string) => {
    repo.readItems('',{type, })
    return {
        id: '',
        name: ''
    }
}*/

export const config2 = {
    template: {
        views: [
        ],
        xlinks: [],
        ylinks: [],
        style: {
            background: {},
            foreground: {},
            visuals: {}, //buttons, headers etc
            cards: {}
        },
        services: {}
    }
}

export function addRoutePage(child: PageView, parent?: PageView) {
    if (parent) {
        GlobalView.routePages[`${parent.id}/${child.id}`] = {
            id: child.id,
            parentId: parent.id,
            model: () => child
        };
    }
    else {
        GlobalView.routePages[child.id] = {
            id: child.id,
            parentId: 'mainLayout',
            model: () => child
        };
    }
    if (child.children && child.children.length > 0) {
        child.children.forEach((c) => {
            addRoutePage(c, child);
        });
    }
}