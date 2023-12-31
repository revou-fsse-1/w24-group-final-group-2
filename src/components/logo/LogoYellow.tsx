type LogoProps = {
  size: number;
};

export default function LogoYellow({ size }: LogoProps) {
  return (
    <svg
      width={`${size}`}
      height={`${size - 2}`}
      viewBox="0 0 55 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 7C0 3.13401 3.13401 0 7 0H48C51.866 0 55 3.13401 55 7V45.0667C55 48.9327 51.866 52.0667 48 52.0667H7C3.13401 52.0667 0 48.9327 0 45.0667V7Z"
        fill="#EAC066"
      />
      <g clipPath="url(#clip0_175_1061)">
        <path
          d="M25.2925 30.6776L16.8388 24.1556C16.166 23.6367 15.1995 23.7619 14.681 24.4342C14.1622 25.1064 14.2864 26.073 14.9596 26.5919L23.4127 33.1134C24.086 33.6322 25.0521 33.5081 25.571 32.8354C26.0899 32.1626 25.9652 31.1965 25.2925 30.6776Z"
          fill="#203D59"
        />
        <path
          d="M26.3444 11.8333L34.7986 18.3547C35.4714 18.8742 36.4375 18.7495 36.9564 18.0768C37.4753 17.404 37.3506 16.4385 36.6779 15.919L28.2242 9.39708C27.5514 8.87818 26.5853 9.0034 26.0664 9.67559C25.5475 10.3483 25.6723 11.3144 26.3444 11.8333Z"
          fill="#203D59"
        />
        <path
          d="M25.61 12.6382L17.5405 23.0978L26.138 29.7296L34.207 19.2699L25.61 12.6382Z"
          fill="#203D59"
        />
        <path
          d="M46.8568 34.687L32.4998 23.6113L29.958 26.906L44.3156 37.9816C45.2254 38.6835 46.5316 38.5154 47.233 37.6054C47.9354 36.695 47.7667 35.3888 46.8568 34.687Z"
          fill="#203D59"
        />
        <path
          d="M22.5251 38.2916C22.5251 37.1876 21.6307 36.2925 20.5266 36.2925H11.1365C10.0325 36.2925 9.13794 37.1875 9.13794 38.2916V39.774H22.5251V38.2916Z"
          fill="#203D59"
        />
        <path
          d="M23.5962 41.0291H8.06665V43.7232H23.5962V41.0291Z"
          fill="#203D59"
        />
      </g>
      <defs>
        <clipPath id="clip0_175_1061">
          <rect
            width="39.6"
            height="39.6"
            fill="white"
            transform="translate(8.06665 6.6001)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
