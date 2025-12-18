import { NextResponse } from 'next/server';
import cache from '@/lib/cache';

const CACHE_KEY = 'wakatime_stats';

export async function GET() {
  try {
    // Check cache first
    const cachedData = cache.get(CACHE_KEY);
    if (cachedData) {
      console.log('Returning cached WakaTime data');
      return NextResponse.json(cachedData);
    }

    console.log('Fetching fresh WakaTime data');
    const apiKey = process.env.WAKATIME_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'WakaTime API key not found' }, { status: 500 });
    }

    const response = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
      headers: {
        'Authorization': `Basic ${Buffer.from(apiKey).toString('base64')}`
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('WakaTime API error response:', errorText);
      return NextResponse.json(
        { error: 'WakaTime API request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    // Store in cache
    cache.set(CACHE_KEY, data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('WakaTime API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
