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

const getNewTouchPoint = (touches: TouchList | React.TouchList) => {
  let x = 0
  let y = 0
  for (let i = 0; i < touches.length; i++) {
    x += touches.item(i).screenX
    y += touches.item(i).screenY
  }
  x = Math.floor(x / touches.length)
  y = Math.floor(y / touches.length)
  return { x, y }
}

export default class ScrollableArea extends React.PureComponent<IProps> {
  static defaultProps = {
    fingersToScroll: 1,
  }

  private ref: React.RefObject<HTMLDivElement> = React.createRef()

  private _isScrolling: boolean = false
  private _deltaX: number = 0
  private _deltaY: number = 0

  private _touchX: number = 0
  private _touchY: number = 0
  private _scrollXSpeed: number = 0
  private _scrollYSpeed: number = 0
  private _inertionTimeout: number = null

  private _shiftKeyPressed: boolean = false

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.onTouchMove)
    window.removeEventListener('touchend', this.onTouchEnd)
  }

  onKeyDown = (event: React.KeyboardEvent) => {
    if (event.nativeEvent.code === 'Space') {
      this._deltaY = this.props.height
      this._immediateScroll()
    }
  }

  onTouchStart = (event: React.TouchEvent) => {
    event.preventDefault()
    const { touches } = event
    this._scrollXSpeed = this._scrollYSpeed = 0
    if (this.props.fingersToScroll === touches.length) {
      const { x, y } = getNewTouchPoint(touches)
      this._touchX = x
      this._touchY = y
      
      window.addEventListener('touchmove', this.onTouchMove)
      window.addEventListener('touchend', this.onTouchEnd)
    } else {
      this.onTouchEnd()
    }
  }

  onTouchMove = (event: TouchEvent) => {
    event.preventDefault()
    const { touches } = event
    const { x, y } = getNewTouchPoint(touches)
    this._scrollHandler({
      deltaX: this._touchX - x,
      deltaY: this._touchY - y,
    })
    this._touchX = x
    this._touchY = y
  }

  onTouchEnd = () => {
    window.removeEventListener('touchmove', this.onTouchMove)
    window.removeEventListener('touchend', this.onTouchEnd)
    const { scrollSpeed = 1 } = this.props
    // this._scrollXSpeed = 
  }

  onWheel = (event: React.WheelEvent) => {
    const { deltaX, deltaY } = event
    this._scrollHandler({ deltaX, deltaY })
  }

  private _scrollHandler = ({ deltaX, deltaY }: { deltaX: number, deltaY: number }) => {
    if (deltaX || deltaY) {
      this._deltaY += deltaY || 0
      this._deltaX += deltaX || 0
      if (!this._isScrolling) {
        this._scroll()
      }
    }
  }

  private _immediateScroll = () => {
    if (this._deltaY || this._deltaX) {
      let { height, fullHeight, width, fullWidth, scrollTop, scrollLeft, onScroll } = this.props
      if (fullHeight > height) {
        scrollTop = Math.min(Math.max(scrollTop + this._deltaY, 0), fullHeight - height - 1)
      }
      if (fullWidth > width) {
        scrollLeft = Math.min(Math.max(scrollLeft + this._deltaX, 0), fullWidth - width - 1)
      }
      this._deltaY = this._deltaX = 0
      onScroll({ scrollTop, scrollLeft })
    }
    this._isScrolling = false
  }

  private _scroll = () => requestAnimationFrame(this._immediateScroll)

  getScrollAreaStyle = (): React.CSSProperties => ({
    position: 'relative',
    height: `${this.props.height}px`,
    width: `${this.props.width}px`,
    overflow: 'hidden',
    touchAction: 'none',
    pointerEvents: 'unset',
  })

  getScrollContentStyle = (): React.CSSProperties => ({
    height: `${this.props.fullHeight}px`,
    width: `${this.props.fullWidth}px`,
    position: 'absolute',
    // transition: 'top 0.1s, left 0.1s',
    top: `${-this.props.scrollTop}px`,
    left: `${-this.props.scrollLeft}px`,
  })

  onHorizontalScroll = scrollLeft => {
    this._deltaX = this.props.scrollLeft - scrollLeft
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
    this._deltaY = this.props.scrollTop - scrollTop
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
        onTouchStart={this.onTouchStart}
        onWheel={this.onWheel}
        onKeyDown={this.onKeyDown}
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
