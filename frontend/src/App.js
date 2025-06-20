import React from "react";
import UploadForm from "./uploadForm";
import TransformVideoFile from "./transformVideoFile";

function App() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="font-orbitron">TRANSLATOR</h1>
      <UploadForm />
      <TransformVideoFile />
    </div>
  );
}

export default App;
