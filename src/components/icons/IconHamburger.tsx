type IconHamburgerProps = {
  size: number;
};

export default function IconHamburger({ size }: IconHamburgerProps) {
  return (
    <svg
      width={`${size}`}
      height={`${size - 4}`}
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 2.75H1.25C0.918479 2.75 0.600537 2.6183 0.366117 2.38388C0.131696 2.14946 0 1.83152 0 1.5C0 1.16848 0.131696 0.850537 0.366117 0.616117C0.600537 0.381696 0.918479 0.25 1.25 0.25H20C20.3315 0.25 20.6495 0.381696 20.8839 0.616117C21.1183 0.850537 21.25 1.16848 21.25 1.5C21.25 1.83152 21.1183 2.14946 20.8839 2.38388C20.6495 2.6183 20.3315 2.75 20 2.75Z"
        fill="#203D59"
      />
      <path
        d="M20 10.25H1.25C0.918479 10.25 0.600537 10.1183 0.366117 9.88388C0.131696 9.64946 0 9.33152 0 9C0 8.66848 0.131696 8.35054 0.366117 8.11612C0.600537 7.8817 0.918479 7.75 1.25 7.75H20C20.3315 7.75 20.6495 7.8817 20.8839 8.11612C21.1183 8.35054 21.25 8.66848 21.25 9C21.25 9.33152 21.1183 9.64946 20.8839 9.88388C20.6495 10.1183 20.3315 10.25 20 10.25Z"
        fill="#203D59"
      />
      <path
        d="M20 17.75H1.25C0.918479 17.75 0.600537 17.6183 0.366117 17.3839C0.131696 17.1495 0 16.8315 0 16.5C0 16.1685 0.131696 15.8505 0.366117 15.6161C0.600537 15.3817 0.918479 15.25 1.25 15.25H20C20.3315 15.25 20.6495 15.3817 20.8839 15.6161C21.1183 15.8505 21.25 16.1685 21.25 16.5C21.25 16.8315 21.1183 17.1495 20.8839 17.3839C20.6495 17.6183 20.3315 17.75 20 17.75Z"
        fill="#203D59"
      />
    </svg>
  );
}
