import React from "react";

const PersonsList = ({ persons, filterName, deletePerson }) => {
  return (
    <ul>
      {persons
        .filter((person) => person.name.toLowerCase().includes(`${filterName}`))
        .map((person, i) => (
          <li key={i} style={{ listStyleType: "none" }}>
            {person.name} {person.number}
            {"    "}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </li>
        ))}
    </ul>
  );
};

export default PersonsList;
