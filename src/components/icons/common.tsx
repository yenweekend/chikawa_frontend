import type { IconProps } from "@/user/types/icon";

export const ArrowLeftIcon = ({ className, size = 16 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.30994 3.35641C7.51822 3.56469 7.51822 3.90237 7.30994 4.11065L3.95373 7.46686H13.3328C13.6273 7.46686 13.8661 7.70565 13.8661 8.0002C13.8661 8.29475 13.6273 8.53353 13.3328 8.53353H3.95373L7.30994 11.8897C7.51822 12.098 7.51822 12.4357 7.30994 12.644C7.10166 12.8523 6.76397 12.8523 6.5557 12.644L2.28903 8.37732C2.08074 8.16904 2.08074 7.83136 2.28903 7.62308L6.5557 3.35641C6.76397 3.14812 7.10166 3.14812 7.30994 3.35641Z"
      fill="#030712"
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);
