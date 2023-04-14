<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="emits('closeModal')" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              id="modal"
              class="transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all w-auto"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                {{ title }}
                <button @click="emits('closeModal')" class="float-right cursor-pointer">
                  <oh-vue-icon class="outline-none text-xl" name="fa-times"></oh-vue-icon>
                </button>
              </DialogTitle>
              <div class="w-full h-1 border-t mt-2"></div>
              <div class="w-auto">
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import OhVueIcon from "../../plugins/vue-icons";

interface Props {
  isOpen: boolean;
  title: string;
}

type Emits = {
  (Event: "closeModal"): void;
};

const emits = defineEmits<Emits>();

const { isOpen, title } = defineProps<Props>();
</script>
