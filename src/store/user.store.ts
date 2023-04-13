import { defineStore } from "pinia";
import { UserI } from "../types/user.types";
import { find_user } from "../services/user.service";

export const UseUserStore = defineStore("users", {
  state: () => ({
    users: [] as UserI[],
  }),
  actions: {
    async FindUser(name: string) {
      const result = await find_user(name);
      if (result.ok) {
        this.users = result.result;
      }else{
        this.users = []
      }
    },
  },
});
