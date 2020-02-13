// This file is part of antd-button-select
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.antd-button-select/blob/master/LICENSE

import {createElement as h, useState} from 'react'
import AntDButton from 'antd/lib/button'


function handleClick({value, multiple, onChange, selected, setSelected}) {
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

  setSelected(newSelected)
  onChange(newSelected)
}


export function ButtonSelect({defaultSelected, options, multiple, size}) {
  if (!multiple && Array.isArray(defaultSelected)) {
    throw new Error('Set the multiple property to select more than one item.')
  }

  const [selected, setSelected] = useState(defaultSelected)

  let isSelected
  if (multiple) {
    isSelected = (value) => selected.includes(value)
  } else {
    isSelected = (value) => selected === value
  }

  return h(AntDButton.Group, {size, style: {whiteSpace: 'nowrap'}},
    ...options.map(([value, text]) => h(AntDButton, {
      type: isSelected(value) ? 'primary' : 'default',
      onClick: () => handleClick({
        value,
        multiple,
        onChange,
        selected,
        setSelected,
      }),
    }, text))
  )
}
