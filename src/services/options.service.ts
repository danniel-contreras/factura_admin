import axios from "axios";
import { API_URL } from "../utils/constants";
import { Option, OptionsI } from "../types/options.types";

export const save_option = async (values: OptionsI) => {
  const result = await axios.post<{ ok: boolean; message: string }>(
    API_URL + "/option",
    { ...values }
  );
  return result.data;
};

export const get_options = async () => {
  const result = await axios.get<{ ok: boolean; result: Option[] }>(API_URL + "/option");

  return result.data;
};
// export c
