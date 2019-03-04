import React, { Component } from 'react';
import './../styles/story.css';

class Story extends Component {
    render() {
        return (
            <section className="story">
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
            </section>
        )
    }
}

export default Story;