import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

/**
 * Infrastructure Page - Placeholder for infrastructure page
 */
export default function Infrastructure() {
  return (
    <div className="space-y-[20px]">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Infrastructure', current: true }
      ]} />

      <section className="space-y-4">
        <h1 className="text-heading-lg text-neutral-900">Infrastructure</h1>
        <p className="text-body-base text-neutral-500">
          Infrastructure management and monitoring coming soon.
        </p>
        <div className="rounded-xl border border-neutral-200 bg-white p-8 min-h-[400px]">
          <p className="text-body-base text-neutral-500 text-center">Infrastructure content will be implemented here</p>
        </div>
      </section>
    </div>
  );
}
