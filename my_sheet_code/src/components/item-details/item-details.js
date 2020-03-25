import React, {Component} from 'react';

import './item-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ThrowError from "../throw-error";

export default class ItemDetails extends Component {
    constructor() {
        super();
        this.state = {
            item: null,
            loading: true,
            image: null
        }
    }

    componentDidMount() {
        this.swapiService = new SwapiService();
        this.updatePerson();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId) {
            this.setState({loading: true});
            this.updatePerson();
        }
    }

    updatePerson() {
        const {itemId, getData, getImageUrl} = this.props;
        if (!itemId) {
            return;
        }
        getData(itemId)
            .then(item => {
                this.setState({
                    item,
                    loading: false,
                    image: getImageUrl(item)
                });
            });
    }

    onPersonLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    };

    render() {
        const {item, loading, image} = this.state;
        if (!item) {
            return <span>Select a item from list</span>;
        }
        // const content = loading ? <Spinner/> : <PersonView item={item} imageUrl={image} props={this.props}/>;
        if (loading) {
            return <Spinner/>;
        }
        return (
            <div className="item-details card">
                <img className="item-image"
                     src={image}/>

                <div className="card-body">
                    <h4>{item.name}</h4>
                    <ul className="list-group list-group-flush">
                        {/*{this.props.children}*/}
                        {
                            React.Children.map(this.props.children, ((child) => { // example
                                return React.cloneElement(child, {
                                    item
                                });
                            }))
                        }
                    </ul>
                    <ThrowError/>
                </div>

            </div>
        );
    };
};

// const PersonView = (args) => {
//     const {name, gender, birthYear, eyeColor} = args.item;
//     return (
//         <React.Fragment>
//             <img className="item-image"
//                  src={args.imageUrl}/>
//
//             <div className="card-body">
//                 <h4>{name}</h4>
//                 <ul className="list-group list-group-flush">
//                     {args.children}
//                 </ul>
//                 <ThrowError/>
//             </div>
//         </React.Fragment>
//     );
// };

const Record = ({item, field, label}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export {
    Record
};

