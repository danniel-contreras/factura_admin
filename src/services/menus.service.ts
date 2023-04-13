import axios from "axios";
import { API_URL } from "../utils/constants";
import { CreateMenuResponse, MenusOptions } from "../types/menus.types";

/**
 * This function saves a menu for a user by making a POST request to an API endpoint and returning the
 * response data.
 * @param {number} idUser - The id of the user for whom the menu is being created.
 * @returns The function `save_menu` is returning the `data` property of the `result` object, which is
 * of type `CreateMenuResponse`.
 */
export const save_menu = async (idUser: number) => {
  const result = await axios.post<CreateMenuResponse>(API_URL + "/menu", {
    idUser,
  });

  return result.data;
};

/**
 * This function retrieves all menu options from an API endpoint using axios in TypeScript.
 * @returns The function `get_all_menus` is returning a Promise that resolves to an object with two
 * properties: `result` and `ok`. The `result` property is an array of `MenusOptions` objects, and the
 * `ok` property is a boolean value indicating whether the request was successful or not.
 */
export const get_all_menus = async () => {
  const result = await axios.get<{ result: MenusOptions[]; ok: boolean }>(
    API_URL + `/menu/options`
  );
  return result.data;
};
