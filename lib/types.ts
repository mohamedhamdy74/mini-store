export interface Product {
    sold: number
    images: string[]
    subcategory: Subcategory[]
    ratingsQuantity: number
    _id: string
    title: string
    slug: string
    description: string
    quantity: number
    price: number
    imageCover: string
    category: Category
    brand: Brand
    ratingsAverage: number
    createdAt: string
    updatedAt: string
    id: string
}

export interface Subcategory {
    _id: string
    name: string
    slug: string
    category: string
}

export interface Category {
    _id: string
    name: string
    slug: string
    image: string
}

export interface Brand {
    _id: string
    name: string
    slug: string
    image: string
}

// ─── Cart Types ────────────────────────────────────────
export interface CartProduct {
    count: number
    _id: string
    product: Product
    price: number
}

export interface CartData {
    _id: string
    cartOwner: string
    products: CartProduct[]
    totalCartPrice: number
    createdAt: string
    updatedAt: string
    __v: number
}

export interface CartResponse {
    status: string
    numOfCartItems: number
    cartId: string
    data: CartData
}

// ─── Wishlist Types ────────────────────────────────────
export interface WishlistResponse {
    status: string
    count: number
    data: Product[]
}

// ─── Address Types ─────────────────────────────────────
export interface Address {
    _id: string
    name: string
    details: string
    phone: string
    city: string
}

export interface AddressResponse {
    status: string
    data: Address[]
}

// ─── Order Types ───────────────────────────────────────
export interface Order {
    _id: string
    user: { name: string; email: string }
    cartItems: { product: Product; count: number; price: number }[]
    totalOrderPrice: number
    paymentMethodType: string
    isPaid: boolean
    isDelivered: boolean
    createdAt: string
}

// ─── API Response Types ────────────────────────────────
export interface ApiResponse<T = unknown> {
    status?: string
    message?: string
    data?: T
    metadata?: {
        currentPage: number
        numberOfPages: number
        limit: number
        nextPage?: number
    }
}

export interface ActionResult {
    success: boolean
    message: string
    data?: unknown
}