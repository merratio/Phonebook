import Form from './Components/Form'
import { useEffect, useState } from 'react'
import Search from './Components/Search'
import personService from './Services/persons'

const Noticfication = ({message, classn}) =>{
  if(message === null){
    return null
  }

  return(
    <>
    <div className={classn}>
      {message}
    </div>
    </>
  )
}

const App = () =>{
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [noti, setNoti] = useState(null)
  const [error, setError] = useState(null)
  

  useEffect(() =>{
    personService.getAll()
    .then(initial =>{
      setPersons(initial)
    })
  }, [])


  const handleNewName = (e) =>{
    setNewName(e.target.value)
  }


  const handleSearch = (e) =>{
    setSearch(e.target.value)
    
  }

  

  const handleNewNumber = (e) =>{
    setNewNumber(e.target.value)
  }

  const handleSubmit = (e) =>{
    e.preventDefault()

    const newPerson ={
      name: newName,
      number: newNumber
    }

    const exist = persons.some(person => person.name === newPerson.name && person.number !== newPerson.number)
    const per = persons.find(person => person.name === newPerson.name)
    

    exist  ? window.confirm(`${newName} is already added to phonebook. Change their number with a new one?`)?
    personService
    .update(per.id, newPerson)
    .then(updated => setPersons(persons.map((person) => person.id === per.id ? updated : person)))
    .catch(err =>{
      setError(`information of ${newPerson.name} has been removed from server`)
      setNoti(null)
      setTimeout(() =>{
        setError(null)
      },5000)
      setPersons(persons.filter(n => n.name !== newPerson.name))
    })
    : console.log('nvrm') 
    : personService
    .create(newPerson)
    .then(per => setPersons(persons.concat(per)))

    setNoti( `Added ${newPerson.name}`)

    setTimeout(() =>{
      setNoti(null)
    }, 5000)
     
    setNewName('')
    setNewNumber('')


    console.log(exist)
  }


  const handleDelete = (id, name) =>{
    window.confirm(`Delete ${name} ?`) ?
    
     personService.remove(id)
     .then(() => setPersons(persons.filter(person => person.id !== id)))
     : console.log('')

    
  }

  const exist = persons.find(person => person.name === search)
  const personsToShow = exist ? persons.filter(person => (person.name === search)): persons

  
  return(
    <>
    <h2>Phonebook</h2>
    <Noticfication message={error} classn={'error'}/>
    <Noticfication message={noti} classn={'noti'}/>
    <Search search={search} handleSearch={handleSearch}/>
    <h2>add a new</h2>
    <Form newName={newName} handleNewName={handleNewName} handleSubmit={handleSubmit} handleNewNumber={handleNewNumber}
    newNumber={newNumber}/>
    <h2>Numbers</h2>
    {
      personsToShow.map(person => (
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </div>
      ))
    }
    </>
  )
}
export default App
