<template>
    <div>
      <ELayout :pageView="pageView"></ELayout>
    </div>
    <RouterView v-if="hasChild()"></RouterView>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  import ELayout from "../components/ELayout.vue";
  import { IDataView } from '../../model/IDataView';
  import { GlobalView } from '../../config/edifiles.config';
  import { PageView } from '../utils/DataTypes';
  import { onBeforeMount, ref } from "vue";
  
  //export default defineComponent({
    //data() {
      let dataView: IDataView | PageView | undefined
      const route = useRoute();
      const layout = ref({})
  
      let pageView: PageView
     
  
      const id: string | number = route.params.id as string;
      const type: string = route.params.type as string;
      const categories: string[] = route.params.categories as string[];
      const filters = route.query.filters
      let category

      const getCategory = ()=> {
        if (Array.isArray(categories))
        return categories?.[categories.length - 1]
        else return categories
      }

    const hasChild = () => {
      return route.matched.length > 1;
    }
      async function processView () {
        /*pageView = GlobalView.mainLayout?.children?.find((child) => {
            return child.id === 'home';
          }) || pageView*/

        pageView = GlobalView.routePages[route.path]?.model(filters) || pageView;

        category = getCategory()
          //header.sections = pageView.header || []
          //footer.sections = pageView.footer || []
          //left.sections = pageView.left || []
          //right.sections = pageView.right || []
      }
      /*async function processData() {
        view = await processView()
        //layout.value = processMenus(view)
      }*/
    
    onBeforeMount(()=> {
      processView()
      //console.log('LAYOUT ', layout)
    })
  </script>