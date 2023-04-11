<template>
  <form @submit="OnSubmit">
    <div class="flex flex-col">
      <label class="text-sm text-gray-600 font-semibold">Nombre de la pagina</label>
      <field
        name="pageName"
        placeholder="Escribe el nombre de la pagina"
        class="w-full border rounded p-3 text-xs"
      />
      <ErrorMessage
        class="text-red-500 text-sm font-semibold"
        name="pagePath"
      ></ErrorMessage>
    </div>
    <div class="flex flex-col py-2">
      <label class="text-sm text-gray-600 font-semibold">Ruta de la pagina</label>
      <field
        name="pagePath"
        placeholder="Escribe la ruta de pagina"
        class="w-full border rounded p-3 text-xs"
      />
      <ErrorMessage
        class="text-red-500 text-sm font-semibold"
        name="pagePath"
      ></ErrorMessage>
    </div>
    <div class="flex flex-col py-2">
      <label class="text-sm text-gray-600 font-semibold"
        >Ruta de componente de la pagina</label
      >
      <field
        name="pageURI"
        placeholder="Escribe la ruta de el componente de la pagina"
        class="w-full border rounded p-3 text-xs"
      />
      <ErrorMessage
        class="text-red-500 text-sm font-semibold"
        name="pagePath"
      ></ErrorMessage>
    </div>
    <div class="py-2">
      <label class="inline-flex items-center">
        <input
          v-model="require_auth"
          type="checkbox"
          class="form-checkbox h-5 w-5 text-indigo-600"
        />
        <span class="ml-2 text-gray-700 text-sm font-semibold"
          >Necesita autenticacion?</span
        >
      </label>
    </div>
    <button
      type="submit"
      class="bg-blue-600 text-white font-semibold text-sm rounded py-3 w-full mt-3"
    >
      Guardar
    </button>
  </form>
</template>

<script lang="ts" setup>
import * as yup from "yup";
import { Form, Field, ErrorMessage, useForm } from "vee-validate";
import { UsePagesStore } from "../../store/pages.store";
import { ref } from "vue";
import { CreatePage } from "../../types/pages.types";

type Emits = {
  (Event: "closeModal"): void;
};

const emits = defineEmits<Emits>();

const { CreatePage } = UsePagesStore();

const validationSchema = yup.object().shape({
  pageName: yup.string().required("Debes escribir el nombre de la pagina"),
  pagePath: yup.string().required("Debes escribir el path de la pagina"),
  pageURI: yup.string().required("Debes escribir la URL de la pagina"),
});

const require_auth = ref(false);

const { handleSubmit } = useForm<CreatePage>({
  validationSchema,
});

const OnSubmit = handleSubmit((values) => {
  CreatePage({ ...values, meta: JSON.stringify({ require_auth: require_auth.value }) });
  emits("closeModal")
});
</script>

<style lang="scss"></style>
