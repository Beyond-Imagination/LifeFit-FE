import { AxiosResponse } from "axios";
import axios from "@/app/util";

export const getProjectList = (
  lastId: string | null,
  size: number
): Promise<AxiosResponse<ProjectListElementResponse[]>> => {
  return axios({
    method: "get",
    headers: {
      Accept: "application/json",
    },
    url: `/projects`,
    params: { lastId: lastId, size: size },
  });
};

export const getProjectDetail = (
  id: string
): Promise<AxiosResponse<ProjectDetailResponse>> => {
  return axios({
    method: "get",
    headers: {
      Accept: "application/json",
    },
    url: `/projects/${id}`,
  });
};

export const projectLike = (
  id: string
): Promise<AxiosResponse<ProjectLikeResponse>> => {
  return axios({
    method: "post",
    headers: {
      Accept: "application/json",
    },
    url: `/projects/${id}/like`,
  });
};

export const createComment = (
  id: string,
  content: string
): Promise<AxiosResponse> => {
  return axios({
    method: "post",
    headers: {
      Accept: "application/json",
    },
    url: `/projects/${id}/comment`,
    data: { content: content },
  });
};

export interface ProjectListElementResponse {
  id: string;
  title: string;
  date: string;
  likes: number;
  comments: number;
  image: string;
  isLiked: boolean;
}

export interface ProjectDetailResponse {
  id: string;
  title: string;
  date: string;
  content: string;
  likes: number;
  comments: ProjectCommentResponse[];
  images: string[];
  isLiked: boolean;
}

export interface ProjectCommentResponse {
  id: string;
  user: string;
  content: string;
}

export interface ProjectLikeResponse {
  projectId: string;
  likesCount: number;
  isLiked: boolean;
}
