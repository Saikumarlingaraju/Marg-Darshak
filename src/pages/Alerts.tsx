import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

/**
 * Alerts Page - Placeholder for alerts page
 */
export default function Alerts() {
  return (
    <div className="space-y-[20px]">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Alerts', current: true }
      ]} />

      <section className="space-y-4">
        <h1 className="text-heading-lg text-neutral-900">Alerts</h1>
        <p className="text-body-base text-neutral-500">
          Alert management and notifications coming soon.
        </p>
        <div className="rounded-xl border border-neutral-200 bg-white p-8 min-h-[400px]">
          <p className="text-body-base text-neutral-500 text-center">Alerts content will be implemented here</p>
        </div>
      </section>
    </div>
  );
}
