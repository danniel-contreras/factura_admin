<template>
  <div class="max-w-screen w-screen overflow-hidden">
    <span
      class="absolute text-gray-800 text-4xl top-5 left-4 cursor-pointer"
      @click="toggle_sidebar()"
    >
      <oh-vue-icon name="hi-solid-menu"></oh-vue-icon>
    </span>
    <div
      ref="sidebar"
      class="sidebar fixed hidden lg:block top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900"
    >
      <div class="text-gray-100 text-xl">
        <div class="p-2.5 mt-1 flex items-center">
          <i class="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
          <h1 class="font-bold text-gray-200 text-[15px] ml-3">Logo here</h1>
          <span class="ml-28 flex lg:hidden">
            <oh-vue-icon name="fa-times" @click="toggle_sidebar()"></oh-vue-icon>
          </span>
        </div>
        <div class="my-2 bg-gray-600 h-[1px]"></div>
      </div>
      <router-link
        to="/"
        active-class="bg-blue-500"
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <oh-vue-icon class="w-5" name="io-home"></oh-vue-icon>
        <span class="text-[15px] ml-4 text-gray-200 font-bold">Inicio</span>
      </router-link>
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <oh-vue-icon class="w-5" name="fa-users-cog" scale="1.25"></oh-vue-icon>
        <span class="text-[15px] ml-4 text-gray-200 font-bold">Usuarios</span>
      </div>
      <div class="my-4 bg-gray-600 h-[1px]"></div>
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        @click="toggle_dropdown()"
      >
        <oh-vue-icon class="w-5" name="gi-world"></oh-vue-icon>
        <div class="flex justify-between w-full items-center">
          <span class="text-[15px] ml-4 text-gray-200 font-bold">Navegacion</span>
          <span class="text-sm rotate-180" ref="dropdownicon">
            <oh-vue-icon name="fa-chevron-down"></oh-vue-icon>
          </span>
        </div>
      </div>
      <div
        ref="dropdown"
        class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
        id="submenu"
      >
        <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">Permisos</h1>
        <router-link
          to="/pages"
          active-class="bg-blue-600"
          class="cursor-pointer p-2 hover:bg-blue-600 flex w-full rounded-md mt-1"
          >Paginas</router-link
        >
        <h1 class="cursor-pointer p-2 hover:bg-blue-600 rounded-md mt-1">Menus</h1>
      </div>
      <div
        class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
      >
        <oh-vue-icon class="w-5" name="hi-logout"></oh-vue-icon>
        <span class="text-[15px] ml-4 text-gray-200 font-bold">Cerrar Sesion</span>
      </div>
    </div>
    <div class="h-screen lg:pl-[300px] w-screen">
      <div class="p-10">
        <p class="text-2xl font-thin">{{ title }}</p>
        <div class="w-full h-full">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from "vue";
import OhVueIcon from "../../plugins/vue-icons";

interface Props {
  title: string;
}

const { title } = defineProps<Props>();

const dropdown = ref<HTMLDivElement>();
const sidebar = ref<HTMLDivElement>();
const dropdownicon = ref<HTMLSpanElement>();

const toggle_dropdown = () => {
  if (dropdown.value && dropdownicon.value) {
    dropdown.value.classList.toggle("hidden");
    dropdownicon.value.classList.toggle("rotate-0");
  }
};

const toggle_sidebar = () => {
  if (sidebar.value) {
    sidebar.value.classList.toggle("hidden");
  }
};

watchEffect(() => {
  if (window.screen.width < 1024) {
    console.log("one time");
  }
});

onMounted(() => {
  toggle_dropdown();
});
</script>

<style lang="scss"></style>
