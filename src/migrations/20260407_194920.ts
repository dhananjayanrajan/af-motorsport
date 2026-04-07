import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es', 'pt');
  CREATE TYPE "public"."enum_series_details_status" AS ENUM('Active', 'Inactive', 'Defunct', 'Upcoming', 'Rebranded', 'Merged', 'Sanctioned');
  CREATE TYPE "public"."enum_series_details_access" AS ENUM('Public', 'Private', 'InviteOnly', 'MemberOnly', 'VIP');
  CREATE TYPE "public"."enum_events_details_status" AS ENUM('Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Postponed', 'Abandoned');
  CREATE TYPE "public"."enum_events_details_access" AS ENUM('Public', 'Private', 'InviteOnly', 'MemberOnly', 'VIP');
  CREATE TYPE "public"."enum_sessions_details_access" AS ENUM('public', 'private', 'exclusive');
  CREATE TYPE "public"."enum_entries_details_status" AS ENUM('Entered', 'Confirmed', 'Withdrawn', 'Disqualified', 'DidNotStart', 'DidNotFinish', 'Classified', 'NotClassified', 'Provisional', 'Excluded');
  CREATE TYPE "public"."enum_results_details_status" AS ENUM('Official', 'Provisional', 'Corrected', 'Historic', 'Estimated', 'Certified', 'Void');
  CREATE TYPE "public"."enum_points_details_scale" AS ENUM('standard', 'inverse', 'logarithmic', 'multiplier', 'fixed');
  CREATE TYPE "public"."enum_circuits_details_type" AS ENUM('permanent', 'street', 'temporary', 'roval', 'mixed');
  CREATE TYPE "public"."enum_circuits_details_direction" AS ENUM('clockwise', 'anticlockwise');
  CREATE TYPE "public"."enum_circuits_details_fia_grade" AS ENUM('1', '1T', '2', '3', '4');
  CREATE TYPE "public"."enum_championships_details_standings_scope" AS ENUM('season_only', 'rolling', 'cumulative');
  CREATE TYPE "public"."enum_races_details_type" AS ENUM('sprint', 'feature', 'qualifying_race', 'heat', 'final', 'knockout');
  CREATE TYPE "public"."enum_races_details_status" AS ENUM('scheduled', 'ongoing', 'completed', 'cancelled', 'postponed');
  CREATE TYPE "public"."enum_drivers_details_socials_list_platform" AS ENUM('Twitter', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Twitch', 'Discord', 'Telegram', 'WhatsApp');
  CREATE TYPE "public"."enum_drivers_basics_gender" AS ENUM('Male', 'Female', 'NonBinary', 'Undisclosed');
  CREATE TYPE "public"."enum_leaders_details_socials_list_platform" AS ENUM('Twitter', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Twitch', 'Discord', 'Telegram', 'WhatsApp');
  CREATE TYPE "public"."enum_leaders_basics_gender" AS ENUM('Male', 'Female', 'NonBinary', 'Undisclosed');
  CREATE TYPE "public"."enum_members_basics_gender" AS ENUM('Male', 'Female', 'NonBinary', 'Undisclosed');
  CREATE TYPE "public"."enum_individuals_basics_type" AS ENUM('mentor', 'trainee', 'intern', 'advisor', 'consultant', 'guest');
  CREATE TYPE "public"."enum_individuals_basics_gender" AS ENUM('Male', 'Female', 'NonBinary', 'Undisclosed');
  CREATE TYPE "public"."enum_organizations_details_socials_list_platform" AS ENUM('Twitter', 'Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Twitch', 'Discord', 'Telegram', 'WhatsApp');
  CREATE TYPE "public"."enum_organizations_basics_type" AS ENUM('sponsors', 'investors', 'partners', 'supporters', 'promoters', 'organizers', 'media', 'government', 'NGO', 'developers', 'distributors', 'retailers', 'manufacturers', 'suppliers');
  CREATE TYPE "public"."enum_organizations_details_prestige" AS ENUM('unknown', 'emerging', 'established', 'prestigious', 'iconic');
  CREATE TYPE "public"."enum_organizations_details_impact" AS ENUM('low', 'medium', 'deep', 'heavy', 'profound', 'rare', 'catastrophic', 'moderate', 'minor', 'negligible', 'major', 'severe', 'permanent', 'temporary');
  CREATE TYPE "public"."enum_users_roles" AS ENUM('admin', 'race_admin', 'commercial', 'content', 'technical', 'hr', 'archive', 'customer');
  CREATE TYPE "public"."enum_meetups_details_format" AS ENUM('in_person', 'virtual', 'hybrid');
  CREATE TYPE "public"."enum_meetups_details_access" AS ENUM('public', 'invite_only', 'private', 'exclusive');
  CREATE TYPE "public"."enum_initiatives_details_expectations_list_type" AS ENUM();
  CREATE TYPE "public"."enum_trainings_details_expectations_list_type" AS ENUM();
  CREATE TYPE "public"."enum_trainings_basics_intensity" AS ENUM('low', 'medium', 'high', 'extreme');
  CREATE TYPE "public"."enum_trainings_basics_format" AS ENUM('individual', 'group', 'lecture', 'hands_on', 'simulated', 'remote', 'classroom');
  CREATE TYPE "public"."enum_vacancies_details_expectations_list_type" AS ENUM();
  CREATE TYPE "public"."enum_vacancies_details_contract" AS ENUM('full_time', 'part_time', 'reserve', 'test');
  CREATE TYPE "public"."enum_onboardings_details_type" AS ENUM('driver', 'member', 'leader', 'partner', 'volunteer');
  CREATE TYPE "public"."enum_onboardings_details_format" AS ENUM('in_person', 'virtual', 'hybrid', 'self_paced');
  CREATE TYPE "public"."enum_onboardings_details_status" AS ENUM('draft', 'active', 'completed', 'archived');
  CREATE TYPE "public"."enum_celebrations_details_exclusivity" AS ENUM('public', 'private');
  CREATE TYPE "public"."enum_interviews_details_format" AS ENUM('one_on_one', 'panel', 'press_conference', 'remote', 'pit_lane', 'podium');
  CREATE TYPE "public"."enum_interviews_details_status" AS ENUM('draft', 'scheduled', 'recorded', 'published', 'archived');
  CREATE TYPE "public"."enum_interviews_details_access" AS ENUM('public', 'exclusive', 'team_only', 'media_only');
  CREATE TYPE "public"."enum_cars_details_status" AS ENUM('Active', 'Retired', 'Development', 'Museum', 'Prototype', 'Concept');
  CREATE TYPE "public"."enum_helmets_details_usage" AS ENUM('Track', 'Street', 'Show', 'Performance');
  CREATE TYPE "public"."enum_helmets_details_branding" AS ENUM('Minimal', 'Prominent', 'Full', 'Heritage');
  CREATE TYPE "public"."enum_helmets_details_style" AS ENUM('Classic', 'Modern', 'Futuristic', 'Retro');
  CREATE TYPE "public"."enum_helmets_details_material" AS ENUM('Matte', 'Glossy', 'Textured', 'Coated');
  CREATE TYPE "public"."enum_suits_details_usage" AS ENUM('Track', 'Street', 'Show', 'Performance');
  CREATE TYPE "public"."enum_suits_details_durability" AS ENUM('Low', 'Medium', 'High', 'Extreme');
  CREATE TYPE "public"."enum_suits_details_material" AS ENUM('Cotton', 'Polyester', 'Nomex', 'Carbon', 'Leather', 'Synthetic');
  CREATE TYPE "public"."enum_suits_details_appearance" AS ENUM('Classic', 'Modern', 'Futuristic', 'Retro');
  CREATE TYPE "public"."enum_garages_details_type" AS ENUM('Permanent', 'Temporary', 'Mobile', 'Popup', 'Shared');
  CREATE TYPE "public"."enum_garages_details_accessibility" AS ENUM('Restricted', 'TeamOnly', 'Paddock', 'Public');
  CREATE TYPE "public"."enum_skills_details_scale" AS ENUM('Narrow', 'Moderate', 'Broad', 'Comprehensive');
  CREATE TYPE "public"."enum_skills_details_depth" AS ENUM('Basic', 'Intermediate', 'Advanced', 'Expert');
  CREATE TYPE "public"."enum_skills_details_rarity" AS ENUM('Common', 'Uncommon', 'Rare', 'Unique');
  CREATE TYPE "public"."enum_skills_details_complexity" AS ENUM('Low', 'Medium', 'High', 'Extreme');
  CREATE TYPE "public"."enum_regulations_basics_status" AS ENUM('Published', 'Draft', 'Archived');
  CREATE TYPE "public"."enum_statements_basics_status" AS ENUM('Published', 'Draft', 'Archived');
  CREATE TYPE "public"."enum_slides_details_type" AS ENUM('intro', 'overview', 'highlight', 'summary', 'statistical', 'congratulatory');
  CREATE TYPE "public"."enum_slides_details_orientation" AS ENUM('landscape', 'portrait', 'square');
  CREATE TYPE "public"."enum_slides_details_template" AS ENUM('minimal', 'corporate', 'sporty', 'bold', 'data_driven');
  CREATE TYPE "public"."enum_slides_details_transition" AS ENUM('fade', 'slide', 'zoom', 'none');
  CREATE TYPE "public"."enum_plans_traits_risks_list_likelihood" AS ENUM('low', 'medium', 'high');
  CREATE TYPE "public"."enum_plans_traits_risks_list_impact" AS ENUM('low', 'medium', 'high', 'critical');
  CREATE TYPE "public"."enum_plans_details_scope" AS ENUM('personal', 'team', 'departmental', 'organizational', 'championship');
  CREATE TYPE "public"."enum_plans_details_status" AS ENUM('draft', 'approved', 'in_progress', 'completed', 'on_hold', 'cancelled');
  CREATE TYPE "public"."enum_plans_details_priority" AS ENUM('low', 'medium', 'high', 'critical');
  CREATE TYPE "public"."enum_plans_details_currency" AS ENUM('USD', 'EUR', 'GBP', 'INR');
  CREATE TYPE "public"."enum_timelines_details_scope" AS ENUM('personal', 'team', 'project', 'championship', 'organizational');
  CREATE TYPE "public"."enum_timelines_details_status" AS ENUM('draft', 'active', 'archived');
  CREATE TYPE "public"."enum_timelines_details_color_scheme" AS ENUM('light', 'dark', 'vibrant', 'monochrome');
  CREATE TYPE "public"."enum_timelines_details_orientation" AS ENUM('horizontal', 'vertical', 'zigzag');
  CREATE TYPE "public"."enum_programs_details_type" AS ENUM('development', 'training', 'outreach', 'competitive', 'grassroots', 'elite', 'academy');
  CREATE TYPE "public"."enum_programs_details_status" AS ENUM('proposed', 'approved', 'active', 'suspended', 'completed', 'cancelled');
  CREATE TYPE "public"."enum_programs_details_duration" AS ENUM('days', 'weeks', 'months', 'years', 'ongoing');
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
  CREATE TYPE "public"."enum_header_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_columns_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_legal_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_footer_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_announcements_items_type" AS ENUM('info', 'warning', 'urgent', 'celebration');
  CREATE TYPE "public"."enum_announcements_items_audience" AS ENUM('everyone', 'authenticated', 'guest');
  CREATE TYPE "public"."enum_socials_accounts_platform" AS ENUM('instagram', 'x', 'facebook', 'youtube', 'linkedin', 'tiktok', 'threads', 'snapchat', 'pinterest', 'discord', 'twitch', 'whatsapp', 'telegram', 'github', 'spotify', 'other');
  CREATE TABLE "series" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_identifiers_abbreviation" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_status" "enum_series_details_status",
  	"details_access" "enum_series_details_access",
  	"details_agenda" varchar DEFAULT '',
  	"details_history" jsonb,
  	"details_predecessor_id" integer,
  	"details_successor_id" integer,
  	"details_start_date" timestamp(3) with time zone,
  	"details_end_date" timestamp(3) with time zone,
  	"details_location" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)',
  	"assets_logo_id" integer,
  	"assets_thumbnail_id" integer,
  	"assets_cover_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "series_locales" (
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
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "seasons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_identifiers_abbreviation" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_series_id" integer NOT NULL,
  	"details_history" jsonb,
  	"details_entries" numeric DEFAULT 0,
  	"details_races" numeric DEFAULT 0,
  	"details_notes" varchar DEFAULT '',
  	"assets_cover_id" integer,
  	"assets_trailer_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "seasons_locales" (
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
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_status" "enum_events_details_status",
  	"details_access" "enum_events_details_access",
  	"details_season_id" integer NOT NULL,
  	"details_location" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)',
  	"details_history" jsonb,
  	"details_start_date" timestamp(3) with time zone,
  	"details_end_date" timestamp(3) with time zone,
  	"details_notes" varchar DEFAULT '',
  	"assets_thumbnail_id" integer,
  	"assets_poster_id" integer,
  	"assets_cover_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_locales" (
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
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "sessions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_segment" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_access" "enum_sessions_details_access",
  	"details_specification" varchar DEFAULT '',
  	"details_history" jsonb,
  	"details_notes" varchar DEFAULT '',
  	"metrics_quantifiers_laps" numeric DEFAULT 0,
  	"metrics_quantifiers_distance" numeric DEFAULT 0,
  	"metrics_quantifiers_duration" numeric DEFAULT 0,
  	"metrics_quantifiers_interval" numeric DEFAULT 0,
  	"metrics_quantifiers_specification" varchar DEFAULT '',
  	"assets_thumbnail_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sessions_locales" (
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
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "entries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_number" varchar DEFAULT '',
  	"basics_identifiers_plate" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_session_id" integer NOT NULL,
  	"details_status" "enum_entries_details_status",
  	"details_grid_position" numeric DEFAULT 0,
  	"details_start_position" numeric DEFAULT 0,
  	"details_finish_position" numeric DEFAULT 0,
  	"details_laps_position" numeric DEFAULT 0,
  	"assets_thumbnail_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "entries_locales" (
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
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "results" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_status" "enum_results_details_status",
  	"details_overall" numeric DEFAULT 0,
  	"details_class" numeric DEFAULT 0,
  	"details_order" numeric DEFAULT 0,
  	"details_interval" numeric DEFAULT 0,
  	"details_gap" numeric DEFAULT 0,
  	"details_state" numeric DEFAULT 0,
  	"details_laps" numeric DEFAULT 0,
  	"details_time" numeric DEFAULT 0,
  	"details_speed" numeric DEFAULT 0,
  	"details_distance" numeric DEFAULT 0,
  	"details_notes" varchar DEFAULT '',
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "results_locales" (
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
  	"tags_id" integer
  );
  
  CREATE TABLE "points" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_scale" "enum_points_details_scale",
  	"details_value" numeric DEFAULT 0,
  	"details_before" numeric DEFAULT 0,
  	"details_after" numeric DEFAULT 0,
  	"details_delta" numeric DEFAULT 0,
  	"details_condition" numeric DEFAULT 0,
  	"details_adjustment" numeric DEFAULT 0,
  	"details_impact" varchar DEFAULT '',
  	"details_notes" varchar DEFAULT '',
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "points_locales" (
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
  	"tags_id" integer
  );
  
  CREATE TABLE "circuits_details_renovated_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" timestamp(3) with time zone,
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "circuits" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_identifiers_abbreviation" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_type" "enum_circuits_details_type",
  	"details_length_km" numeric DEFAULT 0,
  	"details_length_miles" numeric DEFAULT 0,
  	"details_turns" numeric DEFAULT 0,
  	"details_drs_zones" numeric DEFAULT 0,
  	"details_direction" "enum_circuits_details_direction",
  	"details_fia_grade" "enum_circuits_details_fia_grade",
  	"details_elevation_change" numeric DEFAULT 0,
  	"details_capacity" numeric DEFAULT 0,
  	"details_location" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)',
  	"details_address" varchar DEFAULT '',
  	"details_country_id" integer,
  	"details_opened" timestamp(3) with time zone,
  	"details_closed" timestamp(3) with time zone,
  	"details_owner_id" integer,
  	"details_operator_id" integer,
  	"details_website" varchar DEFAULT '',
  	"details_history" jsonb,
  	"details_notes" varchar DEFAULT '',
  	"metrics_record_lap_time" varchar,
  	"metrics_record_lap_driver_id" integer,
  	"metrics_record_lap_year" timestamp(3) with time zone,
  	"assets_thumbnail_id" integer,
  	"assets_cover_id" integer,
  	"assets_circuit_map_id" integer,
  	"assets_video_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "circuits_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "circuits_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "championships" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_identifiers_abbreviation" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_history" jsonb,
  	"details_regulations_id" integer,
  	"details_format" varchar DEFAULT '',
  	"details_points_system_id" integer,
  	"details_standings_scope" "enum_championships_details_standings_scope",
  	"details_start_date" timestamp(3) with time zone,
  	"details_end_date" timestamp(3) with time zone,
  	"details_season_id" integer,
  	"details_series_id" integer,
  	"details_winner_id" integer,
  	"details_runner_up_id" integer,
  	"details_third_place_id" integer,
  	"details_notes" varchar DEFAULT '',
  	"assets_trophy_id" integer,
  	"assets_thumbnail_id" integer,
  	"assets_cover_id" integer,
  	"assets_video_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "championships_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "championships_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "races" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_identifiers_abbreviation" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_history" jsonb,
  	"details_type" "enum_races_details_type",
  	"details_status" "enum_races_details_status",
  	"details_start_date" timestamp(3) with time zone,
  	"details_end_date" timestamp(3) with time zone,
  	"details_event_id" integer NOT NULL,
  	"details_season_id" integer,
  	"details_series_id" integer,
  	"details_circuit_id" integer,
  	"details_laps" numeric DEFAULT 0,
  	"details_distance_km" numeric DEFAULT 0,
  	"details_winner_id" integer,
  	"details_pole_position_id" integer,
  	"details_fastest_lap_id" integer,
  	"details_fastest_lap_time" varchar,
  	"details_weather" varchar DEFAULT '',
  	"details_safety_car_periods" numeric DEFAULT 0,
  	"details_red_flags" numeric DEFAULT 0,
  	"details_notes" varchar DEFAULT '',
  	"assets_thumbnail_id" integer,
  	"assets_poster_id" integer,
  	"assets_cover_id" integer,
  	"assets_video_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "races_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "races_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "teams" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_history" jsonb,
  	"details_country_id" integer,
  	"details_start_date" timestamp(3) with time zone,
  	"details_end_date" timestamp(3) with time zone,
  	"details_website" varchar DEFAULT '',
  	"assets_logo_id" integer,
  	"assets_cover_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "teams_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "teams_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "drivers_details_addresses_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"label" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"location" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)'
  );
  
  CREATE TABLE "drivers_details_websites_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"path" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "drivers_details_socials_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_drivers_details_socials_list_platform",
  	"username" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "drivers_assets_gallery_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar DEFAULT ''
  );
  
  CREATE TABLE "drivers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar DEFAULT '' NOT NULL,
  	"middle_name" varchar DEFAULT '',
  	"last_name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_racing_number" numeric DEFAULT 0,
  	"basics_nickname" varchar DEFAULT '',
  	"basics_competition_name" varchar DEFAULT '',
  	"basics_callsign" varchar DEFAULT '',
  	"basics_catchphrase" varchar DEFAULT '',
  	"basics_birth_date" timestamp(3) with time zone,
  	"basics_debut_date" timestamp(3) with time zone,
  	"basics_retirement_date" timestamp(3) with time zone,
  	"basics_nationality_id" integer,
  	"basics_gender" "enum_drivers_basics_gender",
  	"basics_pronouns" varchar DEFAULT '',
  	"details_story" jsonb,
  	"details_biography" jsonb,
  	"assets_avatar_id" integer,
  	"assets_autograph_id" integer,
  	"assets_cover_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "drivers_locales" (
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
  	"skills_id" integer,
  	"points_id" integer,
  	"results_id" integer,
  	"awards_id" integer,
  	"cars_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "leaders_details_principles_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"statement" varchar DEFAULT '',
  	"application" varchar DEFAULT '',
  	"rationale" varchar DEFAULT ''
  );
  
  CREATE TABLE "leaders_details_websites_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"path" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "leaders_details_socials_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_leaders_details_socials_list_platform",
  	"username" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "leaders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar DEFAULT '' NOT NULL,
  	"middle_name" varchar DEFAULT '',
  	"last_name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_nickname" varchar DEFAULT '',
  	"basics_title" varchar DEFAULT '',
  	"basics_gender" "enum_leaders_basics_gender",
  	"basics_nationality_id" integer,
  	"basics_birth_date" timestamp(3) with time zone,
  	"basics_debut_date" timestamp(3) with time zone,
  	"basics_retirement_date" timestamp(3) with time zone,
  	"details_vision" varchar DEFAULT '',
  	"details_mission" varchar DEFAULT '',
  	"details_quote" varchar DEFAULT '',
  	"details_biography" jsonb,
  	"details_history" varchar DEFAULT '',
  	"assets_avatar_id" integer,
  	"assets_cover_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "leaders_locales" (
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
  	"designations_id" integer,
  	"awards_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "members_details_addresses_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"label" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"location" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)'
  );
  
  CREATE TABLE "members" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar DEFAULT '' NOT NULL,
  	"middle_name" varchar DEFAULT '',
  	"last_name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_nickname" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"basics_gender" "enum_members_basics_gender",
  	"basics_pronouns" varchar DEFAULT '',
  	"basics_nationality_id" integer,
  	"basics_birth_date" timestamp(3) with time zone,
  	"basics_joining_date" timestamp(3) with time zone,
  	"basics_retirement_date" timestamp(3) with time zone,
  	"details_duties" varchar DEFAULT '',
  	"assets_avatar_id" integer,
  	"assets_cover_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "members_locales" (
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
  	"skills_id" integer,
  	"trainings_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "individuals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"first_name" varchar DEFAULT '' NOT NULL,
  	"last_name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_type" "enum_individuals_basics_type",
  	"basics_description" varchar DEFAULT '',
  	"basics_is_contact" boolean DEFAULT false,
  	"basics_gender" "enum_individuals_basics_gender",
  	"basics_pronouns" varchar DEFAULT '',
  	"assets_avatar_id" integer,
  	"assets_thumbnail_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "individuals_locales" (
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
  	"tags_id" integer
  );
  
  CREATE TABLE "organizations_details_benefits_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"description" varchar DEFAULT '',
  	"type" varchar DEFAULT ''
  );
  
  CREATE TABLE "organizations_details_websites_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"path" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "organizations_details_socials_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_organizations_details_socials_list_platform",
  	"username" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "organizations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"basics_type" "enum_organizations_basics_type",
  	"details_history" jsonb,
  	"details_founded" timestamp(3) with time zone,
  	"details_merged" timestamp(3) with time zone,
  	"details_rebranded" timestamp(3) with time zone,
  	"details_defunct" timestamp(3) with time zone,
  	"details_prestige" "enum_organizations_details_prestige",
  	"details_impact" "enum_organizations_details_impact",
  	"assets_logo_id" integer,
  	"assets_alt_logo_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "organizations_locales" (
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
  
  CREATE TABLE "meetups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_format" "enum_meetups_details_format",
  	"details_access" "enum_meetups_details_access",
  	"details_start_date" timestamp(3) with time zone NOT NULL,
  	"details_end_date" timestamp(3) with time zone,
  	"details_locations" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)',
  	"details_notes" varchar DEFAULT '',
  	"assets_thumbnail_id" integer,
  	"assets_cover_id" integer,
  	"assets_video_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "meetups_locales" (
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
  	"organizations_id" integer,
  	"leaders_id" integer,
  	"individuals_id" integer,
  	"drivers_id" integer,
  	"members_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "initiatives_details_expectations_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"type" "enum_initiatives_details_expectations_list_type",
  	"criteria" varchar DEFAULT '',
  	"statement" varchar DEFAULT ''
  );
  
  CREATE TABLE "initiatives" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_mission" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_start_date" timestamp(3) with time zone,
  	"details_end_date" timestamp(3) with time zone,
  	"details_locations" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)',
  	"assets_thumbnail_id" integer,
  	"assets_candid_id" integer,
  	"assets_cover_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "initiatives_locales" (
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
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "trainings_details_specifications_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"parameter" varchar DEFAULT '',
  	"value" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "trainings_details_expectations_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"type" "enum_trainings_details_expectations_list_type",
  	"criteria" varchar DEFAULT '',
  	"statement" varchar DEFAULT ''
  );
  
  CREATE TABLE "trainings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" jsonb,
  	"basics_intensity" "enum_trainings_basics_intensity",
  	"basics_format" "enum_trainings_basics_format",
  	"details_start_date" timestamp(3) with time zone,
  	"details_end_date" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "trainings_locales" (
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
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "vacancies_details_specifications_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"parameter" varchar DEFAULT '',
  	"value" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "vacancies_details_expectations_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"type" "enum_vacancies_details_expectations_list_type",
  	"criteria" varchar DEFAULT '',
  	"statement" varchar DEFAULT ''
  );
  
  CREATE TABLE "vacancies_details_positions_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar DEFAULT '',
  	"start" timestamp(3) with time zone,
  	"end" timestamp(3) with time zone
  );
  
  CREATE TABLE "vacancies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_title" varchar DEFAULT '' NOT NULL,
  	"basics_description" varchar DEFAULT '',
  	"details_department" varchar DEFAULT '',
  	"details_contract" "enum_vacancies_details_contract",
  	"details_locations" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)',
  	"assets_thumbnail_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "vacancies_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "vacancies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "onboardings_traits_checklist_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"task" varchar DEFAULT '',
  	"required" boolean DEFAULT false,
  	"completed" boolean DEFAULT false,
  	"due_date" timestamp(3) with time zone
  );
  
  CREATE TABLE "onboardings_traits_modules_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"duration" varchar DEFAULT '',
  	"type" varchar DEFAULT '',
  	"content" varchar DEFAULT ''
  );
  
  CREATE TABLE "onboardings_traits_quizzes_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar DEFAULT '',
  	"answer" varchar DEFAULT '',
  	"explanation" varchar DEFAULT ''
  );
  
  CREATE TABLE "onboardings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_type" "enum_onboardings_details_type",
  	"details_format" "enum_onboardings_details_format",
  	"details_status" "enum_onboardings_details_status",
  	"details_start_date" timestamp(3) with time zone,
  	"details_end_date" timestamp(3) with time zone,
  	"details_assigned_to_id" integer NOT NULL,
  	"details_assigned_by_id" integer,
  	"details_feedback" varchar DEFAULT '',
  	"details_notes" varchar DEFAULT '',
  	"assets_completion_certificate_id" integer,
  	"assets_thumbnail_id" integer,
  	"assets_cover_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "onboardings_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "onboardings_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "awards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_story" jsonb,
  	"details_awarded_date" timestamp(3) with time zone,
  	"details_awarded_location" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)',
  	"assets_thumbnail_id" integer,
  	"assets_candid_id" integer,
  	"assets_video_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "awards_locales" (
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
  	"tags_id" integer
  );
  
  CREATE TABLE "celebrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_exclusivity" "enum_celebrations_details_exclusivity",
  	"details_date_time" timestamp(3) with time zone,
  	"details_location" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)',
  	"details_story" jsonb,
  	"assets_thumbnail_id" integer,
  	"assets_video_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "celebrations_locales" (
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
  	"leaders_id" integer,
  	"drivers_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "interviews_details_tags_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT ''
  );
  
  CREATE TABLE "interviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"basics_summary" varchar DEFAULT '',
  	"details_format" "enum_interviews_details_format",
  	"details_language" varchar DEFAULT '',
  	"details_duration" numeric DEFAULT 0,
  	"details_recorded_date" timestamp(3) with time zone,
  	"details_published_date" timestamp(3) with time zone,
  	"details_status" "enum_interviews_details_status",
  	"details_access" "enum_interviews_details_access",
  	"details_interviewer_id" integer,
  	"details_interviewee_id" integer NOT NULL,
  	"details_session_id" integer,
  	"details_location" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)',
  	"details_notes" varchar DEFAULT '',
  	"assets_thumbnail_id" integer,
  	"assets_cover_id" integer,
  	"assets_video_id" integer,
  	"assets_audio_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "interviews_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "interviews_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "incidents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_date_time" timestamp(3) with time zone,
  	"details_story" jsonb,
  	"details_location" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)',
  	"assets_thumbnail_id" integer,
  	"assets_video_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "incidents_locales" (
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
  	"cars_id" integer,
  	"drivers_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "cars_details_classifications_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"criteria" varchar DEFAULT '',
  	"definition" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "cars_details_specifications_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"parameter" varchar DEFAULT '',
  	"value" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "cars" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_chassis" varchar DEFAULT '',
  	"basics_identifiers_model" varchar DEFAULT '',
  	"basics_identifiers_version" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_status" "enum_cars_details_status",
  	"details_history" jsonb,
  	"assets_avatar_id" integer,
  	"assets_thumbnail_id" integer,
  	"assets_cover_id" integer,
  	"assets_video_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "cars_locales" (
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
  	"organizations_id" integer,
  	"members_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "helmets_details_classifications_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"criteria" varchar DEFAULT '',
  	"definition" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "helmets_details_manufacturers_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "helmets" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_usage" "enum_helmets_details_usage",
  	"details_concept" varchar DEFAULT '',
  	"details_designer" varchar DEFAULT '',
  	"details_inspiration" varchar DEFAULT '',
  	"details_color" varchar DEFAULT '',
  	"details_branding" "enum_helmets_details_branding",
  	"details_style" "enum_helmets_details_style",
  	"details_material" "enum_helmets_details_material",
  	"details_year" timestamp(3) with time zone,
  	"assets_avatar_id" integer,
  	"assets_thumbnail_id" integer,
  	"assets_video_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "helmets_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "helmets_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "suits_details_manufacturers_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "suits" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_usage" "enum_suits_details_usage",
  	"details_durability" "enum_suits_details_durability",
  	"details_material" "enum_suits_details_material",
  	"details_appearance" "enum_suits_details_appearance",
  	"assets_thumbnail_id" integer,
  	"assets_video_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "suits_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "suits_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "garages_details_amenities_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "garages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_type" "enum_garages_details_type",
  	"details_capacity" numeric DEFAULT 0,
  	"details_size_sq_m" numeric DEFAULT 0,
  	"details_accessibility" "enum_garages_details_accessibility",
  	"details_start_date" timestamp(3) with time zone,
  	"details_end_date" timestamp(3) with time zone,
  	"details_location" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)',
  	"details_ownership_id" integer,
  	"details_history" jsonb,
  	"details_notes" varchar DEFAULT '',
  	"assets_thumbnail_id" integer,
  	"assets_cover_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "garages_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "garages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"organizations_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
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
  
  CREATE TABLE "designations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "designations_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "designations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "skills_details_specifications_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"parameter" varchar DEFAULT '',
  	"value" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "skills_details_features_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "skills" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_scale" "enum_skills_details_scale",
  	"details_depth" "enum_skills_details_depth",
  	"details_rarity" "enum_skills_details_rarity",
  	"details_complexity" "enum_skills_details_complexity",
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "skills_locales" (
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
  	"tags_id" integer
  );
  
  CREATE TABLE "statuses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "statuses_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "statuses_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "regulations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"basics_status" "enum_regulations_basics_status",
  	"basics_code" varchar DEFAULT '',
  	"basics_version" varchar DEFAULT '',
  	"basics_effective_date" timestamp(3) with time zone,
  	"basics_document_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "regulations_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "regulations_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "policies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"basics_privacy" jsonb,
  	"basics_cookies" jsonb,
  	"basics_version" varchar DEFAULT '',
  	"basics_effective_date" timestamp(3) with time zone,
  	"basics_last_reviewed" timestamp(3) with time zone,
  	"basics_document_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "policies_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "policies_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "statements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"basics_status" "enum_statements_basics_status",
  	"basics_statement" jsonb,
  	"basics_issued_date" timestamp(3) with time zone,
  	"basics_authority_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "statements_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "statements_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "slides_traits_tags_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT ''
  );
  
  CREATE TABLE "slides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"basics_story" jsonb,
  	"details_type" "enum_slides_details_type",
  	"details_orientation" "enum_slides_details_orientation",
  	"details_template" "enum_slides_details_template",
  	"details_transition" "enum_slides_details_transition",
  	"details_duration" numeric DEFAULT 0,
  	"details_order" numeric DEFAULT 0,
  	"details_notes" varchar DEFAULT '',
  	"traits_notes" varchar DEFAULT '',
  	"assets_background_id" integer,
  	"assets_thumbnail_id" integer,
  	"assets_foreground_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "slides_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "slides_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
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
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
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
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
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
  
  CREATE TABLE "countries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"code" varchar DEFAULT '' NOT NULL,
  	"basics_flag_id" integer,
  	"basics_description" varchar DEFAULT '',
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "countries_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "countries_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "plans_traits_milestones_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"due_date" timestamp(3) with time zone,
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "plans_traits_deliverables_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"type" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "plans_traits_risks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"likelihood" "enum_plans_traits_risks_list_likelihood",
  	"impact" "enum_plans_traits_risks_list_impact",
  	"mitigation" varchar DEFAULT ''
  );
  
  CREATE TABLE "plans_traits_kpis_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"target" varchar DEFAULT '',
  	"unit" varchar DEFAULT ''
  );
  
  CREATE TABLE "plans" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_vision" varchar DEFAULT '',
  	"details_mission" varchar DEFAULT '',
  	"details_scope" "enum_plans_details_scope",
  	"details_status" "enum_plans_details_status",
  	"details_priority" "enum_plans_details_priority",
  	"details_start_date" timestamp(3) with time zone,
  	"details_end_date" timestamp(3) with time zone,
  	"details_budget" numeric DEFAULT 0,
  	"details_currency" "enum_plans_details_currency",
  	"details_assigned_to_id" integer,
  	"details_notes" varchar DEFAULT '',
  	"assets_thumbnail_id" integer,
  	"assets_cover_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "plans_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "plans_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"plans_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "timelines_traits_milestones_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"date" timestamp(3) with time zone,
  	"description" varchar DEFAULT '',
  	"icon_id" integer
  );
  
  CREATE TABLE "timelines_traits_events_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '',
  	"date" timestamp(3) with time zone,
  	"description" varchar DEFAULT '',
  	"location" geometry(Point) DEFAULT 'SRID=4326;POINT(0 0)'
  );
  
  CREATE TABLE "timelines" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_scope" "enum_timelines_details_scope",
  	"details_status" "enum_timelines_details_status",
  	"details_start_date" timestamp(3) with time zone,
  	"details_end_date" timestamp(3) with time zone,
  	"details_color_scheme" "enum_timelines_details_color_scheme",
  	"details_orientation" "enum_timelines_details_orientation",
  	"details_notes" varchar DEFAULT '',
  	"assets_thumbnail_id" integer,
  	"assets_cover_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "timelines_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "timelines_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer,
  	"categories_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "programs_traits_eligibility_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"criteria" varchar DEFAULT '',
  	"value" varchar DEFAULT '',
  	"description" varchar DEFAULT ''
  );
  
  CREATE TABLE "programs_traits_curriculum_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"module_name" varchar DEFAULT '',
  	"duration" varchar DEFAULT '',
  	"deliverable" varchar DEFAULT ''
  );
  
  CREATE TABLE "programs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar DEFAULT '' NOT NULL,
  	"alias" varchar DEFAULT '',
  	"basics_identifiers_code" varchar DEFAULT '',
  	"basics_tagline" varchar DEFAULT '',
  	"basics_description" varchar DEFAULT '',
  	"details_objective" varchar DEFAULT '',
  	"details_type" "enum_programs_details_type",
  	"details_status" "enum_programs_details_status",
  	"details_duration" "enum_programs_details_duration",
  	"details_start_date" timestamp(3) with time zone,
  	"details_end_date" timestamp(3) with time zone,
  	"details_budget" numeric DEFAULT 0,
  	"details_outcomes" varchar DEFAULT '',
  	"details_notes" varchar DEFAULT '',
  	"assets_thumbnail_id" integer,
  	"assets_cover_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "programs_locales" (
  	"seo_title" varchar,
  	"seo_image_id" integer,
  	"seo_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "programs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"leaders_id" integer,
  	"drivers_id" integer,
  	"organizations_id" integer,
  	"media_id" integer,
  	"categories_id" integer,
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
  	"circuits_id" integer,
  	"championships_id" integer,
  	"races_id" integer,
  	"teams_id" integer,
  	"drivers_id" integer,
  	"leaders_id" integer,
  	"members_id" integer,
  	"individuals_id" integer,
  	"organizations_id" integer,
  	"users_id" integer,
  	"meetups_id" integer,
  	"initiatives_id" integer,
  	"trainings_id" integer,
  	"vacancies_id" integer,
  	"onboardings_id" integer,
  	"awards_id" integer,
  	"celebrations_id" integer,
  	"interviews_id" integer,
  	"incidents_id" integer,
  	"cars_id" integer,
  	"helmets_id" integer,
  	"suits_id" integer,
  	"garages_id" integer,
  	"media_id" integer,
  	"designations_id" integer,
  	"skills_id" integer,
  	"statuses_id" integer,
  	"regulations_id" integer,
  	"policies_id" integer,
  	"statements_id" integer,
  	"slides_id" integer,
  	"pages_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"countries_id" integer,
  	"plans_id" integer,
  	"timelines_id" integer,
  	"programs_id" integer
  );
  
  CREATE TABLE "payload_mcp_api_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"series_find" boolean DEFAULT false,
  	"series_create" boolean DEFAULT false,
  	"series_update" boolean DEFAULT false,
  	"series_delete" boolean DEFAULT false,
  	"seasons_find" boolean DEFAULT false,
  	"seasons_create" boolean DEFAULT false,
  	"seasons_update" boolean DEFAULT false,
  	"seasons_delete" boolean DEFAULT false,
  	"events_find" boolean DEFAULT false,
  	"events_create" boolean DEFAULT false,
  	"events_update" boolean DEFAULT false,
  	"events_delete" boolean DEFAULT false,
  	"sessions_find" boolean DEFAULT false,
  	"sessions_create" boolean DEFAULT false,
  	"sessions_update" boolean DEFAULT false,
  	"sessions_delete" boolean DEFAULT false,
  	"entries_find" boolean DEFAULT false,
  	"entries_create" boolean DEFAULT false,
  	"entries_update" boolean DEFAULT false,
  	"entries_delete" boolean DEFAULT false,
  	"results_find" boolean DEFAULT false,
  	"results_create" boolean DEFAULT false,
  	"results_update" boolean DEFAULT false,
  	"results_delete" boolean DEFAULT false,
  	"points_find" boolean DEFAULT false,
  	"points_create" boolean DEFAULT false,
  	"points_update" boolean DEFAULT false,
  	"points_delete" boolean DEFAULT false,
  	"circuits_find" boolean DEFAULT false,
  	"circuits_create" boolean DEFAULT false,
  	"circuits_update" boolean DEFAULT false,
  	"circuits_delete" boolean DEFAULT false,
  	"championships_find" boolean DEFAULT false,
  	"championships_create" boolean DEFAULT false,
  	"championships_update" boolean DEFAULT false,
  	"championships_delete" boolean DEFAULT false,
  	"races_find" boolean DEFAULT false,
  	"races_create" boolean DEFAULT false,
  	"races_update" boolean DEFAULT false,
  	"races_delete" boolean DEFAULT false,
  	"teams_find" boolean DEFAULT false,
  	"teams_create" boolean DEFAULT false,
  	"teams_update" boolean DEFAULT false,
  	"teams_delete" boolean DEFAULT false,
  	"drivers_find" boolean DEFAULT false,
  	"drivers_create" boolean DEFAULT false,
  	"drivers_update" boolean DEFAULT false,
  	"drivers_delete" boolean DEFAULT false,
  	"leaders_find" boolean DEFAULT false,
  	"leaders_create" boolean DEFAULT false,
  	"leaders_update" boolean DEFAULT false,
  	"leaders_delete" boolean DEFAULT false,
  	"members_find" boolean DEFAULT false,
  	"members_create" boolean DEFAULT false,
  	"members_update" boolean DEFAULT false,
  	"members_delete" boolean DEFAULT false,
  	"individuals_find" boolean DEFAULT false,
  	"individuals_create" boolean DEFAULT false,
  	"individuals_update" boolean DEFAULT false,
  	"individuals_delete" boolean DEFAULT false,
  	"organizations_find" boolean DEFAULT false,
  	"organizations_create" boolean DEFAULT false,
  	"organizations_update" boolean DEFAULT false,
  	"organizations_delete" boolean DEFAULT false,
  	"users_find" boolean DEFAULT false,
  	"users_create" boolean DEFAULT false,
  	"users_update" boolean DEFAULT false,
  	"users_delete" boolean DEFAULT false,
  	"meetups_find" boolean DEFAULT false,
  	"meetups_create" boolean DEFAULT false,
  	"meetups_update" boolean DEFAULT false,
  	"meetups_delete" boolean DEFAULT false,
  	"initiatives_find" boolean DEFAULT false,
  	"initiatives_create" boolean DEFAULT false,
  	"initiatives_update" boolean DEFAULT false,
  	"initiatives_delete" boolean DEFAULT false,
  	"trainings_find" boolean DEFAULT false,
  	"trainings_create" boolean DEFAULT false,
  	"trainings_update" boolean DEFAULT false,
  	"trainings_delete" boolean DEFAULT false,
  	"vacancies_find" boolean DEFAULT false,
  	"vacancies_create" boolean DEFAULT false,
  	"vacancies_update" boolean DEFAULT false,
  	"vacancies_delete" boolean DEFAULT false,
  	"onboardings_find" boolean DEFAULT false,
  	"onboardings_create" boolean DEFAULT false,
  	"onboardings_update" boolean DEFAULT false,
  	"onboardings_delete" boolean DEFAULT false,
  	"awards_find" boolean DEFAULT false,
  	"awards_create" boolean DEFAULT false,
  	"awards_update" boolean DEFAULT false,
  	"awards_delete" boolean DEFAULT false,
  	"celebrations_find" boolean DEFAULT false,
  	"celebrations_create" boolean DEFAULT false,
  	"celebrations_update" boolean DEFAULT false,
  	"celebrations_delete" boolean DEFAULT false,
  	"interviews_find" boolean DEFAULT false,
  	"interviews_create" boolean DEFAULT false,
  	"interviews_update" boolean DEFAULT false,
  	"interviews_delete" boolean DEFAULT false,
  	"incidents_find" boolean DEFAULT false,
  	"incidents_create" boolean DEFAULT false,
  	"incidents_update" boolean DEFAULT false,
  	"incidents_delete" boolean DEFAULT false,
  	"cars_find" boolean DEFAULT false,
  	"cars_create" boolean DEFAULT false,
  	"cars_update" boolean DEFAULT false,
  	"cars_delete" boolean DEFAULT false,
  	"helmets_find" boolean DEFAULT false,
  	"helmets_create" boolean DEFAULT false,
  	"helmets_update" boolean DEFAULT false,
  	"helmets_delete" boolean DEFAULT false,
  	"suits_find" boolean DEFAULT false,
  	"suits_create" boolean DEFAULT false,
  	"suits_update" boolean DEFAULT false,
  	"suits_delete" boolean DEFAULT false,
  	"garages_find" boolean DEFAULT false,
  	"garages_create" boolean DEFAULT false,
  	"garages_update" boolean DEFAULT false,
  	"garages_delete" boolean DEFAULT false,
  	"media_find" boolean DEFAULT false,
  	"media_create" boolean DEFAULT false,
  	"media_update" boolean DEFAULT false,
  	"media_delete" boolean DEFAULT false,
  	"designations_find" boolean DEFAULT false,
  	"designations_create" boolean DEFAULT false,
  	"designations_update" boolean DEFAULT false,
  	"designations_delete" boolean DEFAULT false,
  	"skills_find" boolean DEFAULT false,
  	"skills_create" boolean DEFAULT false,
  	"skills_update" boolean DEFAULT false,
  	"skills_delete" boolean DEFAULT false,
  	"statuses_find" boolean DEFAULT false,
  	"statuses_create" boolean DEFAULT false,
  	"statuses_update" boolean DEFAULT false,
  	"statuses_delete" boolean DEFAULT false,
  	"regulations_find" boolean DEFAULT false,
  	"regulations_create" boolean DEFAULT false,
  	"regulations_update" boolean DEFAULT false,
  	"regulations_delete" boolean DEFAULT false,
  	"policies_find" boolean DEFAULT false,
  	"policies_create" boolean DEFAULT false,
  	"policies_update" boolean DEFAULT false,
  	"policies_delete" boolean DEFAULT false,
  	"statements_find" boolean DEFAULT false,
  	"statements_create" boolean DEFAULT false,
  	"statements_update" boolean DEFAULT false,
  	"statements_delete" boolean DEFAULT false,
  	"slides_find" boolean DEFAULT false,
  	"slides_create" boolean DEFAULT false,
  	"slides_update" boolean DEFAULT false,
  	"slides_delete" boolean DEFAULT false,
  	"pages_find" boolean DEFAULT false,
  	"pages_create" boolean DEFAULT false,
  	"pages_update" boolean DEFAULT false,
  	"pages_delete" boolean DEFAULT false,
  	"categories_find" boolean DEFAULT false,
  	"categories_create" boolean DEFAULT false,
  	"categories_update" boolean DEFAULT false,
  	"categories_delete" boolean DEFAULT false,
  	"tags_find" boolean DEFAULT false,
  	"tags_create" boolean DEFAULT false,
  	"tags_update" boolean DEFAULT false,
  	"tags_delete" boolean DEFAULT false,
  	"countries_find" boolean DEFAULT false,
  	"countries_create" boolean DEFAULT false,
  	"countries_update" boolean DEFAULT false,
  	"countries_delete" boolean DEFAULT false,
  	"plans_find" boolean DEFAULT false,
  	"plans_create" boolean DEFAULT false,
  	"plans_update" boolean DEFAULT false,
  	"plans_delete" boolean DEFAULT false,
  	"timelines_find" boolean DEFAULT false,
  	"timelines_create" boolean DEFAULT false,
  	"timelines_update" boolean DEFAULT false,
  	"timelines_delete" boolean DEFAULT false,
  	"programs_find" boolean DEFAULT false,
  	"programs_create" boolean DEFAULT false,
  	"programs_update" boolean DEFAULT false,
  	"programs_delete" boolean DEFAULT false,
  	"header_find" boolean DEFAULT false,
  	"header_update" boolean DEFAULT false,
  	"footer_find" boolean DEFAULT false,
  	"footer_update" boolean DEFAULT false,
  	"identity_find" boolean DEFAULT false,
  	"identity_update" boolean DEFAULT false,
  	"announcements_find" boolean DEFAULT false,
  	"announcements_update" boolean DEFAULT false,
  	"questions_find" boolean DEFAULT false,
  	"questions_update" boolean DEFAULT false,
  	"socials_find" boolean DEFAULT false,
  	"socials_update" boolean DEFAULT false,
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
  	"circuits_id" integer,
  	"championships_id" integer,
  	"races_id" integer,
  	"teams_id" integer,
  	"drivers_id" integer,
  	"leaders_id" integer,
  	"members_id" integer,
  	"individuals_id" integer,
  	"organizations_id" integer,
  	"users_id" integer,
  	"meetups_id" integer,
  	"initiatives_id" integer,
  	"trainings_id" integer,
  	"vacancies_id" integer,
  	"onboardings_id" integer,
  	"awards_id" integer,
  	"celebrations_id" integer,
  	"interviews_id" integer,
  	"incidents_id" integer,
  	"cars_id" integer,
  	"helmets_id" integer,
  	"suits_id" integer,
  	"garages_id" integer,
  	"media_id" integer,
  	"designations_id" integer,
  	"skills_id" integer,
  	"statuses_id" integer,
  	"regulations_id" integer,
  	"policies_id" integer,
  	"statements_id" integer,
  	"slides_id" integer,
  	"pages_id" integer,
  	"categories_id" integer,
  	"tags_id" integer,
  	"countries_id" integer,
  	"plans_id" integer,
  	"timelines_id" integer,
  	"programs_id" integer,
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
  
  CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "header_utility_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link" varchar NOT NULL,
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
  	"pages_id" integer
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
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "identity_values_locales" (
  	"value" varchar NOT NULL,
  	"description" varchar,
  	"principle_name" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "identity_voice_tone_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "identity_voice_tone_keywords_locales" (
  	"keyword" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "identity_sustainability_initiative_names" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "identity_sustainability_initiative_names_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "identity" (
  	"id" serial PRIMARY KEY NOT NULL,
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
  	"story" jsonb,
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
  	"leaders_id" integer
  );
  
  CREATE TABLE "announcements_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" "enum_announcements_items_type" DEFAULT 'info' NOT NULL,
  	"link_enable" boolean DEFAULT false,
  	"link_label" varchar,
  	"link_url" varchar,
  	"from" timestamp(3) with time zone,
  	"until" timestamp(3) with time zone,
  	"audience" "enum_announcements_items_audience" DEFAULT 'everyone',
  	"dismissible" boolean DEFAULT true,
  	"active" boolean DEFAULT true
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
  	"related_page" varchar
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
  
  CREATE TABLE "socials_accounts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_socials_accounts_platform" NOT NULL,
  	"label" varchar NOT NULL,
  	"handle" varchar,
  	"url" varchar NOT NULL,
  	"visible" boolean DEFAULT true
  );
  
  CREATE TABLE "socials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "series" ADD CONSTRAINT "series_details_predecessor_id_series_id_fk" FOREIGN KEY ("details_predecessor_id") REFERENCES "public"."series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series" ADD CONSTRAINT "series_details_successor_id_series_id_fk" FOREIGN KEY ("details_successor_id") REFERENCES "public"."series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series" ADD CONSTRAINT "series_assets_logo_id_media_id_fk" FOREIGN KEY ("assets_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series" ADD CONSTRAINT "series_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series" ADD CONSTRAINT "series_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series_locales" ADD CONSTRAINT "series_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "series_locales" ADD CONSTRAINT "series_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "series_rels" ADD CONSTRAINT "series_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons" ADD CONSTRAINT "seasons_details_series_id_series_id_fk" FOREIGN KEY ("details_series_id") REFERENCES "public"."series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seasons" ADD CONSTRAINT "seasons_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seasons" ADD CONSTRAINT "seasons_assets_trailer_id_media_id_fk" FOREIGN KEY ("assets_trailer_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seasons_locales" ADD CONSTRAINT "seasons_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "seasons_locales" ADD CONSTRAINT "seasons_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seasons_rels" ADD CONSTRAINT "seasons_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_details_season_id_seasons_id_fk" FOREIGN KEY ("details_season_id") REFERENCES "public"."seasons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_assets_poster_id_media_id_fk" FOREIGN KEY ("assets_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions" ADD CONSTRAINT "sessions_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sessions_locales" ADD CONSTRAINT "sessions_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "sessions_locales" ADD CONSTRAINT "sessions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sessions_rels" ADD CONSTRAINT "sessions_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries" ADD CONSTRAINT "entries_details_session_id_sessions_id_fk" FOREIGN KEY ("details_session_id") REFERENCES "public"."sessions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entries" ADD CONSTRAINT "entries_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entries_locales" ADD CONSTRAINT "entries_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "entries_locales" ADD CONSTRAINT "entries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_rels" ADD CONSTRAINT "entries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_rels" ADD CONSTRAINT "entries_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_rels" ADD CONSTRAINT "entries_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "entries_rels" ADD CONSTRAINT "entries_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_locales" ADD CONSTRAINT "results_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "results_locales" ADD CONSTRAINT "results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_rels" ADD CONSTRAINT "results_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_rels" ADD CONSTRAINT "results_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "results_rels" ADD CONSTRAINT "results_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points_locales" ADD CONSTRAINT "points_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "points_locales" ADD CONSTRAINT "points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points_rels" ADD CONSTRAINT "points_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points_rels" ADD CONSTRAINT "points_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "points_rels" ADD CONSTRAINT "points_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "circuits_details_renovated_list" ADD CONSTRAINT "circuits_details_renovated_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."circuits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "circuits" ADD CONSTRAINT "circuits_details_country_id_countries_id_fk" FOREIGN KEY ("details_country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "circuits" ADD CONSTRAINT "circuits_details_owner_id_organizations_id_fk" FOREIGN KEY ("details_owner_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "circuits" ADD CONSTRAINT "circuits_details_operator_id_organizations_id_fk" FOREIGN KEY ("details_operator_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "circuits" ADD CONSTRAINT "circuits_metrics_record_lap_driver_id_drivers_id_fk" FOREIGN KEY ("metrics_record_lap_driver_id") REFERENCES "public"."drivers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "circuits" ADD CONSTRAINT "circuits_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "circuits" ADD CONSTRAINT "circuits_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "circuits" ADD CONSTRAINT "circuits_assets_circuit_map_id_media_id_fk" FOREIGN KEY ("assets_circuit_map_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "circuits" ADD CONSTRAINT "circuits_assets_video_id_media_id_fk" FOREIGN KEY ("assets_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "circuits_locales" ADD CONSTRAINT "circuits_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "circuits_locales" ADD CONSTRAINT "circuits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."circuits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "circuits_rels" ADD CONSTRAINT "circuits_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."circuits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "circuits_rels" ADD CONSTRAINT "circuits_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "circuits_rels" ADD CONSTRAINT "circuits_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "circuits_rels" ADD CONSTRAINT "circuits_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "championships" ADD CONSTRAINT "championships_details_regulations_id_regulations_id_fk" FOREIGN KEY ("details_regulations_id") REFERENCES "public"."regulations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "championships" ADD CONSTRAINT "championships_details_points_system_id_points_id_fk" FOREIGN KEY ("details_points_system_id") REFERENCES "public"."points"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "championships" ADD CONSTRAINT "championships_details_season_id_seasons_id_fk" FOREIGN KEY ("details_season_id") REFERENCES "public"."seasons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "championships" ADD CONSTRAINT "championships_details_series_id_series_id_fk" FOREIGN KEY ("details_series_id") REFERENCES "public"."series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "championships" ADD CONSTRAINT "championships_details_winner_id_drivers_id_fk" FOREIGN KEY ("details_winner_id") REFERENCES "public"."drivers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "championships" ADD CONSTRAINT "championships_details_runner_up_id_drivers_id_fk" FOREIGN KEY ("details_runner_up_id") REFERENCES "public"."drivers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "championships" ADD CONSTRAINT "championships_details_third_place_id_drivers_id_fk" FOREIGN KEY ("details_third_place_id") REFERENCES "public"."drivers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "championships" ADD CONSTRAINT "championships_assets_trophy_id_media_id_fk" FOREIGN KEY ("assets_trophy_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "championships" ADD CONSTRAINT "championships_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "championships" ADD CONSTRAINT "championships_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "championships" ADD CONSTRAINT "championships_assets_video_id_media_id_fk" FOREIGN KEY ("assets_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "championships_locales" ADD CONSTRAINT "championships_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "championships_locales" ADD CONSTRAINT "championships_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."championships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "championships_rels" ADD CONSTRAINT "championships_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."championships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "championships_rels" ADD CONSTRAINT "championships_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "championships_rels" ADD CONSTRAINT "championships_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "championships_rels" ADD CONSTRAINT "championships_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "races" ADD CONSTRAINT "races_details_event_id_events_id_fk" FOREIGN KEY ("details_event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "races" ADD CONSTRAINT "races_details_season_id_seasons_id_fk" FOREIGN KEY ("details_season_id") REFERENCES "public"."seasons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "races" ADD CONSTRAINT "races_details_series_id_series_id_fk" FOREIGN KEY ("details_series_id") REFERENCES "public"."series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "races" ADD CONSTRAINT "races_details_circuit_id_circuits_id_fk" FOREIGN KEY ("details_circuit_id") REFERENCES "public"."circuits"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "races" ADD CONSTRAINT "races_details_winner_id_drivers_id_fk" FOREIGN KEY ("details_winner_id") REFERENCES "public"."drivers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "races" ADD CONSTRAINT "races_details_pole_position_id_entries_id_fk" FOREIGN KEY ("details_pole_position_id") REFERENCES "public"."entries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "races" ADD CONSTRAINT "races_details_fastest_lap_id_entries_id_fk" FOREIGN KEY ("details_fastest_lap_id") REFERENCES "public"."entries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "races" ADD CONSTRAINT "races_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "races" ADD CONSTRAINT "races_assets_poster_id_media_id_fk" FOREIGN KEY ("assets_poster_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "races" ADD CONSTRAINT "races_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "races" ADD CONSTRAINT "races_assets_video_id_media_id_fk" FOREIGN KEY ("assets_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "races_locales" ADD CONSTRAINT "races_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "races_locales" ADD CONSTRAINT "races_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."races"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "races_rels" ADD CONSTRAINT "races_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."races"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "races_rels" ADD CONSTRAINT "races_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "races_rels" ADD CONSTRAINT "races_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "races_rels" ADD CONSTRAINT "races_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "teams" ADD CONSTRAINT "teams_details_country_id_countries_id_fk" FOREIGN KEY ("details_country_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "teams" ADD CONSTRAINT "teams_assets_logo_id_media_id_fk" FOREIGN KEY ("assets_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "teams" ADD CONSTRAINT "teams_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "teams_locales" ADD CONSTRAINT "teams_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "teams_locales" ADD CONSTRAINT "teams_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "teams_rels" ADD CONSTRAINT "teams_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "teams_rels" ADD CONSTRAINT "teams_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "teams_rels" ADD CONSTRAINT "teams_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "teams_rels" ADD CONSTRAINT "teams_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_details_addresses_list" ADD CONSTRAINT "drivers_details_addresses_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_details_websites_list" ADD CONSTRAINT "drivers_details_websites_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_details_socials_list" ADD CONSTRAINT "drivers_details_socials_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_assets_gallery_list" ADD CONSTRAINT "drivers_assets_gallery_list_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers_assets_gallery_list" ADD CONSTRAINT "drivers_assets_gallery_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers" ADD CONSTRAINT "drivers_basics_nationality_id_countries_id_fk" FOREIGN KEY ("basics_nationality_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers" ADD CONSTRAINT "drivers_assets_avatar_id_media_id_fk" FOREIGN KEY ("assets_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers" ADD CONSTRAINT "drivers_assets_autograph_id_media_id_fk" FOREIGN KEY ("assets_autograph_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers" ADD CONSTRAINT "drivers_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers_locales" ADD CONSTRAINT "drivers_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "drivers_locales" ADD CONSTRAINT "drivers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_points_fk" FOREIGN KEY ("points_id") REFERENCES "public"."points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_results_fk" FOREIGN KEY ("results_id") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "drivers_rels" ADD CONSTRAINT "drivers_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_details_principles_list" ADD CONSTRAINT "leaders_details_principles_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_details_websites_list" ADD CONSTRAINT "leaders_details_websites_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_details_socials_list" ADD CONSTRAINT "leaders_details_socials_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders" ADD CONSTRAINT "leaders_basics_nationality_id_countries_id_fk" FOREIGN KEY ("basics_nationality_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leaders" ADD CONSTRAINT "leaders_assets_avatar_id_media_id_fk" FOREIGN KEY ("assets_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leaders" ADD CONSTRAINT "leaders_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leaders_locales" ADD CONSTRAINT "leaders_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "leaders_locales" ADD CONSTRAINT "leaders_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_designations_fk" FOREIGN KEY ("designations_id") REFERENCES "public"."designations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "leaders_rels" ADD CONSTRAINT "leaders_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_details_addresses_list" ADD CONSTRAINT "members_details_addresses_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members" ADD CONSTRAINT "members_basics_nationality_id_countries_id_fk" FOREIGN KEY ("basics_nationality_id") REFERENCES "public"."countries"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "members" ADD CONSTRAINT "members_assets_avatar_id_media_id_fk" FOREIGN KEY ("assets_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "members" ADD CONSTRAINT "members_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "members_locales" ADD CONSTRAINT "members_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "members_locales" ADD CONSTRAINT "members_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_trainings_fk" FOREIGN KEY ("trainings_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "members_rels" ADD CONSTRAINT "members_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "individuals" ADD CONSTRAINT "individuals_assets_avatar_id_media_id_fk" FOREIGN KEY ("assets_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "individuals" ADD CONSTRAINT "individuals_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "individuals_locales" ADD CONSTRAINT "individuals_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "individuals_locales" ADD CONSTRAINT "individuals_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "individuals_rels" ADD CONSTRAINT "individuals_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "individuals_rels" ADD CONSTRAINT "individuals_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "individuals_rels" ADD CONSTRAINT "individuals_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_details_benefits_list" ADD CONSTRAINT "organizations_details_benefits_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_details_websites_list" ADD CONSTRAINT "organizations_details_websites_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_details_socials_list" ADD CONSTRAINT "organizations_details_socials_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations" ADD CONSTRAINT "organizations_assets_logo_id_media_id_fk" FOREIGN KEY ("assets_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organizations" ADD CONSTRAINT "organizations_assets_alt_logo_id_media_id_fk" FOREIGN KEY ("assets_alt_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organizations_locales" ADD CONSTRAINT "organizations_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "organizations_locales" ADD CONSTRAINT "organizations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "organizations_rels" ADD CONSTRAINT "organizations_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups" ADD CONSTRAINT "meetups_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meetups" ADD CONSTRAINT "meetups_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meetups" ADD CONSTRAINT "meetups_assets_video_id_media_id_fk" FOREIGN KEY ("assets_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meetups_locales" ADD CONSTRAINT "meetups_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "meetups_locales" ADD CONSTRAINT "meetups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."meetups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."meetups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "meetups_rels" ADD CONSTRAINT "meetups_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_details_expectations_list" ADD CONSTRAINT "initiatives_details_expectations_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives" ADD CONSTRAINT "initiatives_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "initiatives" ADD CONSTRAINT "initiatives_assets_candid_id_media_id_fk" FOREIGN KEY ("assets_candid_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "initiatives" ADD CONSTRAINT "initiatives_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "initiatives_locales" ADD CONSTRAINT "initiatives_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "initiatives_locales" ADD CONSTRAINT "initiatives_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "initiatives_rels" ADD CONSTRAINT "initiatives_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_details_specifications_list" ADD CONSTRAINT "trainings_details_specifications_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_details_expectations_list" ADD CONSTRAINT "trainings_details_expectations_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_locales" ADD CONSTRAINT "trainings_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "trainings_locales" ADD CONSTRAINT "trainings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trainings_rels" ADD CONSTRAINT "trainings_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_details_specifications_list" ADD CONSTRAINT "vacancies_details_specifications_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_details_expectations_list" ADD CONSTRAINT "vacancies_details_expectations_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_details_positions_list" ADD CONSTRAINT "vacancies_details_positions_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies" ADD CONSTRAINT "vacancies_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vacancies_locales" ADD CONSTRAINT "vacancies_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vacancies_locales" ADD CONSTRAINT "vacancies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_rels" ADD CONSTRAINT "vacancies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_rels" ADD CONSTRAINT "vacancies_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vacancies_rels" ADD CONSTRAINT "vacancies_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "onboardings_traits_checklist_list" ADD CONSTRAINT "onboardings_traits_checklist_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."onboardings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "onboardings_traits_modules_list" ADD CONSTRAINT "onboardings_traits_modules_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."onboardings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "onboardings_traits_quizzes_list" ADD CONSTRAINT "onboardings_traits_quizzes_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."onboardings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "onboardings" ADD CONSTRAINT "onboardings_details_assigned_to_id_individuals_id_fk" FOREIGN KEY ("details_assigned_to_id") REFERENCES "public"."individuals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "onboardings" ADD CONSTRAINT "onboardings_details_assigned_by_id_members_id_fk" FOREIGN KEY ("details_assigned_by_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "onboardings" ADD CONSTRAINT "onboardings_assets_completion_certificate_id_media_id_fk" FOREIGN KEY ("assets_completion_certificate_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "onboardings" ADD CONSTRAINT "onboardings_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "onboardings" ADD CONSTRAINT "onboardings_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "onboardings_locales" ADD CONSTRAINT "onboardings_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "onboardings_locales" ADD CONSTRAINT "onboardings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."onboardings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "onboardings_rels" ADD CONSTRAINT "onboardings_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."onboardings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "onboardings_rels" ADD CONSTRAINT "onboardings_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "onboardings_rels" ADD CONSTRAINT "onboardings_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "onboardings_rels" ADD CONSTRAINT "onboardings_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_assets_candid_id_media_id_fk" FOREIGN KEY ("assets_candid_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_assets_video_id_media_id_fk" FOREIGN KEY ("assets_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards_locales" ADD CONSTRAINT "awards_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards_locales" ADD CONSTRAINT "awards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations" ADD CONSTRAINT "celebrations_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "celebrations" ADD CONSTRAINT "celebrations_assets_video_id_media_id_fk" FOREIGN KEY ("assets_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "celebrations_locales" ADD CONSTRAINT "celebrations_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "celebrations_locales" ADD CONSTRAINT "celebrations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."celebrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."celebrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "celebrations_rels" ADD CONSTRAINT "celebrations_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "interviews_details_tags_list" ADD CONSTRAINT "interviews_details_tags_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."interviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "interviews" ADD CONSTRAINT "interviews_details_interviewer_id_individuals_id_fk" FOREIGN KEY ("details_interviewer_id") REFERENCES "public"."individuals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "interviews" ADD CONSTRAINT "interviews_details_interviewee_id_individuals_id_fk" FOREIGN KEY ("details_interviewee_id") REFERENCES "public"."individuals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "interviews" ADD CONSTRAINT "interviews_details_session_id_sessions_id_fk" FOREIGN KEY ("details_session_id") REFERENCES "public"."sessions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "interviews" ADD CONSTRAINT "interviews_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "interviews" ADD CONSTRAINT "interviews_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "interviews" ADD CONSTRAINT "interviews_assets_video_id_media_id_fk" FOREIGN KEY ("assets_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "interviews" ADD CONSTRAINT "interviews_assets_audio_id_media_id_fk" FOREIGN KEY ("assets_audio_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "interviews_locales" ADD CONSTRAINT "interviews_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "interviews_locales" ADD CONSTRAINT "interviews_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."interviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "interviews_rels" ADD CONSTRAINT "interviews_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."interviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "interviews_rels" ADD CONSTRAINT "interviews_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "interviews_rels" ADD CONSTRAINT "interviews_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "interviews_rels" ADD CONSTRAINT "interviews_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents" ADD CONSTRAINT "incidents_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incidents" ADD CONSTRAINT "incidents_assets_video_id_media_id_fk" FOREIGN KEY ("assets_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incidents_locales" ADD CONSTRAINT "incidents_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "incidents_locales" ADD CONSTRAINT "incidents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "incidents_rels" ADD CONSTRAINT "incidents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_details_classifications_list" ADD CONSTRAINT "cars_details_classifications_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_details_specifications_list" ADD CONSTRAINT "cars_details_specifications_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars" ADD CONSTRAINT "cars_assets_avatar_id_media_id_fk" FOREIGN KEY ("assets_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars" ADD CONSTRAINT "cars_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars" ADD CONSTRAINT "cars_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars" ADD CONSTRAINT "cars_assets_video_id_media_id_fk" FOREIGN KEY ("assets_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars_locales" ADD CONSTRAINT "cars_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cars_locales" ADD CONSTRAINT "cars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cars_rels" ADD CONSTRAINT "cars_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "helmets_details_classifications_list" ADD CONSTRAINT "helmets_details_classifications_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."helmets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "helmets_details_manufacturers_list" ADD CONSTRAINT "helmets_details_manufacturers_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."helmets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "helmets" ADD CONSTRAINT "helmets_assets_avatar_id_media_id_fk" FOREIGN KEY ("assets_avatar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "helmets" ADD CONSTRAINT "helmets_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "helmets" ADD CONSTRAINT "helmets_assets_video_id_media_id_fk" FOREIGN KEY ("assets_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "helmets_locales" ADD CONSTRAINT "helmets_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "helmets_locales" ADD CONSTRAINT "helmets_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."helmets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "helmets_rels" ADD CONSTRAINT "helmets_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."helmets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "helmets_rels" ADD CONSTRAINT "helmets_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "helmets_rels" ADD CONSTRAINT "helmets_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "helmets_rels" ADD CONSTRAINT "helmets_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "suits_details_manufacturers_list" ADD CONSTRAINT "suits_details_manufacturers_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."suits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "suits" ADD CONSTRAINT "suits_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "suits" ADD CONSTRAINT "suits_assets_video_id_media_id_fk" FOREIGN KEY ("assets_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "suits_locales" ADD CONSTRAINT "suits_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "suits_locales" ADD CONSTRAINT "suits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."suits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "suits_rels" ADD CONSTRAINT "suits_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."suits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "suits_rels" ADD CONSTRAINT "suits_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "suits_rels" ADD CONSTRAINT "suits_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "suits_rels" ADD CONSTRAINT "suits_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garages_details_amenities_list" ADD CONSTRAINT "garages_details_amenities_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garages" ADD CONSTRAINT "garages_details_ownership_id_organizations_id_fk" FOREIGN KEY ("details_ownership_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "garages" ADD CONSTRAINT "garages_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "garages" ADD CONSTRAINT "garages_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "garages_locales" ADD CONSTRAINT "garages_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "garages_locales" ADD CONSTRAINT "garages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."garages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garages_rels" ADD CONSTRAINT "garages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."garages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garages_rels" ADD CONSTRAINT "garages_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garages_rels" ADD CONSTRAINT "garages_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garages_rels" ADD CONSTRAINT "garages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "garages_rels" ADD CONSTRAINT "garages_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designations_locales" ADD CONSTRAINT "designations_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "designations_locales" ADD CONSTRAINT "designations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."designations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designations_rels" ADD CONSTRAINT "designations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."designations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designations_rels" ADD CONSTRAINT "designations_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "designations_rels" ADD CONSTRAINT "designations_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_details_specifications_list" ADD CONSTRAINT "skills_details_specifications_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_details_features_list" ADD CONSTRAINT "skills_details_features_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_locales" ADD CONSTRAINT "skills_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "skills_locales" ADD CONSTRAINT "skills_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "skills_rels" ADD CONSTRAINT "skills_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "statuses_locales" ADD CONSTRAINT "statuses_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "statuses_locales" ADD CONSTRAINT "statuses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."statuses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "statuses_rels" ADD CONSTRAINT "statuses_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."statuses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "statuses_rels" ADD CONSTRAINT "statuses_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "statuses_rels" ADD CONSTRAINT "statuses_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "regulations" ADD CONSTRAINT "regulations_basics_document_id_media_id_fk" FOREIGN KEY ("basics_document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "regulations_locales" ADD CONSTRAINT "regulations_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "regulations_locales" ADD CONSTRAINT "regulations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."regulations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "regulations_rels" ADD CONSTRAINT "regulations_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."regulations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "regulations_rels" ADD CONSTRAINT "regulations_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "regulations_rels" ADD CONSTRAINT "regulations_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policies" ADD CONSTRAINT "policies_basics_document_id_media_id_fk" FOREIGN KEY ("basics_document_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "policies_locales" ADD CONSTRAINT "policies_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "policies_locales" ADD CONSTRAINT "policies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."policies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policies_rels" ADD CONSTRAINT "policies_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."policies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policies_rels" ADD CONSTRAINT "policies_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policies_rels" ADD CONSTRAINT "policies_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "statements" ADD CONSTRAINT "statements_basics_authority_id_organizations_id_fk" FOREIGN KEY ("basics_authority_id") REFERENCES "public"."organizations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "statements_locales" ADD CONSTRAINT "statements_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "statements_locales" ADD CONSTRAINT "statements_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "statements_rels" ADD CONSTRAINT "statements_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "statements_rels" ADD CONSTRAINT "statements_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "statements_rels" ADD CONSTRAINT "statements_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "slides_traits_tags_list" ADD CONSTRAINT "slides_traits_tags_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "slides" ADD CONSTRAINT "slides_assets_background_id_media_id_fk" FOREIGN KEY ("assets_background_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "slides" ADD CONSTRAINT "slides_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "slides" ADD CONSTRAINT "slides_assets_foreground_id_media_id_fk" FOREIGN KEY ("assets_foreground_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "slides_locales" ADD CONSTRAINT "slides_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "slides_locales" ADD CONSTRAINT "slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "slides_rels" ADD CONSTRAINT "slides_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "slides_rels" ADD CONSTRAINT "slides_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "slides_rels" ADD CONSTRAINT "slides_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "countries" ADD CONSTRAINT "countries_basics_flag_id_media_id_fk" FOREIGN KEY ("basics_flag_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "countries_locales" ADD CONSTRAINT "countries_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "countries_locales" ADD CONSTRAINT "countries_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_rels" ADD CONSTRAINT "countries_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_rels" ADD CONSTRAINT "countries_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "countries_rels" ADD CONSTRAINT "countries_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans_traits_milestones_list" ADD CONSTRAINT "plans_traits_milestones_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans_traits_deliverables_list" ADD CONSTRAINT "plans_traits_deliverables_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans_traits_risks_list" ADD CONSTRAINT "plans_traits_risks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans_traits_kpis_list" ADD CONSTRAINT "plans_traits_kpis_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans" ADD CONSTRAINT "plans_details_assigned_to_id_members_id_fk" FOREIGN KEY ("details_assigned_to_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "plans" ADD CONSTRAINT "plans_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "plans" ADD CONSTRAINT "plans_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "plans_locales" ADD CONSTRAINT "plans_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "plans_locales" ADD CONSTRAINT "plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans_rels" ADD CONSTRAINT "plans_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans_rels" ADD CONSTRAINT "plans_rels_plans_fk" FOREIGN KEY ("plans_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans_rels" ADD CONSTRAINT "plans_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans_rels" ADD CONSTRAINT "plans_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "plans_rels" ADD CONSTRAINT "plans_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "timelines_traits_milestones_list" ADD CONSTRAINT "timelines_traits_milestones_list_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "timelines_traits_milestones_list" ADD CONSTRAINT "timelines_traits_milestones_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."timelines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "timelines_traits_events_list" ADD CONSTRAINT "timelines_traits_events_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."timelines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "timelines" ADD CONSTRAINT "timelines_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "timelines" ADD CONSTRAINT "timelines_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "timelines_locales" ADD CONSTRAINT "timelines_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "timelines_locales" ADD CONSTRAINT "timelines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."timelines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "timelines_rels" ADD CONSTRAINT "timelines_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."timelines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "timelines_rels" ADD CONSTRAINT "timelines_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "timelines_rels" ADD CONSTRAINT "timelines_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "timelines_rels" ADD CONSTRAINT "timelines_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_traits_eligibility_list" ADD CONSTRAINT "programs_traits_eligibility_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_traits_curriculum_list" ADD CONSTRAINT "programs_traits_curriculum_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_assets_thumbnail_id_media_id_fk" FOREIGN KEY ("assets_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs" ADD CONSTRAINT "programs_assets_cover_id_media_id_fk" FOREIGN KEY ("assets_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_locales" ADD CONSTRAINT "programs_locales_seo_image_id_media_id_fk" FOREIGN KEY ("seo_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programs_locales" ADD CONSTRAINT "programs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programs_rels" ADD CONSTRAINT "programs_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_circuits_fk" FOREIGN KEY ("circuits_id") REFERENCES "public"."circuits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_championships_fk" FOREIGN KEY ("championships_id") REFERENCES "public"."championships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_races_fk" FOREIGN KEY ("races_id") REFERENCES "public"."races"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_teams_fk" FOREIGN KEY ("teams_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_meetups_fk" FOREIGN KEY ("meetups_id") REFERENCES "public"."meetups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_initiatives_fk" FOREIGN KEY ("initiatives_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_trainings_fk" FOREIGN KEY ("trainings_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_vacancies_fk" FOREIGN KEY ("vacancies_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_onboardings_fk" FOREIGN KEY ("onboardings_id") REFERENCES "public"."onboardings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_celebrations_fk" FOREIGN KEY ("celebrations_id") REFERENCES "public"."celebrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_interviews_fk" FOREIGN KEY ("interviews_id") REFERENCES "public"."interviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_incidents_fk" FOREIGN KEY ("incidents_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_helmets_fk" FOREIGN KEY ("helmets_id") REFERENCES "public"."helmets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_suits_fk" FOREIGN KEY ("suits_id") REFERENCES "public"."suits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_garages_fk" FOREIGN KEY ("garages_id") REFERENCES "public"."garages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_designations_fk" FOREIGN KEY ("designations_id") REFERENCES "public"."designations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_statuses_fk" FOREIGN KEY ("statuses_id") REFERENCES "public"."statuses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_regulations_fk" FOREIGN KEY ("regulations_id") REFERENCES "public"."regulations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_policies_fk" FOREIGN KEY ("policies_id") REFERENCES "public"."policies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_statements_fk" FOREIGN KEY ("statements_id") REFERENCES "public"."statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_slides_fk" FOREIGN KEY ("slides_id") REFERENCES "public"."slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_plans_fk" FOREIGN KEY ("plans_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_timelines_fk" FOREIGN KEY ("timelines_id") REFERENCES "public"."timelines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_series_fk" FOREIGN KEY ("series_id") REFERENCES "public"."series"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_seasons_fk" FOREIGN KEY ("seasons_id") REFERENCES "public"."seasons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sessions_fk" FOREIGN KEY ("sessions_id") REFERENCES "public"."sessions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_entries_fk" FOREIGN KEY ("entries_id") REFERENCES "public"."entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_results_fk" FOREIGN KEY ("results_id") REFERENCES "public"."results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_points_fk" FOREIGN KEY ("points_id") REFERENCES "public"."points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_circuits_fk" FOREIGN KEY ("circuits_id") REFERENCES "public"."circuits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_championships_fk" FOREIGN KEY ("championships_id") REFERENCES "public"."championships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_races_fk" FOREIGN KEY ("races_id") REFERENCES "public"."races"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_teams_fk" FOREIGN KEY ("teams_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_drivers_fk" FOREIGN KEY ("drivers_id") REFERENCES "public"."drivers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_individuals_fk" FOREIGN KEY ("individuals_id") REFERENCES "public"."individuals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_organizations_fk" FOREIGN KEY ("organizations_id") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_meetups_fk" FOREIGN KEY ("meetups_id") REFERENCES "public"."meetups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_initiatives_fk" FOREIGN KEY ("initiatives_id") REFERENCES "public"."initiatives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_trainings_fk" FOREIGN KEY ("trainings_id") REFERENCES "public"."trainings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vacancies_fk" FOREIGN KEY ("vacancies_id") REFERENCES "public"."vacancies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_onboardings_fk" FOREIGN KEY ("onboardings_id") REFERENCES "public"."onboardings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_celebrations_fk" FOREIGN KEY ("celebrations_id") REFERENCES "public"."celebrations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_interviews_fk" FOREIGN KEY ("interviews_id") REFERENCES "public"."interviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_incidents_fk" FOREIGN KEY ("incidents_id") REFERENCES "public"."incidents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cars_fk" FOREIGN KEY ("cars_id") REFERENCES "public"."cars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_helmets_fk" FOREIGN KEY ("helmets_id") REFERENCES "public"."helmets"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_suits_fk" FOREIGN KEY ("suits_id") REFERENCES "public"."suits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_garages_fk" FOREIGN KEY ("garages_id") REFERENCES "public"."garages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_designations_fk" FOREIGN KEY ("designations_id") REFERENCES "public"."designations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_skills_fk" FOREIGN KEY ("skills_id") REFERENCES "public"."skills"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_statuses_fk" FOREIGN KEY ("statuses_id") REFERENCES "public"."statuses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_regulations_fk" FOREIGN KEY ("regulations_id") REFERENCES "public"."regulations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_policies_fk" FOREIGN KEY ("policies_id") REFERENCES "public"."policies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_statements_fk" FOREIGN KEY ("statements_id") REFERENCES "public"."statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_slides_fk" FOREIGN KEY ("slides_id") REFERENCES "public"."slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_plans_fk" FOREIGN KEY ("plans_id") REFERENCES "public"."plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_timelines_fk" FOREIGN KEY ("timelines_id") REFERENCES "public"."timelines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programs_fk" FOREIGN KEY ("programs_id") REFERENCES "public"."programs"("id") ON DELETE cascade ON UPDATE no action;
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
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_utility_nav" ADD CONSTRAINT "header_utility_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns_links" ADD CONSTRAINT "footer_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_columns" ADD CONSTRAINT "footer_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_legal" ADD CONSTRAINT "footer_legal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_brand_logo_id_media_id_fk" FOREIGN KEY ("brand_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_values" ADD CONSTRAINT "identity_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."identity"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_values_locales" ADD CONSTRAINT "identity_values_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."identity_values"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_voice_tone_keywords" ADD CONSTRAINT "identity_voice_tone_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."identity"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_voice_tone_keywords_locales" ADD CONSTRAINT "identity_voice_tone_keywords_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."identity_voice_tone_keywords"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_sustainability_initiative_names" ADD CONSTRAINT "identity_sustainability_initiative_names_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."identity"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_sustainability_initiative_names_locales" ADD CONSTRAINT "identity_sustainability_initiative_names_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."identity_sustainability_initiative_names"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity" ADD CONSTRAINT "identity_visual_logo_id_media_id_fk" FOREIGN KEY ("visual_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "identity" ADD CONSTRAINT "identity_visual_logo_inverted_id_media_id_fk" FOREIGN KEY ("visual_logo_inverted_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "identity" ADD CONSTRAINT "identity_visual_wordmark_id_media_id_fk" FOREIGN KEY ("visual_wordmark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "identity" ADD CONSTRAINT "identity_visual_favicon_id_media_id_fk" FOREIGN KEY ("visual_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "identity" ADD CONSTRAINT "identity_visual_guidelines_id_media_id_fk" FOREIGN KEY ("visual_guidelines_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "identity_locales" ADD CONSTRAINT "identity_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."identity"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_rels" ADD CONSTRAINT "identity_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."identity"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "identity_rels" ADD CONSTRAINT "identity_rels_leaders_fk" FOREIGN KEY ("leaders_id") REFERENCES "public"."leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_items" ADD CONSTRAINT "announcements_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_items_locales" ADD CONSTRAINT "announcements_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questions_categories_items" ADD CONSTRAINT "questions_categories_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questions_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questions_categories_items_locales" ADD CONSTRAINT "questions_categories_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questions_categories_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questions_categories" ADD CONSTRAINT "questions_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "questions_categories_locales" ADD CONSTRAINT "questions_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."questions_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "socials_accounts" ADD CONSTRAINT "socials_accounts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."socials"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "series_name_idx" ON "series" USING btree ("name");
  CREATE INDEX "series_basics_identifiers_basics_identifiers_code_idx" ON "series" USING btree ("basics_identifiers_code");
  CREATE INDEX "series_details_details_status_idx" ON "series" USING btree ("details_status");
  CREATE INDEX "series_details_details_predecessor_idx" ON "series" USING btree ("details_predecessor_id");
  CREATE INDEX "series_details_details_successor_idx" ON "series" USING btree ("details_successor_id");
  CREATE INDEX "series_details_details_location_idx" ON "series" USING btree ("details_location");
  CREATE INDEX "series_assets_assets_logo_idx" ON "series" USING btree ("assets_logo_id");
  CREATE INDEX "series_assets_assets_thumbnail_idx" ON "series" USING btree ("assets_thumbnail_id");
  CREATE INDEX "series_assets_assets_cover_idx" ON "series" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "series_slug_idx" ON "series" USING btree ("slug");
  CREATE INDEX "series_updated_at_idx" ON "series" USING btree ("updated_at");
  CREATE INDEX "series_created_at_idx" ON "series" USING btree ("created_at");
  CREATE INDEX "series_seo_seo_image_idx" ON "series_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "series_locales_locale_parent_id_unique" ON "series_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "series_rels_order_idx" ON "series_rels" USING btree ("order");
  CREATE INDEX "series_rels_parent_idx" ON "series_rels" USING btree ("parent_id");
  CREATE INDEX "series_rels_path_idx" ON "series_rels" USING btree ("path");
  CREATE INDEX "series_rels_media_id_idx" ON "series_rels" USING btree ("media_id");
  CREATE INDEX "series_rels_categories_id_idx" ON "series_rels" USING btree ("categories_id");
  CREATE INDEX "series_rels_tags_id_idx" ON "series_rels" USING btree ("tags_id");
  CREATE INDEX "seasons_name_idx" ON "seasons" USING btree ("name");
  CREATE INDEX "seasons_basics_identifiers_basics_identifiers_code_idx" ON "seasons" USING btree ("basics_identifiers_code");
  CREATE INDEX "seasons_details_details_series_idx" ON "seasons" USING btree ("details_series_id");
  CREATE INDEX "seasons_assets_assets_cover_idx" ON "seasons" USING btree ("assets_cover_id");
  CREATE INDEX "seasons_assets_assets_trailer_idx" ON "seasons" USING btree ("assets_trailer_id");
  CREATE UNIQUE INDEX "seasons_slug_idx" ON "seasons" USING btree ("slug");
  CREATE INDEX "seasons_updated_at_idx" ON "seasons" USING btree ("updated_at");
  CREATE INDEX "seasons_created_at_idx" ON "seasons" USING btree ("created_at");
  CREATE INDEX "seasons_seo_seo_image_idx" ON "seasons_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "seasons_locales_locale_parent_id_unique" ON "seasons_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "seasons_rels_order_idx" ON "seasons_rels" USING btree ("order");
  CREATE INDEX "seasons_rels_parent_idx" ON "seasons_rels" USING btree ("parent_id");
  CREATE INDEX "seasons_rels_path_idx" ON "seasons_rels" USING btree ("path");
  CREATE INDEX "seasons_rels_media_id_idx" ON "seasons_rels" USING btree ("media_id");
  CREATE INDEX "seasons_rels_categories_id_idx" ON "seasons_rels" USING btree ("categories_id");
  CREATE INDEX "seasons_rels_tags_id_idx" ON "seasons_rels" USING btree ("tags_id");
  CREATE INDEX "events_name_idx" ON "events" USING btree ("name");
  CREATE INDEX "events_basics_identifiers_basics_identifiers_code_idx" ON "events" USING btree ("basics_identifiers_code");
  CREATE INDEX "events_details_details_status_idx" ON "events" USING btree ("details_status");
  CREATE INDEX "events_details_details_season_idx" ON "events" USING btree ("details_season_id");
  CREATE INDEX "events_details_details_location_idx" ON "events" USING btree ("details_location");
  CREATE INDEX "events_details_details_start_date_idx" ON "events" USING btree ("details_start_date");
  CREATE INDEX "events_assets_assets_thumbnail_idx" ON "events" USING btree ("assets_thumbnail_id");
  CREATE INDEX "events_assets_assets_poster_idx" ON "events" USING btree ("assets_poster_id");
  CREATE INDEX "events_assets_assets_cover_idx" ON "events" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "events_seo_seo_image_idx" ON "events_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_media_id_idx" ON "events_rels" USING btree ("media_id");
  CREATE INDEX "events_rels_categories_id_idx" ON "events_rels" USING btree ("categories_id");
  CREATE INDEX "events_rels_tags_id_idx" ON "events_rels" USING btree ("tags_id");
  CREATE INDEX "sessions_name_idx" ON "sessions" USING btree ("name");
  CREATE INDEX "sessions_basics_identifiers_basics_identifiers_code_idx" ON "sessions" USING btree ("basics_identifiers_code");
  CREATE INDEX "sessions_basics_basics_segment_idx" ON "sessions" USING btree ("basics_segment");
  CREATE INDEX "sessions_assets_assets_thumbnail_idx" ON "sessions" USING btree ("assets_thumbnail_id");
  CREATE UNIQUE INDEX "sessions_slug_idx" ON "sessions" USING btree ("slug");
  CREATE INDEX "sessions_updated_at_idx" ON "sessions" USING btree ("updated_at");
  CREATE INDEX "sessions_created_at_idx" ON "sessions" USING btree ("created_at");
  CREATE INDEX "sessions_seo_seo_image_idx" ON "sessions_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "sessions_locales_locale_parent_id_unique" ON "sessions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "sessions_rels_order_idx" ON "sessions_rels" USING btree ("order");
  CREATE INDEX "sessions_rels_parent_idx" ON "sessions_rels" USING btree ("parent_id");
  CREATE INDEX "sessions_rels_path_idx" ON "sessions_rels" USING btree ("path");
  CREATE INDEX "sessions_rels_media_id_idx" ON "sessions_rels" USING btree ("media_id");
  CREATE INDEX "sessions_rels_categories_id_idx" ON "sessions_rels" USING btree ("categories_id");
  CREATE INDEX "sessions_rels_tags_id_idx" ON "sessions_rels" USING btree ("tags_id");
  CREATE INDEX "entries_name_idx" ON "entries" USING btree ("name");
  CREATE INDEX "entries_basics_identifiers_basics_identifiers_number_idx" ON "entries" USING btree ("basics_identifiers_number");
  CREATE INDEX "entries_details_details_session_idx" ON "entries" USING btree ("details_session_id");
  CREATE INDEX "entries_details_details_status_idx" ON "entries" USING btree ("details_status");
  CREATE INDEX "entries_assets_assets_thumbnail_idx" ON "entries" USING btree ("assets_thumbnail_id");
  CREATE UNIQUE INDEX "entries_slug_idx" ON "entries" USING btree ("slug");
  CREATE INDEX "entries_updated_at_idx" ON "entries" USING btree ("updated_at");
  CREATE INDEX "entries_created_at_idx" ON "entries" USING btree ("created_at");
  CREATE INDEX "entries_seo_seo_image_idx" ON "entries_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "entries_locales_locale_parent_id_unique" ON "entries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "entries_rels_order_idx" ON "entries_rels" USING btree ("order");
  CREATE INDEX "entries_rels_parent_idx" ON "entries_rels" USING btree ("parent_id");
  CREATE INDEX "entries_rels_path_idx" ON "entries_rels" USING btree ("path");
  CREATE INDEX "entries_rels_media_id_idx" ON "entries_rels" USING btree ("media_id");
  CREATE INDEX "entries_rels_categories_id_idx" ON "entries_rels" USING btree ("categories_id");
  CREATE INDEX "entries_rels_tags_id_idx" ON "entries_rels" USING btree ("tags_id");
  CREATE INDEX "results_name_idx" ON "results" USING btree ("name");
  CREATE INDEX "results_details_details_status_idx" ON "results" USING btree ("details_status");
  CREATE INDEX "results_details_details_overall_idx" ON "results" USING btree ("details_overall");
  CREATE UNIQUE INDEX "results_slug_idx" ON "results" USING btree ("slug");
  CREATE INDEX "results_updated_at_idx" ON "results" USING btree ("updated_at");
  CREATE INDEX "results_created_at_idx" ON "results" USING btree ("created_at");
  CREATE INDEX "results_seo_seo_image_idx" ON "results_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "results_locales_locale_parent_id_unique" ON "results_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "results_rels_order_idx" ON "results_rels" USING btree ("order");
  CREATE INDEX "results_rels_parent_idx" ON "results_rels" USING btree ("parent_id");
  CREATE INDEX "results_rels_path_idx" ON "results_rels" USING btree ("path");
  CREATE INDEX "results_rels_categories_id_idx" ON "results_rels" USING btree ("categories_id");
  CREATE INDEX "results_rels_tags_id_idx" ON "results_rels" USING btree ("tags_id");
  CREATE INDEX "points_name_idx" ON "points" USING btree ("name");
  CREATE INDEX "points_details_details_scale_idx" ON "points" USING btree ("details_scale");
  CREATE INDEX "points_details_details_value_idx" ON "points" USING btree ("details_value");
  CREATE UNIQUE INDEX "points_slug_idx" ON "points" USING btree ("slug");
  CREATE INDEX "points_updated_at_idx" ON "points" USING btree ("updated_at");
  CREATE INDEX "points_created_at_idx" ON "points" USING btree ("created_at");
  CREATE INDEX "points_seo_seo_image_idx" ON "points_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "points_locales_locale_parent_id_unique" ON "points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "points_rels_order_idx" ON "points_rels" USING btree ("order");
  CREATE INDEX "points_rels_parent_idx" ON "points_rels" USING btree ("parent_id");
  CREATE INDEX "points_rels_path_idx" ON "points_rels" USING btree ("path");
  CREATE INDEX "points_rels_categories_id_idx" ON "points_rels" USING btree ("categories_id");
  CREATE INDEX "points_rels_tags_id_idx" ON "points_rels" USING btree ("tags_id");
  CREATE INDEX "circuits_details_renovated_list_order_idx" ON "circuits_details_renovated_list" USING btree ("_order");
  CREATE INDEX "circuits_details_renovated_list_parent_id_idx" ON "circuits_details_renovated_list" USING btree ("_parent_id");
  CREATE INDEX "circuits_name_idx" ON "circuits" USING btree ("name");
  CREATE INDEX "circuits_basics_identifiers_basics_identifiers_code_idx" ON "circuits" USING btree ("basics_identifiers_code");
  CREATE INDEX "circuits_details_details_type_idx" ON "circuits" USING btree ("details_type");
  CREATE INDEX "circuits_details_details_fia_grade_idx" ON "circuits" USING btree ("details_fia_grade");
  CREATE INDEX "circuits_details_details_location_idx" ON "circuits" USING btree ("details_location");
  CREATE INDEX "circuits_details_details_country_idx" ON "circuits" USING btree ("details_country_id");
  CREATE INDEX "circuits_details_details_owner_idx" ON "circuits" USING btree ("details_owner_id");
  CREATE INDEX "circuits_details_details_operator_idx" ON "circuits" USING btree ("details_operator_id");
  CREATE INDEX "circuits_metrics_metrics_record_lap_driver_idx" ON "circuits" USING btree ("metrics_record_lap_driver_id");
  CREATE INDEX "circuits_assets_assets_thumbnail_idx" ON "circuits" USING btree ("assets_thumbnail_id");
  CREATE INDEX "circuits_assets_assets_cover_idx" ON "circuits" USING btree ("assets_cover_id");
  CREATE INDEX "circuits_assets_assets_circuit_map_idx" ON "circuits" USING btree ("assets_circuit_map_id");
  CREATE INDEX "circuits_assets_assets_video_idx" ON "circuits" USING btree ("assets_video_id");
  CREATE UNIQUE INDEX "circuits_slug_idx" ON "circuits" USING btree ("slug");
  CREATE INDEX "circuits_updated_at_idx" ON "circuits" USING btree ("updated_at");
  CREATE INDEX "circuits_created_at_idx" ON "circuits" USING btree ("created_at");
  CREATE INDEX "circuits_seo_seo_image_idx" ON "circuits_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "circuits_locales_locale_parent_id_unique" ON "circuits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "circuits_rels_order_idx" ON "circuits_rels" USING btree ("order");
  CREATE INDEX "circuits_rels_parent_idx" ON "circuits_rels" USING btree ("parent_id");
  CREATE INDEX "circuits_rels_path_idx" ON "circuits_rels" USING btree ("path");
  CREATE INDEX "circuits_rels_media_id_idx" ON "circuits_rels" USING btree ("media_id");
  CREATE INDEX "circuits_rels_categories_id_idx" ON "circuits_rels" USING btree ("categories_id");
  CREATE INDEX "circuits_rels_tags_id_idx" ON "circuits_rels" USING btree ("tags_id");
  CREATE INDEX "championships_name_idx" ON "championships" USING btree ("name");
  CREATE INDEX "championships_basics_identifiers_basics_identifiers_code_idx" ON "championships" USING btree ("basics_identifiers_code");
  CREATE INDEX "championships_details_details_regulations_idx" ON "championships" USING btree ("details_regulations_id");
  CREATE INDEX "championships_details_details_points_system_idx" ON "championships" USING btree ("details_points_system_id");
  CREATE INDEX "championships_details_details_season_idx" ON "championships" USING btree ("details_season_id");
  CREATE INDEX "championships_details_details_series_idx" ON "championships" USING btree ("details_series_id");
  CREATE INDEX "championships_details_details_winner_idx" ON "championships" USING btree ("details_winner_id");
  CREATE INDEX "championships_details_details_runner_up_idx" ON "championships" USING btree ("details_runner_up_id");
  CREATE INDEX "championships_details_details_third_place_idx" ON "championships" USING btree ("details_third_place_id");
  CREATE INDEX "championships_assets_assets_trophy_idx" ON "championships" USING btree ("assets_trophy_id");
  CREATE INDEX "championships_assets_assets_thumbnail_idx" ON "championships" USING btree ("assets_thumbnail_id");
  CREATE INDEX "championships_assets_assets_cover_idx" ON "championships" USING btree ("assets_cover_id");
  CREATE INDEX "championships_assets_assets_video_idx" ON "championships" USING btree ("assets_video_id");
  CREATE UNIQUE INDEX "championships_slug_idx" ON "championships" USING btree ("slug");
  CREATE INDEX "championships_updated_at_idx" ON "championships" USING btree ("updated_at");
  CREATE INDEX "championships_created_at_idx" ON "championships" USING btree ("created_at");
  CREATE INDEX "championships_seo_seo_image_idx" ON "championships_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "championships_locales_locale_parent_id_unique" ON "championships_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "championships_rels_order_idx" ON "championships_rels" USING btree ("order");
  CREATE INDEX "championships_rels_parent_idx" ON "championships_rels" USING btree ("parent_id");
  CREATE INDEX "championships_rels_path_idx" ON "championships_rels" USING btree ("path");
  CREATE INDEX "championships_rels_media_id_idx" ON "championships_rels" USING btree ("media_id");
  CREATE INDEX "championships_rels_categories_id_idx" ON "championships_rels" USING btree ("categories_id");
  CREATE INDEX "championships_rels_tags_id_idx" ON "championships_rels" USING btree ("tags_id");
  CREATE INDEX "races_name_idx" ON "races" USING btree ("name");
  CREATE INDEX "races_basics_identifiers_basics_identifiers_code_idx" ON "races" USING btree ("basics_identifiers_code");
  CREATE INDEX "races_details_details_type_idx" ON "races" USING btree ("details_type");
  CREATE INDEX "races_details_details_status_idx" ON "races" USING btree ("details_status");
  CREATE INDEX "races_details_details_start_date_idx" ON "races" USING btree ("details_start_date");
  CREATE INDEX "races_details_details_event_idx" ON "races" USING btree ("details_event_id");
  CREATE INDEX "races_details_details_season_idx" ON "races" USING btree ("details_season_id");
  CREATE INDEX "races_details_details_series_idx" ON "races" USING btree ("details_series_id");
  CREATE INDEX "races_details_details_circuit_idx" ON "races" USING btree ("details_circuit_id");
  CREATE INDEX "races_details_details_winner_idx" ON "races" USING btree ("details_winner_id");
  CREATE INDEX "races_details_details_pole_position_idx" ON "races" USING btree ("details_pole_position_id");
  CREATE INDEX "races_details_details_fastest_lap_idx" ON "races" USING btree ("details_fastest_lap_id");
  CREATE INDEX "races_assets_assets_thumbnail_idx" ON "races" USING btree ("assets_thumbnail_id");
  CREATE INDEX "races_assets_assets_poster_idx" ON "races" USING btree ("assets_poster_id");
  CREATE INDEX "races_assets_assets_cover_idx" ON "races" USING btree ("assets_cover_id");
  CREATE INDEX "races_assets_assets_video_idx" ON "races" USING btree ("assets_video_id");
  CREATE UNIQUE INDEX "races_slug_idx" ON "races" USING btree ("slug");
  CREATE INDEX "races_updated_at_idx" ON "races" USING btree ("updated_at");
  CREATE INDEX "races_created_at_idx" ON "races" USING btree ("created_at");
  CREATE INDEX "races_seo_seo_image_idx" ON "races_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "races_locales_locale_parent_id_unique" ON "races_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "races_rels_order_idx" ON "races_rels" USING btree ("order");
  CREATE INDEX "races_rels_parent_idx" ON "races_rels" USING btree ("parent_id");
  CREATE INDEX "races_rels_path_idx" ON "races_rels" USING btree ("path");
  CREATE INDEX "races_rels_media_id_idx" ON "races_rels" USING btree ("media_id");
  CREATE INDEX "races_rels_categories_id_idx" ON "races_rels" USING btree ("categories_id");
  CREATE INDEX "races_rels_tags_id_idx" ON "races_rels" USING btree ("tags_id");
  CREATE INDEX "teams_name_idx" ON "teams" USING btree ("name");
  CREATE INDEX "teams_details_details_country_idx" ON "teams" USING btree ("details_country_id");
  CREATE INDEX "teams_assets_assets_logo_idx" ON "teams" USING btree ("assets_logo_id");
  CREATE INDEX "teams_assets_assets_cover_idx" ON "teams" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "teams_slug_idx" ON "teams" USING btree ("slug");
  CREATE INDEX "teams_updated_at_idx" ON "teams" USING btree ("updated_at");
  CREATE INDEX "teams_created_at_idx" ON "teams" USING btree ("created_at");
  CREATE INDEX "teams_seo_seo_image_idx" ON "teams_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "teams_locales_locale_parent_id_unique" ON "teams_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "teams_rels_order_idx" ON "teams_rels" USING btree ("order");
  CREATE INDEX "teams_rels_parent_idx" ON "teams_rels" USING btree ("parent_id");
  CREATE INDEX "teams_rels_path_idx" ON "teams_rels" USING btree ("path");
  CREATE INDEX "teams_rels_media_id_idx" ON "teams_rels" USING btree ("media_id");
  CREATE INDEX "teams_rels_categories_id_idx" ON "teams_rels" USING btree ("categories_id");
  CREATE INDEX "teams_rels_tags_id_idx" ON "teams_rels" USING btree ("tags_id");
  CREATE INDEX "drivers_details_addresses_list_order_idx" ON "drivers_details_addresses_list" USING btree ("_order");
  CREATE INDEX "drivers_details_addresses_list_parent_id_idx" ON "drivers_details_addresses_list" USING btree ("_parent_id");
  CREATE INDEX "drivers_details_addresses_list_location_idx" ON "drivers_details_addresses_list" USING btree ("location");
  CREATE INDEX "drivers_details_websites_list_order_idx" ON "drivers_details_websites_list" USING btree ("_order");
  CREATE INDEX "drivers_details_websites_list_parent_id_idx" ON "drivers_details_websites_list" USING btree ("_parent_id");
  CREATE INDEX "drivers_details_websites_list_path_idx" ON "drivers_details_websites_list" USING btree ("path");
  CREATE INDEX "drivers_details_socials_list_order_idx" ON "drivers_details_socials_list" USING btree ("_order");
  CREATE INDEX "drivers_details_socials_list_parent_id_idx" ON "drivers_details_socials_list" USING btree ("_parent_id");
  CREATE INDEX "drivers_details_socials_list_username_idx" ON "drivers_details_socials_list" USING btree ("username");
  CREATE INDEX "drivers_assets_gallery_list_order_idx" ON "drivers_assets_gallery_list" USING btree ("_order");
  CREATE INDEX "drivers_assets_gallery_list_parent_id_idx" ON "drivers_assets_gallery_list" USING btree ("_parent_id");
  CREATE INDEX "drivers_assets_gallery_list_image_idx" ON "drivers_assets_gallery_list" USING btree ("image_id");
  CREATE INDEX "drivers_first_name_idx" ON "drivers" USING btree ("first_name");
  CREATE INDEX "drivers_last_name_idx" ON "drivers" USING btree ("last_name");
  CREATE INDEX "drivers_basics_basics_racing_number_idx" ON "drivers" USING btree ("basics_racing_number");
  CREATE INDEX "drivers_basics_basics_nationality_idx" ON "drivers" USING btree ("basics_nationality_id");
  CREATE INDEX "drivers_assets_assets_avatar_idx" ON "drivers" USING btree ("assets_avatar_id");
  CREATE INDEX "drivers_assets_assets_autograph_idx" ON "drivers" USING btree ("assets_autograph_id");
  CREATE INDEX "drivers_assets_assets_cover_idx" ON "drivers" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "drivers_slug_idx" ON "drivers" USING btree ("slug");
  CREATE INDEX "drivers_updated_at_idx" ON "drivers" USING btree ("updated_at");
  CREATE INDEX "drivers_created_at_idx" ON "drivers" USING btree ("created_at");
  CREATE INDEX "drivers_seo_seo_image_idx" ON "drivers_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "drivers_locales_locale_parent_id_unique" ON "drivers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "drivers_rels_order_idx" ON "drivers_rels" USING btree ("order");
  CREATE INDEX "drivers_rels_parent_idx" ON "drivers_rels" USING btree ("parent_id");
  CREATE INDEX "drivers_rels_path_idx" ON "drivers_rels" USING btree ("path");
  CREATE INDEX "drivers_rels_skills_id_idx" ON "drivers_rels" USING btree ("skills_id");
  CREATE INDEX "drivers_rels_points_id_idx" ON "drivers_rels" USING btree ("points_id");
  CREATE INDEX "drivers_rels_results_id_idx" ON "drivers_rels" USING btree ("results_id");
  CREATE INDEX "drivers_rels_awards_id_idx" ON "drivers_rels" USING btree ("awards_id");
  CREATE INDEX "drivers_rels_cars_id_idx" ON "drivers_rels" USING btree ("cars_id");
  CREATE INDEX "drivers_rels_categories_id_idx" ON "drivers_rels" USING btree ("categories_id");
  CREATE INDEX "drivers_rels_tags_id_idx" ON "drivers_rels" USING btree ("tags_id");
  CREATE INDEX "leaders_details_principles_list_order_idx" ON "leaders_details_principles_list" USING btree ("_order");
  CREATE INDEX "leaders_details_principles_list_parent_id_idx" ON "leaders_details_principles_list" USING btree ("_parent_id");
  CREATE INDEX "leaders_details_websites_list_order_idx" ON "leaders_details_websites_list" USING btree ("_order");
  CREATE INDEX "leaders_details_websites_list_parent_id_idx" ON "leaders_details_websites_list" USING btree ("_parent_id");
  CREATE INDEX "leaders_details_websites_list_path_idx" ON "leaders_details_websites_list" USING btree ("path");
  CREATE INDEX "leaders_details_socials_list_order_idx" ON "leaders_details_socials_list" USING btree ("_order");
  CREATE INDEX "leaders_details_socials_list_parent_id_idx" ON "leaders_details_socials_list" USING btree ("_parent_id");
  CREATE INDEX "leaders_details_socials_list_username_idx" ON "leaders_details_socials_list" USING btree ("username");
  CREATE INDEX "leaders_first_name_idx" ON "leaders" USING btree ("first_name");
  CREATE INDEX "leaders_last_name_idx" ON "leaders" USING btree ("last_name");
  CREATE INDEX "leaders_basics_basics_title_idx" ON "leaders" USING btree ("basics_title");
  CREATE INDEX "leaders_basics_basics_nationality_idx" ON "leaders" USING btree ("basics_nationality_id");
  CREATE INDEX "leaders_assets_assets_avatar_idx" ON "leaders" USING btree ("assets_avatar_id");
  CREATE INDEX "leaders_assets_assets_cover_idx" ON "leaders" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "leaders_slug_idx" ON "leaders" USING btree ("slug");
  CREATE INDEX "leaders_updated_at_idx" ON "leaders" USING btree ("updated_at");
  CREATE INDEX "leaders_created_at_idx" ON "leaders" USING btree ("created_at");
  CREATE INDEX "leaders_seo_seo_image_idx" ON "leaders_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "leaders_locales_locale_parent_id_unique" ON "leaders_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "leaders_rels_order_idx" ON "leaders_rels" USING btree ("order");
  CREATE INDEX "leaders_rels_parent_idx" ON "leaders_rels" USING btree ("parent_id");
  CREATE INDEX "leaders_rels_path_idx" ON "leaders_rels" USING btree ("path");
  CREATE INDEX "leaders_rels_designations_id_idx" ON "leaders_rels" USING btree ("designations_id");
  CREATE INDEX "leaders_rels_awards_id_idx" ON "leaders_rels" USING btree ("awards_id");
  CREATE INDEX "leaders_rels_media_id_idx" ON "leaders_rels" USING btree ("media_id");
  CREATE INDEX "leaders_rels_categories_id_idx" ON "leaders_rels" USING btree ("categories_id");
  CREATE INDEX "leaders_rels_tags_id_idx" ON "leaders_rels" USING btree ("tags_id");
  CREATE INDEX "members_details_addresses_list_order_idx" ON "members_details_addresses_list" USING btree ("_order");
  CREATE INDEX "members_details_addresses_list_parent_id_idx" ON "members_details_addresses_list" USING btree ("_parent_id");
  CREATE INDEX "members_details_addresses_list_location_idx" ON "members_details_addresses_list" USING btree ("location");
  CREATE INDEX "members_first_name_idx" ON "members" USING btree ("first_name");
  CREATE INDEX "members_last_name_idx" ON "members" USING btree ("last_name");
  CREATE INDEX "members_basics_basics_nationality_idx" ON "members" USING btree ("basics_nationality_id");
  CREATE INDEX "members_basics_basics_joining_date_idx" ON "members" USING btree ("basics_joining_date");
  CREATE INDEX "members_assets_assets_avatar_idx" ON "members" USING btree ("assets_avatar_id");
  CREATE INDEX "members_assets_assets_cover_idx" ON "members" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "members_slug_idx" ON "members" USING btree ("slug");
  CREATE INDEX "members_updated_at_idx" ON "members" USING btree ("updated_at");
  CREATE INDEX "members_created_at_idx" ON "members" USING btree ("created_at");
  CREATE INDEX "members_seo_seo_image_idx" ON "members_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "members_locales_locale_parent_id_unique" ON "members_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "members_rels_order_idx" ON "members_rels" USING btree ("order");
  CREATE INDEX "members_rels_parent_idx" ON "members_rels" USING btree ("parent_id");
  CREATE INDEX "members_rels_path_idx" ON "members_rels" USING btree ("path");
  CREATE INDEX "members_rels_skills_id_idx" ON "members_rels" USING btree ("skills_id");
  CREATE INDEX "members_rels_trainings_id_idx" ON "members_rels" USING btree ("trainings_id");
  CREATE INDEX "members_rels_categories_id_idx" ON "members_rels" USING btree ("categories_id");
  CREATE INDEX "members_rels_tags_id_idx" ON "members_rels" USING btree ("tags_id");
  CREATE INDEX "individuals_first_name_idx" ON "individuals" USING btree ("first_name");
  CREATE INDEX "individuals_last_name_idx" ON "individuals" USING btree ("last_name");
  CREATE INDEX "individuals_basics_basics_type_idx" ON "individuals" USING btree ("basics_type");
  CREATE INDEX "individuals_basics_basics_is_contact_idx" ON "individuals" USING btree ("basics_is_contact");
  CREATE INDEX "individuals_assets_assets_avatar_idx" ON "individuals" USING btree ("assets_avatar_id");
  CREATE INDEX "individuals_assets_assets_thumbnail_idx" ON "individuals" USING btree ("assets_thumbnail_id");
  CREATE UNIQUE INDEX "individuals_slug_idx" ON "individuals" USING btree ("slug");
  CREATE INDEX "individuals_updated_at_idx" ON "individuals" USING btree ("updated_at");
  CREATE INDEX "individuals_created_at_idx" ON "individuals" USING btree ("created_at");
  CREATE INDEX "individuals_seo_seo_image_idx" ON "individuals_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "individuals_locales_locale_parent_id_unique" ON "individuals_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "individuals_rels_order_idx" ON "individuals_rels" USING btree ("order");
  CREATE INDEX "individuals_rels_parent_idx" ON "individuals_rels" USING btree ("parent_id");
  CREATE INDEX "individuals_rels_path_idx" ON "individuals_rels" USING btree ("path");
  CREATE INDEX "individuals_rels_categories_id_idx" ON "individuals_rels" USING btree ("categories_id");
  CREATE INDEX "individuals_rels_tags_id_idx" ON "individuals_rels" USING btree ("tags_id");
  CREATE INDEX "organizations_details_benefits_list_order_idx" ON "organizations_details_benefits_list" USING btree ("_order");
  CREATE INDEX "organizations_details_benefits_list_parent_id_idx" ON "organizations_details_benefits_list" USING btree ("_parent_id");
  CREATE INDEX "organizations_details_websites_list_order_idx" ON "organizations_details_websites_list" USING btree ("_order");
  CREATE INDEX "organizations_details_websites_list_parent_id_idx" ON "organizations_details_websites_list" USING btree ("_parent_id");
  CREATE INDEX "organizations_details_websites_list_path_idx" ON "organizations_details_websites_list" USING btree ("path");
  CREATE INDEX "organizations_details_socials_list_order_idx" ON "organizations_details_socials_list" USING btree ("_order");
  CREATE INDEX "organizations_details_socials_list_parent_id_idx" ON "organizations_details_socials_list" USING btree ("_parent_id");
  CREATE INDEX "organizations_details_socials_list_username_idx" ON "organizations_details_socials_list" USING btree ("username");
  CREATE INDEX "organizations_name_idx" ON "organizations" USING btree ("name");
  CREATE INDEX "organizations_basics_identifiers_basics_identifiers_code_idx" ON "organizations" USING btree ("basics_identifiers_code");
  CREATE INDEX "organizations_basics_basics_type_idx" ON "organizations" USING btree ("basics_type");
  CREATE INDEX "organizations_assets_assets_logo_idx" ON "organizations" USING btree ("assets_logo_id");
  CREATE INDEX "organizations_assets_assets_alt_logo_idx" ON "organizations" USING btree ("assets_alt_logo_id");
  CREATE UNIQUE INDEX "organizations_slug_idx" ON "organizations" USING btree ("slug");
  CREATE INDEX "organizations_updated_at_idx" ON "organizations" USING btree ("updated_at");
  CREATE INDEX "organizations_created_at_idx" ON "organizations" USING btree ("created_at");
  CREATE INDEX "organizations_seo_seo_image_idx" ON "organizations_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "organizations_locales_locale_parent_id_unique" ON "organizations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "organizations_rels_order_idx" ON "organizations_rels" USING btree ("order");
  CREATE INDEX "organizations_rels_parent_idx" ON "organizations_rels" USING btree ("parent_id");
  CREATE INDEX "organizations_rels_path_idx" ON "organizations_rels" USING btree ("path");
  CREATE INDEX "organizations_rels_categories_id_idx" ON "organizations_rels" USING btree ("categories_id");
  CREATE INDEX "organizations_rels_tags_id_idx" ON "organizations_rels" USING btree ("tags_id");
  CREATE INDEX "users_roles_order_idx" ON "users_roles" USING btree ("order");
  CREATE INDEX "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "meetups_name_idx" ON "meetups" USING btree ("name");
  CREATE INDEX "meetups_details_details_format_idx" ON "meetups" USING btree ("details_format");
  CREATE INDEX "meetups_details_details_start_date_idx" ON "meetups" USING btree ("details_start_date");
  CREATE INDEX "meetups_details_details_locations_idx" ON "meetups" USING btree ("details_locations");
  CREATE INDEX "meetups_assets_assets_thumbnail_idx" ON "meetups" USING btree ("assets_thumbnail_id");
  CREATE INDEX "meetups_assets_assets_cover_idx" ON "meetups" USING btree ("assets_cover_id");
  CREATE INDEX "meetups_assets_assets_video_idx" ON "meetups" USING btree ("assets_video_id");
  CREATE UNIQUE INDEX "meetups_slug_idx" ON "meetups" USING btree ("slug");
  CREATE INDEX "meetups_updated_at_idx" ON "meetups" USING btree ("updated_at");
  CREATE INDEX "meetups_created_at_idx" ON "meetups" USING btree ("created_at");
  CREATE INDEX "meetups_seo_seo_image_idx" ON "meetups_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "meetups_locales_locale_parent_id_unique" ON "meetups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "meetups_rels_order_idx" ON "meetups_rels" USING btree ("order");
  CREATE INDEX "meetups_rels_parent_idx" ON "meetups_rels" USING btree ("parent_id");
  CREATE INDEX "meetups_rels_path_idx" ON "meetups_rels" USING btree ("path");
  CREATE INDEX "meetups_rels_organizations_id_idx" ON "meetups_rels" USING btree ("organizations_id");
  CREATE INDEX "meetups_rels_leaders_id_idx" ON "meetups_rels" USING btree ("leaders_id");
  CREATE INDEX "meetups_rels_individuals_id_idx" ON "meetups_rels" USING btree ("individuals_id");
  CREATE INDEX "meetups_rels_drivers_id_idx" ON "meetups_rels" USING btree ("drivers_id");
  CREATE INDEX "meetups_rels_members_id_idx" ON "meetups_rels" USING btree ("members_id");
  CREATE INDEX "meetups_rels_media_id_idx" ON "meetups_rels" USING btree ("media_id");
  CREATE INDEX "meetups_rels_categories_id_idx" ON "meetups_rels" USING btree ("categories_id");
  CREATE INDEX "meetups_rels_tags_id_idx" ON "meetups_rels" USING btree ("tags_id");
  CREATE INDEX "initiatives_details_expectations_list_order_idx" ON "initiatives_details_expectations_list" USING btree ("_order");
  CREATE INDEX "initiatives_details_expectations_list_parent_id_idx" ON "initiatives_details_expectations_list" USING btree ("_parent_id");
  CREATE INDEX "initiatives_name_idx" ON "initiatives" USING btree ("name");
  CREATE INDEX "initiatives_details_details_locations_idx" ON "initiatives" USING btree ("details_locations");
  CREATE INDEX "initiatives_assets_assets_thumbnail_idx" ON "initiatives" USING btree ("assets_thumbnail_id");
  CREATE INDEX "initiatives_assets_assets_candid_idx" ON "initiatives" USING btree ("assets_candid_id");
  CREATE INDEX "initiatives_assets_assets_cover_idx" ON "initiatives" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "initiatives_slug_idx" ON "initiatives" USING btree ("slug");
  CREATE INDEX "initiatives_updated_at_idx" ON "initiatives" USING btree ("updated_at");
  CREATE INDEX "initiatives_created_at_idx" ON "initiatives" USING btree ("created_at");
  CREATE INDEX "initiatives_seo_seo_image_idx" ON "initiatives_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "initiatives_locales_locale_parent_id_unique" ON "initiatives_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "initiatives_rels_order_idx" ON "initiatives_rels" USING btree ("order");
  CREATE INDEX "initiatives_rels_parent_idx" ON "initiatives_rels" USING btree ("parent_id");
  CREATE INDEX "initiatives_rels_path_idx" ON "initiatives_rels" USING btree ("path");
  CREATE INDEX "initiatives_rels_media_id_idx" ON "initiatives_rels" USING btree ("media_id");
  CREATE INDEX "initiatives_rels_categories_id_idx" ON "initiatives_rels" USING btree ("categories_id");
  CREATE INDEX "initiatives_rels_tags_id_idx" ON "initiatives_rels" USING btree ("tags_id");
  CREATE INDEX "trainings_details_specifications_list_order_idx" ON "trainings_details_specifications_list" USING btree ("_order");
  CREATE INDEX "trainings_details_specifications_list_parent_id_idx" ON "trainings_details_specifications_list" USING btree ("_parent_id");
  CREATE INDEX "trainings_details_expectations_list_order_idx" ON "trainings_details_expectations_list" USING btree ("_order");
  CREATE INDEX "trainings_details_expectations_list_parent_id_idx" ON "trainings_details_expectations_list" USING btree ("_parent_id");
  CREATE INDEX "trainings_name_idx" ON "trainings" USING btree ("name");
  CREATE UNIQUE INDEX "trainings_slug_idx" ON "trainings" USING btree ("slug");
  CREATE INDEX "trainings_updated_at_idx" ON "trainings" USING btree ("updated_at");
  CREATE INDEX "trainings_created_at_idx" ON "trainings" USING btree ("created_at");
  CREATE INDEX "trainings_seo_seo_image_idx" ON "trainings_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "trainings_locales_locale_parent_id_unique" ON "trainings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "trainings_rels_order_idx" ON "trainings_rels" USING btree ("order");
  CREATE INDEX "trainings_rels_parent_idx" ON "trainings_rels" USING btree ("parent_id");
  CREATE INDEX "trainings_rels_path_idx" ON "trainings_rels" USING btree ("path");
  CREATE INDEX "trainings_rels_media_id_idx" ON "trainings_rels" USING btree ("media_id");
  CREATE INDEX "trainings_rels_categories_id_idx" ON "trainings_rels" USING btree ("categories_id");
  CREATE INDEX "trainings_rels_tags_id_idx" ON "trainings_rels" USING btree ("tags_id");
  CREATE INDEX "vacancies_details_specifications_list_order_idx" ON "vacancies_details_specifications_list" USING btree ("_order");
  CREATE INDEX "vacancies_details_specifications_list_parent_id_idx" ON "vacancies_details_specifications_list" USING btree ("_parent_id");
  CREATE INDEX "vacancies_details_expectations_list_order_idx" ON "vacancies_details_expectations_list" USING btree ("_order");
  CREATE INDEX "vacancies_details_expectations_list_parent_id_idx" ON "vacancies_details_expectations_list" USING btree ("_parent_id");
  CREATE INDEX "vacancies_details_positions_list_order_idx" ON "vacancies_details_positions_list" USING btree ("_order");
  CREATE INDEX "vacancies_details_positions_list_parent_id_idx" ON "vacancies_details_positions_list" USING btree ("_parent_id");
  CREATE INDEX "vacancies_name_idx" ON "vacancies" USING btree ("name");
  CREATE INDEX "vacancies_details_details_department_idx" ON "vacancies" USING btree ("details_department");
  CREATE INDEX "vacancies_details_details_locations_idx" ON "vacancies" USING btree ("details_locations");
  CREATE INDEX "vacancies_assets_assets_thumbnail_idx" ON "vacancies" USING btree ("assets_thumbnail_id");
  CREATE UNIQUE INDEX "vacancies_slug_idx" ON "vacancies" USING btree ("slug");
  CREATE INDEX "vacancies_updated_at_idx" ON "vacancies" USING btree ("updated_at");
  CREATE INDEX "vacancies_created_at_idx" ON "vacancies" USING btree ("created_at");
  CREATE INDEX "vacancies_seo_seo_image_idx" ON "vacancies_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "vacancies_locales_locale_parent_id_unique" ON "vacancies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "vacancies_rels_order_idx" ON "vacancies_rels" USING btree ("order");
  CREATE INDEX "vacancies_rels_parent_idx" ON "vacancies_rels" USING btree ("parent_id");
  CREATE INDEX "vacancies_rels_path_idx" ON "vacancies_rels" USING btree ("path");
  CREATE INDEX "vacancies_rels_categories_id_idx" ON "vacancies_rels" USING btree ("categories_id");
  CREATE INDEX "vacancies_rels_tags_id_idx" ON "vacancies_rels" USING btree ("tags_id");
  CREATE INDEX "onboardings_traits_checklist_list_order_idx" ON "onboardings_traits_checklist_list" USING btree ("_order");
  CREATE INDEX "onboardings_traits_checklist_list_parent_id_idx" ON "onboardings_traits_checklist_list" USING btree ("_parent_id");
  CREATE INDEX "onboardings_traits_modules_list_order_idx" ON "onboardings_traits_modules_list" USING btree ("_order");
  CREATE INDEX "onboardings_traits_modules_list_parent_id_idx" ON "onboardings_traits_modules_list" USING btree ("_parent_id");
  CREATE INDEX "onboardings_traits_quizzes_list_order_idx" ON "onboardings_traits_quizzes_list" USING btree ("_order");
  CREATE INDEX "onboardings_traits_quizzes_list_parent_id_idx" ON "onboardings_traits_quizzes_list" USING btree ("_parent_id");
  CREATE INDEX "onboardings_name_idx" ON "onboardings" USING btree ("name");
  CREATE INDEX "onboardings_basics_identifiers_basics_identifiers_code_idx" ON "onboardings" USING btree ("basics_identifiers_code");
  CREATE INDEX "onboardings_details_details_type_idx" ON "onboardings" USING btree ("details_type");
  CREATE INDEX "onboardings_details_details_status_idx" ON "onboardings" USING btree ("details_status");
  CREATE INDEX "onboardings_details_details_assigned_to_idx" ON "onboardings" USING btree ("details_assigned_to_id");
  CREATE INDEX "onboardings_details_details_assigned_by_idx" ON "onboardings" USING btree ("details_assigned_by_id");
  CREATE INDEX "onboardings_assets_assets_completion_certificate_idx" ON "onboardings" USING btree ("assets_completion_certificate_id");
  CREATE INDEX "onboardings_assets_assets_thumbnail_idx" ON "onboardings" USING btree ("assets_thumbnail_id");
  CREATE INDEX "onboardings_assets_assets_cover_idx" ON "onboardings" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "onboardings_slug_idx" ON "onboardings" USING btree ("slug");
  CREATE INDEX "onboardings_updated_at_idx" ON "onboardings" USING btree ("updated_at");
  CREATE INDEX "onboardings_created_at_idx" ON "onboardings" USING btree ("created_at");
  CREATE INDEX "onboardings_seo_seo_image_idx" ON "onboardings_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "onboardings_locales_locale_parent_id_unique" ON "onboardings_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "onboardings_rels_order_idx" ON "onboardings_rels" USING btree ("order");
  CREATE INDEX "onboardings_rels_parent_idx" ON "onboardings_rels" USING btree ("parent_id");
  CREATE INDEX "onboardings_rels_path_idx" ON "onboardings_rels" USING btree ("path");
  CREATE INDEX "onboardings_rels_media_id_idx" ON "onboardings_rels" USING btree ("media_id");
  CREATE INDEX "onboardings_rels_categories_id_idx" ON "onboardings_rels" USING btree ("categories_id");
  CREATE INDEX "onboardings_rels_tags_id_idx" ON "onboardings_rels" USING btree ("tags_id");
  CREATE INDEX "awards_name_idx" ON "awards" USING btree ("name");
  CREATE INDEX "awards_details_details_awarded_date_idx" ON "awards" USING btree ("details_awarded_date");
  CREATE INDEX "awards_details_details_awarded_location_idx" ON "awards" USING btree ("details_awarded_location");
  CREATE INDEX "awards_assets_assets_thumbnail_idx" ON "awards" USING btree ("assets_thumbnail_id");
  CREATE INDEX "awards_assets_assets_candid_idx" ON "awards" USING btree ("assets_candid_id");
  CREATE INDEX "awards_assets_assets_video_idx" ON "awards" USING btree ("assets_video_id");
  CREATE UNIQUE INDEX "awards_slug_idx" ON "awards" USING btree ("slug");
  CREATE INDEX "awards_updated_at_idx" ON "awards" USING btree ("updated_at");
  CREATE INDEX "awards_created_at_idx" ON "awards" USING btree ("created_at");
  CREATE INDEX "awards_seo_seo_image_idx" ON "awards_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "awards_locales_locale_parent_id_unique" ON "awards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "awards_rels_order_idx" ON "awards_rels" USING btree ("order");
  CREATE INDEX "awards_rels_parent_idx" ON "awards_rels" USING btree ("parent_id");
  CREATE INDEX "awards_rels_path_idx" ON "awards_rels" USING btree ("path");
  CREATE INDEX "awards_rels_categories_id_idx" ON "awards_rels" USING btree ("categories_id");
  CREATE INDEX "awards_rels_tags_id_idx" ON "awards_rels" USING btree ("tags_id");
  CREATE INDEX "celebrations_name_idx" ON "celebrations" USING btree ("name");
  CREATE INDEX "celebrations_details_details_exclusivity_idx" ON "celebrations" USING btree ("details_exclusivity");
  CREATE INDEX "celebrations_details_details_date_time_idx" ON "celebrations" USING btree ("details_date_time");
  CREATE INDEX "celebrations_details_details_location_idx" ON "celebrations" USING btree ("details_location");
  CREATE INDEX "celebrations_assets_assets_thumbnail_idx" ON "celebrations" USING btree ("assets_thumbnail_id");
  CREATE INDEX "celebrations_assets_assets_video_idx" ON "celebrations" USING btree ("assets_video_id");
  CREATE UNIQUE INDEX "celebrations_slug_idx" ON "celebrations" USING btree ("slug");
  CREATE INDEX "celebrations_updated_at_idx" ON "celebrations" USING btree ("updated_at");
  CREATE INDEX "celebrations_created_at_idx" ON "celebrations" USING btree ("created_at");
  CREATE INDEX "celebrations_seo_seo_image_idx" ON "celebrations_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "celebrations_locales_locale_parent_id_unique" ON "celebrations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "celebrations_rels_order_idx" ON "celebrations_rels" USING btree ("order");
  CREATE INDEX "celebrations_rels_parent_idx" ON "celebrations_rels" USING btree ("parent_id");
  CREATE INDEX "celebrations_rels_path_idx" ON "celebrations_rels" USING btree ("path");
  CREATE INDEX "celebrations_rels_leaders_id_idx" ON "celebrations_rels" USING btree ("leaders_id");
  CREATE INDEX "celebrations_rels_drivers_id_idx" ON "celebrations_rels" USING btree ("drivers_id");
  CREATE INDEX "celebrations_rels_media_id_idx" ON "celebrations_rels" USING btree ("media_id");
  CREATE INDEX "celebrations_rels_categories_id_idx" ON "celebrations_rels" USING btree ("categories_id");
  CREATE INDEX "celebrations_rels_tags_id_idx" ON "celebrations_rels" USING btree ("tags_id");
  CREATE INDEX "interviews_details_tags_list_order_idx" ON "interviews_details_tags_list" USING btree ("_order");
  CREATE INDEX "interviews_details_tags_list_parent_id_idx" ON "interviews_details_tags_list" USING btree ("_parent_id");
  CREATE INDEX "interviews_name_idx" ON "interviews" USING btree ("name");
  CREATE INDEX "interviews_basics_identifiers_basics_identifiers_code_idx" ON "interviews" USING btree ("basics_identifiers_code");
  CREATE INDEX "interviews_details_details_format_idx" ON "interviews" USING btree ("details_format");
  CREATE INDEX "interviews_details_details_published_date_idx" ON "interviews" USING btree ("details_published_date");
  CREATE INDEX "interviews_details_details_status_idx" ON "interviews" USING btree ("details_status");
  CREATE INDEX "interviews_details_details_interviewer_idx" ON "interviews" USING btree ("details_interviewer_id");
  CREATE INDEX "interviews_details_details_interviewee_idx" ON "interviews" USING btree ("details_interviewee_id");
  CREATE INDEX "interviews_details_details_session_idx" ON "interviews" USING btree ("details_session_id");
  CREATE INDEX "interviews_details_details_location_idx" ON "interviews" USING btree ("details_location");
  CREATE INDEX "interviews_assets_assets_thumbnail_idx" ON "interviews" USING btree ("assets_thumbnail_id");
  CREATE INDEX "interviews_assets_assets_cover_idx" ON "interviews" USING btree ("assets_cover_id");
  CREATE INDEX "interviews_assets_assets_video_idx" ON "interviews" USING btree ("assets_video_id");
  CREATE INDEX "interviews_assets_assets_audio_idx" ON "interviews" USING btree ("assets_audio_id");
  CREATE UNIQUE INDEX "interviews_slug_idx" ON "interviews" USING btree ("slug");
  CREATE INDEX "interviews_updated_at_idx" ON "interviews" USING btree ("updated_at");
  CREATE INDEX "interviews_created_at_idx" ON "interviews" USING btree ("created_at");
  CREATE INDEX "interviews_seo_seo_image_idx" ON "interviews_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "interviews_locales_locale_parent_id_unique" ON "interviews_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "interviews_rels_order_idx" ON "interviews_rels" USING btree ("order");
  CREATE INDEX "interviews_rels_parent_idx" ON "interviews_rels" USING btree ("parent_id");
  CREATE INDEX "interviews_rels_path_idx" ON "interviews_rels" USING btree ("path");
  CREATE INDEX "interviews_rels_media_id_idx" ON "interviews_rels" USING btree ("media_id");
  CREATE INDEX "interviews_rels_categories_id_idx" ON "interviews_rels" USING btree ("categories_id");
  CREATE INDEX "interviews_rels_tags_id_idx" ON "interviews_rels" USING btree ("tags_id");
  CREATE INDEX "incidents_name_idx" ON "incidents" USING btree ("name");
  CREATE INDEX "incidents_details_details_date_time_idx" ON "incidents" USING btree ("details_date_time");
  CREATE INDEX "incidents_details_details_location_idx" ON "incidents" USING btree ("details_location");
  CREATE INDEX "incidents_assets_assets_thumbnail_idx" ON "incidents" USING btree ("assets_thumbnail_id");
  CREATE INDEX "incidents_assets_assets_video_idx" ON "incidents" USING btree ("assets_video_id");
  CREATE UNIQUE INDEX "incidents_slug_idx" ON "incidents" USING btree ("slug");
  CREATE INDEX "incidents_updated_at_idx" ON "incidents" USING btree ("updated_at");
  CREATE INDEX "incidents_created_at_idx" ON "incidents" USING btree ("created_at");
  CREATE INDEX "incidents_seo_seo_image_idx" ON "incidents_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "incidents_locales_locale_parent_id_unique" ON "incidents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "incidents_rels_order_idx" ON "incidents_rels" USING btree ("order");
  CREATE INDEX "incidents_rels_parent_idx" ON "incidents_rels" USING btree ("parent_id");
  CREATE INDEX "incidents_rels_path_idx" ON "incidents_rels" USING btree ("path");
  CREATE INDEX "incidents_rels_cars_id_idx" ON "incidents_rels" USING btree ("cars_id");
  CREATE INDEX "incidents_rels_drivers_id_idx" ON "incidents_rels" USING btree ("drivers_id");
  CREATE INDEX "incidents_rels_media_id_idx" ON "incidents_rels" USING btree ("media_id");
  CREATE INDEX "incidents_rels_categories_id_idx" ON "incidents_rels" USING btree ("categories_id");
  CREATE INDEX "incidents_rels_tags_id_idx" ON "incidents_rels" USING btree ("tags_id");
  CREATE INDEX "cars_details_classifications_list_order_idx" ON "cars_details_classifications_list" USING btree ("_order");
  CREATE INDEX "cars_details_classifications_list_parent_id_idx" ON "cars_details_classifications_list" USING btree ("_parent_id");
  CREATE INDEX "cars_details_specifications_list_order_idx" ON "cars_details_specifications_list" USING btree ("_order");
  CREATE INDEX "cars_details_specifications_list_parent_id_idx" ON "cars_details_specifications_list" USING btree ("_parent_id");
  CREATE INDEX "cars_name_idx" ON "cars" USING btree ("name");
  CREATE INDEX "cars_basics_identifiers_basics_identifiers_chassis_idx" ON "cars" USING btree ("basics_identifiers_chassis");
  CREATE INDEX "cars_details_details_status_idx" ON "cars" USING btree ("details_status");
  CREATE INDEX "cars_assets_assets_avatar_idx" ON "cars" USING btree ("assets_avatar_id");
  CREATE INDEX "cars_assets_assets_thumbnail_idx" ON "cars" USING btree ("assets_thumbnail_id");
  CREATE INDEX "cars_assets_assets_cover_idx" ON "cars" USING btree ("assets_cover_id");
  CREATE INDEX "cars_assets_assets_video_idx" ON "cars" USING btree ("assets_video_id");
  CREATE UNIQUE INDEX "cars_slug_idx" ON "cars" USING btree ("slug");
  CREATE INDEX "cars_updated_at_idx" ON "cars" USING btree ("updated_at");
  CREATE INDEX "cars_created_at_idx" ON "cars" USING btree ("created_at");
  CREATE INDEX "cars_seo_seo_image_idx" ON "cars_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "cars_locales_locale_parent_id_unique" ON "cars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "cars_rels_order_idx" ON "cars_rels" USING btree ("order");
  CREATE INDEX "cars_rels_parent_idx" ON "cars_rels" USING btree ("parent_id");
  CREATE INDEX "cars_rels_path_idx" ON "cars_rels" USING btree ("path");
  CREATE INDEX "cars_rels_organizations_id_idx" ON "cars_rels" USING btree ("organizations_id");
  CREATE INDEX "cars_rels_members_id_idx" ON "cars_rels" USING btree ("members_id");
  CREATE INDEX "cars_rels_media_id_idx" ON "cars_rels" USING btree ("media_id");
  CREATE INDEX "cars_rels_categories_id_idx" ON "cars_rels" USING btree ("categories_id");
  CREATE INDEX "cars_rels_tags_id_idx" ON "cars_rels" USING btree ("tags_id");
  CREATE INDEX "helmets_details_classifications_list_order_idx" ON "helmets_details_classifications_list" USING btree ("_order");
  CREATE INDEX "helmets_details_classifications_list_parent_id_idx" ON "helmets_details_classifications_list" USING btree ("_parent_id");
  CREATE INDEX "helmets_details_manufacturers_list_order_idx" ON "helmets_details_manufacturers_list" USING btree ("_order");
  CREATE INDEX "helmets_details_manufacturers_list_parent_id_idx" ON "helmets_details_manufacturers_list" USING btree ("_parent_id");
  CREATE INDEX "helmets_name_idx" ON "helmets" USING btree ("name");
  CREATE INDEX "helmets_assets_assets_avatar_idx" ON "helmets" USING btree ("assets_avatar_id");
  CREATE INDEX "helmets_assets_assets_thumbnail_idx" ON "helmets" USING btree ("assets_thumbnail_id");
  CREATE INDEX "helmets_assets_assets_video_idx" ON "helmets" USING btree ("assets_video_id");
  CREATE UNIQUE INDEX "helmets_slug_idx" ON "helmets" USING btree ("slug");
  CREATE INDEX "helmets_updated_at_idx" ON "helmets" USING btree ("updated_at");
  CREATE INDEX "helmets_created_at_idx" ON "helmets" USING btree ("created_at");
  CREATE INDEX "helmets_seo_seo_image_idx" ON "helmets_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "helmets_locales_locale_parent_id_unique" ON "helmets_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "helmets_rels_order_idx" ON "helmets_rels" USING btree ("order");
  CREATE INDEX "helmets_rels_parent_idx" ON "helmets_rels" USING btree ("parent_id");
  CREATE INDEX "helmets_rels_path_idx" ON "helmets_rels" USING btree ("path");
  CREATE INDEX "helmets_rels_media_id_idx" ON "helmets_rels" USING btree ("media_id");
  CREATE INDEX "helmets_rels_categories_id_idx" ON "helmets_rels" USING btree ("categories_id");
  CREATE INDEX "helmets_rels_tags_id_idx" ON "helmets_rels" USING btree ("tags_id");
  CREATE INDEX "suits_details_manufacturers_list_order_idx" ON "suits_details_manufacturers_list" USING btree ("_order");
  CREATE INDEX "suits_details_manufacturers_list_parent_id_idx" ON "suits_details_manufacturers_list" USING btree ("_parent_id");
  CREATE INDEX "suits_name_idx" ON "suits" USING btree ("name");
  CREATE INDEX "suits_assets_assets_thumbnail_idx" ON "suits" USING btree ("assets_thumbnail_id");
  CREATE INDEX "suits_assets_assets_video_idx" ON "suits" USING btree ("assets_video_id");
  CREATE UNIQUE INDEX "suits_slug_idx" ON "suits" USING btree ("slug");
  CREATE INDEX "suits_updated_at_idx" ON "suits" USING btree ("updated_at");
  CREATE INDEX "suits_created_at_idx" ON "suits" USING btree ("created_at");
  CREATE INDEX "suits_seo_seo_image_idx" ON "suits_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "suits_locales_locale_parent_id_unique" ON "suits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "suits_rels_order_idx" ON "suits_rels" USING btree ("order");
  CREATE INDEX "suits_rels_parent_idx" ON "suits_rels" USING btree ("parent_id");
  CREATE INDEX "suits_rels_path_idx" ON "suits_rels" USING btree ("path");
  CREATE INDEX "suits_rels_media_id_idx" ON "suits_rels" USING btree ("media_id");
  CREATE INDEX "suits_rels_categories_id_idx" ON "suits_rels" USING btree ("categories_id");
  CREATE INDEX "suits_rels_tags_id_idx" ON "suits_rels" USING btree ("tags_id");
  CREATE INDEX "garages_details_amenities_list_order_idx" ON "garages_details_amenities_list" USING btree ("_order");
  CREATE INDEX "garages_details_amenities_list_parent_id_idx" ON "garages_details_amenities_list" USING btree ("_parent_id");
  CREATE INDEX "garages_name_idx" ON "garages" USING btree ("name");
  CREATE INDEX "garages_basics_identifiers_basics_identifiers_code_idx" ON "garages" USING btree ("basics_identifiers_code");
  CREATE INDEX "garages_details_details_location_idx" ON "garages" USING btree ("details_location");
  CREATE INDEX "garages_details_details_ownership_idx" ON "garages" USING btree ("details_ownership_id");
  CREATE INDEX "garages_assets_assets_thumbnail_idx" ON "garages" USING btree ("assets_thumbnail_id");
  CREATE INDEX "garages_assets_assets_cover_idx" ON "garages" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "garages_slug_idx" ON "garages" USING btree ("slug");
  CREATE INDEX "garages_updated_at_idx" ON "garages" USING btree ("updated_at");
  CREATE INDEX "garages_created_at_idx" ON "garages" USING btree ("created_at");
  CREATE INDEX "garages_seo_seo_image_idx" ON "garages_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "garages_locales_locale_parent_id_unique" ON "garages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "garages_rels_order_idx" ON "garages_rels" USING btree ("order");
  CREATE INDEX "garages_rels_parent_idx" ON "garages_rels" USING btree ("parent_id");
  CREATE INDEX "garages_rels_path_idx" ON "garages_rels" USING btree ("path");
  CREATE INDEX "garages_rels_organizations_id_idx" ON "garages_rels" USING btree ("organizations_id");
  CREATE INDEX "garages_rels_media_id_idx" ON "garages_rels" USING btree ("media_id");
  CREATE INDEX "garages_rels_categories_id_idx" ON "garages_rels" USING btree ("categories_id");
  CREATE INDEX "garages_rels_tags_id_idx" ON "garages_rels" USING btree ("tags_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "designations_name_idx" ON "designations" USING btree ("name");
  CREATE UNIQUE INDEX "designations_slug_idx" ON "designations" USING btree ("slug");
  CREATE INDEX "designations_updated_at_idx" ON "designations" USING btree ("updated_at");
  CREATE INDEX "designations_created_at_idx" ON "designations" USING btree ("created_at");
  CREATE INDEX "designations_seo_seo_image_idx" ON "designations_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "designations_locales_locale_parent_id_unique" ON "designations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "designations_rels_order_idx" ON "designations_rels" USING btree ("order");
  CREATE INDEX "designations_rels_parent_idx" ON "designations_rels" USING btree ("parent_id");
  CREATE INDEX "designations_rels_path_idx" ON "designations_rels" USING btree ("path");
  CREATE INDEX "designations_rels_categories_id_idx" ON "designations_rels" USING btree ("categories_id");
  CREATE INDEX "designations_rels_tags_id_idx" ON "designations_rels" USING btree ("tags_id");
  CREATE INDEX "skills_details_specifications_list_order_idx" ON "skills_details_specifications_list" USING btree ("_order");
  CREATE INDEX "skills_details_specifications_list_parent_id_idx" ON "skills_details_specifications_list" USING btree ("_parent_id");
  CREATE INDEX "skills_details_features_list_order_idx" ON "skills_details_features_list" USING btree ("_order");
  CREATE INDEX "skills_details_features_list_parent_id_idx" ON "skills_details_features_list" USING btree ("_parent_id");
  CREATE INDEX "skills_name_idx" ON "skills" USING btree ("name");
  CREATE UNIQUE INDEX "skills_slug_idx" ON "skills" USING btree ("slug");
  CREATE INDEX "skills_updated_at_idx" ON "skills" USING btree ("updated_at");
  CREATE INDEX "skills_created_at_idx" ON "skills" USING btree ("created_at");
  CREATE INDEX "skills_seo_seo_image_idx" ON "skills_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "skills_locales_locale_parent_id_unique" ON "skills_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "skills_rels_order_idx" ON "skills_rels" USING btree ("order");
  CREATE INDEX "skills_rels_parent_idx" ON "skills_rels" USING btree ("parent_id");
  CREATE INDEX "skills_rels_path_idx" ON "skills_rels" USING btree ("path");
  CREATE INDEX "skills_rels_categories_id_idx" ON "skills_rels" USING btree ("categories_id");
  CREATE INDEX "skills_rels_tags_id_idx" ON "skills_rels" USING btree ("tags_id");
  CREATE INDEX "statuses_name_idx" ON "statuses" USING btree ("name");
  CREATE UNIQUE INDEX "statuses_slug_idx" ON "statuses" USING btree ("slug");
  CREATE INDEX "statuses_updated_at_idx" ON "statuses" USING btree ("updated_at");
  CREATE INDEX "statuses_created_at_idx" ON "statuses" USING btree ("created_at");
  CREATE INDEX "statuses_seo_seo_image_idx" ON "statuses_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "statuses_locales_locale_parent_id_unique" ON "statuses_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "statuses_rels_order_idx" ON "statuses_rels" USING btree ("order");
  CREATE INDEX "statuses_rels_parent_idx" ON "statuses_rels" USING btree ("parent_id");
  CREATE INDEX "statuses_rels_path_idx" ON "statuses_rels" USING btree ("path");
  CREATE INDEX "statuses_rels_categories_id_idx" ON "statuses_rels" USING btree ("categories_id");
  CREATE INDEX "statuses_rels_tags_id_idx" ON "statuses_rels" USING btree ("tags_id");
  CREATE INDEX "regulations_name_idx" ON "regulations" USING btree ("name");
  CREATE INDEX "regulations_basics_basics_status_idx" ON "regulations" USING btree ("basics_status");
  CREATE INDEX "regulations_basics_basics_code_idx" ON "regulations" USING btree ("basics_code");
  CREATE INDEX "regulations_basics_basics_document_idx" ON "regulations" USING btree ("basics_document_id");
  CREATE UNIQUE INDEX "regulations_slug_idx" ON "regulations" USING btree ("slug");
  CREATE INDEX "regulations_updated_at_idx" ON "regulations" USING btree ("updated_at");
  CREATE INDEX "regulations_created_at_idx" ON "regulations" USING btree ("created_at");
  CREATE INDEX "regulations_seo_seo_image_idx" ON "regulations_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "regulations_locales_locale_parent_id_unique" ON "regulations_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "regulations_rels_order_idx" ON "regulations_rels" USING btree ("order");
  CREATE INDEX "regulations_rels_parent_idx" ON "regulations_rels" USING btree ("parent_id");
  CREATE INDEX "regulations_rels_path_idx" ON "regulations_rels" USING btree ("path");
  CREATE INDEX "regulations_rels_categories_id_idx" ON "regulations_rels" USING btree ("categories_id");
  CREATE INDEX "regulations_rels_tags_id_idx" ON "regulations_rels" USING btree ("tags_id");
  CREATE INDEX "policies_name_idx" ON "policies" USING btree ("name");
  CREATE INDEX "policies_basics_basics_document_idx" ON "policies" USING btree ("basics_document_id");
  CREATE UNIQUE INDEX "policies_slug_idx" ON "policies" USING btree ("slug");
  CREATE INDEX "policies_updated_at_idx" ON "policies" USING btree ("updated_at");
  CREATE INDEX "policies_created_at_idx" ON "policies" USING btree ("created_at");
  CREATE INDEX "policies_seo_seo_image_idx" ON "policies_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "policies_locales_locale_parent_id_unique" ON "policies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "policies_rels_order_idx" ON "policies_rels" USING btree ("order");
  CREATE INDEX "policies_rels_parent_idx" ON "policies_rels" USING btree ("parent_id");
  CREATE INDEX "policies_rels_path_idx" ON "policies_rels" USING btree ("path");
  CREATE INDEX "policies_rels_categories_id_idx" ON "policies_rels" USING btree ("categories_id");
  CREATE INDEX "policies_rels_tags_id_idx" ON "policies_rels" USING btree ("tags_id");
  CREATE INDEX "statements_name_idx" ON "statements" USING btree ("name");
  CREATE INDEX "statements_basics_basics_status_idx" ON "statements" USING btree ("basics_status");
  CREATE INDEX "statements_basics_basics_authority_idx" ON "statements" USING btree ("basics_authority_id");
  CREATE UNIQUE INDEX "statements_slug_idx" ON "statements" USING btree ("slug");
  CREATE INDEX "statements_updated_at_idx" ON "statements" USING btree ("updated_at");
  CREATE INDEX "statements_created_at_idx" ON "statements" USING btree ("created_at");
  CREATE INDEX "statements_seo_seo_image_idx" ON "statements_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "statements_locales_locale_parent_id_unique" ON "statements_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "statements_rels_order_idx" ON "statements_rels" USING btree ("order");
  CREATE INDEX "statements_rels_parent_idx" ON "statements_rels" USING btree ("parent_id");
  CREATE INDEX "statements_rels_path_idx" ON "statements_rels" USING btree ("path");
  CREATE INDEX "statements_rels_categories_id_idx" ON "statements_rels" USING btree ("categories_id");
  CREATE INDEX "statements_rels_tags_id_idx" ON "statements_rels" USING btree ("tags_id");
  CREATE INDEX "slides_traits_tags_list_order_idx" ON "slides_traits_tags_list" USING btree ("_order");
  CREATE INDEX "slides_traits_tags_list_parent_id_idx" ON "slides_traits_tags_list" USING btree ("_parent_id");
  CREATE INDEX "slides_name_idx" ON "slides" USING btree ("name");
  CREATE INDEX "slides_basics_identifiers_basics_identifiers_code_idx" ON "slides" USING btree ("basics_identifiers_code");
  CREATE INDEX "slides_details_details_type_idx" ON "slides" USING btree ("details_type");
  CREATE INDEX "slides_details_details_order_idx" ON "slides" USING btree ("details_order");
  CREATE INDEX "slides_assets_assets_background_idx" ON "slides" USING btree ("assets_background_id");
  CREATE INDEX "slides_assets_assets_thumbnail_idx" ON "slides" USING btree ("assets_thumbnail_id");
  CREATE INDEX "slides_assets_assets_foreground_idx" ON "slides" USING btree ("assets_foreground_id");
  CREATE UNIQUE INDEX "slides_slug_idx" ON "slides" USING btree ("slug");
  CREATE INDEX "slides_updated_at_idx" ON "slides" USING btree ("updated_at");
  CREATE INDEX "slides_created_at_idx" ON "slides" USING btree ("created_at");
  CREATE INDEX "slides_seo_seo_image_idx" ON "slides_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "slides_locales_locale_parent_id_unique" ON "slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "slides_rels_order_idx" ON "slides_rels" USING btree ("order");
  CREATE INDEX "slides_rels_parent_idx" ON "slides_rels" USING btree ("parent_id");
  CREATE INDEX "slides_rels_path_idx" ON "slides_rels" USING btree ("path");
  CREATE INDEX "slides_rels_categories_id_idx" ON "slides_rels" USING btree ("categories_id");
  CREATE INDEX "slides_rels_tags_id_idx" ON "slides_rels" USING btree ("tags_id");
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
  CREATE UNIQUE INDEX "countries_name_idx" ON "countries" USING btree ("name");
  CREATE UNIQUE INDEX "countries_code_idx" ON "countries" USING btree ("code");
  CREATE INDEX "countries_basics_basics_flag_idx" ON "countries" USING btree ("basics_flag_id");
  CREATE UNIQUE INDEX "countries_slug_idx" ON "countries" USING btree ("slug");
  CREATE INDEX "countries_updated_at_idx" ON "countries" USING btree ("updated_at");
  CREATE INDEX "countries_created_at_idx" ON "countries" USING btree ("created_at");
  CREATE INDEX "countries_seo_seo_image_idx" ON "countries_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "countries_locales_locale_parent_id_unique" ON "countries_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "countries_rels_order_idx" ON "countries_rels" USING btree ("order");
  CREATE INDEX "countries_rels_parent_idx" ON "countries_rels" USING btree ("parent_id");
  CREATE INDEX "countries_rels_path_idx" ON "countries_rels" USING btree ("path");
  CREATE INDEX "countries_rels_categories_id_idx" ON "countries_rels" USING btree ("categories_id");
  CREATE INDEX "countries_rels_tags_id_idx" ON "countries_rels" USING btree ("tags_id");
  CREATE INDEX "plans_traits_milestones_list_order_idx" ON "plans_traits_milestones_list" USING btree ("_order");
  CREATE INDEX "plans_traits_milestones_list_parent_id_idx" ON "plans_traits_milestones_list" USING btree ("_parent_id");
  CREATE INDEX "plans_traits_deliverables_list_order_idx" ON "plans_traits_deliverables_list" USING btree ("_order");
  CREATE INDEX "plans_traits_deliverables_list_parent_id_idx" ON "plans_traits_deliverables_list" USING btree ("_parent_id");
  CREATE INDEX "plans_traits_risks_list_order_idx" ON "plans_traits_risks_list" USING btree ("_order");
  CREATE INDEX "plans_traits_risks_list_parent_id_idx" ON "plans_traits_risks_list" USING btree ("_parent_id");
  CREATE INDEX "plans_traits_kpis_list_order_idx" ON "plans_traits_kpis_list" USING btree ("_order");
  CREATE INDEX "plans_traits_kpis_list_parent_id_idx" ON "plans_traits_kpis_list" USING btree ("_parent_id");
  CREATE INDEX "plans_name_idx" ON "plans" USING btree ("name");
  CREATE INDEX "plans_basics_identifiers_basics_identifiers_code_idx" ON "plans" USING btree ("basics_identifiers_code");
  CREATE INDEX "plans_details_details_status_idx" ON "plans" USING btree ("details_status");
  CREATE INDEX "plans_details_details_assigned_to_idx" ON "plans" USING btree ("details_assigned_to_id");
  CREATE INDEX "plans_assets_assets_thumbnail_idx" ON "plans" USING btree ("assets_thumbnail_id");
  CREATE INDEX "plans_assets_assets_cover_idx" ON "plans" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "plans_slug_idx" ON "plans" USING btree ("slug");
  CREATE INDEX "plans_updated_at_idx" ON "plans" USING btree ("updated_at");
  CREATE INDEX "plans_created_at_idx" ON "plans" USING btree ("created_at");
  CREATE INDEX "plans_seo_seo_image_idx" ON "plans_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "plans_locales_locale_parent_id_unique" ON "plans_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "plans_rels_order_idx" ON "plans_rels" USING btree ("order");
  CREATE INDEX "plans_rels_parent_idx" ON "plans_rels" USING btree ("parent_id");
  CREATE INDEX "plans_rels_path_idx" ON "plans_rels" USING btree ("path");
  CREATE INDEX "plans_rels_plans_id_idx" ON "plans_rels" USING btree ("plans_id");
  CREATE INDEX "plans_rels_media_id_idx" ON "plans_rels" USING btree ("media_id");
  CREATE INDEX "plans_rels_categories_id_idx" ON "plans_rels" USING btree ("categories_id");
  CREATE INDEX "plans_rels_tags_id_idx" ON "plans_rels" USING btree ("tags_id");
  CREATE INDEX "timelines_traits_milestones_list_order_idx" ON "timelines_traits_milestones_list" USING btree ("_order");
  CREATE INDEX "timelines_traits_milestones_list_parent_id_idx" ON "timelines_traits_milestones_list" USING btree ("_parent_id");
  CREATE INDEX "timelines_traits_milestones_list_icon_idx" ON "timelines_traits_milestones_list" USING btree ("icon_id");
  CREATE INDEX "timelines_traits_events_list_order_idx" ON "timelines_traits_events_list" USING btree ("_order");
  CREATE INDEX "timelines_traits_events_list_parent_id_idx" ON "timelines_traits_events_list" USING btree ("_parent_id");
  CREATE INDEX "timelines_traits_events_list_location_idx" ON "timelines_traits_events_list" USING btree ("location");
  CREATE INDEX "timelines_name_idx" ON "timelines" USING btree ("name");
  CREATE INDEX "timelines_details_details_status_idx" ON "timelines" USING btree ("details_status");
  CREATE INDEX "timelines_assets_assets_thumbnail_idx" ON "timelines" USING btree ("assets_thumbnail_id");
  CREATE INDEX "timelines_assets_assets_cover_idx" ON "timelines" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "timelines_slug_idx" ON "timelines" USING btree ("slug");
  CREATE INDEX "timelines_updated_at_idx" ON "timelines" USING btree ("updated_at");
  CREATE INDEX "timelines_created_at_idx" ON "timelines" USING btree ("created_at");
  CREATE INDEX "timelines_seo_seo_image_idx" ON "timelines_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "timelines_locales_locale_parent_id_unique" ON "timelines_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "timelines_rels_order_idx" ON "timelines_rels" USING btree ("order");
  CREATE INDEX "timelines_rels_parent_idx" ON "timelines_rels" USING btree ("parent_id");
  CREATE INDEX "timelines_rels_path_idx" ON "timelines_rels" USING btree ("path");
  CREATE INDEX "timelines_rels_media_id_idx" ON "timelines_rels" USING btree ("media_id");
  CREATE INDEX "timelines_rels_categories_id_idx" ON "timelines_rels" USING btree ("categories_id");
  CREATE INDEX "timelines_rels_tags_id_idx" ON "timelines_rels" USING btree ("tags_id");
  CREATE INDEX "programs_traits_eligibility_list_order_idx" ON "programs_traits_eligibility_list" USING btree ("_order");
  CREATE INDEX "programs_traits_eligibility_list_parent_id_idx" ON "programs_traits_eligibility_list" USING btree ("_parent_id");
  CREATE INDEX "programs_traits_curriculum_list_order_idx" ON "programs_traits_curriculum_list" USING btree ("_order");
  CREATE INDEX "programs_traits_curriculum_list_parent_id_idx" ON "programs_traits_curriculum_list" USING btree ("_parent_id");
  CREATE INDEX "programs_name_idx" ON "programs" USING btree ("name");
  CREATE INDEX "programs_basics_identifiers_basics_identifiers_code_idx" ON "programs" USING btree ("basics_identifiers_code");
  CREATE INDEX "programs_details_details_status_idx" ON "programs" USING btree ("details_status");
  CREATE INDEX "programs_assets_assets_thumbnail_idx" ON "programs" USING btree ("assets_thumbnail_id");
  CREATE INDEX "programs_assets_assets_cover_idx" ON "programs" USING btree ("assets_cover_id");
  CREATE UNIQUE INDEX "programs_slug_idx" ON "programs" USING btree ("slug");
  CREATE INDEX "programs_updated_at_idx" ON "programs" USING btree ("updated_at");
  CREATE INDEX "programs_created_at_idx" ON "programs" USING btree ("created_at");
  CREATE INDEX "programs_seo_seo_image_idx" ON "programs_locales" USING btree ("seo_image_id","_locale");
  CREATE UNIQUE INDEX "programs_locales_locale_parent_id_unique" ON "programs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "programs_rels_order_idx" ON "programs_rels" USING btree ("order");
  CREATE INDEX "programs_rels_parent_idx" ON "programs_rels" USING btree ("parent_id");
  CREATE INDEX "programs_rels_path_idx" ON "programs_rels" USING btree ("path");
  CREATE INDEX "programs_rels_leaders_id_idx" ON "programs_rels" USING btree ("leaders_id");
  CREATE INDEX "programs_rels_drivers_id_idx" ON "programs_rels" USING btree ("drivers_id");
  CREATE INDEX "programs_rels_organizations_id_idx" ON "programs_rels" USING btree ("organizations_id");
  CREATE INDEX "programs_rels_media_id_idx" ON "programs_rels" USING btree ("media_id");
  CREATE INDEX "programs_rels_categories_id_idx" ON "programs_rels" USING btree ("categories_id");
  CREATE INDEX "programs_rels_tags_id_idx" ON "programs_rels" USING btree ("tags_id");
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
  CREATE INDEX "search_rels_circuits_id_idx" ON "search_rels" USING btree ("circuits_id");
  CREATE INDEX "search_rels_championships_id_idx" ON "search_rels" USING btree ("championships_id");
  CREATE INDEX "search_rels_races_id_idx" ON "search_rels" USING btree ("races_id");
  CREATE INDEX "search_rels_teams_id_idx" ON "search_rels" USING btree ("teams_id");
  CREATE INDEX "search_rels_drivers_id_idx" ON "search_rels" USING btree ("drivers_id");
  CREATE INDEX "search_rels_leaders_id_idx" ON "search_rels" USING btree ("leaders_id");
  CREATE INDEX "search_rels_members_id_idx" ON "search_rels" USING btree ("members_id");
  CREATE INDEX "search_rels_individuals_id_idx" ON "search_rels" USING btree ("individuals_id");
  CREATE INDEX "search_rels_organizations_id_idx" ON "search_rels" USING btree ("organizations_id");
  CREATE INDEX "search_rels_users_id_idx" ON "search_rels" USING btree ("users_id");
  CREATE INDEX "search_rels_meetups_id_idx" ON "search_rels" USING btree ("meetups_id");
  CREATE INDEX "search_rels_initiatives_id_idx" ON "search_rels" USING btree ("initiatives_id");
  CREATE INDEX "search_rels_trainings_id_idx" ON "search_rels" USING btree ("trainings_id");
  CREATE INDEX "search_rels_vacancies_id_idx" ON "search_rels" USING btree ("vacancies_id");
  CREATE INDEX "search_rels_onboardings_id_idx" ON "search_rels" USING btree ("onboardings_id");
  CREATE INDEX "search_rels_awards_id_idx" ON "search_rels" USING btree ("awards_id");
  CREATE INDEX "search_rels_celebrations_id_idx" ON "search_rels" USING btree ("celebrations_id");
  CREATE INDEX "search_rels_interviews_id_idx" ON "search_rels" USING btree ("interviews_id");
  CREATE INDEX "search_rels_incidents_id_idx" ON "search_rels" USING btree ("incidents_id");
  CREATE INDEX "search_rels_cars_id_idx" ON "search_rels" USING btree ("cars_id");
  CREATE INDEX "search_rels_helmets_id_idx" ON "search_rels" USING btree ("helmets_id");
  CREATE INDEX "search_rels_suits_id_idx" ON "search_rels" USING btree ("suits_id");
  CREATE INDEX "search_rels_garages_id_idx" ON "search_rels" USING btree ("garages_id");
  CREATE INDEX "search_rels_media_id_idx" ON "search_rels" USING btree ("media_id");
  CREATE INDEX "search_rels_designations_id_idx" ON "search_rels" USING btree ("designations_id");
  CREATE INDEX "search_rels_skills_id_idx" ON "search_rels" USING btree ("skills_id");
  CREATE INDEX "search_rels_statuses_id_idx" ON "search_rels" USING btree ("statuses_id");
  CREATE INDEX "search_rels_regulations_id_idx" ON "search_rels" USING btree ("regulations_id");
  CREATE INDEX "search_rels_policies_id_idx" ON "search_rels" USING btree ("policies_id");
  CREATE INDEX "search_rels_statements_id_idx" ON "search_rels" USING btree ("statements_id");
  CREATE INDEX "search_rels_slides_id_idx" ON "search_rels" USING btree ("slides_id");
  CREATE INDEX "search_rels_pages_id_idx" ON "search_rels" USING btree ("pages_id");
  CREATE INDEX "search_rels_categories_id_idx" ON "search_rels" USING btree ("categories_id");
  CREATE INDEX "search_rels_tags_id_idx" ON "search_rels" USING btree ("tags_id");
  CREATE INDEX "search_rels_countries_id_idx" ON "search_rels" USING btree ("countries_id");
  CREATE INDEX "search_rels_plans_id_idx" ON "search_rels" USING btree ("plans_id");
  CREATE INDEX "search_rels_timelines_id_idx" ON "search_rels" USING btree ("timelines_id");
  CREATE INDEX "search_rels_programs_id_idx" ON "search_rels" USING btree ("programs_id");
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
  CREATE INDEX "payload_locked_documents_rels_circuits_id_idx" ON "payload_locked_documents_rels" USING btree ("circuits_id");
  CREATE INDEX "payload_locked_documents_rels_championships_id_idx" ON "payload_locked_documents_rels" USING btree ("championships_id");
  CREATE INDEX "payload_locked_documents_rels_races_id_idx" ON "payload_locked_documents_rels" USING btree ("races_id");
  CREATE INDEX "payload_locked_documents_rels_teams_id_idx" ON "payload_locked_documents_rels" USING btree ("teams_id");
  CREATE INDEX "payload_locked_documents_rels_drivers_id_idx" ON "payload_locked_documents_rels" USING btree ("drivers_id");
  CREATE INDEX "payload_locked_documents_rels_leaders_id_idx" ON "payload_locked_documents_rels" USING btree ("leaders_id");
  CREATE INDEX "payload_locked_documents_rels_members_id_idx" ON "payload_locked_documents_rels" USING btree ("members_id");
  CREATE INDEX "payload_locked_documents_rels_individuals_id_idx" ON "payload_locked_documents_rels" USING btree ("individuals_id");
  CREATE INDEX "payload_locked_documents_rels_organizations_id_idx" ON "payload_locked_documents_rels" USING btree ("organizations_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_meetups_id_idx" ON "payload_locked_documents_rels" USING btree ("meetups_id");
  CREATE INDEX "payload_locked_documents_rels_initiatives_id_idx" ON "payload_locked_documents_rels" USING btree ("initiatives_id");
  CREATE INDEX "payload_locked_documents_rels_trainings_id_idx" ON "payload_locked_documents_rels" USING btree ("trainings_id");
  CREATE INDEX "payload_locked_documents_rels_vacancies_id_idx" ON "payload_locked_documents_rels" USING btree ("vacancies_id");
  CREATE INDEX "payload_locked_documents_rels_onboardings_id_idx" ON "payload_locked_documents_rels" USING btree ("onboardings_id");
  CREATE INDEX "payload_locked_documents_rels_awards_id_idx" ON "payload_locked_documents_rels" USING btree ("awards_id");
  CREATE INDEX "payload_locked_documents_rels_celebrations_id_idx" ON "payload_locked_documents_rels" USING btree ("celebrations_id");
  CREATE INDEX "payload_locked_documents_rels_interviews_id_idx" ON "payload_locked_documents_rels" USING btree ("interviews_id");
  CREATE INDEX "payload_locked_documents_rels_incidents_id_idx" ON "payload_locked_documents_rels" USING btree ("incidents_id");
  CREATE INDEX "payload_locked_documents_rels_cars_id_idx" ON "payload_locked_documents_rels" USING btree ("cars_id");
  CREATE INDEX "payload_locked_documents_rels_helmets_id_idx" ON "payload_locked_documents_rels" USING btree ("helmets_id");
  CREATE INDEX "payload_locked_documents_rels_suits_id_idx" ON "payload_locked_documents_rels" USING btree ("suits_id");
  CREATE INDEX "payload_locked_documents_rels_garages_id_idx" ON "payload_locked_documents_rels" USING btree ("garages_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_designations_id_idx" ON "payload_locked_documents_rels" USING btree ("designations_id");
  CREATE INDEX "payload_locked_documents_rels_skills_id_idx" ON "payload_locked_documents_rels" USING btree ("skills_id");
  CREATE INDEX "payload_locked_documents_rels_statuses_id_idx" ON "payload_locked_documents_rels" USING btree ("statuses_id");
  CREATE INDEX "payload_locked_documents_rels_regulations_id_idx" ON "payload_locked_documents_rels" USING btree ("regulations_id");
  CREATE INDEX "payload_locked_documents_rels_policies_id_idx" ON "payload_locked_documents_rels" USING btree ("policies_id");
  CREATE INDEX "payload_locked_documents_rels_statements_id_idx" ON "payload_locked_documents_rels" USING btree ("statements_id");
  CREATE INDEX "payload_locked_documents_rels_slides_id_idx" ON "payload_locked_documents_rels" USING btree ("slides_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_countries_id_idx" ON "payload_locked_documents_rels" USING btree ("countries_id");
  CREATE INDEX "payload_locked_documents_rels_plans_id_idx" ON "payload_locked_documents_rels" USING btree ("plans_id");
  CREATE INDEX "payload_locked_documents_rels_timelines_id_idx" ON "payload_locked_documents_rels" USING btree ("timelines_id");
  CREATE INDEX "payload_locked_documents_rels_programs_id_idx" ON "payload_locked_documents_rels" USING btree ("programs_id");
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
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_utility_nav_order_idx" ON "header_utility_nav" USING btree ("_order");
  CREATE INDEX "header_utility_nav_parent_id_idx" ON "header_utility_nav" USING btree ("_parent_id");
  CREATE INDEX "header_rels_order_idx" ON "header_rels" USING btree ("order");
  CREATE INDEX "header_rels_parent_idx" ON "header_rels" USING btree ("parent_id");
  CREATE INDEX "header_rels_path_idx" ON "header_rels" USING btree ("path");
  CREATE INDEX "header_rels_pages_id_idx" ON "header_rels" USING btree ("pages_id");
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
  CREATE UNIQUE INDEX "identity_values_locales_locale_parent_id_unique" ON "identity_values_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "identity_voice_tone_keywords_order_idx" ON "identity_voice_tone_keywords" USING btree ("_order");
  CREATE INDEX "identity_voice_tone_keywords_parent_id_idx" ON "identity_voice_tone_keywords" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "identity_voice_tone_keywords_locales_locale_parent_id_unique" ON "identity_voice_tone_keywords_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "identity_sustainability_initiative_names_order_idx" ON "identity_sustainability_initiative_names" USING btree ("_order");
  CREATE INDEX "identity_sustainability_initiative_names_parent_id_idx" ON "identity_sustainability_initiative_names" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "identity_sustainability_initiative_names_locales_locale_pare" ON "identity_sustainability_initiative_names_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "identity_visual_visual_logo_idx" ON "identity" USING btree ("visual_logo_id");
  CREATE INDEX "identity_visual_visual_logo_inverted_idx" ON "identity" USING btree ("visual_logo_inverted_id");
  CREATE INDEX "identity_visual_visual_wordmark_idx" ON "identity" USING btree ("visual_wordmark_id");
  CREATE INDEX "identity_visual_visual_favicon_idx" ON "identity" USING btree ("visual_favicon_id");
  CREATE INDEX "identity_visual_visual_guidelines_idx" ON "identity" USING btree ("visual_guidelines_id");
  CREATE UNIQUE INDEX "identity_locales_locale_parent_id_unique" ON "identity_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "identity_rels_order_idx" ON "identity_rels" USING btree ("order");
  CREATE INDEX "identity_rels_parent_idx" ON "identity_rels" USING btree ("parent_id");
  CREATE INDEX "identity_rels_path_idx" ON "identity_rels" USING btree ("path");
  CREATE INDEX "identity_rels_leaders_id_idx" ON "identity_rels" USING btree ("leaders_id");
  CREATE INDEX "announcements_items_order_idx" ON "announcements_items" USING btree ("_order");
  CREATE INDEX "announcements_items_parent_id_idx" ON "announcements_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "announcements_items_locales_locale_parent_id_unique" ON "announcements_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "questions_categories_items_order_idx" ON "questions_categories_items" USING btree ("_order");
  CREATE INDEX "questions_categories_items_parent_id_idx" ON "questions_categories_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "questions_categories_items_locales_locale_parent_id_unique" ON "questions_categories_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "questions_categories_order_idx" ON "questions_categories" USING btree ("_order");
  CREATE INDEX "questions_categories_parent_id_idx" ON "questions_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "questions_categories_locales_locale_parent_id_unique" ON "questions_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "socials_accounts_order_idx" ON "socials_accounts" USING btree ("_order");
  CREATE INDEX "socials_accounts_parent_id_idx" ON "socials_accounts" USING btree ("_parent_id");`)
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
  DROP TABLE "sessions" CASCADE;
  DROP TABLE "sessions_locales" CASCADE;
  DROP TABLE "sessions_rels" CASCADE;
  DROP TABLE "entries" CASCADE;
  DROP TABLE "entries_locales" CASCADE;
  DROP TABLE "entries_rels" CASCADE;
  DROP TABLE "results" CASCADE;
  DROP TABLE "results_locales" CASCADE;
  DROP TABLE "results_rels" CASCADE;
  DROP TABLE "points" CASCADE;
  DROP TABLE "points_locales" CASCADE;
  DROP TABLE "points_rels" CASCADE;
  DROP TABLE "circuits_details_renovated_list" CASCADE;
  DROP TABLE "circuits" CASCADE;
  DROP TABLE "circuits_locales" CASCADE;
  DROP TABLE "circuits_rels" CASCADE;
  DROP TABLE "championships" CASCADE;
  DROP TABLE "championships_locales" CASCADE;
  DROP TABLE "championships_rels" CASCADE;
  DROP TABLE "races" CASCADE;
  DROP TABLE "races_locales" CASCADE;
  DROP TABLE "races_rels" CASCADE;
  DROP TABLE "teams" CASCADE;
  DROP TABLE "teams_locales" CASCADE;
  DROP TABLE "teams_rels" CASCADE;
  DROP TABLE "drivers_details_addresses_list" CASCADE;
  DROP TABLE "drivers_details_websites_list" CASCADE;
  DROP TABLE "drivers_details_socials_list" CASCADE;
  DROP TABLE "drivers_assets_gallery_list" CASCADE;
  DROP TABLE "drivers" CASCADE;
  DROP TABLE "drivers_locales" CASCADE;
  DROP TABLE "drivers_rels" CASCADE;
  DROP TABLE "leaders_details_principles_list" CASCADE;
  DROP TABLE "leaders_details_websites_list" CASCADE;
  DROP TABLE "leaders_details_socials_list" CASCADE;
  DROP TABLE "leaders" CASCADE;
  DROP TABLE "leaders_locales" CASCADE;
  DROP TABLE "leaders_rels" CASCADE;
  DROP TABLE "members_details_addresses_list" CASCADE;
  DROP TABLE "members" CASCADE;
  DROP TABLE "members_locales" CASCADE;
  DROP TABLE "members_rels" CASCADE;
  DROP TABLE "individuals" CASCADE;
  DROP TABLE "individuals_locales" CASCADE;
  DROP TABLE "individuals_rels" CASCADE;
  DROP TABLE "organizations_details_benefits_list" CASCADE;
  DROP TABLE "organizations_details_websites_list" CASCADE;
  DROP TABLE "organizations_details_socials_list" CASCADE;
  DROP TABLE "organizations" CASCADE;
  DROP TABLE "organizations_locales" CASCADE;
  DROP TABLE "organizations_rels" CASCADE;
  DROP TABLE "users_roles" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "meetups" CASCADE;
  DROP TABLE "meetups_locales" CASCADE;
  DROP TABLE "meetups_rels" CASCADE;
  DROP TABLE "initiatives_details_expectations_list" CASCADE;
  DROP TABLE "initiatives" CASCADE;
  DROP TABLE "initiatives_locales" CASCADE;
  DROP TABLE "initiatives_rels" CASCADE;
  DROP TABLE "trainings_details_specifications_list" CASCADE;
  DROP TABLE "trainings_details_expectations_list" CASCADE;
  DROP TABLE "trainings" CASCADE;
  DROP TABLE "trainings_locales" CASCADE;
  DROP TABLE "trainings_rels" CASCADE;
  DROP TABLE "vacancies_details_specifications_list" CASCADE;
  DROP TABLE "vacancies_details_expectations_list" CASCADE;
  DROP TABLE "vacancies_details_positions_list" CASCADE;
  DROP TABLE "vacancies" CASCADE;
  DROP TABLE "vacancies_locales" CASCADE;
  DROP TABLE "vacancies_rels" CASCADE;
  DROP TABLE "onboardings_traits_checklist_list" CASCADE;
  DROP TABLE "onboardings_traits_modules_list" CASCADE;
  DROP TABLE "onboardings_traits_quizzes_list" CASCADE;
  DROP TABLE "onboardings" CASCADE;
  DROP TABLE "onboardings_locales" CASCADE;
  DROP TABLE "onboardings_rels" CASCADE;
  DROP TABLE "awards" CASCADE;
  DROP TABLE "awards_locales" CASCADE;
  DROP TABLE "awards_rels" CASCADE;
  DROP TABLE "celebrations" CASCADE;
  DROP TABLE "celebrations_locales" CASCADE;
  DROP TABLE "celebrations_rels" CASCADE;
  DROP TABLE "interviews_details_tags_list" CASCADE;
  DROP TABLE "interviews" CASCADE;
  DROP TABLE "interviews_locales" CASCADE;
  DROP TABLE "interviews_rels" CASCADE;
  DROP TABLE "incidents" CASCADE;
  DROP TABLE "incidents_locales" CASCADE;
  DROP TABLE "incidents_rels" CASCADE;
  DROP TABLE "cars_details_classifications_list" CASCADE;
  DROP TABLE "cars_details_specifications_list" CASCADE;
  DROP TABLE "cars" CASCADE;
  DROP TABLE "cars_locales" CASCADE;
  DROP TABLE "cars_rels" CASCADE;
  DROP TABLE "helmets_details_classifications_list" CASCADE;
  DROP TABLE "helmets_details_manufacturers_list" CASCADE;
  DROP TABLE "helmets" CASCADE;
  DROP TABLE "helmets_locales" CASCADE;
  DROP TABLE "helmets_rels" CASCADE;
  DROP TABLE "suits_details_manufacturers_list" CASCADE;
  DROP TABLE "suits" CASCADE;
  DROP TABLE "suits_locales" CASCADE;
  DROP TABLE "suits_rels" CASCADE;
  DROP TABLE "garages_details_amenities_list" CASCADE;
  DROP TABLE "garages" CASCADE;
  DROP TABLE "garages_locales" CASCADE;
  DROP TABLE "garages_rels" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "designations" CASCADE;
  DROP TABLE "designations_locales" CASCADE;
  DROP TABLE "designations_rels" CASCADE;
  DROP TABLE "skills_details_specifications_list" CASCADE;
  DROP TABLE "skills_details_features_list" CASCADE;
  DROP TABLE "skills" CASCADE;
  DROP TABLE "skills_locales" CASCADE;
  DROP TABLE "skills_rels" CASCADE;
  DROP TABLE "statuses" CASCADE;
  DROP TABLE "statuses_locales" CASCADE;
  DROP TABLE "statuses_rels" CASCADE;
  DROP TABLE "regulations" CASCADE;
  DROP TABLE "regulations_locales" CASCADE;
  DROP TABLE "regulations_rels" CASCADE;
  DROP TABLE "policies" CASCADE;
  DROP TABLE "policies_locales" CASCADE;
  DROP TABLE "policies_rels" CASCADE;
  DROP TABLE "statements" CASCADE;
  DROP TABLE "statements_locales" CASCADE;
  DROP TABLE "statements_rels" CASCADE;
  DROP TABLE "slides_traits_tags_list" CASCADE;
  DROP TABLE "slides" CASCADE;
  DROP TABLE "slides_locales" CASCADE;
  DROP TABLE "slides_rels" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "pages_rels" CASCADE;
  DROP TABLE "categories_details_type" CASCADE;
  DROP TABLE "categories_details_type_locales" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "categories_locales" CASCADE;
  DROP TABLE "categories_rels" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "tags_locales" CASCADE;
  DROP TABLE "tags_rels" CASCADE;
  DROP TABLE "countries" CASCADE;
  DROP TABLE "countries_locales" CASCADE;
  DROP TABLE "countries_rels" CASCADE;
  DROP TABLE "plans_traits_milestones_list" CASCADE;
  DROP TABLE "plans_traits_deliverables_list" CASCADE;
  DROP TABLE "plans_traits_risks_list" CASCADE;
  DROP TABLE "plans_traits_kpis_list" CASCADE;
  DROP TABLE "plans" CASCADE;
  DROP TABLE "plans_locales" CASCADE;
  DROP TABLE "plans_rels" CASCADE;
  DROP TABLE "timelines_traits_milestones_list" CASCADE;
  DROP TABLE "timelines_traits_events_list" CASCADE;
  DROP TABLE "timelines" CASCADE;
  DROP TABLE "timelines_locales" CASCADE;
  DROP TABLE "timelines_rels" CASCADE;
  DROP TABLE "programs_traits_eligibility_list" CASCADE;
  DROP TABLE "programs_traits_curriculum_list" CASCADE;
  DROP TABLE "programs" CASCADE;
  DROP TABLE "programs_locales" CASCADE;
  DROP TABLE "programs_rels" CASCADE;
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
  DROP TABLE "identity_voice_tone_keywords" CASCADE;
  DROP TABLE "identity_voice_tone_keywords_locales" CASCADE;
  DROP TABLE "identity_sustainability_initiative_names" CASCADE;
  DROP TABLE "identity_sustainability_initiative_names_locales" CASCADE;
  DROP TABLE "identity" CASCADE;
  DROP TABLE "identity_locales" CASCADE;
  DROP TABLE "identity_rels" CASCADE;
  DROP TABLE "announcements_items" CASCADE;
  DROP TABLE "announcements_items_locales" CASCADE;
  DROP TABLE "announcements" CASCADE;
  DROP TABLE "questions_categories_items" CASCADE;
  DROP TABLE "questions_categories_items_locales" CASCADE;
  DROP TABLE "questions_categories" CASCADE;
  DROP TABLE "questions_categories_locales" CASCADE;
  DROP TABLE "questions" CASCADE;
  DROP TABLE "socials_accounts" CASCADE;
  DROP TABLE "socials" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_series_details_status";
  DROP TYPE "public"."enum_series_details_access";
  DROP TYPE "public"."enum_events_details_status";
  DROP TYPE "public"."enum_events_details_access";
  DROP TYPE "public"."enum_sessions_details_access";
  DROP TYPE "public"."enum_entries_details_status";
  DROP TYPE "public"."enum_results_details_status";
  DROP TYPE "public"."enum_points_details_scale";
  DROP TYPE "public"."enum_circuits_details_type";
  DROP TYPE "public"."enum_circuits_details_direction";
  DROP TYPE "public"."enum_circuits_details_fia_grade";
  DROP TYPE "public"."enum_championships_details_standings_scope";
  DROP TYPE "public"."enum_races_details_type";
  DROP TYPE "public"."enum_races_details_status";
  DROP TYPE "public"."enum_drivers_details_socials_list_platform";
  DROP TYPE "public"."enum_drivers_basics_gender";
  DROP TYPE "public"."enum_leaders_details_socials_list_platform";
  DROP TYPE "public"."enum_leaders_basics_gender";
  DROP TYPE "public"."enum_members_basics_gender";
  DROP TYPE "public"."enum_individuals_basics_type";
  DROP TYPE "public"."enum_individuals_basics_gender";
  DROP TYPE "public"."enum_organizations_details_socials_list_platform";
  DROP TYPE "public"."enum_organizations_basics_type";
  DROP TYPE "public"."enum_organizations_details_prestige";
  DROP TYPE "public"."enum_organizations_details_impact";
  DROP TYPE "public"."enum_users_roles";
  DROP TYPE "public"."enum_meetups_details_format";
  DROP TYPE "public"."enum_meetups_details_access";
  DROP TYPE "public"."enum_initiatives_details_expectations_list_type";
  DROP TYPE "public"."enum_trainings_details_expectations_list_type";
  DROP TYPE "public"."enum_trainings_basics_intensity";
  DROP TYPE "public"."enum_trainings_basics_format";
  DROP TYPE "public"."enum_vacancies_details_expectations_list_type";
  DROP TYPE "public"."enum_vacancies_details_contract";
  DROP TYPE "public"."enum_onboardings_details_type";
  DROP TYPE "public"."enum_onboardings_details_format";
  DROP TYPE "public"."enum_onboardings_details_status";
  DROP TYPE "public"."enum_celebrations_details_exclusivity";
  DROP TYPE "public"."enum_interviews_details_format";
  DROP TYPE "public"."enum_interviews_details_status";
  DROP TYPE "public"."enum_interviews_details_access";
  DROP TYPE "public"."enum_cars_details_status";
  DROP TYPE "public"."enum_helmets_details_usage";
  DROP TYPE "public"."enum_helmets_details_branding";
  DROP TYPE "public"."enum_helmets_details_style";
  DROP TYPE "public"."enum_helmets_details_material";
  DROP TYPE "public"."enum_suits_details_usage";
  DROP TYPE "public"."enum_suits_details_durability";
  DROP TYPE "public"."enum_suits_details_material";
  DROP TYPE "public"."enum_suits_details_appearance";
  DROP TYPE "public"."enum_garages_details_type";
  DROP TYPE "public"."enum_garages_details_accessibility";
  DROP TYPE "public"."enum_skills_details_scale";
  DROP TYPE "public"."enum_skills_details_depth";
  DROP TYPE "public"."enum_skills_details_rarity";
  DROP TYPE "public"."enum_skills_details_complexity";
  DROP TYPE "public"."enum_regulations_basics_status";
  DROP TYPE "public"."enum_statements_basics_status";
  DROP TYPE "public"."enum_slides_details_type";
  DROP TYPE "public"."enum_slides_details_orientation";
  DROP TYPE "public"."enum_slides_details_template";
  DROP TYPE "public"."enum_slides_details_transition";
  DROP TYPE "public"."enum_plans_traits_risks_list_likelihood";
  DROP TYPE "public"."enum_plans_traits_risks_list_impact";
  DROP TYPE "public"."enum_plans_details_scope";
  DROP TYPE "public"."enum_plans_details_status";
  DROP TYPE "public"."enum_plans_details_priority";
  DROP TYPE "public"."enum_plans_details_currency";
  DROP TYPE "public"."enum_timelines_details_scope";
  DROP TYPE "public"."enum_timelines_details_status";
  DROP TYPE "public"."enum_timelines_details_color_scheme";
  DROP TYPE "public"."enum_timelines_details_orientation";
  DROP TYPE "public"."enum_programs_details_type";
  DROP TYPE "public"."enum_programs_details_status";
  DROP TYPE "public"."enum_programs_details_duration";
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
  DROP TYPE "public"."enum_header_cta_link_type";
  DROP TYPE "public"."enum_footer_columns_links_link_type";
  DROP TYPE "public"."enum_footer_legal_link_type";
  DROP TYPE "public"."enum_footer_cta_link_type";
  DROP TYPE "public"."enum_announcements_items_type";
  DROP TYPE "public"."enum_announcements_items_audience";
  DROP TYPE "public"."enum_socials_accounts_platform";`)
}
