import React, { Component } from 'react';
import CassegrainDesenho from "../assets/imgs/j_23_06.gif";
import { round, radians } from './Utils';


export default class Cassegrain extends Component {
    constructor(props) {
        super(props);

        this.defaultState = {
            // Input
            D1: 152.4,
            F1: 381,
            U: 0.5,
            type: 3,
            G1: 4.8,
            E: 200,
            /* D1: 12,
            F1: 36,
            U: 2,
            type: 3,
            G1: 3,
            E: 8, */
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
        const { D1, F1, U, G1, E, type } = this.state;

        var F1D1 = F1 / D1;
        var U1 = radians(U);
        var F = G1 * F1;
        var F2 = F / D1;
        var P = (F1 + E) / (G1 + 1);
        var P2 = P * G1;
        var D = F1 - P;
        var R1 = F1 * 2;
        var H = D1 / 2;
        var R2 = P2 * 2 / (G1 - 1);

        var B3 = ((G1 + 1) / (G1 - 1)) ** 2; // Alpha
        var B2 = -Math.abs(B3);
        var B1 = -1;

        if (type === 0 || type === 1) {
            // Cassegrain / Gregorian
            var G1_ABS = (type === 1) ? -Math.abs(G1) : G1;
            var alpha = ((G1_ABS + 1) / (G1_ABS - 1)) ** 2;

            // B1 = B1;
            B2 = alpha;
        }
        else if (type === 2) {
            // Ritchey-Chretien
            B1 = -(P * 2 / (D * G1 * G1) + 1);
            B2 = -(G1 * R1 / (D * (G1 - 1) ** 3) + B3);
        }
        else if (type === 3) {
            // Dall-Kirkham
            B1 = 1 - R2 / R1 * (G1 * G1 - 1) ** 2 / G1 ** 4;
            B1 = -Math.abs(B1);
            B2 = 0;
        }
        else if (type === 4) {
            // Pressmann-Camichel
            B1 = 0;
            B2 = R1 / R2 * (G1 / (G1 - 1)) ** 4 - B3;
        }

        var D3 = P * D1 / F1;
        var D2 = D3 + D * U1;
        var H2 = D2 / 2;
        var E1 = ((B1 / 32) * (H ** 4)) / (R1 ** 3);
        var E2 = B2 / 32 * H2 ** 4 / R2 ** 3;
        var P3 = B1 * H ** 3 / (R1 ** 3 * 4);
        var P4 = B2 / 4 * H2 ** 3 / R2 ** 3;
        var B = (G1 * G1) / 2 * (1 / (G1 * G1) - (1 + B1) * D / (D * 2 - R1));
        var A1 = G1 * ((D * 2 - G1 * R1) / (G1 * G1 * (D * 2 - R1)) - ((D / (D * 2 - R1)) ** 2) * (B1 + 1));
        var P1 = G1 * (1 + R1 * (G1 - 1) / (G1 * (D * 2 - R1)));
        var C = P1 - 2 * A1;
        var C3 = F / C;
        var O1 = D1 / F;
        var U2 = U1 / 2;
        var C2 = B * U2 * O1 * O1 * 77349;
        var A2 = A1 * U2 * U2 * O1 * 103132;
        var TX = D2 / D1;
        var LD = 115.8 / D1;


        this.setState({
            F1D1: round(F1D1),
            F2: round(F2),
            F: round(F),
            P: round(P),
            D: round(D),
            P2: round(P2),
            R1: round(R1),
            R2: round(R2),
            D3: round(D3),
            D2: round(D2),
            B: B,
            A1: A1,
            P1: P1,
            C: C,
            C2: C2,
            A2: round(A2, 3),
            C3: round(C3),
            B1: round(B1),
            B2: round(B2),
            U1: U1,
            TX: round(TX),
            LD: round(LD),
            E1:E1,
            E2:E2,
            P3:P3,
            P4:P4,
        });
        /* console.log('---------------------');
        console.log(' B:', round(B, 3));
        console.log('A1:', round(A1, 3));
        console.log('P1:', round(P1, 3));
        console.log(' C:', round(C, 3));
        console.log('C2:', round(C2, 3));
        console.log('A2', round(A2, 3));
        console.log('C3', round(C3, 3));
        
        console.log(G1, B2, B3);
        
        console.log('G1=' + G1);
        console.log('F='+ F);
        console.log('P='+ P);
        console.log('D='+ D);

        console.log('F1='+ F1);
        console.log('PP='+ P2);
        console.log('R2='+ R2);

        console.log('E='+ E);
        console.log('GA='+ G1);
        console.log('B2='+ B2);
        
        console.log("E1=", E1.toExponential(3));
        console.log("E2=", E2.toExponential(3));
        console.log("P3=", P3.toExponential(3));
        console.log("P4=", P4.toExponential(3));*/
    }

    onChangeField = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value //vl.replace(/,/g, '.')
        });
    }

    onChangeTelescopeType = (e) => {
        this.setState({
            type: parseInt(e.target.value)
        });
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
                    <div className="col-md-12 col-xs-12 text-center">
                        <a href="http://www.observatorio-phoenix.org/j_tele/j_23.htm" target="_blank" rel="noopener noreferrer">
                            <img src={CassegrainDesenho} alt="" style={{ maxWidth: "100%" }} />
                        </a>
                    </div>
                </div>
                <p>The late Harry Miller (Orange County Astronomers) used to say: "Cassegrains are a baffling problem."</p>
                <div className="row" style={{ marginTop: '2rem' }}>
                    <div className="col-md-6 col-xs-12">
                        <table className="table table-hover">
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
                                    <td>Diâmetro do primário; D1</td>
                                    <td><input name="D1" value={this.state.D1} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Focal do primário; f1</td>
                                    <td><input name="F1" value={this.state.F1} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Campo iluminado (º); U</td>
                                    <td><input name="U" value={this.state.U} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Afastamento do plano focal; e</td>
                                    <td><input name="E" value={this.state.E} onChange={this.onChangeField} className="form-control" /></td>
                                </tr>
                                <tr>
                                    <td>Fator de amplicação (ɣ)</td>
                                    <td><input name="G1" value={this.state.G1} onChange={this.onChangeField} className="form-control" /></td>
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
                        <button className="btn btn-primary btn-block" onClick={this.calculate}>Calcular</button>
                        <button className="btn btn-danger btn-block" onClick={this.cleaner}>Limpar</button>
                    </div>
                    <div className="col-md-6 col-xs-12">
                        <table className="table table-hover">
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
                                    <td>Relação focal do primário f1/D1</td>
                                    <td>{this.state.F1D1}</td>
                                </tr>
                                <tr>
                                    <td>Relação focal do sistema; F/D1</td>
                                    <td>{this.state.F2}</td>
                                </tr>
                                <tr>
                                    <td>Distância focal do sistema; F</td>
                                    <td>{this.state.F}</td>
                                </tr>
                                <tr>
                                    <td>Dist. secundário ao foco primário; p</td>
                                    <td>{this.state.P}</td>
                                </tr>
                                <tr>
                                    <td>Dist. do primário ao secundário; d</td>
                                    <td>{this.state.D}</td>
                                </tr>
                                <tr>
                                    <td>Dist. secundário ao foco Cassegrain; p'</td>
                                    <td>{this.state.P2}</td>
                                </tr>
                                <tr>
                                    <td>Raio de curvatura do primário; r1</td>
                                    <td>{this.state.R1}</td>
                                </tr>
                                <tr>
                                    <td>Raio de curvatura do secundário; r2</td>
                                    <td>{this.state.R2}</td>
                                </tr>
                                <tr>
                                    <td>Diâmetro do secundário em relação ao eixo</td>
                                    <td>{this.state.D3}</td>
                                </tr>
                                <tr>
                                    <td>Diâmetro para o campo U </td>
                                    <td>{this.state.D2}</td>
                                </tr>
                                <tr className={this.setClassObstructionRate(this.state.TX)}>
                                    <td>Taxa de obstrução</td>
                                    <td>{this.state.TX}</td>
                                </tr>
                                <tr>
                                    <td>Límite de Dawes</td>
                                    <td>{this.state.LD}</td>
                                </tr>

                                <tr>
                                    <th colSpan="3" className="text-center">Coeficientes de Schwarzschild</th>
                                </tr>
                                <tr>
                                    <td>Coma</td>
                                    <td>{this.state.B}</td>
                                </tr>
                                <tr>
                                    <td>Astigmatismo</td>
                                    <td>{this.state.A1}</td>
                                </tr>
                                <tr>
                                    <td>Curvatura de Petzval</td>
                                    <td>{this.state.P1}</td>
                                </tr>
                                <tr>
                                    <td>Curvatura do campo</td>
                                    <td>{this.state.C}</td>
                                </tr>
                                <tr>
                                    <td>Coma em arco de segundos</td>
                                    <td>{this.state.C2}</td>
                                </tr>
                                <tr>
                                    <td>Astigmatismo em arco de segundos</td>
                                    <td>{this.state.A2}</td>
                                </tr>

                                <tr>
                                    <td>Raio de curvatura de campo na unidade utilizada</td>
                                    <td>{this.state.C3}</td>
                                </tr>
                                <tr>
                                    <th colSpan="3" className="text-center">Excentricidade</th>
                                </tr>
                                <tr>
                                    <td>Primário</td>
                                    <td>{this.state.B1}</td>
                                </tr>
                                <tr>
                                    <td>Secundário</td>
                                    <td>{this.state.B2}</td>
                                </tr>
                                <tr>
                                    <th colSpan="3" className="text-center">Epsilon 0.707</th>
                                </tr>
                                <tr>
                                    <td>Primário</td>
                                    <td>{this.state.E1}</td>
                                </tr>
                                <tr>
                                    <td>Secundário</td>
                                    <td>{this.state.E2}</td>
                                </tr>
                                <tr>
                                    <th colSpan="3" className="text-center">Inclinação na borda</th>
                                </tr>
                                <tr>
                                    <td>Primário</td>
                                    <td>{this.state.P3}</td>
                                </tr>
                                <tr>
                                    <td>Secundário</td>
                                    <td>{this.state.P4}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}