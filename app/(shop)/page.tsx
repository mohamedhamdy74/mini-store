

import { Suspense } from "react";
import Image from "next/image";
import { ProductCardSkeleton } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Search,
  ShoppingBag,
  Sparkles,
  ArrowRight
} from "lucide-react";

import ProductsSection from "@/components/products-section";


export default function Home() {




  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main>
        {/* Hero Section */}
        <section className="relative px-4 py-8 md:py-12">
          <div className="container mx-auto overflow-hidden rounded-[2.5rem] bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="p-8 md:p-16">
                <Badge variant="secondary" className="mb-6 gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="h-3.5 w-3.5" />
                  New Collection 2026
                </Badge>
                <h1 className="mb-6 text-5xl font-extrabold leading-[1.1] tracking-tight md:text-7xl">
                  Redefining Your <br />
                  <span className="text-zinc-400 dark:text-zinc-500">Lifestyle.</span>
                </h1>
                <p className="mb-10 max-w-md text-lg text-zinc-400 dark:text-zinc-500 md:text-xl">
                  Curated selection of the world's most premium tech and luxury accessories.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="h-14 rounded-full px-8 text-lg font-semibold">
                    Shop Now
                  </Button>
                  <Button size="lg" variant="outline" className="h-14 rounded-full px-8 text-lg font-semibold border-zinc-700 bg-transparent text-white hover:bg-zinc-800 dark:border-zinc-300 dark:text-zinc-900 dark:hover:bg-zinc-200">
                    Learn More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] w-full md:h-[700px]">
                <Image
                  src="/hero.png"
                  alt="Hero Image"
                  fill
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent dark:from-zinc-100/40" />
              </div>
            </div>
          </div>
        </section>
        {/* products */}
        <Suspense fallback={<ProductCardSkeleton />}>
          <ProductsSection />
        </Suspense>

      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="col-span-2">
              <div className="mb-6 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">MiniStore</span>
              </div>
              <p className="max-w-xs text-zinc-500">
                The leading platform for high-end tech accessories and premium lifestyle goods. We focus on quality and design.
              </p>
            </div>
            <div>
              <h4 className="mb-6 font-bold uppercase tracking-widest text-zinc-400 text-xs">Navigation</h4>
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Browse</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Categories</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-6 font-bold uppercase tracking-widest text-zinc-400 text-xs">Support</h4>
              <ul className="space-y-4 text-zinc-600 dark:text-zinc-400">
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Shipping</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-zinc-900 dark:hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-zinc-100 pt-8 text-center text-zinc-500 text-sm dark:border-zinc-900">
            © 2024 MiniStore. All rights reserved. Made with love for premium tech.
          </div>
        </div>
      </footer>
    </div>
  );
}
