import { PageI } from "./pages.types";

export interface OptionsI {
  optionName: string;
  optionIcon: string;
  path: string;
}

export interface Option {
  idOption: number;
  optionName: string;
  optionIcon: string;
  createdAt: string;
  updatedAt: string;
  path:string
}
