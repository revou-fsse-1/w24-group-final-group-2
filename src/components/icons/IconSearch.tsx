type IconSearchProps = {
  size: number;
};

export default function IconSearch({ size }: IconSearchProps) {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.875 21.875L17.7083 17.7083M17.7083 10.4167C17.7083 14.4437 14.4437 17.7083 10.4167 17.7083C6.38959 17.7083 3.125 14.4437 3.125 10.4167C3.125 6.38959 6.38959 3.125 10.4167 3.125C14.4437 3.125 17.7083 6.38959 17.7083 10.4167Z"
        stroke="#203D59"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
