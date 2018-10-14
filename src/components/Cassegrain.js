import React, { Component } from 'react';
import CassegrainDesenho from "../assets/imgs/j_23_06.gif";
import { round, radians, sagittaOfArc} from './Utils';


export default class Cassegrain extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            // Input
            D1: 152.4,
            FD1: 2.5,
            U: 0.5,
            type: 3,
            G: 4.8,
            e: 200,
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
        const { D1, FD1, U, type, G, e } = this.state;
        if (D1 && FD1 && U && G && e) {
            var F1 = D1 * FD1;
            var U1 = radians(U);
            var F = F1 * G;
            var p = (F1 + e) / (G + 1);
            var r1 = F1 * 2;
            var r2 = (2 * p * G) / (G - 1);
            var p1 = p * G;
            var D = F1 - p;
            var FD = F / D1;
            var i = F * Math.tan(U1);
            var D2 = ((D1 * p) / F1) + ((D * i) / (F1 * G));
            var TX = D2 / D1;
            var TXp = round(TX * 100, 1);
            var Sag1 = sagittaOfArc(r1, D1 / 2);
            var Sag2 = sagittaOfArc(r2, D2 / 2);
            var LimD = 115.8 / D1;

            var b3 = ((G + 1) / (G - 1)) ** 2; // Alpha
            var b2 = -Math.abs(b3);
            var b1 = -1;

            if (type === 0 || type === 1) {
                // Cassegrain / Gregorian
                var G_ABS = (type === 1) ? -Math.abs(G) : G;
                var alpha = ((G_ABS + 1) / (G_ABS - 1)) ** 2;

                if (type === 0) alpha = -Math.abs(alpha);
                // B1 = B1;
                b2 = alpha;
            }
            else if (type === 2) {
                // Ritchey-Chretien
                b1 = -(p * 2 / (D * G * G) + 1);
                b2 = -(G * r1 / (D * (G - 1) ** 3) + b3);
            }
            else if (type === 3) {
                // Dall-Kirkham
                b1 = -Math.abs(1 - r2 / r1 * (G ** 2 - 1) ** 2 / G ** 4);
                b2 = 0;
            }
            else if (type === 4) {
                // Pressmann-Camichel
                b1 = 0;
                b2 = r1 / r2 * (G / (G - 1)) ** 4 - b3;
            }

            var omega = D1 / F;
            var teta = U1 / 2;

            // Astigmatismo
            var A = G * (((2 * D - G * r1) / (G ** 2 * (2 * D - r1))) - (D / (2 * D - r1)) ** 2 * (1 + b1));
            var A2 = omega * teta * teta * A * 103132;

            // Coma
            var B = (G ** 2 / 2) * ((1 / G ** 2) - (1 + b1) * (D / (2 * D - r1)));
            var B2 = B * teta * omega ** 2 * 77349;

            // Petzval
            var P = G * (1 + ((r1 * (G - 1)) / (G * (2 * D - r1))));

            // Curvatura do Campo
            var C = P - 2 * A;

            // Raio de curvatura do campo
            var CR = F / C;

            this.setState({
                F1: round(F1, 2),
                F: round(F, 2),
                p: round(p, 2),
                r1: round(r1, 3),
                r2: round(r2, 2),
                p1: round(p1, 2),
                D: round(D, 2),
                FD: round(FD, 2),
                i: round(i, 2),
                D2: round(D2, 2),
                TX: TX,
                TXp: TXp,
                b1: round(b1),
                b2: round(b2),
                A: round(A),
                A2: round(A2),
                B: round(B),
                B2: round(B2),
                P: round(P),
                C: round(C),
                CR: round(CR),
                Sag1: round(Sag1),
                Sag2: round(Sag2),
                LimD: round(LimD)
            });
        }
    }

    onChangeField = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: parseFloat(value) //value.replace(/,/g, '.')
        }, this.calculate);
    }

    onChangeTelescopeType = (e) => {
        this.setState({
            type: parseInt(e.target.value)
        }, this.calculate);
        e.preventDefault();
    }

    setClassObstructionRate(tx) {
        if (tx <= 0.3) {
            return '';
        } 
        else if (tx > 0.3 && tx < 0.35) {
            return 'table-warning';
        }
        else if (tx > 0.35) {
            return 'table-danger';
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-6 col-xs-12 text-center">
                        <a href="http://www.observatorio-phoenix.org/j_tele/j_23.htm" target="_blank" rel="noopener noreferrer">
                            <img src={CassegrainDesenho} alt="" style={{ maxWidth: "100%" }} />
                        </a>
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th style={{ borderTop: 'unset' }} colSpan="3" className="text-center">Configuração</th>
                                </tr>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Parâmetros</th>
                                    <th>Entrada</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Diâmetro do primário</td>
                                    <td>D1</td>
                                    <td><input type="number" step="0.1" name="D1" value={this.state.D1} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Razão focal do primário</td>
                                    <td>f1/D1</td>
                                    <td><input type="number" step="0.1" name="FD1" value={this.state.FD1} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Campo iluminado em graus</td>
                                    <td>U</td>
                                    <td><input type="number" step="0.1" name="U" value={this.state.U} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Distância entre o primário e o foco do sistema (e)</td>
                                    <td>e</td>
                                    <td><input type="number" step="0.1" name="e" value={this.state.e} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Fator de amplicação</td>
                                    <td>ɣ (G)</td>
                                    <td><input type="number" step="0.1" name="G" value={this.state.G} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Tipo</td>
                                    <td>---</td>
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
                        {/* <button className="btn btn-primary btn-block" onClick={this.calculate}>Calcular</button> */}
                        <button className="btn btn-danger btn-block" onClick={this.cleaner}>Limpar</button>
                    </div>
                </div>
                {/* <p>The late Harry Miller (Orange County Astronomers) used to say: "Cassegrains are a baffling problem."</p> */}
                <div className="row" style={{ marginTop: '2rem' }}>

                    <div className="col-md-12 col-xs-12">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th style={{ borderTop: 'unset' }} colSpan="3" className="text-center">Resultado</th>
                                </tr>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Parâmetros</th>
                                    <th>Resultado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Distância focal do primário</td>
                                    <td>f1</td>
                                    <td>{this.state.F1}</td>
                                </tr>
                                <tr>
                                    <td>Distância focal do sistema</td>
                                    <td>F</td>
                                    <td>{this.state.F}</td>
                                </tr>
                                <tr>
                                    <td>Distância do secundário ao foco do primário</td>
                                    <td>p</td>
                                    <td>{this.state.p}</td>
                                </tr>
                                <tr>
                                    <td>Raio de curvatura do primário</td>
                                    <td>r1</td>
                                    <td>{this.state.r1}</td>
                                </tr>
                                <tr>
                                    <td>Raio de curvatura do secundário</td>
                                    <td>r2</td>
                                    <td>{this.state.r2}</td>
                                </tr>
                                <tr>
                                    <td>Distância entre o secundário e o foco do sistema</td>
                                    <td>p'</td>
                                    <td>{this.state.p1}</td>
                                </tr>
                                <tr>
                                    <td>Distância entre o primário e secundário</td>
                                    <td>d</td>
                                    <td>{this.state.D}</td>
                                </tr>
                                <tr>
                                    <td>Relação focal do sistema</td>
                                    <td>F/D1</td>
                                    <td>{this.state.FD}</td>
                                </tr>
                                <tr>
                                    <td>Diâmetro do campo</td>
                                    <td>i</td>
                                    <td>{this.state.i}</td>
                                </tr>
                                <tr>
                                    <td>Diâmetro do secundário</td>
                                    <td>D2</td>
                                    <td>{this.state.D2}</td>
                                </tr>

                                <tr>
                                    <td>Flecha (sagitta) do primário</td>
                                    <td>Sag1</td>
                                    <td>{this.state.Sag1}</td>
                                </tr>
                                <tr>
                                    <td>Flecha (sagitta) do secundário</td>
                                    <td>Sag2</td>
                                    <td>{this.state.Sag2}</td>
                                </tr>
                                <tr>
                                    <td>Límite de Dawes</td>
                                    <td>LimD</td>
                                    <td>{this.state.LimD}</td>
                                </tr>
                                <tr className={this.setClassObstructionRate(this.state.TX)}>
                                    <td>Taxa de obstrução do secundário</td>
                                    <td>{"Tx <= 30%" }</td>
                                    <td>{this.state.TXp}%</td>
                                </tr>
                                <tr>
                                    <th colSpan="3" className="text-center">Índice de deformação</th>
                                </tr>

                                <tr >
                                    <td>Primário</td>
                                    <td>b1</td>
                                    <td>{this.state.b1}</td>
                                </tr>
                                <tr >
                                    <td>Secundário</td>
                                    <td>b2</td>
                                    <td>{this.state.b2}</td>
                                </tr>

                                <tr>
                                    <th colSpan="3" className="text-center">Coeficientes de Schwarzschild</th>
                                </tr>

                                <tr>
                                    <td>Astigmatismo</td>
                                    <td>A</td>
                                    <td>{this.state.A}</td>
                                </tr>
                                <tr>
                                    <td>Astigmatismo em Arco de Segundo</td>
                                    <td>A''</td>
                                    <td>{this.state.A2}</td>
                                </tr>
                                <tr>
                                    <td>Coma</td>
                                    <td>B</td>
                                    <td>{this.state.B}</td>
                                </tr>
                                <tr>
                                    <td>Coma em Arco de Segundo</td>
                                    <td>B''</td>
                                    <td>{this.state.B2}</td>
                                </tr>
                                <tr >
                                    <td>Curvatura de Petzval</td>
                                    <td>P</td>
                                    <td>{this.state.P}</td>
                                </tr>
                                <tr >
                                    <td>Curvatura do Campo</td>
                                    <td>C</td>
                                    <td>{this.state.C}</td>
                                </tr>
                                <tr >
                                    <td>Raio de curvatura do campo</td>
                                    <td>CR</td>
                                    <td>{this.state.CR}</td>
                                </tr>

                                <tr >
                                    <td></td>
                                    <td></td>
                                    <td>{this.state.NULL}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}