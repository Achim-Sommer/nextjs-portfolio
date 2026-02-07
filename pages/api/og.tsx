import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'Achim Sommer';
    const subtitle = searchParams.get('subtitle') || 'Full Stack Developer';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom right, #000000, #1e3a8a, #000000)',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: 'monospace',
          }}
        >
          {/* Line Numbers */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '48px',
              borderRight: '1px solid rgba(59, 130, 246, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              paddingRight: '8px',
              paddingTop: '16px',
              color: 'rgba(59, 130, 246, 0.4)',
              fontSize: '12px',
            }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                style={{
                  lineHeight: '26px',
                  display: 'flex',
                }}
              >
                {(i + 1).toString().padStart(2, '0')}
              </div>
            ))}
          </div>

          {/* Background Effects Container */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Tech Grid Background */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle 500px at 50% 50%, rgba(30, 58, 138, 0.1), transparent)',
                opacity: 0.5,
                display: 'flex',
              }}
            />

            {/* Binary Background */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  color: 'rgba(59, 130, 246, 0.5)',
                  fontSize: '12px',
                  opacity: 0.05,
                  display: 'flex',
                }}
              >
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}

            {/* Scanning Lines */}
            <div
              style={{
                position: 'absolute',
                height: '1px',
                width: '100%',
                top: '25%',
                background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.2), transparent)',
                display: 'flex',
              }}
            />
            <div
              style={{
                position: 'absolute',
                height: '1px',
                width: '100%',
                top: '50%',
                background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.2), transparent)',
                display: 'flex',
              }}
            />
            <div
              style={{
                position: 'absolute',
                height: '1px',
                width: '100%',
                top: '75%',
                background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.2), transparent)',
                display: 'flex',
              }}
            />
          </div>

          {/* Corner Decorations Container */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '96px',
                height: '96px',
                borderLeft: '2px solid rgba(59, 130, 246, 0.3)',
                borderTop: '2px solid rgba(59, 130, 246, 0.3)',
                display: 'flex',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '96px',
                height: '96px',
                borderRight: '2px solid rgba(59, 130, 246, 0.3)',
                borderTop: '2px solid rgba(59, 130, 246, 0.3)',
                display: 'flex',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '96px',
                height: '96px',
                borderLeft: '2px solid rgba(59, 130, 246, 0.3)',
                borderBottom: '2px solid rgba(59, 130, 246, 0.3)',
                display: 'flex',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '96px',
                height: '96px',
                borderRight: '2px solid rgba(59, 130, 246, 0.3)',
                borderBottom: '2px solid rgba(59, 130, 246, 0.3)',
                display: 'flex',
              }}
            />
          </div>

          {/* Code Comments */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '60px',
              color: 'rgba(59, 130, 246, 0.6)',
              fontSize: '14px',
              fontFamily: 'monospace',
              display: 'flex',
            }}
          >
            {'// Portfolio'}
          </div>
          <div
            style={{
              position: 'absolute',
              top: '20%',
              left: '60px',
              color: 'rgba(59, 130, 246, 0.6)',
              fontSize: '14px',
              fontFamily: 'monospace',
              display: 'flex',
            }}
          >
            {'// Full Stack Developer'}
          </div>

          {/* Main Content */}
          <div
            style={{
              marginLeft: '60px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              width: '80%',
              maxWidth: '800px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: '#E5E7EB',
                  letterSpacing: '-0.05em',
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span style={{ color: '#FF79C6', display: 'flex' }}>const</span>
                <span style={{ color: '#BD93F9', display: 'flex' }}>developer</span>
                <span style={{ color: '#F8F8F2', display: 'flex' }}>=</span>
                <span style={{ 
                  background: 'linear-gradient(to right, #8BE9FD, #50FA7B)',
                  backgroundClip: 'text',
                  color: 'transparent',
                  display: 'flex',
                }}>
                  '{title}'
                </span>
                <span style={{ color: '#F8F8F2', display: 'flex' }}>;</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: 32,
                  color: '#E5E7EB',
                  fontFamily: 'monospace',
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span style={{ color: '#FF79C6', display: 'flex' }}>type</span>
                <span style={{ color: '#BD93F9', display: 'flex' }}>Role</span>
                <span style={{ color: '#F8F8F2', display: 'flex' }}>=</span>
                <span style={{ 
                  color: '#50FA7B',
                  display: 'flex',
                }}>
                  '{subtitle}'
                </span>
                <span style={{ color: '#F8F8F2', display: 'flex' }}>;</span>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
