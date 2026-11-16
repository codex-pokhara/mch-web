import {
    type ComponentProps,
    type ReactNode,
    useState,
} from 'react';

type SafeImageProps = ComponentProps<'img'> & {
    /** Required: describe the photo, or pass "" when it is decorative. */
    alt: string;
    /** Rendered instead of the image when it is missing or fails to load. Defaults to nothing. */
    fallback?: ReactNode;
};

/**
 * An <img> that never shows the browser's broken-image icon.
 * CMS files can be missing or private on S3, so a failed load swaps in the fallback.
 */
function SafeImage({
    src,
    alt,
    fallback = null,
    onError,
    ...props
}: SafeImageProps) {
    const [failedSrc, setFailedSrc] = useState<string | undefined>(undefined);

    if (!src || failedSrc === src) {
        return fallback;
    }

    return (
        <img
            src={src}
            alt={alt}
            onError={(event) => {
                setFailedSrc(src);
                onError?.(event);
            }}
            {...props}
        />
    );
}

export default SafeImage;
