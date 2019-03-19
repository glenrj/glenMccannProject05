import React, { Component } from 'react';
import firebase from './components/firebase';

class Completed extends Component {
    render() {
        return (
            <section className="story">
                <ul>
                    {/* map over array of storys to print each entry object */}
                    {this.props.entries.map((entry) => {
                        return (
                            <li key={entry.key}>
                                <p className="body">{entry.submission}</p>
                                <p className="attribution">{entry.author}, {entry.time}</p>
                            </li>
                        )
                    })}
                </ul>
            </section>
        )
    }
}

export default Completed;