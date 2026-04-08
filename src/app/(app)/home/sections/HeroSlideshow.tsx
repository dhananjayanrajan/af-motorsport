import { Media, Slide } from '@/payload-types';

interface HeroSlideshowProps {
    slides: Slide[];
}

const PLACEHOLDER_SLIDES: Slide[] = [
    {
        id: 0,
        name: "AF Motorsport",
        alias: "welcome",
        basics: {
            description: "Experience the pinnacle of competitive racing engineering.",
            tagline: "Engineering Performance",
        },
        details: {
            template: "bold",
            duration: 5,
            order: 1,
        },
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
    } as Slide
];

export default function HeroSlideshow({ slides }: HeroSlideshowProps) {
    const displaySlides = slides.length > 0 ? slides : PLACEHOLDER_SLIDES;

    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            {displaySlides.map((slide) => (
                <div key={slide.id} className="relative w-full h-full flex items-center justify-center">
                    {slide.assets?.background && typeof slide.assets.background !== 'number' && (
                        <div className="absolute inset-0 z-0">
                            <img
                                src={(slide.assets.background as Media).url || ''}
                                alt={(slide.assets.background as Media).alt || slide.name}
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        </div>
                    )}

                    <div className="relative z-10 text-center px-4 max-w-5xl">
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white italic">
                            {slide.name}
                        </h1>

                        {slide.basics?.description && (
                            <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                                {slide.basics.description}
                            </p>
                        )}

                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <button className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors duration-300">
                                Explore Series
                            </button>
                            <button className="px-8 py-4 border border-white text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300">
                                Latest Results
                            </button>
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-10 hidden md:block">
                        <div className="flex items-center gap-4">
                            <span className="text-white text-[10px] font-mono tracking-[0.3em] uppercase opacity-40">
                                System // {slide.details?.template || 'standard'}
                            </span>
                            <div className="h-[1px] w-8 bg-white opacity-20" />
                            <span className="text-white text-[10px] font-mono tracking-[0.3em] uppercase opacity-40">
                                Ref // {slide.id}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}