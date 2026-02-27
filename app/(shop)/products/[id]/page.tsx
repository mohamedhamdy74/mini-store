import { getProductById, getAllProducts } from "@/lib/api/products";
import { Product } from "@/lib/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    const productsData = await getAllProducts();
    return productsData.data.map((product: Product) => ({
        id: product.id,
    }));
}

export default async function ProductDetailsPage({ params }: Props) {
    const { id } = await params;
    const { data: product }: { data: Product } = await getProductById(id);

    return (
        <main className="container mx-auto px-4 py-12 md:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-2">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                        <Image
                            src={product.imageCover}
                            alt={product.title}
                            fill
                            className="object-contain p-12 transition-transform duration-500 hover:scale-105"
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.images.slice(0, 4).map((img, i) => (
                            <div key={i} className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
                                <Image
                                    src={img}
                                    alt={`${product.title} - ${i + 1}`}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className="rounded-full px-4 py-1">
                                {product.category.name}
                            </Badge>
                            <Badge variant="outline" className="rounded-full px-4 py-1">
                                {product.brand.name}
                            </Badge>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 lg:text-5xl dark:text-zinc-100">
                            {product.title}
                        </h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 text-yellow-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.floor(product.ratingsAverage) ? "fill-current" : "text-zinc-300 dark:text-zinc-700"}`}
                                    />
                                ))}
                                <span className="ml-2 font-semibold text-zinc-900 dark:text-zinc-100">{product.ratingsAverage}</span>
                            </div>
                            <Separator orientation="vertical" className="h-4" />
                            <span className="text-zinc-500 text-sm">{product.ratingsQuantity} reviews</span>
                            <Separator orientation="vertical" className="h-4" />
                            <span className="text-zinc-500 text-sm font-medium">{product.sold} sold</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                            ${product.price}
                        </p>
                        <p className="text-sm text-zinc-500">
                            Available in stock: <span className="font-semibold text-zinc-900 dark:text-zinc-100">{product.quantity} units</span>
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100">About this product</h3>
                        <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {product.description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 py-6">
                        <Button size="lg" className="h-16 gap-3 rounded-full text-lg font-bold shadow-lg shadow-zinc-900/10 dark:shadow-none">
                            <ShoppingCart className="h-6 w-6" />
                            Add to Shopping Cart
                        </Button>
                        <Button size="lg" variant="outline" className="h-16 rounded-full text-lg font-bold">
                            Wishlist
                        </Button>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 gap-4 rounded-3xl border border-zinc-200 p-6 dark:border-zinc-800 md:grid-cols-3">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <Truck className="h-8 w-8 text-zinc-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Free Delivery</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center border-x border-zinc-100 dark:border-zinc-800">
                            <ShieldCheck className="h-8 w-8 text-zinc-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">1 Year Warranty</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <RotateCcw className="h-8 w-8 text-zinc-400" />
                            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">7 Days Return</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}