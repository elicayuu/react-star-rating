import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

class StarRating extends React.Component {

  static propTypes = {
    /** Set star icon number */
    totalStars: PropTypes.number,
    /** Click star icon will trigger this function */
    onRatingChange: PropTypes.func,
    /** When star icon clicked, this name will be passed to onRatingChange function */
    name: PropTypes.string,
    /** Set the default rating status */
    rating: PropTypes.number,
    /** Change star icon size */
    size: PropTypes.number,
    /** Disable click event and cursor style */
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    totalStars: 5,
    rating: 0,
  }

  constructor() {
    super();
    this.state = {
      hover: 0,
      selected: 0,
    };
  }

  onMouseEnter(index) {
    if (this.props.disabled) return;
    this.setState({ hover: index });
  }

  onMouseLeave() {
    this.setState({ hover: 0 });
  }

  onClick(event, data) {
    const { onRatingChange } = this.props;

    this.setState({ selected: data.rating });
    if (typeof onRatingChange === 'function') {
      onRatingChange(event, data);
    }
  }

  render() {
    const { name, totalStars, size, rating = 0, disabled, className } = this.props;
    const { hover, selected } = this.state;
    const classString = disabled
      ? `${className} StarRating StarRating--disabled`
      : `${className} StarRating`;
    const currentRating = selected ? selected : rating;

    return (
      <div className={classString}>
        {Array.from({ length: totalStars }).map((star, i) => {
          let starClass = 'StarRating__star';
          const ratingIndex = i + 1;
          if (ratingIndex <= currentRating && !hover) starClass += ' StarRating__star--active';
          if (hover && ratingIndex <= hover) starClass += ' StarRating__star--active';
          if (ratingIndex === selected) starClass += ' StarRating__star--selected';

          return <span
            name={name}
            className={starClass}
            onClick={(event) => !disabled && this.onClick(event, { name, rating: ratingIndex })}
            onMouseEnter={() => this.onMouseEnter(ratingIndex)}
            onMouseLeave={() => this.onMouseLeave()}
            key={i}>
            {startIcon}
          </span>;
        })}
      </div>
    );
  }
}

const startIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const selectedKeyframe = keyframes`
  from {
		transform: scale(1);
		fill: #ffc955;
	}
	to {
		transform: scale(1.5);
		fill: #ffda66;
	}
`;

const StyledStarRating = styled(StarRating) `
  .StarRating__star {
    display: inline-block;
    width: ${props => props.size || 24}px;
    height: ${props => props.size || 24}px;
    fill: #ddd;
    cursor: pointer;
    transform: scale(1);
  }
  .StarRating__star--active {
    fill: #ffc955;
  }
  .StarRating__star > svg {
    display: block;
    width: 100%;
    height: auto;
  }
  .StarRating__star--selected {
    animation: 0.3s ease-out 0s 1 alternate ${selectedKeyframe};
  }
  &.StarRating--disabled .StarRating__star {
    cursor: default;
  }
`;

export default StyledStarRating;
