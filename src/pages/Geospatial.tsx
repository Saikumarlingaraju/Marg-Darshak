import { Map, Radio, ShieldCheck } from 'lucide-react';
import { MapContainer } from '@/components/map';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { useUIStore } from '@/store/uiStore';

export default function Geospatial() {
  const selectedCity = useUIStore((state) => state.selectedCity);
  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-display-xl text-primary">Geospatial intelligence</h1>
            <Badge variant="success" size="sm" dot>Live workspace</Badge>
          </div>
          <p className="mt-2 text-body-base text-neutral-600">
            Explore road infrastructure observations, coverage boundaries and maintenance status across {selectedCity.name}.
          </p>
        </div>
        <div className="flex items-center gap-2 text-body-sm text-neutral-600">
          <Radio className="h-4 w-4 text-success" />
          <span>GPS data synced 2 min ago</span>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card padding="sm">
          <CardContent className="flex items-center gap-3 p-0">
            <Map className="h-5 w-5 text-info" />
            <div>
              <p className="text-caption text-neutral-500">Map coverage</p>
              <p className="text-body-sm font-semibold text-primary">24 wards monitored</p>
            </div>
          </CardContent>
        </Card>
        <Card padding="sm">
          <CardContent className="flex items-center gap-3 p-0">
            <ShieldCheck className="h-5 w-5 text-success" />
            <div>
              <p className="text-caption text-neutral-500">Road network</p>
              <p className="text-body-sm font-semibold text-primary">1,284 km surveyed</p>
            </div>
          </CardContent>
        </Card>
        <Card padding="sm">
          <CardContent className="flex items-center gap-3 p-0">
            <Radio className="h-5 w-5 text-warning" />
            <div>
              <p className="text-caption text-neutral-500">Visible detections</p>
              <p className="text-body-sm font-semibold text-primary">GPS-tagged observations</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="flex flex-col gap-1 border-b border-neutral-200 px-[18px] py-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-heading-sm text-primary">Geospatial workspace</h2>
            <p className="mt-1 text-body-xs text-neutral-600">
              Toggle layers and combine filters to inspect individual detections.
            </p>
          </div>
          <span className="text-body-sm font-semibold text-info">{selectedCity.name}, India</span>
        </div>
        <div className="h-[min(72vh,720px)] min-h-[520px]">
          <MapContainer center={[selectedCity.centerLat, selectedCity.centerLng]} zoom={selectedCity.zoomLevel} style={{ height: '100%' }} />
        </div>
      </Card>
    </div>
  );
}
