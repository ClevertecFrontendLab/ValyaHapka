export interface SwiperProps {
  imgs: string[] | null;
  setImg: React.Dispatch<React.SetStateAction<string | undefined>>;
  activeImg?: string | undefined;
}
