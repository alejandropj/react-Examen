import React, { Component } from 'react';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import CreatePersonaje from './components/CreatePersonaje';
import ModifyPersonajeSerie from './components/ModifyPersonajeSerie';
import Serie from './components/Serie';
import Personajes from './components/Personajes';

export default class Router extends Component {
  render() {
    function SerieElement(){
        var {id} = useParams();
        return <Serie id={id}/>;
    }
    function PersonajesElement(){
        var {id} = useParams();
        return <Personajes id={id}/>;
    }
    return (
      <BrowserRouter>
      <Menu/>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/newPersonaje' element={<CreatePersonaje/>}/>
            <Route path='/modifyPersonaje' element={<ModifyPersonajeSerie/>}/>
            <Route path='/serie/:id' element={<SerieElement/>}/>
            <Route path='/personajes/:id' element={<PersonajesElement/>}/>
        </Routes>
      </BrowserRouter>
    )
  }
}
