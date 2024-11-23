import { AxiosResponse } from "axios";
import axios from "@/app/util";

export const getTestResponse = (): Promise<AxiosResponse<TestResponse>> => {
  return axios({
    method: "get",
    headers: {
      Accept: "application/json",
    },
    url: `/`,
  });
};

interface TestResponse {
  id: number;
  username: string;
}
