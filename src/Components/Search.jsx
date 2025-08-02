
const Search= (props) =>{
    return(
        <>
        filter shown with <input type="text"
        value={props.search}
        onChange={props.handleSearch}/>
        </>
    )
}

export default Search