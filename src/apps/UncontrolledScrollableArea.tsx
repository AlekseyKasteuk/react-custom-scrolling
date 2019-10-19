import * as React from 'react'

import IScrollableAreaWrapper from '../IScrollableAreaWrapper'

import ControlledScrollableArea from './ControlledScrollableArea'

interface IState {
  scrollTop: number;
  scrollLeft: number;
}

export default class UncontrolledScrollableArea extends React.PureComponent<IScrollableAreaWrapper, IState> {
  state = { scrollTop: 0, scrollLeft: 0 }

  onScroll = ({ scrollTop, scrollLeft }: { scrollTop: number, scrollLeft: number }) => this.setState({ scrollTop, scrollLeft })

  render () {
    const { scrollTop, scrollLeft } = this.state
    return (
      <ControlledScrollableArea
        {...this.props}
        scrollTop={scrollTop}
        scrollLeft={scrollLeft}
        onScroll={this.onScroll}
      />
    )
  }
}