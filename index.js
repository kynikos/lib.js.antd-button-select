'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This file is part of antd-button-select
// Copyright (C) 2018-present Dario Giovannetti <dev@dariogiovannetti.net>
// Licensed under MIT
// https://github.com/kynikos/lib.js.antd-button-select/blob/master/LICENSE

var _require = require('react'),
    Component = _require.Component,
    h = _require.createElement;

var AntDButton = require('antd/lib/button').default;

var ButtonSelect = function (_Component) {
  _inherits(ButtonSelect, _Component);

  function ButtonSelect(props) {
    _classCallCheck(this, ButtonSelect);

    var _this = _possibleConstructorReturn(this, (ButtonSelect.__proto__ || Object.getPrototypeOf(ButtonSelect)).call(this, props));

    _initialiseProps.call(_this);

    var defaultSelected = props.defaultSelected,
        multiple = props.multiple;


    if (!multiple && Array.isArray(defaultSelected)) {
      throw new Error('Set the multiple property to select more than one item.');
    }

    _this.state = {
      selected: defaultSelected
    };
    return _this;
  }

  _createClass(ButtonSelect, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          multiple = _props.multiple;
      var selected = this.state.selected;


      var isSelected = void 0;
      if (multiple) {
        isSelected = function isSelected(value) {
          return selected.includes(value);
        };
      } else {
        isSelected = function isSelected(value) {
          return selected === value;
        };
      }

      return h.apply(undefined, [AntDButton.Group, { style: { whiteSpace: 'nowrap' } }].concat(_toConsumableArray(options.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            value = _ref2[0],
            text = _ref2[1];

        return h(AntDButton, {
          type: isSelected(value) ? 'primary' : 'default',
          onClick: function onClick() {
            return _this2.handleClick(value);
          }
        }, text);
      }))));
    }
  }]);

  return ButtonSelect;
}(Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.handleClick = function (value) {
    // eslint-disable-line max-statements
    var _props2 = _this3.props,
        multiple = _props2.multiple,
        onChange = _props2.onChange;
    var selected = _this3.state.selected;

    var newSelected = void 0;

    if (multiple) {
      if (selected.includes(value)) {
        newSelected = selected.filter(function (sValue) {
          return sValue !== value;
        });
      } else {
        newSelected = selected.concat(value).sort();
      }
    } else if (selected === value) {
      newSelected = null;
    } else {
      newSelected = value;
    }

    _this3.setState({ selected: newSelected });
    onChange(newSelected);
  };
};

module.exports.ButtonSelect = ButtonSelect;
