import About from "@/components/about/About";

export default async function AboutGame() {
  //No auth, so guests can access
  return <About />;
}
