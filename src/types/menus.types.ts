import { Option } from "./options.types";
import { UserI } from "./user.types";

export interface CreateMenuResponse {
  result: MenuI;
  ok: boolean;
  message: string;
}

export interface MenusOptions extends MenuI {
  user: UserI;
  options: Option[];
}

export interface MenuI {
  idMenu: number;
  idUser: number;
  updatedAt: string;
  createdAt: string;
}
