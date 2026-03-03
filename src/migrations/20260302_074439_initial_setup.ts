import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es', 'pt');
  CREATE TYPE "public"."enum_series_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_series_details_status" AS ENUM('Active', 'Inactive', 'Defunct', 'Upcoming', 'Rebranded', 'Merged', 'Sanctioned');
  CREATE TYPE "public"."enum_seasons_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_events_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_events_details_status" AS ENUM('Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Postponed', 'Abandoned', 'Provisional');
  CREATE TYPE "public"."enum_events_details_access" AS ENUM('Public', 'Private', 'InviteOnly', 'MemberOnly', 'VIP');
  CREATE TYPE "public"."enum_sessions_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_sessions_details_status" AS ENUM('Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Postponed', 'Abandoned', 'Provisional');
  CREATE TYPE "public"."enum_sessions_details_access" AS ENUM('Public', 'Private', 'InviteOnly', 'MemberOnly', 'VIP');
  CREATE TYPE "public"."enum_entries_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_entries_details_status" AS ENUM('Entered', 'Confirmed', 'Withdrawn', 'Disqualified', 'DidNotStart', 'DidNotFinish', 'Classified', 'NotClassified', 'Provisional', 'Excluded');
  CREATE TYPE "public"."enum_entries_traits_role" AS ENUM('Primary', 'Reserve', 'Test', 'Development', 'Rookie', 'Veteran', 'Guest');
  CREATE TYPE "public"."enum_results_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_results_details_status" AS ENUM('Official', 'Provisional', 'Corrected', 'Historic', 'Estimated', 'Certified', 'Void');
  CREATE TYPE "public"."enum_points_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_points_traits_scale" AS ENUM('Standard', 'Inverse', 'Logarithmic', 'Custom', 'Multiplier', 'Fixed');
  CREATE TYPE "public"."enum_drivers_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_drivers_traits_identity_gender" AS ENUM('Male', 'Female', 'NonBinary', 'Undisclosed');
  CREATE TYPE "public"."enum_leaders_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_leaders_traits_identity_gender" AS ENUM('Male', 'Female', 'NonBinary', 'Undisclosed');
  CREATE TYPE "public"."enum_members_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_members_traits_identity_gender" AS ENUM('Male', 'Female', 'NonBinary', 'Undisclosed');
  CREATE TYPE "public"."enum_individuals_details_interests_list_level" AS ENUM('Casual', 'Enthusiast', 'Expert', 'Professional');
  CREATE TYPE "public"."enum_individuals_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_individuals_traits_identity_gender" AS ENUM('Male', 'Female', 'NonBinary', 'Undisclosed');
  CREATE TYPE "public"."enum_individuals_traits_influence_reach" AS ENUM('Local', 'Regional', 'National', 'Global');
  CREATE TYPE "public"."enum_individuals_traits_influence_authority" AS ENUM('None', 'Low', 'Medium', 'High');
  CREATE TYPE "public"."enum_individuals_traits_influence_network" AS ENUM('Small', 'Moderate', 'Extensive', 'Vast');
  CREATE TYPE "public"."enum_individuals_metrics_benefits_type" AS ENUM('Access', 'Discount', 'Information', 'Collaboration');
  CREATE TYPE "public"."enum_individuals_metrics_benefits_impact" AS ENUM('Minor', 'Moderate', 'Significant', 'Strategic');
  CREATE TYPE "public"."enum_organizations_metrics_benefits_list_type" AS ENUM('Financial', 'Technical', 'Marketing', 'Operational');
  CREATE TYPE "public"."enum_organizations_metrics_benefits_list_impact" AS ENUM('Minor', 'Moderate', 'Significant', 'Strategic');
  CREATE TYPE "public"."enum_organizations_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_organizations_traits_reputation_prestige" AS ENUM('Unknown', 'Emerging', 'Established', 'Prestigious', 'Iconic');
  CREATE TYPE "public"."enum_organizations_traits_reputation_reliability" AS ENUM('Unproven', 'Developing', 'Reliable', 'Exceptional');
  CREATE TYPE "public"."enum_organizations_traits_reputation_innovation" AS ENUM('Conservative', 'Adaptive', 'Innovative', 'Revolutionary');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'race_admin', 'commercial', 'content', 'technical', 'hr', 'archive', 'customer');
  CREATE TYPE "public"."enum_narratives_metrics_timeline_list_type" AS ENUM('Event', 'Milestone', 'Decision', 'Incident');
  CREATE TYPE "public"."enum_narratives_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_narratives_details_scope_significance" AS ENUM('Minor', 'Moderate', 'Major', 'Historic');
  CREATE TYPE "public"."enum_narratives_details_scope_scale" AS ENUM('Individual', 'Team', 'Organization', 'Sport');
  CREATE TYPE "public"."enum_narratives_details_scope_depth" AS ENUM('Surface', 'Detailed', 'Comprehensive', 'Exhaustive');
  CREATE TYPE "public"."enum_stories_traits_interactions_list_dynamics" AS ENUM('Cooperative', 'Competitive', 'Adversarial', 'Mentorship');
  CREATE TYPE "public"."enum_stories_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_histories_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_histories_traits_legacy_impact" AS ENUM('Low', 'Medium', 'High', 'Monumental');
  CREATE TYPE "public"."enum_histories_traits_legacy_memory" AS ENUM('Forgotten', 'Obscure', 'Celebrated', 'Legendary');
  CREATE TYPE "public"."enum_journeys_traits_lessons_list_significance" AS ENUM('Minor', 'Notable', 'Significant', 'LifeChanging');
  CREATE TYPE "public"."enum_journeys_traits_lessons_list_impact" AS ENUM('Personal', 'Team', 'Organizational', 'Industry');
  CREATE TYPE "public"."enum_journeys_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_notes_traits_intentions_list_type" AS ENUM('Inform', 'Persuade', 'Clarify', 'Critique', 'Praise', 'Evaluate');
  CREATE TYPE "public"."enum_notes_traits_intentions_list_impact" AS ENUM('Positive', 'Neutral', 'Negative');
  CREATE TYPE "public"."enum_notes_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_pages_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_cars_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_cars_details_status" AS ENUM('Active', 'Retired', 'Development', 'Museum', 'Prototype', 'Concept');
  CREATE TYPE "public"."enum_kits_traits_materials_list_type" AS ENUM('Cotton', 'Polyester', 'Nomex', 'Carbon', 'Leather', 'Synthetic');
  CREATE TYPE "public"."enum_kits_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_kits_basics_purpose_application" AS ENUM('Track', 'Street', 'Show', 'Promotion');
  CREATE TYPE "public"."enum_kits_details_appearance_branding" AS ENUM('Minimal', 'Prominent', 'Full', 'Heritage');
  CREATE TYPE "public"."enum_kits_details_appearance_style" AS ENUM('Classic', 'Modern', 'Futuristic', 'Retro');
  CREATE TYPE "public"."enum_kits_traits_composition_construction" AS ENUM('CutAndSew', 'Knitted', '3DPrinted', 'Molded');
  CREATE TYPE "public"."enum_kits_traits_composition_assembly" AS ENUM('Glued', 'Stitched', 'Welded', 'Bonded');
  CREATE TYPE "public"."enum_kits_traits_composition_finish" AS ENUM('Matte', 'Glossy', 'Textured', 'Coated');
  CREATE TYPE "public"."enum_kits_traits_functionality_performance" AS ENUM('Standard', 'Enhanced', 'Maximum');
  CREATE TYPE "public"."enum_kits_traits_functionality_durability" AS ENUM('Low', 'Medium', 'High', 'Extreme');
  CREATE TYPE "public"."enum_kits_traits_functionality_comfort" AS ENUM('Basic', 'Comfortable', 'Premium');
  CREATE TYPE "public"."enum_galleries_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_playlists_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_playlists_traits_quality" AS ENUM('4K', 'HD', 'SD', 'Raw');
  CREATE TYPE "public"."enum_playlists_traits_format" AS ENUM('Wide', 'Vertical', 'Square');
  CREATE TYPE "public"."enum_archives_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_visualizations_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_schedules_traits_constraints_list_type" AS ENUM('Time', 'Resource', 'Weather', 'Regulation');
  CREATE TYPE "public"."enum_schedules_traits_constraints_list_impact" AS ENUM('Low', 'Medium', 'High', 'Blocking');
  CREATE TYPE "public"."enum_schedules_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_schedules_basics_scope_significance" AS ENUM('Minor', 'Moderate', 'Major', 'Critical');
  CREATE TYPE "public"."enum_schedules_basics_scope_scale" AS ENUM('Individual', 'Team', 'Department', 'Organization');
  CREATE TYPE "public"."enum_schedules_basics_scope_depth" AS ENUM('Overview', 'Detailed', 'Comprehensive');
  CREATE TYPE "public"."enum_schedules_details_chronology_type" AS ENUM('Single', 'Recurring', 'MultiDay');
  CREATE TYPE "public"."enum_trainings_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_trainings_traits_intensity" AS ENUM('Low', 'Medium', 'High', 'Extreme');
  CREATE TYPE "public"."enum_trainings_traits_format" AS ENUM('Individual', 'Group', 'Lecture', 'HandsOn', 'Simulated', 'Remote', 'Classroom');
  CREATE TYPE "public"."enum_careers_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_careers_details_contract" AS ENUM('FullTime', 'PartTime', 'Reserve', 'Test', 'Loan', 'Guest');
  CREATE TYPE "public"."enum_initiatives_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_initiatives_details_status" AS ENUM('Proposed', 'Active', 'Paused', 'Completed', 'Archived');
  CREATE TYPE "public"."enum_meetups_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_meetups_traits_format" AS ENUM('InPerson', 'Virtual', 'Hybrid');
  CREATE TYPE "public"."enum_meetups_traits_access" AS ENUM('Public', 'InviteOnly', 'Private', 'Exclusive');
  CREATE TYPE "public"."enum_celebrations_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_celebrations_details_prestige" AS ENUM('Intimate', 'Notable', 'Prestigious', 'Iconic');
  CREATE TYPE "public"."enum_celebrations_details_exclusivity" AS ENUM('Public', 'InviteOnly', 'Private', 'TeamOnly');
  CREATE TYPE "public"."enum_protocols_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_duties_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_expectations_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_expectations_traits_direction" AS ENUM('Anticipated', 'Committed');
  CREATE TYPE "public"."enum_expectations_traits_priority" AS ENUM('Critical', 'High', 'Medium', 'Low');
  CREATE TYPE "public"."enum_expectations_traits_flexibility" AS ENUM('Strict', 'Negotiable', 'Guideline');
  CREATE TYPE "public"."enum_highlights_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_incidents_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_impacts_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_impacts_details_scope_scale" AS ENUM('Local', 'Regional', 'National', 'Global', 'Organization', 'Event');
  CREATE TYPE "public"."enum_impacts_details_scope_depth" AS ENUM('Surface', 'Moderate', 'Deep', 'Fundamental', 'Profound');
  CREATE TYPE "public"."enum_impacts_details_scope_rarity" AS ENUM('Common', 'Uncommon', 'Rare', 'VeryRare', 'Unique');
  CREATE TYPE "public"."enum_impacts_traits_velocity" AS ENUM('Immediate', 'Rapid', 'Gradual', 'Delayed');
  CREATE TYPE "public"."enum_impacts_traits_gravity" AS ENUM('Catastrophic', 'Severe', 'Moderate', 'Minor', 'Negligible', 'Major');
  CREATE TYPE "public"."enum_impacts_traits_permanence" AS ENUM('Permanent', 'LongTerm', 'Temporary', 'Reversible');
  CREATE TYPE "public"."enum_decisions_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_strategies_traits_contingencies_list_probability" AS ENUM('Low', 'Medium', 'High', 'Certain');
  CREATE TYPE "public"."enum_strategies_traits_contingencies_list_impact" AS ENUM('Minor', 'Moderate', 'Major', 'Critical');
  CREATE TYPE "public"."enum_strategies_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_awards_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_experiences_traits_skills_list_proficiency" AS ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert');
  CREATE TYPE "public"."enum_experiences_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_categories_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_tags_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_tones_traits_qualities_list_quality" AS ENUM('Positive', 'Neutral', 'Negative', 'Mixed');
  CREATE TYPE "public"."enum_tones_traits_qualities_list_intensity" AS ENUM('Low', 'Medium', 'High', 'Extreme');
  CREATE TYPE "public"."enum_tones_traits_qualities_list_mood" AS ENUM('Optimistic', 'Somber', 'Energetic', 'Calm', 'Tense', 'Celebratory');
  CREATE TYPE "public"."enum_tones_traits_qualities_list_scale" AS ENUM('Minute', 'Moderate', 'Grand', 'Epic');
  CREATE TYPE "public"."enum_tones_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_tones_traits_scope_scale" AS ENUM('Local', 'Regional', 'National', 'Global');
  CREATE TYPE "public"."enum_tones_traits_scope_depth" AS ENUM('Surface', 'Moderate', 'Deep', 'Profound');
  CREATE TYPE "public"."enum_features_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_features_traits_nature_complexity" AS ENUM('Low', 'Medium', 'High', 'Extreme');
  CREATE TYPE "public"."enum_features_traits_nature_visibility" AS ENUM('Visible', 'Concealed', 'Integrated', 'Prominent');
  CREATE TYPE "public"."enum_features_traits_nature_impact" AS ENUM('Marginal', 'Moderate', 'Significant', 'Critical');
  CREATE TYPE "public"."enum_specifications_traits_conditions_list_compliance" AS ENUM('Mandatory', 'Optional', 'Recommended', 'NotApplicable');
  CREATE TYPE "public"."enum_specifications_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_specifications_metrics_measurement_frequency" AS ENUM('Once', 'Periodic', 'Continuous', 'OnDemand');
  CREATE TYPE "public"."enum_specifications_metrics_measurement_accuracy" AS ENUM('Low', 'Medium', 'High', 'Precision');
  CREATE TYPE "public"."enum_classifications_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_skills_traits_methods_list_type" AS ENUM('Theoretical', 'Practical', 'Simulation', 'Field');
  CREATE TYPE "public"."enum_skills_traits_dependencies_list_type" AS ENUM('Prerequisite', 'Corequisite', 'Recommended');
  CREATE TYPE "public"."enum_skills_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_skills_basics_scope_scale" AS ENUM('Narrow', 'Moderate', 'Broad', 'Comprehensive');
  CREATE TYPE "public"."enum_skills_basics_scope_depth" AS ENUM('Basic', 'Intermediate', 'Advanced', 'Expert');
  CREATE TYPE "public"."enum_skills_basics_scope_rarity" AS ENUM('Common', 'Uncommon', 'Rare', 'Unique');
  CREATE TYPE "public"."enum_skills_traits_nature_complexity" AS ENUM('Low', 'Medium', 'High', 'Extreme');
  CREATE TYPE "public"."enum_skills_traits_nature_visibility" AS ENUM('Obvious', 'Subtle', 'Concealed', 'Latent');
  CREATE TYPE "public"."enum_skills_traits_nature_impact" AS ENUM('Minor', 'Moderate', 'Major', 'Transformative');
  CREATE TYPE "public"."enum_principles_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_preferences_traits_reasons_list_importance" AS ENUM('Low', 'Medium', 'High', 'Critical');
  CREATE TYPE "public"."enum_preferences_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_channels_traits_usage_list_role" AS ENUM('Primary', 'Secondary', 'Backup', 'Test');
  CREATE TYPE "public"."enum_channels_traits_usage_list_function" AS ENUM('Broadcast', 'Receive', 'Monitor', 'Control');
  CREATE TYPE "public"."enum_channels_traits_validity_list_status" AS ENUM('Active', 'Inactive', 'Pending', 'Deprecated');
  CREATE TYPE "public"."enum_channels_traits_validity_list_condition" AS ENUM('Operational', 'Degraded', 'Failed', 'Maintenance');
  CREATE TYPE "public"."enum_channels_traits_validity_list_state" AS ENUM('Enabled', 'Disabled', 'Locked');
  CREATE TYPE "public"."enum_channels_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_channels_details_protocol_format" AS ENUM('HTTP', 'HTTPS', 'FTP', 'SFTP', 'SMTP', 'Custom');
  CREATE TYPE "public"."enum_channels_details_protocol_scheme" AS ENUM('Standard', 'Secure', 'Legacy');
  CREATE TYPE "public"."enum_locations_toggle" AS ENUM('simple', 'advanced');
  CREATE TYPE "public"."enum_locations_traits_geography_climate" AS ENUM('Temperate', 'Tropical', 'Arid', 'Continental', 'Polar', 'Mediterranean', 'Subtropical', 'Oceanic', 'Desert');
  CREATE TYPE "public"."enum_locations_traits_accessibility_approach" AS ENUM('PublicRoad', 'PrivateRoad', 'Air', 'Sea', 'Rail');
  CREATE TYPE "public"."enum_locations_traits_accessibility_facilities" AS ENUM('DisabledAccess', 'VIPEntry', 'ServiceEntry');
  CREATE TYPE "public"."enum_locations_traits_accessibility_capacity" AS ENUM('Small', 'Medium', 'Large', 'Massive');
  CREATE TYPE "public"."enum_forms_confirmation_type" AS ENUM('message', 'redirect');
  CREATE TYPE "public"."enum_addresses_country" AS ENUM('US', 'GB', 'CA', 'AU', 'AT', 'BE', 'BR', 'BG', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HK', 'HU', 'IN', 'IE', 'IT', 'JP', 'LV', 'LT', 'LU', 'MY', 'MT', 'MX', 'NL', 'NZ', 'NO', 'PL', 'PT', 'RO', 'SG', 'SK', 'SI', 'ES', 'SE', 'CH');
  CREATE TYPE "public"."enum_variants_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__variants_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__variants_v_published_locale" AS ENUM('en', 'es', 'pt');
  CREATE TYPE "public"."enum_products_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_products_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_products_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_products_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__products_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__products_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__products_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__products_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_published_locale" AS ENUM('en', 'es', 'pt');
  CREATE TYPE "public"."enum_carts_currency" AS ENUM('USD');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('processing', 'completed', 'cancelled', 'refunded');
  CREATE TYPE "public"."enum_orders_currency" AS ENUM('USD');
  CREATE TYPE "public"."enum_transactions_payment_method" AS ENUM('stripe');
  CREATE TYPE "public"."enum_transactions_status" AS ENUM('pending', 'succeeded', 'failed', 'cancelled', 'expired', 'refunded');
  CREATE TYPE "public"."enum_transactions_currency" AS ENUM('USD');
  CREATE TYPE "public"."enum_header_nav_items_sub_items_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_utility_nav_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_legal_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_policies_documents_type" AS ENUM('privacy', 'terms', 'cookies', 'returns', 'refunds', 'transactions', 'legal');
  CREATE TYPE "public"."enum_socials_accounts_platform" AS ENUM('instagram', 'x', 'facebook', 'youtube', 'linkedin', 'tiktok', 'threads', 'snapchat', 'pinterest', 'discord', 'twitch', 'whatsapp', 'telegram', 'github', 'spotify', 'other');
  CREATE TYPE "public"."enum_announcements_items_type" AS ENUM('info', 'warning', 'urgent', 'celebration');
  CREATE TYPE "public"."enum_announcements_items_audience" AS ENUM('all', 'authenticated', 'guest');
  CREATE TABLE "series" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_series_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_identifiers_abbreviation" varchar DEFAULT '',
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_status" "enum_series_details_status",
  	"details_content_history_id" integer,
  	"details_content_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_heritage_predecessor_id" integer,
  	"traits_heritage_successor_id" integer,
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_schedule_id" integer,
  	"metrics_counts_seasons" numeric DEFAULT 0,
  	"metrics_counts_events" numeric DEFAULT 0,
  	"metrics_counts_participants" numeric DEFAULT 0,
  	"metrics_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_logo_id" integer NOT NULL,
  	"assets_cover_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "series_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "series_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"classifications_id" integer,
  	"features_id" integer,
  	"specifications_id" integer,
  	"locations_id" integer,
  	"archives_id" integer,
  	"organizations_id" integer,
  	"individuals_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "seasons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_seasons_toggle" DEFAULT 'advanced',
  	"series_id" integer NOT NULL,
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_content_narrative_id" integer,
  	"details_content_history_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_counts_entries" numeric DEFAULT 0,
  	"metrics_counts_events" numeric DEFAULT 0,
  	"metrics_counts_races" numeric DEFAULT 0,
  	"metrics_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_cover_id" integer,
  	"assets_gallery_id" integer,
  	"assets_playlist_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "seasons_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_identifiers_abbreviation" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "seasons_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"classifications_id" integer,
  	"protocols_id" integer,
  	"schedules_id" integer,
  	"archives_id" integer,
  	"organizations_id" integer,
  	"individuals_id" integer,
  	"drivers_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_events_toggle" DEFAULT 'advanced',
  	"season_id" integer NOT NULL,
  	"basics_enable" boolean DEFAULT true,
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_identifiers_round" varchar DEFAULT '',
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_status" "enum_events_details_status",
  	"details_access" "enum_events_details_access",
  	"details_content_narrative_id" integer,
  	"details_content_history_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_chronology_start" timestamp(3) with time zone,
  	"traits_chronology_end" timestamp(3) with time zone,
  	"traits_chronology_timezone" varchar DEFAULT '',
  	"traits_format_segment" varchar DEFAULT '',
  	"traits_format_duration" numeric DEFAULT 0,
  	"traits_format_interval" numeric DEFAULT 0,
  	"traits_format_specification" varchar DEFAULT '',
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_attributes_location_id" integer,
  	"metrics_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_poster_id" integer,
  	"assets_cover_id" integer,
  	"assets_gallery_id" integer,
  	"assets_playlist_id" integer,
  	"assets_archive_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"classifications_id" integer,
  	"features_id" integer,
  	"protocols_id" integer,
  	"specifications_id" integer,
  	"highlights_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "sessions_traits_parameters_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"parameter_id" integer,
  	"value" varchar DEFAULT '',
  	"unit" varchar DEFAULT '',
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "sessions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_sessions_toggle" DEFAULT 'advanced',
  	"code" varchar DEFAULT '',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_status" "enum_sessions_details_status",
  	"details_access" "enum_sessions_details_access",
  	"details_content_narrative_id" integer,
  	"details_content_history_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_format_segment" varchar DEFAULT '',
  	"traits_format_duration" numeric DEFAULT 0,
  	"traits_format_interval" numeric DEFAULT 0,
  	"traits_format_specification" varchar DEFAULT '',
  	"traits_constraints_type_id" integer,
  	"traits_constraints_limit" varchar DEFAULT '',
  	"traits_constraints_unit" varchar DEFAULT '',
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_quantifiers_laps" numeric DEFAULT 0,
  	"metrics_quantifiers_distance" varchar DEFAULT '',
  	"metrics_quantifiers_duration" varchar DEFAULT '',
  	"metrics_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_gallery_id" integer,
  	"assets_playlist_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sessions_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "sessions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"classifications_id" integer,
  	"features_id" integer,
  	"protocols_id" integer,
  	"strategies_id" integer,
  	"notes_id" integer,
  	"specifications_id" integer,
  	"highlights_id" integer,
  	"incidents_id" integer,
  	"organizations_id" integer,
  	"leaders_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"individuals_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "entries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_entries_toggle" DEFAULT 'advanced',
  	"session_id" integer NOT NULL,
  	"basics_enable" boolean DEFAULT true,
  	"basics_identifiers_number" varchar DEFAULT '',
  	"basics_identifiers_plate" varchar DEFAULT '',
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_status" "enum_entries_details_status",
  	"details_content_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_role" "enum_entries_traits_role",
  	"traits_eligibility_license" varchar DEFAULT '',
  	"traits_eligibility_waiver" varchar DEFAULT '',
  	"traits_eligibility_restriction" varchar DEFAULT '',
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_positions_grid" numeric DEFAULT 0,
  	"metrics_positions_laps" numeric DEFAULT 0,
  	"metrics_positions_start" numeric DEFAULT 0,
  	"metrics_positions_finish" numeric DEFAULT 0,
  	"metrics_parameters_parameter_id" integer,
  	"metrics_parameters_value" varchar DEFAULT '',
  	"metrics_parameters_unit" varchar DEFAULT '',
  	"metrics_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_thumbnail_id" integer,
  	"assets_gallery_id" integer,
  	"assets_playlist_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_associations_crew_id" integer,
  	"contexts_associations_car_id" integer,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "entries_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "entries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"classifications_id" integer,
  	"preferences_id" integer,
  	"specifications_id" integer,
  	"notes_id" integer,
  	"media_id" integer,
  	"drivers_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "results_metrics_stoppages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"reason" varchar DEFAULT '',
  	"duration" numeric DEFAULT 0,
  	"lap" numeric DEFAULT 0
  );
  
  CREATE TABLE "results" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_results_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_status" "enum_results_details_status",
  	"details_content_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_position_overall" numeric DEFAULT 0,
  	"metrics_position_class" numeric DEFAULT 0,
  	"metrics_position_order" numeric DEFAULT 0,
  	"metrics_performance_laps" numeric DEFAULT 0,
  	"metrics_performance_time" varchar DEFAULT '',
  	"metrics_performance_speed" varchar DEFAULT '',
  	"metrics_performance_distance" varchar DEFAULT '',
  	"metrics_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_visualization_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "results_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"traits_achievements_gap" varchar DEFAULT '',
  	"traits_achievements_interval" varchar DEFAULT '',
  	"traits_achievements_status" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "results_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"classifications_id" integer,
  	"notes_id" integer,
  	"highlights_id" integer,
  	"incidents_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "points_traits_modifiers_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"condition" varchar DEFAULT '',
  	"adjustment" numeric DEFAULT 0,
  	"impact" varchar DEFAULT '',
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "points" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_points_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_value" numeric DEFAULT 0,
  	"traits_scale" "enum_points_traits_scale",
  	"traits_ranking_before" numeric DEFAULT 0,
  	"traits_ranking_after" numeric DEFAULT 0,
  	"traits_ranking_delta" numeric DEFAULT 0,
  	"traits_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_connections_participants_id" integer,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "points_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "points_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"classifications_id" integer,
  	"specifications_id" integer,
  	"notes_id" integer,
  	"organizations_id" integer,
  	"individuals_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "drivers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_drivers_toggle" DEFAULT 'advanced',
  	"first" varchar DEFAULT '' NOT NULL,
  	"middle" varchar DEFAULT '',
  	"last" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_enable" boolean DEFAULT true,
  	"basics_identifier_number" varchar DEFAULT '',
  	"basics_identifier_nickname" varchar DEFAULT '',
  	"basics_identifier_competition" varchar DEFAULT '',
  	"basics_identifier_callsign" varchar DEFAULT '',
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_chronology_birth" timestamp(3) with time zone,
  	"details_chronology_debut" timestamp(3) with time zone,
  	"details_chronology_retirement" timestamp(3) with time zone,
  	"details_about_narrative_id" integer,
  	"details_about_biography_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_identity_gender" "enum_drivers_traits_identity_gender",
  	"traits_identity_pronouns" varchar DEFAULT '',
  	"traits_identity_age" numeric DEFAULT 0,
  	"traits_identity_nationality" varchar DEFAULT '',
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_avatar_id" integer NOT NULL,
  	"assets_cover_id" integer,
  	"assets_autograph_id" integer,
  	"assets_helmet_id" integer,
  	"assets_suit_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "drivers_locales" (
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "drivers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"journeys_id" integer,
  	"channels_id" integer,
  	"skills_id" integer,
  	"experiences_id" integer,
  	"trainings_id" integer,
  	"points_id" integer,
  	"results_id" integer,
  	"awards_id" integer,
  	"galleries_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"leaders_id" integer,
  	"cars_id" integer,
  	"kits_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "leaders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_leaders_toggle" DEFAULT 'advanced',
  	"first" varchar DEFAULT '' NOT NULL,
  	"middle" varchar DEFAULT '',
  	"last" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_enable" boolean DEFAULT true,
  	"basics_identifier_designation" varchar DEFAULT '',
  	"basics_identifier_title" varchar DEFAULT '',
  	"basics_identifier_code" varchar DEFAULT '',
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_chronology_birth" timestamp(3) with time zone,
  	"details_chronology_debut" timestamp(3) with time zone,
  	"details_chronology_retirement" timestamp(3) with time zone,
  	"details_about_narrative_id" integer,
  	"details_about_biography_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_identity_gender" "enum_leaders_traits_identity_gender",
  	"traits_identity_pronouns" varchar DEFAULT '',
  	"traits_identity_age" numeric DEFAULT 0,
  	"traits_identity_nationality" varchar DEFAULT '',
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_avatar_id" integer NOT NULL,
  	"assets_cover_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leaders_locales" (
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "leaders_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"classifications_id" integer,
  	"principles_id" integer,
  	"features_id" integer,
  	"channels_id" integer,
  	"strategies_id" integer,
  	"experiences_id" integer,
  	"impacts_id" integer,
  	"awards_id" integer,
  	"galleries_id" integer,
  	"leaders_id" integer,
  	"individuals_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_members_toggle" DEFAULT 'advanced',
  	"first" varchar DEFAULT '' NOT NULL,
  	"middle" varchar DEFAULT '',
  	"last" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_enable" boolean DEFAULT true,
  	"basics_identifier_number" varchar DEFAULT '',
  	"basics_identifier_nickname" varchar DEFAULT '',
  	"basics_identifier_callsign" varchar DEFAULT '',
  	"basics_identifier_badge" varchar DEFAULT '',
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_chronology_birth" timestamp(3) with time zone,
  	"details_chronology_debut" timestamp(3) with time zone,
  	"details_chronology_retirement" timestamp(3) with time zone,
  	"details_about_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_identity_gender" "enum_members_traits_identity_gender",
  	"traits_identity_pronouns" varchar DEFAULT '',
  	"traits_identity_age" numeric DEFAULT 0,
  	"traits_identity_nationality" varchar DEFAULT '',
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_avatar_id" integer NOT NULL,
  	"assets_cover_id" integer,
  	"assets_gallery_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "members_locales" (
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_about_background" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "members_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"classifications_id" integer,
  	"features_id" integer,
  	"channels_id" integer,
  	"duties_id" integer,
  	"skills_id" integer,
  	"trainings_id" integer,
  	"archives_id" integer,
  	"impacts_id" integer,
  	"awards_id" integer,
  	"leaders_id" integer,
  	"members_id" integer,
  	"drivers_id" integer,
  	"cars_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "individuals_details_interests_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"interest" varchar DEFAULT '',
  	"level" "enum_individuals_details_interests_list_level",
  	"duration" varchar DEFAULT '',
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "individuals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_individuals_toggle" DEFAULT 'advanced',
  	"first" varchar DEFAULT '' NOT NULL,
  	"middle" varchar DEFAULT '',
  	"last" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_enable" boolean DEFAULT true,
  	"basics_identifier_nickname" varchar DEFAULT '',
  	"basics_identifier_code" varchar DEFAULT '',
  	"basics_identifier_number" varchar DEFAULT '',
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_about_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_identity_gender" "enum_individuals_traits_identity_gender",
  	"traits_identity_pronouns" varchar DEFAULT '',
  	"traits_identity_age" numeric DEFAULT 0,
  	"traits_identity_nationality" varchar DEFAULT '',
  	"traits_influence_reach" "enum_individuals_traits_influence_reach",
  	"traits_influence_authority" "enum_individuals_traits_influence_authority",
  	"traits_influence_network" "enum_individuals_traits_influence_network",
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_benefits_benefit" varchar DEFAULT '',
  	"metrics_benefits_type" "enum_individuals_metrics_benefits_type",
  	"metrics_benefits_impact" "enum_individuals_metrics_benefits_impact",
  	"metrics_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_avatar_id" integer NOT NULL,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_history_id" integer,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "individuals_locales" (
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_about_background" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "individuals_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"channels_id" integer,
  	"galleries_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "organizations_metrics_benefits_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"benefit" varchar DEFAULT '',
  	"type" "enum_organizations_metrics_benefits_list_type",
  	"impact" "enum_organizations_metrics_benefits_list_impact",
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "organizations_contexts_associations_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"branch_id" integer,
  	"parent_id" integer,
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "organizations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_organizations_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_identifier_code" varchar DEFAULT '',
  	"basics_identifier_abbreviation" varchar DEFAULT '',
  	"basics_identifier_registration" varchar DEFAULT '',
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_evolution_founded" timestamp(3) with time zone,
  	"details_evolution_merged" timestamp(3) with time zone,
  	"details_evolution_rebranded" timestamp(3) with time zone,
  	"details_evolution_defunct" timestamp(3) with time zone,
  	"details_about_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_reputation_prestige" "enum_organizations_traits_reputation_prestige",
  	"traits_reputation_reliability" "enum_organizations_traits_reputation_reliability",
  	"traits_reputation_innovation" "enum_organizations_traits_reputation_innovation",
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_logo_id" integer NOT NULL,
  	"assets_gallery_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_content_history_id" integer,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "organizations_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_about_background" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "organizations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"locations_id" integer,
  	"channels_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "users_roles" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_users_roles",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "narratives_metrics_timeline_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"type" "enum_narratives_metrics_timeline_list_type",
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "narratives" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_narratives_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_scope_significance" "enum_narratives_details_scope_significance",
  	"details_scope_scale" "enum_narratives_details_scope_scale",
  	"details_scope_depth" "enum_narratives_details_scope_depth",
  	"details_scope_level" varchar DEFAULT '',
  	"details_context_background" varchar DEFAULT '',
  	"details_context_perspective" varchar DEFAULT '',
  	"details_context_purpose" varchar DEFAULT '',
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_tone_id" integer,
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "narratives_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_content" jsonb,
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "narratives_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"locations_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"leaders_id" integer,
  	"organizations_id" integer,
  	"individuals_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "stories_traits_concerns_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "stories_traits_concerns_list_locales" (
  	"conflict" varchar DEFAULT '',
  	"stakes" varchar DEFAULT '',
  	"resolution" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "stories_traits_interactions_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "stories_traits_interactions_list_locales" (
  	"dynamics" "enum_stories_traits_interactions_list_dynamics",
  	"outcome" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_stories_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_thumbnail_id" integer,
  	"assets_cover_id" integer,
  	"assets_gallery_id" integer,
  	"assets_playlist_id" integer,
  	"assets_visualization_id" integer,
  	"assets_documents_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stories_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_alias" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "stories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"highlights_id" integer,
  	"incidents_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "histories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_histories_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_content_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_legacy_impact" "enum_histories_traits_legacy_impact",
  	"traits_legacy_memory" "enum_histories_traits_legacy_memory",
  	"traits_legacy_legacy" varchar DEFAULT '',
  	"traits_evolution_origin" varchar DEFAULT '',
  	"traits_evolution_development" varchar DEFAULT '',
  	"traits_evolution_lineage" varchar DEFAULT '',
  	"traits_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_thumbnail_id" integer,
  	"assets_gallery_id" integer,
  	"assets_playlist_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "histories_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "histories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"stories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "journeys_traits_lessons_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"lesson" varchar DEFAULT '',
  	"application" varchar DEFAULT '',
  	"significance" "enum_journeys_traits_lessons_list_significance",
  	"impact" "enum_journeys_traits_lessons_list_impact",
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "journeys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_journeys_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_content_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_thumbnail_id" integer,
  	"assets_gallery_id" integer,
  	"assets_playlist_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "journeys_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "journeys_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"stories_id" integer,
  	"decisions_id" integer,
  	"impacts_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "notes_traits_intentions_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "notes_traits_intentions_list_locales" (
  	"type" "enum_notes_traits_intentions_list_type",
  	"impact" "enum_notes_traits_intentions_list_impact",
  	"remark" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "notes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_notes_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_thumbnail_id" integer,
  	"assets_archive_id" integer,
  	"assets_visualization_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "notes_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "notes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_pages_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "cars" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_cars_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_identifiers_chassis" varchar DEFAULT '',
  	"basics_identifiers_version" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_status" "enum_cars_details_status",
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_thumbnail_id" integer NOT NULL,
  	"assets_cover_id" integer,
  	"assets_gallery_id" integer,
  	"assets_playlist_id" integer,
  	"assets_visualization_id" integer,
  	"assets_documents_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_content_histories_id" integer,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cars_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_identifiers_model" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "cars_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"classifications_id" integer,
  	"features_id" integer,
  	"specifications_id" integer,
  	"organizations_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"leaders_id" integer,
  	"individuals_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "kits_traits_materials_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_kits_traits_materials_list_type",
  	"specification" varchar DEFAULT '',
  	"origin" varchar DEFAULT '',
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "kits" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_kits_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_purpose_application" "enum_kits_basics_purpose_application",
  	"basics_purpose_context" varchar DEFAULT '',
  	"basics_purpose_conditions" varchar DEFAULT '',
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_design_designer" varchar DEFAULT '',
  	"details_design_year" timestamp(3) with time zone,
  	"details_appearance_colors" varchar DEFAULT '',
  	"details_appearance_branding" "enum_kits_details_appearance_branding",
  	"details_appearance_style" "enum_kits_details_appearance_style",
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_composition_construction" "enum_kits_traits_composition_construction",
  	"traits_composition_assembly" "enum_kits_traits_composition_assembly",
  	"traits_composition_finish" "enum_kits_traits_composition_finish",
  	"traits_functionality_performance" "enum_kits_traits_functionality_performance",
  	"traits_functionality_durability" "enum_kits_traits_functionality_durability",
  	"traits_functionality_comfort" "enum_kits_traits_functionality_comfort",
  	"traits_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_thumbnail_id" integer NOT NULL,
  	"assets_cover_id" integer,
  	"assets_gallery_id" integer,
  	"assets_visualizations_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "kits_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_design_concept" varchar DEFAULT '',
  	"details_design_inspiration" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "kits_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"leaders_id" integer,
  	"organizations_id" integer,
  	"individuals_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"caption" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "galleries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_galleries_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "galleries_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "galleries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"media_id" integer,
  	"narratives_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "playlists" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_playlists_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_quality" "enum_playlists_traits_quality",
  	"traits_format" "enum_playlists_traits_format",
  	"traits_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "playlists_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "playlists_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"media_id" integer,
  	"narratives_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "archives" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_archives_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "archives_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "archives_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"media_id" integer,
  	"narratives_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "visualizations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_visualizations_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "visualizations_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "visualizations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"media_id" integer,
  	"narratives_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "schedules_details_slots_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"activity" varchar DEFAULT '',
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone,
  	"duration" numeric DEFAULT 0,
  	"location_id" integer,
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "schedules_traits_constraints_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"constraint" varchar DEFAULT '',
  	"type" "enum_schedules_traits_constraints_list_type",
  	"impact" "enum_schedules_traits_constraints_list_impact",
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "schedules" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_schedules_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_scope_significance" "enum_schedules_basics_scope_significance",
  	"basics_scope_scale" "enum_schedules_basics_scope_scale",
  	"basics_scope_depth" "enum_schedules_basics_scope_depth",
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_chronology_date" timestamp(3) with time zone,
  	"details_chronology_type" "enum_schedules_details_chronology_type",
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "schedules_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_agenda" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "schedules_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"leaders_id" integer,
  	"individuals_id" integer,
  	"organizations_id" integer,
  	"trainings_id" integer,
  	"meetups_id" integer,
  	"initiatives_id" integer,
  	"celebrations_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "trainings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_trainings_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_gallery_id" integer,
  	"assets_playlist_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "trainings_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"details_narrative_id" integer,
  	"traits_intensity" "enum_trainings_traits_intensity",
  	"traits_format" "enum_trainings_traits_format",
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "trainings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"specifications_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"leaders_id" integer,
  	"individuals_id" integer,
  	"organizations_id" integer,
  	"strategies_id" integer,
  	"skills_id" integer,
  	"stories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "careers_details_positions_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '',
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone,
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "careers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_careers_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_contract" "enum_careers_details_contract",
  	"details_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "careers_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "careers_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"expectations_id" integer,
  	"highlights_id" integer,
  	"awards_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"leaders_id" integer,
  	"individuals_id" integer,
  	"organizations_id" integer,
  	"cars_id" integer,
  	"stories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "initiatives" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_initiatives_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_status" "enum_initiatives_details_status",
  	"details_classifications_id" integer,
  	"details_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_primary_id" integer NOT NULL,
  	"assets_gallery_id" integer,
  	"assets_documents_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "initiatives_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_mission" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "initiatives_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"schedules_id" integer,
  	"strategies_id" integer,
  	"expectations_id" integer,
  	"organizations_id" integer,
  	"leaders_id" integer,
  	"individuals_id" integer,
  	"incidents_id" integer,
  	"celebrations_id" integer,
  	"histories_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "meetups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_meetups_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_date" timestamp(3) with time zone,
  	"basics_location_id" integer,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_format" "enum_meetups_traits_format",
  	"traits_access" "enum_meetups_traits_access",
  	"traits_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_primary_id" integer NOT NULL,
  	"assets_gallery_id" integer,
  	"assets_playlist_id" integer,
  	"assets_materials_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "meetups_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "meetups_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"features_id" integer,
  	"schedules_id" integer,
  	"specifications_id" integer,
  	"organizations_id" integer,
  	"leaders_id" integer,
  	"individuals_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"initiatives_id" integer,
  	"celebrations_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "celebrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_celebrations_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_prestige" "enum_celebrations_details_prestige",
  	"details_exclusivity" "enum_celebrations_details_exclusivity",
  	"details_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_primary_id" integer NOT NULL,
  	"assets_gallery_id" integer,
  	"assets_playlist_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "celebrations_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "celebrations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"expectations_id" integer,
  	"stories_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"leaders_id" integer,
  	"organizations_id" integer,
  	"individuals_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "protocols_details_steps_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"step" varchar DEFAULT '',
  	"instruction" varchar DEFAULT '',
  	"requirement" varchar DEFAULT '',
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "protocols" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_protocols_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_identifier_code" varchar DEFAULT '',
  	"basics_identifier_version" varchar DEFAULT '',
  	"basics_identifier_revision" varchar DEFAULT '',
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "protocols_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_objective" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_procedure" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "protocols_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"archives_id" integer,
  	"classifications_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "duties" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_duties_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "duties_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "duties_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"protocols_id" integer,
  	"expectations_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "expectations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_expectations_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_direction" "enum_expectations_traits_direction",
  	"traits_priority" "enum_expectations_traits_priority",
  	"traits_flexibility" "enum_expectations_traits_flexibility",
  	"traits_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "expectations_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_statement" varchar DEFAULT '',
  	"details_criteria" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "expectations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"specifications_id" integer,
  	"protocols_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "highlights" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_highlights_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_content_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_thumbnail_id" integer,
  	"assets_gallery_id" integer,
  	"assets_playlist_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "highlights_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "highlights_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"stories_id" integer,
  	"specifications_id" integer,
  	"drivers_id" integer,
  	"cars_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "incidents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_incidents_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_content_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_thumbnail_id" integer,
  	"assets_gallery_id" integer,
  	"assets_archive_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "incidents_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "incidents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"specifications_id" integer,
  	"decisions_id" integer,
  	"impacts_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"leaders_id" integer,
  	"organizations_id" integer,
  	"individuals_id" integer,
  	"cars_id" integer,
  	"kits_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "impacts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_impacts_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_scope_significance" varchar DEFAULT '',
  	"details_scope_scale" "enum_impacts_details_scope_scale",
  	"details_scope_depth" "enum_impacts_details_scope_depth",
  	"details_scope_rarity" "enum_impacts_details_scope_rarity",
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_tone_id" integer,
  	"traits_velocity" "enum_impacts_traits_velocity",
  	"traits_gravity" "enum_impacts_traits_gravity",
  	"traits_permanence" "enum_impacts_traits_permanence",
  	"traits_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "impacts_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "impacts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"notes_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"leaders_id" integer,
  	"organizations_id" integer,
  	"individuals_id" integer,
  	"cars_id" integer,
  	"kits_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "decisions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_decisions_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_content_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "decisions_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "decisions_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"notes_id" integer,
  	"features_id" integer,
  	"specifications_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"leaders_id" integer,
  	"organizations_id" integer,
  	"individuals_id" integer,
  	"protocols_id" integer,
  	"preferences_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "strategies_details_outcomes_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "strategies_traits_directives_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "strategies_traits_directives_list_locales" (
  	"phase" varchar DEFAULT '',
  	"action" varchar DEFAULT '',
  	"owner" varchar DEFAULT '',
  	"deadline" timestamp(3) with time zone,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "strategies_traits_contingencies_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "strategies_traits_contingencies_list_locales" (
  	"trigger" varchar DEFAULT '',
  	"response" varchar DEFAULT '',
  	"probability" "enum_strategies_traits_contingencies_list_probability",
  	"impact" "enum_strategies_traits_contingencies_list_impact",
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "strategies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_strategies_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_content_narrative_id" integer,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "strategies_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"details_methodology" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "strategies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"decisions_id" integer,
  	"impacts_id" integer,
  	"leaders_id" integer,
  	"organizations_id" integer,
  	"individuals_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "awards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_awards_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_content_narrative_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_thumbnail_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "awards_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "awards_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"stories_id" integer,
  	"visualizations_id" integer,
  	"leaders_id" integer,
  	"organizations_id" integer,
  	"individuals_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "experiences_traits_skills_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"skill_id" integer,
  	"proficiency" "enum_experiences_traits_skills_list_proficiency",
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_experiences_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_content_narrative_id" integer,
  	"details_content_journey_id" integer,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_visibility_show" boolean DEFAULT false,
  	"assets_enable" boolean DEFAULT true,
  	"assets_gallery_id" integer,
  	"assets_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experiences_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "experiences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"highlights_id" integer,
  	"incidents_id" integer,
  	"media_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"leaders_id" integer,
  	"organizations_id" integer,
  	"individuals_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "categories_details_type" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar DEFAULT ''
  );
  
  CREATE TABLE "categories_details_type_locales" (
  	"label" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_categories_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "categories_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "categories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_tags_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"basics_context" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tags_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "tones_traits_qualities_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quality" "enum_tones_traits_qualities_list_quality",
  	"intensity" "enum_tones_traits_qualities_list_intensity",
  	"mood" "enum_tones_traits_qualities_list_mood",
  	"scale" "enum_tones_traits_qualities_list_scale",
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "tones" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_tones_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_scope_significance" varchar DEFAULT '',
  	"traits_scope_scale" "enum_tones_traits_scope_scale",
  	"traits_scope_depth" "enum_tones_traits_scope_depth",
  	"traits_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tones_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tones_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "features" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_features_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_nature_complexity" "enum_features_traits_nature_complexity",
  	"traits_nature_visibility" "enum_features_traits_nature_visibility",
  	"traits_nature_impact" "enum_features_traits_nature_impact",
  	"traits_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "features_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"details_functionality" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "features_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "specifications_traits_conditions_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"environment" varchar DEFAULT '',
  	"constraints" varchar DEFAULT '',
  	"compliance" "enum_specifications_traits_conditions_list_compliance",
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "specifications_metrics_parameters_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"parameter" varchar DEFAULT '',
  	"value" varchar DEFAULT '',
  	"unit" varchar DEFAULT '',
  	"tolerance" varchar DEFAULT '',
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "specifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_specifications_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_identifier_code" varchar DEFAULT '',
  	"basics_identifier_version" varchar DEFAULT '',
  	"basics_identifier_revision" varchar DEFAULT '',
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"metrics_enable" boolean DEFAULT true,
  	"metrics_measurement_method" varchar DEFAULT '',
  	"metrics_measurement_frequency" "enum_specifications_metrics_measurement_frequency",
  	"metrics_measurement_accuracy" "enum_specifications_metrics_measurement_accuracy",
  	"metrics_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "specifications_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"details_definition" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "specifications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "classifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_classifications_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "classifications_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"details_definition" varchar DEFAULT '',
  	"details_criteria" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "classifications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "skills_traits_methods_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"method" varchar DEFAULT '',
  	"type" "enum_skills_traits_methods_list_type",
  	"description" varchar DEFAULT '',
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "skills_traits_dependencies_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"skill_id" integer,
  	"type" "enum_skills_traits_dependencies_list_type",
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "skills" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_skills_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_scope_significance" varchar DEFAULT '',
  	"basics_scope_scale" "enum_skills_basics_scope_scale",
  	"basics_scope_depth" "enum_skills_basics_scope_depth",
  	"basics_scope_rarity" "enum_skills_basics_scope_rarity",
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_nature_complexity" "enum_skills_traits_nature_complexity",
  	"traits_nature_visibility" "enum_skills_traits_nature_visibility",
  	"traits_nature_impact" "enum_skills_traits_nature_impact",
  	"traits_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "skills_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"details_definition" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "skills_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"classifications_id" integer,
  	"features_id" integer,
  	"specifications_id" integer,
  	"trainings_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "principles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_principles_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "principles_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"basics_statement" varchar DEFAULT '',
  	"details_application" varchar DEFAULT '',
  	"details_rationale" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "principles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "preferences_traits_conditions_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"trigger" varchar DEFAULT '',
  	"prerequisite" varchar DEFAULT '',
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "preferences_traits_reasons_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"reason" varchar DEFAULT '',
  	"importance" "enum_preferences_traits_reasons_list_importance",
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_preferences_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "preferences_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"principles_id" integer,
  	"notes_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "channels_traits_usage_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"role" "enum_channels_traits_usage_list_role",
  	"function" "enum_channels_traits_usage_list_function",
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "channels_traits_usage_list_locales" (
  	"purpose" varchar DEFAULT '',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "channels_traits_validity_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"status" "enum_channels_traits_validity_list_status",
  	"condition" "enum_channels_traits_validity_list_condition",
  	"state" "enum_channels_traits_validity_list_state",
  	"settings_show" boolean DEFAULT true,
  	"settings_featured" boolean DEFAULT false,
  	"settings_pinned" boolean DEFAULT false
  );
  
  CREATE TABLE "channels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_channels_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_protocol_format" "enum_channels_details_protocol_format",
  	"details_protocol_scheme" "enum_channels_details_protocol_scheme",
  	"details_protocol_specification" varchar DEFAULT '',
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "channels_locales" (
  	"name" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_identifier_label" varchar DEFAULT '',
  	"details_identifier_title" varchar DEFAULT '',
  	"details_address_value" varchar DEFAULT '',
  	"details_address_locator" varchar DEFAULT '',
  	"details_address_endpoint" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "channels_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"toggle" "enum_locations_toggle" DEFAULT 'advanced',
  	"basics_enable" boolean DEFAULT true,
  	"basics_visibility_show" boolean DEFAULT false,
  	"details_enable" boolean DEFAULT true,
  	"details_geometry_coordinates" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)',
  	"details_geometry_bounds" varchar DEFAULT '',
  	"details_geometry_area" varchar DEFAULT '',
  	"details_visibility_show" boolean DEFAULT false,
  	"traits_enable" boolean DEFAULT true,
  	"traits_geography_terrain" varchar DEFAULT '',
  	"traits_geography_climate" "enum_locations_traits_geography_climate",
  	"traits_geography_features" varchar DEFAULT '',
  	"traits_infrastructure_transport" varchar DEFAULT '',
  	"traits_infrastructure_facilities" varchar DEFAULT '',
  	"traits_infrastructure_amenities" varchar DEFAULT '',
  	"traits_accessibility_approach" "enum_locations_traits_accessibility_approach",
  	"traits_accessibility_facilities" "enum_locations_traits_accessibility_facilities",
  	"traits_accessibility_capacity" "enum_locations_traits_accessibility_capacity",
  	"traits_visibility_show" boolean DEFAULT false,
  	"contexts_enable" boolean DEFAULT true,
  	"contexts_visibility_show" boolean DEFAULT false,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"visibility_check_publish" boolean DEFAULT false,
  	"visibility_check_featured" boolean DEFAULT false,
  	"visibility_check_pinned" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "locations_locales" (
  	"name" varchar DEFAULT '' NOT NULL,
  	"basics_label" varchar DEFAULT '',
  	"basics_title" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_address" varchar DEFAULT '',
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "locations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"leaders_id" integer,
  	"organizations_id" integer,
  	"individuals_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "forms_blocks_checkbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"default_value" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_country" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_country_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_email" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_email_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_message" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_number" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"default_value" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_number_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"placeholder" varchar,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_state" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_state_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_textarea" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"width" numeric,
  	"required" boolean,
  	"block_name" varchar
  );
  
  CREATE TABLE "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"email_to" varchar,
  	"cc" varchar,
  	"bcc" varchar,
  	"reply_to" varchar,
  	"email_from" varchar
  );
  
  CREATE TABLE "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"confirmation_type" "enum_forms_confirmation_type" DEFAULT 'message',
  	"redirect_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "form_submissions_submission_data" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "form_submissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "addresses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"customer_id" integer,
  	"title" varchar,
  	"first_name" varchar,
  	"last_name" varchar,
  	"company" varchar,
  	"address_line1" varchar,
  	"address_line2" varchar,
  	"city" varchar,
  	"state" varchar,
  	"postal_code" varchar,
  	"country" "enum_addresses_country" NOT NULL,
  	"phone" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "variants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"product_id" integer,
  	"inventory" numeric DEFAULT 0,
  	"price_in_u_s_d_enabled" boolean,
  	"price_in_u_s_d" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_variants_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "variants_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"variant_options_id" integer
  );
  
  CREATE TABLE "_variants_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_product_id" integer,
  	"version_inventory" numeric DEFAULT 0,
  	"version_price_in_u_s_d_enabled" boolean,
  	"version_price_in_u_s_d" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__variants_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__variants_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_variants_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"variant_options_id" integer
  );
  
  CREATE TABLE "variant_types" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "variant_options" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_variantoptions_options_order" varchar,
  	"variant_type_id" integer NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "products_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"variant_option_id" integer
  );
  
  CREATE TABLE "products_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_products_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_products_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "products_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_products_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_products_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_products_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "products_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "products_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" jsonb,
  	"inventory" numeric DEFAULT 0,
  	"enable_variants" boolean,
  	"price_in_u_s_d_enabled" boolean,
  	"price_in_u_s_d" numeric,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"deleted_at" timestamp(3) with time zone,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "products_locales" (
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "products_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"variant_types_id" integer,
  	"products_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "_products_v_version_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"variant_option_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__products_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__products_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__products_v_blocks_content_columns_size" DEFAULT 'oneThird',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__products_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__products_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_products_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_description" jsonb,
  	"version_inventory" numeric DEFAULT 0,
  	"version_enable_variants" boolean,
  	"version_price_in_u_s_d_enabled" boolean,
  	"version_price_in_u_s_d" numeric,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version_deleted_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__products_v_published_locale",
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_products_v_locales" (
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_products_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"variant_types_id" integer,
  	"products_id" integer,
  	"categories_id" integer
  );
  
  CREATE TABLE "carts_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"variant_id" integer,
  	"quantity" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE "carts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"secret" varchar,
  	"customer_id" integer,
  	"purchased_at" timestamp(3) with time zone,
  	"subtotal" numeric,
  	"currency" "enum_carts_currency" DEFAULT 'USD',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "orders_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"variant_id" integer,
  	"quantity" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE "orders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"shipping_address_title" varchar,
  	"shipping_address_first_name" varchar,
  	"shipping_address_last_name" varchar,
  	"shipping_address_company" varchar,
  	"shipping_address_address_line1" varchar,
  	"shipping_address_address_line2" varchar,
  	"shipping_address_city" varchar,
  	"shipping_address_state" varchar,
  	"shipping_address_postal_code" varchar,
  	"shipping_address_country" varchar,
  	"shipping_address_phone" varchar,
  	"customer_id" integer,
  	"customer_email" varchar,
  	"status" "enum_orders_status" DEFAULT 'processing',
  	"amount" numeric,
  	"currency" "enum_orders_currency" DEFAULT 'USD',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "orders_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"transactions_id" integer
  );
  
  CREATE TABLE "transactions_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" integer,
  	"variant_id" integer,
  	"quantity" numeric DEFAULT 1 NOT NULL
  );
  
  CREATE TABLE "transactions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"payment_method" "enum_transactions_payment_method",
  	"stripe_customer_i_d" varchar,
  	"stripe_payment_intent_i_d" varchar,
  	"billing_address_title" varchar,
  	"billing_address_first_name" varchar,
  	"billing_address_last_name" varchar,
  	"billing_address_company" varchar,
  	"billing_address_address_line1" varchar,
  	"billing_address_address_line2" varchar,
  	"billing_address_city" varchar,
  	"billing_address_state" varchar,
  	"billing_address_postal_code" varchar,
  	"billing_address_country" varchar,
  	"billing_address_phone" varchar,
  	"status" "enum_transactions_status" DEFAULT 'pending' NOT NULL,
  	"customer_id" integer,
  	"customer_email" varchar,
  	"order_id" integer,
  	"cart_id" integer,
  	"amount" numeric,
  	"currency" "enum_transactions_currency" DEFAULT 'USD',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"priority" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"series_id" integer,
  	"seasons_id" integer,
  	"events_id" integer,
  	"sessions_id" integer,
  	"entries_id" integer,
  	"results_id" integer,
  	"points_id" integer,
  	"drivers_id" integer,
  	"leaders_id" integer,
  	"members_id" integer,
  	"individuals_id" integer,
  	"organizations_id" integer,
  	"users_id" integer,
  	"narratives_id" integer,
  	"stories_id" integer,
  	"histories_id" integer,
  	"journeys_id" integer,
  	"notes_id" integer,
  	"pages_id" integer,
  	"cars_id" integer,
  	"kits_id" integer,
  	"media_id" integer,
  	"galleries_id" integer,
  	"playlists_id" integer,
  	"archives_id" integer,
  	"visualizations_id" integer,
  	"schedules_id" integer,
  	"trainings_id" integer,
  	"careers_id" integer,
  	"initiatives_id" integer,
  	"meetups_id" integer,
  	"celebrations_id" integer,
  	"protocols_id" integer,
  	"duties_id" integer,
  	"expectations_id" integer,
  	"highlights_id" integer,
  	"incidents_id" integer,
  	"impacts_id" integer,
  	"decisions_id" integer,
  	"strategies_id" integer,
  	"awards_id" integer,
  	"experiences_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"tones_id" integer,
  	"features_id" integer,
  	"specifications_id" integer,
  	"classifications_id" integer,
  	"skills_id" integer,
  	"principles_id" integer,
  	"preferences_id" integer,
  	"channels_id" integer,
  	"locations_id" integer
  );
  
  CREATE TABLE "payload_mcp_api_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"header_find" boolean DEFAULT false,
  	"header_update" boolean DEFAULT false,
  	"footer_find" boolean DEFAULT false,
  	"footer_update" boolean DEFAULT false,
  	"identity_find" boolean DEFAULT false,
  	"identity_update" boolean DEFAULT false,
  	"policies_find" boolean DEFAULT false,
  	"policies_update" boolean DEFAULT false,
  	"socials_find" boolean DEFAULT false,
  	"socials_update" boolean DEFAULT false,
  	"announcements_find" boolean DEFAULT false,
  	"announcements_update" boolean DEFAULT false,
  	"questions_find" boolean DEFAULT false,
  	"questions_update" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"series_id" integer,
  	"seasons_id" integer,
  	"events_id" integer,
  	"sessions_id" integer,
  	"entries_id" integer,
  	"results_id" integer,
  	"points_id" integer,
  	"drivers_id" integer,
  	"leaders_id" integer,
  	"members_id" integer,
  	"individuals_id" integer,
  	"organizations_id" integer,
  	"users_id" integer,
  	"narratives_id" integer,
  	"stories_id" integer,
  	"histories_id" integer,
  	"journeys_id" integer,
  	"notes_id" integer,
  	"pages_id" integer,
  	"cars_id" integer,
  	"kits_id" integer,
  	"media_id" integer,
  	"galleries_id" integer,
  	"playlists_id" integer,
  	"archives_id" integer,
  	"visualizations_id" integer,
  	"schedules_id" integer,
  	"trainings_id" integer,
  	"careers_id" integer,
  	"initiatives_id" integer,
  	"meetups_id" integer,
  	"celebrations_id" integer,
  	"protocols_id" integer,
  	"duties_id" integer,
  	"expectations_id" integer,
  	"highlights_id" integer,
  	"incidents_id" integer,
  	"impacts_id" integer,
  	"decisions_id" integer,
  	"strategies_id" integer,
  	"awards_id" integer,
  	"experiences_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"tones_id" integer,
  	"features_id" integer,
  	"specifications_id" integer,
  	"classifications_id" integer,
  	"skills_id" integer,
  	"principles_id" integer,
  	"preferences_id" integer,
  	"channels_id" integer,
  	"locations_id" integer,
  	"forms_id" integer,
  	"form_submissions_id" integer,
  	"addresses_id" integer,
  	"variants_id" integer,
  	"variant_types_id" integer,
  	"variant_options_id" integer,
  	"products_id" integer,
  	"carts_id" integer,
  	"orders_id" integer,
  	"transactions_id" integer,
  	"search_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"payload_mcp_api_keys_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "header_nav_items_sub_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"description" varchar,
  	"link_type" "enum_header_nav_items_sub_items_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"is_featured" boolean DEFAULT false
  );
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"tagline" varchar,
  	"description" varchar,
  	"spotlight_enable" boolean DEFAULT false,
  	"spotlight_label" varchar,
  	"spotlight_override_url" varchar,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "header_utility_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_header_utility_nav_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_enable" boolean DEFAULT true,
  	"cta_label" varchar,
  	"cta_link_type" "enum_header_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "header_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer,
  	"drivers_id" integer,
  	"leaders_id" integer,
  	"members_id" integer,
  	"cars_id" integer,
  	"kits_id" integer,
  	"series_id" integer,
  	"seasons_id" integer,
  	"events_id" integer,
  	"awards_id" integer,
  	"stories_id" integer,
  	"journeys_id" integer,
  	"histories_id" integer,
  	"initiatives_id" integer,
  	"celebrations_id" integer,
  	"meetups_id" integer,
  	"careers_id" integer,
  	"trainings_id" integer,
  	"organizations_id" integer
  );
  
  CREATE TABLE "footer_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_footer_columns_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "footer_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "footer_legal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_type" "enum_footer_legal_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_enable" boolean DEFAULT true,
  	"brand_logo_id" integer,
  	"brand_tagline" varchar,
  	"brand_description" varchar,
  	"cta_enable" boolean DEFAULT true,
  	"cta_headline" varchar,
  	"cta_subtext" varchar,
  	"cta_button_label" varchar,
  	"cta_link_type" "enum_footer_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar NOT NULL,
  	"copyright" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"pages_id" integer
  );
  
  CREATE TABLE "identity_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"principle_id" integer
  );
  
  CREATE TABLE "identity_values_locales" (
  	"value" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "identity" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"story_id" integer,
  	"visual_logo_id" integer,
  	"visual_logo_inverted_id" integer,
  	"visual_wordmark_id" integer,
  	"visual_favicon_id" integer,
  	"visual_primary_colour" varchar,
  	"visual_secondary_colour" varchar,
  	"visual_guidelines_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "identity_locales" (
  	"vision" varchar,
  	"mission" varchar,
  	"voice_description" varchar,
  	"sustainability_stance" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "identity_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tones_id" integer,
  	"leaders_id" integer,
  	"initiatives_id" integer
  );
  
  CREATE TABLE "policies_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_policies_documents_type" NOT NULL,
  	"version" varchar,
  	"last_updated" timestamp(3) with time zone,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "policies_documents_locales" (
  	"title" varchar NOT NULL,
  	"body" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "policies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "socials_accounts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_socials_accounts_platform" NOT NULL,
  	"label" varchar,
  	"handle" varchar,
  	"url" varchar NOT NULL,
  	"channel_id" integer,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "socials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "announcements_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_announcements_items_type" DEFAULT 'info' NOT NULL,
  	"link_enable" boolean DEFAULT false,
  	"link_label" varchar,
  	"link_url" varchar,
  	"schedule_from" timestamp(3) with time zone,
  	"schedule_until" timestamp(3) with time zone,
  	"audience" "enum_announcements_items_audience" DEFAULT 'all',
  	"dismissible" boolean DEFAULT true,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "announcements_items_locales" (
  	"title" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "announcements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "questions_categories_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"related_page" varchar,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "questions_categories_items_locales" (
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "questions_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "questions_categories_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "questions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "series" ADD CONSTRAINT "series_details_content_history_id_histories_id_fk" FOREIGN KEY ("details_content_history_id") REFERENCES "public"."histories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series" ADD CONSTRAINT "series_details_content_narrative_id_narratives_id_fk" FOREIGN KEY ("details_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series" ADD CONSTRAINT "series_traits_heritage_predecessor_id_series_id_fk" FOREIGN KEY ("traits_heritage_predecessor_id") REFERENCES "public"."series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series" ADD CONSTRAINT "series_traits_heritage_successor_id_series_id_fk" FOREIGN KEY ("traits_heritage_successor_id") REFERENCES "public"."series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series" ADD CONSTRAINT "series_metrics_schedule_id_schedules_id_fk" FOREIGN KEY ("metrics_schedule_id") REFERENCES "public"."schedules"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series" ADD CONSTRAINT "series_assets_logo_id_media_id_fk" FOREIGN KEY ("assets_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series" ADD CONSTRAINT "series_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series_locales" ADD CONSTRAINT "series_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series_locales" ADD CONSTRAINT "series_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_archives_fk" FOREIGN KEY ("archives_id") REFERENCES "public"."archives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons" ADD CONSTRAINT "seasons_series_id_series_id_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seasons" ADD CONSTRAINT "seasons_details_content_narrative_id_narratives_id_fk" FOREIGN KEY ("details_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seasons" ADD CONSTRAINT "seasons_details_content_history_id_histories_id_fk" FOREIGN KEY ("details_content_history_id") REFERENCES "public"."histories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seasons" ADD CONSTRAINT "seasons_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seasons" ADD CONSTRAINT "seasons_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seasons" ADD CONSTRAINT "seasons_assets_playlist_id_playlists_id_fk" FOREIGN KEY ("assets_playlist_id") REFERENCES "public"."playlists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seasons_locales" ADD CONSTRAINT "seasons_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seasons_locales" ADD CONSTRAINT "seasons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_protocols_fk" FOREIGN KEY ("protocols_id") REFERENCES "public"."protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_schedules_fk" FOREIGN KEY ("schedules_id") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_archives_fk" FOREIGN KEY ("archives_id") REFERENCES "public"."archives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_season_id_seasons_id_fk" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_details_content_narrative_id_narratives_id_fk" FOREIGN KEY ("details_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_details_content_history_id_histories_id_fk" FOREIGN KEY ("details_content_history_id") REFERENCES "public"."histories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_metrics_attributes_location_id_locations_id_fk" FOREIGN KEY ("metrics_attributes_location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_assets_poster_id_media_id_fk" FOREIGN KEY ("assets_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_assets_playlist_id_playlists_id_fk" FOREIGN KEY ("assets_playlist_id") REFERENCES "public"."playlists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_assets_archive_id_archives_id_fk" FOREIGN KEY ("assets_archive_id") REFERENCES "public"."archives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_protocols_fk" FOREIGN KEY ("protocols_id") REFERENCES "public"."protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_highlights_fk" FOREIGN KEY ("highlights_id") REFERENCES "public"."highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_traits_parameters_list" ADD CONSTRAINT "sessions_traits_parameters_list_parameter_id_classifications_id_fk" FOREIGN KEY ("parameter_id") REFERENCES "public"."classifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sessions_traits_parameters_list" ADD CONSTRAINT "sessions_traits_parameters_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_details_content_narrative_id_narratives_id_fk" FOREIGN KEY ("details_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_details_content_history_id_histories_id_fk" FOREIGN KEY ("details_content_history_id") REFERENCES "public"."histories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_traits_constraints_type_id_classifications_id_fk" FOREIGN KEY ("traits_constraints_type_id") REFERENCES "public"."classifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_assets_playlist_id_playlists_id_fk" FOREIGN KEY ("assets_playlist_id") REFERENCES "public"."playlists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sessions_locales" ADD CONSTRAINT "sessions_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sessions_locales" ADD CONSTRAINT "sessions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_protocols_fk" FOREIGN KEY ("protocols_id") REFERENCES "public"."protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_strategies_fk" FOREIGN KEY ("strategies_id") REFERENCES "public"."strategies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_highlights_fk" FOREIGN KEY ("highlights_id") REFERENCES "public"."highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_incidents_fk" FOREIGN KEY ("incidents_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries" ADD CONSTRAINT "entries_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entries" ADD CONSTRAINT "entries_details_content_narrative_id_narratives_id_fk" FOREIGN KEY ("details_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entries" ADD CONSTRAINT "entries_metrics_parameters_parameter_id_classifications_id_fk" FOREIGN KEY ("metrics_parameters_parameter_id") REFERENCES "public"."classifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entries" ADD CONSTRAINT "entries_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entries" ADD CONSTRAINT "entries_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entries" ADD CONSTRAINT "entries_assets_playlist_id_playlists_id_fk" FOREIGN KEY ("assets_playlist_id") REFERENCES "public"."playlists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entries" ADD CONSTRAINT "entries_contexts_associations_crew_id_members_id_fk" FOREIGN KEY ("contexts_associations_crew_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entries" ADD CONSTRAINT "entries_contexts_associations_car_id_cars_id_fk" FOREIGN KEY ("contexts_associations_car_id") REFERENCES "public"."cars"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entries_locales" ADD CONSTRAINT "entries_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entries_locales" ADD CONSTRAINT "entries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_rels" ADD CONSTRAINT "entries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_rels" ADD CONSTRAINT "entries_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_rels" ADD CONSTRAINT "entries_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_rels" ADD CONSTRAINT "entries_rels_preferences_fk" FOREIGN KEY ("preferences_id") REFERENCES "public"."preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_rels" ADD CONSTRAINT "entries_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_rels" ADD CONSTRAINT "entries_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_rels" ADD CONSTRAINT "entries_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_rels" ADD CONSTRAINT "entries_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_rels" ADD CONSTRAINT "entries_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_metrics_stoppages" ADD CONSTRAINT "results_metrics_stoppages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results" ADD CONSTRAINT "results_details_content_narrative_id_narratives_id_fk" FOREIGN KEY ("details_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results" ADD CONSTRAINT "results_assets_visualization_id_visualizations_id_fk" FOREIGN KEY ("assets_visualization_id") REFERENCES "public"."visualizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results_locales" ADD CONSTRAINT "results_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results_locales" ADD CONSTRAINT "results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_rels" ADD CONSTRAINT "results_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_rels" ADD CONSTRAINT "results_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_rels" ADD CONSTRAINT "results_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_rels" ADD CONSTRAINT "results_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_rels" ADD CONSTRAINT "results_rels_highlights_fk" FOREIGN KEY ("highlights_id") REFERENCES "public"."highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_rels" ADD CONSTRAINT "results_rels_incidents_fk" FOREIGN KEY ("incidents_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_rels" ADD CONSTRAINT "results_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points_traits_modifiers_list" ADD CONSTRAINT "points_traits_modifiers_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points" ADD CONSTRAINT "points_contexts_connections_participants_id_drivers_id_fk" FOREIGN KEY ("contexts_connections_participants_id") REFERENCES "public"."drivers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "points_locales" ADD CONSTRAINT "points_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "points_locales" ADD CONSTRAINT "points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points_rels" ADD CONSTRAINT "points_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points_rels" ADD CONSTRAINT "points_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points_rels" ADD CONSTRAINT "points_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points_rels" ADD CONSTRAINT "points_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points_rels" ADD CONSTRAINT "points_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points_rels" ADD CONSTRAINT "points_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points_rels" ADD CONSTRAINT "points_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points_rels" ADD CONSTRAINT "points_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers" ADD CONSTRAINT "drivers_details_about_narrative_id_narratives_id_fk" FOREIGN KEY ("details_about_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers" ADD CONSTRAINT "drivers_details_about_biography_id_histories_id_fk" FOREIGN KEY ("details_about_biography_id") REFERENCES "public"."histories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers" ADD CONSTRAINT "drivers_assets_avatar_id_media_id_fk" FOREIGN KEY ("assets_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers" ADD CONSTRAINT "drivers_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers" ADD CONSTRAINT "drivers_assets_autograph_id_media_id_fk" FOREIGN KEY ("assets_autograph_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers" ADD CONSTRAINT "drivers_assets_helmet_id_media_id_fk" FOREIGN KEY ("assets_helmet_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers" ADD CONSTRAINT "drivers_assets_suit_id_media_id_fk" FOREIGN KEY ("assets_suit_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers_locales" ADD CONSTRAINT "drivers_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers_locales" ADD CONSTRAINT "drivers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_journeys_fk" FOREIGN KEY ("journeys_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_channels_fk" FOREIGN KEY ("channels_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_trainings_fk" FOREIGN KEY ("trainings_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_points_fk" FOREIGN KEY ("points_id") REFERENCES "public"."points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_results_fk" FOREIGN KEY ("results_id") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_galleries_fk" FOREIGN KEY ("galleries_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_kits_fk" FOREIGN KEY ("kits_id") REFERENCES "public"."kits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders" ADD CONSTRAINT "leaders_details_about_narrative_id_narratives_id_fk" FOREIGN KEY ("details_about_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leaders" ADD CONSTRAINT "leaders_details_about_biography_id_histories_id_fk" FOREIGN KEY ("details_about_biography_id") REFERENCES "public"."histories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leaders" ADD CONSTRAINT "leaders_assets_avatar_id_media_id_fk" FOREIGN KEY ("assets_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leaders" ADD CONSTRAINT "leaders_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leaders_locales" ADD CONSTRAINT "leaders_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leaders_locales" ADD CONSTRAINT "leaders_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_principles_fk" FOREIGN KEY ("principles_id") REFERENCES "public"."principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_channels_fk" FOREIGN KEY ("channels_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_strategies_fk" FOREIGN KEY ("strategies_id") REFERENCES "public"."strategies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_impacts_fk" FOREIGN KEY ("impacts_id") REFERENCES "public"."impacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_galleries_fk" FOREIGN KEY ("galleries_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members" ADD CONSTRAINT "members_details_about_narrative_id_narratives_id_fk" FOREIGN KEY ("details_about_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "members" ADD CONSTRAINT "members_assets_avatar_id_media_id_fk" FOREIGN KEY ("assets_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "members" ADD CONSTRAINT "members_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "members" ADD CONSTRAINT "members_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "members_locales" ADD CONSTRAINT "members_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "members_locales" ADD CONSTRAINT "members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_channels_fk" FOREIGN KEY ("channels_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_duties_fk" FOREIGN KEY ("duties_id") REFERENCES "public"."duties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_trainings_fk" FOREIGN KEY ("trainings_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_archives_fk" FOREIGN KEY ("archives_id") REFERENCES "public"."archives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_impacts_fk" FOREIGN KEY ("impacts_id") REFERENCES "public"."impacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "individuals_details_interests_list" ADD CONSTRAINT "individuals_details_interests_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "individuals" ADD CONSTRAINT "individuals_details_about_narrative_id_narratives_id_fk" FOREIGN KEY ("details_about_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "individuals" ADD CONSTRAINT "individuals_assets_avatar_id_media_id_fk" FOREIGN KEY ("assets_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "individuals" ADD CONSTRAINT "individuals_contexts_history_id_histories_id_fk" FOREIGN KEY ("contexts_history_id") REFERENCES "public"."histories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "individuals_locales" ADD CONSTRAINT "individuals_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "individuals_locales" ADD CONSTRAINT "individuals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "individuals_rels" ADD CONSTRAINT "individuals_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "individuals_rels" ADD CONSTRAINT "individuals_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "individuals_rels" ADD CONSTRAINT "individuals_rels_channels_fk" FOREIGN KEY ("channels_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "individuals_rels" ADD CONSTRAINT "individuals_rels_galleries_fk" FOREIGN KEY ("galleries_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "individuals_rels" ADD CONSTRAINT "individuals_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "individuals_rels" ADD CONSTRAINT "individuals_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_metrics_benefits_list" ADD CONSTRAINT "organizations_metrics_benefits_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_contexts_associations_list" ADD CONSTRAINT "organizations_contexts_associations_list_branch_id_locations_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organizations_contexts_associations_list" ADD CONSTRAINT "organizations_contexts_associations_list_parent_id_organizations_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organizations_contexts_associations_list" ADD CONSTRAINT "organizations_contexts_associations_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations" ADD CONSTRAINT "organizations_details_about_narrative_id_narratives_id_fk" FOREIGN KEY ("details_about_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organizations" ADD CONSTRAINT "organizations_assets_logo_id_media_id_fk" FOREIGN KEY ("assets_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organizations" ADD CONSTRAINT "organizations_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organizations" ADD CONSTRAINT "organizations_contexts_content_history_id_histories_id_fk" FOREIGN KEY ("contexts_content_history_id") REFERENCES "public"."histories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organizations_locales" ADD CONSTRAINT "organizations_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organizations_locales" ADD CONSTRAINT "organizations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_channels_fk" FOREIGN KEY ("channels_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "narratives_metrics_timeline_list" ADD CONSTRAINT "narratives_metrics_timeline_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."narratives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "narratives" ADD CONSTRAINT "narratives_traits_tone_id_tones_id_fk" FOREIGN KEY ("traits_tone_id") REFERENCES "public"."tones"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "narratives_locales" ADD CONSTRAINT "narratives_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "narratives_locales" ADD CONSTRAINT "narratives_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."narratives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "narratives_rels" ADD CONSTRAINT "narratives_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."narratives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "narratives_rels" ADD CONSTRAINT "narratives_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "narratives_rels" ADD CONSTRAINT "narratives_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "narratives_rels" ADD CONSTRAINT "narratives_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "narratives_rels" ADD CONSTRAINT "narratives_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "narratives_rels" ADD CONSTRAINT "narratives_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "narratives_rels" ADD CONSTRAINT "narratives_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "narratives_rels" ADD CONSTRAINT "narratives_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "narratives_rels" ADD CONSTRAINT "narratives_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "narratives_rels" ADD CONSTRAINT "narratives_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_traits_concerns_list" ADD CONSTRAINT "stories_traits_concerns_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_traits_concerns_list_locales" ADD CONSTRAINT "stories_traits_concerns_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_traits_concerns_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_traits_interactions_list" ADD CONSTRAINT "stories_traits_interactions_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_traits_interactions_list_locales" ADD CONSTRAINT "stories_traits_interactions_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories_traits_interactions_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_details_narrative_id_narratives_id_fk" FOREIGN KEY ("details_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_assets_playlist_id_playlists_id_fk" FOREIGN KEY ("assets_playlist_id") REFERENCES "public"."playlists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_assets_visualization_id_visualizations_id_fk" FOREIGN KEY ("assets_visualization_id") REFERENCES "public"."visualizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories" ADD CONSTRAINT "stories_assets_documents_id_archives_id_fk" FOREIGN KEY ("assets_documents_id") REFERENCES "public"."archives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_locales" ADD CONSTRAINT "stories_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "stories_locales" ADD CONSTRAINT "stories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_highlights_fk" FOREIGN KEY ("highlights_id") REFERENCES "public"."highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_incidents_fk" FOREIGN KEY ("incidents_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stories_rels" ADD CONSTRAINT "stories_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "histories" ADD CONSTRAINT "histories_details_content_narrative_id_narratives_id_fk" FOREIGN KEY ("details_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "histories" ADD CONSTRAINT "histories_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "histories" ADD CONSTRAINT "histories_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "histories" ADD CONSTRAINT "histories_assets_playlist_id_playlists_id_fk" FOREIGN KEY ("assets_playlist_id") REFERENCES "public"."playlists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "histories_locales" ADD CONSTRAINT "histories_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "histories_locales" ADD CONSTRAINT "histories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."histories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "histories_rels" ADD CONSTRAINT "histories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."histories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "histories_rels" ADD CONSTRAINT "histories_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "histories_rels" ADD CONSTRAINT "histories_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "histories_rels" ADD CONSTRAINT "histories_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_traits_lessons_list" ADD CONSTRAINT "journeys_traits_lessons_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys" ADD CONSTRAINT "journeys_details_content_narrative_id_narratives_id_fk" FOREIGN KEY ("details_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journeys" ADD CONSTRAINT "journeys_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journeys" ADD CONSTRAINT "journeys_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journeys" ADD CONSTRAINT "journeys_assets_playlist_id_playlists_id_fk" FOREIGN KEY ("assets_playlist_id") REFERENCES "public"."playlists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journeys_locales" ADD CONSTRAINT "journeys_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journeys_locales" ADD CONSTRAINT "journeys_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_rels" ADD CONSTRAINT "journeys_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_rels" ADD CONSTRAINT "journeys_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_rels" ADD CONSTRAINT "journeys_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_rels" ADD CONSTRAINT "journeys_rels_decisions_fk" FOREIGN KEY ("decisions_id") REFERENCES "public"."decisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_rels" ADD CONSTRAINT "journeys_rels_impacts_fk" FOREIGN KEY ("impacts_id") REFERENCES "public"."impacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journeys_rels" ADD CONSTRAINT "journeys_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notes_traits_intentions_list" ADD CONSTRAINT "notes_traits_intentions_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notes_traits_intentions_list_locales" ADD CONSTRAINT "notes_traits_intentions_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notes_traits_intentions_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notes" ADD CONSTRAINT "notes_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notes" ADD CONSTRAINT "notes_assets_archive_id_archives_id_fk" FOREIGN KEY ("assets_archive_id") REFERENCES "public"."archives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notes" ADD CONSTRAINT "notes_assets_visualization_id_visualizations_id_fk" FOREIGN KEY ("assets_visualization_id") REFERENCES "public"."visualizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notes_locales" ADD CONSTRAINT "notes_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "notes_locales" ADD CONSTRAINT "notes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notes_rels" ADD CONSTRAINT "notes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notes_rels" ADD CONSTRAINT "notes_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "notes_rels" ADD CONSTRAINT "notes_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars" ADD CONSTRAINT "cars_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars" ADD CONSTRAINT "cars_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars" ADD CONSTRAINT "cars_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars" ADD CONSTRAINT "cars_assets_playlist_id_playlists_id_fk" FOREIGN KEY ("assets_playlist_id") REFERENCES "public"."playlists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars" ADD CONSTRAINT "cars_assets_visualization_id_visualizations_id_fk" FOREIGN KEY ("assets_visualization_id") REFERENCES "public"."visualizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars" ADD CONSTRAINT "cars_assets_documents_id_archives_id_fk" FOREIGN KEY ("assets_documents_id") REFERENCES "public"."archives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars" ADD CONSTRAINT "cars_contexts_content_histories_id_histories_id_fk" FOREIGN KEY ("contexts_content_histories_id") REFERENCES "public"."histories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars_locales" ADD CONSTRAINT "cars_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars_locales" ADD CONSTRAINT "cars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kits_traits_materials_list" ADD CONSTRAINT "kits_traits_materials_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kits" ADD CONSTRAINT "kits_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kits" ADD CONSTRAINT "kits_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kits" ADD CONSTRAINT "kits_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kits" ADD CONSTRAINT "kits_assets_visualizations_id_visualizations_id_fk" FOREIGN KEY ("assets_visualizations_id") REFERENCES "public"."visualizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kits_locales" ADD CONSTRAINT "kits_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kits_locales" ADD CONSTRAINT "kits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kits_rels" ADD CONSTRAINT "kits_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."kits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kits_rels" ADD CONSTRAINT "kits_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kits_rels" ADD CONSTRAINT "kits_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kits_rels" ADD CONSTRAINT "kits_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kits_rels" ADD CONSTRAINT "kits_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kits_rels" ADD CONSTRAINT "kits_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kits_rels" ADD CONSTRAINT "kits_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kits_rels" ADD CONSTRAINT "kits_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kits_rels" ADD CONSTRAINT "kits_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_locales" ADD CONSTRAINT "galleries_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "galleries_locales" ADD CONSTRAINT "galleries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_rels" ADD CONSTRAINT "galleries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_rels" ADD CONSTRAINT "galleries_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_rels" ADD CONSTRAINT "galleries_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_rels" ADD CONSTRAINT "galleries_rels_narratives_fk" FOREIGN KEY ("narratives_id") REFERENCES "public"."narratives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "galleries_rels" ADD CONSTRAINT "galleries_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "playlists_locales" ADD CONSTRAINT "playlists_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "playlists_locales" ADD CONSTRAINT "playlists_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."playlists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "playlists_rels" ADD CONSTRAINT "playlists_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."playlists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "playlists_rels" ADD CONSTRAINT "playlists_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "playlists_rels" ADD CONSTRAINT "playlists_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "playlists_rels" ADD CONSTRAINT "playlists_rels_narratives_fk" FOREIGN KEY ("narratives_id") REFERENCES "public"."narratives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "playlists_rels" ADD CONSTRAINT "playlists_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archives_locales" ADD CONSTRAINT "archives_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "archives_locales" ADD CONSTRAINT "archives_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."archives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archives_rels" ADD CONSTRAINT "archives_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."archives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archives_rels" ADD CONSTRAINT "archives_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archives_rels" ADD CONSTRAINT "archives_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archives_rels" ADD CONSTRAINT "archives_rels_narratives_fk" FOREIGN KEY ("narratives_id") REFERENCES "public"."narratives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "archives_rels" ADD CONSTRAINT "archives_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "visualizations_locales" ADD CONSTRAINT "visualizations_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "visualizations_locales" ADD CONSTRAINT "visualizations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."visualizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "visualizations_rels" ADD CONSTRAINT "visualizations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."visualizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "visualizations_rels" ADD CONSTRAINT "visualizations_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "visualizations_rels" ADD CONSTRAINT "visualizations_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "visualizations_rels" ADD CONSTRAINT "visualizations_rels_narratives_fk" FOREIGN KEY ("narratives_id") REFERENCES "public"."narratives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "visualizations_rels" ADD CONSTRAINT "visualizations_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_details_slots_list" ADD CONSTRAINT "schedules_details_slots_list_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "schedules_details_slots_list" ADD CONSTRAINT "schedules_details_slots_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_traits_constraints_list" ADD CONSTRAINT "schedules_traits_constraints_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_locales" ADD CONSTRAINT "schedules_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "schedules_locales" ADD CONSTRAINT "schedules_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_rels" ADD CONSTRAINT "schedules_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_rels" ADD CONSTRAINT "schedules_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_rels" ADD CONSTRAINT "schedules_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_rels" ADD CONSTRAINT "schedules_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_rels" ADD CONSTRAINT "schedules_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_rels" ADD CONSTRAINT "schedules_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_rels" ADD CONSTRAINT "schedules_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_rels" ADD CONSTRAINT "schedules_rels_trainings_fk" FOREIGN KEY ("trainings_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_rels" ADD CONSTRAINT "schedules_rels_meetups_fk" FOREIGN KEY ("meetups_id") REFERENCES "public"."meetups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_rels" ADD CONSTRAINT "schedules_rels_initiatives_fk" FOREIGN KEY ("initiatives_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_rels" ADD CONSTRAINT "schedules_rels_celebrations_fk" FOREIGN KEY ("celebrations_id") REFERENCES "public"."celebrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "schedules_rels" ADD CONSTRAINT "schedules_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings" ADD CONSTRAINT "trainings_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trainings" ADD CONSTRAINT "trainings_assets_playlist_id_playlists_id_fk" FOREIGN KEY ("assets_playlist_id") REFERENCES "public"."playlists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trainings_locales" ADD CONSTRAINT "trainings_locales_details_narrative_id_narratives_id_fk" FOREIGN KEY ("details_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trainings_locales" ADD CONSTRAINT "trainings_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trainings_locales" ADD CONSTRAINT "trainings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_strategies_fk" FOREIGN KEY ("strategies_id") REFERENCES "public"."strategies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_details_positions_list" ADD CONSTRAINT "careers_details_positions_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers" ADD CONSTRAINT "careers_details_narrative_id_narratives_id_fk" FOREIGN KEY ("details_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "careers_locales" ADD CONSTRAINT "careers_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "careers_locales" ADD CONSTRAINT "careers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_expectations_fk" FOREIGN KEY ("expectations_id") REFERENCES "public"."expectations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_highlights_fk" FOREIGN KEY ("highlights_id") REFERENCES "public"."highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "careers_rels" ADD CONSTRAINT "careers_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives" ADD CONSTRAINT "initiatives_details_classifications_id_classifications_id_fk" FOREIGN KEY ("details_classifications_id") REFERENCES "public"."classifications"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "initiatives" ADD CONSTRAINT "initiatives_details_narrative_id_narratives_id_fk" FOREIGN KEY ("details_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "initiatives" ADD CONSTRAINT "initiatives_assets_primary_id_media_id_fk" FOREIGN KEY ("assets_primary_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "initiatives" ADD CONSTRAINT "initiatives_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "initiatives" ADD CONSTRAINT "initiatives_assets_documents_id_archives_id_fk" FOREIGN KEY ("assets_documents_id") REFERENCES "public"."archives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "initiatives_locales" ADD CONSTRAINT "initiatives_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "initiatives_locales" ADD CONSTRAINT "initiatives_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_schedules_fk" FOREIGN KEY ("schedules_id") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_strategies_fk" FOREIGN KEY ("strategies_id") REFERENCES "public"."strategies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_expectations_fk" FOREIGN KEY ("expectations_id") REFERENCES "public"."expectations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_incidents_fk" FOREIGN KEY ("incidents_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_celebrations_fk" FOREIGN KEY ("celebrations_id") REFERENCES "public"."celebrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_histories_fk" FOREIGN KEY ("histories_id") REFERENCES "public"."histories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups" ADD CONSTRAINT "meetups_basics_location_id_locations_id_fk" FOREIGN KEY ("basics_location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meetups" ADD CONSTRAINT "meetups_details_narrative_id_narratives_id_fk" FOREIGN KEY ("details_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meetups" ADD CONSTRAINT "meetups_assets_primary_id_media_id_fk" FOREIGN KEY ("assets_primary_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meetups" ADD CONSTRAINT "meetups_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meetups" ADD CONSTRAINT "meetups_assets_playlist_id_playlists_id_fk" FOREIGN KEY ("assets_playlist_id") REFERENCES "public"."playlists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meetups" ADD CONSTRAINT "meetups_assets_materials_id_archives_id_fk" FOREIGN KEY ("assets_materials_id") REFERENCES "public"."archives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meetups_locales" ADD CONSTRAINT "meetups_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meetups_locales" ADD CONSTRAINT "meetups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meetups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."meetups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_schedules_fk" FOREIGN KEY ("schedules_id") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_initiatives_fk" FOREIGN KEY ("initiatives_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_celebrations_fk" FOREIGN KEY ("celebrations_id") REFERENCES "public"."celebrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations" ADD CONSTRAINT "celebrations_details_narrative_id_narratives_id_fk" FOREIGN KEY ("details_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "celebrations" ADD CONSTRAINT "celebrations_assets_primary_id_media_id_fk" FOREIGN KEY ("assets_primary_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "celebrations" ADD CONSTRAINT "celebrations_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "celebrations" ADD CONSTRAINT "celebrations_assets_playlist_id_playlists_id_fk" FOREIGN KEY ("assets_playlist_id") REFERENCES "public"."playlists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "celebrations_locales" ADD CONSTRAINT "celebrations_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "celebrations_locales" ADD CONSTRAINT "celebrations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."celebrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."celebrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_expectations_fk" FOREIGN KEY ("expectations_id") REFERENCES "public"."expectations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "protocols_details_steps_list" ADD CONSTRAINT "protocols_details_steps_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "protocols_locales" ADD CONSTRAINT "protocols_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "protocols_locales" ADD CONSTRAINT "protocols_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "protocols_rels" ADD CONSTRAINT "protocols_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "protocols_rels" ADD CONSTRAINT "protocols_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "protocols_rels" ADD CONSTRAINT "protocols_rels_archives_fk" FOREIGN KEY ("archives_id") REFERENCES "public"."archives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "protocols_rels" ADD CONSTRAINT "protocols_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "protocols_rels" ADD CONSTRAINT "protocols_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "duties_locales" ADD CONSTRAINT "duties_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "duties_locales" ADD CONSTRAINT "duties_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."duties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "duties_rels" ADD CONSTRAINT "duties_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."duties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "duties_rels" ADD CONSTRAINT "duties_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "duties_rels" ADD CONSTRAINT "duties_rels_protocols_fk" FOREIGN KEY ("protocols_id") REFERENCES "public"."protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "duties_rels" ADD CONSTRAINT "duties_rels_expectations_fk" FOREIGN KEY ("expectations_id") REFERENCES "public"."expectations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "duties_rels" ADD CONSTRAINT "duties_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "duties_rels" ADD CONSTRAINT "duties_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expectations_locales" ADD CONSTRAINT "expectations_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "expectations_locales" ADD CONSTRAINT "expectations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."expectations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expectations_rels" ADD CONSTRAINT "expectations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."expectations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expectations_rels" ADD CONSTRAINT "expectations_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expectations_rels" ADD CONSTRAINT "expectations_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expectations_rels" ADD CONSTRAINT "expectations_rels_protocols_fk" FOREIGN KEY ("protocols_id") REFERENCES "public"."protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expectations_rels" ADD CONSTRAINT "expectations_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "expectations_rels" ADD CONSTRAINT "expectations_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "highlights" ADD CONSTRAINT "highlights_details_content_narrative_id_narratives_id_fk" FOREIGN KEY ("details_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "highlights" ADD CONSTRAINT "highlights_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "highlights" ADD CONSTRAINT "highlights_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "highlights" ADD CONSTRAINT "highlights_assets_playlist_id_playlists_id_fk" FOREIGN KEY ("assets_playlist_id") REFERENCES "public"."playlists"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "highlights_locales" ADD CONSTRAINT "highlights_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "highlights_locales" ADD CONSTRAINT "highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "highlights_rels" ADD CONSTRAINT "highlights_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "highlights_rels" ADD CONSTRAINT "highlights_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "highlights_rels" ADD CONSTRAINT "highlights_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "highlights_rels" ADD CONSTRAINT "highlights_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "highlights_rels" ADD CONSTRAINT "highlights_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "highlights_rels" ADD CONSTRAINT "highlights_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "highlights_rels" ADD CONSTRAINT "highlights_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents" ADD CONSTRAINT "incidents_details_content_narrative_id_narratives_id_fk" FOREIGN KEY ("details_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incidents" ADD CONSTRAINT "incidents_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incidents" ADD CONSTRAINT "incidents_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incidents" ADD CONSTRAINT "incidents_assets_archive_id_archives_id_fk" FOREIGN KEY ("assets_archive_id") REFERENCES "public"."archives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incidents_locales" ADD CONSTRAINT "incidents_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incidents_locales" ADD CONSTRAINT "incidents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_decisions_fk" FOREIGN KEY ("decisions_id") REFERENCES "public"."decisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_impacts_fk" FOREIGN KEY ("impacts_id") REFERENCES "public"."impacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_kits_fk" FOREIGN KEY ("kits_id") REFERENCES "public"."kits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impacts" ADD CONSTRAINT "impacts_traits_tone_id_tones_id_fk" FOREIGN KEY ("traits_tone_id") REFERENCES "public"."tones"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impacts_locales" ADD CONSTRAINT "impacts_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "impacts_locales" ADD CONSTRAINT "impacts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."impacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impacts_rels" ADD CONSTRAINT "impacts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."impacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impacts_rels" ADD CONSTRAINT "impacts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impacts_rels" ADD CONSTRAINT "impacts_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impacts_rels" ADD CONSTRAINT "impacts_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impacts_rels" ADD CONSTRAINT "impacts_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impacts_rels" ADD CONSTRAINT "impacts_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impacts_rels" ADD CONSTRAINT "impacts_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impacts_rels" ADD CONSTRAINT "impacts_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impacts_rels" ADD CONSTRAINT "impacts_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impacts_rels" ADD CONSTRAINT "impacts_rels_kits_fk" FOREIGN KEY ("kits_id") REFERENCES "public"."kits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "impacts_rels" ADD CONSTRAINT "impacts_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions" ADD CONSTRAINT "decisions_details_content_narrative_id_narratives_id_fk" FOREIGN KEY ("details_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "decisions_locales" ADD CONSTRAINT "decisions_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "decisions_locales" ADD CONSTRAINT "decisions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."decisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions_rels" ADD CONSTRAINT "decisions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."decisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions_rels" ADD CONSTRAINT "decisions_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions_rels" ADD CONSTRAINT "decisions_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions_rels" ADD CONSTRAINT "decisions_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions_rels" ADD CONSTRAINT "decisions_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions_rels" ADD CONSTRAINT "decisions_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions_rels" ADD CONSTRAINT "decisions_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions_rels" ADD CONSTRAINT "decisions_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions_rels" ADD CONSTRAINT "decisions_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions_rels" ADD CONSTRAINT "decisions_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions_rels" ADD CONSTRAINT "decisions_rels_protocols_fk" FOREIGN KEY ("protocols_id") REFERENCES "public"."protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions_rels" ADD CONSTRAINT "decisions_rels_preferences_fk" FOREIGN KEY ("preferences_id") REFERENCES "public"."preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "decisions_rels" ADD CONSTRAINT "decisions_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies_details_outcomes_list" ADD CONSTRAINT "strategies_details_outcomes_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."strategies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies_traits_directives_list" ADD CONSTRAINT "strategies_traits_directives_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."strategies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies_traits_directives_list_locales" ADD CONSTRAINT "strategies_traits_directives_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."strategies_traits_directives_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies_traits_contingencies_list" ADD CONSTRAINT "strategies_traits_contingencies_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."strategies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies_traits_contingencies_list_locales" ADD CONSTRAINT "strategies_traits_contingencies_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."strategies_traits_contingencies_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies" ADD CONSTRAINT "strategies_contexts_content_narrative_id_narratives_id_fk" FOREIGN KEY ("contexts_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "strategies_locales" ADD CONSTRAINT "strategies_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "strategies_locales" ADD CONSTRAINT "strategies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."strategies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies_rels" ADD CONSTRAINT "strategies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."strategies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies_rels" ADD CONSTRAINT "strategies_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies_rels" ADD CONSTRAINT "strategies_rels_decisions_fk" FOREIGN KEY ("decisions_id") REFERENCES "public"."decisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies_rels" ADD CONSTRAINT "strategies_rels_impacts_fk" FOREIGN KEY ("impacts_id") REFERENCES "public"."impacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies_rels" ADD CONSTRAINT "strategies_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies_rels" ADD CONSTRAINT "strategies_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies_rels" ADD CONSTRAINT "strategies_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "strategies_rels" ADD CONSTRAINT "strategies_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_details_content_narrative_id_narratives_id_fk" FOREIGN KEY ("details_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards_locales" ADD CONSTRAINT "awards_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards_locales" ADD CONSTRAINT "awards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_visualizations_fk" FOREIGN KEY ("visualizations_id") REFERENCES "public"."visualizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_traits_skills_list" ADD CONSTRAINT "experiences_traits_skills_list_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_traits_skills_list" ADD CONSTRAINT "experiences_traits_skills_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_details_content_narrative_id_narratives_id_fk" FOREIGN KEY ("details_content_narrative_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_details_content_journey_id_journeys_id_fk" FOREIGN KEY ("details_content_journey_id") REFERENCES "public"."journeys"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_assets_gallery_id_galleries_id_fk" FOREIGN KEY ("assets_gallery_id") REFERENCES "public"."galleries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_locales" ADD CONSTRAINT "experiences_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_locales" ADD CONSTRAINT "experiences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_highlights_fk" FOREIGN KEY ("highlights_id") REFERENCES "public"."highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_incidents_fk" FOREIGN KEY ("incidents_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_details_type" ADD CONSTRAINT "categories_details_type_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_details_type_locales" ADD CONSTRAINT "categories_details_type_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories_details_type"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_locales" ADD CONSTRAINT "categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_rels" ADD CONSTRAINT "categories_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_locales" ADD CONSTRAINT "tags_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tags_locales" ADD CONSTRAINT "tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_rels" ADD CONSTRAINT "tags_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_rels" ADD CONSTRAINT "tags_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_rels" ADD CONSTRAINT "tags_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tones_traits_qualities_list" ADD CONSTRAINT "tones_traits_qualities_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tones_locales" ADD CONSTRAINT "tones_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tones_locales" ADD CONSTRAINT "tones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tones_rels" ADD CONSTRAINT "tones_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tones_rels" ADD CONSTRAINT "tones_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tones_rels" ADD CONSTRAINT "tones_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "features_locales" ADD CONSTRAINT "features_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "features_locales" ADD CONSTRAINT "features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "features_rels" ADD CONSTRAINT "features_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "features_rels" ADD CONSTRAINT "features_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "features_rels" ADD CONSTRAINT "features_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "features_rels" ADD CONSTRAINT "features_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "specifications_traits_conditions_list" ADD CONSTRAINT "specifications_traits_conditions_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "specifications_metrics_parameters_list" ADD CONSTRAINT "specifications_metrics_parameters_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "specifications_locales" ADD CONSTRAINT "specifications_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "specifications_locales" ADD CONSTRAINT "specifications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "specifications_rels" ADD CONSTRAINT "specifications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "specifications_rels" ADD CONSTRAINT "specifications_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "specifications_rels" ADD CONSTRAINT "specifications_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "classifications_locales" ADD CONSTRAINT "classifications_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "classifications_locales" ADD CONSTRAINT "classifications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "classifications_rels" ADD CONSTRAINT "classifications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "classifications_rels" ADD CONSTRAINT "classifications_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "classifications_rels" ADD CONSTRAINT "classifications_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "classifications_rels" ADD CONSTRAINT "classifications_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_traits_methods_list" ADD CONSTRAINT "skills_traits_methods_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_traits_dependencies_list" ADD CONSTRAINT "skills_traits_dependencies_list_skill_id_skills_id_fk" FOREIGN KEY ("skill_id") REFERENCES "public"."skills"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "skills_traits_dependencies_list" ADD CONSTRAINT "skills_traits_dependencies_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_locales" ADD CONSTRAINT "skills_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "skills_locales" ADD CONSTRAINT "skills_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_trainings_fk" FOREIGN KEY ("trainings_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "principles_locales" ADD CONSTRAINT "principles_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "principles_locales" ADD CONSTRAINT "principles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "principles_rels" ADD CONSTRAINT "principles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "principles_rels" ADD CONSTRAINT "principles_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "principles_rels" ADD CONSTRAINT "principles_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "principles_rels" ADD CONSTRAINT "principles_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "preferences_traits_conditions_list" ADD CONSTRAINT "preferences_traits_conditions_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "preferences_traits_reasons_list" ADD CONSTRAINT "preferences_traits_reasons_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "preferences_locales" ADD CONSTRAINT "preferences_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "preferences_locales" ADD CONSTRAINT "preferences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "preferences_rels" ADD CONSTRAINT "preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "preferences_rels" ADD CONSTRAINT "preferences_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "preferences_rels" ADD CONSTRAINT "preferences_rels_principles_fk" FOREIGN KEY ("principles_id") REFERENCES "public"."principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "preferences_rels" ADD CONSTRAINT "preferences_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "preferences_rels" ADD CONSTRAINT "preferences_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "channels_traits_usage_list" ADD CONSTRAINT "channels_traits_usage_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "channels_traits_usage_list_locales" ADD CONSTRAINT "channels_traits_usage_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."channels_traits_usage_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "channels_traits_validity_list" ADD CONSTRAINT "channels_traits_validity_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "channels_locales" ADD CONSTRAINT "channels_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "channels_locales" ADD CONSTRAINT "channels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "channels_rels" ADD CONSTRAINT "channels_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "channels_rels" ADD CONSTRAINT "channels_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "channels_rels" ADD CONSTRAINT "channels_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_locales" ADD CONSTRAINT "locations_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_locales" ADD CONSTRAINT "locations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations_rels" ADD CONSTRAINT "locations_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox" ADD CONSTRAINT "forms_blocks_checkbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country" ADD CONSTRAINT "forms_blocks_country_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_country"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email" ADD CONSTRAINT "forms_blocks_email_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message" ADD CONSTRAINT "forms_blocks_message_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number" ADD CONSTRAINT "forms_blocks_number_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options" ADD CONSTRAINT "forms_blocks_select_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select" ADD CONSTRAINT "forms_blocks_select_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state" ADD CONSTRAINT "forms_blocks_state_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_state"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text" ADD CONSTRAINT "forms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea" ADD CONSTRAINT "forms_blocks_textarea_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails" ADD CONSTRAINT "forms_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions_submission_data" ADD CONSTRAINT "form_submissions_submission_data_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "variants" ADD CONSTRAINT "variants_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "variants_rels" ADD CONSTRAINT "variants_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "variants_rels" ADD CONSTRAINT "variants_rels_variant_options_fk" FOREIGN KEY ("variant_options_id") REFERENCES "public"."variant_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_variants_v" ADD CONSTRAINT "_variants_v_parent_id_variants_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_variants_v" ADD CONSTRAINT "_variants_v_version_product_id_products_id_fk" FOREIGN KEY ("version_product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_variants_v_rels" ADD CONSTRAINT "_variants_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_variants_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_variants_v_rels" ADD CONSTRAINT "_variants_v_rels_variant_options_fk" FOREIGN KEY ("variant_options_id") REFERENCES "public"."variant_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "variant_options" ADD CONSTRAINT "variant_options_variant_type_id_variant_types_id_fk" FOREIGN KEY ("variant_type_id") REFERENCES "public"."variant_types"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_variant_option_id_variant_options_id_fk" FOREIGN KEY ("variant_option_id") REFERENCES "public"."variant_options"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_gallery" ADD CONSTRAINT "products_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_cta_links" ADD CONSTRAINT "products_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_cta" ADD CONSTRAINT "products_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_content_columns" ADD CONSTRAINT "products_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_content" ADD CONSTRAINT "products_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_blocks_media_block" ADD CONSTRAINT "products_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_blocks_media_block" ADD CONSTRAINT "products_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "products_locales" ADD CONSTRAINT "products_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_variant_types_fk" FOREIGN KEY ("variant_types_id") REFERENCES "public"."variant_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "products_rels" ADD CONSTRAINT "products_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_variant_option_id_variant_options_id_fk" FOREIGN KEY ("variant_option_id") REFERENCES "public"."variant_options"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_version_gallery" ADD CONSTRAINT "_products_v_version_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_cta_links" ADD CONSTRAINT "_products_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_cta" ADD CONSTRAINT "_products_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_content_columns" ADD CONSTRAINT "_products_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_content" ADD CONSTRAINT "_products_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media_block" ADD CONSTRAINT "_products_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_blocks_media_block" ADD CONSTRAINT "_products_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_products_v_locales" ADD CONSTRAINT "_products_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_variant_types_fk" FOREIGN KEY ("variant_types_id") REFERENCES "public"."variant_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_products_v_rels" ADD CONSTRAINT "_products_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_variant_id_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "carts_items" ADD CONSTRAINT "carts_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "carts" ADD CONSTRAINT "carts_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_variant_id_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "orders_rels" ADD CONSTRAINT "orders_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "orders_rels" ADD CONSTRAINT "orders_rels_transactions_fk" FOREIGN KEY ("transactions_id") REFERENCES "public"."transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transactions_items" ADD CONSTRAINT "transactions_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions_items" ADD CONSTRAINT "transactions_items_variant_id_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."variants"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions_items" ADD CONSTRAINT "transactions_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "transactions" ADD CONSTRAINT "transactions_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions" ADD CONSTRAINT "transactions_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "transactions" ADD CONSTRAINT "transactions_cart_id_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "public"."carts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_locales" ADD CONSTRAINT "search_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_series_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_seasons_fk" FOREIGN KEY ("seasons_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_sessions_fk" FOREIGN KEY ("sessions_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_entries_fk" FOREIGN KEY ("entries_id") REFERENCES "public"."entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_results_fk" FOREIGN KEY ("results_id") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_points_fk" FOREIGN KEY ("points_id") REFERENCES "public"."points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_narratives_fk" FOREIGN KEY ("narratives_id") REFERENCES "public"."narratives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_histories_fk" FOREIGN KEY ("histories_id") REFERENCES "public"."histories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_journeys_fk" FOREIGN KEY ("journeys_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_kits_fk" FOREIGN KEY ("kits_id") REFERENCES "public"."kits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_galleries_fk" FOREIGN KEY ("galleries_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_playlists_fk" FOREIGN KEY ("playlists_id") REFERENCES "public"."playlists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_archives_fk" FOREIGN KEY ("archives_id") REFERENCES "public"."archives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_visualizations_fk" FOREIGN KEY ("visualizations_id") REFERENCES "public"."visualizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_schedules_fk" FOREIGN KEY ("schedules_id") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_trainings_fk" FOREIGN KEY ("trainings_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_careers_fk" FOREIGN KEY ("careers_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_initiatives_fk" FOREIGN KEY ("initiatives_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_meetups_fk" FOREIGN KEY ("meetups_id") REFERENCES "public"."meetups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_celebrations_fk" FOREIGN KEY ("celebrations_id") REFERENCES "public"."celebrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_protocols_fk" FOREIGN KEY ("protocols_id") REFERENCES "public"."protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_duties_fk" FOREIGN KEY ("duties_id") REFERENCES "public"."duties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_expectations_fk" FOREIGN KEY ("expectations_id") REFERENCES "public"."expectations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_highlights_fk" FOREIGN KEY ("highlights_id") REFERENCES "public"."highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_incidents_fk" FOREIGN KEY ("incidents_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_impacts_fk" FOREIGN KEY ("impacts_id") REFERENCES "public"."impacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_decisions_fk" FOREIGN KEY ("decisions_id") REFERENCES "public"."decisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_strategies_fk" FOREIGN KEY ("strategies_id") REFERENCES "public"."strategies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_tones_fk" FOREIGN KEY ("tones_id") REFERENCES "public"."tones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_principles_fk" FOREIGN KEY ("principles_id") REFERENCES "public"."principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_preferences_fk" FOREIGN KEY ("preferences_id") REFERENCES "public"."preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_channels_fk" FOREIGN KEY ("channels_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_series_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_seasons_fk" FOREIGN KEY ("seasons_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sessions_fk" FOREIGN KEY ("sessions_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_entries_fk" FOREIGN KEY ("entries_id") REFERENCES "public"."entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_results_fk" FOREIGN KEY ("results_id") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_points_fk" FOREIGN KEY ("points_id") REFERENCES "public"."points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_narratives_fk" FOREIGN KEY ("narratives_id") REFERENCES "public"."narratives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_histories_fk" FOREIGN KEY ("histories_id") REFERENCES "public"."histories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_journeys_fk" FOREIGN KEY ("journeys_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_notes_fk" FOREIGN KEY ("notes_id") REFERENCES "public"."notes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_kits_fk" FOREIGN KEY ("kits_id") REFERENCES "public"."kits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_galleries_fk" FOREIGN KEY ("galleries_id") REFERENCES "public"."galleries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_playlists_fk" FOREIGN KEY ("playlists_id") REFERENCES "public"."playlists"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_archives_fk" FOREIGN KEY ("archives_id") REFERENCES "public"."archives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_visualizations_fk" FOREIGN KEY ("visualizations_id") REFERENCES "public"."visualizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_schedules_fk" FOREIGN KEY ("schedules_id") REFERENCES "public"."schedules"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trainings_fk" FOREIGN KEY ("trainings_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_careers_fk" FOREIGN KEY ("careers_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_initiatives_fk" FOREIGN KEY ("initiatives_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_meetups_fk" FOREIGN KEY ("meetups_id") REFERENCES "public"."meetups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_celebrations_fk" FOREIGN KEY ("celebrations_id") REFERENCES "public"."celebrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_protocols_fk" FOREIGN KEY ("protocols_id") REFERENCES "public"."protocols"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_duties_fk" FOREIGN KEY ("duties_id") REFERENCES "public"."duties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_expectations_fk" FOREIGN KEY ("expectations_id") REFERENCES "public"."expectations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_highlights_fk" FOREIGN KEY ("highlights_id") REFERENCES "public"."highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_incidents_fk" FOREIGN KEY ("incidents_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_impacts_fk" FOREIGN KEY ("impacts_id") REFERENCES "public"."impacts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_decisions_fk" FOREIGN KEY ("decisions_id") REFERENCES "public"."decisions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_strategies_fk" FOREIGN KEY ("strategies_id") REFERENCES "public"."strategies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tones_fk" FOREIGN KEY ("tones_id") REFERENCES "public"."tones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_features_fk" FOREIGN KEY ("features_id") REFERENCES "public"."features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_specifications_fk" FOREIGN KEY ("specifications_id") REFERENCES "public"."specifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_classifications_fk" FOREIGN KEY ("classifications_id") REFERENCES "public"."classifications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_principles_fk" FOREIGN KEY ("principles_id") REFERENCES "public"."principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_preferences_fk" FOREIGN KEY ("preferences_id") REFERENCES "public"."preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_channels_fk" FOREIGN KEY ("channels_id") REFERENCES "public"."channels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_forms_fk" FOREIGN KEY ("forms_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_form_submissions_fk" FOREIGN KEY ("form_submissions_id") REFERENCES "public"."form_submissions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_addresses_fk" FOREIGN KEY ("addresses_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_variants_fk" FOREIGN KEY ("variants_id") REFERENCES "public"."variants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_variant_types_fk" FOREIGN KEY ("variant_types_id") REFERENCES "public"."variant_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_variant_options_fk" FOREIGN KEY ("variant_options_id") REFERENCES "public"."variant_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_carts_fk" FOREIGN KEY ("carts_id") REFERENCES "public"."carts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_transactions_fk" FOREIGN KEY ("transactions_id") REFERENCES "public"."transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_sub_items" ADD CONSTRAINT "header_nav_items_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_utility_nav" ADD CONSTRAINT "header_utility_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_kits_fk" FOREIGN KEY ("kits_id") REFERENCES "public"."kits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_series_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_seasons_fk" FOREIGN KEY ("seasons_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_stories_fk" FOREIGN KEY ("stories_id") REFERENCES "public"."stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_journeys_fk" FOREIGN KEY ("journeys_id") REFERENCES "public"."journeys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_histories_fk" FOREIGN KEY ("histories_id") REFERENCES "public"."histories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_initiatives_fk" FOREIGN KEY ("initiatives_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_celebrations_fk" FOREIGN KEY ("celebrations_id") REFERENCES "public"."celebrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_meetups_fk" FOREIGN KEY ("meetups_id") REFERENCES "public"."meetups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_careers_fk" FOREIGN KEY ("careers_id") REFERENCES "public"."careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_trainings_fk" FOREIGN KEY ("trainings_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal" ADD CONSTRAINT "footer_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_brand_logo_id_media_id_fk" FOREIGN KEY ("brand_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_values" ADD CONSTRAINT "identity_values_principle_id_principles_id_fk" FOREIGN KEY ("principle_id") REFERENCES "public"."principles"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "identity_values" ADD CONSTRAINT "identity_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."identity"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_values_locales" ADD CONSTRAINT "identity_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."identity_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity" ADD CONSTRAINT "identity_story_id_narratives_id_fk" FOREIGN KEY ("story_id") REFERENCES "public"."narratives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "identity" ADD CONSTRAINT "identity_visual_logo_id_media_id_fk" FOREIGN KEY ("visual_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "identity" ADD CONSTRAINT "identity_visual_logo_inverted_id_media_id_fk" FOREIGN KEY ("visual_logo_inverted_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "identity" ADD CONSTRAINT "identity_visual_wordmark_id_media_id_fk" FOREIGN KEY ("visual_wordmark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "identity" ADD CONSTRAINT "identity_visual_favicon_id_media_id_fk" FOREIGN KEY ("visual_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "identity" ADD CONSTRAINT "identity_visual_guidelines_id_media_id_fk" FOREIGN KEY ("visual_guidelines_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "identity_locales" ADD CONSTRAINT "identity_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."identity"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_rels" ADD CONSTRAINT "identity_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."identity"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_rels" ADD CONSTRAINT "identity_rels_tones_fk" FOREIGN KEY ("tones_id") REFERENCES "public"."tones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_rels" ADD CONSTRAINT "identity_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_rels" ADD CONSTRAINT "identity_rels_initiatives_fk" FOREIGN KEY ("initiatives_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policies_documents" ADD CONSTRAINT "policies_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."policies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policies_documents_locales" ADD CONSTRAINT "policies_documents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."policies_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "socials_accounts" ADD CONSTRAINT "socials_accounts_channel_id_channels_id_fk" FOREIGN KEY ("channel_id") REFERENCES "public"."channels"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "socials_accounts" ADD CONSTRAINT "socials_accounts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_items" ADD CONSTRAINT "announcements_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_items_locales" ADD CONSTRAINT "announcements_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questions_categories_items" ADD CONSTRAINT "questions_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questions_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questions_categories_items_locales" ADD CONSTRAINT "questions_categories_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questions_categories_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questions_categories" ADD CONSTRAINT "questions_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questions_categories_locales" ADD CONSTRAINT "questions_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questions_categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "series_basics_identifiers_basics_identifiers_code_idx" ON "series" USING btree ("basics_identifiers_code");
  CREATE INDEX "series_details_content_details_content_history_idx" ON "series" USING btree ("details_content_history_id");
  CREATE INDEX "series_details_content_details_content_narrative_idx" ON "series" USING btree ("details_content_narrative_id");
  CREATE INDEX "series_traits_heritage_traits_heritage_predecessor_idx" ON "series" USING btree ("traits_heritage_predecessor_id");
  CREATE INDEX "series_traits_heritage_traits_heritage_successor_idx" ON "series" USING btree ("traits_heritage_successor_id");
  CREATE INDEX "series_metrics_metrics_schedule_idx" ON "series" USING btree ("metrics_schedule_id");
  CREATE INDEX "series_assets_assets_logo_idx" ON "series" USING btree ("assets_logo_id");
  CREATE INDEX "series_assets_assets_cover_idx" ON "series" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "series_slug_idx" ON "series" USING btree ("slug");
  CREATE INDEX "series_updated_at_idx" ON "series" USING btree ("updated_at");
  CREATE INDEX "series_created_at_idx" ON "series" USING btree ("created_at");
  CREATE INDEX "series_name_idx" ON "series_locales" USING btree ("name","_locale");
  CREATE INDEX "series_basics_basics_description_idx" ON "series_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "series_seo_seo_image_idx" ON "series_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "series_locales_locale_parent_id_unique" ON "series_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "series_rels_order_idx" ON "series_rels" USING btree ("order");
  CREATE INDEX "series_rels_parent_idx" ON "series_rels" USING btree ("parent_id");
  CREATE INDEX "series_rels_path_idx" ON "series_rels" USING btree ("path");
  CREATE INDEX "series_rels_categories_id_idx" ON "series_rels" USING btree ("categories_id");
  CREATE INDEX "series_rels_classifications_id_idx" ON "series_rels" USING btree ("classifications_id");
  CREATE INDEX "series_rels_features_id_idx" ON "series_rels" USING btree ("features_id");
  CREATE INDEX "series_rels_specifications_id_idx" ON "series_rels" USING btree ("specifications_id");
  CREATE INDEX "series_rels_locations_id_idx" ON "series_rels" USING btree ("locations_id");
  CREATE INDEX "series_rels_archives_id_idx" ON "series_rels" USING btree ("archives_id");
  CREATE INDEX "series_rels_organizations_id_idx" ON "series_rels" USING btree ("organizations_id");
  CREATE INDEX "series_rels_individuals_id_idx" ON "series_rels" USING btree ("individuals_id");
  CREATE INDEX "series_rels_notes_id_idx" ON "series_rels" USING btree ("notes_id");
  CREATE INDEX "series_rels_tags_id_idx" ON "series_rels" USING btree ("tags_id");
  CREATE INDEX "seasons_series_idx" ON "seasons" USING btree ("series_id");
  CREATE INDEX "seasons_details_content_details_content_narrative_idx" ON "seasons" USING btree ("details_content_narrative_id");
  CREATE INDEX "seasons_details_content_details_content_history_idx" ON "seasons" USING btree ("details_content_history_id");
  CREATE INDEX "seasons_assets_assets_cover_idx" ON "seasons" USING btree ("assets_cover_id");
  CREATE INDEX "seasons_assets_assets_gallery_idx" ON "seasons" USING btree ("assets_gallery_id");
  CREATE INDEX "seasons_assets_assets_playlist_idx" ON "seasons" USING btree ("assets_playlist_id");
  CREATE UNIQUE INDEX "seasons_slug_idx" ON "seasons" USING btree ("slug");
  CREATE INDEX "seasons_updated_at_idx" ON "seasons" USING btree ("updated_at");
  CREATE INDEX "seasons_created_at_idx" ON "seasons" USING btree ("created_at");
  CREATE INDEX "seasons_name_idx" ON "seasons_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "seasons_basics_identifiers_basics_identifiers_code_idx" ON "seasons_locales" USING btree ("basics_identifiers_code","_locale");
  CREATE INDEX "seasons_basics_identifiers_basics_identifiers_abbreviati_idx" ON "seasons_locales" USING btree ("basics_identifiers_abbreviation","_locale");
  CREATE INDEX "seasons_basics_basics_tagline_idx" ON "seasons_locales" USING btree ("basics_tagline","_locale");
  CREATE INDEX "seasons_basics_basics_description_idx" ON "seasons_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "seasons_seo_seo_image_idx" ON "seasons_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "seasons_locales_locale_parent_id_unique" ON "seasons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "seasons_rels_order_idx" ON "seasons_rels" USING btree ("order");
  CREATE INDEX "seasons_rels_parent_idx" ON "seasons_rels" USING btree ("parent_id");
  CREATE INDEX "seasons_rels_path_idx" ON "seasons_rels" USING btree ("path");
  CREATE INDEX "seasons_rels_categories_id_idx" ON "seasons_rels" USING btree ("categories_id");
  CREATE INDEX "seasons_rels_classifications_id_idx" ON "seasons_rels" USING btree ("classifications_id");
  CREATE INDEX "seasons_rels_protocols_id_idx" ON "seasons_rels" USING btree ("protocols_id");
  CREATE INDEX "seasons_rels_schedules_id_idx" ON "seasons_rels" USING btree ("schedules_id");
  CREATE INDEX "seasons_rels_archives_id_idx" ON "seasons_rels" USING btree ("archives_id");
  CREATE INDEX "seasons_rels_organizations_id_idx" ON "seasons_rels" USING btree ("organizations_id");
  CREATE INDEX "seasons_rels_individuals_id_idx" ON "seasons_rels" USING btree ("individuals_id");
  CREATE INDEX "seasons_rels_drivers_id_idx" ON "seasons_rels" USING btree ("drivers_id");
  CREATE INDEX "seasons_rels_notes_id_idx" ON "seasons_rels" USING btree ("notes_id");
  CREATE INDEX "seasons_rels_tags_id_idx" ON "seasons_rels" USING btree ("tags_id");
  CREATE INDEX "events_season_idx" ON "events" USING btree ("season_id");
  CREATE UNIQUE INDEX "events_basics_identifiers_basics_identifiers_code_idx" ON "events" USING btree ("basics_identifiers_code");
  CREATE INDEX "events_details_content_details_content_narrative_idx" ON "events" USING btree ("details_content_narrative_id");
  CREATE INDEX "events_details_content_details_content_history_idx" ON "events" USING btree ("details_content_history_id");
  CREATE INDEX "events_traits_chronology_traits_chronology_start_idx" ON "events" USING btree ("traits_chronology_start");
  CREATE INDEX "events_traits_chronology_traits_chronology_end_idx" ON "events" USING btree ("traits_chronology_end");
  CREATE INDEX "events_traits_chronology_traits_chronology_timezone_idx" ON "events" USING btree ("traits_chronology_timezone");
  CREATE INDEX "events_metrics_attributes_metrics_attributes_location_idx" ON "events" USING btree ("metrics_attributes_location_id");
  CREATE INDEX "events_assets_assets_poster_idx" ON "events" USING btree ("assets_poster_id");
  CREATE INDEX "events_assets_assets_cover_idx" ON "events" USING btree ("assets_cover_id");
  CREATE INDEX "events_assets_assets_gallery_idx" ON "events" USING btree ("assets_gallery_id");
  CREATE INDEX "events_assets_assets_playlist_idx" ON "events" USING btree ("assets_playlist_id");
  CREATE INDEX "events_assets_assets_archive_idx" ON "events" USING btree ("assets_archive_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events_name_idx" ON "events_locales" USING btree ("name","_locale");
  CREATE INDEX "events_basics_basics_tagline_idx" ON "events_locales" USING btree ("basics_tagline","_locale");
  CREATE INDEX "events_basics_basics_description_idx" ON "events_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "events_seo_seo_image_idx" ON "events_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_categories_id_idx" ON "events_rels" USING btree ("categories_id");
  CREATE INDEX "events_rels_classifications_id_idx" ON "events_rels" USING btree ("classifications_id");
  CREATE INDEX "events_rels_features_id_idx" ON "events_rels" USING btree ("features_id");
  CREATE INDEX "events_rels_protocols_id_idx" ON "events_rels" USING btree ("protocols_id");
  CREATE INDEX "events_rels_specifications_id_idx" ON "events_rels" USING btree ("specifications_id");
  CREATE INDEX "events_rels_highlights_id_idx" ON "events_rels" USING btree ("highlights_id");
  CREATE INDEX "events_rels_notes_id_idx" ON "events_rels" USING btree ("notes_id");
  CREATE INDEX "events_rels_tags_id_idx" ON "events_rels" USING btree ("tags_id");
  CREATE INDEX "sessions_traits_parameters_list_order_idx" ON "sessions_traits_parameters_list" USING btree ("_order");
  CREATE INDEX "sessions_traits_parameters_list_parent_id_idx" ON "sessions_traits_parameters_list" USING btree ("_parent_id");
  CREATE INDEX "sessions_traits_parameters_list_parameter_idx" ON "sessions_traits_parameters_list" USING btree ("parameter_id");
  CREATE UNIQUE INDEX "sessions_code_idx" ON "sessions" USING btree ("code");
  CREATE INDEX "sessions_details_content_details_content_narrative_idx" ON "sessions" USING btree ("details_content_narrative_id");
  CREATE INDEX "sessions_details_content_details_content_history_idx" ON "sessions" USING btree ("details_content_history_id");
  CREATE INDEX "sessions_traits_constraints_traits_constraints_type_idx" ON "sessions" USING btree ("traits_constraints_type_id");
  CREATE INDEX "sessions_assets_assets_gallery_idx" ON "sessions" USING btree ("assets_gallery_id");
  CREATE INDEX "sessions_assets_assets_playlist_idx" ON "sessions" USING btree ("assets_playlist_id");
  CREATE UNIQUE INDEX "sessions_slug_idx" ON "sessions" USING btree ("slug");
  CREATE INDEX "sessions_updated_at_idx" ON "sessions" USING btree ("updated_at");
  CREATE INDEX "sessions_created_at_idx" ON "sessions" USING btree ("created_at");
  CREATE INDEX "sessions_name_idx" ON "sessions_locales" USING btree ("name","_locale");
  CREATE UNIQUE INDEX "sessions_basics_identifiers_basics_identifiers_code_idx" ON "sessions_locales" USING btree ("basics_identifiers_code","_locale");
  CREATE INDEX "sessions_basics_basics_description_idx" ON "sessions_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "sessions_seo_seo_image_idx" ON "sessions_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "sessions_locales_locale_parent_id_unique" ON "sessions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sessions_rels_order_idx" ON "sessions_rels" USING btree ("order");
  CREATE INDEX "sessions_rels_parent_idx" ON "sessions_rels" USING btree ("parent_id");
  CREATE INDEX "sessions_rels_path_idx" ON "sessions_rels" USING btree ("path");
  CREATE INDEX "sessions_rels_categories_id_idx" ON "sessions_rels" USING btree ("categories_id");
  CREATE INDEX "sessions_rels_classifications_id_idx" ON "sessions_rels" USING btree ("classifications_id");
  CREATE INDEX "sessions_rels_features_id_idx" ON "sessions_rels" USING btree ("features_id");
  CREATE INDEX "sessions_rels_protocols_id_idx" ON "sessions_rels" USING btree ("protocols_id");
  CREATE INDEX "sessions_rels_strategies_id_idx" ON "sessions_rels" USING btree ("strategies_id");
  CREATE INDEX "sessions_rels_notes_id_idx" ON "sessions_rels" USING btree ("notes_id");
  CREATE INDEX "sessions_rels_specifications_id_idx" ON "sessions_rels" USING btree ("specifications_id");
  CREATE INDEX "sessions_rels_highlights_id_idx" ON "sessions_rels" USING btree ("highlights_id");
  CREATE INDEX "sessions_rels_incidents_id_idx" ON "sessions_rels" USING btree ("incidents_id");
  CREATE INDEX "sessions_rels_organizations_id_idx" ON "sessions_rels" USING btree ("organizations_id");
  CREATE INDEX "sessions_rels_leaders_id_idx" ON "sessions_rels" USING btree ("leaders_id");
  CREATE INDEX "sessions_rels_drivers_id_idx" ON "sessions_rels" USING btree ("drivers_id");
  CREATE INDEX "sessions_rels_members_id_idx" ON "sessions_rels" USING btree ("members_id");
  CREATE INDEX "sessions_rels_individuals_id_idx" ON "sessions_rels" USING btree ("individuals_id");
  CREATE INDEX "sessions_rels_tags_id_idx" ON "sessions_rels" USING btree ("tags_id");
  CREATE INDEX "entries_session_idx" ON "entries" USING btree ("session_id");
  CREATE INDEX "entries_basics_identifiers_basics_identifiers_number_idx" ON "entries" USING btree ("basics_identifiers_number");
  CREATE INDEX "entries_basics_identifiers_basics_identifiers_plate_idx" ON "entries" USING btree ("basics_identifiers_plate");
  CREATE INDEX "entries_details_content_details_content_narrative_idx" ON "entries" USING btree ("details_content_narrative_id");
  CREATE INDEX "entries_metrics_positions_metrics_positions_grid_idx" ON "entries" USING btree ("metrics_positions_grid");
  CREATE INDEX "entries_metrics_positions_metrics_positions_laps_idx" ON "entries" USING btree ("metrics_positions_laps");
  CREATE INDEX "entries_metrics_positions_metrics_positions_start_idx" ON "entries" USING btree ("metrics_positions_start");
  CREATE INDEX "entries_metrics_positions_metrics_positions_finish_idx" ON "entries" USING btree ("metrics_positions_finish");
  CREATE INDEX "entries_metrics_parameters_metrics_parameters_parameter_idx" ON "entries" USING btree ("metrics_parameters_parameter_id");
  CREATE INDEX "entries_assets_assets_thumbnail_idx" ON "entries" USING btree ("assets_thumbnail_id");
  CREATE INDEX "entries_assets_assets_gallery_idx" ON "entries" USING btree ("assets_gallery_id");
  CREATE INDEX "entries_assets_assets_playlist_idx" ON "entries" USING btree ("assets_playlist_id");
  CREATE INDEX "entries_contexts_associations_contexts_associations_crew_idx" ON "entries" USING btree ("contexts_associations_crew_id");
  CREATE INDEX "entries_contexts_associations_contexts_associations_car_idx" ON "entries" USING btree ("contexts_associations_car_id");
  CREATE UNIQUE INDEX "entries_slug_idx" ON "entries" USING btree ("slug");
  CREATE INDEX "entries_updated_at_idx" ON "entries" USING btree ("updated_at");
  CREATE INDEX "entries_created_at_idx" ON "entries" USING btree ("created_at");
  CREATE INDEX "entries_name_idx" ON "entries_locales" USING btree ("name","_locale");
  CREATE INDEX "entries_basics_basics_description_idx" ON "entries_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "entries_seo_seo_image_idx" ON "entries_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "entries_locales_locale_parent_id_unique" ON "entries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "entries_rels_order_idx" ON "entries_rels" USING btree ("order");
  CREATE INDEX "entries_rels_parent_idx" ON "entries_rels" USING btree ("parent_id");
  CREATE INDEX "entries_rels_path_idx" ON "entries_rels" USING btree ("path");
  CREATE INDEX "entries_rels_categories_id_idx" ON "entries_rels" USING btree ("categories_id");
  CREATE INDEX "entries_rels_classifications_id_idx" ON "entries_rels" USING btree ("classifications_id");
  CREATE INDEX "entries_rels_preferences_id_idx" ON "entries_rels" USING btree ("preferences_id");
  CREATE INDEX "entries_rels_specifications_id_idx" ON "entries_rels" USING btree ("specifications_id");
  CREATE INDEX "entries_rels_notes_id_idx" ON "entries_rels" USING btree ("notes_id");
  CREATE INDEX "entries_rels_media_id_idx" ON "entries_rels" USING btree ("media_id");
  CREATE INDEX "entries_rels_drivers_id_idx" ON "entries_rels" USING btree ("drivers_id");
  CREATE INDEX "entries_rels_tags_id_idx" ON "entries_rels" USING btree ("tags_id");
  CREATE INDEX "results_metrics_stoppages_order_idx" ON "results_metrics_stoppages" USING btree ("_order");
  CREATE INDEX "results_metrics_stoppages_parent_id_idx" ON "results_metrics_stoppages" USING btree ("_parent_id");
  CREATE INDEX "results_details_content_details_content_narrative_idx" ON "results" USING btree ("details_content_narrative_id");
  CREATE INDEX "results_assets_assets_visualization_idx" ON "results" USING btree ("assets_visualization_id");
  CREATE UNIQUE INDEX "results_slug_idx" ON "results" USING btree ("slug");
  CREATE INDEX "results_updated_at_idx" ON "results" USING btree ("updated_at");
  CREATE INDEX "results_created_at_idx" ON "results" USING btree ("created_at");
  CREATE INDEX "results_name_idx" ON "results_locales" USING btree ("name","_locale");
  CREATE INDEX "results_basics_basics_description_idx" ON "results_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "results_traits_achievements_traits_achievements_gap_idx" ON "results_locales" USING btree ("traits_achievements_gap","_locale");
  CREATE INDEX "results_traits_achievements_traits_achievements_interval_idx" ON "results_locales" USING btree ("traits_achievements_interval","_locale");
  CREATE INDEX "results_traits_achievements_traits_achievements_status_idx" ON "results_locales" USING btree ("traits_achievements_status","_locale");
  CREATE INDEX "results_seo_seo_image_idx" ON "results_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "results_locales_locale_parent_id_unique" ON "results_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "results_rels_order_idx" ON "results_rels" USING btree ("order");
  CREATE INDEX "results_rels_parent_idx" ON "results_rels" USING btree ("parent_id");
  CREATE INDEX "results_rels_path_idx" ON "results_rels" USING btree ("path");
  CREATE INDEX "results_rels_categories_id_idx" ON "results_rels" USING btree ("categories_id");
  CREATE INDEX "results_rels_classifications_id_idx" ON "results_rels" USING btree ("classifications_id");
  CREATE INDEX "results_rels_notes_id_idx" ON "results_rels" USING btree ("notes_id");
  CREATE INDEX "results_rels_highlights_id_idx" ON "results_rels" USING btree ("highlights_id");
  CREATE INDEX "results_rels_incidents_id_idx" ON "results_rels" USING btree ("incidents_id");
  CREATE INDEX "results_rels_tags_id_idx" ON "results_rels" USING btree ("tags_id");
  CREATE INDEX "points_traits_modifiers_list_order_idx" ON "points_traits_modifiers_list" USING btree ("_order");
  CREATE INDEX "points_traits_modifiers_list_parent_id_idx" ON "points_traits_modifiers_list" USING btree ("_parent_id");
  CREATE INDEX "points_traits_modifiers_list_condition_idx" ON "points_traits_modifiers_list" USING btree ("condition");
  CREATE INDEX "points_traits_modifiers_list_adjustment_idx" ON "points_traits_modifiers_list" USING btree ("adjustment");
  CREATE INDEX "points_traits_modifiers_list_impact_idx" ON "points_traits_modifiers_list" USING btree ("impact");
  CREATE INDEX "points_traits_traits_value_idx" ON "points" USING btree ("traits_value");
  CREATE INDEX "points_traits_ranking_traits_ranking_before_idx" ON "points" USING btree ("traits_ranking_before");
  CREATE INDEX "points_traits_ranking_traits_ranking_after_idx" ON "points" USING btree ("traits_ranking_after");
  CREATE INDEX "points_traits_ranking_traits_ranking_delta_idx" ON "points" USING btree ("traits_ranking_delta");
  CREATE INDEX "points_contexts_connections_contexts_connections_partici_idx" ON "points" USING btree ("contexts_connections_participants_id");
  CREATE UNIQUE INDEX "points_slug_idx" ON "points" USING btree ("slug");
  CREATE INDEX "points_updated_at_idx" ON "points" USING btree ("updated_at");
  CREATE INDEX "points_created_at_idx" ON "points" USING btree ("created_at");
  CREATE INDEX "points_name_idx" ON "points_locales" USING btree ("name","_locale");
  CREATE INDEX "points_basics_basics_description_idx" ON "points_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "points_seo_seo_image_idx" ON "points_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "points_locales_locale_parent_id_unique" ON "points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "points_rels_order_idx" ON "points_rels" USING btree ("order");
  CREATE INDEX "points_rels_parent_idx" ON "points_rels" USING btree ("parent_id");
  CREATE INDEX "points_rels_path_idx" ON "points_rels" USING btree ("path");
  CREATE INDEX "points_rels_categories_id_idx" ON "points_rels" USING btree ("categories_id");
  CREATE INDEX "points_rels_classifications_id_idx" ON "points_rels" USING btree ("classifications_id");
  CREATE INDEX "points_rels_specifications_id_idx" ON "points_rels" USING btree ("specifications_id");
  CREATE INDEX "points_rels_notes_id_idx" ON "points_rels" USING btree ("notes_id");
  CREATE INDEX "points_rels_organizations_id_idx" ON "points_rels" USING btree ("organizations_id");
  CREATE INDEX "points_rels_individuals_id_idx" ON "points_rels" USING btree ("individuals_id");
  CREATE INDEX "points_rels_tags_id_idx" ON "points_rels" USING btree ("tags_id");
  CREATE INDEX "drivers_first_idx" ON "drivers" USING btree ("first");
  CREATE INDEX "drivers_middle_idx" ON "drivers" USING btree ("middle");
  CREATE INDEX "drivers_last_idx" ON "drivers" USING btree ("last");
  CREATE UNIQUE INDEX "drivers_basics_identifier_basics_identifier_number_idx" ON "drivers" USING btree ("basics_identifier_number");
  CREATE UNIQUE INDEX "drivers_basics_identifier_basics_identifier_competition_idx" ON "drivers" USING btree ("basics_identifier_competition");
  CREATE INDEX "drivers_details_about_details_about_narrative_idx" ON "drivers" USING btree ("details_about_narrative_id");
  CREATE INDEX "drivers_details_about_details_about_biography_idx" ON "drivers" USING btree ("details_about_biography_id");
  CREATE INDEX "drivers_traits_identity_traits_identity_nationality_idx" ON "drivers" USING btree ("traits_identity_nationality");
  CREATE INDEX "drivers_assets_assets_avatar_idx" ON "drivers" USING btree ("assets_avatar_id");
  CREATE INDEX "drivers_assets_assets_cover_idx" ON "drivers" USING btree ("assets_cover_id");
  CREATE INDEX "drivers_assets_assets_autograph_idx" ON "drivers" USING btree ("assets_autograph_id");
  CREATE INDEX "drivers_assets_assets_helmet_idx" ON "drivers" USING btree ("assets_helmet_id");
  CREATE INDEX "drivers_assets_assets_suit_idx" ON "drivers" USING btree ("assets_suit_id");
  CREATE UNIQUE INDEX "drivers_slug_idx" ON "drivers" USING btree ("slug");
  CREATE INDEX "drivers_updated_at_idx" ON "drivers" USING btree ("updated_at");
  CREATE INDEX "drivers_created_at_idx" ON "drivers" USING btree ("created_at");
  CREATE INDEX "drivers_basics_basics_tagline_idx" ON "drivers_locales" USING btree ("basics_tagline","_locale");
  CREATE INDEX "drivers_basics_basics_description_idx" ON "drivers_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "drivers_seo_seo_image_idx" ON "drivers_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "drivers_locales_locale_parent_id_unique" ON "drivers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "drivers_rels_order_idx" ON "drivers_rels" USING btree ("order");
  CREATE INDEX "drivers_rels_parent_idx" ON "drivers_rels" USING btree ("parent_id");
  CREATE INDEX "drivers_rels_path_idx" ON "drivers_rels" USING btree ("path");
  CREATE INDEX "drivers_rels_categories_id_idx" ON "drivers_rels" USING btree ("categories_id");
  CREATE INDEX "drivers_rels_journeys_id_idx" ON "drivers_rels" USING btree ("journeys_id");
  CREATE INDEX "drivers_rels_channels_id_idx" ON "drivers_rels" USING btree ("channels_id");
  CREATE INDEX "drivers_rels_skills_id_idx" ON "drivers_rels" USING btree ("skills_id");
  CREATE INDEX "drivers_rels_experiences_id_idx" ON "drivers_rels" USING btree ("experiences_id");
  CREATE INDEX "drivers_rels_trainings_id_idx" ON "drivers_rels" USING btree ("trainings_id");
  CREATE INDEX "drivers_rels_points_id_idx" ON "drivers_rels" USING btree ("points_id");
  CREATE INDEX "drivers_rels_results_id_idx" ON "drivers_rels" USING btree ("results_id");
  CREATE INDEX "drivers_rels_awards_id_idx" ON "drivers_rels" USING btree ("awards_id");
  CREATE INDEX "drivers_rels_galleries_id_idx" ON "drivers_rels" USING btree ("galleries_id");
  CREATE INDEX "drivers_rels_drivers_id_idx" ON "drivers_rels" USING btree ("drivers_id");
  CREATE INDEX "drivers_rels_members_id_idx" ON "drivers_rels" USING btree ("members_id");
  CREATE INDEX "drivers_rels_leaders_id_idx" ON "drivers_rels" USING btree ("leaders_id");
  CREATE INDEX "drivers_rels_cars_id_idx" ON "drivers_rels" USING btree ("cars_id");
  CREATE INDEX "drivers_rels_kits_id_idx" ON "drivers_rels" USING btree ("kits_id");
  CREATE INDEX "drivers_rels_tags_id_idx" ON "drivers_rels" USING btree ("tags_id");
  CREATE INDEX "leaders_first_idx" ON "leaders" USING btree ("first");
  CREATE INDEX "leaders_middle_idx" ON "leaders" USING btree ("middle");
  CREATE INDEX "leaders_last_idx" ON "leaders" USING btree ("last");
  CREATE INDEX "leaders_basics_identifier_basics_identifier_designation_idx" ON "leaders" USING btree ("basics_identifier_designation");
  CREATE INDEX "leaders_basics_identifier_basics_identifier_title_idx" ON "leaders" USING btree ("basics_identifier_title");
  CREATE UNIQUE INDEX "leaders_basics_identifier_basics_identifier_code_idx" ON "leaders" USING btree ("basics_identifier_code");
  CREATE INDEX "leaders_details_about_details_about_narrative_idx" ON "leaders" USING btree ("details_about_narrative_id");
  CREATE INDEX "leaders_details_about_details_about_biography_idx" ON "leaders" USING btree ("details_about_biography_id");
  CREATE INDEX "leaders_traits_identity_traits_identity_nationality_idx" ON "leaders" USING btree ("traits_identity_nationality");
  CREATE INDEX "leaders_assets_assets_avatar_idx" ON "leaders" USING btree ("assets_avatar_id");
  CREATE INDEX "leaders_assets_assets_cover_idx" ON "leaders" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "leaders_slug_idx" ON "leaders" USING btree ("slug");
  CREATE INDEX "leaders_updated_at_idx" ON "leaders" USING btree ("updated_at");
  CREATE INDEX "leaders_created_at_idx" ON "leaders" USING btree ("created_at");
  CREATE INDEX "leaders_basics_basics_tagline_idx" ON "leaders_locales" USING btree ("basics_tagline","_locale");
  CREATE INDEX "leaders_basics_basics_description_idx" ON "leaders_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "leaders_seo_seo_image_idx" ON "leaders_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "leaders_locales_locale_parent_id_unique" ON "leaders_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "leaders_rels_order_idx" ON "leaders_rels" USING btree ("order");
  CREATE INDEX "leaders_rels_parent_idx" ON "leaders_rels" USING btree ("parent_id");
  CREATE INDEX "leaders_rels_path_idx" ON "leaders_rels" USING btree ("path");
  CREATE INDEX "leaders_rels_categories_id_idx" ON "leaders_rels" USING btree ("categories_id");
  CREATE INDEX "leaders_rels_classifications_id_idx" ON "leaders_rels" USING btree ("classifications_id");
  CREATE INDEX "leaders_rels_principles_id_idx" ON "leaders_rels" USING btree ("principles_id");
  CREATE INDEX "leaders_rels_features_id_idx" ON "leaders_rels" USING btree ("features_id");
  CREATE INDEX "leaders_rels_channels_id_idx" ON "leaders_rels" USING btree ("channels_id");
  CREATE INDEX "leaders_rels_strategies_id_idx" ON "leaders_rels" USING btree ("strategies_id");
  CREATE INDEX "leaders_rels_experiences_id_idx" ON "leaders_rels" USING btree ("experiences_id");
  CREATE INDEX "leaders_rels_impacts_id_idx" ON "leaders_rels" USING btree ("impacts_id");
  CREATE INDEX "leaders_rels_awards_id_idx" ON "leaders_rels" USING btree ("awards_id");
  CREATE INDEX "leaders_rels_galleries_id_idx" ON "leaders_rels" USING btree ("galleries_id");
  CREATE INDEX "leaders_rels_leaders_id_idx" ON "leaders_rels" USING btree ("leaders_id");
  CREATE INDEX "leaders_rels_individuals_id_idx" ON "leaders_rels" USING btree ("individuals_id");
  CREATE INDEX "leaders_rels_drivers_id_idx" ON "leaders_rels" USING btree ("drivers_id");
  CREATE INDEX "leaders_rels_members_id_idx" ON "leaders_rels" USING btree ("members_id");
  CREATE INDEX "leaders_rels_notes_id_idx" ON "leaders_rels" USING btree ("notes_id");
  CREATE INDEX "leaders_rels_tags_id_idx" ON "leaders_rels" USING btree ("tags_id");
  CREATE INDEX "members_first_idx" ON "members" USING btree ("first");
  CREATE INDEX "members_middle_idx" ON "members" USING btree ("middle");
  CREATE INDEX "members_last_idx" ON "members" USING btree ("last");
  CREATE INDEX "members_basics_identifier_basics_identifier_number_idx" ON "members" USING btree ("basics_identifier_number");
  CREATE INDEX "members_basics_identifier_basics_identifier_nickname_idx" ON "members" USING btree ("basics_identifier_nickname");
  CREATE INDEX "members_basics_identifier_basics_identifier_callsign_idx" ON "members" USING btree ("basics_identifier_callsign");
  CREATE INDEX "members_basics_identifier_basics_identifier_badge_idx" ON "members" USING btree ("basics_identifier_badge");
  CREATE INDEX "members_details_about_details_about_narrative_idx" ON "members" USING btree ("details_about_narrative_id");
  CREATE INDEX "members_traits_identity_traits_identity_nationality_idx" ON "members" USING btree ("traits_identity_nationality");
  CREATE INDEX "members_assets_assets_avatar_idx" ON "members" USING btree ("assets_avatar_id");
  CREATE INDEX "members_assets_assets_cover_idx" ON "members" USING btree ("assets_cover_id");
  CREATE INDEX "members_assets_assets_gallery_idx" ON "members" USING btree ("assets_gallery_id");
  CREATE UNIQUE INDEX "members_slug_idx" ON "members" USING btree ("slug");
  CREATE INDEX "members_updated_at_idx" ON "members" USING btree ("updated_at");
  CREATE INDEX "members_created_at_idx" ON "members" USING btree ("created_at");
  CREATE INDEX "members_basics_basics_tagline_idx" ON "members_locales" USING btree ("basics_tagline","_locale");
  CREATE INDEX "members_basics_basics_description_idx" ON "members_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "members_seo_seo_image_idx" ON "members_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "members_locales_locale_parent_id_unique" ON "members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "members_rels_order_idx" ON "members_rels" USING btree ("order");
  CREATE INDEX "members_rels_parent_idx" ON "members_rels" USING btree ("parent_id");
  CREATE INDEX "members_rels_path_idx" ON "members_rels" USING btree ("path");
  CREATE INDEX "members_rels_categories_id_idx" ON "members_rels" USING btree ("categories_id");
  CREATE INDEX "members_rels_classifications_id_idx" ON "members_rels" USING btree ("classifications_id");
  CREATE INDEX "members_rels_features_id_idx" ON "members_rels" USING btree ("features_id");
  CREATE INDEX "members_rels_channels_id_idx" ON "members_rels" USING btree ("channels_id");
  CREATE INDEX "members_rels_duties_id_idx" ON "members_rels" USING btree ("duties_id");
  CREATE INDEX "members_rels_skills_id_idx" ON "members_rels" USING btree ("skills_id");
  CREATE INDEX "members_rels_trainings_id_idx" ON "members_rels" USING btree ("trainings_id");
  CREATE INDEX "members_rels_archives_id_idx" ON "members_rels" USING btree ("archives_id");
  CREATE INDEX "members_rels_impacts_id_idx" ON "members_rels" USING btree ("impacts_id");
  CREATE INDEX "members_rels_awards_id_idx" ON "members_rels" USING btree ("awards_id");
  CREATE INDEX "members_rels_leaders_id_idx" ON "members_rels" USING btree ("leaders_id");
  CREATE INDEX "members_rels_members_id_idx" ON "members_rels" USING btree ("members_id");
  CREATE INDEX "members_rels_drivers_id_idx" ON "members_rels" USING btree ("drivers_id");
  CREATE INDEX "members_rels_cars_id_idx" ON "members_rels" USING btree ("cars_id");
  CREATE INDEX "members_rels_tags_id_idx" ON "members_rels" USING btree ("tags_id");
  CREATE INDEX "individuals_details_interests_list_order_idx" ON "individuals_details_interests_list" USING btree ("_order");
  CREATE INDEX "individuals_details_interests_list_parent_id_idx" ON "individuals_details_interests_list" USING btree ("_parent_id");
  CREATE INDEX "individuals_first_idx" ON "individuals" USING btree ("first");
  CREATE INDEX "individuals_middle_idx" ON "individuals" USING btree ("middle");
  CREATE INDEX "individuals_last_idx" ON "individuals" USING btree ("last");
  CREATE UNIQUE INDEX "individuals_basics_identifier_basics_identifier_code_idx" ON "individuals" USING btree ("basics_identifier_code");
  CREATE INDEX "individuals_basics_identifier_basics_identifier_number_idx" ON "individuals" USING btree ("basics_identifier_number");
  CREATE INDEX "individuals_details_about_details_about_narrative_idx" ON "individuals" USING btree ("details_about_narrative_id");
  CREATE INDEX "individuals_traits_identity_traits_identity_nationality_idx" ON "individuals" USING btree ("traits_identity_nationality");
  CREATE INDEX "individuals_assets_assets_avatar_idx" ON "individuals" USING btree ("assets_avatar_id");
  CREATE INDEX "individuals_contexts_contexts_history_idx" ON "individuals" USING btree ("contexts_history_id");
  CREATE UNIQUE INDEX "individuals_slug_idx" ON "individuals" USING btree ("slug");
  CREATE INDEX "individuals_updated_at_idx" ON "individuals" USING btree ("updated_at");
  CREATE INDEX "individuals_created_at_idx" ON "individuals" USING btree ("created_at");
  CREATE INDEX "individuals_basics_basics_tagline_idx" ON "individuals_locales" USING btree ("basics_tagline","_locale");
  CREATE INDEX "individuals_basics_basics_description_idx" ON "individuals_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "individuals_seo_seo_image_idx" ON "individuals_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "individuals_locales_locale_parent_id_unique" ON "individuals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "individuals_rels_order_idx" ON "individuals_rels" USING btree ("order");
  CREATE INDEX "individuals_rels_parent_idx" ON "individuals_rels" USING btree ("parent_id");
  CREATE INDEX "individuals_rels_path_idx" ON "individuals_rels" USING btree ("path");
  CREATE INDEX "individuals_rels_categories_id_idx" ON "individuals_rels" USING btree ("categories_id");
  CREATE INDEX "individuals_rels_channels_id_idx" ON "individuals_rels" USING btree ("channels_id");
  CREATE INDEX "individuals_rels_galleries_id_idx" ON "individuals_rels" USING btree ("galleries_id");
  CREATE INDEX "individuals_rels_notes_id_idx" ON "individuals_rels" USING btree ("notes_id");
  CREATE INDEX "individuals_rels_tags_id_idx" ON "individuals_rels" USING btree ("tags_id");
  CREATE INDEX "organizations_metrics_benefits_list_order_idx" ON "organizations_metrics_benefits_list" USING btree ("_order");
  CREATE INDEX "organizations_metrics_benefits_list_parent_id_idx" ON "organizations_metrics_benefits_list" USING btree ("_parent_id");
  CREATE INDEX "organizations_contexts_associations_list_order_idx" ON "organizations_contexts_associations_list" USING btree ("_order");
  CREATE INDEX "organizations_contexts_associations_list_parent_id_idx" ON "organizations_contexts_associations_list" USING btree ("_parent_id");
  CREATE INDEX "organizations_contexts_associations_list_branch_idx" ON "organizations_contexts_associations_list" USING btree ("branch_id");
  CREATE INDEX "organizations_contexts_associations_list_parent_idx" ON "organizations_contexts_associations_list" USING btree ("parent_id");
  CREATE UNIQUE INDEX "organizations_basics_identifier_basics_identifier_code_idx" ON "organizations" USING btree ("basics_identifier_code");
  CREATE INDEX "organizations_basics_identifier_basics_identifier_abbrev_idx" ON "organizations" USING btree ("basics_identifier_abbreviation");
  CREATE INDEX "organizations_basics_identifier_basics_identifier_regist_idx" ON "organizations" USING btree ("basics_identifier_registration");
  CREATE INDEX "organizations_details_about_details_about_narrative_idx" ON "organizations" USING btree ("details_about_narrative_id");
  CREATE INDEX "organizations_assets_assets_logo_idx" ON "organizations" USING btree ("assets_logo_id");
  CREATE INDEX "organizations_assets_assets_gallery_idx" ON "organizations" USING btree ("assets_gallery_id");
  CREATE INDEX "organizations_contexts_content_contexts_content_history_idx" ON "organizations" USING btree ("contexts_content_history_id");
  CREATE UNIQUE INDEX "organizations_slug_idx" ON "organizations" USING btree ("slug");
  CREATE INDEX "organizations_updated_at_idx" ON "organizations" USING btree ("updated_at");
  CREATE INDEX "organizations_created_at_idx" ON "organizations" USING btree ("created_at");
  CREATE INDEX "organizations_name_idx" ON "organizations_locales" USING btree ("name","_locale");
  CREATE INDEX "organizations_alias_idx" ON "organizations_locales" USING btree ("alias","_locale");
  CREATE INDEX "organizations_basics_basics_tagline_idx" ON "organizations_locales" USING btree ("basics_tagline","_locale");
  CREATE INDEX "organizations_basics_basics_description_idx" ON "organizations_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "organizations_seo_seo_image_idx" ON "organizations_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "organizations_locales_locale_parent_id_unique" ON "organizations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "organizations_rels_order_idx" ON "organizations_rels" USING btree ("order");
  CREATE INDEX "organizations_rels_parent_idx" ON "organizations_rels" USING btree ("parent_id");
  CREATE INDEX "organizations_rels_path_idx" ON "organizations_rels" USING btree ("path");
  CREATE INDEX "organizations_rels_categories_id_idx" ON "organizations_rels" USING btree ("categories_id");
  CREATE INDEX "organizations_rels_locations_id_idx" ON "organizations_rels" USING btree ("locations_id");
  CREATE INDEX "organizations_rels_channels_id_idx" ON "organizations_rels" USING btree ("channels_id");
  CREATE INDEX "organizations_rels_notes_id_idx" ON "organizations_rels" USING btree ("notes_id");
  CREATE INDEX "organizations_rels_tags_id_idx" ON "organizations_rels" USING btree ("tags_id");
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "narratives_metrics_timeline_list_order_idx" ON "narratives_metrics_timeline_list" USING btree ("_order");
  CREATE INDEX "narratives_metrics_timeline_list_parent_id_idx" ON "narratives_metrics_timeline_list" USING btree ("_parent_id");
  CREATE INDEX "narratives_traits_traits_tone_idx" ON "narratives" USING btree ("traits_tone_id");
  CREATE UNIQUE INDEX "narratives_slug_idx" ON "narratives" USING btree ("slug");
  CREATE INDEX "narratives_updated_at_idx" ON "narratives" USING btree ("updated_at");
  CREATE INDEX "narratives_created_at_idx" ON "narratives" USING btree ("created_at");
  CREATE INDEX "narratives_name_idx" ON "narratives_locales" USING btree ("name","_locale");
  CREATE INDEX "narratives_alias_idx" ON "narratives_locales" USING btree ("alias","_locale");
  CREATE INDEX "narratives_seo_seo_image_idx" ON "narratives_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "narratives_locales_locale_parent_id_unique" ON "narratives_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "narratives_rels_order_idx" ON "narratives_rels" USING btree ("order");
  CREATE INDEX "narratives_rels_parent_idx" ON "narratives_rels" USING btree ("parent_id");
  CREATE INDEX "narratives_rels_path_idx" ON "narratives_rels" USING btree ("path");
  CREATE INDEX "narratives_rels_categories_id_idx" ON "narratives_rels" USING btree ("categories_id");
  CREATE INDEX "narratives_rels_locations_id_idx" ON "narratives_rels" USING btree ("locations_id");
  CREATE INDEX "narratives_rels_drivers_id_idx" ON "narratives_rels" USING btree ("drivers_id");
  CREATE INDEX "narratives_rels_members_id_idx" ON "narratives_rels" USING btree ("members_id");
  CREATE INDEX "narratives_rels_leaders_id_idx" ON "narratives_rels" USING btree ("leaders_id");
  CREATE INDEX "narratives_rels_organizations_id_idx" ON "narratives_rels" USING btree ("organizations_id");
  CREATE INDEX "narratives_rels_individuals_id_idx" ON "narratives_rels" USING btree ("individuals_id");
  CREATE INDEX "narratives_rels_notes_id_idx" ON "narratives_rels" USING btree ("notes_id");
  CREATE INDEX "narratives_rels_tags_id_idx" ON "narratives_rels" USING btree ("tags_id");
  CREATE INDEX "stories_traits_concerns_list_order_idx" ON "stories_traits_concerns_list" USING btree ("_order");
  CREATE INDEX "stories_traits_concerns_list_parent_id_idx" ON "stories_traits_concerns_list" USING btree ("_parent_id");
  CREATE INDEX "stories_traits_concerns_list_conflict_idx" ON "stories_traits_concerns_list_locales" USING btree ("conflict","_locale");
  CREATE INDEX "stories_traits_concerns_list_stakes_idx" ON "stories_traits_concerns_list_locales" USING btree ("stakes","_locale");
  CREATE INDEX "stories_traits_concerns_list_resolution_idx" ON "stories_traits_concerns_list_locales" USING btree ("resolution","_locale");
  CREATE UNIQUE INDEX "stories_traits_concerns_list_locales_locale_parent_id_unique" ON "stories_traits_concerns_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "stories_traits_interactions_list_order_idx" ON "stories_traits_interactions_list" USING btree ("_order");
  CREATE INDEX "stories_traits_interactions_list_parent_id_idx" ON "stories_traits_interactions_list" USING btree ("_parent_id");
  CREATE INDEX "stories_traits_interactions_list_dynamics_idx" ON "stories_traits_interactions_list_locales" USING btree ("dynamics","_locale");
  CREATE INDEX "stories_traits_interactions_list_outcome_idx" ON "stories_traits_interactions_list_locales" USING btree ("outcome","_locale");
  CREATE UNIQUE INDEX "stories_traits_interactions_list_locales_locale_parent_id_un" ON "stories_traits_interactions_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "stories_details_details_narrative_idx" ON "stories" USING btree ("details_narrative_id");
  CREATE INDEX "stories_assets_assets_thumbnail_idx" ON "stories" USING btree ("assets_thumbnail_id");
  CREATE INDEX "stories_assets_assets_cover_idx" ON "stories" USING btree ("assets_cover_id");
  CREATE INDEX "stories_assets_assets_gallery_idx" ON "stories" USING btree ("assets_gallery_id");
  CREATE INDEX "stories_assets_assets_playlist_idx" ON "stories" USING btree ("assets_playlist_id");
  CREATE INDEX "stories_assets_assets_visualization_idx" ON "stories" USING btree ("assets_visualization_id");
  CREATE INDEX "stories_assets_assets_documents_idx" ON "stories" USING btree ("assets_documents_id");
  CREATE UNIQUE INDEX "stories_slug_idx" ON "stories" USING btree ("slug");
  CREATE INDEX "stories_updated_at_idx" ON "stories" USING btree ("updated_at");
  CREATE INDEX "stories_created_at_idx" ON "stories" USING btree ("created_at");
  CREATE INDEX "stories_name_idx" ON "stories_locales" USING btree ("name","_locale");
  CREATE INDEX "stories_alias_idx" ON "stories_locales" USING btree ("alias","_locale");
  CREATE INDEX "stories_basics_basics_description_idx" ON "stories_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "stories_details_details_alias_idx" ON "stories_locales" USING btree ("details_alias","_locale");
  CREATE INDEX "stories_seo_seo_image_idx" ON "stories_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "stories_locales_locale_parent_id_unique" ON "stories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "stories_rels_order_idx" ON "stories_rels" USING btree ("order");
  CREATE INDEX "stories_rels_parent_idx" ON "stories_rels" USING btree ("parent_id");
  CREATE INDEX "stories_rels_path_idx" ON "stories_rels" USING btree ("path");
  CREATE INDEX "stories_rels_categories_id_idx" ON "stories_rels" USING btree ("categories_id");
  CREATE INDEX "stories_rels_highlights_id_idx" ON "stories_rels" USING btree ("highlights_id");
  CREATE INDEX "stories_rels_incidents_id_idx" ON "stories_rels" USING btree ("incidents_id");
  CREATE INDEX "stories_rels_tags_id_idx" ON "stories_rels" USING btree ("tags_id");
  CREATE INDEX "histories_details_content_details_content_narrative_idx" ON "histories" USING btree ("details_content_narrative_id");
  CREATE INDEX "histories_assets_assets_thumbnail_idx" ON "histories" USING btree ("assets_thumbnail_id");
  CREATE INDEX "histories_assets_assets_gallery_idx" ON "histories" USING btree ("assets_gallery_id");
  CREATE INDEX "histories_assets_assets_playlist_idx" ON "histories" USING btree ("assets_playlist_id");
  CREATE UNIQUE INDEX "histories_slug_idx" ON "histories" USING btree ("slug");
  CREATE INDEX "histories_updated_at_idx" ON "histories" USING btree ("updated_at");
  CREATE INDEX "histories_created_at_idx" ON "histories" USING btree ("created_at");
  CREATE INDEX "histories_name_idx" ON "histories_locales" USING btree ("name","_locale");
  CREATE INDEX "histories_alias_idx" ON "histories_locales" USING btree ("alias","_locale");
  CREATE INDEX "histories_basics_basics_description_idx" ON "histories_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "histories_seo_seo_image_idx" ON "histories_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "histories_locales_locale_parent_id_unique" ON "histories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "histories_rels_order_idx" ON "histories_rels" USING btree ("order");
  CREATE INDEX "histories_rels_parent_idx" ON "histories_rels" USING btree ("parent_id");
  CREATE INDEX "histories_rels_path_idx" ON "histories_rels" USING btree ("path");
  CREATE INDEX "histories_rels_categories_id_idx" ON "histories_rels" USING btree ("categories_id");
  CREATE INDEX "histories_rels_stories_id_idx" ON "histories_rels" USING btree ("stories_id");
  CREATE INDEX "histories_rels_tags_id_idx" ON "histories_rels" USING btree ("tags_id");
  CREATE INDEX "journeys_traits_lessons_list_order_idx" ON "journeys_traits_lessons_list" USING btree ("_order");
  CREATE INDEX "journeys_traits_lessons_list_parent_id_idx" ON "journeys_traits_lessons_list" USING btree ("_parent_id");
  CREATE INDEX "journeys_details_content_details_content_narrative_idx" ON "journeys" USING btree ("details_content_narrative_id");
  CREATE INDEX "journeys_assets_assets_thumbnail_idx" ON "journeys" USING btree ("assets_thumbnail_id");
  CREATE INDEX "journeys_assets_assets_gallery_idx" ON "journeys" USING btree ("assets_gallery_id");
  CREATE INDEX "journeys_assets_assets_playlist_idx" ON "journeys" USING btree ("assets_playlist_id");
  CREATE UNIQUE INDEX "journeys_slug_idx" ON "journeys" USING btree ("slug");
  CREATE INDEX "journeys_updated_at_idx" ON "journeys" USING btree ("updated_at");
  CREATE INDEX "journeys_created_at_idx" ON "journeys" USING btree ("created_at");
  CREATE INDEX "journeys_name_idx" ON "journeys_locales" USING btree ("name","_locale");
  CREATE INDEX "journeys_basics_basics_description_idx" ON "journeys_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "journeys_seo_seo_image_idx" ON "journeys_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "journeys_locales_locale_parent_id_unique" ON "journeys_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "journeys_rels_order_idx" ON "journeys_rels" USING btree ("order");
  CREATE INDEX "journeys_rels_parent_idx" ON "journeys_rels" USING btree ("parent_id");
  CREATE INDEX "journeys_rels_path_idx" ON "journeys_rels" USING btree ("path");
  CREATE INDEX "journeys_rels_categories_id_idx" ON "journeys_rels" USING btree ("categories_id");
  CREATE INDEX "journeys_rels_stories_id_idx" ON "journeys_rels" USING btree ("stories_id");
  CREATE INDEX "journeys_rels_decisions_id_idx" ON "journeys_rels" USING btree ("decisions_id");
  CREATE INDEX "journeys_rels_impacts_id_idx" ON "journeys_rels" USING btree ("impacts_id");
  CREATE INDEX "journeys_rels_tags_id_idx" ON "journeys_rels" USING btree ("tags_id");
  CREATE INDEX "notes_traits_intentions_list_order_idx" ON "notes_traits_intentions_list" USING btree ("_order");
  CREATE INDEX "notes_traits_intentions_list_parent_id_idx" ON "notes_traits_intentions_list" USING btree ("_parent_id");
  CREATE INDEX "notes_traits_intentions_list_type_idx" ON "notes_traits_intentions_list_locales" USING btree ("type","_locale");
  CREATE INDEX "notes_traits_intentions_list_impact_idx" ON "notes_traits_intentions_list_locales" USING btree ("impact","_locale");
  CREATE INDEX "notes_traits_intentions_list_remark_idx" ON "notes_traits_intentions_list_locales" USING btree ("remark","_locale");
  CREATE UNIQUE INDEX "notes_traits_intentions_list_locales_locale_parent_id_unique" ON "notes_traits_intentions_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "notes_assets_assets_thumbnail_idx" ON "notes" USING btree ("assets_thumbnail_id");
  CREATE INDEX "notes_assets_assets_archive_idx" ON "notes" USING btree ("assets_archive_id");
  CREATE INDEX "notes_assets_assets_visualization_idx" ON "notes" USING btree ("assets_visualization_id");
  CREATE UNIQUE INDEX "notes_slug_idx" ON "notes" USING btree ("slug");
  CREATE INDEX "notes_updated_at_idx" ON "notes" USING btree ("updated_at");
  CREATE INDEX "notes_created_at_idx" ON "notes" USING btree ("created_at");
  CREATE INDEX "notes_name_idx" ON "notes_locales" USING btree ("name","_locale");
  CREATE INDEX "notes_alias_idx" ON "notes_locales" USING btree ("alias","_locale");
  CREATE INDEX "notes_seo_seo_image_idx" ON "notes_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "notes_locales_locale_parent_id_unique" ON "notes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "notes_rels_order_idx" ON "notes_rels" USING btree ("order");
  CREATE INDEX "notes_rels_parent_idx" ON "notes_rels" USING btree ("parent_id");
  CREATE INDEX "notes_rels_path_idx" ON "notes_rels" USING btree ("path");
  CREATE INDEX "notes_rels_categories_id_idx" ON "notes_rels" USING btree ("categories_id");
  CREATE INDEX "notes_rels_tags_id_idx" ON "notes_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages_seo_seo_image_idx" ON "pages_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_order_idx" ON "pages_rels" USING btree ("order");
  CREATE INDEX "pages_rels_parent_idx" ON "pages_rels" USING btree ("parent_id");
  CREATE INDEX "pages_rels_path_idx" ON "pages_rels" USING btree ("path");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "pages_rels_tags_id_idx" ON "pages_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "cars_basics_identifiers_basics_identifiers_chassis_idx" ON "cars" USING btree ("basics_identifiers_chassis");
  CREATE INDEX "cars_basics_identifiers_basics_identifiers_version_idx" ON "cars" USING btree ("basics_identifiers_version");
  CREATE INDEX "cars_basics_identifiers_basics_identifiers_code_idx" ON "cars" USING btree ("basics_identifiers_code");
  CREATE INDEX "cars_assets_assets_thumbnail_idx" ON "cars" USING btree ("assets_thumbnail_id");
  CREATE INDEX "cars_assets_assets_cover_idx" ON "cars" USING btree ("assets_cover_id");
  CREATE INDEX "cars_assets_assets_gallery_idx" ON "cars" USING btree ("assets_gallery_id");
  CREATE INDEX "cars_assets_assets_playlist_idx" ON "cars" USING btree ("assets_playlist_id");
  CREATE INDEX "cars_assets_assets_visualization_idx" ON "cars" USING btree ("assets_visualization_id");
  CREATE INDEX "cars_assets_assets_documents_idx" ON "cars" USING btree ("assets_documents_id");
  CREATE INDEX "cars_contexts_content_contexts_content_histories_idx" ON "cars" USING btree ("contexts_content_histories_id");
  CREATE UNIQUE INDEX "cars_slug_idx" ON "cars" USING btree ("slug");
  CREATE INDEX "cars_updated_at_idx" ON "cars" USING btree ("updated_at");
  CREATE INDEX "cars_created_at_idx" ON "cars" USING btree ("created_at");
  CREATE INDEX "cars_name_idx" ON "cars_locales" USING btree ("name","_locale");
  CREATE INDEX "cars_basics_basics_tagline_idx" ON "cars_locales" USING btree ("basics_tagline","_locale");
  CREATE INDEX "cars_basics_basics_description_idx" ON "cars_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "cars_seo_seo_image_idx" ON "cars_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "cars_locales_locale_parent_id_unique" ON "cars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "cars_rels_order_idx" ON "cars_rels" USING btree ("order");
  CREATE INDEX "cars_rels_parent_idx" ON "cars_rels" USING btree ("parent_id");
  CREATE INDEX "cars_rels_path_idx" ON "cars_rels" USING btree ("path");
  CREATE INDEX "cars_rels_categories_id_idx" ON "cars_rels" USING btree ("categories_id");
  CREATE INDEX "cars_rels_classifications_id_idx" ON "cars_rels" USING btree ("classifications_id");
  CREATE INDEX "cars_rels_features_id_idx" ON "cars_rels" USING btree ("features_id");
  CREATE INDEX "cars_rels_specifications_id_idx" ON "cars_rels" USING btree ("specifications_id");
  CREATE INDEX "cars_rels_organizations_id_idx" ON "cars_rels" USING btree ("organizations_id");
  CREATE INDEX "cars_rels_drivers_id_idx" ON "cars_rels" USING btree ("drivers_id");
  CREATE INDEX "cars_rels_members_id_idx" ON "cars_rels" USING btree ("members_id");
  CREATE INDEX "cars_rels_leaders_id_idx" ON "cars_rels" USING btree ("leaders_id");
  CREATE INDEX "cars_rels_individuals_id_idx" ON "cars_rels" USING btree ("individuals_id");
  CREATE INDEX "cars_rels_tags_id_idx" ON "cars_rels" USING btree ("tags_id");
  CREATE INDEX "kits_traits_materials_list_order_idx" ON "kits_traits_materials_list" USING btree ("_order");
  CREATE INDEX "kits_traits_materials_list_parent_id_idx" ON "kits_traits_materials_list" USING btree ("_parent_id");
  CREATE INDEX "kits_assets_assets_thumbnail_idx" ON "kits" USING btree ("assets_thumbnail_id");
  CREATE INDEX "kits_assets_assets_cover_idx" ON "kits" USING btree ("assets_cover_id");
  CREATE INDEX "kits_assets_assets_gallery_idx" ON "kits" USING btree ("assets_gallery_id");
  CREATE INDEX "kits_assets_assets_visualizations_idx" ON "kits" USING btree ("assets_visualizations_id");
  CREATE UNIQUE INDEX "kits_slug_idx" ON "kits" USING btree ("slug");
  CREATE INDEX "kits_updated_at_idx" ON "kits" USING btree ("updated_at");
  CREATE INDEX "kits_created_at_idx" ON "kits" USING btree ("created_at");
  CREATE INDEX "kits_name_idx" ON "kits_locales" USING btree ("name","_locale");
  CREATE INDEX "kits_basics_basics_tagline_idx" ON "kits_locales" USING btree ("basics_tagline","_locale");
  CREATE INDEX "kits_basics_basics_description_idx" ON "kits_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "kits_seo_seo_image_idx" ON "kits_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "kits_locales_locale_parent_id_unique" ON "kits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "kits_rels_order_idx" ON "kits_rels" USING btree ("order");
  CREATE INDEX "kits_rels_parent_idx" ON "kits_rels" USING btree ("parent_id");
  CREATE INDEX "kits_rels_path_idx" ON "kits_rels" USING btree ("path");
  CREATE INDEX "kits_rels_categories_id_idx" ON "kits_rels" USING btree ("categories_id");
  CREATE INDEX "kits_rels_drivers_id_idx" ON "kits_rels" USING btree ("drivers_id");
  CREATE INDEX "kits_rels_members_id_idx" ON "kits_rels" USING btree ("members_id");
  CREATE INDEX "kits_rels_leaders_id_idx" ON "kits_rels" USING btree ("leaders_id");
  CREATE INDEX "kits_rels_organizations_id_idx" ON "kits_rels" USING btree ("organizations_id");
  CREATE INDEX "kits_rels_individuals_id_idx" ON "kits_rels" USING btree ("individuals_id");
  CREATE INDEX "kits_rels_notes_id_idx" ON "kits_rels" USING btree ("notes_id");
  CREATE INDEX "kits_rels_tags_id_idx" ON "kits_rels" USING btree ("tags_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "galleries_slug_idx" ON "galleries" USING btree ("slug");
  CREATE INDEX "galleries_updated_at_idx" ON "galleries" USING btree ("updated_at");
  CREATE INDEX "galleries_created_at_idx" ON "galleries" USING btree ("created_at");
  CREATE INDEX "galleries_name_idx" ON "galleries_locales" USING btree ("name","_locale");
  CREATE INDEX "galleries_basics_basics_description_idx" ON "galleries_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "galleries_seo_seo_image_idx" ON "galleries_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "galleries_locales_locale_parent_id_unique" ON "galleries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "galleries_rels_order_idx" ON "galleries_rels" USING btree ("order");
  CREATE INDEX "galleries_rels_parent_idx" ON "galleries_rels" USING btree ("parent_id");
  CREATE INDEX "galleries_rels_path_idx" ON "galleries_rels" USING btree ("path");
  CREATE INDEX "galleries_rels_categories_id_idx" ON "galleries_rels" USING btree ("categories_id");
  CREATE INDEX "galleries_rels_media_id_idx" ON "galleries_rels" USING btree ("media_id");
  CREATE INDEX "galleries_rels_narratives_id_idx" ON "galleries_rels" USING btree ("narratives_id");
  CREATE INDEX "galleries_rels_tags_id_idx" ON "galleries_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "playlists_slug_idx" ON "playlists" USING btree ("slug");
  CREATE INDEX "playlists_updated_at_idx" ON "playlists" USING btree ("updated_at");
  CREATE INDEX "playlists_created_at_idx" ON "playlists" USING btree ("created_at");
  CREATE INDEX "playlists_name_idx" ON "playlists_locales" USING btree ("name","_locale");
  CREATE INDEX "playlists_basics_basics_description_idx" ON "playlists_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "playlists_seo_seo_image_idx" ON "playlists_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "playlists_locales_locale_parent_id_unique" ON "playlists_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "playlists_rels_order_idx" ON "playlists_rels" USING btree ("order");
  CREATE INDEX "playlists_rels_parent_idx" ON "playlists_rels" USING btree ("parent_id");
  CREATE INDEX "playlists_rels_path_idx" ON "playlists_rels" USING btree ("path");
  CREATE INDEX "playlists_rels_categories_id_idx" ON "playlists_rels" USING btree ("categories_id");
  CREATE INDEX "playlists_rels_media_id_idx" ON "playlists_rels" USING btree ("media_id");
  CREATE INDEX "playlists_rels_narratives_id_idx" ON "playlists_rels" USING btree ("narratives_id");
  CREATE INDEX "playlists_rels_tags_id_idx" ON "playlists_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "archives_slug_idx" ON "archives" USING btree ("slug");
  CREATE INDEX "archives_updated_at_idx" ON "archives" USING btree ("updated_at");
  CREATE INDEX "archives_created_at_idx" ON "archives" USING btree ("created_at");
  CREATE INDEX "archives_name_idx" ON "archives_locales" USING btree ("name","_locale");
  CREATE INDEX "archives_basics_basics_description_idx" ON "archives_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "archives_seo_seo_image_idx" ON "archives_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "archives_locales_locale_parent_id_unique" ON "archives_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "archives_rels_order_idx" ON "archives_rels" USING btree ("order");
  CREATE INDEX "archives_rels_parent_idx" ON "archives_rels" USING btree ("parent_id");
  CREATE INDEX "archives_rels_path_idx" ON "archives_rels" USING btree ("path");
  CREATE INDEX "archives_rels_categories_id_idx" ON "archives_rels" USING btree ("categories_id");
  CREATE INDEX "archives_rels_media_id_idx" ON "archives_rels" USING btree ("media_id");
  CREATE INDEX "archives_rels_narratives_id_idx" ON "archives_rels" USING btree ("narratives_id");
  CREATE INDEX "archives_rels_tags_id_idx" ON "archives_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "visualizations_slug_idx" ON "visualizations" USING btree ("slug");
  CREATE INDEX "visualizations_updated_at_idx" ON "visualizations" USING btree ("updated_at");
  CREATE INDEX "visualizations_created_at_idx" ON "visualizations" USING btree ("created_at");
  CREATE INDEX "visualizations_name_idx" ON "visualizations_locales" USING btree ("name","_locale");
  CREATE INDEX "visualizations_basics_basics_description_idx" ON "visualizations_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "visualizations_seo_seo_image_idx" ON "visualizations_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "visualizations_locales_locale_parent_id_unique" ON "visualizations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "visualizations_rels_order_idx" ON "visualizations_rels" USING btree ("order");
  CREATE INDEX "visualizations_rels_parent_idx" ON "visualizations_rels" USING btree ("parent_id");
  CREATE INDEX "visualizations_rels_path_idx" ON "visualizations_rels" USING btree ("path");
  CREATE INDEX "visualizations_rels_categories_id_idx" ON "visualizations_rels" USING btree ("categories_id");
  CREATE INDEX "visualizations_rels_media_id_idx" ON "visualizations_rels" USING btree ("media_id");
  CREATE INDEX "visualizations_rels_narratives_id_idx" ON "visualizations_rels" USING btree ("narratives_id");
  CREATE INDEX "visualizations_rels_tags_id_idx" ON "visualizations_rels" USING btree ("tags_id");
  CREATE INDEX "schedules_details_slots_list_order_idx" ON "schedules_details_slots_list" USING btree ("_order");
  CREATE INDEX "schedules_details_slots_list_parent_id_idx" ON "schedules_details_slots_list" USING btree ("_parent_id");
  CREATE INDEX "schedules_details_slots_list_location_idx" ON "schedules_details_slots_list" USING btree ("location_id");
  CREATE INDEX "schedules_traits_constraints_list_order_idx" ON "schedules_traits_constraints_list" USING btree ("_order");
  CREATE INDEX "schedules_traits_constraints_list_parent_id_idx" ON "schedules_traits_constraints_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "schedules_slug_idx" ON "schedules" USING btree ("slug");
  CREATE INDEX "schedules_updated_at_idx" ON "schedules" USING btree ("updated_at");
  CREATE INDEX "schedules_created_at_idx" ON "schedules" USING btree ("created_at");
  CREATE INDEX "schedules_name_idx" ON "schedules_locales" USING btree ("name","_locale");
  CREATE INDEX "schedules_seo_seo_image_idx" ON "schedules_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "schedules_locales_locale_parent_id_unique" ON "schedules_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "schedules_rels_order_idx" ON "schedules_rels" USING btree ("order");
  CREATE INDEX "schedules_rels_parent_idx" ON "schedules_rels" USING btree ("parent_id");
  CREATE INDEX "schedules_rels_path_idx" ON "schedules_rels" USING btree ("path");
  CREATE INDEX "schedules_rels_categories_id_idx" ON "schedules_rels" USING btree ("categories_id");
  CREATE INDEX "schedules_rels_drivers_id_idx" ON "schedules_rels" USING btree ("drivers_id");
  CREATE INDEX "schedules_rels_members_id_idx" ON "schedules_rels" USING btree ("members_id");
  CREATE INDEX "schedules_rels_leaders_id_idx" ON "schedules_rels" USING btree ("leaders_id");
  CREATE INDEX "schedules_rels_individuals_id_idx" ON "schedules_rels" USING btree ("individuals_id");
  CREATE INDEX "schedules_rels_organizations_id_idx" ON "schedules_rels" USING btree ("organizations_id");
  CREATE INDEX "schedules_rels_trainings_id_idx" ON "schedules_rels" USING btree ("trainings_id");
  CREATE INDEX "schedules_rels_meetups_id_idx" ON "schedules_rels" USING btree ("meetups_id");
  CREATE INDEX "schedules_rels_initiatives_id_idx" ON "schedules_rels" USING btree ("initiatives_id");
  CREATE INDEX "schedules_rels_celebrations_id_idx" ON "schedules_rels" USING btree ("celebrations_id");
  CREATE INDEX "schedules_rels_tags_id_idx" ON "schedules_rels" USING btree ("tags_id");
  CREATE INDEX "trainings_assets_assets_gallery_idx" ON "trainings" USING btree ("assets_gallery_id");
  CREATE INDEX "trainings_assets_assets_playlist_idx" ON "trainings" USING btree ("assets_playlist_id");
  CREATE UNIQUE INDEX "trainings_slug_idx" ON "trainings" USING btree ("slug");
  CREATE INDEX "trainings_updated_at_idx" ON "trainings" USING btree ("updated_at");
  CREATE INDEX "trainings_created_at_idx" ON "trainings" USING btree ("created_at");
  CREATE INDEX "trainings_name_idx" ON "trainings_locales" USING btree ("name","_locale");
  CREATE INDEX "trainings_details_details_narrative_idx" ON "trainings_locales" USING btree ("details_narrative_id","_locale");
  CREATE INDEX "trainings_traits_traits_intensity_idx" ON "trainings_locales" USING btree ("traits_intensity","_locale");
  CREATE INDEX "trainings_traits_traits_format_idx" ON "trainings_locales" USING btree ("traits_format","_locale");
  CREATE INDEX "trainings_seo_seo_image_idx" ON "trainings_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "trainings_locales_locale_parent_id_unique" ON "trainings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "trainings_rels_order_idx" ON "trainings_rels" USING btree ("order");
  CREATE INDEX "trainings_rels_parent_idx" ON "trainings_rels" USING btree ("parent_id");
  CREATE INDEX "trainings_rels_path_idx" ON "trainings_rels" USING btree ("path");
  CREATE INDEX "trainings_rels_categories_id_idx" ON "trainings_rels" USING btree ("categories_id");
  CREATE INDEX "trainings_rels_specifications_id_idx" ON "trainings_rels" USING btree ("specifications_id");
  CREATE INDEX "trainings_rels_drivers_id_idx" ON "trainings_rels" USING btree ("drivers_id");
  CREATE INDEX "trainings_rels_members_id_idx" ON "trainings_rels" USING btree ("members_id");
  CREATE INDEX "trainings_rels_leaders_id_idx" ON "trainings_rels" USING btree ("leaders_id");
  CREATE INDEX "trainings_rels_individuals_id_idx" ON "trainings_rels" USING btree ("individuals_id");
  CREATE INDEX "trainings_rels_organizations_id_idx" ON "trainings_rels" USING btree ("organizations_id");
  CREATE INDEX "trainings_rels_strategies_id_idx" ON "trainings_rels" USING btree ("strategies_id");
  CREATE INDEX "trainings_rels_skills_id_idx" ON "trainings_rels" USING btree ("skills_id");
  CREATE INDEX "trainings_rels_stories_id_idx" ON "trainings_rels" USING btree ("stories_id");
  CREATE INDEX "trainings_rels_tags_id_idx" ON "trainings_rels" USING btree ("tags_id");
  CREATE INDEX "careers_details_positions_list_order_idx" ON "careers_details_positions_list" USING btree ("_order");
  CREATE INDEX "careers_details_positions_list_parent_id_idx" ON "careers_details_positions_list" USING btree ("_parent_id");
  CREATE INDEX "careers_details_details_narrative_idx" ON "careers" USING btree ("details_narrative_id");
  CREATE UNIQUE INDEX "careers_slug_idx" ON "careers" USING btree ("slug");
  CREATE INDEX "careers_updated_at_idx" ON "careers" USING btree ("updated_at");
  CREATE INDEX "careers_created_at_idx" ON "careers" USING btree ("created_at");
  CREATE INDEX "careers_name_idx" ON "careers_locales" USING btree ("name","_locale");
  CREATE INDEX "careers_seo_seo_image_idx" ON "careers_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "careers_locales_locale_parent_id_unique" ON "careers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "careers_rels_order_idx" ON "careers_rels" USING btree ("order");
  CREATE INDEX "careers_rels_parent_idx" ON "careers_rels" USING btree ("parent_id");
  CREATE INDEX "careers_rels_path_idx" ON "careers_rels" USING btree ("path");
  CREATE INDEX "careers_rels_categories_id_idx" ON "careers_rels" USING btree ("categories_id");
  CREATE INDEX "careers_rels_expectations_id_idx" ON "careers_rels" USING btree ("expectations_id");
  CREATE INDEX "careers_rels_highlights_id_idx" ON "careers_rels" USING btree ("highlights_id");
  CREATE INDEX "careers_rels_awards_id_idx" ON "careers_rels" USING btree ("awards_id");
  CREATE INDEX "careers_rels_drivers_id_idx" ON "careers_rels" USING btree ("drivers_id");
  CREATE INDEX "careers_rels_members_id_idx" ON "careers_rels" USING btree ("members_id");
  CREATE INDEX "careers_rels_leaders_id_idx" ON "careers_rels" USING btree ("leaders_id");
  CREATE INDEX "careers_rels_individuals_id_idx" ON "careers_rels" USING btree ("individuals_id");
  CREATE INDEX "careers_rels_organizations_id_idx" ON "careers_rels" USING btree ("organizations_id");
  CREATE INDEX "careers_rels_cars_id_idx" ON "careers_rels" USING btree ("cars_id");
  CREATE INDEX "careers_rels_stories_id_idx" ON "careers_rels" USING btree ("stories_id");
  CREATE INDEX "careers_rels_tags_id_idx" ON "careers_rels" USING btree ("tags_id");
  CREATE INDEX "initiatives_details_details_classifications_idx" ON "initiatives" USING btree ("details_classifications_id");
  CREATE INDEX "initiatives_details_details_narrative_idx" ON "initiatives" USING btree ("details_narrative_id");
  CREATE INDEX "initiatives_assets_assets_primary_idx" ON "initiatives" USING btree ("assets_primary_id");
  CREATE INDEX "initiatives_assets_assets_gallery_idx" ON "initiatives" USING btree ("assets_gallery_id");
  CREATE INDEX "initiatives_assets_assets_documents_idx" ON "initiatives" USING btree ("assets_documents_id");
  CREATE UNIQUE INDEX "initiatives_slug_idx" ON "initiatives" USING btree ("slug");
  CREATE INDEX "initiatives_updated_at_idx" ON "initiatives" USING btree ("updated_at");
  CREATE INDEX "initiatives_created_at_idx" ON "initiatives" USING btree ("created_at");
  CREATE INDEX "initiatives_name_idx" ON "initiatives_locales" USING btree ("name","_locale");
  CREATE INDEX "initiatives_basics_basics_mission_idx" ON "initiatives_locales" USING btree ("basics_mission","_locale");
  CREATE INDEX "initiatives_basics_basics_description_idx" ON "initiatives_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "initiatives_seo_seo_image_idx" ON "initiatives_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "initiatives_locales_locale_parent_id_unique" ON "initiatives_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "initiatives_rels_order_idx" ON "initiatives_rels" USING btree ("order");
  CREATE INDEX "initiatives_rels_parent_idx" ON "initiatives_rels" USING btree ("parent_id");
  CREATE INDEX "initiatives_rels_path_idx" ON "initiatives_rels" USING btree ("path");
  CREATE INDEX "initiatives_rels_categories_id_idx" ON "initiatives_rels" USING btree ("categories_id");
  CREATE INDEX "initiatives_rels_schedules_id_idx" ON "initiatives_rels" USING btree ("schedules_id");
  CREATE INDEX "initiatives_rels_strategies_id_idx" ON "initiatives_rels" USING btree ("strategies_id");
  CREATE INDEX "initiatives_rels_expectations_id_idx" ON "initiatives_rels" USING btree ("expectations_id");
  CREATE INDEX "initiatives_rels_organizations_id_idx" ON "initiatives_rels" USING btree ("organizations_id");
  CREATE INDEX "initiatives_rels_leaders_id_idx" ON "initiatives_rels" USING btree ("leaders_id");
  CREATE INDEX "initiatives_rels_individuals_id_idx" ON "initiatives_rels" USING btree ("individuals_id");
  CREATE INDEX "initiatives_rels_incidents_id_idx" ON "initiatives_rels" USING btree ("incidents_id");
  CREATE INDEX "initiatives_rels_celebrations_id_idx" ON "initiatives_rels" USING btree ("celebrations_id");
  CREATE INDEX "initiatives_rels_histories_id_idx" ON "initiatives_rels" USING btree ("histories_id");
  CREATE INDEX "initiatives_rels_notes_id_idx" ON "initiatives_rels" USING btree ("notes_id");
  CREATE INDEX "initiatives_rels_tags_id_idx" ON "initiatives_rels" USING btree ("tags_id");
  CREATE INDEX "meetups_basics_basics_location_idx" ON "meetups" USING btree ("basics_location_id");
  CREATE INDEX "meetups_details_details_narrative_idx" ON "meetups" USING btree ("details_narrative_id");
  CREATE INDEX "meetups_assets_assets_primary_idx" ON "meetups" USING btree ("assets_primary_id");
  CREATE INDEX "meetups_assets_assets_gallery_idx" ON "meetups" USING btree ("assets_gallery_id");
  CREATE INDEX "meetups_assets_assets_playlist_idx" ON "meetups" USING btree ("assets_playlist_id");
  CREATE INDEX "meetups_assets_assets_materials_idx" ON "meetups" USING btree ("assets_materials_id");
  CREATE UNIQUE INDEX "meetups_slug_idx" ON "meetups" USING btree ("slug");
  CREATE INDEX "meetups_updated_at_idx" ON "meetups" USING btree ("updated_at");
  CREATE INDEX "meetups_created_at_idx" ON "meetups" USING btree ("created_at");
  CREATE INDEX "meetups_name_idx" ON "meetups_locales" USING btree ("name","_locale");
  CREATE INDEX "meetups_basics_basics_description_idx" ON "meetups_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "meetups_seo_seo_image_idx" ON "meetups_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "meetups_locales_locale_parent_id_unique" ON "meetups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "meetups_rels_order_idx" ON "meetups_rels" USING btree ("order");
  CREATE INDEX "meetups_rels_parent_idx" ON "meetups_rels" USING btree ("parent_id");
  CREATE INDEX "meetups_rels_path_idx" ON "meetups_rels" USING btree ("path");
  CREATE INDEX "meetups_rels_categories_id_idx" ON "meetups_rels" USING btree ("categories_id");
  CREATE INDEX "meetups_rels_features_id_idx" ON "meetups_rels" USING btree ("features_id");
  CREATE INDEX "meetups_rels_schedules_id_idx" ON "meetups_rels" USING btree ("schedules_id");
  CREATE INDEX "meetups_rels_specifications_id_idx" ON "meetups_rels" USING btree ("specifications_id");
  CREATE INDEX "meetups_rels_organizations_id_idx" ON "meetups_rels" USING btree ("organizations_id");
  CREATE INDEX "meetups_rels_leaders_id_idx" ON "meetups_rels" USING btree ("leaders_id");
  CREATE INDEX "meetups_rels_individuals_id_idx" ON "meetups_rels" USING btree ("individuals_id");
  CREATE INDEX "meetups_rels_drivers_id_idx" ON "meetups_rels" USING btree ("drivers_id");
  CREATE INDEX "meetups_rels_members_id_idx" ON "meetups_rels" USING btree ("members_id");
  CREATE INDEX "meetups_rels_initiatives_id_idx" ON "meetups_rels" USING btree ("initiatives_id");
  CREATE INDEX "meetups_rels_celebrations_id_idx" ON "meetups_rels" USING btree ("celebrations_id");
  CREATE INDEX "meetups_rels_notes_id_idx" ON "meetups_rels" USING btree ("notes_id");
  CREATE INDEX "meetups_rels_tags_id_idx" ON "meetups_rels" USING btree ("tags_id");
  CREATE INDEX "celebrations_details_details_narrative_idx" ON "celebrations" USING btree ("details_narrative_id");
  CREATE INDEX "celebrations_assets_assets_primary_idx" ON "celebrations" USING btree ("assets_primary_id");
  CREATE INDEX "celebrations_assets_assets_gallery_idx" ON "celebrations" USING btree ("assets_gallery_id");
  CREATE INDEX "celebrations_assets_assets_playlist_idx" ON "celebrations" USING btree ("assets_playlist_id");
  CREATE UNIQUE INDEX "celebrations_slug_idx" ON "celebrations" USING btree ("slug");
  CREATE INDEX "celebrations_updated_at_idx" ON "celebrations" USING btree ("updated_at");
  CREATE INDEX "celebrations_created_at_idx" ON "celebrations" USING btree ("created_at");
  CREATE INDEX "celebrations_name_idx" ON "celebrations_locales" USING btree ("name","_locale");
  CREATE INDEX "celebrations_seo_seo_image_idx" ON "celebrations_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "celebrations_locales_locale_parent_id_unique" ON "celebrations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "celebrations_rels_order_idx" ON "celebrations_rels" USING btree ("order");
  CREATE INDEX "celebrations_rels_parent_idx" ON "celebrations_rels" USING btree ("parent_id");
  CREATE INDEX "celebrations_rels_path_idx" ON "celebrations_rels" USING btree ("path");
  CREATE INDEX "celebrations_rels_categories_id_idx" ON "celebrations_rels" USING btree ("categories_id");
  CREATE INDEX "celebrations_rels_expectations_id_idx" ON "celebrations_rels" USING btree ("expectations_id");
  CREATE INDEX "celebrations_rels_stories_id_idx" ON "celebrations_rels" USING btree ("stories_id");
  CREATE INDEX "celebrations_rels_drivers_id_idx" ON "celebrations_rels" USING btree ("drivers_id");
  CREATE INDEX "celebrations_rels_members_id_idx" ON "celebrations_rels" USING btree ("members_id");
  CREATE INDEX "celebrations_rels_leaders_id_idx" ON "celebrations_rels" USING btree ("leaders_id");
  CREATE INDEX "celebrations_rels_organizations_id_idx" ON "celebrations_rels" USING btree ("organizations_id");
  CREATE INDEX "celebrations_rels_individuals_id_idx" ON "celebrations_rels" USING btree ("individuals_id");
  CREATE INDEX "celebrations_rels_notes_id_idx" ON "celebrations_rels" USING btree ("notes_id");
  CREATE INDEX "celebrations_rels_tags_id_idx" ON "celebrations_rels" USING btree ("tags_id");
  CREATE INDEX "protocols_details_steps_list_order_idx" ON "protocols_details_steps_list" USING btree ("_order");
  CREATE INDEX "protocols_details_steps_list_parent_id_idx" ON "protocols_details_steps_list" USING btree ("_parent_id");
  CREATE INDEX "protocols_details_steps_list_step_idx" ON "protocols_details_steps_list" USING btree ("step");
  CREATE INDEX "protocols_details_steps_list_instruction_idx" ON "protocols_details_steps_list" USING btree ("instruction");
  CREATE INDEX "protocols_details_steps_list_requirement_idx" ON "protocols_details_steps_list" USING btree ("requirement");
  CREATE UNIQUE INDEX "protocols_basics_identifier_basics_identifier_code_idx" ON "protocols" USING btree ("basics_identifier_code");
  CREATE UNIQUE INDEX "protocols_slug_idx" ON "protocols" USING btree ("slug");
  CREATE INDEX "protocols_updated_at_idx" ON "protocols" USING btree ("updated_at");
  CREATE INDEX "protocols_created_at_idx" ON "protocols" USING btree ("created_at");
  CREATE INDEX "protocols_name_idx" ON "protocols_locales" USING btree ("name","_locale");
  CREATE INDEX "protocols_basics_basics_objective_idx" ON "protocols_locales" USING btree ("basics_objective","_locale");
  CREATE INDEX "protocols_basics_basics_description_idx" ON "protocols_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "protocols_details_details_procedure_idx" ON "protocols_locales" USING btree ("details_procedure","_locale");
  CREATE INDEX "protocols_seo_seo_image_idx" ON "protocols_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "protocols_locales_locale_parent_id_unique" ON "protocols_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "protocols_rels_order_idx" ON "protocols_rels" USING btree ("order");
  CREATE INDEX "protocols_rels_parent_idx" ON "protocols_rels" USING btree ("parent_id");
  CREATE INDEX "protocols_rels_path_idx" ON "protocols_rels" USING btree ("path");
  CREATE INDEX "protocols_rels_categories_id_idx" ON "protocols_rels" USING btree ("categories_id");
  CREATE INDEX "protocols_rels_archives_id_idx" ON "protocols_rels" USING btree ("archives_id");
  CREATE INDEX "protocols_rels_classifications_id_idx" ON "protocols_rels" USING btree ("classifications_id");
  CREATE INDEX "protocols_rels_tags_id_idx" ON "protocols_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "duties_slug_idx" ON "duties" USING btree ("slug");
  CREATE INDEX "duties_updated_at_idx" ON "duties" USING btree ("updated_at");
  CREATE INDEX "duties_created_at_idx" ON "duties" USING btree ("created_at");
  CREATE INDEX "duties_name_idx" ON "duties_locales" USING btree ("name","_locale");
  CREATE INDEX "duties_basics_basics_description_idx" ON "duties_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "duties_seo_seo_image_idx" ON "duties_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "duties_locales_locale_parent_id_unique" ON "duties_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "duties_rels_order_idx" ON "duties_rels" USING btree ("order");
  CREATE INDEX "duties_rels_parent_idx" ON "duties_rels" USING btree ("parent_id");
  CREATE INDEX "duties_rels_path_idx" ON "duties_rels" USING btree ("path");
  CREATE INDEX "duties_rels_categories_id_idx" ON "duties_rels" USING btree ("categories_id");
  CREATE INDEX "duties_rels_protocols_id_idx" ON "duties_rels" USING btree ("protocols_id");
  CREATE INDEX "duties_rels_expectations_id_idx" ON "duties_rels" USING btree ("expectations_id");
  CREATE INDEX "duties_rels_notes_id_idx" ON "duties_rels" USING btree ("notes_id");
  CREATE INDEX "duties_rels_tags_id_idx" ON "duties_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "expectations_slug_idx" ON "expectations" USING btree ("slug");
  CREATE INDEX "expectations_updated_at_idx" ON "expectations" USING btree ("updated_at");
  CREATE INDEX "expectations_created_at_idx" ON "expectations" USING btree ("created_at");
  CREATE INDEX "expectations_name_idx" ON "expectations_locales" USING btree ("name","_locale");
  CREATE INDEX "expectations_basics_basics_statement_idx" ON "expectations_locales" USING btree ("basics_statement","_locale");
  CREATE INDEX "expectations_details_details_criteria_idx" ON "expectations_locales" USING btree ("details_criteria","_locale");
  CREATE INDEX "expectations_seo_seo_image_idx" ON "expectations_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "expectations_locales_locale_parent_id_unique" ON "expectations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "expectations_rels_order_idx" ON "expectations_rels" USING btree ("order");
  CREATE INDEX "expectations_rels_parent_idx" ON "expectations_rels" USING btree ("parent_id");
  CREATE INDEX "expectations_rels_path_idx" ON "expectations_rels" USING btree ("path");
  CREATE INDEX "expectations_rels_categories_id_idx" ON "expectations_rels" USING btree ("categories_id");
  CREATE INDEX "expectations_rels_specifications_id_idx" ON "expectations_rels" USING btree ("specifications_id");
  CREATE INDEX "expectations_rels_protocols_id_idx" ON "expectations_rels" USING btree ("protocols_id");
  CREATE INDEX "expectations_rels_notes_id_idx" ON "expectations_rels" USING btree ("notes_id");
  CREATE INDEX "expectations_rels_tags_id_idx" ON "expectations_rels" USING btree ("tags_id");
  CREATE INDEX "highlights_details_content_details_content_narrative_idx" ON "highlights" USING btree ("details_content_narrative_id");
  CREATE INDEX "highlights_assets_assets_thumbnail_idx" ON "highlights" USING btree ("assets_thumbnail_id");
  CREATE INDEX "highlights_assets_assets_gallery_idx" ON "highlights" USING btree ("assets_gallery_id");
  CREATE INDEX "highlights_assets_assets_playlist_idx" ON "highlights" USING btree ("assets_playlist_id");
  CREATE UNIQUE INDEX "highlights_slug_idx" ON "highlights" USING btree ("slug");
  CREATE INDEX "highlights_updated_at_idx" ON "highlights" USING btree ("updated_at");
  CREATE INDEX "highlights_created_at_idx" ON "highlights" USING btree ("created_at");
  CREATE INDEX "highlights_name_idx" ON "highlights_locales" USING btree ("name","_locale");
  CREATE INDEX "highlights_basics_basics_description_idx" ON "highlights_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "highlights_seo_seo_image_idx" ON "highlights_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "highlights_locales_locale_parent_id_unique" ON "highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "highlights_rels_order_idx" ON "highlights_rels" USING btree ("order");
  CREATE INDEX "highlights_rels_parent_idx" ON "highlights_rels" USING btree ("parent_id");
  CREATE INDEX "highlights_rels_path_idx" ON "highlights_rels" USING btree ("path");
  CREATE INDEX "highlights_rels_categories_id_idx" ON "highlights_rels" USING btree ("categories_id");
  CREATE INDEX "highlights_rels_stories_id_idx" ON "highlights_rels" USING btree ("stories_id");
  CREATE INDEX "highlights_rels_specifications_id_idx" ON "highlights_rels" USING btree ("specifications_id");
  CREATE INDEX "highlights_rels_drivers_id_idx" ON "highlights_rels" USING btree ("drivers_id");
  CREATE INDEX "highlights_rels_cars_id_idx" ON "highlights_rels" USING btree ("cars_id");
  CREATE INDEX "highlights_rels_tags_id_idx" ON "highlights_rels" USING btree ("tags_id");
  CREATE INDEX "incidents_details_content_details_content_narrative_idx" ON "incidents" USING btree ("details_content_narrative_id");
  CREATE INDEX "incidents_assets_assets_thumbnail_idx" ON "incidents" USING btree ("assets_thumbnail_id");
  CREATE INDEX "incidents_assets_assets_gallery_idx" ON "incidents" USING btree ("assets_gallery_id");
  CREATE INDEX "incidents_assets_assets_archive_idx" ON "incidents" USING btree ("assets_archive_id");
  CREATE UNIQUE INDEX "incidents_slug_idx" ON "incidents" USING btree ("slug");
  CREATE INDEX "incidents_updated_at_idx" ON "incidents" USING btree ("updated_at");
  CREATE INDEX "incidents_created_at_idx" ON "incidents" USING btree ("created_at");
  CREATE INDEX "incidents_name_idx" ON "incidents_locales" USING btree ("name","_locale");
  CREATE INDEX "incidents_basics_basics_description_idx" ON "incidents_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "incidents_seo_seo_image_idx" ON "incidents_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "incidents_locales_locale_parent_id_unique" ON "incidents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "incidents_rels_order_idx" ON "incidents_rels" USING btree ("order");
  CREATE INDEX "incidents_rels_parent_idx" ON "incidents_rels" USING btree ("parent_id");
  CREATE INDEX "incidents_rels_path_idx" ON "incidents_rels" USING btree ("path");
  CREATE INDEX "incidents_rels_categories_id_idx" ON "incidents_rels" USING btree ("categories_id");
  CREATE INDEX "incidents_rels_specifications_id_idx" ON "incidents_rels" USING btree ("specifications_id");
  CREATE INDEX "incidents_rels_decisions_id_idx" ON "incidents_rels" USING btree ("decisions_id");
  CREATE INDEX "incidents_rels_impacts_id_idx" ON "incidents_rels" USING btree ("impacts_id");
  CREATE INDEX "incidents_rels_drivers_id_idx" ON "incidents_rels" USING btree ("drivers_id");
  CREATE INDEX "incidents_rels_members_id_idx" ON "incidents_rels" USING btree ("members_id");
  CREATE INDEX "incidents_rels_leaders_id_idx" ON "incidents_rels" USING btree ("leaders_id");
  CREATE INDEX "incidents_rels_organizations_id_idx" ON "incidents_rels" USING btree ("organizations_id");
  CREATE INDEX "incidents_rels_individuals_id_idx" ON "incidents_rels" USING btree ("individuals_id");
  CREATE INDEX "incidents_rels_cars_id_idx" ON "incidents_rels" USING btree ("cars_id");
  CREATE INDEX "incidents_rels_kits_id_idx" ON "incidents_rels" USING btree ("kits_id");
  CREATE INDEX "incidents_rels_tags_id_idx" ON "incidents_rels" USING btree ("tags_id");
  CREATE INDEX "impacts_traits_traits_tone_idx" ON "impacts" USING btree ("traits_tone_id");
  CREATE UNIQUE INDEX "impacts_slug_idx" ON "impacts" USING btree ("slug");
  CREATE INDEX "impacts_updated_at_idx" ON "impacts" USING btree ("updated_at");
  CREATE INDEX "impacts_created_at_idx" ON "impacts" USING btree ("created_at");
  CREATE INDEX "impacts_name_idx" ON "impacts_locales" USING btree ("name","_locale");
  CREATE INDEX "impacts_basics_basics_description_idx" ON "impacts_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "impacts_seo_seo_image_idx" ON "impacts_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "impacts_locales_locale_parent_id_unique" ON "impacts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "impacts_rels_order_idx" ON "impacts_rels" USING btree ("order");
  CREATE INDEX "impacts_rels_parent_idx" ON "impacts_rels" USING btree ("parent_id");
  CREATE INDEX "impacts_rels_path_idx" ON "impacts_rels" USING btree ("path");
  CREATE INDEX "impacts_rels_categories_id_idx" ON "impacts_rels" USING btree ("categories_id");
  CREATE INDEX "impacts_rels_notes_id_idx" ON "impacts_rels" USING btree ("notes_id");
  CREATE INDEX "impacts_rels_drivers_id_idx" ON "impacts_rels" USING btree ("drivers_id");
  CREATE INDEX "impacts_rels_members_id_idx" ON "impacts_rels" USING btree ("members_id");
  CREATE INDEX "impacts_rels_leaders_id_idx" ON "impacts_rels" USING btree ("leaders_id");
  CREATE INDEX "impacts_rels_organizations_id_idx" ON "impacts_rels" USING btree ("organizations_id");
  CREATE INDEX "impacts_rels_individuals_id_idx" ON "impacts_rels" USING btree ("individuals_id");
  CREATE INDEX "impacts_rels_cars_id_idx" ON "impacts_rels" USING btree ("cars_id");
  CREATE INDEX "impacts_rels_kits_id_idx" ON "impacts_rels" USING btree ("kits_id");
  CREATE INDEX "impacts_rels_tags_id_idx" ON "impacts_rels" USING btree ("tags_id");
  CREATE INDEX "decisions_details_content_details_content_narrative_idx" ON "decisions" USING btree ("details_content_narrative_id");
  CREATE UNIQUE INDEX "decisions_slug_idx" ON "decisions" USING btree ("slug");
  CREATE INDEX "decisions_updated_at_idx" ON "decisions" USING btree ("updated_at");
  CREATE INDEX "decisions_created_at_idx" ON "decisions" USING btree ("created_at");
  CREATE INDEX "decisions_name_idx" ON "decisions_locales" USING btree ("name","_locale");
  CREATE INDEX "decisions_basics_basics_description_idx" ON "decisions_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "decisions_seo_seo_image_idx" ON "decisions_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "decisions_locales_locale_parent_id_unique" ON "decisions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "decisions_rels_order_idx" ON "decisions_rels" USING btree ("order");
  CREATE INDEX "decisions_rels_parent_idx" ON "decisions_rels" USING btree ("parent_id");
  CREATE INDEX "decisions_rels_path_idx" ON "decisions_rels" USING btree ("path");
  CREATE INDEX "decisions_rels_categories_id_idx" ON "decisions_rels" USING btree ("categories_id");
  CREATE INDEX "decisions_rels_notes_id_idx" ON "decisions_rels" USING btree ("notes_id");
  CREATE INDEX "decisions_rels_features_id_idx" ON "decisions_rels" USING btree ("features_id");
  CREATE INDEX "decisions_rels_specifications_id_idx" ON "decisions_rels" USING btree ("specifications_id");
  CREATE INDEX "decisions_rels_drivers_id_idx" ON "decisions_rels" USING btree ("drivers_id");
  CREATE INDEX "decisions_rels_members_id_idx" ON "decisions_rels" USING btree ("members_id");
  CREATE INDEX "decisions_rels_leaders_id_idx" ON "decisions_rels" USING btree ("leaders_id");
  CREATE INDEX "decisions_rels_organizations_id_idx" ON "decisions_rels" USING btree ("organizations_id");
  CREATE INDEX "decisions_rels_individuals_id_idx" ON "decisions_rels" USING btree ("individuals_id");
  CREATE INDEX "decisions_rels_protocols_id_idx" ON "decisions_rels" USING btree ("protocols_id");
  CREATE INDEX "decisions_rels_preferences_id_idx" ON "decisions_rels" USING btree ("preferences_id");
  CREATE INDEX "decisions_rels_tags_id_idx" ON "decisions_rels" USING btree ("tags_id");
  CREATE INDEX "strategies_details_outcomes_list_order_idx" ON "strategies_details_outcomes_list" USING btree ("_order");
  CREATE INDEX "strategies_details_outcomes_list_parent_id_idx" ON "strategies_details_outcomes_list" USING btree ("_parent_id");
  CREATE INDEX "strategies_traits_directives_list_order_idx" ON "strategies_traits_directives_list" USING btree ("_order");
  CREATE INDEX "strategies_traits_directives_list_parent_id_idx" ON "strategies_traits_directives_list" USING btree ("_parent_id");
  CREATE INDEX "strategies_traits_directives_list_phase_idx" ON "strategies_traits_directives_list_locales" USING btree ("phase","_locale");
  CREATE INDEX "strategies_traits_directives_list_action_idx" ON "strategies_traits_directives_list_locales" USING btree ("action","_locale");
  CREATE INDEX "strategies_traits_directives_list_owner_idx" ON "strategies_traits_directives_list_locales" USING btree ("owner","_locale");
  CREATE INDEX "strategies_traits_directives_list_deadline_idx" ON "strategies_traits_directives_list_locales" USING btree ("deadline","_locale");
  CREATE UNIQUE INDEX "strategies_traits_directives_list_locales_locale_parent_id_u" ON "strategies_traits_directives_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "strategies_traits_contingencies_list_order_idx" ON "strategies_traits_contingencies_list" USING btree ("_order");
  CREATE INDEX "strategies_traits_contingencies_list_parent_id_idx" ON "strategies_traits_contingencies_list" USING btree ("_parent_id");
  CREATE INDEX "strategies_traits_contingencies_list_trigger_idx" ON "strategies_traits_contingencies_list_locales" USING btree ("trigger","_locale");
  CREATE INDEX "strategies_traits_contingencies_list_response_idx" ON "strategies_traits_contingencies_list_locales" USING btree ("response","_locale");
  CREATE INDEX "strategies_traits_contingencies_list_probability_idx" ON "strategies_traits_contingencies_list_locales" USING btree ("probability","_locale");
  CREATE INDEX "strategies_traits_contingencies_list_impact_idx" ON "strategies_traits_contingencies_list_locales" USING btree ("impact","_locale");
  CREATE UNIQUE INDEX "strategies_traits_contingencies_list_locales_locale_parent_i" ON "strategies_traits_contingencies_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "strategies_contexts_content_contexts_content_narrative_idx" ON "strategies" USING btree ("contexts_content_narrative_id");
  CREATE UNIQUE INDEX "strategies_slug_idx" ON "strategies" USING btree ("slug");
  CREATE INDEX "strategies_updated_at_idx" ON "strategies" USING btree ("updated_at");
  CREATE INDEX "strategies_created_at_idx" ON "strategies" USING btree ("created_at");
  CREATE INDEX "strategies_name_idx" ON "strategies_locales" USING btree ("name","_locale");
  CREATE INDEX "strategies_basics_basics_description_idx" ON "strategies_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "strategies_details_details_methodology_idx" ON "strategies_locales" USING btree ("details_methodology","_locale");
  CREATE INDEX "strategies_seo_seo_image_idx" ON "strategies_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "strategies_locales_locale_parent_id_unique" ON "strategies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "strategies_rels_order_idx" ON "strategies_rels" USING btree ("order");
  CREATE INDEX "strategies_rels_parent_idx" ON "strategies_rels" USING btree ("parent_id");
  CREATE INDEX "strategies_rels_path_idx" ON "strategies_rels" USING btree ("path");
  CREATE INDEX "strategies_rels_categories_id_idx" ON "strategies_rels" USING btree ("categories_id");
  CREATE INDEX "strategies_rels_decisions_id_idx" ON "strategies_rels" USING btree ("decisions_id");
  CREATE INDEX "strategies_rels_impacts_id_idx" ON "strategies_rels" USING btree ("impacts_id");
  CREATE INDEX "strategies_rels_leaders_id_idx" ON "strategies_rels" USING btree ("leaders_id");
  CREATE INDEX "strategies_rels_organizations_id_idx" ON "strategies_rels" USING btree ("organizations_id");
  CREATE INDEX "strategies_rels_individuals_id_idx" ON "strategies_rels" USING btree ("individuals_id");
  CREATE INDEX "strategies_rels_tags_id_idx" ON "strategies_rels" USING btree ("tags_id");
  CREATE INDEX "awards_details_content_details_content_narrative_idx" ON "awards" USING btree ("details_content_narrative_id");
  CREATE INDEX "awards_assets_assets_thumbnail_idx" ON "awards" USING btree ("assets_thumbnail_id");
  CREATE UNIQUE INDEX "awards_slug_idx" ON "awards" USING btree ("slug");
  CREATE INDEX "awards_updated_at_idx" ON "awards" USING btree ("updated_at");
  CREATE INDEX "awards_created_at_idx" ON "awards" USING btree ("created_at");
  CREATE INDEX "awards_name_idx" ON "awards_locales" USING btree ("name","_locale");
  CREATE INDEX "awards_basics_basics_description_idx" ON "awards_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "awards_seo_seo_image_idx" ON "awards_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "awards_locales_locale_parent_id_unique" ON "awards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "awards_rels_order_idx" ON "awards_rels" USING btree ("order");
  CREATE INDEX "awards_rels_parent_idx" ON "awards_rels" USING btree ("parent_id");
  CREATE INDEX "awards_rels_path_idx" ON "awards_rels" USING btree ("path");
  CREATE INDEX "awards_rels_categories_id_idx" ON "awards_rels" USING btree ("categories_id");
  CREATE INDEX "awards_rels_stories_id_idx" ON "awards_rels" USING btree ("stories_id");
  CREATE INDEX "awards_rels_visualizations_id_idx" ON "awards_rels" USING btree ("visualizations_id");
  CREATE INDEX "awards_rels_leaders_id_idx" ON "awards_rels" USING btree ("leaders_id");
  CREATE INDEX "awards_rels_organizations_id_idx" ON "awards_rels" USING btree ("organizations_id");
  CREATE INDEX "awards_rels_individuals_id_idx" ON "awards_rels" USING btree ("individuals_id");
  CREATE INDEX "awards_rels_tags_id_idx" ON "awards_rels" USING btree ("tags_id");
  CREATE INDEX "experiences_traits_skills_list_order_idx" ON "experiences_traits_skills_list" USING btree ("_order");
  CREATE INDEX "experiences_traits_skills_list_parent_id_idx" ON "experiences_traits_skills_list" USING btree ("_parent_id");
  CREATE INDEX "experiences_traits_skills_list_skill_idx" ON "experiences_traits_skills_list" USING btree ("skill_id");
  CREATE INDEX "experiences_details_content_details_content_narrative_idx" ON "experiences" USING btree ("details_content_narrative_id");
  CREATE INDEX "experiences_details_content_details_content_journey_idx" ON "experiences" USING btree ("details_content_journey_id");
  CREATE INDEX "experiences_assets_assets_gallery_idx" ON "experiences" USING btree ("assets_gallery_id");
  CREATE UNIQUE INDEX "experiences_slug_idx" ON "experiences" USING btree ("slug");
  CREATE INDEX "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE INDEX "experiences_name_idx" ON "experiences_locales" USING btree ("name","_locale");
  CREATE INDEX "experiences_basics_basics_description_idx" ON "experiences_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "experiences_seo_seo_image_idx" ON "experiences_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "experiences_locales_locale_parent_id_unique" ON "experiences_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_rels_order_idx" ON "experiences_rels" USING btree ("order");
  CREATE INDEX "experiences_rels_parent_idx" ON "experiences_rels" USING btree ("parent_id");
  CREATE INDEX "experiences_rels_path_idx" ON "experiences_rels" USING btree ("path");
  CREATE INDEX "experiences_rels_categories_id_idx" ON "experiences_rels" USING btree ("categories_id");
  CREATE INDEX "experiences_rels_highlights_id_idx" ON "experiences_rels" USING btree ("highlights_id");
  CREATE INDEX "experiences_rels_incidents_id_idx" ON "experiences_rels" USING btree ("incidents_id");
  CREATE INDEX "experiences_rels_media_id_idx" ON "experiences_rels" USING btree ("media_id");
  CREATE INDEX "experiences_rels_drivers_id_idx" ON "experiences_rels" USING btree ("drivers_id");
  CREATE INDEX "experiences_rels_members_id_idx" ON "experiences_rels" USING btree ("members_id");
  CREATE INDEX "experiences_rels_leaders_id_idx" ON "experiences_rels" USING btree ("leaders_id");
  CREATE INDEX "experiences_rels_organizations_id_idx" ON "experiences_rels" USING btree ("organizations_id");
  CREATE INDEX "experiences_rels_individuals_id_idx" ON "experiences_rels" USING btree ("individuals_id");
  CREATE INDEX "experiences_rels_tags_id_idx" ON "experiences_rels" USING btree ("tags_id");
  CREATE INDEX "categories_details_type_order_idx" ON "categories_details_type" USING btree ("_order");
  CREATE INDEX "categories_details_type_parent_id_idx" ON "categories_details_type" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "categories_details_type_locales_locale_parent_id_unique" ON "categories_details_type_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "categories_name_idx" ON "categories_locales" USING btree ("name","_locale");
  CREATE INDEX "categories_seo_seo_image_idx" ON "categories_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "categories_locales_locale_parent_id_unique" ON "categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "categories_rels_order_idx" ON "categories_rels" USING btree ("order");
  CREATE INDEX "categories_rels_parent_idx" ON "categories_rels" USING btree ("parent_id");
  CREATE INDEX "categories_rels_path_idx" ON "categories_rels" USING btree ("path");
  CREATE INDEX "categories_rels_categories_id_idx" ON "categories_rels" USING btree ("categories_id");
  CREATE INDEX "categories_rels_tags_id_idx" ON "categories_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE INDEX "tags_name_idx" ON "tags_locales" USING btree ("name","_locale");
  CREATE INDEX "tags_seo_seo_image_idx" ON "tags_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "tags_locales_locale_parent_id_unique" ON "tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tags_rels_order_idx" ON "tags_rels" USING btree ("order");
  CREATE INDEX "tags_rels_parent_idx" ON "tags_rels" USING btree ("parent_id");
  CREATE INDEX "tags_rels_path_idx" ON "tags_rels" USING btree ("path");
  CREATE INDEX "tags_rels_categories_id_idx" ON "tags_rels" USING btree ("categories_id");
  CREATE INDEX "tags_rels_tags_id_idx" ON "tags_rels" USING btree ("tags_id");
  CREATE INDEX "tones_traits_qualities_list_order_idx" ON "tones_traits_qualities_list" USING btree ("_order");
  CREATE INDEX "tones_traits_qualities_list_parent_id_idx" ON "tones_traits_qualities_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tones_slug_idx" ON "tones" USING btree ("slug");
  CREATE INDEX "tones_updated_at_idx" ON "tones" USING btree ("updated_at");
  CREATE INDEX "tones_created_at_idx" ON "tones" USING btree ("created_at");
  CREATE INDEX "tones_name_idx" ON "tones_locales" USING btree ("name","_locale");
  CREATE INDEX "tones_alias_idx" ON "tones_locales" USING btree ("alias","_locale");
  CREATE INDEX "tones_basics_basics_description_idx" ON "tones_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "tones_seo_seo_image_idx" ON "tones_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "tones_locales_locale_parent_id_unique" ON "tones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tones_rels_order_idx" ON "tones_rels" USING btree ("order");
  CREATE INDEX "tones_rels_parent_idx" ON "tones_rels" USING btree ("parent_id");
  CREATE INDEX "tones_rels_path_idx" ON "tones_rels" USING btree ("path");
  CREATE INDEX "tones_rels_categories_id_idx" ON "tones_rels" USING btree ("categories_id");
  CREATE INDEX "tones_rels_tags_id_idx" ON "tones_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "features_slug_idx" ON "features" USING btree ("slug");
  CREATE INDEX "features_updated_at_idx" ON "features" USING btree ("updated_at");
  CREATE INDEX "features_created_at_idx" ON "features" USING btree ("created_at");
  CREATE INDEX "features_name_idx" ON "features_locales" USING btree ("name","_locale");
  CREATE INDEX "features_basics_basics_description_idx" ON "features_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "features_seo_seo_image_idx" ON "features_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "features_locales_locale_parent_id_unique" ON "features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "features_rels_order_idx" ON "features_rels" USING btree ("order");
  CREATE INDEX "features_rels_parent_idx" ON "features_rels" USING btree ("parent_id");
  CREATE INDEX "features_rels_path_idx" ON "features_rels" USING btree ("path");
  CREATE INDEX "features_rels_categories_id_idx" ON "features_rels" USING btree ("categories_id");
  CREATE INDEX "features_rels_notes_id_idx" ON "features_rels" USING btree ("notes_id");
  CREATE INDEX "features_rels_tags_id_idx" ON "features_rels" USING btree ("tags_id");
  CREATE INDEX "specifications_traits_conditions_list_order_idx" ON "specifications_traits_conditions_list" USING btree ("_order");
  CREATE INDEX "specifications_traits_conditions_list_parent_id_idx" ON "specifications_traits_conditions_list" USING btree ("_parent_id");
  CREATE INDEX "specifications_metrics_parameters_list_order_idx" ON "specifications_metrics_parameters_list" USING btree ("_order");
  CREATE INDEX "specifications_metrics_parameters_list_parent_id_idx" ON "specifications_metrics_parameters_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "specifications_basics_identifier_basics_identifier_code_idx" ON "specifications" USING btree ("basics_identifier_code");
  CREATE UNIQUE INDEX "specifications_slug_idx" ON "specifications" USING btree ("slug");
  CREATE INDEX "specifications_updated_at_idx" ON "specifications" USING btree ("updated_at");
  CREATE INDEX "specifications_created_at_idx" ON "specifications" USING btree ("created_at");
  CREATE INDEX "specifications_name_idx" ON "specifications_locales" USING btree ("name","_locale");
  CREATE INDEX "specifications_seo_seo_image_idx" ON "specifications_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "specifications_locales_locale_parent_id_unique" ON "specifications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "specifications_rels_order_idx" ON "specifications_rels" USING btree ("order");
  CREATE INDEX "specifications_rels_parent_idx" ON "specifications_rels" USING btree ("parent_id");
  CREATE INDEX "specifications_rels_path_idx" ON "specifications_rels" USING btree ("path");
  CREATE INDEX "specifications_rels_categories_id_idx" ON "specifications_rels" USING btree ("categories_id");
  CREATE INDEX "specifications_rels_tags_id_idx" ON "specifications_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "classifications_slug_idx" ON "classifications" USING btree ("slug");
  CREATE INDEX "classifications_updated_at_idx" ON "classifications" USING btree ("updated_at");
  CREATE INDEX "classifications_created_at_idx" ON "classifications" USING btree ("created_at");
  CREATE INDEX "classifications_name_idx" ON "classifications_locales" USING btree ("name","_locale");
  CREATE INDEX "classifications_details_details_definition_idx" ON "classifications_locales" USING btree ("details_definition","_locale");
  CREATE INDEX "classifications_details_details_criteria_idx" ON "classifications_locales" USING btree ("details_criteria","_locale");
  CREATE INDEX "classifications_seo_seo_image_idx" ON "classifications_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "classifications_locales_locale_parent_id_unique" ON "classifications_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "classifications_rels_order_idx" ON "classifications_rels" USING btree ("order");
  CREATE INDEX "classifications_rels_parent_idx" ON "classifications_rels" USING btree ("parent_id");
  CREATE INDEX "classifications_rels_path_idx" ON "classifications_rels" USING btree ("path");
  CREATE INDEX "classifications_rels_categories_id_idx" ON "classifications_rels" USING btree ("categories_id");
  CREATE INDEX "classifications_rels_notes_id_idx" ON "classifications_rels" USING btree ("notes_id");
  CREATE INDEX "classifications_rels_tags_id_idx" ON "classifications_rels" USING btree ("tags_id");
  CREATE INDEX "skills_traits_methods_list_order_idx" ON "skills_traits_methods_list" USING btree ("_order");
  CREATE INDEX "skills_traits_methods_list_parent_id_idx" ON "skills_traits_methods_list" USING btree ("_parent_id");
  CREATE INDEX "skills_traits_dependencies_list_order_idx" ON "skills_traits_dependencies_list" USING btree ("_order");
  CREATE INDEX "skills_traits_dependencies_list_parent_id_idx" ON "skills_traits_dependencies_list" USING btree ("_parent_id");
  CREATE INDEX "skills_traits_dependencies_list_skill_idx" ON "skills_traits_dependencies_list" USING btree ("skill_id");
  CREATE INDEX "skills_traits_nature_traits_nature_complexity_idx" ON "skills" USING btree ("traits_nature_complexity");
  CREATE INDEX "skills_traits_nature_traits_nature_visibility_idx" ON "skills" USING btree ("traits_nature_visibility");
  CREATE INDEX "skills_traits_nature_traits_nature_impact_idx" ON "skills" USING btree ("traits_nature_impact");
  CREATE UNIQUE INDEX "skills_slug_idx" ON "skills" USING btree ("slug");
  CREATE INDEX "skills_updated_at_idx" ON "skills" USING btree ("updated_at");
  CREATE INDEX "skills_created_at_idx" ON "skills" USING btree ("created_at");
  CREATE INDEX "skills_name_idx" ON "skills_locales" USING btree ("name","_locale");
  CREATE INDEX "skills_basics_basics_description_idx" ON "skills_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "skills_seo_seo_image_idx" ON "skills_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "skills_locales_locale_parent_id_unique" ON "skills_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "skills_rels_order_idx" ON "skills_rels" USING btree ("order");
  CREATE INDEX "skills_rels_parent_idx" ON "skills_rels" USING btree ("parent_id");
  CREATE INDEX "skills_rels_path_idx" ON "skills_rels" USING btree ("path");
  CREATE INDEX "skills_rels_categories_id_idx" ON "skills_rels" USING btree ("categories_id");
  CREATE INDEX "skills_rels_classifications_id_idx" ON "skills_rels" USING btree ("classifications_id");
  CREATE INDEX "skills_rels_features_id_idx" ON "skills_rels" USING btree ("features_id");
  CREATE INDEX "skills_rels_specifications_id_idx" ON "skills_rels" USING btree ("specifications_id");
  CREATE INDEX "skills_rels_trainings_id_idx" ON "skills_rels" USING btree ("trainings_id");
  CREATE INDEX "skills_rels_notes_id_idx" ON "skills_rels" USING btree ("notes_id");
  CREATE INDEX "skills_rels_tags_id_idx" ON "skills_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "principles_slug_idx" ON "principles" USING btree ("slug");
  CREATE INDEX "principles_updated_at_idx" ON "principles" USING btree ("updated_at");
  CREATE INDEX "principles_created_at_idx" ON "principles" USING btree ("created_at");
  CREATE INDEX "principles_name_idx" ON "principles_locales" USING btree ("name","_locale");
  CREATE INDEX "principles_seo_seo_image_idx" ON "principles_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "principles_locales_locale_parent_id_unique" ON "principles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "principles_rels_order_idx" ON "principles_rels" USING btree ("order");
  CREATE INDEX "principles_rels_parent_idx" ON "principles_rels" USING btree ("parent_id");
  CREATE INDEX "principles_rels_path_idx" ON "principles_rels" USING btree ("path");
  CREATE INDEX "principles_rels_categories_id_idx" ON "principles_rels" USING btree ("categories_id");
  CREATE INDEX "principles_rels_notes_id_idx" ON "principles_rels" USING btree ("notes_id");
  CREATE INDEX "principles_rels_tags_id_idx" ON "principles_rels" USING btree ("tags_id");
  CREATE INDEX "preferences_traits_conditions_list_order_idx" ON "preferences_traits_conditions_list" USING btree ("_order");
  CREATE INDEX "preferences_traits_conditions_list_parent_id_idx" ON "preferences_traits_conditions_list" USING btree ("_parent_id");
  CREATE INDEX "preferences_traits_reasons_list_order_idx" ON "preferences_traits_reasons_list" USING btree ("_order");
  CREATE INDEX "preferences_traits_reasons_list_parent_id_idx" ON "preferences_traits_reasons_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "preferences_slug_idx" ON "preferences" USING btree ("slug");
  CREATE INDEX "preferences_updated_at_idx" ON "preferences" USING btree ("updated_at");
  CREATE INDEX "preferences_created_at_idx" ON "preferences" USING btree ("created_at");
  CREATE INDEX "preferences_name_idx" ON "preferences_locales" USING btree ("name","_locale");
  CREATE INDEX "preferences_basics_basics_description_idx" ON "preferences_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "preferences_seo_seo_image_idx" ON "preferences_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "preferences_locales_locale_parent_id_unique" ON "preferences_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "preferences_rels_order_idx" ON "preferences_rels" USING btree ("order");
  CREATE INDEX "preferences_rels_parent_idx" ON "preferences_rels" USING btree ("parent_id");
  CREATE INDEX "preferences_rels_path_idx" ON "preferences_rels" USING btree ("path");
  CREATE INDEX "preferences_rels_categories_id_idx" ON "preferences_rels" USING btree ("categories_id");
  CREATE INDEX "preferences_rels_principles_id_idx" ON "preferences_rels" USING btree ("principles_id");
  CREATE INDEX "preferences_rels_notes_id_idx" ON "preferences_rels" USING btree ("notes_id");
  CREATE INDEX "preferences_rels_tags_id_idx" ON "preferences_rels" USING btree ("tags_id");
  CREATE INDEX "channels_traits_usage_list_order_idx" ON "channels_traits_usage_list" USING btree ("_order");
  CREATE INDEX "channels_traits_usage_list_parent_id_idx" ON "channels_traits_usage_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "channels_traits_usage_list_locales_locale_parent_id_unique" ON "channels_traits_usage_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "channels_traits_validity_list_order_idx" ON "channels_traits_validity_list" USING btree ("_order");
  CREATE INDEX "channels_traits_validity_list_parent_id_idx" ON "channels_traits_validity_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "channels_slug_idx" ON "channels" USING btree ("slug");
  CREATE INDEX "channels_updated_at_idx" ON "channels" USING btree ("updated_at");
  CREATE INDEX "channels_created_at_idx" ON "channels" USING btree ("created_at");
  CREATE INDEX "channels_name_idx" ON "channels_locales" USING btree ("name","_locale");
  CREATE INDEX "channels_details_identifier_details_identifier_label_idx" ON "channels_locales" USING btree ("details_identifier_label","_locale");
  CREATE INDEX "channels_details_identifier_details_identifier_title_idx" ON "channels_locales" USING btree ("details_identifier_title","_locale");
  CREATE INDEX "channels_seo_seo_image_idx" ON "channels_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "channels_locales_locale_parent_id_unique" ON "channels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "channels_rels_order_idx" ON "channels_rels" USING btree ("order");
  CREATE INDEX "channels_rels_parent_idx" ON "channels_rels" USING btree ("parent_id");
  CREATE INDEX "channels_rels_path_idx" ON "channels_rels" USING btree ("path");
  CREATE INDEX "channels_rels_categories_id_idx" ON "channels_rels" USING btree ("categories_id");
  CREATE INDEX "channels_rels_tags_id_idx" ON "channels_rels" USING btree ("tags_id");
  CREATE INDEX "locations_details_geometry_details_geometry_coordinates_idx" ON "locations" USING btree ("details_geometry_coordinates");
  CREATE UNIQUE INDEX "locations_slug_idx" ON "locations" USING btree ("slug");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE INDEX "locations_name_idx" ON "locations_locales" USING btree ("name","_locale");
  CREATE INDEX "locations_basics_basics_label_idx" ON "locations_locales" USING btree ("basics_label","_locale");
  CREATE INDEX "locations_basics_basics_title_idx" ON "locations_locales" USING btree ("basics_title","_locale");
  CREATE INDEX "locations_basics_basics_description_idx" ON "locations_locales" USING btree ("basics_description","_locale");
  CREATE INDEX "locations_details_details_address_idx" ON "locations_locales" USING btree ("details_address","_locale");
  CREATE INDEX "locations_seo_seo_image_idx" ON "locations_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "locations_locales_locale_parent_id_unique" ON "locations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "locations_rels_order_idx" ON "locations_rels" USING btree ("order");
  CREATE INDEX "locations_rels_parent_idx" ON "locations_rels" USING btree ("parent_id");
  CREATE INDEX "locations_rels_path_idx" ON "locations_rels" USING btree ("path");
  CREATE INDEX "locations_rels_categories_id_idx" ON "locations_rels" USING btree ("categories_id");
  CREATE INDEX "locations_rels_drivers_id_idx" ON "locations_rels" USING btree ("drivers_id");
  CREATE INDEX "locations_rels_members_id_idx" ON "locations_rels" USING btree ("members_id");
  CREATE INDEX "locations_rels_leaders_id_idx" ON "locations_rels" USING btree ("leaders_id");
  CREATE INDEX "locations_rels_organizations_id_idx" ON "locations_rels" USING btree ("organizations_id");
  CREATE INDEX "locations_rels_individuals_id_idx" ON "locations_rels" USING btree ("individuals_id");
  CREATE INDEX "locations_rels_tags_id_idx" ON "locations_rels" USING btree ("tags_id");
  CREATE INDEX "forms_blocks_checkbox_order_idx" ON "forms_blocks_checkbox" USING btree ("_order");
  CREATE INDEX "forms_blocks_checkbox_parent_id_idx" ON "forms_blocks_checkbox" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_checkbox_path_idx" ON "forms_blocks_checkbox" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_country_order_idx" ON "forms_blocks_country" USING btree ("_order");
  CREATE INDEX "forms_blocks_country_parent_id_idx" ON "forms_blocks_country" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_country_path_idx" ON "forms_blocks_country" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_country_locales_locale_parent_id_unique" ON "forms_blocks_country_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_email_order_idx" ON "forms_blocks_email" USING btree ("_order");
  CREATE INDEX "forms_blocks_email_parent_id_idx" ON "forms_blocks_email" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_email_path_idx" ON "forms_blocks_email" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_message_order_idx" ON "forms_blocks_message" USING btree ("_order");
  CREATE INDEX "forms_blocks_message_parent_id_idx" ON "forms_blocks_message" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_message_path_idx" ON "forms_blocks_message" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_number_order_idx" ON "forms_blocks_number" USING btree ("_order");
  CREATE INDEX "forms_blocks_number_parent_id_idx" ON "forms_blocks_number" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_number_path_idx" ON "forms_blocks_number" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_options_order_idx" ON "forms_blocks_select_options" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_options_parent_id_idx" ON "forms_blocks_select_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_order_idx" ON "forms_blocks_select" USING btree ("_order");
  CREATE INDEX "forms_blocks_select_parent_id_idx" ON "forms_blocks_select" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_select_path_idx" ON "forms_blocks_select" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_state_order_idx" ON "forms_blocks_state" USING btree ("_order");
  CREATE INDEX "forms_blocks_state_parent_id_idx" ON "forms_blocks_state" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_state_path_idx" ON "forms_blocks_state" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_state_locales_locale_parent_id_unique" ON "forms_blocks_state_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_text_order_idx" ON "forms_blocks_text" USING btree ("_order");
  CREATE INDEX "forms_blocks_text_parent_id_idx" ON "forms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_text_path_idx" ON "forms_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_textarea_order_idx" ON "forms_blocks_textarea" USING btree ("_order");
  CREATE INDEX "forms_blocks_textarea_parent_id_idx" ON "forms_blocks_textarea" USING btree ("_parent_id");
  CREATE INDEX "forms_blocks_textarea_path_idx" ON "forms_blocks_textarea" USING btree ("_path");
  CREATE UNIQUE INDEX "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_emails_order_idx" ON "forms_emails" USING btree ("_order");
  CREATE INDEX "forms_emails_parent_id_idx" ON "forms_emails" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_updated_at_idx" ON "forms" USING btree ("updated_at");
  CREATE INDEX "forms_created_at_idx" ON "forms" USING btree ("created_at");
  CREATE UNIQUE INDEX "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "form_submissions_submission_data_order_idx" ON "form_submissions_submission_data" USING btree ("_order");
  CREATE INDEX "form_submissions_submission_data_parent_id_idx" ON "form_submissions_submission_data" USING btree ("_parent_id");
  CREATE INDEX "form_submissions_form_idx" ON "form_submissions" USING btree ("form_id");
  CREATE INDEX "form_submissions_updated_at_idx" ON "form_submissions" USING btree ("updated_at");
  CREATE INDEX "form_submissions_created_at_idx" ON "form_submissions" USING btree ("created_at");
  CREATE INDEX "addresses_customer_idx" ON "addresses" USING btree ("customer_id");
  CREATE INDEX "addresses_updated_at_idx" ON "addresses" USING btree ("updated_at");
  CREATE INDEX "addresses_created_at_idx" ON "addresses" USING btree ("created_at");
  CREATE INDEX "variants_product_idx" ON "variants" USING btree ("product_id");
  CREATE INDEX "variants_updated_at_idx" ON "variants" USING btree ("updated_at");
  CREATE INDEX "variants_created_at_idx" ON "variants" USING btree ("created_at");
  CREATE INDEX "variants_deleted_at_idx" ON "variants" USING btree ("deleted_at");
  CREATE INDEX "variants__status_idx" ON "variants" USING btree ("_status");
  CREATE INDEX "variants_rels_order_idx" ON "variants_rels" USING btree ("order");
  CREATE INDEX "variants_rels_parent_idx" ON "variants_rels" USING btree ("parent_id");
  CREATE INDEX "variants_rels_path_idx" ON "variants_rels" USING btree ("path");
  CREATE INDEX "variants_rels_variant_options_id_idx" ON "variants_rels" USING btree ("variant_options_id");
  CREATE INDEX "_variants_v_parent_idx" ON "_variants_v" USING btree ("parent_id");
  CREATE INDEX "_variants_v_version_version_product_idx" ON "_variants_v" USING btree ("version_product_id");
  CREATE INDEX "_variants_v_version_version_updated_at_idx" ON "_variants_v" USING btree ("version_updated_at");
  CREATE INDEX "_variants_v_version_version_created_at_idx" ON "_variants_v" USING btree ("version_created_at");
  CREATE INDEX "_variants_v_version_version_deleted_at_idx" ON "_variants_v" USING btree ("version_deleted_at");
  CREATE INDEX "_variants_v_version_version__status_idx" ON "_variants_v" USING btree ("version__status");
  CREATE INDEX "_variants_v_created_at_idx" ON "_variants_v" USING btree ("created_at");
  CREATE INDEX "_variants_v_updated_at_idx" ON "_variants_v" USING btree ("updated_at");
  CREATE INDEX "_variants_v_snapshot_idx" ON "_variants_v" USING btree ("snapshot");
  CREATE INDEX "_variants_v_published_locale_idx" ON "_variants_v" USING btree ("published_locale");
  CREATE INDEX "_variants_v_latest_idx" ON "_variants_v" USING btree ("latest");
  CREATE INDEX "_variants_v_autosave_idx" ON "_variants_v" USING btree ("autosave");
  CREATE INDEX "_variants_v_rels_order_idx" ON "_variants_v_rels" USING btree ("order");
  CREATE INDEX "_variants_v_rels_parent_idx" ON "_variants_v_rels" USING btree ("parent_id");
  CREATE INDEX "_variants_v_rels_path_idx" ON "_variants_v_rels" USING btree ("path");
  CREATE INDEX "_variants_v_rels_variant_options_id_idx" ON "_variants_v_rels" USING btree ("variant_options_id");
  CREATE INDEX "variant_types_updated_at_idx" ON "variant_types" USING btree ("updated_at");
  CREATE INDEX "variant_types_created_at_idx" ON "variant_types" USING btree ("created_at");
  CREATE INDEX "variant_types_deleted_at_idx" ON "variant_types" USING btree ("deleted_at");
  CREATE INDEX "variant_options__variantoptions_options_order_idx" ON "variant_options" USING btree ("_variantoptions_options_order");
  CREATE INDEX "variant_options_variant_type_idx" ON "variant_options" USING btree ("variant_type_id");
  CREATE INDEX "variant_options_updated_at_idx" ON "variant_options" USING btree ("updated_at");
  CREATE INDEX "variant_options_created_at_idx" ON "variant_options" USING btree ("created_at");
  CREATE INDEX "variant_options_deleted_at_idx" ON "variant_options" USING btree ("deleted_at");
  CREATE INDEX "products_gallery_order_idx" ON "products_gallery" USING btree ("_order");
  CREATE INDEX "products_gallery_parent_id_idx" ON "products_gallery" USING btree ("_parent_id");
  CREATE INDEX "products_gallery_image_idx" ON "products_gallery" USING btree ("image_id");
  CREATE INDEX "products_gallery_variant_option_idx" ON "products_gallery" USING btree ("variant_option_id");
  CREATE INDEX "products_blocks_cta_links_order_idx" ON "products_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "products_blocks_cta_links_parent_id_idx" ON "products_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_cta_order_idx" ON "products_blocks_cta" USING btree ("_order");
  CREATE INDEX "products_blocks_cta_parent_id_idx" ON "products_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_cta_path_idx" ON "products_blocks_cta" USING btree ("_path");
  CREATE INDEX "products_blocks_content_columns_order_idx" ON "products_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "products_blocks_content_columns_parent_id_idx" ON "products_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_content_order_idx" ON "products_blocks_content" USING btree ("_order");
  CREATE INDEX "products_blocks_content_parent_id_idx" ON "products_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_content_path_idx" ON "products_blocks_content" USING btree ("_path");
  CREATE INDEX "products_blocks_media_block_order_idx" ON "products_blocks_media_block" USING btree ("_order");
  CREATE INDEX "products_blocks_media_block_parent_id_idx" ON "products_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "products_blocks_media_block_path_idx" ON "products_blocks_media_block" USING btree ("_path");
  CREATE INDEX "products_blocks_media_block_media_idx" ON "products_blocks_media_block" USING btree ("media_id");
  CREATE UNIQUE INDEX "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX "products_deleted_at_idx" ON "products" USING btree ("deleted_at");
  CREATE INDEX "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX "products_meta_meta_image_idx" ON "products_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "products_locales_locale_parent_id_unique" ON "products_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "products_rels_order_idx" ON "products_rels" USING btree ("order");
  CREATE INDEX "products_rels_parent_idx" ON "products_rels" USING btree ("parent_id");
  CREATE INDEX "products_rels_path_idx" ON "products_rels" USING btree ("path");
  CREATE INDEX "products_rels_pages_id_idx" ON "products_rels" USING btree ("pages_id");
  CREATE INDEX "products_rels_variant_types_id_idx" ON "products_rels" USING btree ("variant_types_id");
  CREATE INDEX "products_rels_products_id_idx" ON "products_rels" USING btree ("products_id");
  CREATE INDEX "products_rels_categories_id_idx" ON "products_rels" USING btree ("categories_id");
  CREATE INDEX "_products_v_version_gallery_order_idx" ON "_products_v_version_gallery" USING btree ("_order");
  CREATE INDEX "_products_v_version_gallery_parent_id_idx" ON "_products_v_version_gallery" USING btree ("_parent_id");
  CREATE INDEX "_products_v_version_gallery_image_idx" ON "_products_v_version_gallery" USING btree ("image_id");
  CREATE INDEX "_products_v_version_gallery_variant_option_idx" ON "_products_v_version_gallery" USING btree ("variant_option_id");
  CREATE INDEX "_products_v_blocks_cta_links_order_idx" ON "_products_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_cta_links_parent_id_idx" ON "_products_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_cta_order_idx" ON "_products_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_cta_parent_id_idx" ON "_products_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_cta_path_idx" ON "_products_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_content_columns_order_idx" ON "_products_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_content_columns_parent_id_idx" ON "_products_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_content_order_idx" ON "_products_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_content_parent_id_idx" ON "_products_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_content_path_idx" ON "_products_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_media_block_order_idx" ON "_products_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_products_v_blocks_media_block_parent_id_idx" ON "_products_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_products_v_blocks_media_block_path_idx" ON "_products_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_products_v_blocks_media_block_media_idx" ON "_products_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX "_products_v_version_version_deleted_at_idx" ON "_products_v" USING btree ("version_deleted_at");
  CREATE INDEX "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX "_products_v_snapshot_idx" ON "_products_v" USING btree ("snapshot");
  CREATE INDEX "_products_v_published_locale_idx" ON "_products_v" USING btree ("published_locale");
  CREATE INDEX "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  CREATE INDEX "_products_v_autosave_idx" ON "_products_v" USING btree ("autosave");
  CREATE INDEX "_products_v_version_meta_version_meta_image_idx" ON "_products_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_products_v_locales_locale_parent_id_unique" ON "_products_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_products_v_rels_order_idx" ON "_products_v_rels" USING btree ("order");
  CREATE INDEX "_products_v_rels_parent_idx" ON "_products_v_rels" USING btree ("parent_id");
  CREATE INDEX "_products_v_rels_path_idx" ON "_products_v_rels" USING btree ("path");
  CREATE INDEX "_products_v_rels_pages_id_idx" ON "_products_v_rels" USING btree ("pages_id");
  CREATE INDEX "_products_v_rels_variant_types_id_idx" ON "_products_v_rels" USING btree ("variant_types_id");
  CREATE INDEX "_products_v_rels_products_id_idx" ON "_products_v_rels" USING btree ("products_id");
  CREATE INDEX "_products_v_rels_categories_id_idx" ON "_products_v_rels" USING btree ("categories_id");
  CREATE INDEX "carts_items_order_idx" ON "carts_items" USING btree ("_order");
  CREATE INDEX "carts_items_parent_id_idx" ON "carts_items" USING btree ("_parent_id");
  CREATE INDEX "carts_items_product_idx" ON "carts_items" USING btree ("product_id");
  CREATE INDEX "carts_items_variant_idx" ON "carts_items" USING btree ("variant_id");
  CREATE INDEX "carts_secret_idx" ON "carts" USING btree ("secret");
  CREATE INDEX "carts_customer_idx" ON "carts" USING btree ("customer_id");
  CREATE INDEX "carts_updated_at_idx" ON "carts" USING btree ("updated_at");
  CREATE INDEX "carts_created_at_idx" ON "carts" USING btree ("created_at");
  CREATE INDEX "orders_items_order_idx" ON "orders_items" USING btree ("_order");
  CREATE INDEX "orders_items_parent_id_idx" ON "orders_items" USING btree ("_parent_id");
  CREATE INDEX "orders_items_product_idx" ON "orders_items" USING btree ("product_id");
  CREATE INDEX "orders_items_variant_idx" ON "orders_items" USING btree ("variant_id");
  CREATE INDEX "orders_customer_idx" ON "orders" USING btree ("customer_id");
  CREATE INDEX "orders_updated_at_idx" ON "orders" USING btree ("updated_at");
  CREATE INDEX "orders_created_at_idx" ON "orders" USING btree ("created_at");
  CREATE INDEX "orders_rels_order_idx" ON "orders_rels" USING btree ("order");
  CREATE INDEX "orders_rels_parent_idx" ON "orders_rels" USING btree ("parent_id");
  CREATE INDEX "orders_rels_path_idx" ON "orders_rels" USING btree ("path");
  CREATE INDEX "orders_rels_transactions_id_idx" ON "orders_rels" USING btree ("transactions_id");
  CREATE INDEX "transactions_items_order_idx" ON "transactions_items" USING btree ("_order");
  CREATE INDEX "transactions_items_parent_id_idx" ON "transactions_items" USING btree ("_parent_id");
  CREATE INDEX "transactions_items_product_idx" ON "transactions_items" USING btree ("product_id");
  CREATE INDEX "transactions_items_variant_idx" ON "transactions_items" USING btree ("variant_id");
  CREATE INDEX "transactions_customer_idx" ON "transactions" USING btree ("customer_id");
  CREATE INDEX "transactions_order_idx" ON "transactions" USING btree ("order_id");
  CREATE INDEX "transactions_cart_idx" ON "transactions" USING btree ("cart_id");
  CREATE INDEX "transactions_updated_at_idx" ON "transactions" USING btree ("updated_at");
  CREATE INDEX "transactions_created_at_idx" ON "transactions" USING btree ("created_at");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE UNIQUE INDEX "search_locales_locale_parent_id_unique" ON "search_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_series_id_idx" ON "search_rels" USING btree ("series_id");
  CREATE INDEX "search_rels_seasons_id_idx" ON "search_rels" USING btree ("seasons_id");
  CREATE INDEX "search_rels_events_id_idx" ON "search_rels" USING btree ("events_id");
  CREATE INDEX "search_rels_sessions_id_idx" ON "search_rels" USING btree ("sessions_id");
  CREATE INDEX "search_rels_entries_id_idx" ON "search_rels" USING btree ("entries_id");
  CREATE INDEX "search_rels_results_id_idx" ON "search_rels" USING btree ("results_id");
  CREATE INDEX "search_rels_points_id_idx" ON "search_rels" USING btree ("points_id");
  CREATE INDEX "search_rels_drivers_id_idx" ON "search_rels" USING btree ("drivers_id");
  CREATE INDEX "search_rels_leaders_id_idx" ON "search_rels" USING btree ("leaders_id");
  CREATE INDEX "search_rels_members_id_idx" ON "search_rels" USING btree ("members_id");
  CREATE INDEX "search_rels_individuals_id_idx" ON "search_rels" USING btree ("individuals_id");
  CREATE INDEX "search_rels_organizations_id_idx" ON "search_rels" USING btree ("organizations_id");
  CREATE INDEX "search_rels_users_id_idx" ON "search_rels" USING btree ("users_id");
  CREATE INDEX "search_rels_narratives_id_idx" ON "search_rels" USING btree ("narratives_id");
  CREATE INDEX "search_rels_stories_id_idx" ON "search_rels" USING btree ("stories_id");
  CREATE INDEX "search_rels_histories_id_idx" ON "search_rels" USING btree ("histories_id");
  CREATE INDEX "search_rels_journeys_id_idx" ON "search_rels" USING btree ("journeys_id");
  CREATE INDEX "search_rels_notes_id_idx" ON "search_rels" USING btree ("notes_id");
  CREATE INDEX "search_rels_pages_id_idx" ON "search_rels" USING btree ("pages_id");
  CREATE INDEX "search_rels_cars_id_idx" ON "search_rels" USING btree ("cars_id");
  CREATE INDEX "search_rels_kits_id_idx" ON "search_rels" USING btree ("kits_id");
  CREATE INDEX "search_rels_media_id_idx" ON "search_rels" USING btree ("media_id");
  CREATE INDEX "search_rels_galleries_id_idx" ON "search_rels" USING btree ("galleries_id");
  CREATE INDEX "search_rels_playlists_id_idx" ON "search_rels" USING btree ("playlists_id");
  CREATE INDEX "search_rels_archives_id_idx" ON "search_rels" USING btree ("archives_id");
  CREATE INDEX "search_rels_visualizations_id_idx" ON "search_rels" USING btree ("visualizations_id");
  CREATE INDEX "search_rels_schedules_id_idx" ON "search_rels" USING btree ("schedules_id");
  CREATE INDEX "search_rels_trainings_id_idx" ON "search_rels" USING btree ("trainings_id");
  CREATE INDEX "search_rels_careers_id_idx" ON "search_rels" USING btree ("careers_id");
  CREATE INDEX "search_rels_initiatives_id_idx" ON "search_rels" USING btree ("initiatives_id");
  CREATE INDEX "search_rels_meetups_id_idx" ON "search_rels" USING btree ("meetups_id");
  CREATE INDEX "search_rels_celebrations_id_idx" ON "search_rels" USING btree ("celebrations_id");
  CREATE INDEX "search_rels_protocols_id_idx" ON "search_rels" USING btree ("protocols_id");
  CREATE INDEX "search_rels_duties_id_idx" ON "search_rels" USING btree ("duties_id");
  CREATE INDEX "search_rels_expectations_id_idx" ON "search_rels" USING btree ("expectations_id");
  CREATE INDEX "search_rels_highlights_id_idx" ON "search_rels" USING btree ("highlights_id");
  CREATE INDEX "search_rels_incidents_id_idx" ON "search_rels" USING btree ("incidents_id");
  CREATE INDEX "search_rels_impacts_id_idx" ON "search_rels" USING btree ("impacts_id");
  CREATE INDEX "search_rels_decisions_id_idx" ON "search_rels" USING btree ("decisions_id");
  CREATE INDEX "search_rels_strategies_id_idx" ON "search_rels" USING btree ("strategies_id");
  CREATE INDEX "search_rels_awards_id_idx" ON "search_rels" USING btree ("awards_id");
  CREATE INDEX "search_rels_experiences_id_idx" ON "search_rels" USING btree ("experiences_id");
  CREATE INDEX "search_rels_categories_id_idx" ON "search_rels" USING btree ("categories_id");
  CREATE INDEX "search_rels_tags_id_idx" ON "search_rels" USING btree ("tags_id");
  CREATE INDEX "search_rels_tones_id_idx" ON "search_rels" USING btree ("tones_id");
  CREATE INDEX "search_rels_features_id_idx" ON "search_rels" USING btree ("features_id");
  CREATE INDEX "search_rels_specifications_id_idx" ON "search_rels" USING btree ("specifications_id");
  CREATE INDEX "search_rels_classifications_id_idx" ON "search_rels" USING btree ("classifications_id");
  CREATE INDEX "search_rels_skills_id_idx" ON "search_rels" USING btree ("skills_id");
  CREATE INDEX "search_rels_principles_id_idx" ON "search_rels" USING btree ("principles_id");
  CREATE INDEX "search_rels_preferences_id_idx" ON "search_rels" USING btree ("preferences_id");
  CREATE INDEX "search_rels_channels_id_idx" ON "search_rels" USING btree ("channels_id");
  CREATE INDEX "search_rels_locations_id_idx" ON "search_rels" USING btree ("locations_id");
  CREATE INDEX "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  CREATE INDEX "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  CREATE INDEX "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_series_id_idx" ON "payload_locked_documents_rels" USING btree ("series_id");
  CREATE INDEX "payload_locked_documents_rels_seasons_id_idx" ON "payload_locked_documents_rels" USING btree ("seasons_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_sessions_id_idx" ON "payload_locked_documents_rels" USING btree ("sessions_id");
  CREATE INDEX "payload_locked_documents_rels_entries_id_idx" ON "payload_locked_documents_rels" USING btree ("entries_id");
  CREATE INDEX "payload_locked_documents_rels_results_id_idx" ON "payload_locked_documents_rels" USING btree ("results_id");
  CREATE INDEX "payload_locked_documents_rels_points_id_idx" ON "payload_locked_documents_rels" USING btree ("points_id");
  CREATE INDEX "payload_locked_documents_rels_drivers_id_idx" ON "payload_locked_documents_rels" USING btree ("drivers_id");
  CREATE INDEX "payload_locked_documents_rels_leaders_id_idx" ON "payload_locked_documents_rels" USING btree ("leaders_id");
  CREATE INDEX "payload_locked_documents_rels_members_id_idx" ON "payload_locked_documents_rels" USING btree ("members_id");
  CREATE INDEX "payload_locked_documents_rels_individuals_id_idx" ON "payload_locked_documents_rels" USING btree ("individuals_id");
  CREATE INDEX "payload_locked_documents_rels_organizations_id_idx" ON "payload_locked_documents_rels" USING btree ("organizations_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_narratives_id_idx" ON "payload_locked_documents_rels" USING btree ("narratives_id");
  CREATE INDEX "payload_locked_documents_rels_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("stories_id");
  CREATE INDEX "payload_locked_documents_rels_histories_id_idx" ON "payload_locked_documents_rels" USING btree ("histories_id");
  CREATE INDEX "payload_locked_documents_rels_journeys_id_idx" ON "payload_locked_documents_rels" USING btree ("journeys_id");
  CREATE INDEX "payload_locked_documents_rels_notes_id_idx" ON "payload_locked_documents_rels" USING btree ("notes_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_cars_id_idx" ON "payload_locked_documents_rels" USING btree ("cars_id");
  CREATE INDEX "payload_locked_documents_rels_kits_id_idx" ON "payload_locked_documents_rels" USING btree ("kits_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_galleries_id_idx" ON "payload_locked_documents_rels" USING btree ("galleries_id");
  CREATE INDEX "payload_locked_documents_rels_playlists_id_idx" ON "payload_locked_documents_rels" USING btree ("playlists_id");
  CREATE INDEX "payload_locked_documents_rels_archives_id_idx" ON "payload_locked_documents_rels" USING btree ("archives_id");
  CREATE INDEX "payload_locked_documents_rels_visualizations_id_idx" ON "payload_locked_documents_rels" USING btree ("visualizations_id");
  CREATE INDEX "payload_locked_documents_rels_schedules_id_idx" ON "payload_locked_documents_rels" USING btree ("schedules_id");
  CREATE INDEX "payload_locked_documents_rels_trainings_id_idx" ON "payload_locked_documents_rels" USING btree ("trainings_id");
  CREATE INDEX "payload_locked_documents_rels_careers_id_idx" ON "payload_locked_documents_rels" USING btree ("careers_id");
  CREATE INDEX "payload_locked_documents_rels_initiatives_id_idx" ON "payload_locked_documents_rels" USING btree ("initiatives_id");
  CREATE INDEX "payload_locked_documents_rels_meetups_id_idx" ON "payload_locked_documents_rels" USING btree ("meetups_id");
  CREATE INDEX "payload_locked_documents_rels_celebrations_id_idx" ON "payload_locked_documents_rels" USING btree ("celebrations_id");
  CREATE INDEX "payload_locked_documents_rels_protocols_id_idx" ON "payload_locked_documents_rels" USING btree ("protocols_id");
  CREATE INDEX "payload_locked_documents_rels_duties_id_idx" ON "payload_locked_documents_rels" USING btree ("duties_id");
  CREATE INDEX "payload_locked_documents_rels_expectations_id_idx" ON "payload_locked_documents_rels" USING btree ("expectations_id");
  CREATE INDEX "payload_locked_documents_rels_highlights_id_idx" ON "payload_locked_documents_rels" USING btree ("highlights_id");
  CREATE INDEX "payload_locked_documents_rels_incidents_id_idx" ON "payload_locked_documents_rels" USING btree ("incidents_id");
  CREATE INDEX "payload_locked_documents_rels_impacts_id_idx" ON "payload_locked_documents_rels" USING btree ("impacts_id");
  CREATE INDEX "payload_locked_documents_rels_decisions_id_idx" ON "payload_locked_documents_rels" USING btree ("decisions_id");
  CREATE INDEX "payload_locked_documents_rels_strategies_id_idx" ON "payload_locked_documents_rels" USING btree ("strategies_id");
  CREATE INDEX "payload_locked_documents_rels_awards_id_idx" ON "payload_locked_documents_rels" USING btree ("awards_id");
  CREATE INDEX "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_tones_id_idx" ON "payload_locked_documents_rels" USING btree ("tones_id");
  CREATE INDEX "payload_locked_documents_rels_features_id_idx" ON "payload_locked_documents_rels" USING btree ("features_id");
  CREATE INDEX "payload_locked_documents_rels_specifications_id_idx" ON "payload_locked_documents_rels" USING btree ("specifications_id");
  CREATE INDEX "payload_locked_documents_rels_classifications_id_idx" ON "payload_locked_documents_rels" USING btree ("classifications_id");
  CREATE INDEX "payload_locked_documents_rels_skills_id_idx" ON "payload_locked_documents_rels" USING btree ("skills_id");
  CREATE INDEX "payload_locked_documents_rels_principles_id_idx" ON "payload_locked_documents_rels" USING btree ("principles_id");
  CREATE INDEX "payload_locked_documents_rels_preferences_id_idx" ON "payload_locked_documents_rels" USING btree ("preferences_id");
  CREATE INDEX "payload_locked_documents_rels_channels_id_idx" ON "payload_locked_documents_rels" USING btree ("channels_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_locked_documents_rels_forms_id_idx" ON "payload_locked_documents_rels" USING btree ("forms_id");
  CREATE INDEX "payload_locked_documents_rels_form_submissions_id_idx" ON "payload_locked_documents_rels" USING btree ("form_submissions_id");
  CREATE INDEX "payload_locked_documents_rels_addresses_id_idx" ON "payload_locked_documents_rels" USING btree ("addresses_id");
  CREATE INDEX "payload_locked_documents_rels_variants_id_idx" ON "payload_locked_documents_rels" USING btree ("variants_id");
  CREATE INDEX "payload_locked_documents_rels_variant_types_id_idx" ON "payload_locked_documents_rels" USING btree ("variant_types_id");
  CREATE INDEX "payload_locked_documents_rels_variant_options_id_idx" ON "payload_locked_documents_rels" USING btree ("variant_options_id");
  CREATE INDEX "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");
  CREATE INDEX "payload_locked_documents_rels_carts_id_idx" ON "payload_locked_documents_rels" USING btree ("carts_id");
  CREATE INDEX "payload_locked_documents_rels_orders_id_idx" ON "payload_locked_documents_rels" USING btree ("orders_id");
  CREATE INDEX "payload_locked_documents_rels_transactions_id_idx" ON "payload_locked_documents_rels" USING btree ("transactions_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx" ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "header_nav_items_sub_items_order_idx" ON "header_nav_items_sub_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_sub_items_parent_id_idx" ON "header_nav_items_sub_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_utility_nav_order_idx" ON "header_utility_nav" USING btree ("_order");
  CREATE INDEX "header_utility_nav_parent_id_idx" ON "header_utility_nav" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
  CREATE INDEX "header_rels_drivers_id_idx" ON "header_rels" USING btree ("drivers_id");
  CREATE INDEX "header_rels_leaders_id_idx" ON "header_rels" USING btree ("leaders_id");
  CREATE INDEX "header_rels_members_id_idx" ON "header_rels" USING btree ("members_id");
  CREATE INDEX "header_rels_cars_id_idx" ON "header_rels" USING btree ("cars_id");
  CREATE INDEX "header_rels_kits_id_idx" ON "header_rels" USING btree ("kits_id");
  CREATE INDEX "header_rels_series_id_idx" ON "header_rels" USING btree ("series_id");
  CREATE INDEX "header_rels_seasons_id_idx" ON "header_rels" USING btree ("seasons_id");
  CREATE INDEX "header_rels_events_id_idx" ON "header_rels" USING btree ("events_id");
  CREATE INDEX "header_rels_awards_id_idx" ON "header_rels" USING btree ("awards_id");
  CREATE INDEX "header_rels_stories_id_idx" ON "header_rels" USING btree ("stories_id");
  CREATE INDEX "header_rels_journeys_id_idx" ON "header_rels" USING btree ("journeys_id");
  CREATE INDEX "header_rels_histories_id_idx" ON "header_rels" USING btree ("histories_id");
  CREATE INDEX "header_rels_initiatives_id_idx" ON "header_rels" USING btree ("initiatives_id");
  CREATE INDEX "header_rels_celebrations_id_idx" ON "header_rels" USING btree ("celebrations_id");
  CREATE INDEX "header_rels_meetups_id_idx" ON "header_rels" USING btree ("meetups_id");
  CREATE INDEX "header_rels_careers_id_idx" ON "header_rels" USING btree ("careers_id");
  CREATE INDEX "header_rels_trainings_id_idx" ON "header_rels" USING btree ("trainings_id");
  CREATE INDEX "header_rels_organizations_id_idx" ON "header_rels" USING btree ("organizations_id");
  CREATE INDEX "footer_columns_links_order_idx" ON "footer_columns_links" USING btree ("_order");
  CREATE INDEX "footer_columns_links_parent_id_idx" ON "footer_columns_links" USING btree ("_parent_id");
  CREATE INDEX "footer_columns_order_idx" ON "footer_columns" USING btree ("_order");
  CREATE INDEX "footer_columns_parent_id_idx" ON "footer_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_legal_order_idx" ON "footer_legal" USING btree ("_order");
  CREATE INDEX "footer_legal_parent_id_idx" ON "footer_legal" USING btree ("_parent_id");
  CREATE INDEX "footer_brand_brand_logo_idx" ON "footer" USING btree ("brand_logo_id");
  CREATE INDEX "footer_rels_order_idx" ON "footer_rels" USING btree ("order");
  CREATE INDEX "footer_rels_parent_idx" ON "footer_rels" USING btree ("parent_id");
  CREATE INDEX "footer_rels_path_idx" ON "footer_rels" USING btree ("path");
  CREATE INDEX "footer_rels_pages_id_idx" ON "footer_rels" USING btree ("pages_id");
  CREATE INDEX "identity_values_order_idx" ON "identity_values" USING btree ("_order");
  CREATE INDEX "identity_values_parent_id_idx" ON "identity_values" USING btree ("_parent_id");
  CREATE INDEX "identity_values_principle_idx" ON "identity_values" USING btree ("principle_id");
  CREATE UNIQUE INDEX "identity_values_locales_locale_parent_id_unique" ON "identity_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "identity_story_idx" ON "identity" USING btree ("story_id");
  CREATE INDEX "identity_visual_visual_logo_idx" ON "identity" USING btree ("visual_logo_id");
  CREATE INDEX "identity_visual_visual_logo_inverted_idx" ON "identity" USING btree ("visual_logo_inverted_id");
  CREATE INDEX "identity_visual_visual_wordmark_idx" ON "identity" USING btree ("visual_wordmark_id");
  CREATE INDEX "identity_visual_visual_favicon_idx" ON "identity" USING btree ("visual_favicon_id");
  CREATE INDEX "identity_visual_visual_guidelines_idx" ON "identity" USING btree ("visual_guidelines_id");
  CREATE UNIQUE INDEX "identity_locales_locale_parent_id_unique" ON "identity_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "identity_rels_order_idx" ON "identity_rels" USING btree ("order");
  CREATE INDEX "identity_rels_parent_idx" ON "identity_rels" USING btree ("parent_id");
  CREATE INDEX "identity_rels_path_idx" ON "identity_rels" USING btree ("path");
  CREATE INDEX "identity_rels_tones_id_idx" ON "identity_rels" USING btree ("tones_id");
  CREATE INDEX "identity_rels_leaders_id_idx" ON "identity_rels" USING btree ("leaders_id");
  CREATE INDEX "identity_rels_initiatives_id_idx" ON "identity_rels" USING btree ("initiatives_id");
  CREATE INDEX "policies_documents_order_idx" ON "policies_documents" USING btree ("_order");
  CREATE INDEX "policies_documents_parent_id_idx" ON "policies_documents" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "policies_documents_locales_locale_parent_id_unique" ON "policies_documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "socials_accounts_order_idx" ON "socials_accounts" USING btree ("_order");
  CREATE INDEX "socials_accounts_parent_id_idx" ON "socials_accounts" USING btree ("_parent_id");
  CREATE INDEX "socials_accounts_channel_idx" ON "socials_accounts" USING btree ("channel_id");
  CREATE INDEX "announcements_items_order_idx" ON "announcements_items" USING btree ("_order");
  CREATE INDEX "announcements_items_parent_id_idx" ON "announcements_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "announcements_items_locales_locale_parent_id_unique" ON "announcements_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "questions_categories_items_order_idx" ON "questions_categories_items" USING btree ("_order");
  CREATE INDEX "questions_categories_items_parent_id_idx" ON "questions_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "questions_categories_items_locales_locale_parent_id_unique" ON "questions_categories_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "questions_categories_order_idx" ON "questions_categories" USING btree ("_order");
  CREATE INDEX "questions_categories_parent_id_idx" ON "questions_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "questions_categories_locales_locale_parent_id_unique" ON "questions_categories_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "series" CASCADE;
  DROP TABLE "series_locales" CASCADE;
  DROP TABLE "series_rels" CASCADE;
  DROP TABLE "seasons" CASCADE;
  DROP TABLE "seasons_locales" CASCADE;
  DROP TABLE "seasons_rels" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "sessions_traits_parameters_list" CASCADE;
  DROP TABLE "sessions" CASCADE;
  DROP TABLE "sessions_locales" CASCADE;
  DROP TABLE "sessions_rels" CASCADE;
  DROP TABLE "entries" CASCADE;
  DROP TABLE "entries_locales" CASCADE;
  DROP TABLE "entries_rels" CASCADE;
  DROP TABLE "results_metrics_stoppages" CASCADE;
  DROP TABLE "results" CASCADE;
  DROP TABLE "results_locales" CASCADE;
  DROP TABLE "results_rels" CASCADE;
  DROP TABLE "points_traits_modifiers_list" CASCADE;
  DROP TABLE "points" CASCADE;
  DROP TABLE "points_locales" CASCADE;
  DROP TABLE "points_rels" CASCADE;
  DROP TABLE "drivers" CASCADE;
  DROP TABLE "drivers_locales" CASCADE;
  DROP TABLE "drivers_rels" CASCADE;
  DROP TABLE "leaders" CASCADE;
  DROP TABLE "leaders_locales" CASCADE;
  DROP TABLE "leaders_rels" CASCADE;
  DROP TABLE "members" CASCADE;
  DROP TABLE "members_locales" CASCADE;
  DROP TABLE "members_rels" CASCADE;
  DROP TABLE "individuals_details_interests_list" CASCADE;
  DROP TABLE "individuals" CASCADE;
  DROP TABLE "individuals_locales" CASCADE;
  DROP TABLE "individuals_rels" CASCADE;
  DROP TABLE "organizations_metrics_benefits_list" CASCADE;
  DROP TABLE "organizations_contexts_associations_list" CASCADE;
  DROP TABLE "organizations" CASCADE;
  DROP TABLE "organizations_locales" CASCADE;
  DROP TABLE "organizations_rels" CASCADE;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "narratives_metrics_timeline_list" CASCADE;
  DROP TABLE "narratives" CASCADE;
  DROP TABLE "narratives_locales" CASCADE;
  DROP TABLE "narratives_rels" CASCADE;
  DROP TABLE "stories_traits_concerns_list" CASCADE;
  DROP TABLE "stories_traits_concerns_list_locales" CASCADE;
  DROP TABLE "stories_traits_interactions_list" CASCADE;
  DROP TABLE "stories_traits_interactions_list_locales" CASCADE;
  DROP TABLE "stories" CASCADE;
  DROP TABLE "stories_locales" CASCADE;
  DROP TABLE "stories_rels" CASCADE;
  DROP TABLE "histories" CASCADE;
  DROP TABLE "histories_locales" CASCADE;
  DROP TABLE "histories_rels" CASCADE;
  DROP TABLE "journeys_traits_lessons_list" CASCADE;
  DROP TABLE "journeys" CASCADE;
  DROP TABLE "journeys_locales" CASCADE;
  DROP TABLE "journeys_rels" CASCADE;
  DROP TABLE "notes_traits_intentions_list" CASCADE;
  DROP TABLE "notes_traits_intentions_list_locales" CASCADE;
  DROP TABLE "notes" CASCADE;
  DROP TABLE "notes_locales" CASCADE;
  DROP TABLE "notes_rels" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "cars" CASCADE;
  DROP TABLE "cars_locales" CASCADE;
  DROP TABLE "cars_rels" CASCADE;
  DROP TABLE "kits_traits_materials_list" CASCADE;
  DROP TABLE "kits" CASCADE;
  DROP TABLE "kits_locales" CASCADE;
  DROP TABLE "kits_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "galleries" CASCADE;
  DROP TABLE "galleries_locales" CASCADE;
  DROP TABLE "galleries_rels" CASCADE;
  DROP TABLE "playlists" CASCADE;
  DROP TABLE "playlists_locales" CASCADE;
  DROP TABLE "playlists_rels" CASCADE;
  DROP TABLE "archives" CASCADE;
  DROP TABLE "archives_locales" CASCADE;
  DROP TABLE "archives_rels" CASCADE;
  DROP TABLE "visualizations" CASCADE;
  DROP TABLE "visualizations_locales" CASCADE;
  DROP TABLE "visualizations_rels" CASCADE;
  DROP TABLE "schedules_details_slots_list" CASCADE;
  DROP TABLE "schedules_traits_constraints_list" CASCADE;
  DROP TABLE "schedules" CASCADE;
  DROP TABLE "schedules_locales" CASCADE;
  DROP TABLE "schedules_rels" CASCADE;
  DROP TABLE "trainings" CASCADE;
  DROP TABLE "trainings_locales" CASCADE;
  DROP TABLE "trainings_rels" CASCADE;
  DROP TABLE "careers_details_positions_list" CASCADE;
  DROP TABLE "careers" CASCADE;
  DROP TABLE "careers_locales" CASCADE;
  DROP TABLE "careers_rels" CASCADE;
  DROP TABLE "initiatives" CASCADE;
  DROP TABLE "initiatives_locales" CASCADE;
  DROP TABLE "initiatives_rels" CASCADE;
  DROP TABLE "meetups" CASCADE;
  DROP TABLE "meetups_locales" CASCADE;
  DROP TABLE "meetups_rels" CASCADE;
  DROP TABLE "celebrations" CASCADE;
  DROP TABLE "celebrations_locales" CASCADE;
  DROP TABLE "celebrations_rels" CASCADE;
  DROP TABLE "protocols_details_steps_list" CASCADE;
  DROP TABLE "protocols" CASCADE;
  DROP TABLE "protocols_locales" CASCADE;
  DROP TABLE "protocols_rels" CASCADE;
  DROP TABLE "duties" CASCADE;
  DROP TABLE "duties_locales" CASCADE;
  DROP TABLE "duties_rels" CASCADE;
  DROP TABLE "expectations" CASCADE;
  DROP TABLE "expectations_locales" CASCADE;
  DROP TABLE "expectations_rels" CASCADE;
  DROP TABLE "highlights" CASCADE;
  DROP TABLE "highlights_locales" CASCADE;
  DROP TABLE "highlights_rels" CASCADE;
  DROP TABLE "incidents" CASCADE;
  DROP TABLE "incidents_locales" CASCADE;
  DROP TABLE "incidents_rels" CASCADE;
  DROP TABLE "impacts" CASCADE;
  DROP TABLE "impacts_locales" CASCADE;
  DROP TABLE "impacts_rels" CASCADE;
  DROP TABLE "decisions" CASCADE;
  DROP TABLE "decisions_locales" CASCADE;
  DROP TABLE "decisions_rels" CASCADE;
  DROP TABLE "strategies_details_outcomes_list" CASCADE;
  DROP TABLE "strategies_traits_directives_list" CASCADE;
  DROP TABLE "strategies_traits_directives_list_locales" CASCADE;
  DROP TABLE "strategies_traits_contingencies_list" CASCADE;
  DROP TABLE "strategies_traits_contingencies_list_locales" CASCADE;
  DROP TABLE "strategies" CASCADE;
  DROP TABLE "strategies_locales" CASCADE;
  DROP TABLE "strategies_rels" CASCADE;
  DROP TABLE "awards" CASCADE;
  DROP TABLE "awards_locales" CASCADE;
  DROP TABLE "awards_rels" CASCADE;
  DROP TABLE "experiences_traits_skills_list" CASCADE;
  DROP TABLE "experiences" CASCADE;
  DROP TABLE "experiences_locales" CASCADE;
  DROP TABLE "experiences_rels" CASCADE;
  DROP TABLE "categories_details_type" CASCADE;
  DROP TABLE "categories_details_type_locales" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "categories_rels" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "tags_locales" CASCADE;
  DROP TABLE "tags_rels" CASCADE;
  DROP TABLE "tones_traits_qualities_list" CASCADE;
  DROP TABLE "tones" CASCADE;
  DROP TABLE "tones_locales" CASCADE;
  DROP TABLE "tones_rels" CASCADE;
  DROP TABLE "features" CASCADE;
  DROP TABLE "features_locales" CASCADE;
  DROP TABLE "features_rels" CASCADE;
  DROP TABLE "specifications_traits_conditions_list" CASCADE;
  DROP TABLE "specifications_metrics_parameters_list" CASCADE;
  DROP TABLE "specifications" CASCADE;
  DROP TABLE "specifications_locales" CASCADE;
  DROP TABLE "specifications_rels" CASCADE;
  DROP TABLE "classifications" CASCADE;
  DROP TABLE "classifications_locales" CASCADE;
  DROP TABLE "classifications_rels" CASCADE;
  DROP TABLE "skills_traits_methods_list" CASCADE;
  DROP TABLE "skills_traits_dependencies_list" CASCADE;
  DROP TABLE "skills" CASCADE;
  DROP TABLE "skills_locales" CASCADE;
  DROP TABLE "skills_rels" CASCADE;
  DROP TABLE "principles" CASCADE;
  DROP TABLE "principles_locales" CASCADE;
  DROP TABLE "principles_rels" CASCADE;
  DROP TABLE "preferences_traits_conditions_list" CASCADE;
  DROP TABLE "preferences_traits_reasons_list" CASCADE;
  DROP TABLE "preferences" CASCADE;
  DROP TABLE "preferences_locales" CASCADE;
  DROP TABLE "preferences_rels" CASCADE;
  DROP TABLE "channels_traits_usage_list" CASCADE;
  DROP TABLE "channels_traits_usage_list_locales" CASCADE;
  DROP TABLE "channels_traits_validity_list" CASCADE;
  DROP TABLE "channels" CASCADE;
  DROP TABLE "channels_locales" CASCADE;
  DROP TABLE "channels_rels" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "locations_locales" CASCADE;
  DROP TABLE "locations_rels" CASCADE;
  DROP TABLE "forms_blocks_checkbox" CASCADE;
  DROP TABLE "forms_blocks_checkbox_locales" CASCADE;
  DROP TABLE "forms_blocks_country" CASCADE;
  DROP TABLE "forms_blocks_country_locales" CASCADE;
  DROP TABLE "forms_blocks_email" CASCADE;
  DROP TABLE "forms_blocks_email_locales" CASCADE;
  DROP TABLE "forms_blocks_message" CASCADE;
  DROP TABLE "forms_blocks_message_locales" CASCADE;
  DROP TABLE "forms_blocks_number" CASCADE;
  DROP TABLE "forms_blocks_number_locales" CASCADE;
  DROP TABLE "forms_blocks_select_options" CASCADE;
  DROP TABLE "forms_blocks_select_options_locales" CASCADE;
  DROP TABLE "forms_blocks_select" CASCADE;
  DROP TABLE "forms_blocks_select_locales" CASCADE;
  DROP TABLE "forms_blocks_state" CASCADE;
  DROP TABLE "forms_blocks_state_locales" CASCADE;
  DROP TABLE "forms_blocks_text" CASCADE;
  DROP TABLE "forms_blocks_text_locales" CASCADE;
  DROP TABLE "forms_blocks_textarea" CASCADE;
  DROP TABLE "forms_blocks_textarea_locales" CASCADE;
  DROP TABLE "forms_emails" CASCADE;
  DROP TABLE "forms_emails_locales" CASCADE;
  DROP TABLE "forms" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "form_submissions_submission_data" CASCADE;
  DROP TABLE "form_submissions" CASCADE;
  DROP TABLE "addresses" CASCADE;
  DROP TABLE "variants" CASCADE;
  DROP TABLE "variants_rels" CASCADE;
  DROP TABLE "_variants_v" CASCADE;
  DROP TABLE "_variants_v_rels" CASCADE;
  DROP TABLE "variant_types" CASCADE;
  DROP TABLE "variant_options" CASCADE;
  DROP TABLE "products_gallery" CASCADE;
  DROP TABLE "products_blocks_cta_links" CASCADE;
  DROP TABLE "products_blocks_cta" CASCADE;
  DROP TABLE "products_blocks_content_columns" CASCADE;
  DROP TABLE "products_blocks_content" CASCADE;
  DROP TABLE "products_blocks_media_block" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "products_locales" CASCADE;
  DROP TABLE "products_rels" CASCADE;
  DROP TABLE "_products_v_version_gallery" CASCADE;
  DROP TABLE "_products_v_blocks_cta_links" CASCADE;
  DROP TABLE "_products_v_blocks_cta" CASCADE;
  DROP TABLE "_products_v_blocks_content_columns" CASCADE;
  DROP TABLE "_products_v_blocks_content" CASCADE;
  DROP TABLE "_products_v_blocks_media_block" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  DROP TABLE "_products_v_locales" CASCADE;
  DROP TABLE "_products_v_rels" CASCADE;
  DROP TABLE "carts_items" CASCADE;
  DROP TABLE "carts" CASCADE;
  DROP TABLE "orders_items" CASCADE;
  DROP TABLE "orders" CASCADE;
  DROP TABLE "orders_rels" CASCADE;
  DROP TABLE "transactions_items" CASCADE;
  DROP TABLE "transactions" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_locales" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  DROP TABLE "payload_mcp_api_keys" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "header_nav_items_sub_items" CASCADE;
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header_utility_nav" CASCADE;
  DROP TABLE "header" CASCADE;
  DROP TABLE "header_rels" CASCADE;
  DROP TABLE "footer_columns_links" CASCADE;
  DROP TABLE "footer_columns" CASCADE;
  DROP TABLE "footer_legal" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "footer_rels" CASCADE;
  DROP TABLE "identity_values" CASCADE;
  DROP TABLE "identity_values_locales" CASCADE;
  DROP TABLE "identity" CASCADE;
  DROP TABLE "identity_locales" CASCADE;
  DROP TABLE "identity_rels" CASCADE;
  DROP TABLE "policies_documents" CASCADE;
  DROP TABLE "policies_documents_locales" CASCADE;
  DROP TABLE "policies" CASCADE;
  DROP TABLE "socials_accounts" CASCADE;
  DROP TABLE "socials" CASCADE;
  DROP TABLE "announcements_items" CASCADE;
  DROP TABLE "announcements_items_locales" CASCADE;
  DROP TABLE "announcements" CASCADE;
  DROP TABLE "questions_categories_items" CASCADE;
  DROP TABLE "questions_categories_items_locales" CASCADE;
  DROP TABLE "questions_categories" CASCADE;
  DROP TABLE "questions_categories_locales" CASCADE;
  DROP TABLE "questions" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_series_toggle";
  DROP TYPE "public"."enum_series_details_status";
  DROP TYPE "public"."enum_seasons_toggle";
  DROP TYPE "public"."enum_events_toggle";
  DROP TYPE "public"."enum_events_details_status";
  DROP TYPE "public"."enum_events_details_access";
  DROP TYPE "public"."enum_sessions_toggle";
  DROP TYPE "public"."enum_sessions_details_status";
  DROP TYPE "public"."enum_sessions_details_access";
  DROP TYPE "public"."enum_entries_toggle";
  DROP TYPE "public"."enum_entries_details_status";
  DROP TYPE "public"."enum_entries_traits_role";
  DROP TYPE "public"."enum_results_toggle";
  DROP TYPE "public"."enum_results_details_status";
  DROP TYPE "public"."enum_points_toggle";
  DROP TYPE "public"."enum_points_traits_scale";
  DROP TYPE "public"."enum_drivers_toggle";
  DROP TYPE "public"."enum_drivers_traits_identity_gender";
  DROP TYPE "public"."enum_leaders_toggle";
  DROP TYPE "public"."enum_leaders_traits_identity_gender";
  DROP TYPE "public"."enum_members_toggle";
  DROP TYPE "public"."enum_members_traits_identity_gender";
  DROP TYPE "public"."enum_individuals_details_interests_list_level";
  DROP TYPE "public"."enum_individuals_toggle";
  DROP TYPE "public"."enum_individuals_traits_identity_gender";
  DROP TYPE "public"."enum_individuals_traits_influence_reach";
  DROP TYPE "public"."enum_individuals_traits_influence_authority";
  DROP TYPE "public"."enum_individuals_traits_influence_network";
  DROP TYPE "public"."enum_individuals_metrics_benefits_type";
  DROP TYPE "public"."enum_individuals_metrics_benefits_impact";
  DROP TYPE "public"."enum_organizations_metrics_benefits_list_type";
  DROP TYPE "public"."enum_organizations_metrics_benefits_list_impact";
  DROP TYPE "public"."enum_organizations_toggle";
  DROP TYPE "public"."enum_organizations_traits_reputation_prestige";
  DROP TYPE "public"."enum_organizations_traits_reputation_reliability";
  DROP TYPE "public"."enum_organizations_traits_reputation_innovation";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_narratives_metrics_timeline_list_type";
  DROP TYPE "public"."enum_narratives_toggle";
  DROP TYPE "public"."enum_narratives_details_scope_significance";
  DROP TYPE "public"."enum_narratives_details_scope_scale";
  DROP TYPE "public"."enum_narratives_details_scope_depth";
  DROP TYPE "public"."enum_stories_traits_interactions_list_dynamics";
  DROP TYPE "public"."enum_stories_toggle";
  DROP TYPE "public"."enum_histories_toggle";
  DROP TYPE "public"."enum_histories_traits_legacy_impact";
  DROP TYPE "public"."enum_histories_traits_legacy_memory";
  DROP TYPE "public"."enum_journeys_traits_lessons_list_significance";
  DROP TYPE "public"."enum_journeys_traits_lessons_list_impact";
  DROP TYPE "public"."enum_journeys_toggle";
  DROP TYPE "public"."enum_notes_traits_intentions_list_type";
  DROP TYPE "public"."enum_notes_traits_intentions_list_impact";
  DROP TYPE "public"."enum_notes_toggle";
  DROP TYPE "public"."enum_pages_toggle";
  DROP TYPE "public"."enum_cars_toggle";
  DROP TYPE "public"."enum_cars_details_status";
  DROP TYPE "public"."enum_kits_traits_materials_list_type";
  DROP TYPE "public"."enum_kits_toggle";
  DROP TYPE "public"."enum_kits_basics_purpose_application";
  DROP TYPE "public"."enum_kits_details_appearance_branding";
  DROP TYPE "public"."enum_kits_details_appearance_style";
  DROP TYPE "public"."enum_kits_traits_composition_construction";
  DROP TYPE "public"."enum_kits_traits_composition_assembly";
  DROP TYPE "public"."enum_kits_traits_composition_finish";
  DROP TYPE "public"."enum_kits_traits_functionality_performance";
  DROP TYPE "public"."enum_kits_traits_functionality_durability";
  DROP TYPE "public"."enum_kits_traits_functionality_comfort";
  DROP TYPE "public"."enum_galleries_toggle";
  DROP TYPE "public"."enum_playlists_toggle";
  DROP TYPE "public"."enum_playlists_traits_quality";
  DROP TYPE "public"."enum_playlists_traits_format";
  DROP TYPE "public"."enum_archives_toggle";
  DROP TYPE "public"."enum_visualizations_toggle";
  DROP TYPE "public"."enum_schedules_traits_constraints_list_type";
  DROP TYPE "public"."enum_schedules_traits_constraints_list_impact";
  DROP TYPE "public"."enum_schedules_toggle";
  DROP TYPE "public"."enum_schedules_basics_scope_significance";
  DROP TYPE "public"."enum_schedules_basics_scope_scale";
  DROP TYPE "public"."enum_schedules_basics_scope_depth";
  DROP TYPE "public"."enum_schedules_details_chronology_type";
  DROP TYPE "public"."enum_trainings_toggle";
  DROP TYPE "public"."enum_trainings_traits_intensity";
  DROP TYPE "public"."enum_trainings_traits_format";
  DROP TYPE "public"."enum_careers_toggle";
  DROP TYPE "public"."enum_careers_details_contract";
  DROP TYPE "public"."enum_initiatives_toggle";
  DROP TYPE "public"."enum_initiatives_details_status";
  DROP TYPE "public"."enum_meetups_toggle";
  DROP TYPE "public"."enum_meetups_traits_format";
  DROP TYPE "public"."enum_meetups_traits_access";
  DROP TYPE "public"."enum_celebrations_toggle";
  DROP TYPE "public"."enum_celebrations_details_prestige";
  DROP TYPE "public"."enum_celebrations_details_exclusivity";
  DROP TYPE "public"."enum_protocols_toggle";
  DROP TYPE "public"."enum_duties_toggle";
  DROP TYPE "public"."enum_expectations_toggle";
  DROP TYPE "public"."enum_expectations_traits_direction";
  DROP TYPE "public"."enum_expectations_traits_priority";
  DROP TYPE "public"."enum_expectations_traits_flexibility";
  DROP TYPE "public"."enum_highlights_toggle";
  DROP TYPE "public"."enum_incidents_toggle";
  DROP TYPE "public"."enum_impacts_toggle";
  DROP TYPE "public"."enum_impacts_details_scope_scale";
  DROP TYPE "public"."enum_impacts_details_scope_depth";
  DROP TYPE "public"."enum_impacts_details_scope_rarity";
  DROP TYPE "public"."enum_impacts_traits_velocity";
  DROP TYPE "public"."enum_impacts_traits_gravity";
  DROP TYPE "public"."enum_impacts_traits_permanence";
  DROP TYPE "public"."enum_decisions_toggle";
  DROP TYPE "public"."enum_strategies_traits_contingencies_list_probability";
  DROP TYPE "public"."enum_strategies_traits_contingencies_list_impact";
  DROP TYPE "public"."enum_strategies_toggle";
  DROP TYPE "public"."enum_awards_toggle";
  DROP TYPE "public"."enum_experiences_traits_skills_list_proficiency";
  DROP TYPE "public"."enum_experiences_toggle";
  DROP TYPE "public"."enum_categories_toggle";
  DROP TYPE "public"."enum_tags_toggle";
  DROP TYPE "public"."enum_tones_traits_qualities_list_quality";
  DROP TYPE "public"."enum_tones_traits_qualities_list_intensity";
  DROP TYPE "public"."enum_tones_traits_qualities_list_mood";
  DROP TYPE "public"."enum_tones_traits_qualities_list_scale";
  DROP TYPE "public"."enum_tones_toggle";
  DROP TYPE "public"."enum_tones_traits_scope_scale";
  DROP TYPE "public"."enum_tones_traits_scope_depth";
  DROP TYPE "public"."enum_features_toggle";
  DROP TYPE "public"."enum_features_traits_nature_complexity";
  DROP TYPE "public"."enum_features_traits_nature_visibility";
  DROP TYPE "public"."enum_features_traits_nature_impact";
  DROP TYPE "public"."enum_specifications_traits_conditions_list_compliance";
  DROP TYPE "public"."enum_specifications_toggle";
  DROP TYPE "public"."enum_specifications_metrics_measurement_frequency";
  DROP TYPE "public"."enum_specifications_metrics_measurement_accuracy";
  DROP TYPE "public"."enum_classifications_toggle";
  DROP TYPE "public"."enum_skills_traits_methods_list_type";
  DROP TYPE "public"."enum_skills_traits_dependencies_list_type";
  DROP TYPE "public"."enum_skills_toggle";
  DROP TYPE "public"."enum_skills_basics_scope_scale";
  DROP TYPE "public"."enum_skills_basics_scope_depth";
  DROP TYPE "public"."enum_skills_basics_scope_rarity";
  DROP TYPE "public"."enum_skills_traits_nature_complexity";
  DROP TYPE "public"."enum_skills_traits_nature_visibility";
  DROP TYPE "public"."enum_skills_traits_nature_impact";
  DROP TYPE "public"."enum_principles_toggle";
  DROP TYPE "public"."enum_preferences_traits_reasons_list_importance";
  DROP TYPE "public"."enum_preferences_toggle";
  DROP TYPE "public"."enum_channels_traits_usage_list_role";
  DROP TYPE "public"."enum_channels_traits_usage_list_function";
  DROP TYPE "public"."enum_channels_traits_validity_list_status";
  DROP TYPE "public"."enum_channels_traits_validity_list_condition";
  DROP TYPE "public"."enum_channels_traits_validity_list_state";
  DROP TYPE "public"."enum_channels_toggle";
  DROP TYPE "public"."enum_channels_details_protocol_format";
  DROP TYPE "public"."enum_channels_details_protocol_scheme";
  DROP TYPE "public"."enum_locations_toggle";
  DROP TYPE "public"."enum_locations_traits_geography_climate";
  DROP TYPE "public"."enum_locations_traits_accessibility_approach";
  DROP TYPE "public"."enum_locations_traits_accessibility_facilities";
  DROP TYPE "public"."enum_locations_traits_accessibility_capacity";
  DROP TYPE "public"."enum_forms_confirmation_type";
  DROP TYPE "public"."enum_addresses_country";
  DROP TYPE "public"."enum_variants_status";
  DROP TYPE "public"."enum__variants_v_version_status";
  DROP TYPE "public"."enum__variants_v_published_locale";
  DROP TYPE "public"."enum_products_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_products_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_products_blocks_content_columns_size";
  DROP TYPE "public"."enum_products_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_products_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__products_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__products_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__products_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__products_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__products_v_version_status";
  DROP TYPE "public"."enum__products_v_published_locale";
  DROP TYPE "public"."enum_carts_currency";
  DROP TYPE "public"."enum_orders_status";
  DROP TYPE "public"."enum_orders_currency";
  DROP TYPE "public"."enum_transactions_payment_method";
  DROP TYPE "public"."enum_transactions_status";
  DROP TYPE "public"."enum_transactions_currency";
  DROP TYPE "public"."enum_header_nav_items_sub_items_link_type";
  DROP TYPE "public"."enum_header_utility_nav_link_type";
  DROP TYPE "public"."enum_header_cta_link_type";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_legal_link_type";
  DROP TYPE "public"."enum_footer_cta_link_type";
  DROP TYPE "public"."enum_policies_documents_type";
  DROP TYPE "public"."enum_socials_accounts_platform";
  DROP TYPE "public"."enum_announcements_items_type";
  DROP TYPE "public"."enum_announcements_items_audience";`)
}
