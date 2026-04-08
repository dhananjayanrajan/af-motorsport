// Series
export interface Series {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
            abbreviation?: string | null;
        };
        tagline?: string | null;
        description?: string | null;
    };
    details?: {
        status?: ('Active' | 'Inactive' | 'Defunct' | 'Upcoming' | 'Rebranded' | 'Merged' | 'Sanctioned') | null;
        access?: ('Public' | 'Private' | 'InviteOnly' | 'MemberOnly' | 'VIP') | null;
        agenda?: string | null;
        history?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        predecessor?: (number | null) | Series;
        successor?: (number | null) | Series;
        start_date?: string | null;
        end_date?: string | null;
        location?: [number, number] | null;
    };
    assets?: {
        logo?: (number | null) | Media;
        thumbnail?: (number | null) | Media;
        cover?: (number | null) | Media;
        documents?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Media
export interface Media {
    id: number;
    alt?: string | null;
    caption?: {
        root: {
            type: string;
            children: {
                type: any;
                version: number;
                [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
        };
        [k: string]: unknown;
    } | null;
    updatedAt: string;
    createdAt: string;
    url?: string | null;
    thumbnailURL?: string | null;
    filename?: string | null;
    mimeType?: string | null;
    filesize?: number | null;
    width?: number | null;
    height?: number | null;
    focalX?: number | null;
    focalY?: number | null;
}

// Category
export interface Category {
    id: number;
    name: string;
    basics?: {
        description?: string | null;
    };
    details?: {
        type?:
        | {
            label?: string | null;
            value?: string | null;
            id?: string | null;
        }[]
        | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Tag
export interface Tag {
    id: number;
    name: string;
    type?: (number | Category)[] | null;
    basics?: {
        description?: string | null;
        context?: string | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Season
export interface Season {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
            abbreviation?: string | null;
        };
        tagline?: string | null;
        description?: string | null;
    };
    details: {
        series: number | Series;
        history?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        entries?: number | null;
        races?: number | null;
        notes?: string | null;
    };
    assets?: {
        cover?: (number | null) | Media;
        trailer?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
        highlights?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Event
export interface Event {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
        };
        tagline?: string | null;
        description?: string | null;
    };
    details: {
        status?: ('Scheduled' | 'Confirmed' | 'Completed' | 'Cancelled' | 'Postponed' | 'Abandoned') | null;
        access?: ('Public' | 'Private' | 'InviteOnly' | 'MemberOnly' | 'VIP') | null;
        season: number | Season;
        location?: [number, number] | null;
        history?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        start_date?: string | null;
        end_date?: string | null;
        notes?: string | null;
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        poster?: (number | null) | Media;
        cover?: (number | null) | Media;
        videos?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Session
export interface Session {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
        };
        segment?: string | null;
        description?: string | null;
    };
    details?: {
        access?: ('public' | 'private' | 'exclusive') | null;
        specification?: string | null;
        history?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        notes?: string | null;
    };
    metrics?: {
        quantifiers?: {
            laps?: number | null;
            distance?: number | null;
            duration?: number | null;
            interval?: number | null;
            specification?: string | null;
        };
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
        videos?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Entry
export interface Entry {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            number?: string | null;
            plate?: string | null;
        };
        description?: string | null;
    };
    details: {
        session: number | Session;
        status?:
        | (
            | 'Entered'
            | 'Confirmed'
            | 'Withdrawn'
            | 'Disqualified'
            | 'DidNotStart'
            | 'DidNotFinish'
            | 'Classified'
            | 'NotClassified'
            | 'Provisional'
            | 'Excluded'
        )
        | null;
        grid_position?: number | null;
        start_position?: number | null;
        finish_position?: number | null;
        laps_position?: number | null;
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Result
export interface Result {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: string | null;
    };
    details?: {
        status?: ('Official' | 'Provisional' | 'Corrected' | 'Historic' | 'Estimated' | 'Certified' | 'Void') | null;
        overall?: number | null;
        class?: number | null;
        order?: number | null;
        interval?: number | null;
        gap?: number | null;
        state?: number | null;
        laps?: number | null;
        time?: number | null;
        speed?: number | null;
        distance?: number | null;
        notes?: string | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Point
export interface Point {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: string | null;
    };
    details?: {
        scale?: ('standard' | 'inverse' | 'logarithmic' | 'multiplier' | 'fixed') | null;
        value?: number | null;
        before?: number | null;
        after?: number | null;
        delta?: number | null;
        condition?: number | null;
        adjustment?: number | null;
        impact?: string | null;
        notes?: string | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Circuit
export interface Circuit {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
            abbreviation?: string | null;
        };
        tagline?: string | null;
        description?: string | null;
    };
    details?: {
        type?: ('permanent' | 'street' | 'temporary' | 'roval' | 'mixed') | null;
        length_km?: number | null;
        length_miles?: number | null;
        turns?: number | null;
        drs_zones?: number | null;
        direction?: ('clockwise' | 'anticlockwise') | null;
        fia_grade?: ('1' | '1T' | '2' | '3' | '4') | null;
        elevation_change?: number | null;
        capacity?: number | null;
        location?: [number, number] | null;
        address?: string | null;
        country?: (number | null) | Country;
        opened?: string | null;
        closed?: string | null;
        renovated?: {
            list?:
            | {
                year?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        owner?: (number | null) | Organization;
        operator?: (number | null) | Organization;
        website?: string | null;
        history?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        notes?: string | null;
    };
    metrics?: {
        record_lap_time?: string | null;
        record_lap_driver?: (number | null) | Driver;
        record_lap_year?: string | null;
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        cover?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
        circuit_map?: (number | null) | Media;
        video?: (number | null) | Media;
        documents?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Country
export interface Country {
    id: number;
    name: string;
    code: string;
    basics?: {
        flag?: (number | null) | Media;
        description?: string | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Organization
export interface Organization {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
        };
        tagline?: string | null;
        description?: string | null;
        type?:
        | (
            | 'sponsors'
            | 'investors'
            | 'partners'
            | 'supporters'
            | 'promoters'
            | 'organizers'
            | 'media'
            | 'government'
            | 'NGO'
            | 'developers'
            | 'distributors'
            | 'retailers'
            | 'manufacturers'
            | 'suppliers'
        )
        | null;
    };
    details?: {
        history?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        founded?: string | null;
        merged?: string | null;
        rebranded?: string | null;
        defunct?: string | null;
        prestige?: ('unknown' | 'emerging' | 'established' | 'prestigious' | 'iconic') | null;
        impact?:
        | (
            | 'low'
            | 'medium'
            | 'deep'
            | 'heavy'
            | 'profound'
            | 'rare'
            | 'catastrophic'
            | 'moderate'
            | 'minor'
            | 'negligible'
            | 'major'
            | 'severe'
            | 'permanent'
            | 'temporary'
        )
        | null;
        benefits?: {
            list?:
            | {
                name?: string | null;
                description?: string | null;
                type?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        websites?: {
            list?:
            | {
                name?: string | null;
                path?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        socials?: {
            list?:
            | {
                platform?:
                | (
                    | 'Twitter'
                    | 'Instagram'
                    | 'Facebook'
                    | 'LinkedIn'
                    | 'TikTok'
                    | 'YouTube'
                    | 'Twitch'
                    | 'Discord'
                    | 'Telegram'
                    | 'WhatsApp'
                )
                | null;
                username?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    assets?: {
        logo?: (number | null) | Media;
        alt_logo?: (number | null) | Media;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Driver
export interface Driver {
    id: number;
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    alias?: string | null;
    basics?: {
        racing_number?: number | null;
        nickname?: string | null;
        competition_name?: string | null;
        callsign?: string | null;
        catchphrase?: string | null;
        birth_date?: string | null;
        debut_date?: string | null;
        retirement_date?: string | null;
        nationality?: (number | null) | Country;
        gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
        pronouns?: string | null;
    };
    details?: {
        story?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        biography?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        addresses?: {
            list?:
            | {
                name?: string | null;
                label?: string | null;
                description?: string | null;
                location?: [number, number] | null;
                id?: string | null;
            }[]
            | null;
        };
        websites?: {
            list?:
            | {
                name?: string | null;
                path?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        socials?: {
            list?:
            | {
                platform?:
                | (
                    | 'Twitter'
                    | 'Instagram'
                    | 'Facebook'
                    | 'LinkedIn'
                    | 'TikTok'
                    | 'YouTube'
                    | 'Twitch'
                    | 'Discord'
                    | 'Telegram'
                    | 'WhatsApp'
                )
                | null;
                username?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        skills?: (number | Skill)[] | null;
        points?: (number | Point)[] | null;
        results?: (number | Result)[] | null;
        awards?: (number | Award)[] | null;
        cars?: (number | Car)[] | null;
    };
    assets?: {
        avatar?: (number | null) | Media;
        autograph?: (number | null) | Media;
        cover?: (number | null) | Media;
        gallery?: {
            list?:
            | {
                image: number | Media;
                caption?: string | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Skill
export interface Skill {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: string | null;
    };
    details?: {
        scale?: ('Narrow' | 'Moderate' | 'Broad' | 'Comprehensive') | null;
        depth?: ('Basic' | 'Intermediate' | 'Advanced' | 'Expert') | null;
        rarity?: ('Common' | 'Uncommon' | 'Rare' | 'Unique') | null;
        complexity?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
        specifications?: {
            list?:
            | {
                parameter?: string | null;
                value?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        features?: {
            list?:
            | {
                name?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Award
export interface Award {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: string | null;
    };
    details?: {
        story?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        awarded_date?: string | null;
        awarded_location?: [number, number] | null;
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        candid?: (number | null) | Media;
        video?: (number | null) | Media;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Car
export interface Car {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            chassis?: string | null;
            model?: string | null;
            version?: string | null;
        };
        tagline?: string | null;
        description?: string | null;
    };
    details?: {
        status?: ('Active' | 'Retired' | 'Development' | 'Museum' | 'Prototype' | 'Concept') | null;
        history?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        manufacturers?: (number | Organization)[] | null;
        members?: (number | Member)[] | null;
        classifications?: {
            list?:
            | {
                name?: string | null;
                criteria?: string | null;
                definition?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        specifications?: {
            list?:
            | {
                parameter?: string | null;
                value?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    assets?: {
        avatar?: (number | null) | Media;
        thumbnail?: (number | null) | Media;
        cover?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
        video?: (number | null) | Media;
        documents?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Member
export interface Member {
    id: number;
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    alias?: string | null;
    basics?: {
        nickname?: string | null;
        description?: string | null;
        gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
        pronouns?: string | null;
        nationality?: (number | null) | Country;
        birth_date?: string | null;
        joining_date?: string | null;
        retirement_date?: string | null;
    };
    details?: {
        duties?: string | null;
        skills?: (number | Skill)[] | null;
        trainings?: (number | Training)[] | null;
        addresses?: {
            list?:
            | {
                name?: string | null;
                label?: string | null;
                description?: string | null;
                location?: [number, number] | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    assets?: {
        avatar?: (number | null) | Media;
        cover?: (number | null) | Media;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Training
export interface Training {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        intensity?: ('low' | 'medium' | 'high' | 'extreme') | null;
        format?: ('individual' | 'group' | 'lecture' | 'hands_on' | 'simulated' | 'remote' | 'classroom') | null;
    };
    details?: {
        start_date?: string | null;
        end_date?: string | null;
        specifications?: {
            list?:
            | {
                parameter?: string | null;
                value?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        expectations?: {
            list?:
            | {
                name?: string | null;
                type?: string | null;
                criteria?: string | null;
                statement?: string | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    assets?: {
        gallery?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Championship
export interface Championship {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
            abbreviation?: string | null;
        };
        tagline?: string | null;
        description?: string | null;
    };
    details?: {
        history?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        regulations?: (number | null) | Regulation;
        format?: string | null;
        points_system?: (number | null) | Point;
        standings_scope?: ('season_only' | 'rolling' | 'cumulative') | null;
        start_date?: string | null;
        end_date?: string | null;
        season?: (number | null) | Season;
        series?: (number | null) | Series;
        winner?: (number | null) | Driver;
        runner_up?: (number | null) | Driver;
        third_place?: (number | null) | Driver;
        notes?: string | null;
    };
    assets?: {
        trophy?: (number | null) | Media;
        thumbnail?: (number | null) | Media;
        cover?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
        video?: (number | null) | Media;
        documents?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Regulation
export interface Regulation {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: string | null;
        status?: ('Published' | 'Draft' | 'Archived') | null;
        code?: string | null;
        version?: string | null;
        effective_date?: string | null;
        document?: (number | null) | Media;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Race
export interface Race {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
            abbreviation?: string | null;
        };
        tagline?: string | null;
        description?: string | null;
    };
    details: {
        history?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        type?: ('sprint' | 'feature' | 'qualifying_race' | 'heat' | 'final' | 'knockout') | null;
        status?: ('scheduled' | 'ongoing' | 'completed' | 'cancelled' | 'postponed') | null;
        start_date?: string | null;
        end_date?: string | null;
        event: number | Event;
        season?: (number | null) | Season;
        series?: (number | null) | Series;
        circuit?: (number | null) | Circuit;
        laps?: number | null;
        distance_km?: number | null;
        winner?: (number | null) | Driver;
        pole_position?: (number | null) | Entry;
        fastest_lap?: (number | null) | Entry;
        fastest_lap_time?: string | null;
        weather?: string | null;
        safety_car_periods?: number | null;
        red_flags?: number | null;
        notes?: string | null;
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        poster?: (number | null) | Media;
        cover?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
        video?: (number | null) | Media;
        highlights?: (number | Media)[] | null;
        documents?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Team
export interface Team {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        tagline?: string | null;
        description?: string | null;
    };
    details?: {
        history?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        country?: (number | null) | Country;
        start_date?: string | null;
        end_date?: string | null;
        website?: string | null;
    };
    assets?: {
        logo?: (number | null) | Media;
        cover?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Leader
export interface Leader {
    id: number;
    first_name: string;
    middle_name?: string | null;
    last_name: string;
    alias?: string | null;
    basics?: {
        nickname?: string | null;
        title?: string | null;
        gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
        nationality?: (number | null) | Country;
        birth_date?: string | null;
        debut_date?: string | null;
        retirement_date?: string | null;
    };
    details?: {
        vision?: string | null;
        mission?: string | null;
        quote?: string | null;
        designations?: (number | Designation)[] | null;
        biography?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        history?: string | null;
        awards?: (number | Award)[] | null;
        principles?: {
            list?:
            | {
                name?: string | null;
                description?: string | null;
                statement?: string | null;
                application?: string | null;
                rationale?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        websites?: {
            list?:
            | {
                name?: string | null;
                path?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        socials?: {
            list?:
            | {
                platform?:
                | (
                    | 'Twitter'
                    | 'Instagram'
                    | 'Facebook'
                    | 'LinkedIn'
                    | 'TikTok'
                    | 'YouTube'
                    | 'Twitch'
                    | 'Discord'
                    | 'Telegram'
                    | 'WhatsApp'
                )
                | null;
                username?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    assets?: {
        avatar?: (number | null) | Media;
        cover?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Designation
export interface Designation {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: string | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Individual
export interface Individual {
    id: number;
    first_name: string;
    last_name: string;
    alias?: string | null;
    basics?: {
        type?: ('mentor' | 'trainee' | 'intern' | 'advisor' | 'consultant' | 'guest') | null;
        description?: string | null;
        is_contact?: boolean | null;
        gender?: ('Male' | 'Female' | 'NonBinary' | 'Undisclosed') | null;
        pronouns?: string | null;
    };
    assets?: {
        avatar?: (number | null) | Media;
        thumbnail?: (number | null) | Media;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// User
export interface User {
    id: number;
    name?: string | null;
    roles?: ('admin' | 'race_admin' | 'commercial' | 'content' | 'technical' | 'hr' | 'archive' | 'customer')[] | null;
    orders?: {
        docs?: (number | Order)[];
        hasNextPage?: boolean;
        totalDocs?: number;
    };
    cart?: {
        docs?: (number | Cart)[];
        hasNextPage?: boolean;
        totalDocs?: number;
    };
    addresses?: {
        docs?: (number | Address)[];
        hasNextPage?: boolean;
        totalDocs?: number;
    };
    updatedAt: string;
    createdAt: string;
    email: string;
    resetPasswordToken?: string | null;
    resetPasswordExpiration?: string | null;
    salt?: string | null;
    hash?: string | null;
    loginAttempts?: number | null;
    lockUntil?: string | null;
    sessions?:
    | {
        id: string;
        createdAt?: string | null;
        expiresAt: string;
    }[]
    | null;
    password?: string | null;
    collection: 'users';
}

// Order
export interface Order {
    id: number;
    items?:
    | {
        product?: (number | null) | Product;
        variant?: (number | null) | Variant;
        quantity: number;
        id?: string | null;
    }[]
    | null;
    shippingAddress?: {
        title?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine1?: string | null;
        addressLine2?: string | null;
        city?: string | null;
        state?: string | null;
        postalCode?: string | null;
        country?: string | null;
        phone?: string | null;
    };
    customer?: (number | null) | User;
    customerEmail?: string | null;
    transactions?: (number | Transaction)[] | null;
    status?: OrderStatus;
    amount?: number | null;
    currency?: 'USD' | null;
    updatedAt: string;
    createdAt: string;
}

// Product
export interface Product {
    id: number;
    title: string;
    description?: {
        root: {
            type: string;
            children: {
                type: any;
                version: number;
                [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
        };
        [k: string]: unknown;
    } | null;
    gallery?:
    | {
        image?: (number | null) | Media;
        variantOption?: (number | null) | VariantOption;
        id?: string | null;
    }[]
    | null;
    layout?: (CallToActionBlock | ContentBlock | MediaBlock)[] | null;
    inventory?: number | null;
    enableVariants?: boolean | null;
    variantTypes?: (number | VariantType)[] | null;
    variants?: {
        docs?: (number | Variant)[];
        hasNextPage?: boolean;
        totalDocs?: number;
    };
    priceInUSDEnabled?: boolean | null;
    priceInUSD?: number | null;
    relatedProducts?: (number | Product)[] | null;
    meta?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    categories?: (number | Category)[] | null;
    generateSlug?: boolean | null;
    slug: string;
    updatedAt: string;
    createdAt: string;
    deletedAt?: string | null;
    _status?: ('draft' | 'published') | null;
}

// VariantOption
export interface VariantOption {
    id: number;
    _variantOptions_options_order?: string | null;
    variantType: number | VariantType;
    label: string;
    value: string;
    updatedAt: string;
    createdAt: string;
    deletedAt?: string | null;
}

// VariantType
export interface VariantType {
    id: number;
    label: string;
    name: string;
    options?: {
        docs?: (number | VariantOption)[];
        hasNextPage?: boolean;
        totalDocs?: number;
    };
    updatedAt: string;
    createdAt: string;
    deletedAt?: string | null;
}

// CallToActionBlock
export interface CallToActionBlock {
    richText?: {
        root: {
            type: string;
            children: {
                type: any;
                version: number;
                [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
        };
        [k: string]: unknown;
    } | null;
    links?:
    | {
        link: {
            type?: ('reference' | 'custom') | null;
            newTab?: boolean | null;
            reference?: {
                relationTo: 'pages';
                value: number | Page;
            } | null;
            url?: string | null;
            label: string;
            appearance?: ('default' | 'outline') | null;
        };
        id?: string | null;
    }[]
    | null;
    id?: string | null;
    blockName?: string | null;
    blockType: 'cta';
}

// Page
export interface Page {
    id: number;
    basics?: {};
    details?: {};
    traits?: {};
    metrics?: {};
    assets?: {};
    contexts?: {};
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// ContentBlock
export interface ContentBlock {
    columns?:
    | {
        size?: ('oneThird' | 'half' | 'twoThirds' | 'full') | null;
        richText?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        enableLink?: boolean | null;
        link?: {
            type?: ('reference' | 'custom') | null;
            newTab?: boolean | null;
            reference?: {
                relationTo: 'pages';
                value: number | Page;
            } | null;
            url?: string | null;
            label: string;
            appearance?: ('default' | 'outline') | null;
        };
        id?: string | null;
    }[]
    | null;
    id?: string | null;
    blockName?: string | null;
    blockType: 'content';
}

// MediaBlock
export interface MediaBlock {
    media: number | Media;
    id?: string | null;
    blockName?: string | null;
    blockType: 'mediaBlock';
}

// Variant
export interface Variant {
    id: number;
    title?: string | null;
    product: number | Product;
    options: (number | VariantOption)[];
    inventory?: number | null;
    priceInUSDEnabled?: boolean | null;
    priceInUSD?: number | null;
    updatedAt: string;
    createdAt: string;
    deletedAt?: string | null;
    _status?: ('draft' | 'published') | null;
}

// Transaction
export interface Transaction {
    id: number;
    items?:
    | {
        product?: (number | null) | Product;
        variant?: (number | null) | Variant;
        quantity: number;
        id?: string | null;
    }[]
    | null;
    paymentMethod?: 'stripe' | null;
    stripe?: {
        customerID?: string | null;
        paymentIntentID?: string | null;
    };
    billingAddress?: {
        title?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        addressLine1?: string | null;
        addressLine2?: string | null;
        city?: string | null;
        state?: string | null;
        postalCode?: string | null;
        country?: string | null;
        phone?: string | null;
    };
    status: 'pending' | 'succeeded' | 'failed' | 'cancelled' | 'expired' | 'refunded';
    customer?: (number | null) | User;
    customerEmail?: string | null;
    order?: (number | null) | Order;
    cart?: (number | null) | Cart;
    amount?: number | null;
    currency?: 'USD' | null;
    updatedAt: string;
    createdAt: string;
}

// Cart
export interface Cart {
    id: number;
    items?:
    | {
        product?: (number | null) | Product;
        variant?: (number | null) | Variant;
        quantity: number;
        id?: string | null;
    }[]
    | null;
    secret?: string | null;
    customer?: (number | null) | User;
    purchasedAt?: string | null;
    status?: ('active' | 'purchased' | 'abandoned') | null;
    subtotal?: number | null;
    currency?: 'USD' | null;
    updatedAt: string;
    createdAt: string;
}

// Address
export interface Address {
    id: number;
    customer?: (number | null) | User;
    title?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    company?: string | null;
    addressLine1?: string | null;
    addressLine2?: string | null;
    city?: string | null;
    state?: string | null;
    postalCode?: string | null;
    country:
    | 'US'
    | 'GB'
    | 'CA'
    | 'AU'
    | 'AT'
    | 'BE'
    | 'BR'
    | 'BG'
    | 'CY'
    | 'CZ'
    | 'DK'
    | 'EE'
    | 'FI'
    | 'FR'
    | 'DE'
    | 'GR'
    | 'HK'
    | 'HU'
    | 'IN'
    | 'IE'
    | 'IT'
    | 'JP'
    | 'LV'
    | 'LT'
    | 'LU'
    | 'MY'
    | 'MT'
    | 'MX'
    | 'NL'
    | 'NZ'
    | 'NO'
    | 'PL'
    | 'PT'
    | 'RO'
    | 'SG'
    | 'SK'
    | 'SI'
    | 'ES'
    | 'SE'
    | 'CH';
    phone?: string | null;
    updatedAt: string;
    createdAt: string;
}

// Meetup
export interface Meetup {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: string | null;
    };
    details: {
        format?: ('in_person' | 'virtual' | 'hybrid') | null;
        access?: ('public' | 'invite_only' | 'private' | 'exclusive') | null;
        start_date: string;
        end_date?: string | null;
        locations?: [number, number] | null;
        notes?: string | null;
        hosts?: {
            organizations?: (number | Organization)[] | null;
            leaders?: (number | Leader)[] | null;
            individuals?: (number | Individual)[] | null;
        };
        attendees?: {
            drivers?: (number | Driver)[] | null;
            members?: (number | Member)[] | null;
            leaders?: (number | Leader)[] | null;
            individuals?: (number | Individual)[] | null;
            organizations?: (number | Organization)[] | null;
        };
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        cover?: (number | null) | Media;
        video?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
        documents?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Initiative
export interface Initiative {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        tagline?: string | null;
        mission?: string | null;
        description?: string | null;
    };
    details?: {
        start_date?: string | null;
        end_date?: string | null;
        locations?: [number, number] | null;
        expectations?: {
            list?:
            | {
                name?: string | null;
                type?: string | null;
                criteria?: string | null;
                statement?: string | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        candid?: (number | null) | Media;
        cover?: (number | null) | Media;
        documents?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Vacancy
export interface Vacancy {
    id: number;
    name: string;
    alias?: string | null;
    basics: {
        title: string;
        description?: string | null;
    };
    details?: {
        department?: string | null;
        contract?: ('full_time' | 'part_time' | 'reserve' | 'test') | null;
        locations?: [number, number] | null;
        specifications?: {
            list?:
            | {
                parameter?: string | null;
                value?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        expectations?: {
            list?:
            | {
                name?: string | null;
                type?: string | null;
                criteria?: string | null;
                statement?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        positions?: {
            list?:
            | {
                title?: string | null;
                start?: string | null;
                end?: string | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    assets?: {
        thumbnail?: (number | null) | Media;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Onboarding
export interface Onboarding {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
        };
        description?: string | null;
    };
    details: {
        type?: ('driver' | 'member' | 'leader' | 'partner' | 'volunteer') | null;
        format?: ('in_person' | 'virtual' | 'hybrid' | 'self_paced') | null;
        status?: ('draft' | 'active' | 'completed' | 'archived') | null;
        start_date?: string | null;
        end_date?: string | null;
        assigned_to: number | Individual;
        assigned_by?: (number | null) | Member;
        feedback?: string | null;
        notes?: string | null;
    };
    traits?: {
        checklist?: {
            list?:
            | {
                task?: string | null;
                required?: boolean | null;
                completed?: boolean | null;
                due_date?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        modules?: {
            list?:
            | {
                name?: string | null;
                duration?: string | null;
                type?: string | null;
                content?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        quizzes?: {
            list?:
            | {
                question?: string | null;
                answer?: string | null;
                explanation?: string | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    assets?: {
        documents?: (number | Media)[] | null;
        videos?: (number | Media)[] | null;
        completion_certificate?: (number | null) | Media;
        thumbnail?: (number | null) | Media;
        cover?: (number | null) | Media;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Hospitality
export interface Hospitality {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
        };
        tagline?: string | null;
        description?: string | null;
    };
    details?: {
        type?:
        | (
            | 'paddock_club'
            | 'vip_suite'
            | 'garage_tour'
            | 'driver_meet_greet'
            | 'track_walk'
            | 'champagne_celebration'
            | 'private_dining'
            | 'general_admission_vip'
        )
        | null;
        status?: ('available' | 'sold_out' | 'cancelled' | 'private_only' | 'coming_soon') | null;
        access?: ('public' | 'members_only' | 'partners_only' | 'invite_only' | 'drivers_and_family') | null;
        capacity?: number | null;
        price_per_guest?: number | null;
        location?: [number, number] | null;
        start_date?: string | null;
        end_date?: string | null;
        event?: (number | null) | Event;
        history?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        inclusions?: {
            list?:
            | {
                name?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        exclusions?: {
            list?:
            | {
                name?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        requirements?: {
            list?:
            | {
                name?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        notes?: string | null;
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        cover?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
        documents?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Celebration
export interface Celebration {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: string | null;
    };
    details?: {
        exclusivity?: ('public' | 'private') | null;
        date_time?: string | null;
        location?: [number, number] | null;
        story?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        leaders?: (number | Leader)[] | null;
        drivers?: (number | Driver)[] | null;
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        video?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Interview
export interface Interview {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
        };
        tagline?: string | null;
        description?: string | null;
        summary?: string | null;
    };
    details: {
        format?: ('one_on_one' | 'panel' | 'press_conference' | 'remote' | 'pit_lane' | 'podium') | null;
        language?: string | null;
        duration?: number | null;
        recorded_date?: string | null;
        published_date?: string | null;
        status?: ('draft' | 'scheduled' | 'recorded' | 'published' | 'archived') | null;
        access?: ('public' | 'exclusive' | 'team_only' | 'media_only') | null;
        interviewer?: (number | null) | Individual;
        interviewee: number | Individual;
        session?: (number | null) | Session;
        location?: [number, number] | null;
        tags?: {
            list?:
            | {
                name?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        notes?: string | null;
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        cover?: (number | null) | Media;
        video?: (number | null) | Media;
        audio?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
        documents?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Incident
export interface Incident {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: string | null;
    };
    details?: {
        date_time?: string | null;
        story?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        location?: [number, number] | null;
        cars?: (number | Car)[] | null;
        drivers?: (number | Driver)[] | null;
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        video?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Helmet
export interface Helmet {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        tagline?: string | null;
        description?: string | null;
    };
    details?: {
        usage?: ('Track' | 'Street' | 'Show' | 'Performance') | null;
        concept?: string | null;
        designer?: string | null;
        inspiration?: string | null;
        color?: string | null;
        branding?: ('Minimal' | 'Prominent' | 'Full' | 'Heritage') | null;
        style?: ('Classic' | 'Modern' | 'Futuristic' | 'Retro') | null;
        material?: ('Matte' | 'Glossy' | 'Textured' | 'Coated') | null;
        year?: string | null;
        classifications?: {
            list?:
            | {
                name?: string | null;
                criteria?: string | null;
                definition?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        manufacturers?: {
            list?:
            | {
                name?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    assets?: {
        avatar?: (number | null) | Media;
        thumbnail?: (number | null) | Media;
        video?: (number | null) | Media;
        images?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Suit
export interface Suit {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        tagline?: string | null;
        description?: string | null;
    };
    details?: {
        usage?: ('Track' | 'Street' | 'Show' | 'Performance') | null;
        durability?: ('Low' | 'Medium' | 'High' | 'Extreme') | null;
        material?: ('Cotton' | 'Polyester' | 'Nomex' | 'Carbon' | 'Leather' | 'Synthetic') | null;
        appearance?: ('Classic' | 'Modern' | 'Futuristic' | 'Retro') | null;
        manufacturers?: {
            list?:
            | {
                name?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        video?: (number | null) | Media;
        images?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Garage
export interface Garage {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
        };
        tagline?: string | null;
        description?: string | null;
    };
    details?: {
        type?: ('Permanent' | 'Temporary' | 'Mobile' | 'Popup' | 'Shared') | null;
        capacity?: number | null;
        size_sq_m?: number | null;
        accessibility?: ('Restricted' | 'TeamOnly' | 'Paddock' | 'Public') | null;
        start_date?: string | null;
        end_date?: string | null;
        location?: [number, number] | null;
        ownership?: (number | null) | Organization;
        operators?: (number | Organization)[] | null;
        amenities?: {
            list?:
            | {
                name?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        history?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        notes?: string | null;
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        cover?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
        documents?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Status
export interface Status {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: string | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Policy
export interface Policy {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: string | null;
        privacy?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        cookies?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        version?: string | null;
        effective_date?: string | null;
        last_reviewed?: string | null;
        document?: (number | null) | Media;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Statement
export interface Statement {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: string | null;
        status?: ('Published' | 'Draft' | 'Archived') | null;
        statement?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        issued_date?: string | null;
        authority?: (number | null) | Organization;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Slide
export interface Slide {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
        };
        description?: string | null;
        story?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
    };
    details?: {
        type?: ('intro' | 'overview' | 'highlight' | 'summary' | 'statistical' | 'congratulatory') | null;
        orientation?: ('landscape' | 'portrait' | 'square') | null;
        template?: ('minimal' | 'corporate' | 'sporty' | 'bold' | 'data_driven') | null;
        transition?: ('fade' | 'slide' | 'zoom' | 'none') | null;
        duration?: number | null;
        order?: number | null;
        notes?: string | null;
    };
    traits?: {
        tags?: {
            list?:
            | {
                name?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        notes?: string | null;
    };
    assets?: {
        background?: (number | null) | Media;
        thumbnail?: (number | null) | Media;
        foreground?: (number | null) | Media;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Plan
export interface Plan {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
        };
        tagline?: string | null;
        description?: string | null;
    };
    details?: {
        vision?: string | null;
        mission?: string | null;
        scope?: ('personal' | 'team' | 'departmental' | 'organizational' | 'championship') | null;
        status?: ('draft' | 'approved' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled') | null;
        priority?: ('low' | 'medium' | 'high' | 'critical') | null;
        start_date?: string | null;
        end_date?: string | null;
        budget?: number | null;
        currency?: ('USD' | 'EUR' | 'GBP' | 'INR') | null;
        assigned_to?: (number | null) | Member;
        dependencies?: (number | Plan)[] | null;
        notes?: string | null;
    };
    traits?: {
        milestones?: {
            list?:
            | {
                name?: string | null;
                due_date?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        deliverables?: {
            list?:
            | {
                name?: string | null;
                type?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        risks?: {
            list?:
            | {
                name?: string | null;
                likelihood?: ('low' | 'medium' | 'high') | null;
                impact?: ('low' | 'medium' | 'high' | 'critical') | null;
                mitigation?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        kpis?: {
            list?:
            | {
                name?: string | null;
                target?: string | null;
                unit?: string | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        cover?: (number | null) | Media;
        documents?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Timeline
export interface Timeline {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        description?: string | null;
    };
    details?: {
        scope?: ('personal' | 'team' | 'project' | 'championship' | 'organizational') | null;
        status?: ('draft' | 'active' | 'archived') | null;
        start_date?: string | null;
        end_date?: string | null;
        color_scheme?: ('light' | 'dark' | 'vibrant' | 'monochrome') | null;
        orientation?: ('horizontal' | 'vertical' | 'zigzag') | null;
        notes?: string | null;
    };
    traits?: {
        milestones?: {
            list?:
            | {
                name?: string | null;
                date?: string | null;
                description?: string | null;
                icon?: (number | null) | Media;
                id?: string | null;
            }[]
            | null;
        };
        events?: {
            list?:
            | {
                name?: string | null;
                date?: string | null;
                description?: string | null;
                location?: [number, number] | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        cover?: (number | null) | Media;
        documents?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Program
export interface Program {
    id: number;
    name: string;
    alias?: string | null;
    basics?: {
        identifiers?: {
            code?: string | null;
        };
        tagline?: string | null;
        description?: string | null;
    };
    details?: {
        objective?: string | null;
        type?: ('development' | 'training' | 'outreach' | 'competitive' | 'grassroots' | 'elite' | 'academy') | null;
        status?: ('proposed' | 'approved' | 'active' | 'suspended' | 'completed' | 'cancelled') | null;
        duration?: ('days' | 'weeks' | 'months' | 'years' | 'ongoing') | null;
        start_date?: string | null;
        end_date?: string | null;
        budget?: number | null;
        outcomes?: string | null;
        mentors?: (number | Leader)[] | null;
        participants?: (number | Driver)[] | null;
        partners?: (number | Organization)[] | null;
        sponsors?: (number | Organization)[] | null;
        notes?: string | null;
    };
    traits?: {
        eligibility?: {
            list?:
            | {
                criteria?: string | null;
                value?: string | null;
                description?: string | null;
                id?: string | null;
            }[]
            | null;
        };
        curriculum?: {
            list?:
            | {
                module_name?: string | null;
                duration?: string | null;
                deliverable?: string | null;
                id?: string | null;
            }[]
            | null;
        };
    };
    assets?: {
        thumbnail?: (number | null) | Media;
        cover?: (number | null) | Media;
        gallery?: (number | Media)[] | null;
        documents?: (number | Media)[] | null;
    };
    seo?: {
        title?: string | null;
        image?: (number | null) | Media;
        description?: string | null;
    };
    generateSlug?: boolean | null;
    slug?: string | null;
    categories?: (number | Category)[] | null;
    tags?: (number | Tag)[] | null;
    updatedAt: string;
    createdAt: string;
}

// Form
export interface Form {
    id: number;
    title: string;
    fields?:
    | (
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            defaultValue?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'checkbox';
        }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'country';
        }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'email';
        }
        | {
            message?: {
                root: {
                    type: string;
                    children: {
                        type: any;
                        version: number;
                        [k: string]: unknown;
                    }[];
                    direction: ('ltr' | 'rtl') | null;
                    format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                    indent: number;
                    version: number;
                };
                [k: string]: unknown;
            } | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'message';
        }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'number';
        }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            placeholder?: string | null;
            options?:
            | {
                label: string;
                value: string;
                id?: string | null;
            }[]
            | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'select';
        }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'state';
        }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'text';
        }
        | {
            name: string;
            label?: string | null;
            width?: number | null;
            defaultValue?: string | null;
            required?: boolean | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'textarea';
        }
    )[]
    | null;
    submitButtonLabel?: string | null;
    confirmationType?: ('message' | 'redirect') | null;
    confirmationMessage?: {
        root: {
            type: string;
            children: {
                type: any;
                version: number;
                [k: string]: unknown;
            }[];
            direction: ('ltr' | 'rtl') | null;
            format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
            indent: number;
            version: number;
        };
        [k: string]: unknown;
    } | null;
    redirect?: {
        url: string;
    };
    emails?:
    | {
        emailTo?: string | null;
        cc?: string | null;
        bcc?: string | null;
        replyTo?: string | null;
        emailFrom?: string | null;
        subject: string;
        message?: {
            root: {
                type: string;
                children: {
                    type: any;
                    version: number;
                    [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
            };
            [k: string]: unknown;
        } | null;
        id?: string | null;
    }[]
    | null;
    updatedAt: string;
    createdAt: string;
}

// FormSubmission
export interface FormSubmission {
    id: number;
    form: number | Form;
    submissionData?:
    | {
        field: string;
        value: string;
        id?: string | null;
    }[]
    | null;
    updatedAt: string;
    createdAt: string;
}