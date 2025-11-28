"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Check, X, Upload, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepAvatarProps {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export function StepAvatar({ files, setFiles }: StepAvatarProps) {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            setFiles((prev) => [...prev, ...acceptedFiles]);
        },
        [setFiles]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".webp"],
        },
    });

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="mx-auto max-w-md space-y-8 sm:max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* HEADER */}
            <div className="space-y-2 text-center sm:text-left">
                <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    Avatar Setup
                </h1>
                <p className="text-muted-foreground text-base max-w-sm mx-auto sm:mx-0">
                    Your photos help us create manga style avatars.
                </p>
            </div>

            {/* CARD STACK VISUAL */}
            {/* TODO */}

            {/* UPLOAD AREA */}
            <div
                {...getRootProps()}
                className={cn(
                    "relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-200 cursor-pointer",
                    isDragActive
                        ? "border-primary bg-primary/5"
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
                )}
            >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>

                    <div className="space-y-1">
                        <h3 className="font-semibold text-lg">Upload your files</h3>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                            Add 10–15 clear photos of yourself. Try using solo, face-centric
                            shots so we can build a great avatar.
                        </p>
                    </div>

                    {/* CHECKLIST */}
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs text-left mt-4 w-full max-w-xs mx-auto">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Check className="h-3 w-3 text-green-500" /> Clear face
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Check className="h-3 w-3 text-green-500" /> Good lighting
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Check className="h-3 w-3 text-green-500" /> Multiple angles
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <X className="h-3 w-3 text-red-500" /> Group photos
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <X className="h-3 w-3 text-red-500" /> Blurry pics
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <X className="h-3 w-3 text-red-500" /> Face covered
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FILE LIST */}
            {files.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {files.map((file, idx) => (
                        <div
                            key={idx}
                            className="relative group aspect-square rounded-xl overflow-hidden border bg-muted"
                        >
                            <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                className="w-full h-full object-cover"
                                onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)}
                            />
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(idx);
                                }}
                                className="absolute top-1 right-1 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 backdrop-blur-sm"
                            >
                                <Trash2 className="h-3 w-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
