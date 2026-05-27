"use client";

import { useFadeIn } from "@/hooks/useScrollAnimation";

export function MemeCulture() {
  const fadeRef = useFadeIn<HTMLDivElement>(0);

  return (
    <section id="meme-culture" className="relative py-24 sm:py-32 px-4">
      <div ref={fadeRef} className="max-w-4xl mx-auto">
        <div className="mb-16">
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Today&apos;s Relevance
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40">
            Through Meme Culture
          </p>
        </div>

        <div className="space-y-12 text-white/70 leading-[1.8]">
          <p className="text-lg sm:text-xl">
            In the digital age, Nietzsche has become something unexpected: a meme.
            Not the shallow kind that dies in a week, but the kind that mutates,
            spreads, and infects the cultural consciousness with ideas too dangerous
            for polite society.
          </p>

          <div className="border-l-2 border-white/20 pl-6">
            <p className="font-playfair italic text-2xl text-white mb-4">
              &ldquo;The individual has always had to struggle to keep from being
              overwhelmed by the tribe.&rdquo;
            </p>
            <p className="text-sm text-white/40">— Friedrich Nietzsche</p>
          </div>

          <p>
            Walk through Crypto Twitter in 2025 and you&apos;ll find Nietzsche
            everywhere. Not his name — his <em>spirit</em>. The degen who rugs a
            project and walks away without apology? That&apos;s the
            &ldquo;master morality&rdquo; in action, valuing strength and
            consequence over guilt and repentance. The anon who builds in silence
            for years, rejecting VC money and influencer hype? That&apos;s the
            path of the Übermensch — self-overcoming without the crowd&apos;s
            approval.
          </p>

          <p>
            The &ldquo;based&rdquo; culture that celebrates saying the
            unsayable, the &ldquo;redpill&rdquo; narrative of seeing through
            societal lies, the rejection of &ldquo;mid&rdquo; conformity — all of
            this is Nietzsche filtered through internet irony. His ideas have been
            meme-ified, stripped of academic pretension, and weaponized by a
            generation that communicates in 280-character aphorisms.
          </p>

          <p>
            But here&apos;s the psyop: Nietzsche himself would have laughed at
            the memes. He would have recognized in them the same Dionysian energy
            he celebrated in The Birth of Tragedy — chaos, creativity, the
            destruction of old forms to birth new ones. The memecoin itself is a
            Nietzschean act: creating value from nothing, willing it into
            existence through collective belief, then watching it dissolve or
            ascend — amor fati in financial form.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-playfair text-xl text-white mb-3">
                The Herd vs. The Degen
              </h3>
              <p className="text-sm text-white/50">
                Nietzsche&apos;s &ldquo;herd morality&rdquo; is the normie who
                buys index funds and calls the SEC when a token pumps 1000x. The
                degen is the Übermensch-in-training: creating his own values,
                risking everything, embracing the eternal recurrence of rugs and
                moonshots.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="font-playfair text-xl text-white mb-3">
                God is Dead, Long Live the Blockchain
              </h3>
              <p className="text-sm text-white/50">
                If God is dead, then centralized institutions are his rotting
                corpse. The blockchain is the new value-creating mechanism — not
                divine, not state-sanctioned, but willed into existence by those
                with the courage to code, deploy, and hold.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
