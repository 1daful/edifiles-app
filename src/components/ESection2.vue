<template>
    <EComponent v-for="item in section.items" :key="item.id" :item="item"></EComponent>
</template>

<script setup lang="ts">
import ENav from "./ENav.vue";
import { Section, View, 
  NavList, Action, ActionList,
DataTable, DataGraph, Image, Label,
PageView,
Filters} from "../utils/DataTypes";
import { Menu } from "../utils/DataTypes";
import EAction from "./EAction.vue";
import EActionBar from "./EActionBar.vue";
import EFilters from "./EFilters.vue";
import EGraph from "./EGraph.vue";
import ETable from "./ETable.vue";
import EImage from "./EImage.vue";
import { isType, isLabel, isImage } from "../utils/types";

defineProps({
  section: {
    type: Object as () => Section,
    required: true
  }
})

const menu = new Menu()

</script>
<style scoped>

</style>
