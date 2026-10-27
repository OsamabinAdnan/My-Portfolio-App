import { defineType, defineField, defineArrayMember } from 'sanity';

export const projectCategoryType = defineType({
  name: 'projectCategory',
  title: 'Project Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title (e.g. AI Agents, Mobile Apps)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Category Slug / Key (e.g. ai, fullstack, mobile)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Tab Order Index (1, 2, 3...)',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});

export const projectType = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'id', title: 'Slug / Numeric ID', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'deploymentUrl', title: 'Deployment URL', type: 'url' }),
    defineField({ name: 'githubUrl', title: 'GitHub Repository URL', type: 'url' }),
    defineField({
      name: 'categoryRefs',
      title: 'Categories (From Project Categories)',
      description: 'Select one or more categories defined in Project Categories.',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'projectCategory' }] })],
    }),
    defineField({
      name: 'categories',
      title: 'Legacy Categories (Fallback / Static Tags)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'FullStack', value: 'fullstack' },
          { title: 'AI Integrated', value: 'ai' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Project Thumbnail (Direct Upload)',
      type: 'image',
      description: 'Upload project cover image directly to Sanity CDN',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mockupImage',
      title: 'Project Mockup (Direct Upload)',
      type: 'image',
      description: 'Upload desktop/mobile composite mockup directly',
      options: {
        hotspot: true,
      },
    }),
    defineField({ name: 'imageUrl', title: 'Image URL (Fallback / Static Path)', type: 'string' }),
    defineField({ name: 'mockupImageUrl', title: 'Mockup Image URL (Fallback / Static Path)', type: 'string' }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean' }),
    defineField({ name: 'order', title: 'Order Index', type: 'number' }),
  ],
});

export const certificationCategoryType = defineType({
  name: 'certificationCategory',
  title: 'Certification Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title (e.g. AI & Robotics, Cloud & FullStack, Digital Marketing)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Category Slug / Key (e.g. ai, cloud, marketing, engineering)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Tab Order Index (1, 2, 3...)',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});

export const certificationType = defineType({
  name: 'certification',
  title: 'Certifications',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'Slug / Numeric ID', type: 'string' }),
    defineField({ name: 'title', title: 'Title (e.g. CAARE Certified)', type: 'string' }),
    defineField({ name: 'credentialName', title: 'Full Credential Name', type: 'string' }),
    defineField({ name: 'issuer', title: 'Issuing Organization', type: 'string' }),
    defineField({ name: 'issueDate', title: 'Issue Date (YYYY-MM)', type: 'string' }),
    defineField({ name: 'expiryDate', title: 'Expiry Date (optional)', type: 'string' }),
    defineField({ name: 'credentialId', title: 'Credential ID', type: 'string' }),
    defineField({ name: 'credentialUrl', title: 'Credential Verification URL', type: 'url' }),
    defineField({
      name: 'categoryRef',
      title: 'Category (From Certification Categories)',
      description: 'Select category defined in Certification Categories.',
      type: 'reference',
      to: [{ type: 'certificationCategory' }],
    }),
    defineField({
      name: 'category',
      title: 'Legacy / Fallback Category (e.g. ai, cloud, marketing, engineering)',
      type: 'string',
      options: {
        list: [
          { title: 'AI & Robotics', value: 'ai' },
          { title: 'Web & Cloud', value: 'cloud' },
          { title: 'Digital Marketing', value: 'marketing' },
          { title: 'Engineering & Industrial', value: 'engineering' },
        ],
      },
    }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'skills',
      title: 'Skills Learned',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'badgeImage',
      title: 'Badge / Certificate Image (Direct Upload)',
      type: 'image',
      description: 'Upload certificate badge or scanned credential directly',
      options: {
        hotspot: true,
      },
    }),
    defineField({ name: 'badgeUrl', title: 'Badge URL (Fallback)', type: 'string' }),
    defineField({ name: 'issuerLogo', title: 'Issuer Logo URL (Fallback)', type: 'string' }),
    defineField({
      name: 'isFlagship',
      title: 'Flagship Credential (Legacy)',
      type: 'boolean',
      description: 'Legacy field preserved for schema backward compatibility',
      hidden: true,
    }),
    defineField({ name: 'order', title: 'Order Index', type: 'number' }),
  ],
});

export const profileType = defineType({
  name: 'profile',
  title: 'Developer Profile',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string' }),
    defineField({ name: 'title', title: 'Professional Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle Credentials', type: 'string' }),
    defineField({
      name: 'rotatingTitles',
      title: 'Rotating Hero Titles',
      description: 'Animated rotating roles in the Hero terminal box (e.g. AGENTIC AI DEVELOPER, WEB DEVELOPER, DIGITAL MARKETER)',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'avatarImage',
      title: 'Profile Avatar / Photo (Direct Upload)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({ name: 'about', title: 'Biography & Mission', type: 'text' }),
    defineField({
      name: 'stats',
      title: 'Key Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
          ],
        }),
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social Links & Coordinates',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Email', value: 'email' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'GitHub', value: 'github' },
                  { title: 'Twitter / X', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Threads', value: 'threads' },
                  { title: 'Other', value: 'other' },
                ],
              },
            },
            { name: 'label', title: 'Display Label', type: 'string' },
            { name: 'url', title: 'Profile URL or mailto link', type: 'string' },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'platform',
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume PDF (Direct Upload)',
      type: 'file',
      description: 'Upload your latest resume PDF directly to Sanity CDN',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'resumeUrl',
      title: 'Resume URL (Fallback / Static Path)',
      type: 'string',
      description: 'Static path or external URL for resume (e.g. /OsamabinAdnan-Resume.pdf)',
    }),
  ],
});

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience Timeline',
  type: 'document',
  fields: [
    defineField({ name: 'id', title: 'Timeline Node ID', type: 'string' }),
    defineField({ name: 'year', title: 'Year Range', type: 'string' }),
    defineField({ name: 'role', title: 'Role / Designation', type: 'string' }),
    defineField({ name: 'company', title: 'Company / Organization', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({
      name: 'skills',
      title: 'Key Technologies / Skills',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'order', title: 'Order Index', type: 'number' }),
  ],
});

export const techCategoryType = defineType({
  name: 'techCategory',
  title: 'Tech Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Title (e.g. AI Engineering, Cloud & DevOps)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Category Slug / Key (e.g. ai, frontend, devops)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Tab Order Index (1, 2, 3...)',
      type: 'number',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});

export const techItemType = defineType({
  name: 'techItem',
  title: 'Technologies',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Technology Name', type: 'string' }),
    defineField({
      name: 'categoryRef',
      title: 'Category (From Tech Categories)',
      description: 'Select category defined in Tech Categories. If not set, legacy category below will be used.',
      type: 'reference',
      to: [{ type: 'techCategory' }],
    }),
    defineField({
      name: 'category',
      title: 'Legacy Category (Fallback / Static String)',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'AI Engineering', value: 'ai' },
          { title: 'DevOps', value: 'devops' },
          { title: 'Digital Marketing', value: 'digital-marketing' },
          { title: 'Others / Systems', value: 'others' },
        ],
      },
    }),
    defineField({
      name: 'iconImage',
      title: 'Technology Icon / Logo (Direct Upload)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({ name: 'logo', title: 'Logo Asset Path (Fallback)', type: 'string' }),
    defineField({ name: 'order', title: 'Order Index', type: 'number' }),
  ],
});

export const socialLinkType = defineType({
  name: 'socialLink',
  title: 'Social Links',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'LinkedIn', value: 'linkedin' },
          { title: 'GitHub', value: 'github' },
          { title: 'Twitter / X', value: 'twitter' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Threads', value: 'threads' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Discord', value: 'discord' },
          { title: 'Telegram', value: 'telegram' },
          { title: 'Email', value: 'email' },
          { title: 'Medium', value: 'medium' },
          { title: 'Other / Website', value: 'other' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Display Label',
      description: 'Human-friendly text (e.g. LinkedIn, GitHub, @osamabinadnan)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL or Contact Link',
      description: 'Destination URL (e.g. https://... or mailto:...)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'customIcon',
      title: 'Custom Icon / Logo (Optional)',
      description: 'Upload a custom SVG/PNG icon to override the default platform icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order Index (1, 2, 3...)',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'showInSidebar',
      title: 'Show in Sticky Social Sidebar',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle whether this profile appears on the floating left sidebar',
    }),
    defineField({
      name: 'showInFooter',
      title: 'Show in Footer Coordinates',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle whether this profile appears in the footer nodes section',
    }),
    defineField({
      name: 'isActive',
      title: 'Active / Published',
      type: 'boolean',
      initialValue: true,
      description: 'Temporarily hide or activate this profile without deleting it',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'platform',
      description: 'url',
    },
  },
});

export const schemaTypes = [
  projectType,
  projectCategoryType,
  certificationType,
  certificationCategoryType,
  profileType,
  experienceType,
  techItemType,
  techCategoryType,
  socialLinkType,
];
