import { defineStore } from "pinia";
import { save_menu, get_all_menus } from "../services/menus.service";
import { OptionsI } from "../types/options.types";
import { save_option } from "../services/options.service";
import { toast } from "vue3-toastify";
import { MenusOptions } from "../types/menus.types";

export const UseMenusStore = defineStore("menus", {
  state: () => ({
    menus: [] as MenusOptions[],
  }),
  actions: {
    async SaveMenu(idUser: number, options: OptionsI[]) {
      const result = await save_menu(idUser);
      console.log(result);
      if (result.ok) {
        const filter_options = options.filter(
          (fl) => fl.path !== "" && fl.optionIcon !== "" && fl.optionName !== ""
        );
        filter_options.forEach(async (fl) => {
          await save_option(fl, result.result.idMenu);
        });

        toast.success("Se guardaron las opciones");
      }
    },
    async GetMenus() {
      const result = await get_all_menus();
      if (result.ok) {
        this.menus = result.result;
      } else {
        this.menus = [];
      }
    },
  },
});
