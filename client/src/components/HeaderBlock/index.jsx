import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../style/logo.png'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './style.css'
import { logoutUser } from "../../actions/authActions";

class HeaderBlock extends Component {

    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
    };

    render() {
		const { user } = this.props.auth
		if (this.props.auth.isAuthenticated)
			return (
				<header>
					<nav className="navbar">
					<a href="plan/list" className="nav-brand">
						<img src={logo} width="60" height="60" alt="Гринатом" />
					</a>
					<div className= "nav-collapse">						
						{ (user.role === "hr" && this.props.auth.isAuthenticated)? (
							<ul className="nav-ul">
								<li className="nav-li">
									<Link to="/plan/list" className="nav-link">
										Список планов
									</Link>
								</li>
							<li className="nav-li">
									<Link to="/plan/create" className="nav-link">
										Создать план
									</Link>
							</li>
							</ul>
							) : (
							<ul className="navbar-ul">
								<li className="nav-li">
									<Link to="/plan/list" className="nav-link">
										Список планов
									</Link>
								</li>
							</ul>
							)}
						<button className="nav-btn" onClick={this.onLogoutClick}>
							Выйти из системы
						</button>						
					</div>
					</nav>
				</header>
			)
		else
			return (
			<header>
					<nav id='header-block' className="navbar navbar-expand-md justify-content-center navbar-dark fixed-top bg-dark">
					<a href="plan/list" className="navbar-brand">
						<img src={logo} width="60" height="60" alt="Гринатом" />
					</a>
					</nav>
				</header>)

		
    }
}
HeaderBlock.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(
    mapStateToProps,
    { logoutUser }
  )(HeaderBlock);

