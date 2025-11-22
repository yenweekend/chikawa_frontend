export type PriceFilter = {
  from?: string;
  to?: string;
};

export interface Filter {
  key: string;
  label: string;
  value: string[];
}
