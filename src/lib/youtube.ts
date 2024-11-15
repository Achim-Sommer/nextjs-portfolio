import axios from 'axios';

const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCNZKqfYZWUZBZxFBuPXAVKw'; // Achim Sommer Channel ID

// Cache duration in milliseconds (24 hours)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  category: string;
  duration: string;
  publishedAt: string;
}

interface ChannelMilestone {
  date: string;
  title: string;
  description: string;
  icon: string;
  subscribers?: string;
  views?: string;
  videoId?: string;
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

// In-memory cache
let milestonesCache: CacheItem<ChannelMilestone[]> | null = null;
let videosCache: CacheItem<YouTubeVideo[]> | null = null;

// Fallback data
const getFallbackMilestones = (): ChannelMilestone[] => [
  {
    date: "Januar 2015",
    title: "Start auf YouTube",
    description: "Beginn der YouTube-Reise mit ersten Tutorials",
    icon: "🚀",
    subscribers: "0",
    views: "0"
  },
  {
    date: new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' }),
    title: "Aktuelle Zahlen",
    description: "Kontinuierliches Wachstum und Engagement",
    icon: "📊",
    subscribers: "5.000+",
    views: "100.000+"
  }
];

export async function getChannelMilestones(): Promise<ChannelMilestone[]> {
  try {
    // Check cache first
    if (milestonesCache && Date.now() - milestonesCache.timestamp < CACHE_DURATION) {
      console.log('Returning cached milestones data');
      return milestonesCache.data;
    }

    console.log('Fetching fresh YouTube data...');
    
    // Get channel statistics (public data only)
    const channelUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
    console.log('Fetching channel data from:', channelUrl);
    const channelResponse = await axios.get(channelUrl);
    
    if (!channelResponse.data.items || channelResponse.data.items.length === 0) {
      console.error('No channel data found');
      throw new Error('No channel data found');
    }

    const channel = channelResponse.data.items[0];
    console.log('Channel stats:', {
      subscribers: channel.statistics.subscriberCount,
      views: channel.statistics.viewCount
    });

    // Get videos (public data only)
    const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&order=date&type=video&key=${YOUTUBE_API_KEY}`;
    console.log('Fetching videos from:', videosUrl);
    const videosResponse = await axios.get(videosUrl);

    if (!videosResponse.data.items || videosResponse.data.items.length === 0) {
      console.error('No videos found');
      throw new Error('No videos found');
    }

    // Format numbers
    const formatNumber = (num: number) => new Intl.NumberFormat('de-DE').format(num);

    const milestones: ChannelMilestone[] = [];

    // Add channel start (first video)
    const firstVideo = videosResponse.data.items[videosResponse.data.items.length - 1];
    milestones.push({
      date: new Date(firstVideo.snippet.publishedAt).toLocaleDateString('de-DE', { 
        year: 'numeric', 
        month: 'long' 
      }),
      title: "Start auf YouTube",
      description: `Erster Upload: "${firstVideo.snippet.title}"`,
      icon: "🚀"
    });

    // Add current stats
    milestones.push({
      date: new Date().toLocaleDateString('de-DE', { 
        year: 'numeric', 
        month: 'long' 
      }),
      title: "Aktuelle Zahlen",
      description: "Kontinuierliches Wachstum und Engagement in der Community",
      icon: "📊",
      subscribers: formatNumber(parseInt(channel.statistics.subscriberCount)),
      views: formatNumber(parseInt(channel.statistics.viewCount))
    });

    // Update cache
    milestonesCache = {
      data: milestones,
      timestamp: Date.now()
    };

    console.log('Generated milestones:', milestones);
    return milestones;

  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    
    // If cache exists but is expired, use it as fallback
    if (milestonesCache) {
      console.log('Using expired cache as fallback');
      return milestonesCache.data;
    }
    
    // Use hardcoded fallback data
    console.log('Using fallback data');
    return getFallbackMilestones();
  }
}

export async function getYouTubeVideos(): Promise<YouTubeVideo[]> {
  try {
    // Check cache first
    if (videosCache && Date.now() - videosCache.timestamp < CACHE_DURATION) {
      console.log('Returning cached videos data');
      return videosCache.data;
    }

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&order=viewCount&type=video&key=${YOUTUBE_API_KEY}`
    );

    const videos = response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.high.url,
      views: "Loading...", // We would need another API call to get views
      category: "Video",
      duration: "Loading...", // We would need another API call to get duration
      publishedAt: item.snippet.publishedAt
    }));

    // Update cache
    videosCache = {
      data: videos,
      timestamp: Date.now()
    };

    return videos;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    
    // If cache exists but is expired, use it as fallback
    if (videosCache) {
      console.log('Using expired cache as fallback');
      return videosCache.data;
    }
    
    return [];
  }
}
