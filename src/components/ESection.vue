<template class="row">
    <!--div :key="view.id" :class="`col-${view.size} ${view.viewport}`" v-if="view.layout === 'Grid' && show">
    <div :key="view.id">
    <template :key="view.id" class="col-md" v-if="view.layout === 'Grid'">
      <h4 v-if="view.heading">{{ view.heading }}</h4>
      <slot name="heading"></slot>
    </div-->
    <div class="row">
      <div class="q-pa-md" v-if="view.horizontalScroll">
          <q-scroll-area style="height: 230px">
            <div class="row" style="flex-wrap: nowrap">
              <div v-for="(section, idx) in view.sections" class="q-pa-sm q-ma-sm">
                <EComponent :item="section" :key="idx"></EComponent>
              </div>
            </div>
          </q-scroll-area>
        </div>
      <template v-else>
        <div :class="`col-${theViewport}${columnNumber}`" v-for="item in view.sections">
          <EComponent :item="item"></EComponent>
        </div>
      </template>
    </div>
</template>

<script lang="ts">
import { View, NavList, Image } from "../utils/DataTypes";
import { Menu, Slides } from "../utils/DataTypes";
import EComponent from "./EComponent.vue";
import { defineComponent } from "vue";
import { isType } from "../utils/types";

//let topMenus: NavLink[] = []
//let bottomMenus: NavLink[] = []
//let leftMenus: NavLink[] = []
//let rightMenus: NavLink[] = []

/*let review = new View({
  id: '',
  layout: 'Grid',
  navType: 'center',
  sections: [],
  size: 'col-8'})*/

//let widgets = Layout
let navViews: View[] = []

const menuList: NavList[] = []

const menu = new Menu()

//const views: IView[] = []

//const dataList: DataType[] = []

//const formList: FormList[] = []

//const components: Component[] = []

//const vComponents: VComponent[] = []

export default defineComponent({
  name: "ESection",
  data() {
    return {
      Slides,
      navViews,
      menu,
      show: true,
      isType,
      View,
      columnNumber: 12 / (this.view.columnNumber ?? 1),
      theViewport: this.view.viewport + '-'

      /*review,
      widgets,
      menuList,
      views,
      dataList,
      formList,
      components,
      vComponents*/
    }
  },
  components: { EComponent },

  props: {
    /*view: {
      required: true,
      type: Object as () => View,
    },*/
  view: {
    type: Object as () => View,
    required: true
  },
    dynamicProps: {
      type: null
    }
  },
  methods: {
    image(image: Image) {
      if (typeof image === 'object') {
        return {
          alt: image.alt,
          src: image.src,
          caption: image.caption,
          overlay: image.overlay
        }
      }
      
      else {
        return { image }
      }
    }
    /*processMenus(section: TabView) {
      /*const extractlink = (section: Nav): NavLink => ({
        path: section.id,
        name: section.id,
        params: {
            type: useRoute().params.type,
            categories: useRoute().params.categories
        }
      });
          topMenus.push(section);
          else if (section.navType === 'left') {
            leftMenus.push(extractlink(section));
          }
          else if (section.navType === 'right') {
            rightMenus.push(extractlink(section));
          }
          else if (section.navType === 'bottom') {
            bottomMenus.push(extractlink(section));
          }
      return { rightMenus, leftMenus, bottomMenus, topMenus };
    },*/

    /*processView() {
      this.view.sections.forEach(section => {
        if(isType(section, TabView)) {
          //const widget = getWidgetInstance(section.navType)
          if(section.navType === 'bottom' || section.navType === 'center' || section.navType === 'left' || section.navType === 'right' || section.navType === 'top') {
              this.widgets[section.navType].sections.push(section)
              return widgets
          }
          else {
              useWidgets().get(section.navType)
          }
        }
        if (isType(section, TabView) && section.navType !== 'center') {
          this.navViews.push(section)
        }
        /*else {
          this.review.sections.push(section)
        }
        
      });
    },*/
    /*processTabView(tabview: TabView) {
      this.widgets[tabview.navType].sections.push(tabview)
    }*/
  },

  async beforeMount() {
      /*if (this.view.viewGuard && typeof this.view.viewGuard.event === 'function') {
        this.show = await this.view.viewGuard.event(this.view.viewGuard.args)
      }*/
    //this.processView()
    this.$emit('emitted', this.navViews)
    /*this.view.sections.forEach(element => {
      if (isType(element, NavList)) {
        this.menuList.push(element)
      }
      else if (isType(element, View || isType(element, PageView))) {
        this.views.push(element)
      }
      else if (isType(element, DataType)) {
        this.dataList.push(element)
      }
      else if (isType(element, FormType)) {
        this.formList.push(element)
      }
      else if (isVComponent(element)) {
        this.vComponents.push(element)
      }
      else if (isComponent(element)) {
        this.components.push(element)
      }
    });*/
  },
});
</script>
<style scoped>

</style>
