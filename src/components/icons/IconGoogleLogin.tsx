type IconGoogleLoginProps = {
  size: number;
};

export default function IconGoogleLogin({ size }: IconGoogleLoginProps) {
  return (
    <svg
      width={`${size - 1}`}
      height={`${size}`}
      viewBox="0 0 63 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_399_417)">
        <path
          d="M62.5074 32.5987C62.5074 29.9767 62.2947 28.0633 61.8342 26.079H31.8929V37.9137H49.4678C49.1136 40.8547 47.2002 45.2839 42.9481 48.2602L42.8885 48.6564L52.3554 55.9902L53.0112 56.0557C59.0348 50.4926 62.5074 42.3074 62.5074 32.5987Z"
          fill="#4285F4"
        />
        <path
          d="M31.8928 63.7802C40.503 63.7802 47.7314 60.9454 53.0111 56.0557L42.948 48.2602C40.2551 50.1382 36.6408 51.4492 31.8928 51.4492C23.4597 51.4492 16.3023 45.8863 13.7508 38.1973L13.3768 38.229L3.53303 45.8472L3.4043 46.2051C8.64839 56.6224 19.4202 63.7802 31.8928 63.7802Z"
          fill="#34A853"
        />
        <path
          d="M13.7508 38.1973C13.0776 36.213 12.688 34.0869 12.688 31.8901C12.688 29.6931 13.0776 27.5672 13.7154 25.5829L13.6976 25.1603L3.73044 17.4197L3.40433 17.5749C1.24299 21.8978 0.00280762 26.7523 0.00280762 31.8901C0.00280762 37.0279 1.24299 41.8822 3.40433 46.2051L13.7508 38.1973Z"
          fill="#FBBC05"
        />
        <path
          d="M31.8928 12.3307C37.881 12.3307 41.9203 14.9174 44.2236 17.079L53.2237 8.29142C47.6962 3.15359 40.503 0 31.8928 0C19.4202 0 8.64839 7.1575 3.4043 17.5748L13.7154 25.5829C16.3023 17.8939 23.4597 12.3307 31.8928 12.3307Z"
          fill="#EB4335"
        />
      </g>
      <defs>
        <clipPath id="clip0_399_417">
          <rect width="62.54" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
