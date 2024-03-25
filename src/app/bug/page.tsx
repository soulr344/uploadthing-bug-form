"use client";

import { FormEvent, useState } from "react";
import { UploadDropzone } from "~/utils/uploadthing";

export default function Home() {
  const [renderUpload, setRenderUpload] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="max-w-96 px-2" onSubmit={onSubmit}>
        <h1 className="font-bold text-3xl mb-6">
          The upload dropzone is wrapped in a form.
        </h1>
        <p className="text-balance mb-2">
          Focus on the input below, and press enter.
        </p>
        <p className="text-balance mb-4">
          Normally the form should submit, but with uploadthing, it doesn&apos;t
          submit.
        </p>
        <label htmlFor="demoInput">Demo Input:</label>
        <input
          placeholder="Demo Input"
          className="px-4 py-2 rounded border-gray-400 border w-full"
          id="demoInput"
        />
        {renderUpload && (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              // Do something with the response
              console.log("Files: ", res);
              alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              // Do something with the error.
              alert(`ERROR! ${error.message}`);
            }}
          />
        )}

        <label className="mt-4 flex gap-4 items-center">
          <input
            type="checkbox"
            onChange={(e) => setRenderUpload(e.target.checked)}
          />
          {renderUpload ? "Disable" : "Enable"} Uploadthing Field
        </label>

        <button className="w-full mt-4 px-6 py-2 rounded bg-rose-600 text-white">
          Submit Manual (Works)
        </button>
        {submitted && (
          <p className="mt-6">
            The form is submitted.
            <button
              className="mt-2 px-4 py-2 text-sm block bg-cyan-700 rounded text-white"
              onClick={() => setSubmitted(false)}
            >
              Reset Status
            </button>
          </p>
        )}
      </form>
    </main>
  );
}
