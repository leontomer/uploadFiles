import React, { FormEvent } from "react";
import axios from "axios";

const CheckIfFileExists = async (filename: string) => {
  const res = await axios.get(`/file/check-if-file-exists/${filename}`);
  return res;
};

export default CheckIfFileExists;
