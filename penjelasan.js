//menampilkan data
async function getData(){
    //meminta HTTP dengan metode GET ke URL dan mengambil data dr format JSON 
    const fetchData = await fetch("http://localhost:3000/posts")
    //membaca JSON
    const json = await fetchData.json()
    
    const tbody = document.getElementById('postcontent')
//mengisi tabel
    let tdList = ''
    json.map((x, index) => {
        tdList +=`
        <tr>
        <td>${x.id}</td>
        <td>${x.title}</td>
        <td>${x.author}</td>
        <td>
        <button onclick="deleteData(${x.id})">Delete</button>
        <button onclick="updateData(${x.id}, '${x.title}', '${x.author}')">Update</button>
                </td>
        </tr> `
    })

        tbody.innerHTML = tdList

       }

getData()


//global
let isUpdating = false;
let idUpdate = null;



//btnSubmit
btnSubmit.onclick = async function(){
    

  //mengambil nilai dari inputan dan dimasukan ke dlm  var 
    const titleElement = document.getElementById('title')
    const authorElement = document.getElementById('author')

    //mengembalikan nilai  dan disimpan dalam variabel 
    const title = titleElement.value
    const author = authorElement.value

    //mengecek update 
    console.log(idUpdate);

    //2 function button submit 
 if(isUpdating){
  //jika isUpdating bernilai true akan masuk ke update
  const updateData = fetch('http://localhost:3000/posts/'+idUpdate, {
    method: 'PUT',
    body: JSON.stringify({
      title: title,
      author: author
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },})
 }else{
  //jika isUpdating bernilai false akan masuk sebagai data baru
    const postData = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify({
    title: title,
    author: author
    }),
    headers: {
'Content-type': 'application/json; charset=UTF-8',

  }})
 
 }

getData()

}


//delete
async function deleteData(id) {

        await fetch('http://localhost:3000/posts/' + id , {
        method: 'DELETE',});
    
      alert('Data berhasil dihapus!');

    getData()
    
  }


  //update
  async function updateData(id, title, author){
    console.log(id, title, author)

    isUpdating = true;

    //mengambil semua yg ingin di edit dan update
    idUpdate = id
    const updateTitle = document.getElementById('title')
    const updateAuthor = document.getElementById('author')

      //mengembalikan nilai
        updateTitle.value = title;
        updateAuthor.value = author;

        getData()
  }
