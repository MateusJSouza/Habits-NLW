interface PlusIconProps {
  width?: number;
  height?: number;
}

export function PlusIcon({ width = 20, height = 20 }: PlusIconProps) {
  return (
    <>
      <svg width={width} height={height} viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.55756 10H17.3076" stroke="#8B5CF6" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10.4326 3.125V16.875" stroke="#8B5CF6" strokeWidth="1.88" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </>
  );
}
