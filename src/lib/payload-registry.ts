import { Categories } from '@/collections/Attributes/Category'
import { Channels } from '@/collections/Attributes/Channel'
import { Classifications } from '@/collections/Attributes/Classification'
import { Features } from '@/collections/Attributes/Feature'
import { Locations } from '@/collections/Attributes/Location'
import { Preferences } from '@/collections/Attributes/Preference'
import { Principles } from '@/collections/Attributes/Principle'
import { Skills } from '@/collections/Attributes/Skill'
import { Specifications } from '@/collections/Attributes/Specification'
import { Tags } from '@/collections/Attributes/Tag'
import { Tones } from '@/collections/Attributes/Tone'
import { Entries } from '@/collections/Competition/Entry'
import { Events } from '@/collections/Competition/Event'
import { Points } from '@/collections/Competition/Point'
import { Results } from '@/collections/Competition/Result'
import { Seasons } from '@/collections/Competition/Season'
import { Series } from '@/collections/Competition/Series'
import { Sessions } from '@/collections/Competition/Session'
import { Histories } from '@/collections/Content/History'
import { Journeys } from '@/collections/Content/Journey'
import { Narratives } from '@/collections/Content/Narrative'
import { Notes } from '@/collections/Content/Note'
import { Pages } from '@/collections/Content/Pages'
import { Stories } from '@/collections/Content/Story'
import { Drivers } from '@/collections/Entities/Driver'
import { Individuals } from '@/collections/Entities/Individual'
import { Leaders } from '@/collections/Entities/Leader'
import { Members } from '@/collections/Entities/Member'
import { Organizations } from '@/collections/Entities/Organization'
import { Users } from '@/collections/Entities/User'
import { Careers } from '@/collections/Operations/Career'
import { Celebrations } from '@/collections/Operations/Celebration'
import { Duties } from '@/collections/Operations/Duty'
import { Expectations } from '@/collections/Operations/Expectation'
import { Initiatives } from '@/collections/Operations/Initiative'
import { Meetups } from '@/collections/Operations/Meetup'
import { Protocols } from '@/collections/Operations/Protocol'
import { Schedules } from '@/collections/Operations/Schedule'
import { Trainings } from '@/collections/Operations/Training'
import { Awards } from '@/collections/Outcomes/Award'
import { Decisions } from '@/collections/Outcomes/Decision'
import { Experiences } from '@/collections/Outcomes/Experience'
import { Highlights } from '@/collections/Outcomes/Highlight'
import { Impacts } from '@/collections/Outcomes/Impact'
import { Incidents } from '@/collections/Outcomes/Incident'
import { Strategies } from '@/collections/Outcomes/Strategy'
import { Archives } from '@/collections/Resources/Archive'
import { Cars } from '@/collections/Resources/Car'
import { Galleries } from '@/collections/Resources/Gallery'
import { Kits } from '@/collections/Resources/Kit'
import { Media } from '@/collections/Resources/Media'
import { Playlists } from '@/collections/Resources/Playlist'
import { Visualizations } from '@/collections/Resources/Visualization'

import { Identity } from '@/globals/Branding/Identity'
import { Policies } from '@/globals/Branding/Policies'
import { Footer } from '@/globals/Configurations/Footer'
import { Header } from '@/globals/Configurations/Header'
import { Announcements } from '@/globals/Connectivity/Announcements'
import { Questions } from '@/globals/Connectivity/Questions'
import { Socials } from '@/globals/Connectivity/Socials'

import { revalidateCollection, revalidateGlobal } from './revalidate'

export const rawCollections = [
    Series, Seasons, Events, Sessions, Entries, Results, Points,
    Drivers, Leaders, Members, Individuals, Organizations, Users,
    Narratives, Stories, Histories, Journeys, Notes, Pages,
    Cars, Kits, Media, Galleries, Playlists, Archives, Visualizations,
    Schedules, Trainings, Careers, Initiatives, Meetups, Celebrations, Protocols, Duties, Expectations,
    Highlights, Incidents, Impacts, Decisions, Strategies, Awards, Experiences,
    Categories, Tags, Tones, Features, Specifications, Classifications, Skills, Principles, Preferences, Channels, Locations
]

export const rawGlobals = [Header, Footer, Identity, Policies, Socials, Announcements, Questions]

export const collections = rawCollections.map((col) => ({
    ...col,
    hooks: {
        ...col.hooks,
        afterChange: [...(col.hooks?.afterChange || []), revalidateCollection],
    },
}))

export const globals = rawGlobals.map((glob) => ({
    ...glob,
    hooks: {
        ...glob.hooks,
        afterChange: [...(glob.hooks?.afterChange || []), revalidateGlobal],
    },
}))