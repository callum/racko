import React from 'react';

class Card extends React.Component {

  static propTypes = {
    value: React.PropTypes.number.isRequired
  };

  render() {
    const { value } = this.props;

    const style = { width: `${value / 60 * 100}%` };

    return (
      <div className="card" {...this.props}>
        <div className="card__top">
          <div style={style} className="card__number">
            {value}
          </div>
        </div>

        <div className="card__logo">
          Rack-O
        </div>

        <div className="card__bottom">
          <div style={style} className="card__number">
            {value}
          </div>
        </div>
      </div>
    );
  }

}

export default Card;
