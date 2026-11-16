import {
    useEffect,
    useRef,
} from 'react';
import {
    ArrowLeft,
    ArrowRight,
    X,
} from 'lucide-react';

import { type Photo } from '@/lib/api';

const navButton = 'press flex size-12 items-center justify-center rounded-full bg-sheet/10 text-sheet hover:bg-sheet/20 disabled:opacity-30';

/** Full-screen photo viewer on a native <dialog>: focus trap, Escape and backdrop come for free. */
function Lightbox({
    photos,
    index,
    onIndexChange,
    onClose,
}: {
    photos: Photo[];
    index: number | null;
    onIndexChange: (index: number) => void;
    onClose: () => void;
}) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const open = index !== null && !!photos[index];

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) {
            return;
        }
        if (open && !dialog.open) {
            dialog.showModal();
        }
        if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    useEffect(() => {
        if (!open || index === null) {
            return undefined;
        }
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight' && index < photos.length - 1) {
                onIndexChange(index + 1);
            }
            if (event.key === 'ArrowLeft' && index > 0) {
                onIndexChange(index - 1);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, index, photos.length, onIndexChange]);

    const photo = index !== null ? photos[index] : undefined;

    return (
        // <dialog> closes on Escape natively; this click handler only catches backdrop clicks.
        /* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,
           jsx-a11y/click-events-have-key-events */
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
            aria-label="Photo viewer"
            className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-ink/95 p-0 text-sheet backdrop:bg-ink/60"
        >
            {photo && index !== null && (
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
                        <p className="font-sans text-sm text-sheet/75 tabular" aria-live="polite">
                            {index + 1}
                            {' '}
                            of
                            {' '}
                            {photos.length}
                        </p>
                        <button type="button" onClick={onClose} className={navButton}>
                            <X className="size-5" strokeWidth={1.75} />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                    <figure className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-4 pb-6 sm:px-20">
                        <img
                            key={photo.id}
                            src={photo.image}
                            alt={photo.caption || 'Photo from the gallery'}
                            className="rise-in max-h-full min-h-0 w-auto max-w-full object-contain"
                        />
                        {photo.caption && (
                            <figcaption className="max-w-[60ch] text-center font-serif text-sheet/80 italic">{photo.caption}</figcaption>
                        )}
                    </figure>
                    <div className="flex justify-center gap-3 pb-6 sm:pointer-events-none sm:absolute sm:inset-x-6 sm:top-1/2 sm:justify-between sm:pb-0">
                        <button
                            type="button"
                            className={`${navButton} sm:pointer-events-auto`}
                            disabled={index === 0}
                            onClick={() => onIndexChange(index - 1)}
                        >
                            <ArrowLeft className="size-5" strokeWidth={1.75} />
                            <span className="sr-only">Previous photo</span>
                        </button>
                        <button
                            type="button"
                            className={`${navButton} sm:pointer-events-auto`}
                            disabled={index === photos.length - 1}
                            onClick={() => onIndexChange(index + 1)}
                        >
                            <ArrowRight className="size-5" strokeWidth={1.75} />
                            <span className="sr-only">Next photo</span>
                        </button>
                    </div>
                </div>
            )}
        </dialog>
    );
}

export default Lightbox;
