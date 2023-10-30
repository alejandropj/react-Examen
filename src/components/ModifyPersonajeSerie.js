import React, { Component } from 'react';
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class ModifyPersonajeSerie extends Component {
    cajaPersonajes = React.createRef();
    cajaSerie = React.createRef();

    state = {
        series: null,
        personajes: null,
        statusSeries: false,
        statusPersonajes: false,
        statusUpdate: false,
        selectChangedSerie: null,
        selectChangedPersonajes: null

    }

    modifyPersonaje = (e) => {
        e.preventDefault();
        var idPersonaje = this.cajaPersonajes.current.value;
        var idSerie = this.cajaSerie.current.value;
        var request = "api/Personajes/" + idPersonaje + "/" + idSerie;
        var url = Global.url + request;
        axios.put(url).then(response => {
            alert("Actualizado con éxito");
            this.setState({
                statusUpdate: true
            })
        })

    }
    loadSeries = () => {
        var request = "api/Series";
        var url = Global.url + request;
        axios.get(url).then(response => {
            //console.log(response.data)
            this.setState({
                series: response.data,
                statusSeries: true
            })
        })
    }
    loadPersonajes = () => {
        var request = "api/Personajes";
        var url = Global.url + request;
        axios.get(url).then(response => {
            //console.log(response.data)
            this.setState({
                personajes: response.data,
                statusPersonajes: true
            })
        })
    }
    componentDidMount = () => {
        this.loadPersonajes();
        this.loadSeries();
    }
    loadSelectSeries = () => {
        var idSerie = this.cajaSerie.current.value;
        var request = "api/Series/" + idSerie;
        var url = Global.url + request;
        axios.get(url).then(response => {
            //console.log(response.data)
            this.setState({
                selectChangedSerie: response.data
            })
        })
    }
    loadSelectPersonajes = () => {
        var idPersonajes = this.cajaPersonajes.current.value;
        var request = "api/Personajes/" + idPersonajes;
        var url = Global.url + request;
        axios.get(url).then(response => {
            //console.log(response.data)
            this.setState({
                selectChangedPersonajes: response.data
            })
        })
    }
    render() {
        if (this.state.statusUpdate) {
            return <Navigate to={"/personajes/" + this.state.selectChangedSerie.idSerie} />
        } else {

            return (
                <div>
                    <h1>Modificar Personaje/Serie</h1>
                    <form onSubmit={this.modifyPersonaje}>
                        <label>Seleccione serie: </label>
                        <select onChange={this.loadSelectSeries} ref={this.cajaSerie}>
                            {
                                this.state.statusSeries && (
                                    this.state.series.map((serie, i) => {
                                        return (
                                            <option key={i} value={serie.idSerie}>{serie.nombre}</option>
                                        )
                                    })
                                )
                            }
                        </select>
                        <br />
                        <label>Seleccione personaje: </label>
                        <select onChange={this.loadSelectPersonajes} ref={this.cajaPersonajes}>
                            {
                                this.state.statusPersonajes && (
                                    this.state.personajes.map((personaje, i) => {
                                        return (
                                            <option key={i} value={personaje.idPersonaje}>{personaje.nombre}</option>
                                        )
                                    })
                                )
                            }
                        </select>
                        <br />
                        <button className='btn btn-primary'>Actualizar</button>

                        {
                            this.state.selectChangedSerie && (
                                <div>
                                    <h1>{this.state.selectChangedSerie.nombre}</h1>
                                    <img src={this.state.selectChangedSerie.imagen}
                                        style={{ width: "150px", height: "150px" }} />
                                </div>
                            )
                        }
                        {
                            this.state.selectChangedPersonajes && (
                                <div>
                                    <h1>{this.state.selectChangedPersonajes.nombre}</h1>
                                    <img src={this.state.selectChangedPersonajes.imagen} style={{ width: "150px", height: "150px" }} />
                                </div>

                            )
                        }
                    </form>
                </div>

            )

        }
    }
}
