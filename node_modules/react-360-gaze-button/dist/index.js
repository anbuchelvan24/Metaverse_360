"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _react3 = require("react-360");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GazeButton = function (_React$Component) {
  _inherits(GazeButton, _React$Component);

  function GazeButton() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GazeButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GazeButton.__proto__ || Object.getPrototypeOf(GazeButton)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      remainingTime: _this.props.duration || 1000,
      isGazed: false,
      gazeTimestamp: null
    }, _this.handleEnter = function () {
      var onEnter = _this.props.onEnter;

      if (onEnter) {
        onEnter();
      }
      _this.setState(function () {
        return {
          isGazed: true
        };
      }, function () {
        window.requestAnimationFrame(_this.step);
      });
    }, _this.handleExit = function () {
      var _this$props = _this.props,
          duration = _this$props.duration,
          onExit = _this$props.onExit;

      _this.setState(function () {
        return { isGazed: false, remainingTime: duration, gazeTimestamp: null };
      }, function () {
        if (onExit) {
          onExit();
        }
      });
    }, _this.handleClick = function () {
      var onClick = _this.props.onClick;

      _this.setState(function () {
        return { isGazed: false, remainingTime: 0, gazeTimestamp: null };
      }, function () {
        onClick();
      });
    }, _this.step = function (timestamp) {
      var duration = _this.props.duration;
      var _this$state = _this.state,
          isGazed = _this$state.isGazed,
          gazeTimestamp = _this$state.gazeTimestamp;

      if (isGazed && !gazeTimestamp) {
        _this.setState(function (state) {
          return _extends({}, state, { gazeTimestamp: timestamp });
        });
      }
      // at first step, remaining time equals to duration. No need to get gazeTimestamp from state
      var remainingTime = gazeTimestamp ? duration + gazeTimestamp - timestamp : duration;
      if (isGazed) {
        if (remainingTime >= 0) {
          _this.setState(function () {
            return { remainingTime: remainingTime };
          }, function () {
            window.requestAnimationFrame(_this.step);
          });
        } else {
          _this.setState(function () {
            remainingTime: 0;
          }, function () {
            _this.handleClick();
          });
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GazeButton, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          onClick = _props.onClick,
          render = _props.render,
          children = _props.children,
          props = _objectWithoutProperties(_props, ["onClick", "render", "children"]);

      var _state = this.state,
          remainingTime = _state.remainingTime,
          isGazed = _state.isGazed,
          gazeTimestamp = _state.gazeTimestamp;

      return _react2.default.createElement(
        _react3.VrButton,
        _extends({}, props, {
          onEnter: this.handleEnter,
          onExit: this.handleExit,
          onClick: this.handleClick
        }),
        render ? render(remainingTime, isGazed, gazeTimestamp) : null,
        typeof children === "function" ? children(remainingTime, isGazed, gazeTimestamp) : null
      );
    }
  }]);

  return GazeButton;
}(_react2.default.Component);

exports.default = GazeButton;