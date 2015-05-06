import React from 'react';

export default class Card extends React.Component {

  static propTypes = {
    value: React.PropTypes.number.isRequired,
    textValue: React.PropTypes.any
  };

  render() {
    let { value, textValue } = this.props;

    if (!textValue) {
      textValue = value;
    }

    const style = { width: `${value / 60 * 100}%` };

    return (
      <div className="card" {...this.props}>
        <div className="card__top">
          <div style={style} className="card__number">
            {textValue}
          </div>
        </div>

        <div className="card__logo">
          Rack-O
        </div>

        <div className="card__bottom">
          <div style={style} className="card__number">
            {textValue}
          </div>
        </div>
      </div>
    );
  }

}
