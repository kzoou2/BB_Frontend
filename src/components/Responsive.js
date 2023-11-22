import { useMediaQuery } from 'react-responsive';

export const PC = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 700 });
  return isDesktop ? children : null;
};


export const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 700 });
  return isMobile ? children : null;
};

// PC, Mobile 사이즈 사이에 공백있음 -> 조정 필요