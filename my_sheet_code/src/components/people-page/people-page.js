import React, {Component} from 'react';

import './people-page.css';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry";
import Row from "../row";

export default class  PeoplePage extends Component {
    swapiService = new SwapiService();

    constructor() {
        super();
        this.state = {
            selectedPerson: Math.floor((Math.random() * 5) + 1),
        }
    }


    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        });
    };

    render() {
        const itemList = (
            <ItemList
                onPersonSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}>
                {item => (
                    `${item.name} (${item.birthYear})`
                )}
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundry>
                <ItemDetails personId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );

        return (
            <ErrorBoundry>
                <Row itemListLeft={itemList} itemDetailsRight={personDetails}/>
            </ErrorBoundry>
        );
    };
};


