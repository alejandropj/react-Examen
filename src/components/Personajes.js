import React, { Component } from 'react'
import Global from '../Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default class Personajes extends Component {
    state = {
        personajes: null,
        statusPersonajes: false
    }
    loadPersonajes = () => {
        var idSerie = this.props.id
        var request = "api/Series/PersonajesSerie/" + idSerie;
        var url = Global.url + request;

        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
                statusPersonajes: true
            })
        })
    }
    componentDidMount = () => {
        this.loadPersonajes();
    }
    render() {
        return (
            <div>
                <h1>Personajes de la Serie {this.props.id}</h1>
                <NavLink className="btn btn-primary" to={"/serie/"+this.props.id}>Volver a detalle Serie</NavLink>
                {
                    this.state.statusPersonajes && (
                        <table class="table table table-success table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Imagen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.personajes.map((personaje, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{personaje.nombre}</td>
                                                <td><img src={personaje.imagen} style={{width:"150px",height:"150px"}}/></td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    )
                }
            </div>
        )
    }
}
