import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

/**
 * Reports Page - Placeholder for reports page
 */
export default function Reports() {
  return (
    <div className="space-y-[20px]">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Reports', current: true }
      ]} />

      <section className="space-y-4">
        <h1 className="text-heading-lg text-neutral-900">Reports</h1>
        <p className="text-body-base text-neutral-500">
          Report generation and management coming soon.
        </p>
        <div className="rounded-xl border border-neutral-200 bg-white p-8 min-h-[400px]">
          <p className="text-body-base text-neutral-500 text-center">Reports content will be implemented here</p>
        </div>
      </section>
    </div>
  );
}
