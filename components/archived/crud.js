<div id="todo-list">
  <div id="controls">
    <form id="todo-form">
      <select id="item-prio">
        <option value="1">1 (Low)</option>
        <option value="2">2</option>
        <option value="3">3 (Medium)</option>
        <option value="4">4</option>
        <option value="5">5 (High)</option>
      </select>
      <input id="item-text" type="text" />
      <input id="add-button" type="submit" value="Toevoegen" />
    </form>
  </div>
  <div id="list">

  </div>
  <div id="clear-controls">
    <form>
      <input id="remove-checked" type="button" value="Verwijder Gecheckte Items" />
      <input id="remove-all" type="button" value="Verwijder alles" />
    </form>
  </div>
</div>


//code modified from: https://codepen.io/ImagineProgramming/pen/Ypader?editors=1010

var makeItems = function() {
  return {
    lastId: 1,
    items: [
      {
        text: "Maak nieuw TODO-item! Hoge prio!",
        priority: 4,
        id: 1
      }
    ]
  };
};


var loadItems = function() {
  var raw = localStorage.getItem("todo-items");
  if(typeof raw !== "string") {
    return null;
  }
  
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
};

var saveItems = function(object) {
  var raw = JSON.stringify(object);
  localStorage.setItem("todo-items", raw);
}

var addItem = function(object, text, prio) {
  object.lastId += 1;
  
  object.items.push({
    id: object.lastId,    
    text: text,           
    priority: prio        
  });
  
  saveItems(object);
};


var findItemIndex = function(object, id) {
  for(var i = 0; i < object.items.length; i += 1) {
    if(object.items[i].id === id) {
      return i;
    }
  }  
  return -1;
};

var removeItem = function(object, id) {
  var index = findItemIndex(object, id);
  if(index !== -1) {
    object.items.splice(index, 1);
    saveItems(object);
  }
};

var checkItem = function(object, id) {
  var index = findItemIndex(object, id);

  if(index !== -1) {
    object.items[index].priority = -1;
    saveItems(object);
  }
};

var removeCheckedItems = function(object) {
  for(var i = (object.items.length - 1); i >= 0; i -= 1) {
    if(object.items[i].priority === -1) {
      object.items.splice(i, 1);
    }
  }
  saveItems(object);
}

function showTodoList(object) {
  object.items.sort(function(a, b) {
    return b.priority - a.priority;
  });
  
  var listElement = $("#list");
  listElement.html("");
  
  for(var i = 0; i < object.items.length; i += 1) {
    var huidigeItem = object.items[i];
    
    var nieuwItemElement = $('<div class="item"></div>');
    nieuwItemElement.text(huidigeItem.text);
    nieuwItemElement.addClass("priority" + huidigeItem.priority);

    var checkKnop = $('<input class="check-button" type="button" value="Check" />');
    checkKnop.attr("data-id", huidigeItem.id);

    var verwijderKnop = $('<input class="delete-button" type="button" value="verwijder" />');
    verwijderKnop.attr("data-id", huidigeItem.id);
    
    nieuwItemElement.append(checkKnop);
    nieuwItemElement.append(verwijderKnop);
    
    listElement.append(nieuwItemElement);
  }
  
}

$(function() {
  var todoObject = loadItems();
  
  if(todoObject == null) {
    todoObject = makeItems();
    saveItems(todoObject);
  }
  
  $('body').on('click', '.delete-button', function() {
    if(confirm("Weet je het zeker?")) {
      removeItem(todoObject, +$(this).attr('data-id'));
      showTodoList(todoObject);
    }
  });
  
  $('body').on('click', '.check-button', function() {
    checkItem(todoObject, +$(this).attr('data-id'));
    showTodoList(todoObject);
  });
  
  $('#todo-form').submit(function(e) {
    var prio = +$("#item-prio").val(); 
    var text = $("#item-text").val();
    
    if(text.trim() !== "") {
      addItem(todoObject, text, prio);
      showTodoList(todoObject);
    }
    
    $('#item-text').val('');
    e.preventDefault();
  });
  
  $('#remove-checked').click(function() {
    if(confirm("Weet je het zeker?")) {
      removeCheckedItems(todoObject);
      showTodoList(todoObject);
    }
  });
  
  $('#remove-all').click(function() {
    if(confirm("Weet je het zeker?")) {
      todoObject = makeItems();
      saveItems(todoObject);
      showTodoList(todoObject);
    }
  });
  showTodoList(todoObject);
});