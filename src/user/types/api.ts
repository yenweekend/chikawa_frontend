export interface SelectOption<T = string> {
  value: T;
  label: string;
  description?: string;
  imgUrl?: string;
}
