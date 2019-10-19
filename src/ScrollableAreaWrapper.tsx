import * as React from 'react'

import IScrollableAreaWrapper from './IScrollableAreaWrapper'

import ControlledScrollableArea from './apps/ControlledScrollableArea'
import UncontrolledScrollableArea from './apps/UncontrolledScrollableArea'

const fallbackFn = () => {}

const ScrollableArea: React.SFC<IScrollableAreaWrapper> = (props) => {
  const { onScroll, scrollLeft, scrollTop } = props
  if (!onScroll) {
    return <UncontrolledScrollableArea {...props} />
  }
  return (
    <ControlledScrollableArea
      {...props}
      scrollLeft={scrollLeft || 0}
      scrollTop={scrollTop || 0}
      onScroll={onScroll || fallbackFn}
    />
  )
}

export default ScrollableArea
