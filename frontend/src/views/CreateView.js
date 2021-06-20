import React from 'react'

export default function CreateView() {
    return (
        <div className="container mt-5 w-50" style={{backgroundColor:"lightGray"}}>
            <h2 className="text-center"> Create new repo!</h2>
        <form>
        <div class="mb-3">
            <label for="text" class="form-label">User:</label>
            <input type="text" class="form-control"  aria-describedby="emailHelp" placeholder="repo name"/>
            <div id="emailHelp" class="form-text">The name must be an unieqe name.</div>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
        <label class="form-check-label" for="flexRadioDefault1">
           Public
        </label>
        </div>
        <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
        <label class="form-check-label" for="flexRadioDefault2">
            Private
        </label>
        </div>
        <button type="submit" class="btn btn-dark w-100 mx-auto" style={{margin:"20px"}}>Submit</button>
        </form>
        </div>
    )
}
