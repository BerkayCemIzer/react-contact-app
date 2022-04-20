import { useState, useEffect } from "react";
import List from "./List";
import Form from "./Form";
import "./styles.css";

function Contacts() {
  const [contacts, setContacts] = useState([
    {
      fullname: "Berkay",
      phone_number: "12345",
    },
    {
      fullname: "Cem",
      phone_number: "6789",
    },
    {
      fullname: "Ahmet",
      phone_number: "5550025",
    },
  ]); // Birden fazla elemanı burada tutmak istiyorum, array olacak o yüzden.

  useEffect(() => {
    console.log(contacts);
  }, [contacts]); // contacts'e atama yapılınca konsola içeriğini yazdırmak için

  return (
    <div className="container font-weight-bolder text-light border-primary">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1>Contacts</h1>
          <List contacts={contacts} />
          <Form addContact={setContacts} contacts={contacts} />
        </div>
      </div>
    </div>
  ); // Formdan sonraki prop olan addContact yerine istediğimiz şeyi de yazabiliriz.
}

export default Contacts;
