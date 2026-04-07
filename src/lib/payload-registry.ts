import { Categories } from '@/collections/OLD/Attributes/Category'
import { Channels } from '@/collections/OLD/Attributes/Channel'
import { Classifications } from '@/collections/OLD/Attributes/Classification'
import { Features } from '@/collections/OLD/Attributes/Feature'
import { Locations } from '@/collections/OLD/Attributes/Location'
import { Preferences } from '@/collections/OLD/Attributes/Preference'
import { Principles } from '@/collections/OLD/Attributes/Principle'
import { Skills } from '@/collections/OLD/Attributes/Skill'
import { Specifications } from '@/collections/OLD/Attributes/Specification'
import { Tags } from '@/collections/OLD/Attributes/Tag'
import { Tones } from '@/collections/OLD/Attributes/Tone'
import { Entries } from '@/collections/OLD/Competition/Entry'
import { Events } from '@/collections/OLD/Competition/Event'
import { Points } from '@/collections/OLD/Competition/Point'
import { Results } from '@/collections/OLD/Competition/Result'
import { Seasons } from '@/collections/OLD/Competition/Season'
import { Series } from '@/collections/OLD/Competition/Series'
import { Sessions } from '@/collections/OLD/Competition/Session'
import { Histories } from '@/collections/OLD/Content/History'
import { Journeys } from '@/collections/OLD/Content/Journey'
import { Narratives } from '@/collections/OLD/Content/Narrative'
import { Notes } from '@/collections/OLD/Content/Note'
import { Pages } from '@/collections/OLD/Content/Pages'
import { Stories } from '@/collections/OLD/Content/Story'
import { Drivers } from '@/collections/OLD/Entities/Driver'
import { Individuals } from '@/collections/OLD/Entities/Individual'
import { Leaders } from '@/collections/OLD/Entities/Leader'
import { Members } from '@/collections/OLD/Entities/Member'
import { Organizations } from '@/collections/OLD/Entities/Organization'
import { Users } from '@/collections/OLD/Entities/User'
import { Careers } from '@/collections/OLD/Operations/Career'
import { Celebrations } from '@/collections/OLD/Operations/Celebration'
import { Duties } from '@/collections/OLD/Operations/Duty'
import { Expectations } from '@/collections/OLD/Operations/Expectation'
import { Initiatives } from '@/collections/OLD/Operations/Initiative'
import { Meetups } from '@/collections/OLD/Operations/Meetup'
import { Protocols } from '@/collections/OLD/Operations/Protocol'
import { Schedules } from '@/collections/OLD/Operations/Schedule'
import { Trainings } from '@/collections/OLD/Operations/Training'
import { Awards } from '@/collections/OLD/Outcomes/Award'
import { Decisions } from '@/collections/OLD/Outcomes/Decision'
import { Experiences } from '@/collections/OLD/Outcomes/Experience'
import { Highlights } from '@/collections/OLD/Outcomes/Highlight'
import { Impacts } from '@/collections/OLD/Outcomes/Impact'
import { Incidents } from '@/collections/OLD/Outcomes/Incident'
import { Strategies } from '@/collections/OLD/Outcomes/Strategy'
import { Archives } from '@/collections/OLD/Resources/Archive'
import { Cars } from '@/collections/OLD/Resources/Car'
import { Galleries } from '@/collections/OLD/Resources/Gallery'
import { Kits } from '@/collections/OLD/Resources/Kit'
import { Media } from '@/collections/OLD/Resources/Media'
import { Playlists } from '@/collections/OLD/Resources/Playlist'
import { Visualizations } from '@/collections/OLD/Resources/Visualization'

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