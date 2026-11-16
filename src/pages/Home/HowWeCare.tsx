import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const ways = [
    {
        title: 'Mummy and Daddy, not caretakers.',
        text: 'Our forty children live at home, not in a facility. Ramesh and Gita raise them as their own, and that family is the reason every child finishes school.',
    },
    {
        title: 'School that carries them further.',
        text: 'School fees, tutoring, vocational training and digital skills. Our alumni now work as engineers, teachers, chefs and government officers.',
    },
    {
        title: 'Everything a growing child needs.',
        text: 'Good food, healthcare, mental wellbeing, play and life skills, so each child grows into a confident, capable adult.',
    },
];

function HowWeCare() {
    return (
        <section aria-labelledby="care-title" className="bg-ink py-24 text-sheet md:py-32">
            <MaxWidthWrapper className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
                <div className="lg:sticky lg:top-28 lg:self-start">
                    <h2 id="care-title" className="text-4xl sm:text-5xl">A family, not an institution.</h2>
                    <p className="mt-6 max-w-[42ch] text-lg text-sheet/75">
                        Children do not need an institution. They need people who will stay. That
                        belief shapes every
                        day in Dadagaun.
                    </p>
                </div>
                <ul className="border-t border-sheet/20">
                    {ways.map((way) => (
                        <li key={way.title} className="border-b border-sheet/20 py-9 first:pt-8">
                            <h3 className="text-2xl sm:text-3xl">{way.title}</h3>
                            <p className="mt-4 max-w-[58ch] text-lg text-sheet/75">{way.text}</p>
                        </li>
                    ))}
                </ul>
            </MaxWidthWrapper>
        </section>
    );
}

export default HowWeCare;
