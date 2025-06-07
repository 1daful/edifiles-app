import { QueryFilter, QueryModifier, QueryType } from "@edifiles/services";
import { Client } from "@edifiles/services/dist/module/clients/Client";
import { GlobalView } from "../../config/edifiles.config";
import { foreignColumns } from "@edifiles/services/dist/module/utility/Query";
import { dbClient } from "../../config/model";
import { IDataView } from "../../model/IDataView";
import { ViewSection, NavList, VComponent, Content } from "./DataTypes";
import { QuestionType, FormType, PageView, isType, isContent } from "./types";

 export async function postData(query: string | QueryType, questionsData: QuestionType | FormType) {
    const view: PageView = new PageView({
        id: "",
        layout: "Grid",
        sections: [questionsData],
        children: []
    })
    return view
}
export async function getData(query: string | QueryModifier | QueryFilter | QueryType | QueryType[], callback: (data: any, ...args: [])=> ViewSection, client?: Client) {
    const useClient = client || dbClient
    let data = await useClient.get(query)
    let section: ViewSection[] = []
    if (data) {
        section = data.data?.map((dat: IDataView)=>{
            return callback(dat)
        })
    }
    /*const view: PageView = new PageView({
        id: "services",
        layout: "Grid",
        sections: [section],
        children: []
    })*/
    return section
}

export async function geViewData(model: Record<string, any>, client?: Client) {
    const useClient = client || dbClient
    const query = getQuery(model)
    let data = await useClient.get(query)
    return resolveViewData(model, data)
}

function getQuery(model: Record<string, any>): QueryType {
    let query: QueryType = {
        name: "",
        data: undefined,
        filters: [],
        modifiers: [],
        columns: []
    }   
  Object.entries(model).forEach(([colOrTable, valueOrColumns]) => {
    //const fullKey = parentKey ? `${parentKey}.${key}` : key;
    //if (typeof valueOrColumns === 'object' && valueOrColumns !== null) {
    if (!(valueOrColumns instanceof VComponent) && valueOrColumns !== null) {
        query.columns?.push(foreignColumns(colOrTable, Object.keys(valueOrColumns)))
      //console.log(`Object: ${fullKey}`);
      /*Object.entries(valueOrColumns).forEach(([col, val]) => {
      })*/
      //iterateEntries(value, fullKey); // Recursive call for nested objects
    } else {
        query.columns?.push(colOrTable)
    }

  });
    return query 
}


let viewContent: Record<string, any>

function resolveViewData(model: Record<string, any>, data: Record<string, any>) {
    viewContent = model 
    Object.entries(model).forEach(([key, value]) => {
        if(isContent(value)) {
            viewContent[key]['label'] = data[key]
        }
        else if(value === '') {
            viewContent[key]['label'] = data[key]
        }
        else {
            resolveViewData(model[key], data[key])
        }
    });
    return viewContent
}

function getDataQuery(model: Record<string, any>, options: {filters: QueryFilter[], modifiers: QueryModifier[]}) {
    let query: QueryType = {
        name: "",
        data: undefined,
        filters: [],
        modifiers: [],
        columns: []
    } 
    Object.keys(model).forEach((col) => {
        query.columns?.push(col)
    });
    query.filters = options.filters
    query.modifiers = options.modifiers
    return query
}

/*function getContent<T>(ctor: new (...args: any[]) => T, contentObject: Content | string): T {
    if(content) {
        let content = new ctor(...args);
    }
}*/

export async function addModel <T extends IDataView> (clazz: new (...args: any[]) => T, parentView?: IDataView, id?: string, ...query: any) {
    let view
    const childView = new clazz();
    childView.id = childView.constructor.name
    const navList: NavList = new NavList({
        id: childView.id,
        sections: [],
        navType: 'xTab',
        links: [
            {
                path: '/' + childView.id,
                name: childView.id,
                label: childView.id
            }
        ]
    })

    if (parentView) {
        view = await parentView.getListData(...query)
        view.sections.push(navList)
        view.children.push(childView)
    }
    else {
        if (id) {
            GlobalView.mainLayout.sections.forEach((view) => {
                if(isType(view,NavList) && view.id === id) {view.links.push(
                    {
                        path: '/' + childView.id,
                        name: childView.id
                    })}
            })
            GlobalView.mainLayout.children.push(childView)
        }
        else {
            GlobalView.mainLayout.sections.push(navList)
            GlobalView.mainLayout.children.push(childView)
        }
    }
    console.log("GlobalView: ", GlobalView)
    //const view2 = await childView.getListData()
}
