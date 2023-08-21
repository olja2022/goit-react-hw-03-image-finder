import { Component } from 'react';
import { toast } from 'react-toastify';
import { FiSearch } from 'react-icons/fi';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    requestValue: '',
  };

  handleRequestChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value.toLowerCase() });
  };

  handleRequestSubmit = e => {
    e.preventDefault();
    const { requestValue } = this.state;

    if (requestValue.trim() === '') {
      toast.error('Введіть хоч щось...');
      return;
    }

    this.props.onSubmit(requestValue.trim());
    this.setState({ requestValue: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleRequestSubmit}>
          <button type="submit" className="SearchForm-button">
            {}
            <FiSearch className="SearchForm-button-icon" />
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="requestValue"
            value={this.state.requestValue}
            onChange={this.handleRequestChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
