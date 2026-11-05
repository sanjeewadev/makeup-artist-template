import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`portfolio_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text NOT NULL,
  	\`description\` text,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`portfolio_categories_title_idx\` ON \`portfolio_categories\` (\`title\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`portfolio_categories_slug_idx\` ON \`portfolio_categories\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_categories_updated_at_idx\` ON \`portfolio_categories\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_categories_created_at_idx\` ON \`portfolio_categories\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`portfolio_projects_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`presentation\` text DEFAULT 'auto',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`portfolio_projects\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`portfolio_projects_gallery_order_idx\` ON \`portfolio_projects_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_projects_gallery_parent_id_idx\` ON \`portfolio_projects_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_projects_gallery_image_idx\` ON \`portfolio_projects_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`portfolio_projects\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`category_id\` integer,
  	\`client_name\` text,
  	\`excerpt\` text,
  	\`hero_image_id\` integer,
  	\`story\` text,
  	\`event_date\` text,
  	\`location\` text,
  	\`featured\` integer DEFAULT false,
  	\`sort_order\` numeric DEFAULT 0,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`category_id\`) REFERENCES \`portfolio_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`portfolio_projects_title_idx\` ON \`portfolio_projects\` (\`title\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`portfolio_projects_slug_idx\` ON \`portfolio_projects\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_projects_category_idx\` ON \`portfolio_projects\` (\`category_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_projects_hero_image_idx\` ON \`portfolio_projects\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_projects_seo_seo_image_idx\` ON \`portfolio_projects\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_projects_updated_at_idx\` ON \`portfolio_projects\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_projects_created_at_idx\` ON \`portfolio_projects\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`portfolio_projects__status_idx\` ON \`portfolio_projects\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_portfolio_projects_v_version_gallery\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`image_id\` integer,
  	\`caption\` text,
  	\`presentation\` text DEFAULT 'auto',
  	\`_uuid\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_portfolio_projects_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_version_gallery_order_idx\` ON \`_portfolio_projects_v_version_gallery\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_version_gallery_parent_id_idx\` ON \`_portfolio_projects_v_version_gallery\` (\`_parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_version_gallery_image_idx\` ON \`_portfolio_projects_v_version_gallery\` (\`image_id\`);`)
  await db.run(sql`CREATE TABLE \`_portfolio_projects_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_category_id\` integer,
  	\`version_client_name\` text,
  	\`version_excerpt\` text,
  	\`version_hero_image_id\` integer,
  	\`version_story\` text,
  	\`version_event_date\` text,
  	\`version_location\` text,
  	\`version_featured\` integer DEFAULT false,
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`portfolio_projects\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_category_id\`) REFERENCES \`portfolio_categories\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_parent_idx\` ON \`_portfolio_projects_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_version_version_title_idx\` ON \`_portfolio_projects_v\` (\`version_title\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_version_version_slug_idx\` ON \`_portfolio_projects_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_version_version_category_idx\` ON \`_portfolio_projects_v\` (\`version_category_id\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_version_version_hero_image_idx\` ON \`_portfolio_projects_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_version_seo_version_seo_image_idx\` ON \`_portfolio_projects_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_version_version_updated_at_idx\` ON \`_portfolio_projects_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_version_version_created_at_idx\` ON \`_portfolio_projects_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_version_version__status_idx\` ON \`_portfolio_projects_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_created_at_idx\` ON \`_portfolio_projects_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_updated_at_idx\` ON \`_portfolio_projects_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_latest_idx\` ON \`_portfolio_projects_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_portfolio_projects_v_autosave_idx\` ON \`_portfolio_projects_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`services\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`short_description\` text,
  	\`description\` text,
  	\`image_id\` integer,
  	\`price_label\` text,
  	\`duration_label\` text,
  	\`featured\` integer DEFAULT false,
  	\`sort_order\` numeric DEFAULT 0,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`services_title_idx\` ON \`services\` (\`title\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`services_slug_idx\` ON \`services\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`services_image_idx\` ON \`services\` (\`image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_seo_seo_image_idx\` ON \`services\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`services_updated_at_idx\` ON \`services\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`services_created_at_idx\` ON \`services\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`services__status_idx\` ON \`services\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_services_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_short_description\` text,
  	\`version_description\` text,
  	\`version_image_id\` integer,
  	\`version_price_label\` text,
  	\`version_duration_label\` text,
  	\`version_featured\` integer DEFAULT false,
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_services_v_parent_idx\` ON \`_services_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_title_idx\` ON \`_services_v\` (\`version_title\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_slug_idx\` ON \`_services_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_image_idx\` ON \`_services_v\` (\`version_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_seo_version_seo_image_idx\` ON \`_services_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_updated_at_idx\` ON \`_services_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version_created_at_idx\` ON \`_services_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_version_version__status_idx\` ON \`_services_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_created_at_idx\` ON \`_services_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_updated_at_idx\` ON \`_services_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_latest_idx\` ON \`_services_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_services_v_autosave_idx\` ON \`_services_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`testimonials\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`client_name\` text,
  	\`quote\` text,
  	\`service_id\` integer,
  	\`location\` text,
  	\`portrait_id\` integer,
  	\`featured\` integer DEFAULT false,
  	\`sort_order\` numeric DEFAULT 0,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`service_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`testimonials_service_idx\` ON \`testimonials\` (\`service_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_portrait_idx\` ON \`testimonials\` (\`portrait_id\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_updated_at_idx\` ON \`testimonials\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials_created_at_idx\` ON \`testimonials\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`testimonials__status_idx\` ON \`testimonials\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_testimonials_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_client_name\` text,
  	\`version_quote\` text,
  	\`version_service_id\` integer,
  	\`version_location\` text,
  	\`version_portrait_id\` integer,
  	\`version_featured\` integer DEFAULT false,
  	\`version_sort_order\` numeric DEFAULT 0,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_service_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_testimonials_v_parent_idx\` ON \`_testimonials_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_service_idx\` ON \`_testimonials_v\` (\`version_service_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_portrait_idx\` ON \`_testimonials_v\` (\`version_portrait_id\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_updated_at_idx\` ON \`_testimonials_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version_created_at_idx\` ON \`_testimonials_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_version_version__status_idx\` ON \`_testimonials_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_created_at_idx\` ON \`_testimonials_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_updated_at_idx\` ON \`_testimonials_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_latest_idx\` ON \`_testimonials_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_testimonials_v_autosave_idx\` ON \`_testimonials_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`journal_posts_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`journal_posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`journal_posts_tags_order_idx\` ON \`journal_posts_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`journal_posts_tags_parent_id_idx\` ON \`journal_posts_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`journal_posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`excerpt\` text,
  	\`featured_image_id\` integer,
  	\`content\` text,
  	\`published_at\` text,
  	\`featured\` integer DEFAULT false,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`journal_posts_title_idx\` ON \`journal_posts\` (\`title\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`journal_posts_slug_idx\` ON \`journal_posts\` (\`slug\`);`)
  await db.run(sql`CREATE INDEX \`journal_posts_featured_image_idx\` ON \`journal_posts\` (\`featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`journal_posts_seo_seo_image_idx\` ON \`journal_posts\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`journal_posts_updated_at_idx\` ON \`journal_posts\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`journal_posts_created_at_idx\` ON \`journal_posts\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`journal_posts__status_idx\` ON \`journal_posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_journal_posts_v_version_tags\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_journal_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_version_tags_order_idx\` ON \`_journal_posts_v_version_tags\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_version_tags_parent_id_idx\` ON \`_journal_posts_v_version_tags\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_journal_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_excerpt\` text,
  	\`version_featured_image_id\` integer,
  	\`version_content\` text,
  	\`version_published_at\` text,
  	\`version_featured\` integer DEFAULT false,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`journal_posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_parent_idx\` ON \`_journal_posts_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_version_version_title_idx\` ON \`_journal_posts_v\` (\`version_title\`);`)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_version_version_slug_idx\` ON \`_journal_posts_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_version_version_featured_image_idx\` ON \`_journal_posts_v\` (\`version_featured_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_version_seo_version_seo_image_idx\` ON \`_journal_posts_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_version_version_updated_at_idx\` ON \`_journal_posts_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_version_version_created_at_idx\` ON \`_journal_posts_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_version_version__status_idx\` ON \`_journal_posts_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_created_at_idx\` ON \`_journal_posts_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_updated_at_idx\` ON \`_journal_posts_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_latest_idx\` ON \`_journal_posts_v\` (\`latest\`);`)
  await db.run(sql`CREATE INDEX \`_journal_posts_v_autosave_idx\` ON \`_journal_posts_v\` (\`autosave\`);`)
  await db.run(sql`CREATE TABLE \`enquiries\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text NOT NULL,
  	\`email\` text NOT NULL,
  	\`phone\` text,
  	\`preferred_contact\` text DEFAULT 'email',
  	\`service_id\` integer,
  	\`event_date\` text,
  	\`location\` text,
  	\`people_count\` numeric,
  	\`message\` text NOT NULL,
  	\`status\` text DEFAULT 'new',
  	\`source\` text DEFAULT 'website',
  	\`internal_notes\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`service_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`enquiries_service_idx\` ON \`enquiries\` (\`service_id\`);`)
  await db.run(sql`CREATE INDEX \`enquiries_status_idx\` ON \`enquiries\` (\`status\`);`)
  await db.run(sql`CREATE INDEX \`enquiries_updated_at_idx\` ON \`enquiries\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`enquiries_created_at_idx\` ON \`enquiries\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`site_settings_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`label\` text,
  	\`url\` text NOT NULL,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`site_settings\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_social_links_order_idx\` ON \`site_settings_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_social_links_parent_id_idx\` ON \`site_settings_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`site_settings\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`site_name\` text NOT NULL,
  	\`artist_name\` text,
  	\`tagline\` text,
  	\`short_description\` text,
  	\`logo_id\` integer,
  	\`logo_mark_id\` integer,
  	\`favicon_id\` integer,
  	\`contact_email\` text,
  	\`contact_phone\` text,
  	\`contact_whatsapp\` text,
  	\`contact_service_area\` text,
  	\`default_s_e_o_title\` text,
  	\`default_s_e_o_description\` text,
  	\`default_s_e_o_image_id\` integer,
  	\`default_s_e_o_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`logo_mark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`favicon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`default_s_e_o_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`site_settings_logo_idx\` ON \`site_settings\` (\`logo_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_logo_mark_idx\` ON \`site_settings\` (\`logo_mark_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_favicon_idx\` ON \`site_settings\` (\`favicon_id\`);`)
  await db.run(sql`CREATE INDEX \`site_settings_default_s_e_o_default_s_e_o_image_idx\` ON \`site_settings\` (\`default_s_e_o_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v_version_social_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`platform\` text NOT NULL,
  	\`label\` text,
  	\`url\` text NOT NULL,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_site_settings_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_social_links_order_idx\` ON \`_site_settings_v_version_social_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_social_links_parent_id_idx\` ON \`_site_settings_v_version_social_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_site_settings_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_site_name\` text NOT NULL,
  	\`version_artist_name\` text,
  	\`version_tagline\` text,
  	\`version_short_description\` text,
  	\`version_logo_id\` integer,
  	\`version_logo_mark_id\` integer,
  	\`version_favicon_id\` integer,
  	\`version_contact_email\` text,
  	\`version_contact_phone\` text,
  	\`version_contact_whatsapp\` text,
  	\`version_contact_service_area\` text,
  	\`version_default_s_e_o_title\` text,
  	\`version_default_s_e_o_description\` text,
  	\`version_default_s_e_o_image_id\` integer,
  	\`version_default_s_e_o_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_logo_mark_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_favicon_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_default_s_e_o_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version_logo_idx\` ON \`_site_settings_v\` (\`version_logo_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version_logo_mark_idx\` ON \`_site_settings_v\` (\`version_logo_mark_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_version_favicon_idx\` ON \`_site_settings_v\` (\`version_favicon_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_version_default_s_e_o_version_default_s_idx\` ON \`_site_settings_v\` (\`version_default_s_e_o_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_created_at_idx\` ON \`_site_settings_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_site_settings_v_updated_at_idx\` ON \`_site_settings_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`navigation_header_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`new_tab\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_header_links_order_idx\` ON \`navigation_header_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_header_links_parent_id_idx\` ON \`navigation_header_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation_footer_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`new_tab\` integer DEFAULT false,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`navigation\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`navigation_footer_links_order_idx\` ON \`navigation_footer_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`navigation_footer_links_parent_id_idx\` ON \`navigation_footer_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`navigation\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`primary_c_t_a_label\` text,
  	\`primary_c_t_a_url\` text,
  	\`footer_note\` text,
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE TABLE \`_navigation_v_version_header_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`new_tab\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_navigation_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_header_links_order_idx\` ON \`_navigation_v_version_header_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_header_links_parent_id_idx\` ON \`_navigation_v_version_header_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_navigation_v_version_footer_links\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`label\` text NOT NULL,
  	\`url\` text NOT NULL,
  	\`new_tab\` integer DEFAULT false,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_navigation_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_footer_links_order_idx\` ON \`_navigation_v_version_footer_links\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_version_footer_links_parent_id_idx\` ON \`_navigation_v_version_footer_links\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_navigation_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_primary_c_t_a_label\` text,
  	\`version_primary_c_t_a_url\` text,
  	\`version_footer_note\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`_navigation_v_created_at_idx\` ON \`_navigation_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_navigation_v_updated_at_idx\` ON \`_navigation_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`home\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_eyebrow\` text,
  	\`hero_heading\` text,
  	\`hero_subheading\` text,
  	\`hero_image_id\` integer,
  	\`hero_primary_c_t_a_label\` text,
  	\`hero_primary_c_t_a_url\` text,
  	\`introduction_eyebrow\` text,
  	\`introduction_heading\` text,
  	\`introduction_body\` text,
  	\`featured_testimonial_id\` integer,
  	\`closing_c_t_a_eyebrow\` text,
  	\`closing_c_t_a_heading\` text,
  	\`closing_c_t_a_body\` text,
  	\`closing_c_t_a_label\` text,
  	\`closing_c_t_a_url\` text,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`featured_testimonial_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`home_hero_hero_image_idx\` ON \`home\` (\`hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`home_featured_testimonial_idx\` ON \`home\` (\`featured_testimonial_id\`);`)
  await db.run(sql`CREATE TABLE \`home_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`portfolio_projects_id\` integer,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`home\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`portfolio_projects_id\`) REFERENCES \`portfolio_projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`home_rels_order_idx\` ON \`home_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_parent_idx\` ON \`home_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_path_idx\` ON \`home_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_portfolio_projects_id_idx\` ON \`home_rels\` (\`portfolio_projects_id\`);`)
  await db.run(sql`CREATE INDEX \`home_rels_services_id_idx\` ON \`home_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`_home_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_eyebrow\` text,
  	\`version_hero_heading\` text,
  	\`version_hero_subheading\` text,
  	\`version_hero_image_id\` integer,
  	\`version_hero_primary_c_t_a_label\` text,
  	\`version_hero_primary_c_t_a_url\` text,
  	\`version_introduction_eyebrow\` text,
  	\`version_introduction_heading\` text,
  	\`version_introduction_body\` text,
  	\`version_featured_testimonial_id\` integer,
  	\`version_closing_c_t_a_eyebrow\` text,
  	\`version_closing_c_t_a_heading\` text,
  	\`version_closing_c_t_a_body\` text,
  	\`version_closing_c_t_a_label\` text,
  	\`version_closing_c_t_a_url\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_hero_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_testimonial_id\`) REFERENCES \`testimonials\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_version_hero_version_hero_image_idx\` ON \`_home_v\` (\`version_hero_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_version_version_featured_testimonial_idx\` ON \`_home_v\` (\`version_featured_testimonial_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_created_at_idx\` ON \`_home_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_updated_at_idx\` ON \`_home_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`_home_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`portfolio_projects_id\` integer,
  	\`services_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_home_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`portfolio_projects_id\`) REFERENCES \`portfolio_projects\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`services_id\`) REFERENCES \`services\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_v_rels_order_idx\` ON \`_home_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_rels_parent_idx\` ON \`_home_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_rels_path_idx\` ON \`_home_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_rels_portfolio_projects_id_idx\` ON \`_home_v_rels\` (\`portfolio_projects_id\`);`)
  await db.run(sql`CREATE INDEX \`_home_v_rels_services_id_idx\` ON \`_home_v_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE TABLE \`about_credentials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`detail\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`about\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`about_credentials_order_idx\` ON \`about_credentials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`about_credentials_parent_id_idx\` ON \`about_credentials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`about\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`lead\` text,
  	\`portrait_id\` integer,
  	\`story\` text,
  	\`cta_label\` text,
  	\`cta_url\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`about_portrait_idx\` ON \`about\` (\`portrait_id\`);`)
  await db.run(sql`CREATE INDEX \`about_seo_seo_image_idx\` ON \`about\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_v_version_credentials\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`detail\` text,
  	\`_uuid\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_about_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_v_version_credentials_order_idx\` ON \`_about_v_version_credentials\` (\`_order\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_version_credentials_parent_id_idx\` ON \`_about_v_version_credentials\` (\`_parent_id\`);`)
  await db.run(sql`CREATE TABLE \`_about_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_eyebrow\` text,
  	\`version_heading\` text,
  	\`version_lead\` text,
  	\`version_portrait_id\` integer,
  	\`version_story\` text,
  	\`version_cta_label\` text,
  	\`version_cta_url\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_portrait_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_v_version_version_portrait_idx\` ON \`_about_v\` (\`version_portrait_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_version_seo_version_seo_image_idx\` ON \`_about_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_created_at_idx\` ON \`_about_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_about_v_updated_at_idx\` ON \`_about_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE TABLE \`contact\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`eyebrow\` text,
  	\`heading\` text,
  	\`intro\` text,
  	\`enquiry_heading\` text,
  	\`availability_note\` text,
  	\`response_time\` text,
  	\`success_message\` text,
  	\`seo_title\` text,
  	\`seo_description\` text,
  	\`seo_image_id\` integer,
  	\`seo_no_index\` integer DEFAULT false,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`contact_seo_seo_image_idx\` ON \`contact\` (\`seo_image_id\`);`)
  await db.run(sql`CREATE TABLE \`_contact_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_eyebrow\` text,
  	\`version_heading\` text,
  	\`version_intro\` text,
  	\`version_enquiry_heading\` text,
  	\`version_availability_note\` text,
  	\`version_response_time\` text,
  	\`version_success_message\` text,
  	\`version_seo_title\` text,
  	\`version_seo_description\` text,
  	\`version_seo_image_id\` integer,
  	\`version_seo_no_index\` integer DEFAULT false,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	FOREIGN KEY (\`version_seo_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_contact_v_version_seo_version_seo_image_idx\` ON \`_contact_v\` (\`version_seo_image_id\`);`)
  await db.run(sql`CREATE INDEX \`_contact_v_created_at_idx\` ON \`_contact_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_contact_v_updated_at_idx\` ON \`_contact_v\` (\`updated_at\`);`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`name\` text;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`role\` text DEFAULT 'editor' NOT NULL;`)
  // Preserve access for accounts created before role-based permissions existed.
  await db.run(sql`UPDATE \`users\` SET \`role\` = 'admin';`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`caption\` text;`)
  await db.run(sql`ALTER TABLE \`media\` ADD \`credit\` text;`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`portfolio_categories_id\` integer REFERENCES portfolio_categories(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`portfolio_projects_id\` integer REFERENCES portfolio_projects(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`services_id\` integer REFERENCES services(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`testimonials_id\` integer REFERENCES testimonials(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`journal_posts_id\` integer REFERENCES journal_posts(id);`)
  await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`enquiries_id\` integer REFERENCES enquiries(id);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_portfolio_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`portfolio_categories_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_portfolio_projects_id_idx\` ON \`payload_locked_documents_rels\` (\`portfolio_projects_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_services_id_idx\` ON \`payload_locked_documents_rels\` (\`services_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_testimonials_id_idx\` ON \`payload_locked_documents_rels\` (\`testimonials_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_journal_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`journal_posts_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_enquiries_id_idx\` ON \`payload_locked_documents_rels\` (\`enquiries_id\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`portfolio_categories\`;`)
  await db.run(sql`DROP TABLE \`portfolio_projects_gallery\`;`)
  await db.run(sql`DROP TABLE \`portfolio_projects\`;`)
  await db.run(sql`DROP TABLE \`_portfolio_projects_v_version_gallery\`;`)
  await db.run(sql`DROP TABLE \`_portfolio_projects_v\`;`)
  await db.run(sql`DROP TABLE \`services\`;`)
  await db.run(sql`DROP TABLE \`_services_v\`;`)
  await db.run(sql`DROP TABLE \`testimonials\`;`)
  await db.run(sql`DROP TABLE \`_testimonials_v\`;`)
  await db.run(sql`DROP TABLE \`journal_posts_tags\`;`)
  await db.run(sql`DROP TABLE \`journal_posts\`;`)
  await db.run(sql`DROP TABLE \`_journal_posts_v_version_tags\`;`)
  await db.run(sql`DROP TABLE \`_journal_posts_v\`;`)
  await db.run(sql`DROP TABLE \`enquiries\`;`)
  await db.run(sql`DROP TABLE \`site_settings_social_links\`;`)
  await db.run(sql`DROP TABLE \`site_settings\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v_version_social_links\`;`)
  await db.run(sql`DROP TABLE \`_site_settings_v\`;`)
  await db.run(sql`DROP TABLE \`navigation_header_links\`;`)
  await db.run(sql`DROP TABLE \`navigation_footer_links\`;`)
  await db.run(sql`DROP TABLE \`navigation\`;`)
  await db.run(sql`DROP TABLE \`_navigation_v_version_header_links\`;`)
  await db.run(sql`DROP TABLE \`_navigation_v_version_footer_links\`;`)
  await db.run(sql`DROP TABLE \`_navigation_v\`;`)
  await db.run(sql`DROP TABLE \`home\`;`)
  await db.run(sql`DROP TABLE \`home_rels\`;`)
  await db.run(sql`DROP TABLE \`_home_v\`;`)
  await db.run(sql`DROP TABLE \`_home_v_rels\`;`)
  await db.run(sql`DROP TABLE \`about_credentials\`;`)
  await db.run(sql`DROP TABLE \`about\`;`)
  await db.run(sql`DROP TABLE \`_about_v_version_credentials\`;`)
  await db.run(sql`DROP TABLE \`_about_v\`;`)
  await db.run(sql`DROP TABLE \`contact\`;`)
  await db.run(sql`DROP TABLE \`_contact_v\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`name\`;`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`role\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`caption\`;`)
  await db.run(sql`ALTER TABLE \`media\` DROP COLUMN \`credit\`;`)
}
