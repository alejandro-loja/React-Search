import React from 'react';

// export function SearchButton(props) {
//     return (<button type="button" className="btn btn-primary">Search</button>)
//   }

export function ViewButton(props) {
    return <a type="button" {...props} className="btn btn-secondary">View</a>
  }

  export function SaveButton(props) {
    return <button type="button" {...props} className="btn btn-success">Save</button>
  }

  export function DeleteButton(props) {
    return <button type="button"  {...props}className="btn btn-danger">Delete</button>
  }