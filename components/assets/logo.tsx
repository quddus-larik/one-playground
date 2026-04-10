import type { SVGProps } from "react";

export function TinyIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="852"
      height="852"
      viewBox="0 0 852 852"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g filter="url(#filter0_d_10_20)">
        <path
          d="M288.114 137.886C364.266 61.7336 487.734 61.7336 563.886 137.886L714.114 288.114C790.266 364.266 790.266 487.734 714.114 563.886L563.886 714.114C487.734 790.266 364.266 790.266 288.114 714.114L137.886 563.886C61.7336 487.734 61.7336 364.266 137.886 288.114L288.114 137.886Z"
          fill="url(#paint0_linear_10_20)"
        />
      </g>
      <path
        d="M633.585 301.449V447.661H487.373V301.449H633.585Z"
        fill="white"
      />
      <path
        d="M471.127 371.847V447.661H324.915V350.186L471.127 371.847Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_d_10_20"
          x="76.7716"
          y="80.7716"
          width="698.457"
          height="698.457"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_10_20"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_10_20"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_10_20"
          x1="801.458"
          y1="693.153"
          x2="90.2542"
          y2="267.153"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#AD6FFF" />
          <stop offset="1" stopColor="#923FFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}
