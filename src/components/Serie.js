import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { NavLink } from 'react-router-dom';

export default class Serie extends Component {
    state = {
        serie: null,
        statusSerie: false
    }
    loadSerie = () => {
        var idSerie = this.props.id;
        var request = "api/Series/"+idSerie;
        var url = Global.url+request;
        axios.get(url).then(response => {
            this.setState({
                serie: response.data,
                statusSerie:true
            })
        })
    }
    componentDidMount = () => {
        this.loadSerie();
    }
    componentDidUpdate = (oldProps) => {
        if(oldProps.id != this.props.id){
            this.loadSerie();
        }
    }
  render() {
    return (
      <div>
        <h1>Detalle Serie {this.props.id}</h1>
      {
        this.state.statusSerie&&(
            <div className="card" style={{width: "18rem"}}>
                <img src={this.state.serie.imagen} className="card-img-top" alt="Imagen serie"/>
                <div className="card-body">
                    <h5 className="card-title">{this.state.serie.nombre}</h5>
                    <p className="card-text">Año: {this.state.serie.anyo}</p>
                    <p className="card-text">Puntuación: {this.state.serie.puntuacion}</p>
                    <NavLink to={"/personajes/"+this.state.serie.idSerie} className="btn btn-primary">Ver personajes</NavLink>
                </div>
            </div>
        )
      }
      </div>
    )
  }
}
