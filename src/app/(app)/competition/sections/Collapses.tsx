'use client';

import { DESIGN_SYSTEM } from '@/lib/constants';
import { Car, Driver, Incident, Media } from '@/payload-types';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronRight, User, Users, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface IncidentsProps {
    incidents: Incident[];
}

export default function Incidents({ incidents }: IncidentsProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

    const miniBevel = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)";

    const handleIncidentClick = (incident: Incident) => {
        setSelectedIncident(incident);
        setSidebarOpen(true);
    };

    return (
        <section className="relative w-full border-t" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.WHITE[50], borderTopColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
            <div className="px-6 md:px-10 lg:px-20 py-16 lg:py-20 flex items-end justify-between border-b" style={{ borderBottomColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                            Race Control
                        </span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                        Incidents Log
                    </h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                        {incidents.length} Records
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {incidents.map((incident) => {
                    const drivers = incident.details?.drivers as Driver[];
                    const cars = incident.details?.cars as Car[];
                    const incidentImage = (incident.assets?.thumbnail as Media)?.url || (incident.assets?.thumbnail as Media)?.url;
                    const placeholderImage = `https://picsum.photos/seed/incident-${incident.id}/600/400`;

                    return (
                        <motion.div
                            key={incident.id}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="group relative border-r border-b last:border-r-0 cursor-pointer"
                            style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
                            onClick={() => handleIncidentClick(incident)}
                        >
                            <div className="relative aspect-video overflow-hidden" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                <img
                                    src={incidentImage || placeholderImage}
                                    alt={incident.name}
                                    className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700"
                                    onError={(e) => {
                                        e.currentTarget.src = placeholderImage;
                                    }}
                                />

                                <div className="absolute top-4 left-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 backdrop-blur-sm" style={{ backgroundColor: `${DESIGN_SYSTEM.COLORS.BLACK[600]}CC`, color: DESIGN_SYSTEM.COLORS.WHITE.PURE }}>
                                            INCIDENT #{incident.id}
                                        </span>
                                    </div>
                                </div>

                                <div className="absolute bottom-4 right-4">
                                    <div className="flex -space-x-2">
                                        {drivers?.slice(0, 3).map((driver) => {
                                            const avatarUrl = (driver.assets?.avatar as Media)?.url;
                                            return (
                                                <div key={driver.id} className="w-8 h-8 border-2 overflow-hidden" style={{ borderColor: DESIGN_SYSTEM.COLORS.WHITE.PURE, backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                                                    {avatarUrl ? (
                                                        <img src={avatarUrl} className="w-full h-full object-cover" alt="" />
                                                    ) : (
                                                        <User size={12} style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }} />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            {incident.details?.date_time && (
                                                <>
                                                    <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                        {new Date(incident.details.date_time).toLocaleDateString('en-GB')}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.ZINC[300] }} />
                                                </>
                                            )}
                                            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                ID: {incident.id}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-black uppercase italic tracking-tighter group-hover:text-primary-500 transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                            {incident.name}
                                        </h3>
                                    </div>
                                    <div
                                        className="w-8 h-8 flex items-center justify-center transition-all group-hover:bg-black"
                                        style={{
                                            clipPath: miniBevel,
                                            border: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[200]}`
                                        }}
                                    >
                                        <ChevronRight size={14} className="group-hover:text-white transition-colors" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }} />
                                    </div>
                                </div>

                                {incident.basics?.description && (
                                    <p className="text-xs font-bold uppercase leading-relaxed line-clamp-2 mb-4" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                                        {incident.basics.description}
                                    </p>
                                )}

                                <div className="flex items-center gap-4 pt-4 border-t" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                    <div className="flex items-center gap-2">
                                        <Users size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                        <span className="text-[9px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>
                                            {drivers?.length || 0} Drivers
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={12} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                        <span className="text-[9px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[600] }}>
                                            {cars?.length || 0} Cars
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Sidebar Drawer */}
            <AnimatePresence>
                {sidebarOpen && selectedIncident && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed right-0 top-0 h-full w-full max-w-2xl z-[101] overflow-y-auto"
                            style={{
                                backgroundColor: DESIGN_SYSTEM.COLORS.WHITE.PURE,
                                borderLeft: `1px solid ${DESIGN_SYSTEM.COLORS.ZINC[200]}`
                            }}
                        >
                            <div className="p-8 md:p-12">
                                <div className="flex items-start justify-between mb-8">
                                    <div>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-2 h-8" style={{ backgroundColor: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                Incident Dossier
                                            </span>
                                        </div>
                                        <h3 className="text-4xl font-black uppercase italic tracking-tighter" style={{ color: DESIGN_SYSTEM.COLORS.BLACK.PURE }}>
                                            {selectedIncident.name}
                                        </h3>
                                        {selectedIncident.alias && (
                                            <p className="text-sm font-black uppercase tracking-widest mt-2" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                                {selectedIncident.alias}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                        className="p-2 hover:bg-zinc-100 transition-colors"
                                        style={{ clipPath: miniBevel }}
                                    >
                                        <X size={20} style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }} />
                                    </button>
                                </div>

                                <div className="space-y-8">
                                    {selectedIncident.details?.date_time && (
                                        <div className="flex items-center gap-4 p-4 border" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}>
                                            <Calendar size={16} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                            <div>
                                                <span className="text-[8px] font-black uppercase tracking-widest block" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }}>
                                                    Date & Time
                                                </span>
                                                <span className="text-sm font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                    {new Date(selectedIncident.details.date_time).toLocaleString('en-GB', { hour12: false })}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {selectedIncident.basics?.description && (
                                        <p className="text-sm font-bold uppercase leading-relaxed" style={{ color: DESIGN_SYSTEM.COLORS.ZINC[500] }}>
                                            {selectedIncident.basics.description}
                                        </p>
                                    )}

                                    {/* Involved Drivers */}
                                    {selectedIncident.details?.drivers && (selectedIncident.details.drivers as Driver[]).length > 0 && (
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                <Users size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                Involved Drivers
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {(selectedIncident.details.drivers as Driver[]).map((driver) => (
                                                    <Link
                                                        key={driver.id}
                                                        href={`/team/driver/${driver.slug || '#'}`}
                                                        className="flex items-center gap-3 p-3 border hover:bg-zinc-50 transition-colors"
                                                        style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[100] }}
                                                    >
                                                        <div className="w-10 h-10 border overflow-hidden" style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}>
                                                            {(driver.assets?.avatar as Media)?.url ? (
                                                                <img src={(driver.assets?.avatar as Media).url!} className="w-full h-full object-cover" alt="" />
                                                            ) : (
                                                                <User size={20} style={{ color: DESIGN_SYSTEM.COLORS.ZINC[400] }} />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <span className="text-[10px] font-black uppercase block" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                                {driver.first_name} {driver.last_name}
                                                            </span>
                                                            <span className="text-[8px] font-black uppercase tracking-widest" style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }}>
                                                                {driver.basics?.callsign || `#${driver.basics?.racing_number || 'N/A'}`}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Involved Cars */}
                                    {selectedIncident.details?.cars && (selectedIncident.details.cars as Car[]).length > 0 && (
                                        <div className="space-y-4">
                                            <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                <Calendar size={14} style={{ color: DESIGN_SYSTEM.COLORS.PRIMARY[500] }} />
                                                Involved Cars
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {(selectedIncident.details.cars as Car[]).map((car) => (
                                                    <Link
                                                        key={car.id}
                                                        href={`/cars/${car.slug || car.id}`}
                                                        className="px-4 py-2 border hover:bg-primary-50 hover:border-primary-300 transition-colors"
                                                        style={{ borderColor: DESIGN_SYSTEM.COLORS.ZINC[200] }}
                                                    >
                                                        <span className="text-[10px] font-black uppercase" style={{ color: DESIGN_SYSTEM.COLORS.BLACK[600] }}>
                                                            {car.name}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}