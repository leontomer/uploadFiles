import React from "react";
import axios from "axios";
type Props = {};

const GetFileApi = async (filename: string) => {
  const res = await axios.get(`/file/file/${filename}`);
  return res.data.file;
};

export default GetFileApi;
