<template>
  <div class="w-full rounded-t-2xl bg-white">
    <Disclosure v-for="(menu, index) in menus" :key="index" v-slot="{ open }">
      <DisclosureButton
        class="flex w-full justify-between rounded-t-lg bg-blue-100 px-4 py-2 mt-2 text-left text-sm font-medium text-purple-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
      >
        <div class="w-full grid grid-cols-6">
          <p>{{ index + 1 }}</p>
          <p>{{ menu.user.userNames + " " + menu.user.lastNames }}</p>
          <p>{{ formatDate(menu.createdAt) }}</p>
          <p>{{ formatDate(menu.updatedAt) }}</p>
          <div></div>
          <div>
            <button class="float-right">
              <oh-vue-icon
                scale="1"
                name="fa-chevron-down"
                :class="open ? 'rotate-180 transform' : ''"
                class="h-5 w-5 text-purple-500"
              />
            </button>
          </div>
        </div>
      </DisclosureButton>
      <DisclosurePanel class="px-12 pt-4 pb-2 text-sm text-gray-500 border rounded-b-lg">
        <div v-if="menu.options.length <= 0">
          <p class="text-sm text-gray-600 font-semibold">
            Este menu no tiene opciones agregadas
          </p>
        </div>
        <div v-else class="border">
          <div class="w-full grid grid-cols-5 p-2 rounded-t bg-cyan-700">
            <p class="text-white text-sm font-semibold">No.</p>
            <p class="text-white text-sm font-semibold">Opcion</p>
            <p class="text-white text-sm font-semibold">Icono</p>
            <p class="text-white text-sm font-semibold">URL</p>
            <p class="text-white text-sm font-semibold">Opciones</p>
          </div>

          <div
            v-for="(op, i) in menu.options"
            :key="i"
            class="grid grid-cols-5 border-b p-2"
          >
            <p class="text-gray-600 text-sm font-thin">{{ i + 1 }}</p>
            <p class="text-gray-600 text-sm font-thin">{{ op.option.optionName }}</p>
            <p class="text-gray-600 text-sm font-thin">
              <oh-vue-icon scale="1.5" :name="op.option.optionIcon"></oh-vue-icon>
            </p>
            <p class="text-gray-600 text-sm font-thin">{{ op.option.path }}</p>
            <p class="text-gray-600 text-sm font-thin"></p>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
    <Modal :is-open="showModal" title="Agregar Sub-Menu">
        <div class="w-[60vw]">

        </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { storeToRefs } from "pinia";
import { UseMenusStore } from "../../store/menus.store";
import { DisclosurePanel, Disclosure, DisclosureButton } from "@headlessui/vue";
import OhVueIcon from "../../plugins/vue-icons"
import { ref } from 'vue';
import Modal from "../Global/Modal.vue";

const { menus } = storeToRefs(UseMenusStore());

const showModal = ref(true)

const formatDate = (date: string) => {
  return format(new Date(date), "EEEE, d MMMM yyyy", { locale: es });
};
</script>

<style lang="scss"></style>
