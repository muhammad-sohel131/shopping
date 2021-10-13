const tudoList = document.querySelector('.tudo-list');
const inputField = document.querySelector('#name')
const submitButton = document.querySelector('button[type=submit]');
const deleteAll = document.querySelector('#deleteAll');


const setToLocalStroage = (Data,data) => {
    localStorage.setItem(Data, JSON.stringify(data))
}

const getFromLocalstroage = (Data) => {
    return items = JSON.parse(localStorage.getItem(Data))
}

const incompleteData = getFromLocalstroage('incompleteData') || []

const displayItems = (data) => {
    let lists =''
    data.forEach(((item, index) => {
    lists += `<li class="tudo-item">
                <p>${item}</p>
                <div class="action-buttons">
                    <span id="done" data-index= ${index}>Done</span>
                    <span id="edit" data-index= ${index}>edit</span>
                    <span id="delete" data-index=${index}>delete</span>
                </div>
            </li>`
    }))
   if(incompleteData.length > 0){
    tudoList.innerHTML = lists
   }else {
       tudoList.innerHTML = `<h3>Please Insert Your Task</h3>`
   }
}

const addItems = () => {
    const addData = (e) => {
        e.preventDefault()
        if(inputField.value){
            incompleteData.unshift(inputField.value)
            setToLocalStroage('incompleteData',incompleteData)
            displayItems(incompleteData)
            inputField.value = ''
        }else {
            alert('Please Provide your item')
        }
    }
    
    submitButton.addEventListener('click', (e) => {
        if(submitButton.innerText === 'Add'){
            addData(e)
        }
    })
}

const removeItems = () => {
    tudoList.addEventListener('click', (e) => {
        let target = e.target
        if(target.innerText === 'Delete'){
            let index = target.getAttribute('data-index')
            incompleteData.splice(index, 1)
            setToLocalStroage('incompleteData', incompleteData)
            displayItems(incompleteData)
        }
    })
}

const editItems = () => {
    tudoList.addEventListener('click', (e) => {
        let target = e.target
        if(target.innerText === 'Edit'){
            let index = target.getAttribute('data-index')
            let currentValue = target.parentElement.parentElement.querySelector('p').innerText;
            inputField.value = currentValue;
            submitButton.innerText = 'Update';

            submitButton.addEventListener('click', (e) => {
                if(submitButton.innerText === 'Update'){
                    e.preventDefault()
                    incompleteData.splice(index,1,inputField.value)
                    setToLocalStroage('incompleteData',incompleteData)
                    displayItems(incompleteData)
                    inputField.value = ''
                    submitButton.innerText = 'Add'
                 }
            })
        }
    })
}
    
displayItems(incompleteData);
addItems();
removeItems();
editItems()




let completedData = getFromLocalstroage('completedData') || [];

const completedList = document.querySelector('.compeled-list');

const displayCompletedItems = () => {
    let list = '';
    completedData.forEach((item,index) => {
        list += `
        <li class="tudo-item completed-item">
            <p>${item}</p>
            <span class="material-icons-outlined">
            done
        </span>
        </li>
        `
    })
    if(completedData.length > 0){
        completedList.innerHTML = list
    }else {
        completedList.innerHTML = `<h3>You Haven't Completed Any Task Yet</h3>`
    }
}

const makeCompletedItem = () => {
    tudoList.addEventListener('click', (e) => {
        let target = e.target
        if(target.innerText === 'Done'){
            let index = target.getAttribute('data-index')
            let text = incompleteData[index]
            incompleteData.splice(index, 1)
            setToLocalStroage('incompleteData', incompleteData)
            displayItems(incompleteData)

            completedData.push(text)
            setToLocalStroage('completedData', completedData)
            displayCompletedItems()
            showDeleteButton(completedData,deleteAll)
        }
    })
}

makeCompletedItem()
displayCompletedItems()

function showDeleteButton(data, element){
    if(data.length === 0){
        element.style.display = 'none'
     }else {
         element.style.display = 'block'
     }
}

showDeleteButton(completedData, deleteAll)

deleteAll.addEventListener('click', () => {
    completedData = []
    setToLocalStroage('completedData',completedData)
    displayCompletedItems()
    showDeleteButton(completedData, deleteAll)
})
