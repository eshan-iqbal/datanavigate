import { ImageResponse } from 'next/og';

export const alt = 'DataNavigate Limited - Developer-Led ServiceNow & Tech Talent Navigation';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          backgroundColor: '#080b11',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(14, 165, 233, 0.15), transparent 45%), radial-gradient(circle at 15% 85%, rgba(16, 185, 129, 0.12), transparent 45%)',
          color: '#f8fafc',
          fontFamily: 'sans-serif',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            {/* Geometric Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #10b981 100%)',
                color: '#080b11',
                fontWeight: 900,
                fontSize: '28px',
              }}
            >
              D
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '28px',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                color: '#ffffff',
              }}
            >
              <span>DATANAVIGATE</span>
              <span style={{ color: '#0ea5e9' }}>LTD</span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: '9999px',
              background: 'rgba(14, 165, 233, 0.12)',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              color: '#38bdf8',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.5px',
            }}
          >
            UK &amp; GLOBAL IT RECRUITMENT
          </div>
        </div>

        {/* Center Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
            maxWidth: '1000px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '52px',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-1.5px',
              color: '#ffffff',
            }}
          >
            <span>Developer-Led ServiceNow &amp;</span>
            <span
              style={{
                background: 'linear-gradient(90deg, #38bdf8, #34d399)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Tech Talent Navigation
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '22px',
              lineHeight: 1.5,
              color: '#94a3b8',
              fontWeight: 400,
            }}
          >
            Beyond the algorithm. Connecting enterprises with verified Certified Master Architects, Senior ServiceNow Engineers &amp; Specialist IT Consultants.
          </div>
        </div>

        {/* Bottom Tags / Highlights */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '28px',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            {['ITSM', 'ITOM', 'SecOps', 'GRC', 'HRSD', 'App Engine', 'CMDB / CSDM'].map((tech) => (
              <div
                key={tech}
                style={{
                  display: 'flex',
                  padding: '6px 14px',
                  borderRadius: '8px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#cbd5e1',
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: '16px',
              color: '#38bdf8',
              fontWeight: 700,
            }}
          >
            datanavigate.co.uk ↗
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
