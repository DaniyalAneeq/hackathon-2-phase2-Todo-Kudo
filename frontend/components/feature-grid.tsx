import React from 'react';
import { TrendingUp, FolderOpen, CalendarClock, Search } from 'lucide-react';
import { FeatureCard } from './feature-card';

/**
 * FeatureGrid - 2x2 responsive grid of feature cards
 * Server Component (default)
 */

const features = [
  {
    icon: TrendingUp,
    title: "Organize with Priorities",
    description: "Focus on what matters most. Set task priorities to stay on top of your work."
  },
  {
    icon: FolderOpen,
    title: "Categorize Your Life",
    description: "Work, School, Personal - organize tasks into categories that make sense for you."
  },
  {
    icon: CalendarClock,
    title: "Never Miss a Deadline",
    description: "Set due dates and get reminders. Stay ahead of your schedule."
  },
  {
    icon: Search,
    title: "Search Instantly",
    description: "Find any task fast. Powerful search helps you locate what you need."
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="bg-slate-950 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Everything You Need
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Powerful features to help you manage tasks and boost productivity
          </p>
        </div>

        {/* Feature Grid - 2x2 responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
