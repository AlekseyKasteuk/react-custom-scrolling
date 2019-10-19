import * as React from 'react'

import IScrollbarProps from './IScrollbarProps'

import { getScrollPosition, getScrollSize, getScrollbarStyle, getScrollbarWrapperStyle } from './utils'

const HorizontalScrollbar: React.SFC<IScrollbarProps> = (props) => 
{
  const { visibleContentSize, scrollbarSize } = props
  return (
    <div
      role="scrollbar-wrapper"
      style={getScrollbarWrapperStyle({
        transition: `height .3s`,
        left: 0,
        bottom: 0,
        width: `${visibleContentSize}px`,
        height: `${scrollbarSize}px`,
      })}
    >
      <div
        role="scrollbar"
        style={getScrollbarStyle(
          props,
          {
            height: '100%',
            top: 0,
            width: `${getScrollSize(props)}px`,
            left: `${getScrollPosition(props)}px`,
          }
        )}
      />
    </div>
)
}

export default HorizontalScrollbar