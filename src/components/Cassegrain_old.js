import React, { Component } from 'react';
import CassegrainDesenho from "../assets/imgs/j_23_06.gif";

import { round, sagittaOfArc } from "./Utils";

export default class Cassegrain extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            d1: 152.4,
            f1: 381, // 457.2,
            dc: 3.33,   // 3.99,
            e: 200,     // 150,
            g: 4.8,     // 4,
            alpha: 0,
            beta: 0,
            gama: 0,
            delta: 0,
            epsilon: 0,
            f1d1: 0,
            f2d1: 0,
            type: 3,
            f2: 0,
            p1: 0,
            p2: 0,
            d2: 0,
            r2: 0,
            tx: 0,
            s1: 0,
            s2: 0,
            E1: 0,
            E2: 0,
            S1: 0,
            S2: 0,
            S3: 0,
        }

        this.state = this.defaultState;
    }

    componentDidMount() {
        this.calculate();
    }

    cleaner = () => {
        this.setState({ ...this.defaultState }, () => this.calculate());
    }

    calculate = () => {
        const { g, f1, d1, e, dc, type } = this.state;
        var f1d1 = round(f1 / d1, 1);
        var f2d1 = round((g * f1) / (d1));
        var f2 = round(d1 * f2d1);
        var p1 = round((f1 * 1 + e * 1) / (g * 1 + 1), 1);
        var p2 = round(g * p1, 1);
        var d2 = round(((d1 * p1) / (f1)) + dc * 1);
        var r2 = round((2 * p1 * g) / (1 * g - 1));
        var tx = round(d2 / d1, 2);
        var s1 = sagittaOfArc(f1 * 2, d1 / 2);
        var s2 = sagittaOfArc(p2 * 2, d2 / 2);

        var vm = (type === 1) ? -Math.abs(f2 / f1) : f2 / f1;
        var ve = e / f1;
        var vr = (vm - ve) / (vm + 1);

        var alpha = ((vm + 1) / (vm - 1)) ** 2;
        var beta = (vm - 1) ** 2 * (vm - 1) * (1 - vr) / (vm * vm * vm);
        var gama = (vm - 1) ** 2 * (vm - 1) * vr / (vm * vm * vm);
        var delta = 2 / (vm ** 2);
        var epsilon = 4 * (vm - vr) / (vm ** 2 * (1 - vr));
        var ni = (vm - 1) ** 2 * (vm - 1) * vr ** 2 / (vm * vm * vm * (1 - vr));

        var E1;
        var E2;

        if (type === 0 || type === 1) {
            // Cassegrain and Gregorian
            E1 = 1;
            E2 = alpha;
        }
        else if (type === 2) {
            // Ritchey-Chretien
            E1 = 1 + (beta * delta / gama);
            E2 = alpha + (delta / gama);
        }
        else if (type === 3) {
            // Dall-Kirkham
            E1 = 1 - alpha * beta;
            E2 = 0;
        }
        else if (type === 4) {
            // Pressmann-Camichel
            E1 = 0;
            E2 = alpha - (1 / beta);
        }

        var S1 = 1 - E1 - beta * (alpha - E2);
        var S2 = delta + gama * (alpha - E2);
        var S3 = epsilon - ni * (alpha - E2);

        this.setState({
            f1d1: f1d1,
            f2d1: f2d1,
            f2: f2,
            p1: p1,
            p2: p2,
            d2: d2,
            r2: r2,
            tx: tx,
            s1: s1,
            s2: s2,
            E1: round(E1, 3),
            E2: round(E2, 3),
            S1: round(S1, 3),
            S2: round(S2, 3),
            S3: round(S3, 3),
        });
    }

    onChangeField = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value.replace(/,/g, '.')
        }, this.calculate);
    }

    onChangeTelescopeType = (e) => {
        this.setState({
            type: parseInt(e.target.value)
        }, this.calculate)
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
                                    <td>Valor de <b>g</b> (ɣ)</td>
                                    <td><input name="g" value={this.state.g} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Tipo</td>
                                    <td>
                                        <select className="form-control" value={this.state.type} onChange={this.onChangeTelescopeType}>
                                            <option value="0">Cassegrain</option>
                                            <option value="1">Gregorian</option>
                                            <option value="2">Ritchey-Chretien</option>
                                            <option value="3">Dall-Kirkham</option>
                                            <option value="4">Pressmann-Camichel</option>
                                        </select>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-danger col-md-3 col-xs-12" onClick={this.cleaner}>Limpar</button>
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
                                <tr className={(this.state.tx > 0.3) ? 'table-danger' : ''}>
                                    <td>Taxa de obstrução do secundário; Tx</td>
                                    <td>{this.state.tx}</td>
                                </tr>
                                <tr>
                                    <td>Sagitta; S1 (mm)</td>
                                    <td>{this.state.s1}</td>
                                </tr>
                                <tr>
                                    <td>Excentricidade do Espelho Primário</td>
                                    <td>{this.state.E1}</td>
                                </tr>
                                <tr>
                                    <td>Excentricidade do Espelho Secundário</td>
                                    <td>{this.state.E2}</td>
                                </tr>
                                <tr>
                                    <td>Coeficiente de Aberração Esférica</td>
                                    <td>{this.state.S1}</td>
                                </tr>
                                <tr>
                                    <td>Coeficiente de Coma</td>
                                    <td>{this.state.S2}</td>
                                </tr>
                                <tr>
                                    <td>Coeficiente de Astigmatismo</td>
                                    <td>{this.state.S3}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}