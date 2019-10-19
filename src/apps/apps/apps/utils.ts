import IScrollbarProps from './IScrollbarProps'

export const getScrollSize = ({
  visibleContentSize,
  fullContentSize,
  scrollbarSize,
}: IScrollbarProps): number => {
  return Math.max(Math.floor(visibleContentSize * (visibleContentSize / fullContentSize)), scrollbarSize)
}

export const getScrollPosition = (props: IScrollbarProps): number => {
  const size = getScrollSize(props)
  const { visibleContentSize, fullContentSize, scrollPosition } = props
  return Math.min(visibleContentSize - size, Math.floor((scrollPosition / fullContentSize) * visibleContentSize))
}

export const getScrollbarStyle = (
  { scrollbarSize = 10, scrollbarColor = '#aaa' }: IScrollbarProps,
  style: React.CSSProperties,
): React.CSSProperties => {

  return {
    position: 'absolute',
    borderRadius: `${scrollbarSize / 2}px`,
    backgroundColor: scrollbarColor,
    ...style,
  }
}

export const getScrollbarWrapperStyle = (style: React.CSSProperties): React.CSSProperties => ({
  position: 'absolute',
  ...style,
})