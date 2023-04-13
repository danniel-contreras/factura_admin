import axios from "axios";
import { UserI } from "../types/user.types";
import { API_URL } from "../utils/constants";

export const find_user = async (name = "") => {
  const result = await axios.get<{ result: UserI[]; ok: boolean }>(
    API_URL + `/users/find?name=${name}`
  );

  return result.data
};
