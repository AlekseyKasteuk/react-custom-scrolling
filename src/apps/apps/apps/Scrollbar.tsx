import * as React from 'react'

import IScrollbarProps from './IScrollbarProps'

import HorizontalScrollbar from './HorizontalScrollbar'
import VerticalScrollbar from './VerticalScrollbar'

export enum ScrollbarType {
  Vertical,
  Horizontal
}

interface IProps extends IScrollbarProps {
  type: ScrollbarType;
}

export default class Scrollbar extends React.PureComponent<IProps> {
  static defaultProps = {
    scrollbarColor: '#babac0',
    scrollbarSize: 8,
  }

  render () {
    switch (this.props.type) {
      case ScrollbarType.Horizontal:
        return <HorizontalScrollbar {...this.props} />
      case ScrollbarType.Vertical:
        return <VerticalScrollbar {...this.props} />
      default:
        throw new Error('Invalid scroll type param')
    }
  }
}