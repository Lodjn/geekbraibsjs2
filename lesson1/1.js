console.clear();

function Container() {
    this.id = "";
    this.className = "";
    this.htmlCode = "";
}
Container.prototype.render = function() {
    return this.htmlCode;
};
Container.prototype.remove = function() {
    return document.getElementById(this.id).remove();
};


function Menu(myId, myClass, myItems, mySubtype) {
    Container.call(this);
    this.id = myId;
    this.className = myClass;
    this.items = myItems;
    this.subtype = mySubtype;
}
Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;
Menu.prototype.render = function() {
    var menuList = "";
    for (var i in this.items) {
        menuList += items[i].render(subTypes, items[i].title);
    }
    return "<ul>" + menuList + "</ul>";
}

function MenuItem(id, myHref, myTitle) {
    Container.call(this);
    this.id = id;
    this.className = 'menu_class';
    this.href = myHref;
    this.title = myTitle;

}
MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;
MenuItem.prototype.render = function(subTypes, titleBoss) {
    var menuListSub = "";
    for (var i in subTypes) {
        if(subTypes[i].titleBoss == titleBoss){
            menuListSub += subTypes[i].render();
        }
    }
    return "<li class='" + this.className + "' id='" + this.id + "'><a href='" + this.href + "'> - " + this.title + " - </a><ul>" + menuListSub + "</ul></li>";
};

// constructor унаследованный от Menu создающий подсписок
function subClause(id, myHref, myTitle, myTitleBoss){
    Menu.call(this, id, 'subtype');
    this.title = myTitle;
    this.titleBoss = myTitleBoss;
}
subClause.prototype = Object.create(Container.prototype);
subClause.prototype.constructor = subClause;
subClause.prototype.render = function() {
    return "<li class='" + this.className + "' id='" + this.id + "'><a href='" + this.href + "'> - " + this.title + " - </a></li>";
};

var item1 = new MenuItem('1', '/', 'Главная');
var item2 = new MenuItem('2', '/catalog','Каталог');
var item3 = new MenuItem('3', '/contacts','Контакты');
var items = [item1, item2, item3];

/* 1-ый параметр это id элемента
   2-ой параметр это href ссылка
   3-ый параметр это title текстовое содержимое
   4-ый параметр это title головы, чтобы подтип не выводился у каждого заголовка (можно переделать на id, сделал через title для наглядности)
   */
var subType1 = new subClause('22', '/', 'еще главнее', 'Главная');
var subType2 = new subClause('23', '/', 'Интересные штуки', 'Каталог');
var subType3 = new subClause('24', '/', 'О нас', 'Контакты');
var subTypes = [subType1, subType2, subType3];

var menu = new Menu('my_menu', 'menu_class', items, subTypes);

document.write(menu.render());

/* Запустить для того чтобы удалить элемент, вместо item можно подставить любой другой объект
 содержащий id  */
// item1.remove();