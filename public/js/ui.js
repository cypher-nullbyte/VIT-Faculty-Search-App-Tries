window.addEventListener("DOMContentLoaded",()=>{
        
        let form = document.querySelector("#search-form")
        form.addEventListener("submit",(event)=>{               
                //preventing defeault form submission
                event.preventDefault()
                facultyQuery()
        })
})

const facultyQuery = ()=>{
        
        let form = document.querySelector("#search-form")

        //hiding previous error messages
        document.querySelector(".search-error").style.display = "none"
        
        //extracting query string
        const query = form["search-input"].value.toUpperCase()
        let response = undefined
        if(document.querySelector("#search-type").value == "on"){ //means trie search is required
                response = t.query(query)
        }
        else{
               
                response = linearQuery(query)
        }
        const results = response["data"]
        const time = response["time"]
        updateModals(results)
        updateSearchItems(results)
        updateTime(time)
}

const updateModals = (data) =>{
        
        //first remove old modals
        document.querySelectorAll(".modal").forEach(modal=>{
                modal.parentElement.removeChild(modal)
        })
        
        //add new modals
        data.forEach(faculty=>{
                let html = `                                         
                <div id="id-${faculty.empId}" class="modal">
                <div class="modal-content">
                <h4 class='teal-text'>Faculty Information</h4>
                <table>
                <tr>
                <th>
                Name
                </th>
                <td>
                ${faculty.name}
                </td>
                <tr>
                <tr>
                <th>
                Mobile
                </th>
                <td style="display: flex; justify-content: space-between;">
                <div>${faculty.mobile}</div>
                <div style="display: flex; align-items: center;">
                <a target="_blank" href="https://wa.me/91${faculty.mobile}/" class="icon whatsapp-icon"></a>
                <a target="_blank"  href="tel:${faculty.mobile}" class="icon phone-icon"></a>
                </div>
                </td>
                <tr>
                <tr>
                <th>
                E-Mail
                </th>
                <td>
                ${faculty.email}
                </td>
                <tr>
                <tr>
                <th>
                Employee Id
                </th>
                <td>
                ${faculty.empId}
                </td>
                <tr>
                <tr>
                <th>
                Cabin
                </th>
                <td>
                ${faculty.cabin}
                </td>
                <tr>
                </table>
                </div>
                <div class="modal-footer">
                <a href="#!" class="modal-close waves-effect waves-green btn-flat">
                <b class="teal-text">Close</b>
                </a>
                </div>
                </div>
                `
                document.querySelector("body").insertAdjacentHTML("beforeend",html)
        })
        
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
        
}
const updateSearchItems = (data) => {
        const searchResults = document.querySelector("#search-results")
        
        // sanitize previous searchResults first
        searchResults.innerHTML = ""
        
        if (data.length>0){
                data.forEach(faculty => {
                        let html = `
                        <li class="collection-item search-item" >
                                <div style="display: flex;">   
                                       <div style="flex:1;">
                                        ${faculty.name}
                                        </div>
                                        <a 
                                                onclick="M.Modal.getInstance(
                                                document.querySelector('#id-${faculty.empId}')
                                                ).open()" 
                                                 class="secondary-content">
                                                
                                                 <i class="material-icons">send</i>
                                        </a>
                                </div>
                        </li>`
                        searchResults.insertAdjacentHTML("beforeend", html)
                        })
                        
                        
                }
                else{   //means no match found
                        
                        //show not found error
                        document.querySelector(".search-error").style.display = "block"
                }
        }
        

const updateTime = (time)=>{
        document.querySelector(".time-div").innerHTML = `querying finished in ${time} milliseconds`
}