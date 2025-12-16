import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full flex flex-col justify-center items-center">
      <section className="hero-section w-full min-h-screen flex flex-col justify-center items-center p-10 gap-8 bg-base-200">
        <h1 className="uppercase text-2xl lg:text-4xl text-bold text-center font-heading ">
          Write notes instantly.{" "}
          <span className="text-primary">Focus on ideas, not UI.</span>
        </h1>
        <p className="text-md text-xl text-medium text-center">
          Clean markdown notes with instant saving
        </p>
        <Link href="/auth/register">
          <button className="btn btn-outline w-80 lg:w-100 h-12 btn-primary rounded-2xl text-lg ">
            Start writing notes
          </button>
        </Link>
      </section>
    </main>
  );
}
