import React, { FormEvent } from "react";
import axios from "axios";

const Upload = async (file: FormData) => {
  const res = await axios.post(`/file/upload`, file);
  return res;
};

export default Upload;
