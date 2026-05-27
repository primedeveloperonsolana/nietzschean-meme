"use client";

import { useFadeIn } from "@/hooks/useScrollAnimation";

const influences = [
  {
    field: "Existentialism",
    figures: "Sartre, Camus, Heidegger",
    description:
      "Nietzsche is the unacknowledged father of existentialism. His proclamation that we must create our own meaning in a godless universe became the central tenet of the entire movement. Sartre's 'existence precedes essence' is a direct descendant of Nietzsche's value-creating individual.",
  },
  {
    field: "Psychology",
    figures: "Freud, Jung, Adler",
    description:
      "Freud admitted Nietzsche's insights into the unconscious were unparalleled. Jung built his concept of the Shadow directly from Nietzsche's exploration of the Dionysian. Adler's 'will to power' is practically plagiarized. Modern therapy owes more to Nietzsche than to any clinician.",
  },
  {
    field: "Literature",
    figures: "Kafka, Hesse, Dostoevsky",
    description:
      "Kafka's absurd bureaucratic nightmares echo Nietzsche's critique of herd morality. Hesse's Steppenwolf IS the Übermensch in crisis. Even Dostoevsky, writing before Nietzsche's mature works, anticipated the abyss that Nietzsche would name and map.",
  },
  {
    field: "Post-Structuralism",
    figures: "Foucault, Derrida, Deleuze",
    description:
      "Foucault's power-knowledge is pure Nietzsche. Derrida's deconstruction is Nietzschean perspectivism with a French accent. Deleuze wrote entire books expanding on Nietzsche's concepts. The entire continental philosophy tradition of the late 20th century is a footnote to Nietzsche.",
  },
  {
    field: "Modern Politics",
    figures: "Left & Right",
    description:
      "Paradoxically, Nietzsche has been claimed by everyone and no one. The alt-right misreads him as a proto-fascist; the left ignores his critique of egalitarianism. Both are wrong. Nietzsche is beyond politics — he is the diagnosis of politics itself as a symptom of decadence.",
  },
];

export function Influence() {
  const fadeRef = useFadeIn<HTMLDivElement>(0);

  return (
    <section id="influence" className="relative py-24 sm:py-32 px-4">
      <div ref={fadeRef} className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Influence
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            On World Views & Literature
          </p>
        </div>

        <div className="space-y-16">
          {influences.map((item, i) => (
            <div
              key={i}
              className="relative pl-8 border-l border-white/10 hover:border-white/30 transition-colors duration-500"
            >
              <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-white" />
              <h3 className="font-playfair text-2xl sm:text-3xl text-white mb-2">
                {item.field}
              </h3>
              <p className="text-xs uppercase tracking-widest text-white/40 mb-4">
                {item.figures}
              </p>
              <p className="text-white/70 leading-[1.8]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
