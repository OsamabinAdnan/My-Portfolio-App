import { groq } from 'next-sanity';

export const projectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    id,
    title,
    description,
    techStack,
    deploymentUrl,
    githubUrl,
    "categories": select(
      defined(categoryRefs) && count(categoryRefs) > 0 => categoryRefs[]->slug.current,
      categories
    ),
    image,
    imageUrl,
    mockupImage,
    mockupImageUrl,
    featured,
    order
  }
`;

export const certificationsQuery = groq`
  *[_type == "certification"] | order(order asc, issueDate desc) {
    _id,
    id,
    title,
    credentialName,
    issuer,
    issuerLogo,
    issueDate,
    expiryDate,
    credentialId,
    credentialUrl,
    badgeImage,
    badgeUrl,
    description,
    skills,
    "category": coalesce(categoryRef->slug.current, category),
    isFlagship,
    order
  }
`;

export const profileQuery = groq`
  *[_type == "profile"][0] {
    _id,
    name,
    title,
    subtitle,
    rotatingTitles,
    avatarImage,
    about,
    stats,
    socials,
    resumeUrl,
    "resumeFileUrl": resumeFile.asset->url
  }
`;

export const experiencesQuery = groq`
  *[_type == "experience"] | order(order asc, _createdAt asc) {
    _id,
    id,
    year,
    role,
    company,
    description,
    skills,
    order
  }
`;

export const techStackQuery = groq`
  *[_type == "techItem"] | order(order asc) {
    _id,
    name,
    "category": coalesce(categoryRef->slug.current, category),
    iconImage,
    logo,
    order
  }
`;

export const projectCategoriesQuery = groq`
  *[_type == "projectCategory"] | order(order asc, _createdAt asc) {
    _id,
    title,
    "key": slug.current,
    order
  }
`;

export const techCategoriesQuery = groq`
  *[_type == "techCategory"] | order(order asc, _createdAt asc) {
    _id,
    title,
    "key": slug.current,
    order
  }
`;

export const certificationCategoriesQuery = groq`
  *[_type == "certificationCategory"] | order(order asc, _createdAt asc) {
    _id,
    title,
    "key": slug.current,
    order
  }
`;

export const socialLinksQuery = groq`
  *[_type == "socialLink" && (isActive == true || !defined(isActive))] | order(order asc, _createdAt asc) {
    _id,
    platform,
    label,
    url,
    order,
    showInSidebar,
    showInFooter,
    isActive,
    customIcon,
    "iconUrl": customIcon.asset->url
  }
`;

