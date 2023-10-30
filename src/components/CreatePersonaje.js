import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class CreatePersonaje extends Component {
    state = {
        series: null,
        statusPost: false,
        statusSeries: false
    }
    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    cajaSerie = React.createRef();

    loadSeries = () => {
        var request = "api/Series";
        var url = Global.url + request;
        axios.get(url).then(response => {
            console.log(response.data)
            this.setState({
                series: response.data,
                statusSeries: true
            })
        })
    }
    componentDidMount = () => {
        this.loadSeries();
    }

    postPersonaje = (e) => {
        e.preventDefault();
        var nombre = this.cajaNombre.current.value;
        var imagen = this.cajaImagen.current.value;
        var serie = parseInt(this.cajaSerie.current.value);

        var personaje = {
            idPersonaje: 22,
            nombre: nombre,
            imagen: imagen,
            idSerie: serie
        }

        var request = "api/Personajes";
        var url = Global.url + request;

        axios.post(url, personaje).then(response => {
            alert("Enviado correctamente");
            this.setState({
                statusPost: true
            })
        })

    }
    render() {
        if (this.state.statusPost) {
            return <Navigate to={"/personajes/"+this.cajaSerie.current.value}/>;
        }
        else {
            return (
                <div>
                    <h1>Crear nuevo Personaje</h1>
                    <form onSubmit={this.postPersonaje}>
                        <label>Nombre: </label>
                        <input type="text" ref={this.cajaNombre} />
                        <br />
                        <label>Imagen: </label>
                        <input type="text" ref={this.cajaImagen} />
                        <br />
                        <label>Serie: </label>
                        <select ref={this.cajaSerie}>
                            {this.state.statusSeries && (
                                this.state.series.map((serie, i) => {
                                    return (
                                        <option key={i} value={serie.idSerie}>{serie.nombre}</option>
                                    )
                                })
                            )}

                        </select>
                        <br />
                        <button className="btn btn-primary">Insertar</button>

                    </form>
                </div>
            )
        }
    }
}
