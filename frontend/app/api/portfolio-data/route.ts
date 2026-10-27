import { client } from '@/lib/sanity/client';
import { profileQuery, projectsQuery, certificationsQuery, experiencesQuery, techStackQuery, socialLinksQuery } from '@/lib/sanity/queries';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [profile, projects, certifications, experiences, techStack, socialLinks] = await Promise.all([
      client.fetch(profileQuery),
      client.fetch(projectsQuery),
      client.fetch(certificationsQuery),
      client.fetch(experiencesQuery),
      client.fetch(techStackQuery),
      client.fetch(socialLinksQuery),
    ]);

    const activeSocials = (socialLinks && socialLinks.length > 0)
      ? socialLinks
      : (profile?.socials || []);

    const mergedProfile = profile
      ? { ...profile, socials: activeSocials }
      : { socials: activeSocials };

    const cleanedCertifications = (certifications || []).map(({ _id, ...cert }: any) => ({
      ...cert,
      id: cert.id || cert.credentialId || cert.title,
    }));

    const result = {
      profile: mergedProfile,
      socials: activeSocials,
      projects: projects || [],
      certifications: cleanedCertifications,
      experiences: experiences || [],
      techStack: techStack || [],
    };

    return Response.json(result, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (err) {
    console.error('Sanity CMS portfolio data fetch error:', err);
    return Response.json(
      { error: 'Failed to fetch portfolio data from Sanity CMS', details: String(err) },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    );
  }
}
