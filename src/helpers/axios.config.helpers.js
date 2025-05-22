import axios from "axios";

const clientAxios = axios.create({
  baseURL: `${import.meta.env.VITE_URL_BACK_LOCAL}/api`,
});

export const configHeaders = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const configHeadersImagen = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export default clientAxios;
