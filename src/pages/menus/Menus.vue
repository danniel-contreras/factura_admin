<template>
  <Layout title="Listado de menus">
    <button
      @click="modal = !modal"
      type="button"
      class="w-10 h-10 rounded-full cursor-pointer bg-blue-600 float-right"
    >
      <oh-vue-icon class="text-white" name="fa-plus"></oh-vue-icon>
    </button>
    <div class="w-full px-4 pt-16">
      <div class="grid grid-cols-6 p-2 bg-gray-800 rounded">
        <p class="text-white font-semibold text-sm">No.</p>
        <p class="text-white font-semibold text-sm">Usuario</p>
        <p class="text-white font-semibold text-sm">Fecha creacion</p>
        <p class="text-white font-semibold text-sm">Fecha Actualizacion</p>
        <p class="text-white font-semibold text-sm">Acciones</p>
        <p></p>
      </div>
      <ListMenus />
    </div>
    <Modal
      size="80vw"
      title="Agregar menu"
      :is-open="modal"
      @close-modal="modal = !modal"
    >
      <div class="w-full px-10 min-h-[40vh] max-h-[80vh] overflow-y-auto">
        <div class="flex flex-col">
          <label class="mt-2 text-sm font-semibold text-gray-600"
            >Selecciona el usuario</label
          >
          <div class="h-auto w-full">
            <Combobox v-model="selected">
              <div class="relative mt-1">
                <div
                  class="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
                >
                  <ComboboxInput
                    class="w-full border p-3 pr-10 text-sm text-gray-900 outline-none"
                    :displayValue="() => selected?.userNames + ` ` + selected?.lastNames"
                    @change="filter(String($event.target.value))"
                  />
                  <ComboboxButton
                    class="absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <oh-vue-icon name="bi-chevron-expand" scale="1.25"></oh-vue-icon>
                  </ComboboxButton>
                </div>
                <TransitionRoot
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <ComboboxOptions
                    class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    <div
                      v-if="users.length === 0"
                      class="relative cursor-default select-none py-2 px-4 text-gray-700"
                    >
                      No hay resultados que coincidan.
                    </div>

                    <ComboboxOption
                      v-for="person in users"
                      as="template"
                      :key="person.idUser"
                      :value="person"
                      v-slot="{ selected, active }"
                    >
                      <li
                        class="relative cursor-default select-none py-2 pl-10 pr-4"
                        :class="{
                          'bg-teal-600 text-white': active,
                          'text-gray-900': !active,
                        }"
                      >
                        <span
                          class="block truncate"
                          :class="{ 'font-medium': selected, 'font-normal': !selected }"
                        >
                          {{ person.userNames + " " + person.lastNames }}
                        </span>
                        <span
                          v-if="selected"
                          class="absolute inset-y-0 left-0 flex items-center pl-3"
                          :class="{ 'text-white': active, 'text-teal-600': !active }"
                        >
                          <oh-vue-icon name="oi-check" />
                        </span>
                      </li>
                    </ComboboxOption>
                  </ComboboxOptions>
                </TransitionRoot>
              </div>
            </Combobox>
          </div>
        </div>
        <div class="w-[50vw] flex flex-col mt-4">
          <p class="text-lg font-semibold">Opciones del menu</p>
          <div class="mt-3">
            <div class="grid grid-cols-4 bg-gray-900 p-3 rounded-t-lg gap-5">
              <p class="text-sm text-gray-50 font-semibold">Nombre de la opcion</p>
              <p class="text-sm text-gray-50 font-semibold">Icono de la opcion</p>
              <p class="text-sm text-gray-50 font-semibold">Ruta de la opcion</p>
              <p class="text-sm text-gray-50 font-semibold">Acciones</p>
            </div>
            <div
              class="py-1 border rounded-b-lg"
              v-for="(op, index) in options"
              :key="index"
            >
              <div class="grid grid-cols-4 p-3 gap-5">
                <p>{{ op.optionName }}</p>
                <p>
                  <oh-vue-icon :name="op.optionIcon" />
                </p>
                <p>{{ op.path }}</p>
                <p>
                  <input
                    :value="op"
                    type="checkbox"
                    v-model="selected_options"
                    class="w-5 h-5"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full">
          <button
            @click="saveMenu"
            class="bg-blue-600 p-3 rounded-full float-right px-16 mt-4 text-white font-semibold text-sm"
          >
            Guardar menu
          </button>
        </div>
      </div>
    </Modal>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from "../../components/Global/Layout.vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import OhVueIcon from "../../plugins/vue-icons";
import Modal from "../../components/Global/Modal.vue";
import { ref, onMounted } from "vue";
import { UseUserStore } from "../../store/user.store";
import { storeToRefs } from "pinia";
import { UserI } from "../../types/user.types";
import { UsePagesStore } from "../../store/pages.store";
import { toast } from "vue3-toastify";
import { UseMenusStore } from "../../store/menus.store";

import { UseOptionsStore } from "../../store/options.store";
import { Option } from "../../types/options.types";
import ListMenus from "../../components/Menus/ListMenus.vue";

const modal = ref(false);

const selected_options = ref([] as Option[]);

const { FindUser } = UseUserStore();
const { users } = storeToRefs(UseUserStore());

const { GetOptions } = UseOptionsStore();
const { options } = storeToRefs(UseOptionsStore());

const { SaveMenu, GetMenus } = UseMenusStore();

let selected = ref<UserI>();

const filter = async (name: string) => {
  await FindUser(name);
};

const saveMenu = async () => {
  if (!selected.value) {
    toast.warn("Debes seleccinar el usuario");
    return;
  }
  await SaveMenu(
    selected.value.idUser,
    selected_options.value.map((so) => so.idOption)
  );
};

onMounted(async () => {
  await FindUser("");
  await GetMenus();
  await GetOptions();
});
</script>
