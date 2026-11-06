import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

/**
 * Settings Page - Placeholder for settings page
 */
export default function Settings() {
  return (
    <div className="space-y-[20px]">
      <Breadcrumbs items={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Settings', current: true }
      ]} />

      <section className="space-y-4">
        <h1 className="text-heading-lg text-neutral-900">Settings</h1>
        <p className="text-body-base text-neutral-500">
          Application settings and preferences coming soon.
        </p>
        <div className="rounded-xl border border-neutral-200 bg-white p-8 min-h-[400px]">
          <p className="text-body-base text-neutral-500 text-center">Settings content will be implemented here</p>
        </div>
      </section>
    </div>
  );
}
