import Postmark from '@/components/Postal/Postmark';
import { credentials } from '@/constants';
import { cn } from '@/lib/utils';

/** Each registration as a rubber cachet: the body's name on the ring, initials inside. */
const CACHETS = [
    ['SOCIAL WELFARE COUNCIL', 'REGISTERED', 'SWC', '-rotate-[10deg]'],
    ['NAT. CHILD RIGHTS COUNCIL', 'APPROVED', 'NCRC', 'rotate-[6deg] translate-y-3'],
    ['CHILD PROTECTION', 'STANDARDS', 'UNICEF', '-rotate-[4deg] -translate-y-2'],
    ['INDEPENDENT · YEARLY', 'CHECKED', 'AUDIT', 'rotate-[12deg] translate-y-2'],
].map(([ring, small, big, tilt]) => ({
    ring,
    small,
    big,
    tilt,
}));

/**
 * Registrations as one cluster of overlapping cachets, struck like a page of official stamps,
 * beside a single ruled list naming each body.
 */
function Credentials({ className }: { className?: string }) {
    return (
        <div className={cn('grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-20', className)}>
            <div aria-hidden="true" className="flex justify-center py-4 lg:justify-start">
                {CACHETS.map((cachet) => (
                    <Postmark
                        key={cachet.big}
                        ringTop={cachet.ring}
                        small={cachet.small}
                        big={cachet.big}
                        className={cn('-mx-1 w-[5.5rem] opacity-90 mix-blend-multiply sm:-mx-1.5 sm:w-32', cachet.tilt)}
                    />
                ))}
            </div>
            <ul className="border-t border-ink/20">
                {credentials.map((item) => (
                    <li
                        key={item.title}
                        className="grid gap-1 border-b border-ink/15 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6"
                    >
                        <span className="font-sans font-semibold text-ink [font-stretch:106%]">{item.title}</span>
                        <span className="text-ink-soft">{item.body}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Credentials;
