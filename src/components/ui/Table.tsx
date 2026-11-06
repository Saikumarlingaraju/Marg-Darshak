import { type HTMLAttributes, forwardRef, type TableHTMLAttributes, type ThHTMLAttributes, type TdHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  variant?: 'default' | 'striped' | 'bordered';
  size?: 'sm' | 'md';
  hoverable?: boolean;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = 'default', size = 'md', hoverable = false, children, ...props }, ref) => {
    const variants = {
      default: '',
      striped: '',
      bordered: 'border border-neutral-200',
    };

    const sizes = {
      sm: 'text-body-xs',
      md: 'text-body-sm',
    };

    return (
      <div className="overflow-x-auto w-full">
        <table
          ref={ref}
          className={cn(
            'w-full border-collapse',
            variants[variant],
            sizes[size],
            hoverable && 'hover:bg-neutral-50',
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = 'Table';

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn('bg-neutral-50 border-b border-neutral-200', className)}
      {...props}
    >
      {children}
    </thead>
  )
);

TableHeader.displayName = 'TableHeader';

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('divide-y divide-neutral-100', className)}
      {...props}
    >
      {children}
    </tbody>
  )
);

TableBody.displayName = 'TableBody';

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  clickable?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected = false, clickable = false, children, onClick, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'transition-colors duration-150',
        selected && 'bg-primary/5',
        clickable && 'cursor-pointer hover:bg-neutral-50',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  )
);

TableRow.displayName = 'TableRow';

export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  onSort?: () => void;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, width, align = 'left', sortable = false, onSort, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'px-4 py-3',
        'text-table-header text-neutral-600',
        'font-normal',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        sortable && 'cursor-pointer select-none hover:text-primary transition-colors',
        className
      )}
      style={{ width }}
      onClick={onSort}
      scope="col"
      {...props}
    >
      <div className="flex items-center gap-1.5">
        {children}
        {sortable && (
          <span className="text-neutral-400">
            ▼
          </span>
        )}
      </div>
    </th>
  )
);

TableHead.displayName = 'TableHead';

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = 'left', truncate = false, children, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'px-4 py-3',
        'text-body-sm text-neutral-700',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        truncate && 'truncate max-w-[200px]',
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
);

TableCell.displayName = 'TableCell';

export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableFooter = forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, children, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('bg-neutral-50 border-t border-neutral-200', className)}
      {...props}
    >
      {children}
    </tfoot>
  )
);

TableFooter.displayName = 'TableFooter';

/**
 * Column definition for dynamic tables
 */
export interface ColumnDef<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  sortable?: boolean;
  render?: (value: unknown, row: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  keyExtractor: (row: T) => string;
  onRowClick?: (row: T) => void;
  selectedKeys?: Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  selectedKeys,
  onSelectionChange,
  loading = false,
  emptyMessage = 'No data available',
  className,
  striped = false,
  hoverable = true,
}: DataTableProps<T>) {
  const handleRowClick = (row: T) => {
    if (onRowClick) {
      onRowClick(row);
    }
    if (onSelectionChange) {
      const key = keyExtractor(row);
      const newKeys = new Set(selectedKeys || []);
      if (newKeys.has(key)) {
        newKeys.delete(key);
      } else {
        newKeys.add(key);
      }
      onSelectionChange(newKeys);
    }
  };

  const isSelected = (row: T) => selectedKeys?.has(keyExtractor(row));

  if (loading) {
    return (
      <div className={cn('w-full py-12 text-center', className)}>
        <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-body-sm text-neutral-500">Loading...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={cn('w-full py-12 text-center', className)}>
        <p className="text-body-sm text-neutral-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <Table variant={striped ? 'striped' : 'default'} hoverable={hoverable} className={className}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.key}
              width={column.width}
              align={column.align}
              sortable={column.sortable}
            >
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={keyExtractor(row)}
            selected={isSelected(row)}
            clickable={!!(onRowClick || onSelectionChange)}
            onClick={() => handleRowClick(row)}
          >
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align={column.align}
                truncate={column.truncate}
              >
                {column.render
                  ? column.render(column.accessor(row), row)
                  : column.accessor(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}