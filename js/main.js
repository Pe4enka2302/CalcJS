// С помощью jQuery получим все кнопки, а поддерживаемые операторы внесем в массив
var keys = $('#calculator span');
var operators = ['+', '-', '*', '/'];
var decimalAdded = false;
//Отслеживаем клик по любой кнопке, запускаем функцию
for(var i = 0; i < keys.length; i++) {
    keys[i].onclick = function(e) {
        try {
            // Получим значение экрана и кнопки
            var input = document.querySelector('.screen');
            var inputVal = input.innerHTML;
            var btnVal = this.innerHTML;

            // Если нажата кнопка C, очищаем экран
            if(btnVal == 'C') {
                input.innerHTML = '';
                decimalAdded = false;
            }

            // Если зажато равно, тогда запишем значение на экарне в переменную и установим ее последний символ
            else if(btnVal == '=') {
                var equation = inputVal;
                var lastChar = equation[equation.length - 1];

                // Если последний символ оператор или точка - удаляем их
                if(operators.indexOf(lastChar) > -1 || lastChar == '.')
                    equation = equation.replace(/.$/, '');

                if(equation)
                    input.innerHTML = eval(equation);

                decimalAdded = false;
            }
            //Если нажатая кнопка - оператор
            else if(operators.indexOf(btnVal) > -1) {
                //установим последний символ на экране
                var lastChar = inputVal[inputVal.length - 1];
                //Если экран пустой или последний символ - не оператор, запишем нажатый оператор на экран
                if(inputVal != '' && operators.indexOf(lastChar) == -1) {
                    input.innerHTML += btnVal;
                }
                //А вот если экран пустой, то мы можем записать только МИНУС, так как нет выражений, начинающихся с +, / или *
                else if(inputVal == '' && btnVal == '-')
                    input.innerHTML += btnVal;



            }

            else {
                input.innerHTML += btnVal;
            }

            e.preventDefault();
        } catch (error) {
            input.innerHTML = "Error!";
        }

    }
}