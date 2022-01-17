class List {
  constructor(name) {
    this.name = name;
    this.list = [];
    this.selectedList = "";
    this.unselectedList = "";
  }

  addTask(task) {
    // let selectedList;
    // let unselectedList;

    // Check with list is active
    if (task.checked) {
      this.selectedList = document.getElementById('completed-tasks-list');
      this.unselectedList = document.getElementById('pending-tasks-list');
    } else {
      this.unselectedList = document.getElementById('completed-tasks-list');
      this.selectedList = document.getElementById('pending-tasks-list');
    }

    // Markup for list items
    let markupHTML = (task) => {
      // Create HTML elements
      let listElement = document.createElement('li');
      let checkboxElement = document.createElement('input');
      let spanElement = document.createElement('span');
      let labelElement = document.createElement('label');
      let inputElement = document.createElement('input');
      let iconCancel = document.createElement('i');
      let iconAccept = document.createElement('i');
      let iconEdit = document.createElement('i');
      let iconDelete = document.createElement('i');

      // Set attributes and values
      listElement.setAttribute('id', task.id);
      listElement.classList.add('list-item');
      checkboxElement.setAttribute('type', 'checkbox');
      checkboxElement.checked = task.checked;
      spanElement.classList.add('input-group');
      spanElement.innerText = task.content;
      labelElement.innerText = 'Task content';
      inputElement.setAttribute('value', task.content);
      iconCancel.classList.add('fas', 'fa-times');
      iconAccept.classList.add('fas', 'fa-check');
      iconEdit.setAttribute('class', 'fas fa-pencil-alt');
      iconDelete.setAttribute('class', 'fas fa-trash-alt');

      // Add event listeners
      checkboxElement.addEventListener('change', () => {
        if (checkboxElement.checked) {
          listElement.classList.add('checked');
          this.unselectedList.append(listElement);
          checkboxElement.checked = true;
          this.setTaskStatus(task.id, true);
          completedList.push(task);
          this.deleteTask(task.id);
        } else {
          listElement.classList.remove('checked');
          this.selectedList.append(listElement);
          checkboxElement.checked = false;
          this.setTaskStatus(task.id, false);
          pendingList.push(task);
          this.deleteTask(task.id);
        }
      });
      iconDelete.addEventListener('click', () => {
        this.deleteTask(task.id);
      });
      iconEdit.addEventListener('click', () => {
        iconEdit.remove();
        spanElement.innerText = "";
        listElement.classList.add("editing");
        spanElement.append(labelElement, inputElement, iconCancel, iconAccept);
      });
      iconCancel.addEventListener('click', () => {
        spanElement.innerText = task.content;
        inputElement.value = task.content;
        labelElement.remove();
        inputElement.remove();
        iconCancel.remove();
        iconAccept.remove();
        listElement.classList.remove("editing");
        spanElement.append(iconEdit);
      });
      iconAccept.addEventListener('click', () => {
        spanElement.innerText = inputElement.value;
        inputElement.value = spanElement.innerText;
        listElement.classList.remove("editing");
        spanElement.append(iconEdit);
        this.editTask(task.id, spanElement.innerText);
      });

      // Append to document
      spanElement.append(iconEdit);
      listElement.append(checkboxElement, spanElement, iconDelete);
      this.selectedList.append(listElement);
    };

    markupHTML(task);
    this.list.push(task);
  }

  editTask(id, content) {
    const taskId = this.list.findIndex(e => e.id === id);
    this.list[taskId].content = content;
  }

  setTaskStatus(id, checked) {
    const taskId = this.list.findIndex(e => e.id === id);
    this.list[taskId].checked = checked;
  }

  deleteTask(id) {
    const taskId = this.list.findIndex(e => e.id === id);
    const selector = document.getElementById(id);
    this.list.splice(taskId, 1);
    selector.remove();
    // console.log(this.list);
  }

  searchTasks(content) {
    const listItems = document.querySelectorAll('.list-item');

    this.list.filter(e => !e.content.toLowerCase().includes(content))
      .forEach(item => {
        document.getElementById(item.id).classList.add('filtered');
      });

    this.list.filter(e => e.content.toLowerCase().includes(content))
      .forEach(item => {
        document.getElementById(item.id).classList.remove('filtered');
      });
  }

  getTasks() {
    return this.list;
  }

}

export default List;