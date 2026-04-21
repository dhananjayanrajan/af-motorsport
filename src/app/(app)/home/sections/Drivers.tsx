import { Country, Driver, Media } from '@/payload-types';

interface TopDriversProps {
    drivers: Driver[];
}

const TopDrivers = ({ drivers }: TopDriversProps) => {
    const topDrivers = drivers.slice(0, 8);

    const getNationalityCode = (nationality: number | Country | null | undefined): string => {
        if (!nationality) return '';
        if (typeof nationality === 'object' && 'code' in nationality) {
            return nationality.code || '';
        }
        return '';
    };

    const getAvatarUrl = (avatar: number | Media | null | undefined): string => {
        if (!avatar) return '';
        if (typeof avatar === 'object' && 'url' in avatar) {
            return avatar.url || '';
        }
        return '';
    };

    return (
        <section className="w-full bg-black py-20 px-4 md:px-8 lg:px-16 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 border border-white rotate-45"></div>
                <div className="absolute top-1/2 left-1/3 w-48 h-48 border border-white transform -translate-x-1/2"></div>
            </div>

            <div className="max-w-[1600px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end border-b-2 border-white pb-8 mb-16">
                    <div>
                        <div className="text-red-600 text-sm font-mono tracking-[0.3em] mb-4">
                            ELITE COMPETITORS
                        </div>
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none">
                            TOP<br />DRIVERS
                        </h1>
                    </div>
                    <div className="mt-6 md:mt-0 text-right">
                        <div className="text-7xl md:text-8xl font-black text-white opacity-20">
                            01-{topDrivers.length.toString().padStart(2, '0')}
                        </div>
                        <div className="text-xs text-gray-400 font-mono tracking-wider mt-2">
                            WORLD RANKING
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-800">
                    {topDrivers.map((driver, index) => {
                        const racingNumber = driver.basics?.racing_number;
                        const fullName = [
                            driver.first_name,
                            driver.middle_name,
                            driver.last_name,
                        ].filter(Boolean).join(' ');
                        const nickname = driver.basics?.nickname;
                        const nationalityCode = getNationalityCode(driver.basics?.nationality);
                        const avatarUrl = getAvatarUrl(driver.assets?.avatar);
                        const competitionName = driver.basics?.competition_name;

                        return (
                            <div
                                key={driver.id}
                                className="group relative bg-gradient-to-br from-gray-900 to-black overflow-hidden cursor-pointer"
                            >
                                <div className="absolute top-4 left-4 z-20">
                                    <div className="bg-red-600 text-white text-2xl font-black w-16 h-16 flex items-center justify-center transform -rotate-6 shadow-xl">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </div>
                                </div>

                                <div className="absolute top-4 right-4 z-20">
                                    {racingNumber && (
                                        <div className="bg-white text-black text-3xl font-black w-16 h-16 flex items-center justify-center rounded-full shadow-xl">
                                            #{racingNumber}
                                        </div>
                                    )}
                                </div>

                                <div className="relative aspect-[3/4] overflow-hidden">
                                    {avatarUrl ? (
                                        <img
                                            src={avatarUrl}
                                            alt={fullName}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                            <div className="text-8xl font-black text-white opacity-20">
                                                {driver.first_name[0]}
                                                {driver.last_name[0]}
                                            </div>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {nationalityCode && (
                                        <div className="absolute bottom-4 left-4 z-20 bg-black/80 backdrop-blur-sm px-3 py-1">
                                            <span className="text-white text-xs font-mono font-bold tracking-wider">
                                                {nationalityCode}
                                            </span>
                                        </div>
                                    )}

                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/70 z-10">
                                        <button className="border-2 border-white text-white px-8 py-3 text-sm font-mono font-bold tracking-wider hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                                            VIEW PROFILE
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 border-t border-gray-800">
                                    <div className="mb-2">
                                        <h3 className="text-white text-xl font-bold uppercase tracking-tight">
                                            {fullName}
                                        </h3>
                                        {nickname && (
                                            <p className="text-red-500 text-sm font-mono mt-1">
                                                "{nickname}"
                                            </p>
                                        )}
                                    </div>
                                    {competitionName && (
                                        <div className="mt-3 pt-3 border-t border-gray-800">
                                            <p className="text-gray-400 text-xs font-mono tracking-wider">
                                                {competitionName}
                                            </p>
                                        </div>
                                    )}
                                    <div className="mt-4 flex gap-2">
                                        <div className="w-8 h-px bg-red-600"></div>
                                        <div className="w-16 h-px bg-gray-700"></div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-gray-800">
                    <div className="flex gap-8 mb-6 md:mb-0">
                        <div className="text-center">
                            <div className="text-3xl font-black text-white">
                                {drivers.length}+
                            </div>
                            <div className="text-xs text-gray-500 font-mono tracking-wider">
                                ACTIVE DRIVERS
                            </div>
                        </div>
                        <div className="w-px h-12 bg-gray-800"></div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-white">15+</div>
                            <div className="text-xs text-gray-500 font-mono tracking-wider">
                                NATIONALITIES
                            </div>
                        </div>
                        <div className="w-px h-12 bg-gray-800"></div>
                        <div className="text-center">
                            <div className="text-3xl font-black text-white">24/7</div>
                            <div className="text-xs text-gray-500 font-mono tracking-wider">
                                RACING ACTION
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button className="group relative px-8 py-4 bg-red-600 overflow-hidden transition-all duration-300 hover:bg-red-700">
                            <span className="relative z-10 text-sm font-mono font-bold tracking-wider text-white uppercase">
                                Full Roster
                            </span>
                        </button>
                        <button className="group relative px-8 py-4 border-2 border-white overflow-hidden transition-all duration-300 hover:bg-white">
                            <span className="relative z-10 text-sm font-mono font-bold tracking-wider text-white group-hover:text-black uppercase">
                                Hall of Fame
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
                    {['POWER', 'SPEED', 'PRECISION', 'GLORY'].map((stat, idx) => (
                        <div key={idx} className="text-center py-4 border border-gray-800 hover:border-red-600 transition-colors duration-300">
                            <div className="text-2xl font-black text-white mb-1">{stat}</div>
                            <div className="w-8 h-px bg-red-600 mx-auto mb-2"></div>
                            <div className="text-[10px] text-gray-500 font-mono tracking-wider">
                                {['MAXIMUM OUTPUT', 'TOP TIER', 'SURGICAL', 'LEGACY'][idx]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopDrivers;