type IconWarningProps = {
  size: number;
};

export default function IconWarning({ size }: IconWarningProps) {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.0001 0.166504C12.8685 0.166504 9.80734 1.09511 7.20356 2.8349C4.59978 4.57469 2.57038 7.04752 1.372 9.94068C0.173608 12.8338 -0.139944 16.0174 0.470988 19.0888C1.08192 22.1601 2.5899 24.9814 4.80423 27.1957C7.01856 29.41 9.83979 30.918 12.9112 31.5289C15.9825 32.1399 19.1661 31.8263 22.0592 30.6279C24.9524 29.4295 27.4252 27.4001 29.165 24.7964C30.9048 22.1926 31.8334 19.1314 31.8334 15.9998C31.8286 11.8021 30.1589 7.77761 27.1906 4.80934C24.2223 1.84106 20.1979 0.171356 16.0001 0.166504ZM16.0001 24.3332C15.6705 24.3332 15.3482 24.2354 15.0741 24.0523C14.8001 23.8692 14.5864 23.6089 14.4603 23.3043C14.3341 22.9998 14.3011 22.6647 14.3654 22.3414C14.4298 22.0181 14.5885 21.7211 14.8216 21.488C15.0547 21.2549 15.3516 21.0962 15.6749 21.0319C15.9982 20.9676 16.3334 21.0006 16.6379 21.1267C16.9424 21.2529 17.2027 21.4665 17.3859 21.7406C17.569 22.0146 17.6668 22.3369 17.6668 22.6665C17.6668 23.1085 17.4912 23.5325 17.1786 23.845C16.866 24.1576 16.4421 24.3332 16.0001 24.3332ZM17.6668 17.6665C17.6668 18.1085 17.4912 18.5325 17.1786 18.845C16.866 19.1576 16.4421 19.3332 16.0001 19.3332C15.5581 19.3332 15.1341 19.1576 14.8216 18.845C14.509 18.5325 14.3334 18.1085 14.3334 17.6665V9.33317C14.3334 8.89114 14.509 8.46722 14.8216 8.15466C15.1341 7.8421 15.5581 7.6665 16.0001 7.6665C16.4421 7.6665 16.866 7.8421 17.1786 8.15466C17.4912 8.46722 17.6668 8.89114 17.6668 9.33317V17.6665Z"
        fill="#2F2F38"
      />
    </svg>
  );
}
