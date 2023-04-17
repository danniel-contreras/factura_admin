import { Option } from "./options.types";
import { UserI } from "./user.types";

export interface CreateMenuResponse {
  result: MenuI;
  ok: boolean;
  message: string;
}

export interface MenusOptions extends MenuI {
  user: UserI;
  options: MenuOptionI[];
}

export interface MenuI {
  idMenu: number;
  idUser: number;
  updatedAt: string;
  createdAt: string;
}

export interface MenuOptionI {
  idMenuOptions: number;
  createdAt: string;
  updatedAt: string;
  idMenu: number;
  idOption: number;
  option: {
    idOption: number;
    optionName: string;
    optionIcon: string;
    path: string;
    createdAt: string;
    updatedAt: string;
  };
}
