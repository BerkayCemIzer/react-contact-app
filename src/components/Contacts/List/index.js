import { useState } from "react";

function List({ contacts }) {
  const [filterText, setFilterText] = useState("");

  const filtered = contacts.filter((item) => {
    // filter(item) bizlere fullname ve phone_number veriyor. Loglayınca {fullname: 'Berkay', phone_number: '12345'} gibi olan değerleri verdiğini görüyoruz.

    // Object.keys(item) ise filter(item)'dan gelen {fullname: 'Berkay', phone_number: '12345'}'nı array içerisinde keylerini veriyor yani loglayınca şunu verdiğini görüyoruz: ['fullname', 'phone_number'](Array dikkat ettiysen.)

    // .some'daki key parametresi bu Object.keys(item) den gelen array'ın içini tek tek geziyor. Biz örnek olarak üç kayıt yazdırdık ya, Object.keys(item).some((key) => console.log(key)) şeklinde loglayınca satır satır şöyle yazıyor: 1. satır: fullname / 2. satır: phone_number. Bunu 2 kere daha tekrarlıyor çünkü biz 3 örnek girdik. Some'ın kendisi de true/false döndürüyor. True dönmesi demek de biz o kaydı kullanabiliyoruz anlamına geliyor.

    // Object.keys(item).some((key) => console.log(item[key])) Buradaki item ise filter'dan gelen item, yani direkt {fullname: 'Berkay', phone_number: '12345'}, key ise fullname, phone_number. item[key] dediği ise şöyle birşey oluşmuş oluyor: (Unutma tek tek dönüyor.)
    // console.log({fullname: 'Berkay', phone_number: '12345'}["phone_number"]) Çıktısı: '12345' ve
    // console.log({fullname: 'Berkay', phone_number: '12345'}["fullname"]) Çıktısı: 'Berkay' vd.

    // Devamındaki .toString() gelen datayı string değilse string yapıyo yani 12345'i, sonra yazı ise küçük harf yapıyor hepsini .toLowerCase() ile.

    //includes(filterText) ile de bir tuşa bastığımızda onChange ile value useState kodundaki filterTexted'e gidiyor ya, o değeri alıp içeriyor mu içermiyor mu onu kontrol ediyor. toLocaleLowerCase() ile de geçerli konumun yazı sistemine göre küçültüyor, I yı i yapmasın da ı yapsın diye. (Yanlış anlamadıysam.)

    return Object.keys(item).some((key) =>
      item[key]
        .toString()
        .toLowerCase()
        .includes(filterText.toLocaleLowerCase())
    );
  });

  // console.log("filtered", filtered); // test edelim.

  return (
    <div>
      <input
        className="form-control mt-5 mb-3"
        placeholder="Filter contact (Type Name or Number)"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <div className="float-right">
        {filtered.length === 0 ? (
          <p>No Records Found.</p>
        ) : (
          <p>Total contact ({filtered.length})</p>
        )}
      </div>
      <div className="clearfix"></div>

      <ul className="list-group mb-4">
        {filtered.map((con, i) => (
          <li className="list-group-item list-group-item-action" key={i}>
            <span className="">{con.fullname}</span>
            <span className="float-right">{con.phone_number}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;

// ESKİ AÇIKLAMA, BURADA YAZILANLARI ÖNEMSEME!!! // burada dikkat etmemiz gereken nokta ismini de yazsa, numarasını da yazsa onu göstermemiz lazım. Object keys bizlere objenin keylerini veriyo yani fullname, phone_number. (item onu temsil ediyor.) some methodu herhangi biri şarta uyuyorsa getir demek. some(key)'deki key de objenin key'i aynı şekilde. Some'ın içine yazdığımız item, filter(item)'ın item'ı. Item'in içindeki key de some'dan gelen key. item[fullname] gibi oluyor. Belki string olarak gelmez, stringe çevirelim biz çünkü altta küçülteceğiz.Arama yaparken büyük küçük harf problemi yaşamayalım. includes'ı yazdık çünkü bizim elimizde filterText var mı, value'nin içinde var mı yok mu anlamaya çalışacağız.
// contacts.filter'deki item bize obje veriyor, o yüzden object.keys kullanarak keylerini alıyorum. Sonra some'da bize keyler gelmiş oluyor. item[keys] diyerek de {objenin kendisi(contact.filter'den gelen)}[some'dan gelen keyler(some içinde yazıyoruz, unutma.)]
