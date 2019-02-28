import React, { Component } from 'react';

class Story extends Component {
    constructor() {
        super()
    }

    
    render() {
        console.log(this.props.entries);
        return (
            <ul>
                {this.props.entries.map((entry) => {
                    return (
                        <li key={entry.key}>
                            <p className="body">{entry.submission}</p>
                            <p className="attribution">{entry.author}, {entry.time}</p>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default Story;