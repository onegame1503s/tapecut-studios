import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://tapecut.info',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Add other public pages here if you have them:
    // {
    //   url: 'https://tapecut.info/services',
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}