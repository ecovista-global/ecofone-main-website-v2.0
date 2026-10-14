import { MetadataRoute } from 'next';

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

  const franchiseCities = [
    'mumbai', 'delhi', 'bangalore', 'hyderabad', 'chennai', 'pune', 
    'kolkata', 'lucknow', 'jaipur', 'ahmedabad', 'noida', 'gurgaon', 
    'patna', 'indore', 'bhopal', 'chandigarh', 'kanpur', 'varanasi'
  ];

  const cityRoutes = franchiseCities.map(city => `/franchise/${city}`);
  
  const allRoutes = [...baseRoutes, ...cityRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/blog' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/franchise') || route === '/sell' ? 0.9 : 0.8,
  }));
}
