import { useEffect, useState } from "react";

const initialFormValues = { fullname: "", phone_number: "" }; // Eğer misal 10 tane değer içerirse altta input içini silme işlemine (setForm) vs. 10 tane yazmaktansa böyle yapınca daha rahat olur.

function Form({ addContact, contacts }) {
  const [form, setForm] = useState(initialFormValues);

  useEffect(() => {
    setForm(initialFormValues); // İnput içi silme işleminin 2. yolu
  }, [contacts]);

  const onChangeInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };

  const onSubmit = (e) => {
    // bunu form'da onSubmit propuna verebiliyoruz, form submit olunca devreye giriyor. Yalnız şöyle bir sıkıntı oluyor; form submit olunca sayfa yenileniyor. Bu varsayılan davranışı durdurmak lazım.

    e.preventDefault(); // Bu şekilde durduruyoruz yenileme işlemini.
    // console.log(e.target)

    if (form.fullname === "" || form.phone_number === "") {
      return false; // Formu gönderme diyoruz. Sayı falan da yazsam oluyor, ya da sadece return yazsam bile oluyor. Amaç return ettirip aşağıya okumasını durdurmak sanırım. e.preventDefault'u da console.log'un üstüne alınca boş formu yeniledi yani muhtemelen öyle.
    }

    addContact([...contacts, form]); // Contacts'taki setContacts'ı almış olduk prop yardımı ile ve atamayı buradan yapabileceğiz. Ayrıca ...contacts ile önceki formu korumuş olacağız (Contacts'taki contacts, prop ile aldık.)
    // console.log(form);

    // setForm(initialFormValues); // onSubmit edilince input kutucuğundaki yazıyı silsin diye ekledik. Bunu useEffect ile de yapabiliriz, yukarıda yapılmıştır.
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          className="form-control mb-1"
          name="fullname"
          placeholder="Full Name"
          onChange={onChangeInput}
          value={form.fullname} // onSubmit olunca input içini silsin diye ekledik.
        />
      </div>
      <div>
        <input
          className="form-control"
          name="phone_number"
          placeholder="Phone Number"
          onChange={onChangeInput}
          value={form.phone_number} // onSubmit olunca input içini silsin diye ekledik.
        />
      </div>
      <div className="float-right">
        <button className="btn btn-success mt-3">Add</button>
      </div>
    </form>
  );
}

export default Form;

// Şimdi eğer kullanıcı kayıtlarını bu form componentinin içindeki bir state'de tutarsam bu state'i list component'ine nasıl taşıyacağım? Böyle bir problem çıkıyor. O yüzden biz bu state'i, yani kullanıcıların ekleneceği state'i Contacts (Contacts'ın index.js'i) componentinde tutarsak ve bu state'e ekleme yapılacak olan set işlemi yapacak olan fonksiyonu Form componentine (contacts içindeki index.js içindeki <Form /> ) geçersem problem kalmayacak.
