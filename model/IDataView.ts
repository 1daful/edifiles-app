import { PageView } from "../src/utils/DataTypes"

export interface IDataView{
    id: any
    create?(data?: any): Promise<PageView>
    getListData(query?: any): Promise<PageView>
    getSingleData?(id: string ): Promise<PageView>
    singleDataItem?: Function
    listDataItems?: Function,
    newDataItem?: Function
}