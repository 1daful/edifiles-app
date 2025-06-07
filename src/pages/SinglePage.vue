<template>
    <div v-for="(view, key) in layout">
      <Suspense>
      <EView :view="view" :key="view.id"></EView>
      </Suspense>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  import EView from "../components/EView.vue";
  import { IDataView } from '../../model/IDataView';
  import { GlobalView } from '../../config/edifiles.config';
  import { NavList, PageView, ActionList } from '../utils/DataTypes';
  import { defineComponent, onBeforeMount, onMounted, ref, shallowRef } from "vue";
  import { View } from '../utils/DataTypes';
  
  //export default defineComponent({
    //data() {
      let dataView: IDataView | PageView | undefined
      const route = useRoute();
      const layout = ref({})
  
      let view: View = new View({
        id: '',
        sections: [],
      })
  
      const pageView: PageView = new PageView({
        header: [],
        footer: [],
        right:[],
        left: [],
        center: view,
        sections: [],
        children: []
      });
  
      const id: string | number = route.params.id as string;
      const type: string = route.params.type as string;
      const categories = route.params.categories;
      const filters = route.query.filters
      const category = ()=> {
        if (Array.isArray(categories))
        return categories?.[categories.length - 1]
        else return categories
      }
      console.log('Query ', route)
  
      async function processView () {
        let vieew
        console.log('Type ', type)
        console.log('categories ', categories)
        console.log('id ', id)
        
          let section
          dataView = GlobalView.mainLayout.children.find((child) => {
           
            return child.id === type;
          });
        if (!categories && !id) {
            console.log('TYPE ', type)
            vieew = await dataView?.getListData(filters);
            console.log('Type View ', vieew)
          } 
        else if (categories /*&& !this.id*/) {
            /*if (this.categories[0] === 'create') {
            section = await this.dataView?.getCreateData(this.filters);
              this.view = section
            }*/
  
          /*if (this.categories || this.id) {
            console.log('This ID ', this.id)
            section = await this.dataView?.getSingleData(this.id)
            this.view = view
            console.log('ID ', this.view)
          }*/
          if (vie()) {
            console.log('VIE ', vie())
            vieew = await (dataView[vie().toString()]).call(dataView, filters)
            console.log("View: ", vieew)
            
          }
            else {
            vieew = await dataView?.getListData(filters);
            }
          } 
          else if (id) {
            console.log('This ID ', id)
            vieew = await dataView?.getSingleData(id)
            console.log('ID ', vieew)
          }
        
        else {
          vieew = GlobalView.mainLayout.children.find((child) => {
            return child.id === 'home';
          }) as PageView;
        }
        return vieew
      }
      async function processData() {
        view = await processView()
        layout.value = processMenus(view)
      }
    
    onBeforeMount(()=> {
      processData()
      console.log('LAYOUT ', layout)
    })
  </script>