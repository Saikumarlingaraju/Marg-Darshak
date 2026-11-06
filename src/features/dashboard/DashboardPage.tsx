import { useMemo, useState } from 'react';
import { CalendarDays, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { KPISection } from '@/components/kpi/KPISection';
import { MapContainer } from '@/components/map';
import { AreaChart, HorizontalBarChart } from '@/components/charts';
import { Badge, SeverityBadge, StatusBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { DataTable, type ColumnDef } from '@/components/ui/Table';
import { api, queryKeys, type DetectionRecord } from '@/lib/api';

const PAGE_SIZE = 6;

function formatDetectionType(value: string) {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function getActivityStatus(index: number): 'pending' | 'in_progress' | 'resolved' {
  return index % 4 === 0 ? 'resolved' : index % 3 === 0 ? 'in_progress' : 'pending';
}

export function DashboardPage() {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<'detectedAt' | 'severity' | 'location'>('detectedAt');
  const [sortDescending, setSortDescending] = useState(true);

  const trendsQuery = useQuery({
    queryKey: queryKeys.detectionTrends,
    queryFn: () => api.getDetectionTrends(),
  });
  const distributionQuery = useQuery({
    queryKey: queryKeys.issueDistribution,
    queryFn: () => api.getIssueDistribution(),
  });
  const detectionsQuery = useQuery({
    queryKey: queryKeys.recentDetections(1, 50),
    queryFn: () => api.getRecentDetections({ page: 1, pageSize: 50 }),
  });
  const priorityQuery = useQuery({
    queryKey: queryKeys.priorityQueue,
    queryFn: () => api.getPriorityQueue(),
  });

  const sortedDetections = useMemo(() => {
    const records = detectionsQuery.data?.data.data ?? [];
    return [...records].sort((a, b) => {
      const left = sortKey === 'severity' ? a.severity : sortKey === 'location' ? a.location : a.detectedAt;
      const right = sortKey === 'severity' ? b.severity : sortKey === 'location' ? b.location : b.detectedAt;
      const result = left.localeCompare(right);
      return sortDescending ? -result : result;
    });
  }, [detectionsQuery.data, sortDescending, sortKey]);

  const pageCount = Math.max(1, Math.ceil(sortedDetections.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleDetections = sortedDetections.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const columns: ColumnDef<DetectionRecord>[] = [
    { key: 'id', header: 'Detection ID', accessor: (row) => <span className="font-mono text-primary">{row.id}</span>, width: '120px' },
    { key: 'location', header: 'Location', accessor: (row) => <span className="font-medium text-neutral-900">{row.location}</span>, truncate: true },
    { key: 'category', header: 'Defect category', accessor: (row) => formatDetectionType(row.detectionType) },
    { key: 'severity', header: 'Severity', accessor: (row) => <SeverityBadge severity={row.severity} size="sm" /> },
    { key: 'detectedAt', header: 'Detection time', accessor: (row) => formatDate(row.detectedAt) },
    {
      key: 'status',
      header: 'Status',
      accessor: (row) => <StatusBadge status={getActivityStatus(sortedDetections.indexOf(row))} size="sm" />,
    },
  ];

  const handleExport = () => {
    const csv = ['Detection ID,Location,Category,Severity,Detection time', ...sortedDetections.map((row) =>
      [row.id, row.location, formatDetectionType(row.detectionType), row.severity, row.detectedAt]
        .map((value) => `"${value.replaceAll('"', '""')}"`)
        .join(',')
    )].join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'marg-darshak-detections.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const toggleSort = (key: typeof sortKey) => {
    if (sortKey === key) setSortDescending((value) => !value);
    else {
      setSortKey(key);
      setSortDescending(key !== 'location');
    }
    setPage(1);
  };

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-display-xl text-primary">City infrastructure overview</h1>
            <Badge variant="success" size="sm" dot>Live data</Badge>
          </div>
          <p className="mt-2 text-body-base text-neutral-600">
            Bengaluru · A connected view of road health, detection activity and monitoring coverage.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <span>29 Oct – 04 Nov 2026</span>
            <CalendarDays className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            Export report
            <Download className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      <section aria-labelledby="observation-summary-heading">
        <h2 id="observation-summary-heading" className="sr-only">Observation summary</h2>
        <KPISection />
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,2.1fr)_minmax(300px,0.9fr)]" aria-labelledby="spatial-operations-heading">
        <Card padding="none" className="overflow-hidden">
          <CardHeader className="mb-0 flex items-center justify-between p-[18px]">
            <div>
              <CardTitle>Infrastructure intelligence</CardTitle>
              <p className="mt-1 text-body-xs text-neutral-600">GPS-tagged detections across the monitored road network</p>
            </div>
            <span className="text-body-sm font-semibold text-info">Bengaluru</span>
          </CardHeader>
          <div className="h-[430px] border-t border-neutral-200">
            <MapContainer style={{ height: '100%' }} center={[12.9716, 77.5946]} zoom={11} />
          </div>
        </Card>

        <Card padding="none" className="overflow-hidden">
          <CardHeader className="mb-0 p-[18px]">
            <CardTitle>Priority inspection queue</CardTitle>
            <p className="mt-1 text-body-xs text-neutral-600">Items requiring operational attention</p>
          </CardHeader>
          <CardContent className="max-h-[430px] space-y-3 overflow-y-auto border-t border-neutral-200 p-[18px]">
            {(priorityQuery.data?.data ?? []).slice(0, 6).map((item) => (
              <div key={item.id} className="border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-body-sm font-semibold text-neutral-900">{item.title}</p>
                  <SeverityBadge severity={item.severity} size="sm" />
                </div>
                <p className="mt-1 text-body-xs text-neutral-600">{item.location}</p>
                <p className="mt-1 text-caption text-neutral-400">{formatDate(item.detectedAt)}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 xl:grid-cols-2" aria-labelledby="analytics-heading">
        <Card padding="none">
          <CardHeader className="mb-0 p-[18px]">
            <CardTitle>Detection activity</CardTitle>
            <p className="mt-1 text-body-xs text-neutral-600">Daily detections across the current reporting period</p>
          </CardHeader>
          <CardContent className="border-t border-neutral-200 p-[18px]">
            <AreaChart data={trendsQuery.data?.data ?? []} height={250} />
          </CardContent>
        </Card>
        <Card padding="none">
          <CardHeader className="mb-0 p-[18px]">
            <CardTitle>Issue distribution</CardTitle>
            <p className="mt-1 text-body-xs text-neutral-600">Most frequent infrastructure issue categories</p>
          </CardHeader>
          <CardContent className="border-t border-neutral-200 p-[18px]">
            <HorizontalBarChart data={distributionQuery.data?.data ?? []} height={250} />
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="recent-detection-heading">
        <Card padding="none" className="overflow-hidden">
          <CardHeader className="mb-0 flex flex-col gap-3 p-[18px] md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Recent detection activity</CardTitle>
              <p className="mt-1 text-body-xs text-neutral-600">Latest GPS-tagged infrastructure observations</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant={sortKey === 'detectedAt' ? 'primary' : 'outline'} size="sm" onClick={() => toggleSort('detectedAt')}>Newest</Button>
              <Button variant={sortKey === 'severity' ? 'primary' : 'outline'} size="sm" onClick={() => toggleSort('severity')}>Severity</Button>
              <Button variant={sortKey === 'location' ? 'primary' : 'outline'} size="sm" onClick={() => toggleSort('location')}>Location</Button>
            </div>
          </CardHeader>
          <div className="border-t border-neutral-200">
            <DataTable
              data={visibleDetections}
              columns={columns}
              keyExtractor={(row) => row.id}
              loading={detectionsQuery.isLoading}
              emptyMessage="No recent detections"
            />
          </div>
          <div className="flex items-center justify-between border-t border-neutral-200 px-[18px] py-3">
            <span className="text-body-xs text-neutral-600">
              Showing {visibleDetections.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0}–{Math.min(currentPage * PAGE_SIZE, sortedDetections.length)} of {sortedDetections.length}
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setPage((value) => Math.max(1, value - 1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-body-xs text-neutral-600">Page {currentPage} of {pageCount}</span>
              <Button variant="outline" size="sm" disabled={currentPage === pageCount} onClick={() => setPage((value) => Math.min(pageCount, value + 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
