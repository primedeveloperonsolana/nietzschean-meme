export interface Book {
  title: string;
  year: number;
  concept: string;
  quote: string;
}

export const books: Book[] = [
  {
    title: "The Birth of Tragedy",
    year: 1872,
    concept: "Apollonian vs Dionysian",
    quote: "Existence and the world seem justified only as an aesthetic phenomenon.",
  },
  {
    title: "Thus Spoke Zarathustra",
    year: 1883,
    concept: "Übermensch, Eternal Recurrence, Will to Power",
    quote: "I teach you the Übermensch. Man is something that shall be overcome.",
  },
  {
    title: "Beyond Good and Evil",
    year: 1886,
    concept: "Master-Slave Morality, Perspectivism",
    quote: "Beyond the sphere of opportunistic lies and well-meaning deceptions, truth is a woman who never yields.",
  },
  {
    title: "On the Genealogy of Morals",
    year: 1887,
    concept: "Ressentiment, Bad Conscience",
    quote: "The slave revolt in morality begins when ressentiment itself becomes creative and gives birth to values.",
  },
  {
    title: "Ecce Homo",
    year: 1888,
    concept: "Self-mythology, Amor Fati",
    quote: "My formula for greatness in a human being is amor fati: that one wants nothing to be different.",
  },
];
