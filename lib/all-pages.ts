import { tours } from '@/lib/tours-data'
import { vehicles } from '@/lib/vehicles-data'
import { budgetTours } from '@/lib/budget-tours-data'
import { destinations } from '@/lib/destinations-data'
import { blogPosts } from '@/lib/blog-data'
import { getAllBlogSlugs } from '@/lib/posts'
import { getAllVideos } from '@/lib/videos'

export async function getAllPagesPath() {
  const safeTours = Array.isArray(tours) ? tours : [];
  const safeBudget = Array.isArray(budgetTours) ? budgetTours : [];
  const safeVehicles = Array.isArray(vehicles) ? vehicles : [];
  const safeDests = Array.isArray(destinations) ? destinations : [];
  const safeBlog = Array.isArray(blogPosts) ? blogPosts : [];

  let cmsBlogSlugs: string[] = [];
  try {
    cmsBlogSlugs = await getAllBlogSlugs();
  } catch {
    cmsBlogSlugs = [];
  }

  let videoSlugs: string[] = [];
  try {
    const videos = await getAllVideos();
    videoSlugs = videos.map(v => v.slug);
  } catch {
    videoSlugs = [];
  }

  const staticBlogSlugs = safeBlog.map((b) => b.slug);
  const allBlogSlugs = Array.from(new Set([...cmsBlogSlugs, ...staticBlogSlugs]));

  const staticPages = [
    { path: '/', title: 'Home' },
    { path: '/tours', title: 'Tours' },
    { path: '/budget-tours', title: 'Budget Tours' },
    { path: '/vehicle-hire', title: 'Vehicle Hire' },
    { path: '/vehicles', title: 'Vehicles' },
    { path: '/destinations', title: 'Destinations' },
    { path: '/destinations/kenya', title: 'Destinations - Kenya' },
    { path: '/destinations/tanzania', title: 'Destinations - Tanzania' },
    { path: '/destinations/rwanda', title: 'Destinations - Rwanda' },
    { path: '/destinations/uganda', title: 'Destinations - Uganda' },
    { path: '/blog', title: 'Blog' },
    { path: '/about', title: 'About' },
    { path: '/contact', title: 'Contact' },
    { path: '/maasai-mara-great-migration', title: 'Maasai Mara Great Migration' },
    { path: '/wheelchair-accessible-safari-landcruiser', title: 'Wheelchair Accessible Safari Landcruiser' },
    { path: '/wheelchair-accessible-maasai-mara-migration', title: 'Wheelchair Accessible Maasai Mara Migration' },
    { path: '/disability-tours', title: 'Disability Tours' },
    { path: '/gorilla-trekking-tours', title: 'Gorilla Trekking Tours' },
    { path: '/serengeti-safaris', title: 'Serengeti Safaris' },
    { path: '/amboseli-safaris', title: 'Amboseli Safaris' },
    { path: '/ngorongoro-safaris', title: 'Ngorongoro Safaris' },
    { path: '/great-migration-safaris', title: 'Great Migration Safaris' },
    { path: '/kenya-circuit-safaris', title: 'Kenya Circuit Safaris' },
    { path: '/tanzania-circuit-safaris', title: 'Tanzania Circuit Safaris' },
    { path: '/uganda-circuit-safaris', title: 'Uganda Circuit Safaris' },
    { path: '/adventure-trekking', title: 'Adventure Trekking' },
    { path: '/beach-holidays', title: 'Beach Holidays' },
    { path: '/cultural-tours', title: 'Cultural Tours' },
    { path: '/birdwatching-safaris-east-africa', title: 'Birdwatching Safaris East Africa' },
    { path: '/luxury-roof-top-camping', title: 'Luxury Roof Top Camping' },
    { path: '/flamingo-safari-tours', title: 'Flamingo Safari Tours' },
    { path: '/big-five', title: 'Big Five' },
    { path: '/short-safaris', title: 'Short Safaris' },
    { path: '/other-services', title: 'Other Services' },
    { path: '/terms', title: 'Terms' },
    { path: '/wheelchair-vehicle', title: 'Wheelchair Vehicle' },
    { path: '/toyota-landcruiser', title: 'Toyota Landcruiser' },
    { path: '/toyota-prado', title: 'Toyota Prado' },
    { path: '/accessible-tourism-research', title: 'Accessible Tourism Research' },
    { path: '/accessible-safari-index', title: 'Accessible Safari Index' },
    { path: '/accessible-safari-methodology', title: 'Accessible Safari Methodology' },
    { path: '/accessible-safari-report-2026', title: 'Kenya Accessible Safari Report 2026' },
    { path: '/accessible-safaris', title: 'Accessible Safaris' },
  ];

  const dynamicEntries = [
    ...safeTours.map((t) => ({ path: `/tour/${t.slug}`, title: t.title || t.slug })),
    ...safeBudget.map((t) => ({ path: `/budget-tours/${t.slug}`, title: t.title || t.slug })),
    ...safeVehicles.map((v) => ({ path: `/vehicle-hire/${v.slug}`, title: v.title || v.slug })),
    ...safeDests.map((d) => ({
      path: `/destinations/${d.country.toLowerCase()}`,
      title: d.country,
    })),
    ...safeBlog.map((b) => ({ path: `/blog/${b.slug}`, title: b.title || b.slug })),
    ...allBlogSlugs.map((s) => ({ path: `/blog/${s}`, title: s })),
    ...videoSlugs.map((s) => ({ path: `/watch/${s}`, title: s })),
  ];

  const allEntries = [...staticPages, ...dynamicEntries];
  const seen = new Set<string>();
  const unique = allEntries.filter((e) => {
    if (seen.has(e.path)) return false;
    seen.add(e.path);
    return true;
  });

  return unique;
}
