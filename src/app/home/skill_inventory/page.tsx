import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";

export default function page() {
  return (
    <div className="space-y-8 py-8 md:py-16">
      <section className="w-full bg-primary py-8 md:py-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl font-bold text-primary-foreground md:text-2xl">Discover our latest products</h2>
            <p className="text-primary-foreground/80 md:text-base">
              Check out our new arrivals and find the perfect fit for you.
            </p>
          </div>
          <Link
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Shop Now
          </Link>
        </div>
      </section>
      <section className="container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Card>
          <CardContent className="flex aspect-square items-center justify-center">
            <span className="text-3xl font-semibold">1</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex aspect-square items-center justify-center">
            <span className="text-3xl font-semibold">2</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex aspect-square items-center justify-center">
            <span className="text-3xl font-semibold">3</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex aspect-square items-center justify-center">
            <span className="text-3xl font-semibold">4</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex aspect-square items-center justify-center">
            <span className="text-3xl font-semibold">5</span>
          </CardContent>
        </Card>
      </section>
      <section className="container grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <Card>
            <CardContent className="grid grid-cols-[150px_1fr] items-center gap-6">
              <Image src="/placeholder.svg" width={150} height={150} alt="Product" className="rounded-md object-cover" />
              <div className="space-y-2">
                <h3 className="text-base font-medium">Product 1</h3>
                <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="grid grid-cols-[150px_1fr] items-center gap-6">
              <Image src="/placeholder.svg" width={150} height={150} alt="Product" className="rounded-md object-cover" />
              <div className="space-y-2">
                <h3 className="text-base font-medium">Product 2</h3>
                <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="grid grid-cols-[150px_1fr] items-center gap-6">
              <Image src="/placeholder.svg" width={150} height={150} alt="Product" className="rounded-md object-cover" />
              <div className="space-y-2">
                <h3 className="text-base font-medium">Product 3</h3>
                <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="h-full">
          <Tabs defaultValue="description" className="h-full">
            <TabsList className="border-b">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-6">
              <div className="space-y-4">
                <h3 className="text-base font-medium">Product Description</h3>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod, nisl eget ultricies tincidunt,
                  nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="p-6">
              <div className="space-y-4">
                <h3 className="text-base font-medium">Product Reviews</h3>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod, nisl eget ultricies tincidunt,
                  nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="p-6">
              <div className="space-y-4">
                <h3 className="text-base font-medium">Shipping Information</h3>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod, nisl eget ultricies tincidunt,
                  nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </section>
    </div>
  );
}
