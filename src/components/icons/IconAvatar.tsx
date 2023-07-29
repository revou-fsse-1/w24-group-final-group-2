type IconAvatarProps = {
  size: number;
};

export default function IconAvatar({ size }: IconAvatarProps) {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.25 23.5C18.4632 23.5 23.5 18.4632 23.5 12.25C23.5 6.0368 18.4632 1 12.25 1C6.0368 1 1 6.0368 1 12.25C1 18.4632 6.0368 23.5 12.25 23.5ZM12.25 23.5C14.451 23.5024 16.6038 22.8554 18.4388 21.64C18.2937 20.4314 17.7114 19.3176 16.8015 18.5088C15.8917 17.7001 14.7173 17.2523 13.5 17.25H11C9.78269 17.2523 8.60832 17.7001 7.69848 18.5088C6.78865 19.3176 6.20628 20.4314 6.06125 21.64C7.89623 22.8554 10.049 23.5024 12.25 23.5ZM16 9.75C16 11.8211 14.3211 13.5 12.25 13.5C10.1789 13.5 8.5 11.8211 8.5 9.75C8.5 7.67893 10.1789 6 12.25 6C14.3211 6 16 7.67893 16 9.75Z"
        stroke="#203D59"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}