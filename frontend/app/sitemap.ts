import { MetadataRoute } from 'next';
import { getAllBlogSlugs } from '../data/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.ecofone.co.in';
  
  const baseRoutes = [
    '',
    '/careers',
    '/about',
    '/franchise',
    '/contact',
    '/sell',
    '/buy',
    '/blog',
    '/stores',
  ];

  const blogRoutes = getAllBlogSlugs().map(slug => `/blog/${slug}`);

  const franchiseCities = [
    'mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'pune', 
    'kolkata', 'lucknow', 'jaipur', 'ahmedabad', 'noida', 'gurgaon', 
    'patna', 'indore', 'bhopal', 'chandigarh', 'kanpur', 'varanasi'
  ];

  const cityRoutes = franchiseCities.map(city => `/franchise/${city}`);
  
  const allRoutes = [...baseRoutes, ...blogRoutes, ...cityRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/blog' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/franchise') || route === '/sell' ? 0.9 : 0.8,
  }));
}
