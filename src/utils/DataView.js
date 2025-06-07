import { GlobalView } from "../../config/edifiles.config";
import { foreignColumns } from "@edifiles/services/dist/module/utility/Query";
import { dbClient } from "../../config/model";
import { NavList, Content, VComponent } from "./DataTypes";
import { PageView, isType } from "./types";
export async function postData(query, questionsData) {
    const view = new PageView({
        id: "",
        layout: "Grid",
        sections: [questionsData],
        children: []
    });
    return view;
}
export async function getData(query, callback, client) {
    const useClient = client || dbClient;
    let data = await useClient.get(query);
    let section = [];
    if (data) {
        section = data.data?.map((dat) => {
            return callback(dat);
        });
    }
    return section;
}
export async function geViewData(model, client) {
    const useClient = client || dbClient;
    const query = getQuery(model);
    let data = await useClient.get(query);
    return resolveViewData(model, data);
}
function getQuery(model) {
    let query = {
        name: "",
        data: undefined,
        filters: [],
        modifiers: [],
        columns: []
    };
    Object.entries(model).forEach(([colOrTable, valueOrColumns]) => {
        if (!(valueOrColumns instanceof VComponent) && valueOrColumns !== null) {
            query.columns?.push(foreignColumns(colOrTable, Object.keys(valueOrColumns)));
        }
        else {
            query.columns?.push(colOrTable);
        }
    });
    return query;
}
let viewContent;
function resolveViewData(model, data) {
    viewContent = model;
    Object.entries(model).forEach(([key, value]) => {
        if (isType(value, Content)) {
            viewContent[key]['text'] = data[key];
        }
        else if (value === '') {
            viewContent[key]['text'] = data[key];
        }
        else {
            resolveViewData(model[key], data[key]);
        }
    });
    return viewContent;
}
export async function addModel(clazz, parentView, id, ...query) {
    let view;
    const childView = new clazz();
    childView.id = childView.constructor.name;
    const navList = new NavList({
        id: childView.id,
        sections: [],
        links: [
            {
                path: '/' + childView.id,
                name: childView.id
            }
        ]
    });
    if (parentView) {
        view = await parentView.getListData(...query);
        view.sections.push(navList);
        view.children.push(childView);
    }
    else {
        if (id) {
            GlobalView.mainLayout.sections.forEach((view) => {
                if (isType(view, NavList) && view.id === id) {
                    view.links.push({
                        path: '/' + childView.id,
                        name: childView.id
                    });
                }
            });
            GlobalView.mainLayout.children.push(childView);
        }
        else {
            GlobalView.mainLayout.sections.push(navList);
            GlobalView.mainLayout.children.push(childView);
        }
    }
    console.log("GlobalView: ", GlobalView);
}
