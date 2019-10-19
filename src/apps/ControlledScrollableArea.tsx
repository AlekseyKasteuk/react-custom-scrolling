import * as React from 'react'

import IControlledScrollableArea from './IControlledScrollableArea'

import ScrollableArea from './apps/ScrollableArea'
import AutoSizedScrollableArea from './apps/AutoSizedScrollableArea'

const ControlledScrollableArea: React.SFC<IControlledScrollableArea> = (props) => {
  const { fullHeight, fullWidth } = props
  if (fullHeight === undefined || fullWidth === undefined) {
    return (<AutoSizedScrollableArea {...props} />)
  }
  return (<ScrollableArea {...props} fullHeight={fullHeight || 0} fullWidth={fullWidth || 0} />)
}

export default ControlledScrollableArea
