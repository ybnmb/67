// 计算器变量
let currentOperand = '0';
let previousOperand = '';
let operation = null;
let shouldReset = false;

// 获取元素
const currentDisplay = document.getElementById('currentOperand');
const previousDisplay = document.getElementById('previousOperand');

// 更新显示
function updateDisplay() {
    currentDisplay.textContent = currentOperand;
    previousDisplay.textContent = previousOperand;
}

// 添加数字
function appendNumber(number) {
    if (shouldReset) {
        currentOperand = '';
        shouldReset = false;
    }
    
    // 防止多个点
    if (number === '.' && currentOperand.includes('.')) {
        return;
    }
    
    // 防止多个前导零
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
        return;
    }
    
    currentOperand += number;
    updateDisplay();
}

// 添加运算符
function appendOperator(op) {
    if (operation !== null && !shouldReset) {
        calculate();
    }
    
    operation = op;
    previousOperand = currentOperand + ' ' + op;
    shouldReset = true;
    updateDisplay();
}

// 计算结果
function calculate() {
    if (operation === null || shouldReset) {
        return;
    }
    
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    if (isNaN(prev) || isNaN(current)) {
        return;
    }
    
    let result;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('除数不能为 0');
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    
    // 处理浮点数精度
    result = Math.round(result * 1000000000) / 1000000000;
    
    previousOperand = result.toFixed(10).replace(/\.?0+$/, '');
    currentOperand = previousOperand;
    operation = null;
    shouldReset = true;
    updateDisplay();
}

// 清除全部
function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = null;
    shouldReset = false;
    updateDisplay();
}

// 删除最后一个
function deleteLast() {
    if (shouldReset) {
        currentOperand = '0';
        return;
    }
    
    currentOperand = currentOperand.slice(0, -1);
    if (currentOperand === '' || currentOperand === '-') {
        currentOperand = '0';
    }
    updateDisplay();
}

// 键盘支持
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber('.');
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        appendOperator(e.key);
    } else if (e.key === '%') {
        appendOperator('%');
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        clearAll();
    }
});
