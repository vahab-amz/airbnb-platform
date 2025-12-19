'use client';

import LanguageDropdown from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/navigation';

const links = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/barcelona', label: 'Barcelona' },
    { href: '/contact', label: 'Contact Us' },
];

function NormalMenu({ isScrolled }: { isScrolled: boolean }) {
    const pathname = usePathname();

    return (
            <ul className="w-full flex justify-center p-2">
                {links.map((link) => {
                    const isActive: boolean =
                        link.href === '/'
                            ? pathname === '/'
                            : pathname.startsWith(link.href);
                    return (
                        <li key={link.href}>
                            <Button
                                asChild
                                variant={isActive ? 'linkActive' : 'link'}
                                className={isScrolled ? 'text-white' : ''}
                            >
                                <Link href={link.href} className="mx-3">
                                    {link.label}
                                </Link>
                            </Button>
                        </li>
                    );
                })}
                <li className="absolute end-7">
                    <LanguageDropdown isScrolled={isScrolled} />
                </li>
            </ul>
    );
}

export default NormalMenu;
