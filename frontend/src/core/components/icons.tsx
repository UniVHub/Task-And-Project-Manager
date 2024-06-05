/**
 * Renders the logo as an SVG element.
 * @returns The JSX element representing the logo.
 */
export function Logo(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      color={"#fff"}
      fill={"none"}
    >
      <path
        d="M18 20.5C18.8888 20.3004 19.5638 19.9722 20.1088 19.4327C21.5 18.0554 21.5 15.8386 21.5 11.405C21.5 6.97145 21.5 4.75466 20.1088 3.37733C18.7175 2 16.4783 2 12 2C7.52166 2 5.28249 2 3.89124 3.37733C2.5 4.75466 2.5 6.97145 2.5 11.405C2.5 15.8386 2.5 18.0554 3.89124 19.4327C4.43619 19.9722 5.11124 20.3004 6 20.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2.5 8.5H21.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6.99981 5.5H7.00879"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9998 5.5H11.0088"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.9991 13C10.5744 13 9.65061 13.9085 8.55807 14.2397C8.11384 14.3744 7.89172 14.4417 7.80183 14.5366C7.71194 14.6315 7.68562 14.7702 7.63297 15.0476C7.06963 18.0157 8.30095 20.7598 11.2375 21.8279C11.553 21.9426 11.7108 22 12.0007 22C12.2906 22 12.4484 21.9426 12.7639 21.8279C15.7002 20.7598 16.9304 18.0157 16.3669 15.0476C16.3142 14.7701 16.2879 14.6314 16.198 14.5365C16.1081 14.4416 15.886 14.3743 15.4418 14.2397C14.3488 13.9086 13.4239 13 11.9991 13Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Renders the add icon as an SVG element.
 * @returns The JSX element representing the logo.
 */
export function AddIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
    >
      <path
        d="M13 2H13.2727C16.5339 2 18.1645 2 19.2969 2.79784C19.6214 3.02643 19.9094 3.29752 20.1523 3.60289C21 4.66867 21 6.20336 21 9.27273V11.8182C21 14.7814 21 16.2629 20.5311 17.4462C19.7772 19.3486 18.1829 20.8491 16.1616 21.5586C14.9044 22 13.3302 22 10.1818 22C8.38275 22 7.48322 22 6.76478 21.7478C5.60979 21.3424 4.69875 20.4849 4.26796 19.3979C4 18.7217 4 17.8751 4 16.1818V12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 12C21 13.8409 19.5076 15.3333 17.6667 15.3333C17.0009 15.3333 16.216 15.2167 15.5686 15.3901C14.9935 15.5442 14.5442 15.9935 14.3901 16.5686C14.2167 17.216 14.3333 18.0009 14.3333 18.6667C14.3333 20.5076 12.8409 22 11 22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 6L3 6M7 2V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
