import React, { ChangeEvent, FormEvent, useState } from "react";
import Button from "@mui/material/Button";
import "./UploadFile.scss";
import Upload from "../../Api/UploadAPI";
import CheckIfFileExists from "../../Api/CheckFileExistsAPI";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import {
  errorCode,
  successCode,
  uploadFileHeader,
  uploadFileButtonText,
} from "../../utils/consts";

const UploadFile = () => {
  const [file, setFile] = useState<any>();
  const [resultStatus, setResultStatus] = useState<"success" | "error">(
    "error"
  );
  const [loader, setLoader] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [resultMsg, setResultMsg] = useState<string>("");
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file);
    setLoader(true);
    const fileExistsRes = await CheckIfFileExists(file.name);
    if (fileExistsRes.data.result === errorCode) {
      setLoader(false);
      setOpenAlert(true);
      setResultStatus("error");
      setResultMsg(fileExistsRes.data.message);
    } else if (fileExistsRes.data.result === successCode) {
      const UploadRes = await Upload(formData);
      setLoader(false);
      setOpenAlert(true);
      setResultStatus("success");
      setResultMsg(UploadRes.data.message);
    }
  };

  return (
    <div className="header-upload">
      <h1>{uploadFileHeader}</h1>
      <div className="container-upload">
        {loader && <CircularProgress color="primary" />}
        <form onSubmit={(e) => handleUpload(e)}>
          <input type="file" onChange={handleFileChange} required />
          <div className="send-button">
            <Button variant="contained" type="submit">
              {uploadFileButtonText}
            </Button>
          </div>
        </form>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openAlert}
        autoHideDuration={5000}
        onClose={() => setOpenAlert(false)}
      >
        <Alert onClose={() => setOpenAlert(false)} severity={resultStatus}>
          {resultMsg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UploadFile;
