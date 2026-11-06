import { KPISection } from '@/components/kpi/KPISection';
import { MapContainer } from '@/components/map';

/**
 * DashboardPage - Main dashboard assembling all sections
 * Section spacing: gap-section (20px) between sections
 * Content padding handled by MainLayout in App.tsx
 * Responsive container
 */
export function DashboardPage() {
  return (
    <div className="space-y-[20px]">
      {/* Section 1: Observation Summary (KPI Cards) */}
      <section className="space-y-4" aria-labelledby="observation-summary-heading">
        <h2 id="observation-summary-heading" className="text-heading-md text-neutral-900">
          Observation Summary
        </h2>
        <KPISection />
      </section>

      {/* Section 2: Spatial Operations */}
      <section className="space-y-4" aria-labelledby="spatial-operations-heading">
        <h2 id="spatial-operations-heading" className="text-heading-md text-neutral-900">
          Spatial Operations
        </h2>
        <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden min-h-[500px]">
          <MapContainer style={{ height: '500px' }} />
        </div>
      </section>

      {/* Section 3: Analytical Context */}
      <section className="space-y-4" aria-labelledby="analytical-context-heading">
        <h2 id="analytical-context-heading" className="text-heading-md text-neutral-900">
          Analytical Context
        </h2>
        <div className="rounded-xl border border-neutral-200 bg-white p-5 min-h-[300px] max-h-[450px] overflow-hidden">
          <p className="text-body-base text-neutral-500">Analytical Context - Charts coming soon</p>
        </div>
      </section>

      {/* Section 4: Recent Detection Activity */}
      <section className="space-y-4" aria-labelledby="recent-detection-heading">
        <h2 id="recent-detection-heading" className="text-heading-md text-neutral-900">
          Recent Detection Activity
        </h2>
        <div className="rounded-xl border border-neutral-200 bg-white p-5 min-h-[300px] max-h-[450px] overflow-hidden">
          <p className="text-body-base text-neutral-500">Recent Detection Activity - Table coming soon</p>
        </div>
      </section>
    </div>
  );
}
