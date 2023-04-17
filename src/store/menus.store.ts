import { defineStore } from "pinia";
import { save_menu, get_all_menus } from "../services/menus.service";
import { OptionsI } from "../types/options.types";
import { save_option, save_options_menu } from "../services/options.service";
import { toast } from "vue3-toastify";
import { MenusOptions } from "../types/menus.types";

export const UseMenusStore = defineStore("menus", {
  state: () => ({
    menus: [] as MenusOptions[],
  }),
  actions: {
    async SaveMenu(idUser: number, options: number[]) {
      const result = await save_menu(idUser);
      console.log(result);

      options.forEach(async (fl) => {
        await save_options_menu({ idMenu: result.result.idMenu, idOption: fl });
      });

      toast.success("Se guardaron las opciones");
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
