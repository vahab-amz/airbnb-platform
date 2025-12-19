import { ButtonProperties } from '@/components/ButtonProperties';
import { Button } from '@/components/ui/button';
import { WelcomingText } from '@/components/Welcoming';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function HomePage() {
    const t = useTranslations('HomePage');
    return (
        <main>
            <section className="h-screen w-full flex justify-center items-center">
                <Image
                    src="/images/hero/hero.png"
                    alt="Hero"
                    fill
                    priority
                    className="object-cover z-[-1]"
                />
                <div className="mb-20 md:m-0">
                    <WelcomingText />
                    <div className="mt-10 flex justify-center items-center gap-2">
                        <ButtonProperties />
                        <Button asChild variant="default">
                            <Link href="/barcelona">About the Area</Link>
                        </Button>
                    </div>
                </div>
            </section>
            <section className="h-100"></section>
        </main>
    );
}
