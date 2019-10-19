import OnScroll from '../OnScroll.type'
import IScrollableAreaWrapper from '../IScrollableAreaWrapper'

export default interface IControlledScrollableArea extends IScrollableAreaWrapper {
  scrollLeft: number;
  scrollTop: number;
  onScroll: OnScroll;
}