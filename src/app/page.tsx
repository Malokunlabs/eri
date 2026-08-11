import { Container } from "@/components/ui/container";

const foundations = [
  {
    title: "App Router ready",
    description:
      "Routes, layouts, loading states, and server components live together under src/app.",
  },
  {
    title: "Built to scale",
    description:
      "Shared UI, site-wide layout, utilities, and feature code each have a clear home.",
  },
  {
    title: "Production defaults",
    description:
      "Strict TypeScript, linting, responsive styles, metadata, and accessible landmarks are configured.",
  },
] as const;

export default function Home() {
  return (
    <main id="main-content">
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              A clean foundation
            </p>
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-7xl">
              Your next website starts here.
            </h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl">
              The project is set up with modern Next.js conventions and a simple,
              maintainable structure. Replace this starter page when the product
              direction is ready.
            </p>
            <a
              href="#foundation"
              className="mt-10 inline-flex min-h-11 items-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950"
            >
              Explore the foundation
            </a>
          </div>
        </Container>
      </section>

      <section id="foundation" className="border-y border-slate-200 bg-white py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-3">
            {foundations.map((foundation) => (
              <article key={foundation.title}>
                <h2 className="text-lg font-semibold text-slate-950">
                  {foundation.title}
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  {foundation.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
