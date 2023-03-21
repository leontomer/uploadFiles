import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./GetFile.scss";
import {
  getFileHeader,
  getFileInputLabel,
  getFileAnchorText,
} from "../../utils/consts";

const GetFile = () => {
  const [fileName, setFileName] = React.useState("");

  return (
    <div>
      <div className="header-get-file">
        <h1>{getFileHeader}</h1>
        <div className="getFile">
          <label>{getFileInputLabel}</label>
          <TextField
            variant="standard"
            value={fileName}
            onChange={(e) => {
              setFileName(e.target.value);
            }}
          />
          <div className="send-button">
            <Button variant="contained">
              <a
                href={`http://localhost:5000/file/getfile/${fileName}`}
                target="_blank"
              >
                {getFileAnchorText}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetFile;
