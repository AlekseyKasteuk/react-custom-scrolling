import * as React from 'react'

import IControlledScrollableArea from '../IControlledScrollableArea'

import ScrollableArea from './ScrollableArea'

interface IState {
  width: number;
  height: number;
}

export default class AutoSizedScrollableArea extends React.PureComponent<IControlledScrollableArea, IState> {
  private _timeout: number = null
  ref: React.RefObject<HTMLDivElement> = React.createRef()
  state = { width: this.props.width, height: this.props.height }
  
  componentDidMount () {
    this._getSize()
  }

  private _timeoutHandler = () => {
    this._timeout = window.setTimeout(() => this._getSize(), 1000 / 60)
  }

  private _getSize = () => {
    const { offsetHeight: height = 0, offsetWidth: width = 0 } = this.ref.current
    if (this.state.height !== height || this.state.width !== width) {
      this.setState({ width, height }, () => this._timeoutHandler())
    } else {
      this._timeoutHandler()
    }
    
  }

  componentWillUnmount () {
    if (this._timeout !== null) {
      clearTimeout(this._timeout)
    }
  }

  render () {
    const { width, height } = this.state
    const { children, ...props } = this.props
    return (
      <ScrollableArea
        {...props}
        fullWidth={width}
        fullHeight={height}
      >
        <div
          role="scroll-wrapper"
          ref={this.ref}
        >
          {children}
        </div>
      </ScrollableArea>
    )
  }
}
