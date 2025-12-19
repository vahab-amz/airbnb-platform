'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';
import HamburgerMenu from './layout/hamburgerMenu';
import LanguageDropdown from './LanguageSwitcher';
import NormalMenu from './layout/normalMenu';

function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setScrolled(currentY > 10);
            setLastScrollY(currentY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <div
            className={clsx(
                ' relative w-full shadow-xl/30 mx-auto rounded-full mt-6 transition-all duration-500 py-1 md:p-0',
                scrolled
                    ? 'md:max-w-[800px] backdrop-blur-xl md:translate-y-2'
                    : 'md:max-w-[1000px] bg-[#FAF9F6]',
            )}
        >
            <div className="md:hidden relative flex justify-end px-2">
                <HamburgerMenu />
                <LanguageDropdown isScrolled={scrolled} />
            </div>
            <div className="hidden md:block">
                <NormalMenu isScrolled={scrolled} />
            </div>
        </div>
    );
}

export default Navigation;
