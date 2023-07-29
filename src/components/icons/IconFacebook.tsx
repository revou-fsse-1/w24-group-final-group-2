type IconFacebookProps = {
  size: number;
};

export default function IconFacebook({ size }: IconFacebookProps) {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.3646 12.5H31.25V6.25H27.3646C25.0769 6.25276 22.8836 7.16278 21.2659 8.78047C19.6482 10.3982 18.7382 12.5914 18.7355 14.8792V18.75H14.5834V25H18.75V45.7042H25V25H29.2105L30.4438 18.75H25V13.7312C25.0049 13.4059 25.1365 13.0952 25.3668 12.8653C25.5971 12.6353 25.908 12.5043 26.2334 12.5H27.3646Z"
        fill="#EAC066"
      />
      <rect
        x="1"
        y="1"
        width="48"
        height="48"
        rx="4"
        stroke="#EAC066"
        strokeWidth="2"
      />
    </svg>
  );
}
