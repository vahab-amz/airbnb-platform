'use client';

import { Portal } from '@/components/portal wrapper/Portal';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import type { Variants } from 'motion/react';
import { stagger } from 'motion/react';
import * as motion from 'motion/react-client';
import { useEffect, useRef, useState } from 'react';

const links = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/barcelona', label: 'Barcelona' },
    { href: '/contact', label: 'Contact Us' },
];

export default function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { height } = useDimensions(containerRef);

    return (
        <>
            <Portal>
                <MenuToggle
                    isOpen={isOpen}
                    toggle={() => setIsOpen((v) => !v)}
                />
                <div
                    className={[
                        'fixed inset-0 z-40',
                        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
                    ].join(' ')}
                >
                    <button
                        aria-label="Close menu overlay"
                        onClick={() => setIsOpen(false)}
                        className={[
                            'absolute inset-0 bg-black/30 transition-opacity duration-200',
                            isOpen ? 'opacity-100' : 'opacity-0',
                        ].join(' ')}
                    />

                    <motion.nav
                        initial={false}
                        animate={isOpen ? 'open' : 'closed'}
                        custom={height}
                        ref={containerRef}
                        className="absolute left-0 top-0 h-screen w-[300px]"
                    >
                        <motion.div
                            variants={sidebarVariants}
                            className="absolute inset-y-0 left-0 top-0 w-[300px] bg-slate-300"
                        />

                        <Navigation
                            isOpen={isOpen}
                            toChange={() => setIsOpen(false)}
                        />
                    </motion.nav>
                </div>
            </Portal>
        </>
    );
}

const navVariants = {
    open: {
        transition: { delayChildren: stagger(0.07, { startDelay: 0.2 }) },
    },
    closed: {
        transition: { delayChildren: stagger(0.05, { from: 'last' }) },
    },
};

const Navigation = ({
    isOpen,
    toChange,
}: {
    isOpen: boolean;
    toChange: () => void;
}) => (
    <motion.ul
        variants={navVariants}
        className={[
            'absolute top-20 w-full list-none m-0',
            isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
    >
        {links.map((link) => (
            <MenuItem key={link.href} link={link} toChange={toChange} />
        ))}
    </motion.ul>
);

const itemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: { y: { stiffness: 1000, velocity: -100 } },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: { y: { stiffness: 1000 } },
    },
};


type MenuItemProps = {
    toChange: () => void;
    link: { href: string; label: string };
};

const MenuItem = ({ toChange, link }: MenuItemProps ) => (
    <motion.li
        variants={itemVariants}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center justify-center list-none m-0 mb-5 cursor-pointer p-0"
    >
        <Button variant="link" onClick={toChange}>
            <Link href={link.href}>{link.label}</Link>
        </Button>
    </motion.li>
);

const sidebarVariants: Variants = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
        transition: { type: 'spring', stiffness: 20, restDelta: 2 },
    }),
    closed: {
        clipPath: 'circle(0 at 37px 47px)',
        transition: { delay: 0.2, type: 'spring', stiffness: 400, damping: 40 },
    },
};

interface PathProps {
    d?: string;
    variants: Variants;
    transition?: { duration: number };
}

const Path = (props: PathProps) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 0%, 18%)"
        strokeLinecap="round"
        {...props}
    />
);

const MenuToggle = ({
    toggle,
    isOpen,
}: {
    toggle: () => void;
    isOpen: boolean;
}) => (
    <button
        onClick={toggle}
        className="fixed z-[99999] left-4 top-6 h-[50px] w-[50px] cursor-pointer select-none rounded-full border-0 bg-transparent outline-none md:hidden"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
        <motion.svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            initial={false}
            animate={isOpen ? 'open' : 'closed'}
            className="mx-auto"
        >
            <Path
                variants={{
                    closed: { d: 'M 2 2.5 L 20 2.5' },
                    open: { d: 'M 3 16.5 L 17 2.5' },
                }}
            />
            <Path
                d="M 2 9.423 L 20 9.423"
                variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 },
                }}
                transition={{ duration: 0.1 }}
            />
            <Path
                variants={{
                    closed: { d: 'M 2 16.346 L 20 16.346' },
                    open: { d: 'M 3 2.5 L 17 16.346' },
                }}
            />
        </motion.svg>
    </button>
);

const useDimensions = (ref: React.RefObject<HTMLDivElement | null>) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (ref.current) {
            setDimensions({
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight,
            });
        }
    }, [ref]);

    return dimensions;
};
