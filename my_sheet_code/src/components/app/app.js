import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from "../error-indicator";
import ErrorBoundry from "../error-boundry";
import {PersonDetails, PersonList, PlanetDetails, PlanetList, StarshipDetails, StarshipList} from "../sw-components";
import {SwapiServiceProvider} from '../swapi-service-context';

import './app.css';
import Row from "../row";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {

    constructor() {
        super();
        this.swapiService = new SwapiService();
        this.state = {
            showRandomPlanet: true,
            selectedPerson: Math.floor(Math.random() * 10),
            hasError: false,
        };
    };

    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true});
    }

    toggleRandomPlanet = () => {
        this.setState(prevState => {
            return {
                showRandomPlanet: !prevState.showRandomPlanet
            };
        });
    };

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const togglePlanet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

        // const {
        //     getPerson,
        //     getStarship,
        //     getPersonImage,
        //     getStarshipImage
        // } = this.swapiService;

        // const personDetails = (
        //     <ItemDetails
        //         itemId={11}
        //         getData={getPerson}
        //         getImageUrl={getPersonImage}>
        //
        //         <Record field="gender" label="Gender"/>
        //         <Record field="eyeColor" label="Eye Color"/>
        //
        //     </ItemDetails>
        // );

        // const starshipDetails = (
        //     <ItemDetails
        //         itemId={5}
        //         getData={getStarship}
        //         getImageUrl={getStarshipImage}>
        //         <Record field="model" label="Model"/>
        //         <Record field="length" label="Length"/>
        //         <Record field="costInCredits" label="Cost"/>
        //     </ItemDetails>
        // );

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                    <div className='container'>

                        <Header/>

                        <Row
                            // itemListLeft={(
                            //     <PersonList/>
                            // )}
                            itemDetailsRight={
                                <PersonDetails itemID={11}/>
                            }/>
                        <Row
                            itemListLeft={(
                                <PlanetList/>
                            )}
                            itemDetailsRight={
                                <PlanetDetails itemID={5}/>
                            }/>
                        <Row
                            itemListLeft={(
                                <StarshipList/>
                            )}
                            itemDetailsRight={
                                <StarshipDetails itemID={3}/>
                            }/>
                        <div>
                            {/*{togglePlanet}*/}
                            {/*<div className="row mb-3">*/}
                            {/*    <button className='btn btn-custom m-3' onClick={this.toggleRandomPlanet}>Toggle planet</button>*/}
                            {/*    <ThrowError/>*/}
                            {/*</div>*/}
                            {/*<PeoplePage/>*/}

                            {/*<ItemList getData={getAllPeople}>*/}
                            {/*    {({name}) => <span>{name}</span>}*/}
                            {/*</ItemList>*/}
                            {/*<ItemList getData={getAllPlanets}>*/}
                            {/*    {({name}) => <span>{name}</span>}*/}
                            {/*</ItemList>*/}

                            {/*<Row*/}
                            {/*    itemListLeft={personDetails}*/}
                            {/*    itemDetailsRight={starshipDetails}*/}
                            {/*/>*/}

                            {/*<div className="row mb-3">*/}
                            {/*    <div className="col-md-6 mt-4 mt-md-0">*/}
                            {/*        <ItemList*/}
                            {/*            onPersonSelected={this.onPersonSelected}*/}
                            {/*            getData={this.swapiService.getAllPlanets}*/}
                            {/*            renderItem={({name, diameter}) => `${name} (Diameter: ${diameter})`}/>*/}
                            {/*            /!*renderItem={(item) => (<span>{item.name} <button>!</button></span>)}/>*!/*/}
                            {/*    </div>*/}
                            {/*    <div className="col-md-6 mt-4 mt-md-0">*/}
                            {/*        <mt-md-0PersonDetails personId={this.state.selectedPerson}/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/*<div className="row mb-3">*/}
                            {/*    <div className="col-md-6 mt-4 mt-md-0">*/}
                            {/*        <ItemList*/}
                            {/*            onPersonSelected={this.onPersonSelected}*/}
                            {/*            getData={this.swapiService.getAllStarships}*/}
                            {/*            renderItem={({name, model}) => `${name} (Model: ${model} )`}/>*/}
                            {/*    </div>*/}
                            {/*    <div className="col-md-6 mt-4 mt-md-0">*/}
                            {/*        /!*<PersonDetails personId={this.state.selectedPerson}/>*!/*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    };
};
