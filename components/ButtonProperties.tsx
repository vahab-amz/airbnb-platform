'use client';
import { Link } from '@/i18n/navigation';
import { HoverBorderGradient } from './ui/hover-border-gradient';

export function ButtonProperties() {
    return (
        <div className="flex justify-center text-center">
            <HoverBorderGradient
                containerClassName="rounded-full p-[2px] "
                duration={1}
                as="button"
                className="bg-white text-black flex items-center space-x-2 cursor-pointer"
            >
                <Link href="/properties">View Properties</Link>
            </HoverBorderGradient>
        </div>
    );
}
