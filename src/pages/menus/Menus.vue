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
              <p class="text-sm text-gray-600 font-semibold">Este menu no tiene opciones agregadas</p>
            </div>
            <div v-else class="border">
              <div  class="w-full grid grid-cols-6 p-2 rounded-t bg-cyan-700">
                <p class="text-white text-sm font-semibold">No.</p>
                <p class="text-white text-sm font-semibold">Opcion</p>
                <p class="text-white text-sm font-semibold">Icono</p>
                <p class="text-white text-sm font-semibold">URL</p>
                <p class="text-white text-sm font-semibold">Pagina</p>
                <p class="text-white text-sm font-semibold">Opciones</p>
              </div>
             
              <div v-for="(op,i) in menu.options" :key="i" class="grid grid-cols-6 border-b p-2">
                <p class="text-gray-600 text-sm font-thin">{{i + 1}}</p>
                <p class="text-gray-600 text-sm font-thin">{{op.optionName}}</p>
                <p class="text-gray-600 text-sm font-thin">
                  <oh-vue-icon :name="op.optionIcon"></oh-vue-icon>
                </p>
                <p class="text-gray-600 text-sm font-thin">{{op.page.pagePath}}</p>
                <p class="text-gray-600 text-sm font-thin">{{op.page.pageName}}</p>
                <p class="text-gray-600 text-sm font-thin"></p>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
    <Modal
      size="80vw"
      title="Agregar menu"
      :is-open="modal"
      @close-modal="modal = !modal"
    >
      <div class="w-full px-10 min-h-[40vh] max-h-[80vh] overflow-y-auto">
        <div class="flex">
          <label class="mt-2 text-sm font-semibold text-gray-600">Usuario</label>
          <div class="h-auto w-full ml-3">
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
        <div class="w-full flex flex-col mt-4">
          <p class="text-lg font-semibold">Opciones del menu</p>
          <button
            @click="addInput"
            type="button"
            class="w-10 absolute right-5 h-10 rounded-full cursor-pointer bg-blue-600 float-right"
          >
            <oh-vue-icon class="text-white" name="fa-plus"></oh-vue-icon>
          </button>
          <div class="mt-3">
            <div class="grid grid-cols-3 gap-5">
              <p class="text-sm text-gray-600 font-semibold">Nombre de la opcion</p>
              <p class="text-sm text-gray-600 font-semibold">Icono de la opcion</p>
              <p class="text-sm text-gray-600 font-semibold">Pagina de la opcion</p>
            </div>
            <div class="py-1" v-for="(_, index) in options" :key="index">
              <div class="grid grid-cols-3 gap-5">
                <input
                  v-model="options[index].optionName"
                  placeholder="Escribe el nombre de la opcion"
                  class="w-full border p-3 shadow rounded outline-none"
                />
                <input
                  v-model="options[index].optionIcon"
                  placeholder="Escribe el icono de la opcion"
                  class="w-full border p-3 shadow rounded outline-none"
                />
                <div class="w-full flex">
                  <select
                    v-model="options[index].idPage"
                    class="w-full border p-3 shadow rounded outline-none"
                  >
                    <option value="0" disabled>--Selecciona la pagina--</option>
                    <option
                      v-for="(page, index) in pages"
                      :value="page.idPage"
                      :key="index"
                    >
                      {{ page.pageName }}
                    </option>
                  </select>
                  <button @click="removeItem(index)" class="px-3">
                    <oh-vue-icon
                      scale="1.25"
                      class="text-gray-600"
                      name="fa-times"
                    ></oh-vue-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          @click="saveMenu"
          class="bg-blue-600 p-4 rounded px-10 mt-2 text-white font-semibold text-sm"
        >
          Guardar menu
        </button>
      </div>
    </Modal>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from "../../components/Global/Layout.vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
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
import { format } from "date-fns";
import { es } from "date-fns/locale";

const modal = ref(false);

interface OptionI {
  optionName: string;
  optionIcon: string;
  idPage: number;
}

const { FindUser } = UseUserStore();
const { users } = storeToRefs(UseUserStore());

const { GetAllPages } = UsePagesStore();
const { pages } = storeToRefs(UsePagesStore());

const { SaveMenu, GetMenus } = UseMenusStore();
const { menus } = storeToRefs(UseMenusStore());

const options = ref<OptionI[]>([
  {
    optionName: "",
    optionIcon: "",
    idPage: 0,
  },
  {
    optionName: "",
    optionIcon: "",
    idPage: 0,
  },
  {
    optionName: "",
    optionIcon: "",
    idPage: 0,
  },
]);

const addInput = () => {
  options.value.push({ optionName: "", optionIcon: "", idPage: 0 });
};
const removeItem = (i: number) => {
  if (i > -1) {
    // only splice array when item is found
    options.value.splice(i, 1); // 2nd parameter means remove one item only
  }
};

let selected = ref<UserI>();

const filter = async (name: string) => {
  await FindUser(name);
};

const saveMenu = async () => {
  if (!selected.value) {
    toast.warn("Debes seleccinar el usuario");
    return;
  }
  await SaveMenu(selected.value.idUser, options.value);
};

const formatDate = (date: string) => {
  return format(new Date(date), "EEEE, d MMMM yyyy", { locale: es });
};

onMounted(async () => {
  await FindUser("");
  await GetAllPages();
  await GetMenus();
});
</script>
