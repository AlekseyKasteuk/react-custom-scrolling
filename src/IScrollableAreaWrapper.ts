import OnScroll from './OnScroll.type'

export default interface IScrollableAreaWrapper {
  width: number;
  height: number;

  disableScrolling?: boolean;

  fullWidth?: number;
  fullHeight?: number;
  
  scrollLeft?: number;
  scrollTop?: number;
  onScroll?: OnScroll;

  scrollbarSize?: number;
  horizontalScrollbarSize?: number;
  verticalScrollbarSize?: number;
  
  scrollbarColor?: string;
  horizontalScrollbarColor?: string;
  verticalScrollbarColor?: string;

  showScrollbars?: boolean;
  showHorizontalScrollbar?: boolean;
  showVerticalScrollbar?: boolean;

  autohide?: boolean;
  horizontalAutohide?: boolean;
  verticalAutohide?: boolean;

  autohideTime?: number;
  horizontalAutohideTime?: number;
  verticalAutohideTime?: number;

  fingersToScroll?: number;
  scrollSpeed?: number;
}