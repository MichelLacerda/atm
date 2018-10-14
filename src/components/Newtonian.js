import React, { Component } from 'react';
import CassegrainDesenho from "../assets/imgs/j_23_06.gif";
import { round, radians } from './Utils';


export default class Cassegrain extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {};

        this.state = this.defaultState;
    }

    componentDidMount() {
        this.calculate();
    }

    cleaner = () => {
        this.setState({ ...this.defaultState }, () => this.calculate());
    }

    calculate = () => {
    }

    onChangeField = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    onChangeTelescopeType = (e) => {
        this.setState({
            type: parseInt(e.target.value)
        });
        e.preventDefault();
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12 col-xs-12 text-center">
                        <a href="http://www.observatorio-phoenix.org/j_tele/j_23.htm" target="_blank" rel="noopener noreferrer">
                            <img src={CassegrainDesenho} alt="" style={{ maxWidth: "100%" }} />
                        </a>
                    </div>
                </div>
                <div className="row" style={{ marginTop: '2rem' }}>
                    <div className="col-md-6 col-xs-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ borderTop: 'unset' }} colSpan="3" className="text-center">Parâmetros</th>
                                </tr>
                                <tr>
                                    <th>Parâmetros</th>
                                    <th>Dimensões</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td><input name="D1" value={this.state.D1} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-primary btn-block" onClick={this.calculate}>Calcular</button>
                        <button className="btn btn-danger btn-block" onClick={this.cleaner}>Limpar</button>
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ borderTop: 'unset' }} colSpan="3" className="text-center">Resultado</th>
                                </tr>
                                <tr>
                                    <th>Parâmetros</th>
                                    <th>Dimensões</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}