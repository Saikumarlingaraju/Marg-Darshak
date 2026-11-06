import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

/**
 * Analytics Page - Placeholder for analytics page
 */
export default function Analytics() {
  return (
    <div className="space-y-[20px]">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Analytics', current: true }
      ]} />

      <section className="space-y-4">
        <h1 className="text-heading-lg text-neutral-900">Analytics</h1>
        <p className="text-body-base text-neutral-500">
          Analytics dashboard with detailed charts and visualizations coming soon.
        </p>
        <div className="rounded-xl border border-neutral-200 bg-white p-8 min-h-[400px]">
          <p className="text-body-base text-neutral-500 text-center">Analytics content will be implemented here</p>
        </div>
      </section>
    </div>
  );
}
