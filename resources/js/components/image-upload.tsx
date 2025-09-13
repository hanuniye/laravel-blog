import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ImagePlus, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

interface UploadedImage {
    id: string;
    file: File;
    preview: string;
}

interface ImageUploadProps {
    onFilesChange?: (files: File[]) => void;
    multiple?: boolean;
}

const ImageUpload = ({ onFilesChange, multiple = true }: ImageUploadProps) => {
    const [images, setImages] = useState<UploadedImage[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Notify parent when files change
    useEffect(() => {
        const files = images.map((img) => img.file);
        onFilesChange?.(files);
    }, [images, onFilesChange]);

    const addImages = (files: File[]) => {
        const newImages = files.map((file) => ({
            id: Date.now() + Math.random().toString(36),
            file,
            preview: URL.createObjectURL(file),
        }));

        if (multiple) {
            setImages((prev) => [...prev, ...newImages]);
        } else {
            // Clear existing and add only the first new image
            images.forEach((img) => URL.revokeObjectURL(img.preview));
            setImages([newImages[0]]);
        }
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const validFiles = Array.from(files).filter((file) => {
            if (!file.type.startsWith('image/')) {
                toast.error('Please select only image files.');
                return false;
            }
            return true;
        });

        if (validFiles.length > 0) {
            addImages(validFiles);
        }

        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeImage = (id: string) => {
        setImages((prev) => {
            const imageToRemove = prev.find((img) => img.id === id);
            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove.preview);
            }
            return prev.filter((img) => img.id !== id);
        });
    };

    return (
        <div className="space-y-4">
            {/* Display Images */}
            {images.length > 0 && (
                <div className="animate-fade-in">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {images.map((image) => (
                            <Card
                                key={image.id}
                                className="group border-upload-zone-border bg-upload-zone hover:bg-upload-zone-hover animate-scale-in relative overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-image)]"
                            >
                                <div className="relative aspect-square">
                                    <img
                                        src={image.preview}
                                        alt="Uploaded image"
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <Button
                                            onClick={() => removeImage(image.id)}
                                            size="sm"
                                            variant="destructive"
                                            className="scale-90 transform transition-transform duration-200 group-hover:scale-100"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Upload Button */}
            <div>
                <Button type="button" onClick={() => fileInputRef.current?.click()} variant="secondary">
                    {/* <Upload className="mr-2 h-5 w-5" /> */}
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Upload {multiple ? 'Images' : 'Image'}
                </Button>

                <input ref={fileInputRef} type="file" accept="image/*" multiple={multiple} onChange={handleFileSelect} className="hidden" />
            </div>
        </div>
    );
};

export default ImageUpload;
