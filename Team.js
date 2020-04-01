import React, {Component} from 'react';

export default class Team extends Component {
    render() {
        return (
            <div className="Team">
                <h2>{this.props.name}</h2>
            </div>
        )
    }
}