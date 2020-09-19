import React, { Component } from 'react'
import api from '../api'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";

class UpdatePlan extends Component {
    updatePlan = event => {
        event.preventDefault()
        window.location.href = `/plan/update/${this.props.id}`
    }

    render() {
        return <button className="btn text-dark" onClick={this.updatePlan}>Редактировать</button>
    }
}

class ShowPlan extends Component {
    updatePlan = event => {
        event.preventDefault()
        window.location.href = `/plan/view/${this.props.id}`
    }

    render() {
        return <button className="btn text-dark" onClick={this.updatePlan}>Подробнее</button>
    }
}

class DeletePlan extends Component {
    deletePlan = event => {
        event.preventDefault()
        if (
            window.confirm(
                `Удалить план ${this.props.title}?`
            )
        ) {
            api.deletePlanById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <button className="btn text-dark" onClick={this.deletePlan}>Удалить</button>
    }
}

class PlansList extends Component {
    constructor(props) {
        super(props)
        this.state = {
			plans: [],
			users: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })        
        
        await api.getUsers().then(users => {
            this.setState({
                users: users.data.users,
                isLoading: false,
            })           
        })	

        await api.getAllPlans().then(plans => {
            plans.data.plans.map((plan) => {
                this.state.users.forEach(user => {
                    if (user._id === plan.worker){
                        plan.worker = user.fullName
                    }
                })   
            })
            this.setState({plans:plans.data.plans})
            this.setState({isLoading:false})
		})
        
    }
   

    render() {
        const { plans, isLoading } = this.state
        const {user} = this.props.auth
        let showCards = true
        return (
          <div className="container">
            {plans.length ? (
                <div className="fullDb">
                {plans.map( plan => (
                    <div className="my-card" key={plan._id}>
                        <div className="my-card-header text-white">
                            <div className="text-left">
                            {plan.title}
                            </div>
                            <div className="text-right">
                            {plan.worker}
                            </div>
                        </div>
                        <div className="card-body">
                        <p className="card-text">{plan.description}</p>
                        <p className="card-text">{plan.endDate}</p>
                        {user.role === 'hr' ?
                        (
                        <div>
                            <ShowPlan id={plan._id}/>
                            <UpdatePlan id={plan._id}/>
                            <DeletePlan id={plan._id} title={plan.title} />
                        </div>
                        )
                        :(
                            <div>
                            <ShowPlan id={plan._id}/>
                            </div>
                        )}
                        </div>
                        <div className="my-card-footer text-white">
                        {plan.planState}
                        </div>
                    </div>
                ))}
                </div>
            ):(
                <div className="emptyDb">
                    {user.role ==='hr' ? (
                        <div className="hr">
                        <h2>База данных пуста</h2>
                        <button className="btn text-white" href="plan/create">Создать план!</button>
                        </div>
                    ):
                    (
                        <h2>Планов нет</h2>
                    )}
                    
                </div>
            )
            }               
          </div>
        )
    }
}
PlansList.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(
    mapStateToProps,
    { logoutUser }
  )(PlansList);

