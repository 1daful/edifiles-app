<template>
    <slot name="before"></slot>
    <QList :bordered="menu.listStyle?.bordered"
      :dense="menu.listStyle?.dense"
      :dark="menu.listStyle?.dark">
      <ENav v-if="isType(item, NavList)" :menuList="item" :navType="item.navType"></ENav>
    </QList>
    <!--EDataView v-if="isDataType(section)" :data="section" :key="section.id"></EDataView>
    <template v-if="isDataList(section)">
      <EDataView :data="data" :key="data.id" v-for="data in section.items"></EDataView>
    </template-->
    <!--EDataView v-if="isType(section, QuestionType)" :form="section" :key="section.index"></EDataView>
    <EDataView v-if="isType(section, FormType)" :formsSteppers="section" :key="section.id"></EDataView>
    <EDataView v-if="isType(section, Slides)" :slide="section"></EDataView-->
    <div v-if="isIcon(item)">
      <QIcon :name="item.icon"></QIcon> {{ item.icon }}
    </div>
    <div v-if="isLabelType(item)">
      {{ item }}
    </div>
    <div v-if="typeof item === 'string'">
      {{ item }}
    </div>
    <component v-if="isComponentType(item)" :is="item"></component>
    <EImage v-if="isImage(item)" :image="item"></EImage>
    <EFormField v-if="isType(item, FormField)" :field="item"></EFormField>
    <EFilters v-if="isType(item, Filters)" :data="item"></EFilters>
    <EAction v-if="isType(item, Action)" :action="item"></EAction>
    <EActionBar v-if="isType(item, ActionList)" :actions="item"></EActionBar>
    <EGraph v-if="isType(item, DataGraph)" :graphData="item"></EGraph>
    <ETable v-if="isType(item, DataTable)" :data="item"></ETable>
    <EView v-if="isType(item, View) || isType(item, PageView)" :view="item" :key="item.id"></EView>
    <!--slot name="after"></slot-->
    <!--<ENav
    navType="y-tab"
    :menuList="processMenus(view).yMenus"></ENav>
    <RouterView :key="$route.fullPath"></RouterView>-->
</template>

<script setup lang="ts">
import ENav from "./ENav.vue";
import { ViewSection, View, 
  NavList, Action, ActionList,
DataTable, DataGraph,
PageView, FormField,
Filters} from "../utils/DataTypes";
import { Menu } from "../utils/DataTypes";
import EAction from "./EAction.vue";
import EActionBar from "./EActionBar.vue";
import EFilters from "./EFilters.vue";
import EGraph from "./EGraph.vue";
import ETable from "./ETable.vue";
import EImage from "./EImage.vue";
import EFormField from "./EFormField.vue";
import { isType, isLabelType, isIcon, isImage, isComponentType } from "../utils/types";

defineProps({
  item: {
    type: Object as () => ViewSection,
    required: true
  }
})

const menu = new Menu()

</script>
<style scoped>

</style>
