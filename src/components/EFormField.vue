<template>
    <div>
        <QSelect
            :label="field.label?.text"
            v-bind="field.props"
            v-model="field.model"
            :options="field.options"
            :use_input="field.useInput"
            v-if="field.options"
            :ref="field.name"
            >

            <template v-slot:option="scope">
                <q-item
                v-if="!scope.opt.children"
                clickable
                v-ripple
                v-close-popup
                    @click="() => {
                    field.name = scope.opt.meta
                    field.label = scope.opt.label
                }"
                :class="{ 'bg-light-blue-1': field.name === scope.opt.label }"
                >
                <q-item-section>
                    <q-item-label v-html="scope.opt.label" class="q-ml-md" ></q-item-label>
                </q-item-section>
                <!--q-item-section>
                    <q-input class="q-ml-md" :type="scope.opt.inputType" v-model="scope.opt.label"></q-input>
                </q-item-section-->
                </q-item>
                <q-expansion-item v-else="scope.opt.children"
                expand-separator
                group="somegroup"
                :default-opened="hasChild(scope, field.name)"
                    header-class="text-weight-bold"
                :label="scope.opt.label"
                >
                <template v-for="child in scope.opt.children"
                :key="child.id">
                    <q-item
                    clickable
                    v-ripple
                    v-close-popup
                    v-on="child.events"
                    @click="() => {
                        //filledForm[dialogue.name] = child.id || child.label
                        field.name = child.meta
                        field.label = child.label
                    }"
                    :class="{ 'bg-light-blue-1': field.name === child.label }"
                    >
                    <q-item-section>
                        <q-item-label v-html="child.label" class="q-ml-md" ></q-item-label>
                    </q-item-section>
                    </q-item>
                </template>
                </q-expansion-item>
            </template>

        </QSelect>

        <template 
        v-else-if="field.inputType">
        <QInput
            type="datetime-local"
            :label="field.label?.text"
            v-model="field.model"
            outlined
            :ref="field.name"
            v-if="field.inputType === 'schedule'"
            v-bind="field.props"
            @update:model-value="handleInput(field.inputType, field.name)"
        ></QInput>
        <QInput
            :label="field.label?.text"
            :type="field.inputType"
            v-model="field.model"
            v-bind="field.props"
            @update:model-value="handleInput(field.inputType, field.name)"
            outlined
            :ref="field.name"
            v-else
        ></QInput>
        </template>
    </div>
</template>

<script setup lang="ts">
import { FormField, InputType } from '../utils/DataTypes';

const props = defineProps({
    field: {
        type: Object as () => FormField,
        required: true
    }
})

/*const label = () => {
    if (typeof props.field.label === 'string') {
        return props.field.label
    }
    else return props.field.label.;
}*/

const hasChild = (scope: any, name: string) => {
    console.log('SCOPE: ', scope.opt)
    return scope.opt.children.some((c: { label: string; }) => c.label === props.field.name)
}

const handleInput = (type: InputType, value: string) => {
    //useData().set(type, value)
    console.log('FILLED_FORM')
}
</script>

<style scoped>
div {
    margin: 10px;
}

label {
    font-weight: bold;
}

input {
    margin-left: 5px;
}

p {
    margin-top: 10px;
    color: #555;
}
</style>