'use client'

import config from '@/lib/config';
import Image from 'next/image'
import { useRef, useState } from 'react';
import { toast } from "sonner"

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { cn } from '@/lib/utils';

interface Props {
    type: "image" | "video";
    accept: string;
    placeholder: string;
    folder: string;
    variant: "dark" | "light";
    onFileChange: (filePath: string) => void;
    value?: string;
}


const { env: { imageKit: { publicKey, privateKey, urlEndpoint } } } = config;

// const imagekit = new ImageKit({
//     publicKey,
//     privateKey,
//     urlEndpoint
// })





const ImageUpload = ({ type,
    accept,
    placeholder,
    folder,
    variant,
    onFileChange,
    value }: Props) => {
    const [progress, setProgress] = useState(0);
    const [file, setFile] = useState<{ filePath: string | null }>({
        filePath: value ?? null,
    });

    const styles = {
        button:
            variant === "dark"
                ? "bg-dark-300"
                : "bg-light-600 border-gray-100 border",
        placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
        text: variant === "dark" ? "text-light-100" : "text-dark-400",
    };

    // Create an AbortController instance to provide an option to cancel the upload if needed.
    const abortController = new AbortController();

    // Create a ref for the file input element to access its files easily
    const fileInputRef = useRef<HTMLInputElement>(null);

    // const styles = {
    //     button:
    //         variant === "dark"
    //             ? "bg-dark-300"
    //             : "bg-light-600 border-gray-100 border",
    //     placeholder: variant === "dark" ? "text-light-100" : "text-slate-500",
    //     text: variant === "dark" ? "text-light-100" : "text-dark-400",
    // };


    const authenticator = async () => {
        try {
            const response = await fetch(`
                ${config.env.apiEndpoint}/api/auth/imagekit`);

            if (!response.ok) {
                const errorTest = await response.text();

                throw new Error(
                    `Request failed with status: ${response.status}: ${errorTest}`
                );
            }

            const data = await response.json();

            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey }

        } catch (error: any) {
            throw new Error(`Authenticator request failed: ${error.message}`)
        }
    }

    /**
     * Handles the file upload process.
     *
     * This function:
     * - Validates file selection.
     * - Retrieves upload authentication credentials.
     * - Initiates the file upload via the ImageKit SDK.
     * - Updates the upload progress.
     * - Catches and processes errors accordingly.
     */

    const handleUpload = async () => {
        // Access the file input element using the ref
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            return;
        }

        // Extract the first file from the file input
        const file = fileInput.files[0];

        toast("File uploaded! ");
        // Retrieve authentication parameters for the upload.
        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;

        // Call the ImageKit SDK upload function with the required parameters and callbacks.
        try {
            const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, // Optionally set a custom file name
                // Progress callback to update upload progress state
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                webhookUrl: file.name,
                // Abort signal to allow cancellation of the upload if needed.
                abortSignal: abortController.signal,


            });
            console.log("Upload response:", uploadResponse);
        } catch (error) {
            //Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
            }

        }
    };

    return (
        <>
            {/* File input element using React ref */}
            <input type="file"
                ref={fileInputRef}
                className='hidden'
                onChange={handleUpload} />
            {/* Button to trigger the upload process */}
            <button type="button"
                onClick={() => fileInputRef.current?.click()}
                className={cn('upload-btn', styles.button)}>
                <Image src='/icons/upload.svg'
                    alt='upload-icon'
                    width={20}
                    height={20}
                    className='object-contain'
                />
                <p className={cn('text-base', styles.placeholder)}>Upload a File</p>

                {file && (
                    <p className={cn('upload-filename', styles.text)}>
                        {file.filePath}
                    </p>
                )}
            </button>
            <br />
            {/* Display the current upload progress */}
            {/* Upload progress: <progress value={progress} max={100}></progress> */}
        </>

    )
}

export default ImageUpload
