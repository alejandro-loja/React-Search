import React, { Component } from "react";
import API from "../utils/API";
import booksAPI from "../utils/gbAPI";
import Jumbotron from "../components/Jumbotron";
import Container from "../components/Container";
import { List } from "../components/ListBooks";
import { EachBook } from "../components/EachBook";
import { ViewButton, DeleteButton } from "../components/Buttons";
// import { Input, FormBtn } from "../components/Form";

class Saved extends Component {

    state = {
        books: [],
        title: "",
        authors: "",
        description: "",
        image: "",
        link: "",
        query: ""
    };

    componentDidMount() {
        this.loadBooks();
    };

    loadBooks = () => {
        API.getBooks()
            .then(res => this.setState({ books: res.data }))
            .catch(err => console.log(err));
    };

    deleteBook = id => {
        API.deleteBook(id)
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>

                <Jumbotron>
                    <h1>Saved Google Book</h1>
                </Jumbotron>
                <Jumbotron>
                    <h4>Book Results</h4>
                </Jumbotron>
                <Container>
                    {this.state.books.length ? (
                        <List>
                            {this.state.books.map(book => {
                                return (
                                    <EachBook key={book._id}>
                                        <a href={book.title} target="_blank" rel="noopener noreferrer">
                                            <h3>
                                                <strong>{book.title}</strong>
                                            </h3>
                                        </a>
                                        <h4>Written By <span>{book.authors}</span></h4>
                                        <img src={book.image} alt={book.title} />
                                        <p>{book.description}</p>
                                        <ViewButton target="_blank" rel="noopener noreferrer" href={book.link} />
                                        <DeleteButton onClick={() => this.deleteBook(book._id)} />
                                    </EachBook>
                                );
                            })}
                        </List>
                    ) : (
                            <h3>No Books to Display</h3>
                        )}
                </Container>

            </div>)

    }

};



export default Saved;