<template>
  <QCard :class="view.class" :id="view.id" v-if="view.card">
    <QImg v-if="view.overlay" :src="view.overlay" style="max-width: 30em; max-height: 50em">
      <ESection :view="view"></ESection>
    </QImg>
    <!--EImage v-if="view.overlay" :image="view.overlay"></EImage-->
    <template v-else>
      <QCardSection>
        <ESection :view="view"></ESection>
        <QCardActions>
          <EAction :action="action" v-for="action in view.actions"></EAction>
        </QCardActions>
      </QCardSection>
    </template>
  </QCard>
  <template v-else>
    <ESection :view="view"></ESection>
  </template>
</template>

<script lang="ts">
import { View, NavList } from "../utils/DataTypes";
import { Menu, Slides } from "../utils/DataTypes";
import ESection from "./ESection.vue";
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
  name: "EView",
  data() {
    return {
      Slides,
      navViews,
      menu,
      show: true,
      isType,
      View,
      /*columnNumber: 12 / (this.view.columns ?? 1),
      theViewport: this.view.viewport + '-'

      review,
      widgets,
      menuList,
      views,
      dataList,
      formList,
      components,
      vComponents*/
    }
  },
  components: { ESection },

  props: {
    view: {
      required: true,
      type: Object as () => View,
    },
    /*hello: {
      required: true,
      type: String,
    },*/
    dynamicProps: {
      type: null
    }
  },
  methods: {
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
