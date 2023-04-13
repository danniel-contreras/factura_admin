import { PageI } from "./pages.types";

export interface OptionsI {
  optionName: string;
  optionIcon: string;
  idPage: number;
}

export interface Option {
  idOption: number;
  optionName: string;
  optionIcon: string;
  createdAt: string;
  updatedAt: string;
  idMenu: number;
  idPage: number;
  page: PageI;
}
