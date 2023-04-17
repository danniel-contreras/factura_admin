<template>
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
                      Nombre de la opcion
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                    >
                      Icono de la opcion
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                    >
                      Ruta de la opcion
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(pag,index) in options" :key="pag.idOption">
                    <td class="px-6 py-2 whitespace-nowrap">
                      <td class="px-6 py-2 whitespace-nowrap">
                        <div class="text-sm text-gray-900">{{index + 1}}</div>
                      </td>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{pag.optionName}}</div>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="text-sm text-gray-900">
                        <oh-vue-icon scale="2" class="text-gray-600" :name="pag.optionIcon"></oh-vue-icon>
                      </div>
                    </td>
                    <td class="px-6 py-2 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{pag.path}}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
</template>

<script lang="ts" setup>
import { Option } from "../../types/options.types";

interface Props {
  options: Option[];
}

const { options } = defineProps<Props>();
</script>
