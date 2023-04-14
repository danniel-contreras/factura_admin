import { defineStore } from "pinia";
import { OptionsI } from "../../../factura-api-ts/src/types/options.types";
import { get_options, save_option } from "../services/options.service";
import { toast } from "vue3-toastify";
import { Option } from "../types/options.types";

export const UseOptionsStore = defineStore("options", {
  state: () => ({
    options: [] as Option[],
  }),
  actions: {
    async GetOptions() {
      const { ok, result } = await get_options();
      if (ok) {
        this.options = result;
      } else {
        this.options = [];
      }
    },
    async SaveOptions(values: OptionsI) {
      const { ok } = await save_option(values);
      if (ok) {
        toast.success("Se guardo la opcion con exito");
      } else {
        toast.error("Error al guardar opcion");
      }
    },
  },
});
