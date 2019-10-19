import * as React from 'react'

import IScrollbarProps from './IScrollbarProps'

import { getScrollPosition, getScrollSize, getScrollbarStyle, getScrollbarWrapperStyle } from './utils'

const VerticalScrollbar: React.SFC<IScrollbarProps> = (props) => 
{
  const { visibleContentSize, scrollbarSize } = props
  return (
    <div
      role="scrollbar-wrapper"
      style={getScrollbarWrapperStyle({
        transition: `width .3s`,
        right: 0,
        top: 0,
        height: `${visibleContentSize}px`,
        width: `${scrollbarSize}px`,
      })}
    >
      <div
        role="scrollbar"
        style={getScrollbarStyle(
          props,
          {
            width: '100%',
            left: 0,
            height: `${getScrollSize(props)}px`,
            top: `${getScrollPosition(props)}px`,
          }
        )}
      />
    </div>
)
}

export default VerticalScrollbar