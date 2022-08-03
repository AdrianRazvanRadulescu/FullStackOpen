import { useEffect, useState } from "react";
import Form from "./components/Form";
import Filter from "./components/Filter";
import PersonsList from "./components/PersonsList";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setNewFilterName] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const personFound = persons.find(
      (person) => person.name === personObject.name
    );

    if (personFound !== undefined) {
      const willUpdate = window.confirm(
        `${personFound.name} is already in the phonebook. Replace the old number?`
      );

      if (willUpdate) {
        const updatedPerson = { ...personFound, number: newNumber };
        console.log(updatedPerson);

        personService
          .update(personFound.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                personFound.id !== person.id ? person : returnedPerson
              )
            );
            setMessage(`Changed ${returnedPerson.name}'s number.`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setPersons(
              persons.filter((person) => person.id !== updatedPerson.id)
            );
            setMessage(
              `[ERROR] ${updatedPerson.name} was already deleted from server`
            );
            setTimeout(() => {
              setMessage(null);
            }, 5000);
          });
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setMessage(`Added ${returnedPerson.name} to the list.`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      });
    }

    setNewName("");
    setNewNumber("");
  };

  const deletePerson = (id) => {
    const personToDelete = persons.filter((person) => person.id === id);
    const personName = personToDelete[0].name;

    if (window.confirm(`Delete the person ${personName}?`))
      personService
        .remove(id)
        .then((deletedPersons) =>
          setPersons(persons.filter((person) => person.id !== id))
        )
        .catch((error) => {
          setPersons(
            persons.filter((person) => person.id !== personToDelete[0].id)
          );
          setMessage(
            `[ERROR] ${personToDelete[0].name} was already deleted from server`
          );
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterName = (event) => {
    console.log(event.target.value);
    setNewFilterName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filterName={filterName} handleFilterName={handleFilterName} />

      <h3>add a new</h3>
      <Form
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <PersonsList
        persons={persons}
        filterName={filterName}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
