const log = document.getElementById('log'); // лог не должен быть здесь - не плохо бы иметь собственный класс

export class Autocomplete{

    constructor(node, visibilityClass, limit, data){
        this.node = node;
        this.limit = limit;
        this.data = data;
        this.visibilityClass = visibilityClass;
        this.isVisible = false;
        this.indexStack = []; //*
        this.filteredData = []; //*
    }

    suggest(value, event){
        if (value.trim().length > 0) {
            const filteredStreets = this._filterData(value);

            const slicedFilteredStreets = this._filterSlicedData(value, event);

            if (filteredStreets.length){
                let templateString = '';
                this.clear();

                // наверно не имеет смысла хранить в переменной состояние видимости
                // if (!this.node.classList.contains(visibilityClass)){}

                if (this.isVisible === false){
                    this.show();
                }

                for (const street of filteredStreets){
                    templateString += `<div class="input__autocomplete-item">${street}</div>`;
                }

                this.node.innerHTML = templateString;

            } else {
                this.hide();
            }
        } else {
            this.hide();
            let key = event.keyCode || event.charCode; // а вдруг нет //*
            if (key === 8){
                this.indexStack.pop();
                this.filteredData = [];
            }
        }
    }

    clear(){
        this.node.innerHTML = '';
    }

    hide(){
        this.clear();
        this.isVisible  = false;
        this.node.classList.remove(this.visibilityClass);
    }

    show(){
        this.isVisible  = true;
        this.node.classList.add(this.visibilityClass);
    }

    _filterSlicedData(value, event){
        const start = performance.now();
        // тут пошла наркомания

        let streets = [];
        let key = event.keyCode || event.charCode; // а вдруг нет //*
        const stackLength = this.indexStack.length;

        let data;
        if (key === 8){
            this.indexStack.pop();

            let i = (stackLength > 1) ? this.indexStack[stackLength] - this.indexStack[stackLength - 1] : this.indexStack[stackLength] | 0;

            data = [...this.data.slice(i)];
        } else {
            data = [...this.filteredData, ...this.data.slice((stackLength) ? this.indexStack[stackLength - 1] : 0)];
        }

        let index = (this.filteredData.length > 0 &&  this.filteredData.length < this.limit) ? this.limit : this.filteredData.length;

        for (const street of data){
            if (streets.length >= this.limit) break;

            if (street.toLowerCase().includes(value.toLowerCase())){
                streets.push(street);
            }

            index++;
        }

        if (streets.length > 0 && key !== 8){
            this.indexStack.push(index);
        }
        this.filteredData = streets;

        const end = performance.now();

        log.innerHTML += ` Поиск <span style="color: blueviolet"> slice </span> улиц занял <span style="color: red">${(end - start).toFixed(2)}</span> мс <br> <p class="log__user">Root: ~ User$</p>`;
    }

    _filterData(value){

        const start = performance.now();

        let streets = []; // выделили память на улицы//*

        for (const street of this.data){
            if (streets.length >= this.limit) break;

            if (street.toLowerCase().includes(value.toLowerCase())){ // toLowercase возращает новую строку
                streets.push(street);
            }
         }

        const end = performance.now();

        log.innerHTML += ` Поиск улиц занял <span style="color: red">${(end - start).toFixed(2)}</span> мс <br> <p class="log__user">Root: ~ User$</p>`;
        // можно делать скролл к верху - если силы будут
        return streets;
    }
}

