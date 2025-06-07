class Comp {
    constructor(obj) {
        Object.assign(this, obj);
    }
    comp;
}
function AddProperties(Base, propertiesToAdd) {
    return class extends Base {
        constructor(...args) {
            super(...args);
            Object.assign(this, propertiesToAdd);
        }
    };
}
function getComp(obj) {
    let comp = new Comp(obj);
    Object.assign(comp, obj);
    return comp;
}
export class Slides {
    constructor(...data) {
        this.content = data;
    }
    content;
}
export class Menu {
    header = {
        reveal: true,
        bordered: false,
        elevated: true,
        class: {
            custom: "fixed-nav",
            margin: 'q-ma-auto'
        }
    };
    toolBar = {
        class: "justify-end"
    };
    brand = {
        class: ""
    };
    hero = {
        backgroundColor: ""
    };
    listStyle;
    closeBtn = getComp({
        id: "closeMenuBtn",
        label: {
            text: 'close',
            icon: 'close'
        },
        event: (drawerOpen) => { drawerOpen = !drawerOpen; },
        style: {
            size: "20px",
            color: "red",
            type: "flat",
            shape: "round",
            dense: true,
        },
        class: "lt-md"
    });
    openBtn = getComp({
        id: "menuBtn",
        label: {
            text: '',
            icon: 'menu'
        },
        event: (drawerOpen) => { drawerOpen = !drawerOpen; },
        style: {
            size: "20px",
            color: "primary",
            type: "flat",
            shape: "round",
            dense: true,
        },
        class: "lt-md"
    });
}
;
export class VComponent {
    constructor(component) {
        Object.assign(this, component);
    }
    id;
    props;
    sections = [];
    component;
    viewGuard;
    style;
    class;
    watcher;
}
export class View extends VComponent {
    heading;
    thumbnail;
    rows;
    columns = 1;
    card;
    sections = [];
    viewport = 'sm';
    viewStyle;
}
export class PageView extends View {
    constructor(pageView) {
        super(pageView);
        Object.assign(this, pageView);
    }
    header = [];
    footer = [];
    right = [];
    left = [];
    center;
    children = [];
}
export class RowView extends View {
}
export class InputContent extends VComponent {
    label;
    model;
}
export class Loader extends VComponent {
    loading;
    icon;
}
export class Options extends InputContent {
    options = [];
    params;
}
export class FormView extends View {
    actions = [];
}
export class FormList extends View {
    forms = [];
    actions = [];
}
export class DataGraph extends VComponent {
    heading;
    layout;
    icon;
    postion;
    size;
    viewport;
    chartType;
    series;
    label;
    data;
    xaxisType;
}
export class DataTable extends VComponent {
    columns;
    rows;
    setHeader;
    tableStyle;
    actions;
    separator;
    computeAction;
}
export class DataView extends View {
    dataContents;
    overlay;
    actions;
}
export class Action extends VComponent {
    label;
    type;
    iconRight;
    args;
    event;
    onResult;
    onError;
    state;
    children;
    actionStyle;
}
export class ActionList extends View {
    name;
    actions;
    actionStyle;
    state;
    layout;
}
export class NavLink extends VComponent {
    icon;
    path;
    name;
    params;
    query;
    children = [];
}
export class NavList extends VComponent {
    constructor(obj) {
        super(obj);
        Object.assign(this, obj);
    }
    links;
    navType;
}
export class Filters extends View {
    constructor(filters) {
        super(filters);
        Object.assign(this, filters);
    }
    postion;
    indexName;
    options;
    actions;
    rangeList;
    checks;
}
const view = {
    props: undefined,
    sections: [
        {
            name: ''
        }
    ],
    id: ""
};
let beru = getComp({
    id: "beru",
    style: {},
    sections: []
});
