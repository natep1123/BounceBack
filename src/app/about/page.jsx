import About from "@/components/about/About";

export default async function AboutPage() {
  //No auth, so guests can access
  return <About />;
}
