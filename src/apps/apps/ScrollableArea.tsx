import * as React from 'react'

import IControlledScrollableArea from '../IControlledScrollableArea'

import Scrollbar, { ScrollbarType } from './apps/Scrollbar'

enum ScrollDirectionType {
  Vertical,
  Horizontal
}

interface IProps extends IControlledScrollableArea {
  fullWidth: number;
  fullHeight: number;
}

interface IState {
  isScrollbarsShow: boolean;
}

export default class ScrollableArea extends React.PureComponent<IProps, IState> {
  ref: React.RefObject<HTMLDivElement> = React.createRef()

  isScrolling: boolean = false
  scrollDirectoion: ScrollDirectionType = null
  deltaX: number = 0
  deltaY: number = 0

  state = { isScrollbarsShow: false }

  turnScrollbarsOn = () => this.setState({ isScrollbarsShow: true })
  turnScrollbarsOff = () => this.setState({ isScrollbarsShow: false })

  onWheel = (event: React.WheelEvent) => {
    const { deltaX, deltaY } = event
    this.deltaY += deltaY
    this.deltaX += deltaX
    if (!this.isScrolling) {
      this._scroll()
    }
  }

  private _immediateScroll = () => {
    if (this.deltaY || this.deltaX) {
      let { height, fullHeight, width, fullWidth, scrollTop, scrollLeft, onScroll } = this.props
      if (fullHeight > height) {
        scrollTop = Math.min(Math.max(scrollTop + this.deltaY, 0), fullHeight - height - 1)
      }
      if (fullWidth > width) {
        scrollLeft = Math.min(Math.max(scrollLeft + this.deltaX, 0), fullWidth - width - 1)
      }
      this.deltaY = this.deltaX = 0
      onScroll({ scrollTop, scrollLeft })
    }
    this.isScrolling = false
  }

  private _scroll = () => requestAnimationFrame(this._immediateScroll)

  getScrollAreaStyle = (): React.CSSProperties => ({
    position: 'relative',
    height: `${this.props.height}px`,
    width: `${this.props.width}px`,
    overflow: 'hidden',
  })

  getScrollContentStyle = (): React.CSSProperties => ({
    height: `${this.props.fullHeight}px`,
    width: `${this.props.fullWidth}px`,
    position: 'absolute',
    top: `${-this.props.scrollTop}px`,
    left: `${-this.props.scrollLeft}px`,
  })

  onHorizontalScroll = scrollLeft => {
    this.deltaX = this.props.scrollLeft - scrollLeft
    this._immediateScroll()
  }

  getHorizontalScrollbar = () => {
    const {
      width, fullWidth,
      scrollLeft,
      scrollbarColor, horizontalScrollbarColor = scrollbarColor,
      scrollbarSize, horizontalScrollbarSize = scrollbarSize,
    } = this.props
    
    const showScrollbar = width < fullWidth
    return showScrollbar && (
      <Scrollbar
        type={ScrollbarType.Horizontal}
        visibleContentSize={width}
        fullContentSize={fullWidth}
        scrollPosition={scrollLeft}
        onScroll={this.onHorizontalScroll}
        scrollbarSize={horizontalScrollbarSize}
        scrollbarColor={horizontalScrollbarColor}
      />
    )
  }

  onVerticalScroll = scrollTop => {
    this.deltaY = this.props.scrollTop - scrollTop
    this._immediateScroll()
  }
  
  getVerticalScrollbar = () => {
    const {
      height, fullHeight,
      scrollTop,
      scrollbarColor, verticalScrollbarColor = scrollbarColor,
      scrollbarSize, verticalScrollbarSize = scrollbarSize,
    } = this.props
    const showScrollbar = (height < fullHeight)
    return showScrollbar && (
      <Scrollbar
        type={ScrollbarType.Vertical}
        visibleContentSize={height}
        fullContentSize={fullHeight}
        scrollPosition={scrollTop}
        onScroll={this.onVerticalScroll}
        scrollbarSize={verticalScrollbarSize}
        scrollbarColor={verticalScrollbarColor}
      />
    )
  }

  render () {
    return (
      <div
        role="scroll-area"
        ref={this.ref}
        style={this.getScrollAreaStyle()}
        onFocus={this.turnScrollbarsOn}
        onTouchStart={this.turnScrollbarsOn}
        onBlur={this.turnScrollbarsOff}
        onTouchEnd={this.turnScrollbarsOff}
        onWheel={this.onWheel}
      >
        <div
          role="scroll-content"
          style={this.getScrollContentStyle()}
        >
          {this.props.children}
        </div>
        {this.getHorizontalScrollbar()}
        {this.getVerticalScrollbar()}
      </div>
    )
  }
}
