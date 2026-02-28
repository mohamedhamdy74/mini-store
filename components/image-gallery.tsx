'use client'

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="w-full space-y-4 overflow-hidden">
            {/* Main Image View */}
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <Image
                    src={selectedImage}
                    alt={title}
                    fill
                    className="object-contain p-6 md:p-12 transition-all duration-500 hover:scale-105"
                    priority
                />
            </div>

            {/* Thumbnails list */}
            <div className="flex w-full gap-4 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-4 md:overflow-visible">
                {images.map((img, i) => (
                    <div
                        key={i}
                        onClick={() => setSelectedImage(img)}
                        className={cn(
                            "relative aspect-square min-w-[80px] shrink-0 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 border-2 cursor-pointer transition-all duration-200 md:min-w-0",
                            selectedImage === img
                                ? "border-primary shadow-md scale-95"
                                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500"
                        )}
                    >
                        <Image
                            src={img}
                            alt={`${title} - ${i + 1}`}
                            fill
                            className="object-contain p-2"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
