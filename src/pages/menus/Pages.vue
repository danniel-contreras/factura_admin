<template>
  <Layout title="Listado de paginas">
    <div class="w-full h-full">
      <div class="w-full h-full">
        <button class="w-10 h-10 rounded-full cursor-pointer bg-blue-600 float-right">
          <oh-vue-icon class="text-white" name="fa-plus"></oh-vue-icon>
        </button>
        <Modal title="Agregar Pagina" :is-open="false">
          <div class="flex flex-col">
            <label class="text-sm text-gray-600 font-semibold">Nombre de la pagina</label>
            <input class="w-full border rounded p-3 text-xs" />
          </div>
          <div class="flex flex-col py-2">
            <label class="text-sm text-gray-600 font-semibold">Ruta de la pagina</label>
            <input class="w-full border rounded p-3 text-xs" />
          </div>
          <div class="flex flex-col py-2">
            <label class="text-sm text-gray-600 font-semibold"
              >Ruta de componente de la pagina</label
            >
            <input class="w-full border rounded p-3 text-xs" />
          </div>
          <!-- <p>Atributos meta</p>
          <div class="grid grid-cols-3 gap-3">
            <label class="text-xs font-semibold text-gray-600">Clave</label>
            <label class="text-xs font-semibold text-gray-600">Valor</label>
            <label class="text-xs font-semibold text-gray-600">Tipo</label>
            <input
              v-model="clave"
              class="border w-full p-2 text-xs rounded"
              type="text"
            />
            <input
              v-model="valor"
              class="border w-full p-2 text-xs rounded"
              type="text"
            />
            <select v-model="type" class="border w-full p-2 text-xs rounded" type="text">
              <option v-for="t in types" :key="t" :value="t">{{ t }}</option>
            </select>
            <button
              class="bg-green-500 px-4 py-3 rounded text-sm font-semibold text-white"
              @click="crearObjeto"
            >
              Crear Objeto
            </button>
          </div>
          <div class="p-4 border rounded w-full shadow mt-4">
            <div class="grid grid-cols-2">
              <p class="text-sm font-semibold text-gray-500">Clave</p>
              <p class="text-sm font-semibold text-gray-500">Valor</p>
            </div>
            <div v-for="(valor, clave) in estado.meta" :key="clave">
              <div class="grid grid-cols-2">
                <p class="text-xs font-semibold py-1 text-gray-400">{{ clave }}</p>
                <p class="text-xs font-semibold py-1 text-gray-400">{{ valor }}</p>
              </div>
            </div>
          </div> -->
          <button
            class="bg-blue-600 text-white font-semibold text-sm rounded py-3 w-full mt-3"
          >
            Guardar
          </button>
        </Modal>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts" setup>
import Layout from "../../components/Global/Layout.vue";
import Modal from "../../components/Global/Modal.vue";
import OhVueIcon from "../../plugins/vue-icons";
import { reactive, ref } from "vue";

interface Estado {
  meta: { [key: string]: string | number | boolean | undefined };
}

const estado: Estado = reactive({
  meta: {},
});

const types = ["Texto", "Numero", "Booleano"];

const clave = ref<string>("");
const valor = ref<string | number | boolean>();
const type = ref<string>("Texto");

const crearObjeto = () => {
  if (type.value === "Numero" || !isNaN(Number(valor.value))) {
    valor.value = Number(valor.value);
  } else if (
    type.value === "Booleano" ||
    valor.value === "true" ||
    valor.value === "false"
  ) {
    valor.value = Boolean(valor.value);
  }
  estado.meta[clave.value] = valor.value;
  console.log("Objeto creado:", JSON.stringify(estado.meta));
  console.log("Objeto puro:", estado.meta);
};
</script>

<style lang="scss"></style>
