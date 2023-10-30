import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Global from '../Global';
import axios from 'axios';

export default class Menu extends Component {
    state ={
        series : [],
        statusSeries: false
    }
    loadSeries = () => {
        var request = "api/Series";
        var url = Global.url + request;
        axios.get(url).then(response => {
            console.log(response.data)
            this.setState({
                series: response.data,
                statusSeries:true
            })
        })
    }

    componentDidMount = () => {
        this.loadSeries();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/">Inicio</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/newPersonaje">Nuevo personaje</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/modifyPersonaje">Modificar personajes</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Series
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown" id="desplegableSeries">
                                        {
                                            this.state.statusSeries &&(
                                                this.state.series.map((serie,i)=>{
                                                    return (
                                                        <li key={i}><NavLink className="dropdown-item" to={"/serie/"+serie.idSerie}>{serie.nombre}</NavLink></li>
                                                    )
                                                })
                                            )
                                        }
                                        
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
