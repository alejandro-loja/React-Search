import React, { Component } from "react";
import API from "../utils/API";
import booksAPI from "../utils/gbAPI";
import Jumbotron from "../components/Jumbotron";
import Container from "../components/Container";
import { List } from "../components/ListBooks";
import { EachBook } from "../components/EachBook";
import { ViewButton, SaveButton } from "../components/Buttons";
import { Input, FormBtn } from "../components/Form";



class Search extends Component {

    state = {
        books: [],
        title: "",
        authors: "",
        description: "",
        image: "",
        link: "",
        query: ""
    };

    SearchBooks = () => {
        booksAPI.searchBooks(this.state.query)
            //   .then(res => console.log(res.data.items))
            .then(res => this.setState({ books: res.data.items }))
            .catch(err => this.setState({resultResponse: 'No Results Found'}))

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleBookSearchForm = event => {
        event.preventDefault();
        if (this.state.query) {
            console.log(this.state.query)
            this.SearchBooks()
        }
      };

      saveBook = (title,authors,description,image,link) => {
        // console.log(title,authors,description,image,link);
        if (title && image) {
          API.saveBook({
            title: title,
            authors: authors,
            description: description,
            image: image,
            link: link
          })
            .then(res => alert(`${title} is saved`))
            .catch(err => console.log(err));
      }
    }

    render() {
        return (
            <div>

                <Jumbotron>
                    <h1>Search Google API</h1>
                </Jumbotron>
                <Jumbotron>
                    <form>
                        <Input
                            value={this.state.query}
                            onChange={this.handleInputChange}
                            name="query"
                            placeholder="Search Book..."
                        />
                        <FormBtn
                            // disabled={!(this.state.author && this.state.title)}
                            onClick={this.handleBookSearchForm}
                        >
                            Search Book
              </FormBtn>
                    </form>
                </Jumbotron>

                <Jumbotron>
                    <h4>Book Results</h4>
                </Jumbotron>
                <Container>
                    {this.state.books.length ? (
                        <List>
                            {this.state.books.map(book => {
                                return (
                                    <EachBook key={book.id}>
                                        <a href={book.volumeInfo.infoLink || "#"} target="_blank" rel="noopener noreferrer">
                                            <h3>
                                                <strong>{book.volumeInfo.title || 'No Title'}</strong>
                                            </h3>
                                        </a>
                                        <h4>Written By <span>{book.volumeInfo.authors || 'No Author'}</span></h4>
                                        
                                        {/* {book.volumeInfo.imageLinks.smallThumbnail == undefined ? <p>No image</p>: <p> YES</p>} */}

                                        {book.volumeInfo.imageLinks === undefined ? '': <img src={book.volumeInfo.imageLinks.smallThumbnail } 
                                        alt={book.volumeInfo.title || 'No Title'} />}
                                        <p>{book.volumeInfo.description === undefined? 'No Description' : book.volumeInfo.description}</p>
                                        <ViewButton target="_blank" rel="noopener noreferrer" href={book.volumeInfo.infoLink === undefined? '#' : book.volumeInfo.infoLink} />
                                        <SaveButton onClick={() => this.saveBook(
                                            book.volumeInfo.title,
                                            book.volumeInfo.authors,
                                            book.volumeInfo.description,
                                            book.volumeInfo.imageLinks.smallThumbnail,
                                            book.volumeInfo.infoLink,
                                            )} />
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



export default Search;