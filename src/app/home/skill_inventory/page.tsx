import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import logo from "/public/thrivoHR-icon.png";
import fire from "/public/icons8-fire.gif";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export default function page() {
  return (
    <div className="space-y-8 pb-8 overflow-hidden">
      <section className="w-full bg-sky-200 py-8 md:py-12">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-xl font-bold text-primary-foreground md:text-2xl">
              Learn for a better future
            </h2>
            <p className="text-primary-foreground/80 md:text-base">
              Check out courses and get started.
            </p>
          </div>
          <Link
            href="#"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary-foreground px-6 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Learn more
          </Link>
        </div>
      </section>
      <div className="container grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <Button variant="outline" className="px-8 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
          Find Ideas
        </Button>
        <Button variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
          Questions
        </Button>
        <Button variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
            />
          </svg>
          Videos
        </Button>
        <Button variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
            />
          </svg>
          Survey
        </Button>
        <Button variant="outline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          Chat
        </Button>
      </div>
      <section className="container mx-auto p-4 flex gap-8">
        <div className="flex-1">
          <div className="flex items-center mb-8">
            <h1 className="text-2xl font-bold">New lessons</h1>
            <Image
              src={fire}
              alt="fire"
              width={30}
              height={30}
              className="ml-2"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="flex flex-col items-center gap-4">
                <Image
                  src={logo}
                  width={150}
                  height={150}
                  alt="Product"
                  className="rounded-md object-cover"
                />
                <div className="space-y-2 text-center">
                  <h3 className="text-base font-medium">Product 1</h3>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center gap-4">
                <Image
                  src={logo}
                  width={150}
                  height={150}
                  alt="Product"
                  className="rounded-md object-cover"
                />
                <div className="space-y-2 text-center">
                  <h3 className="text-base font-medium">Product 2</h3>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center gap-4">
                <Image
                  src={logo}
                  width={150}
                  height={150}
                  alt="Product"
                  className="rounded-md object-cover"
                />
                <div className="space-y-2 text-center">
                  <h3 className="text-base font-medium">Product 3</h3>
                  <p className="text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-8">
            <h1 className="text-2xl font-bold">Recent posts</h1>
          </div>
          <Card className="w-full h-full">
            <Tabs defaultValue="description" className="h-full">
              <TabsList className="border-b">
                <TabsTrigger value="question">Questions</TabsTrigger>
                <TabsTrigger value="challenge">Challenges</TabsTrigger>
                <TabsTrigger value="insight">Insight</TabsTrigger>
              </TabsList>
              <TabsContent value="question" className="p-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Question</h3>
                  <Table className="w-full">
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Feature 1:
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Lorem ipsum dolor sit amet
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Feature 2:
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Consectetur adipiscing elit
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Feature 3:
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Fusce euismod
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="challenge" className="p-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">Challenges</h3>
                  <Table className="w-full">
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Feature 1:
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Lorem ipsum dolor sit amet
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Feature 2:
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Consectetur adipiscing elit
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Feature 3:
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Fusce euismod
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="insight" className="p-6">
                <div className="space-y-4">
                  <h3 className="text-base font-medium">
                    Insights
                  </h3>
                  <Table className="w-full">
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">
                          Feature 1:
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Lorem ipsum dolor sit amet
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Feature 2:
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Consectetur adipiscing elit
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Feature 3:
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          Fusce euismod
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </section>
    </div>
  );
}
