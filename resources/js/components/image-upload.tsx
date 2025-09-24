import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UploadedImage {
    id: string;
    file?: File; // Optional, since DB images don’t have File
    preview: string; // Can be URL from DB or local preview
    isFromDb?: boolean; // Track if the image came from the DB
}

interface ImageUploadProps {
    onFilesChange?: (files: File[]) => void;
    multiple?: boolean;
    initialImages?: string[]; // array of image URLs from DB
}

const ImageUpload = ({ onFilesChange, multiple = true, initialImages = [] }: ImageUploadProps) => {
    const [images, setImages] = useState<UploadedImage[]>([]);

    // Load initial images from DB
    useEffect(() => {
        if (initialImages.length > 0) {
            const dbImages = initialImages.map((url, i) => ({
                id: `x-${i}`, // use the url as unique id
                preview: url, // direct URL to DB image
                isFromDb: true, // mark as DB image
            }));
            setImages(dbImages);
        }
    }, []);

    // Notify parent when files change
    useEffect(() => {
        const files = images.filter((img) => img.file).map((img) => img.file as File);
        onFilesChange?.(files);
    }, [images]);

    const addImages = (files: File[]) => {
        const newImages = files.map((file) => ({
            id: Date.now() + Math.random().toString(36),
            file,
            preview: URL.createObjectURL(file),
        }));

        let updated: UploadedImage[];

        if (multiple) {
            updated = [...images, ...newImages];
        } else {
            // Clear existing and add only the first new image
            images.forEach((img) => !img.isFromDb && URL.revokeObjectURL(img.preview));
            updated = [newImages[0]];
        }

        setImages(updated);
        onFilesChange?.(updated.filter((img) => img.file).map((img) => img.file as File));
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
        if (event?.target) {
            event.target.value = '';
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
                            <div
                                key={image.id}
                                className="group border-upload-zone-border bg-upload-zone hover:bg-upload-zone-hover animate-scale-in relative overflow-hidden rounded-md transition-all duration-300 hover:shadow-[var(--shadow-image)]"
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
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Upload Button */}
            <div>
                <label>
                    <input type="file" accept="image/*" multiple={multiple} onChange={handleFileSelect} className="hidden" />
                    <Button type="button" variant="secondary" asChild>
                        <span className="flex items-center">
                            <ImagePlus className="mr-2 h-4 w-4" />
                            Upload {multiple ? 'Images' : 'Image'}
                        </span>
                    </Button>
                </label>
            </div>
        </div>
    );
};

export default ImageUpload;
