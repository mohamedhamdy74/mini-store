import { getProductById, getAllProducts } from "@/lib/api/products"
import { Product } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Star, Truck, ShieldCheck, RotateCcw } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ImageGallery } from "@/components/image-gallery"
import { ProductActions } from "@/components/product-actions"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Props {
    params: Promise<{ id: string }>
}

export async function generateStaticParams() {
    try {
        const productsData = await getAllProducts()
        if (!productsData?.data) return []
        return productsData.data.map((product: Product) => ({
            id: product.id,
        }))
    } catch {
        return []
    }
}

export async function generateMetadata({ params }: Props) {
    try {
        const { id } = await params
        const { data: product }: { data: Product } = await getProductById(id)
        if (!product) return { title: 'Not Found | MiniStore' }
        return {
            title: `${product.title} | MiniStore`,
            description: product.description,
        }
    } catch {
        return { title: 'Not Found | MiniStore' }
    }
}

export default async function ProductDetailsPage({ params }: Props) {
    const { id } = await params
    let product: Product | null = null

    try {
        const result = await getProductById(id)
        product = result.data
    } catch (error) {
        // Fallback to 404 if API fails
        notFound()
    }

    if (!product) {
        notFound()
    }

    const allImages = [product.imageCover, ...(product.images || []).filter(img => img !== product?.imageCover)]

    return (
        <main className="min-h-[calc(100vh-72px)] bg-zinc-50 dark:bg-zinc-950">
            <div className="container mx-auto px-4 py-8 md:px-8 md:py-12 lg:px-12">
                {/* Breadcrumb */}
                <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
                    <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/products" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Products</Link>
                    <span>/</span>
                    <span className="text-zinc-900 dark:text-zinc-100 font-medium line-clamp-1">{product.title}</span>
                </nav>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Image Gallery */}
                    <div className="min-w-0">
                        <ImageGallery images={allImages} title={product.title} />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Link href={`/categories`}>
                                    <Badge variant="outline" className="rounded-full px-4 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                                        {product.category.name}
                                    </Badge>
                                </Link>
                                <Link href={`/brands`}>
                                    <Badge variant="outline" className="rounded-full px-4 py-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                                        {product.brand.name}
                                    </Badge>
                                </Link>
                            </div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 lg:text-4xl dark:text-zinc-100">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1 text-amber-500">
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
                                <span className="text-zinc-500 text-sm">{product.sold} sold</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                                EGP {product.price.toLocaleString()}
                            </p>
                            <p className="text-sm text-zinc-500">
                                {product.quantity > 0 ? (
                                    <>Available: <span className="font-semibold text-emerald-600">{product.quantity} in stock</span></>
                                ) : (
                                    <span className="font-semibold text-red-500">Out of stock</span>
                                )}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">About this product</h3>
                            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {product.description}
                            </p>
                        </div>

                        {/* Add to cart / wishlist buttons */}
                        <ProductActions productId={product.id} inStock={product.quantity > 0} />

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 gap-4 rounded-3xl border border-zinc-200 p-6 dark:border-zinc-800 md:grid-cols-3">
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                    <Truck className="h-6 w-6 text-zinc-500" />
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Free Delivery</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center border-y md:border-y-0 md:border-x border-zinc-100 dark:border-zinc-800 py-4 md:py-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                    <ShieldCheck className="h-6 w-6 text-zinc-500" />
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">1 Year Warranty</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
                                    <RotateCcw className="h-6 w-6 text-zinc-500" />
                                </div>
                                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">7 Days Return</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}