'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

const LOCALES = [
    {
        Language: 'es',
        name : 'Español'
    },
    {
        Language: 'en',
        name : 'English'
    }
];

export default function LanguageDropdown({ isScrolled }: { isScrolled: boolean }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const cleanPath = pathname.replace(/^\/(en|es)(?=\/|$)/, '') || '/';

    const changeLang = (next : string ) => {
        router.replace(cleanPath, { locale: next });
    };

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    type="button"
                    size="icon"
                    aria-label="Switch language"
                >
                    <Languages className="h-5 w-5" color={isScrolled ? '#ffffff' : '#000000'}/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                {LOCALES.map((lang) => (
                    <DropdownMenuItem key={lang.Language} onClick={() => changeLang(lang.Language)}>
                        {lang.name}
                        {locale === lang.Language ? ' ✓' : ''}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
