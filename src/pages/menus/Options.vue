<template>
  <div>
    <Layout title="Opciones">
      <div class="flex flex-col">
        <div class="w-full">
          <button
            type="button"
            @click="isOpen = !isOpen"
            class="w-10 h-10 rounded-full cursor-pointer bg-blue-600 float-right"
          >
            <oh-vue-icon class="text-white" name="fa-plus"></oh-vue-icon>
          </button>
          <Modal title="Agregar Opcion" :is-open="isOpen" @close-modal="isOpen = !isOpen">
            <form
              class="w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw]"
              @submit="onSubmit"
            >
              <div class="w-full flex-col">
                <label class="text-sm font-semibold text-gray-600"
                  >Nombre de la opcion</label
                >
                <field
                  placeholder="Escribe el nombre"
                  name="optionName"
                  class="w-full border rounded p-3 text-sm"
                />
                <error-message
                  class="text-red-500 text-sm font-semibold mt-1"
                  name="optionName"
                ></error-message>
              </div>
              <div class="w-full flex-col mt-2">
                <label class="text-sm font-semibold text-gray-600"
                  >Icono de la opcion</label
                >
                <div class="flex">
                  <field
                    placeholder="Escribe el icono"
                    @change="icon = String($event.target.value)"
                    name="optionIcon"
                    class="w-full border rounded p-3 text-sm"
                  />
                  <oh-vue-icon :name="icon" class="ml-3 text-gray-600" scale="2" />
                </div>
                <error-message
                  class="text-red-500 text-sm font-semibold mt-1"
                  name="optionIcon"
                ></error-message>
                <!-- {{ icon }} -->
              </div>
              <div class="w-full flex-col mt-2">
                <label class="text-sm font-semibold text-gray-600"
                  >Ruta de la opcion</label
                >
                <field
                  placeholder="Escribe la ruta"
                  name="path"
                  class="w-full border rounded p-3 text-sm"
                />
                <error-message
                  class="text-red-500 text-sm font-semibold mt-1"
                  name="path"
                ></error-message>
              </div>
              <button
                type="submit"
                class="px-16 py-3 rounded mt-3 bg-blue-600 text-white text-sm font-semibold"
              >
                Guardar
              </button>
            </form>
          </Modal>
        </div>
        <ListOptions :options="options" />
      </div>
    </Layout>
  </div>
</template>

<script lang="ts" setup>
import Layout from "../../components/Global/Layout.vue";
import Modal from "../../components/Global/Modal.vue";
import OhVueIcon from "../../plugins/vue-icons";
import { ref, onMounted } from "vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import { OptionsI } from "../../types/options.types";
import { UseOptionsStore } from "../../store/options.store";
import { storeToRefs } from "pinia";
import ListOptions from "../../components/Options/ListOptions.vue";

const isOpen = ref(false);
const icon = ref("");

const { SaveOptions, GetOptions } = UseOptionsStore();

const { options } = storeToRefs(UseOptionsStore());

const validationSchema = yup.object().shape({
  optionName: yup.string().required("Debes escribir el nombre"),
  optionIcon: yup.string().required("Debes escribrir el icono"),
  path: yup.string().required("Debes escribir la ruta"),
});

const { handleSubmit } = useForm<OptionsI>({
  validationSchema,
});

const onSubmit = handleSubmit(async (values) => {
  await SaveOptions(values);
  isOpen.value = !isOpen.value;
});

onMounted(async () => {
  await GetOptions();
});
</script>

<style lang="scss"></style>
