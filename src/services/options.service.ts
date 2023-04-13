import axios from "axios";
import { API_URL } from "../utils/constants";
import { OptionsI } from "../types/options.types";

export const save_option = async (values: OptionsI, idMenu: number) => {
  const result = await axios.post<{ ok: boolean; message: string }>(
    API_URL + "/option",
    { ...values, idMenu }
  );
  return result.data;
};

