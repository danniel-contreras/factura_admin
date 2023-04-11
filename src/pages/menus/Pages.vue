<template>
  <Layout title="Listado de paginas">
    <div class="w-full h-full flex flex-col">
      <div class="w-full h-full">
        <button
          type="button"
          @click="isOpen = !isOpen"
          class="w-10 h-10 rounded-full cursor-pointer bg-blue-600 float-right"
        >
          <oh-vue-icon class="text-white" name="fa-plus"></oh-vue-icon>
        </button>
        <Modal title="Agregar Pagina" @close-modal="isOpen = false" :is-open="isOpen">
          <AddPageForm @close-modal="isOpen = false" />
        </Modal>
      </div>
      <div class="flex flex-col mt-10">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                    >
                      Nombre de la pagina
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                    >
                      Path de la pagina
                    </th>
                    <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                  >
                   URL de la pagina
                  </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(pag,index) in pages" :key="pag.idPage">
                    <td class="px-6 py-2 whitespace-nowrap">
                      <td class="px-6 py-2 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{index + 1}}</div>
                      </td>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{pag.pageName}}</div>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{pag.pagePath}}</div>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{pag.pageURI}}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import Layout from "../../components/Global/Layout.vue";
import Modal from "../../components/Global/Modal.vue";
import AddPageForm from "../../components/Pages/AddPageForm.vue";
import OhVueIcon from "../../plugins/vue-icons";
import { UsePagesStore } from "../../store/pages.store";
import { ref, onMounted } from 'vue';

const isOpen = ref(false);

const { GetAllPages } = UsePagesStore();

const { pages } = storeToRefs(UsePagesStore());

onMounted(()=>{
  GetAllPages()
})
</script>

<style lang="scss"></style>
