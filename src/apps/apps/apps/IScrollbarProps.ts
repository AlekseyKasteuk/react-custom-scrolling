export default interface IScrollbarProps {
  scrollbarColor?: string;
  scrollbarSize?: number;
  visibleContentSize: number;
  fullContentSize: number;
  scrollPosition: number;
  onScroll: (position: number) => void;
}