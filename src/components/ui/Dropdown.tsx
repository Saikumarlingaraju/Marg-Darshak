import { useState, useRef, useEffect, useId, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, Check } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  searchable?: boolean;
  multiSelect?: boolean;
  maxHeight?: number;
}

export function Dropdown({
  options,
  value,
  placeholder = 'Select...',
  onChange,
  disabled = false,
  className,
  searchable = false,
  multiSelect = false,
  maxHeight = 200,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (option: DropdownOption) => {
    if (option.disabled) return;

    if (multiSelect) {
      const currentValues = value ? value.split(',') : [];
      const newValues = currentValues.includes(option.value)
        ? currentValues.filter((v) => v !== option.value)
        : [...currentValues, option.value];
      onChange?.(newValues.join(','));
    } else {
      onChange?.(option.value);
      setIsOpen(false);
    }
  };

  const isSelected = (optionValue: string) => {
    if (!value) return false;
    return multiSelect ? value.split(',').includes(optionValue) : value === optionValue;
  };

  const displayValue = () => {
    if (!value) return placeholder;
    const selectedOptions = options.filter((opt) =>
      multiSelect ? value.split(',').includes(opt.value) : opt.value === value
    );
    if (selectedOptions.length === 0) return placeholder;
    if (multiSelect) {
      return selectedOptions.length > 2
        ? `${selectedOptions.length} selected`
        : selectedOptions.map((o) => o.label).join(', ');
    }
    return selectedOptions[0].label;
  };

  return (
    <div ref={dropdownRef} className={cn('relative w-full', className)}>
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          'w-full flex items-center justify-between px-3 py-2',
          'bg-white border border-neutral-300 rounded-md',
          'text-body-base text-neutral-900',
          'hover:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
          'disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed',
          'transition-colors duration-150',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={disabled}
      >
        <span className={cn('truncate flex-1', !value && 'text-neutral-400')}>
          {displayValue()}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-neutral-500 flex-shrink-0 ml-2 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute z-[50] mt-1 w-full max-h-[200px] overflow-auto',
            'bg-white border border-neutral-300 rounded-md shadow-dropdown',
            'scrollbar-thin'
          )}
          style={{ maxHeight }}
          role="listbox"
        >
          {searchable && (
            <div className="p-2 border-b border-neutral-100 sticky top-0 bg-white">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-2 py-1.5 text-body-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                autoFocus
              />
            </div>
          )}

          {filteredOptions.length === 0 ? (
            <div className="px-3 py-4 text-center text-body-sm text-neutral-500">
              {searchQuery ? 'No matches found' : 'No options available'}
            </div>
          ) : (
            <ul className="py-1" role="listbox">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected(option.value)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 cursor-pointer',
                    'hover:bg-neutral-50',
                    isSelected(option.value) && 'bg-primary/5',
                    option.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                  onClick={() => handleSelect(option)}
                >
                  {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                  <span className={cn('flex-1 truncate text-body-sm', option.disabled && 'text-neutral-400')}>
                    {option.label}
                  </span>
                  {isSelected(option.value) && (
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  )}
                </li>
              ))}
            </ul>
          )}

          {multiSelect && value && (
            <div className="border-t border-neutral-100 p-2 sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={() => onChange?.('')}
                className="w-full px-3 py-1.5 text-body-sm text-error hover:bg-error-bg rounded-md transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export interface SelectProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  label?: string;
  error?: string;
  helperText?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder,
  disabled,
  className,
  label,
  error,
  helperText,
}: SelectProps) {
  const selectId = useId();

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={selectId} className="block text-body-sm text-neutral-700 mb-1.5 font-medium">
          {label}
        </label>
      )}
      <Dropdown
        options={options}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {error && (
        <p className="mt-1.5 text-body-sm text-error" role="alert">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-body-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
}