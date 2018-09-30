import React, { Component } from 'react';
import CassegrainDesenho from "../assets/imgs/j_23_06.gif";

export default class Cassegrain extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            d1: 152.5,
            f1: 457.2,
            dc: 3.99,
            e: 150,
            g: 4,
            f1d1: 0,
            f2d1: 0,
            f2: 0,
            p1: 0,
            p2: 0,
            d2: 0,
            r2: 0,
            tx: 0,
        }

        this.state = this.defaultState;
    }

    componentDidMount() {
        this.calculate();
    }

    cleaner = () => {
        this.setState({...this.defaultState}, () => this.calculate());
    }

    calculate = () => {       
        var f1d1 = Math.round(10 * this.state.f1 / this.state.d1) / 10;
        var f2d1 = Math.round((this.state.g * this.state.f1) / (this.state.d1));
        var f2   = Math.round(this.state.d1 * f2d1);
        var p1   = Math.round(10 * (this.state.f1 * 1 + this.state.e * 1) / (this.state.g * 1 + 1)) / 10;
        var p2   = Math.round(10 * this.state.g * p1) / 10;
        var d2   = Math.round(((this.state.d1 * p1) / (this.state.f1)) + this.state.dc * 1);
        var r2   = Math.round((2 * p1 * this.state.g) / (1 * this.state.g - 1));
        var tx   = Math.round(100 * d2 / this.state.d1) / 100;

        this.setState({
            f1d1: f1d1,
            f2d1: f2d1,
            f2: f2,
            p1: p1,
            p2: p2,
            d2: d2,
            r2: r2,
            tx: tx
        });
    }

    onChangeField = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        }, this.calculate);
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-12 col-xs-12 text-center">
                        <a href="http://www.observatorio-phoenix.org/j_tele/j_23.htm" target="_blank" rel="noopener noreferrer">
                            <img src={CassegrainDesenho} alt="" style={{maxWidth: "100%"}} />
                        </a>
                    </div>
                </div>
                <div className="row" style={{marginTop: '2rem'}}>
                    <div className="col-md-6 col-xs-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{borderTop: 'unset'}} colSpan="3" className="text-center">Parâmetros</th>
                                </tr>
                                <tr>
                                    <th className="col-md-8">Parâmetros</th>
                                    <th className="col-md-4">Dimensões</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Diâmetro do espelho primário; D1 (mm)</td>
                                    <td><input name="d1" value={this.state.d1} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Distância focal do primário; f1 (mm)</td>
                                    <td><input name="f1" value={this.state.f1} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Diâmetro do campo iluminado; d (mm)</td>
                                    <td><input name="dc" value={this.state.dc} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Afastamento do plano focal; e (mm)</td>
                                    <td><input name="e" value={this.state.e} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Valor de <b>g</b> (&gamma;)</td>
                                    <td><input name="g" value={this.state.g} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-danger col-md-3 col-xs-12" onClick={this.cleaner}>Limpar</button>
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{borderTop: 'unset'}} colSpan="3" className="text-center">Resultado</th>
                                </tr>
                                <tr>
                                    <th>Parâmetros</th>
                                    <th>Dimensões</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Relação focal do primário; f1 / D1</td>
                                    <td>{this.state.f1d1}</td>
                                </tr>
                                <tr>
                                    <td>Relação focal final; F / D1</td>
                                    <td>{this.state.f2d1}</td>
                                </tr>
                                <tr>
                                    <td>Distância focal final; F (mm)</td>
                                    <td>{this.state.f2}</td>
                                </tr>
                                <tr>
                                    <td>Dist. foco primário ao secundário; p (mm)</td>
                                    <td>{this.state.p1}</td>
                                </tr>
                                <tr>
                                    <td>Dist. secundário ao foco Cassegrain; p' (mm)</td>
                                    <td>{this.state.p2}</td>
                                </tr>
                                <tr>
                                    <td>Diâmetro do secundário; D2 (mm)</td>
                                    <td>{this.state.d2}</td>
                                </tr>
                                <tr>
                                    <td>Raio de curvatura do secundário; r2 (mm)</td>
                                    <td>{this.state.r2}</td>
                                </tr>
                                <tr>
                                    <td>Taxa de obstrução do secundário; Tx</td>
                                    <td>{this.state.tx}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}