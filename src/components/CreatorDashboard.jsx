import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Eye, 
  Sparkles, 
  ShoppingBag, 
  Award,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  Download
} from 'lucide-react';
import { CREATOR_ANALYTICS, CURRENT_USER } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function CreatorDashboard({ onOpenShop }) {
  const [timeRange, setTimeRange] = useState('Last 30 Days');
  const [payoutRequested, setPayoutRequested] = useState(false);

  const { overview, revenueStreams, topContent, audienceMetrics } = CREATOR_ANALYTICS;

  const handleRequestPayout = () => {
    setPayoutRequested(true);
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
    setTimeout(() => {
      alert("Payout initiated! $8,420.50 will arrive in your connected bank account in 2-3 business days.");
    }, 500);
  };

  return (
    <div className="dashboard-container">
      {/* Hero Header */}
      <div className="dashboard-hero">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="creator-pro-badge" style={{ fontSize: 11, padding: '3px 8px' }}>
              Meta Creator Partner
            </span>
            <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
              Verified Channel #{CURRENT_USER.username}
            </span>
          </div>
          <h1 className="dashboard-hero-title">Creator Analytics &amp; Revenue Studio</h1>
          <p className="dashboard-hero-desc">
            Track real-time audience growth, Reels virality algorithms, and monetize through Creator Commerce &amp; Brand Deals.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
          <button 
            onClick={handleRequestPayout}
            disabled={payoutRequested}
            style={{ 
              background: payoutRequested ? 'var(--accent-green)' : 'var(--accent-gradient)', 
              color: '#fff', 
              fontWeight: 800, 
              padding: '12px 20px', 
              borderRadius: 10, 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              boxShadow: '0 4px 18px rgba(220, 39, 67, 0.4)'
            }}
          >
            <CreditCard size={18} />
            <span>{payoutRequested ? 'Payout Processing ($8,420.50)' : 'Cash Out Earnings ($8,420.50)'}</span>
          </button>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Next scheduled cycle: Nov 1, 2026</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="kpi-cards-grid">
        <div className="kpi-card">
          <div className="kpi-title">Accounts Reached</div>
          <div className="kpi-value">{overview.accountsReached.value}</div>
          <div className="kpi-growth positive">
            <TrendingUp size={14} />
            <span>{overview.accountsReached.growth} vs last period</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">Accounts Engaged</div>
          <div className="kpi-value">{overview.accountsEngaged.value}</div>
          <div className="kpi-growth positive">
            <TrendingUp size={14} />
            <span>{overview.accountsEngaged.growth}</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-title">Total Followers</div>
          <div className="kpi-value">{overview.totalFollowers.value}</div>
          <div className="kpi-growth positive">
            <TrendingUp size={14} />
            <span>{overview.totalFollowers.growth}</span>
          </div>
        </div>

        <div className="kpi-card" style={{ borderColor: 'rgba(236,72,153,0.35)', background: 'linear-gradient(145deg, var(--bg-secondary), rgba(236,72,153,0.06))' }}>
          <div className="kpi-title" style={{ color: 'var(--accent-pink)', fontWeight: 700 }}>Total Net Earnings</div>
          <div className="kpi-value" style={{ color: '#fff' }}>{overview.totalEarnings.value}</div>
          <div className="kpi-growth positive">
            <TrendingUp size={14} />
            <span>{overview.totalEarnings.growth} Monthly Growth</span>
          </div>
        </div>
      </div>

      {/* Analytics Split Section: Revenue Streams & Demographics */}
      <div className="analytics-split-layout">
        {/* Monetization & Revenue Sources */}
        <div className="analytics-panel">
          <div className="panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <DollarSign size={20} color="var(--accent-green)" />
              <h2 className="panel-title">Revenue Breakdown</h2>
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>October 2026</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {revenueStreams.map((stream, idx) => (
              <div key={idx} className="stream-row">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span className="stream-color-dot" style={{ backgroundColor: stream.color }} />
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{stream.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{stream.percentage} of total earnings</div>
                  </div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{stream.amount}</div>
              </div>
            ))}
          </div>

          <button 
            onClick={onOpenShop}
            style={{ 
              width: '100%', 
              marginTop: 18, 
              background: 'var(--bg-tertiary)', 
              padding: 10, 
              borderRadius: 8, 
              fontSize: 13, 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8
            }}
          >
            <ShoppingBag size={16} />
            <span>Manage Creator Storefront Products →</span>
          </button>
        </div>

        {/* Audience Demographics */}
        <div className="analytics-panel">
          <div className="panel-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={20} color="var(--accent-blue)" />
              <h2 className="panel-title">Audience Demographics</h2>
            </div>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Worldwide</span>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>
              AGE DISTRIBUTION
            </div>
            <div style={{ display: 'flex', gap: 8, height: 28 }}>
              {audienceMetrics.ageGroups.map(group => (
                <div 
                  key={group.range} 
                  style={{ 
                    flex: group.pct, 
                    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', 
                    borderRadius: 4, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#fff'
                  }}
                  title={`${group.range}: ${group.pct}%`}
                >
                  {group.range}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8 }}>
              TOP AUDIENCE CITIES
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {audienceMetrics.topCities.map(city => (
                <span 
                  key={city}
                  style={{ 
                    background: 'var(--bg-tertiary)', 
                    padding: '4px 10px', 
                    borderRadius: 14, 
                    fontSize: 12, 
                    fontWeight: 500 
                  }}
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Content Section */}
      <div className="analytics-panel">
        <div className="panel-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Award size={20} color="#f59e0b" />
            <h2 className="panel-title">Top Performing Content</h2>
          </div>
          <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Ranked by Algorithm Score</span>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', textAlign: 'left' }}>
              <th style={{ padding: '10px 0' }}>Post / Reel</th>
              <th>Format</th>
              <th>Total Views</th>
              <th>Reach</th>
              <th>Engagement Rate</th>
              <th style={{ textAlign: 'right' }}>Est. Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topContent.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '14px 0', fontWeight: 600, maxWidth: 280 }}>{item.title}</td>
                <td>
                  <span style={{ 
                    padding: '2px 8px', 
                    borderRadius: 4, 
                    fontSize: 11, 
                    fontWeight: 700,
                    background: item.type === 'Reel' ? 'rgba(236,72,153,0.15)' : 'rgba(59,130,246,0.15)',
                    color: item.type === 'Reel' ? 'var(--accent-pink)' : 'var(--accent-blue)'
                  }}>
                    {item.type}
                  </span>
                </td>
                <td>{item.views}</td>
                <td>{item.reach}</td>
                <td style={{ color: 'var(--accent-green)', fontWeight: 700 }}>{item.engagement}</td>
                <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--text-primary)' }}>{item.earned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
