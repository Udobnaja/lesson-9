import {data} from './mock/streets';
import {suggest, Autocomplete} from './modules/suggest/index';



const input = document.getElementById('input');

const autocomplete = new Autocomplete(document.getElementById('autocomplete'), 'input__autocomplete_show', 10, data);

input.onkeyup = function (e) {
    autocomplete.suggest(this.value, e);
};

const clear = document.getElementById('clear-search');

clear.addEventListener('click', function () {
    // TODO: проверь не потекли ли методы в классе, скорее всего да
    input.value = '';
    autocomplete.hide();
    input.focus();
});