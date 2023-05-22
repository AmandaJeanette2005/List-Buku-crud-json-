//menampilkan data
async function getData(){
    const fetchData = await fetch("http://localhost:3000/posts")
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



let isUpdating = false;
let idUpdate = null;



//btnSubmit
btnSubmit.onclick = async function(){
    
    const titleElement = document.getElementById('title')
    const authorElement = document.getElementById('author')

    const title = titleElement.value
    const author = authorElement.value

    //mengecek update 
    // console.log(idUpdate);

    //2 function button submit 
 if(isUpdating){
  const updateData = fetch('http://localhost:3000/posts/'+idUpdate, {
    method: 'PUT',
    body: JSON.stringify({
      title: title,
      author: author
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },})
    alert("Data Berhasil di Update!")
 }else{
    const postData = await fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: JSON.stringify({
    title: title,
    author: author
    }),
    headers: {
'Content-type': 'application/json; charset=UTF-8',

  }})
  alert("Data Berhasil di Tambah!")
 }

getData()

}


//delete
async function deleteData(id) {

        await fetch('http://localhost:3000/posts/' + id , {
        method: 'DELETE',});
  
      alert("Data Berhasil dihapus!")

    getData()
    
  }


  //update
  async function updateData(id, title, author){
    console.log(id, title, author)

    isUpdating = true;

    idUpdate = id
    const updateTitle = document.getElementById('title')
    const updateAuthor = document.getElementById('author')

        updateTitle.value = title;
        updateAuthor.value = author;

        getData()
  }



  
// const btnSubmit = document.getElementById('btnSubmit')
// const deleteButtons = document.querySelectorAll('.btnDelete')

