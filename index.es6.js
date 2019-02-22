// This file is part of antd-button-select
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.antd-button-select/blob/master/LICENSE

const {Component, createElement: h} = require('react')
const AntDButton = require('antd/lib/button').default


class ButtonSelect extends Component {
  constructor(props) {
    super(props)
    const {defaultSelected, multiple} = props

    if (!multiple && Array.isArray(defaultSelected)) {
      throw new Error('Set the multiple property to select more than one item.')
    }

    this.state = {
      selected: defaultSelected,
    }
  }

  handleClick = (value) => { // eslint-disable-line max-statements
    const {multiple, onChange} = this.props
    const {selected} = this.state
    let newSelected

    if (multiple) {
      if (selected.includes(value)) {
        newSelected = selected.filter((sValue) => sValue !== value)
      } else {
        newSelected = selected.concat(value).sort()
      }
    } else if (selected === value) {
      newSelected = null
    } else {
      newSelected = value
    }

    this.setState({selected: newSelected})
    onChange(newSelected)
  }

  render() {
    const {options, multiple} = this.props
    const {selected} = this.state

    let isSelected
    if (multiple) {
      isSelected = (value) => selected.includes(value)
    } else {
      isSelected = (value) => selected === value
    }

    return h(AntDButton.Group, {style: {whiteSpace: 'nowrap'}},
      ...options.map(([value, text]) => h(AntDButton, {
        type: isSelected(value) ? 'primary' : 'default',
        onClick: () => this.handleClick(value),
      }, text))
    )
  }
}
module.exports.ButtonSelect = ButtonSelect
