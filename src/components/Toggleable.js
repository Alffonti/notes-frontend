import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggleable = forwardRef((props, refs) => {
  const [visible, setvisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setvisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="toggleableContent">
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Toggleable.displayName = 'Toggleable'

export default Toggleable
