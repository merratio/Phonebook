
const Form = (props) =>{

    return(
        <>
        <form onSubmit={props.handleSubmit}>
            <div>
                name: <input
                        value={props.newName}
                        onChange={props.handleNewName}
                        type="text" />
            </div>
            <div>
                number: <input
                    value={props.newNumber}
                    onChange={props.handleNewNumber}
                    type="text" />

            </div>
                
            
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default Form