package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// 加法
func add(a, b float64) float64 {
	return a + b
}

// 减法
func subtract(a, b float64) float64 {
	return a - b
}

// 乘法
func multiply(a, b float64) float64 {
	return a * b
}

// 除法
func divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, fmt.Errorf("除数不能为 0")
	}
	return a / b, nil
}

// 计算器函数
func calculator() {
	fmt.Println("=== 简单计算器 ===")
	fmt.Println("支持操作：加(+) 减(-) 乘(*) 除(/)")
	fmt.Println("退出：q 或 quit")
	fmt.Println()

	scanner := bufio.NewReader(os.Stdin)
	for {
		fmt.Print("请输入算式 (如 1 + 2): ")
		line, scanErr := scanner.ReadString('\n')
		if scanErr != nil {
			fmt.Println("错误读取", scanErr)
			continue
		}

		line = strings.TrimSpace(line)
		line = strings.Trim(line, "\n")

		// 退出判断
		if line == "q" || line == "quit" || line == "Q" {
			fmt.Println("再见！")
			return
		}

		// 解析算式
		parts := strings.Fields(line)
		if len(parts) != 3 {
			fmt.Println("格式错误，请重新输入 (格式：数字 符号 数字)")
			continue
		}

		num1, err1 := strconv.ParseFloat(parts[0], 64)
		num2, err2 := strconv.ParseFloat(parts[2], 64)
		operator := parts[1]

		if err1 != nil || err2 != nil {
			fmt.Println("数字格式错误，请输入有效数字")
			continue
		}

		var result float64
		var err error

		switch operator {
		case "+":
			result = add(num1, num2)
		case "-":
			result = subtract(num1, num2)
		case "*":
			result = multiply(num1, num2)
		case "/":
			result, err = divide(num1, num2)
			if err != nil {
				fmt.Println(err)
				continue
			}
		default:
			fmt.Println("不支持的操作符", operator)
			continue
		}

		fmt.Printf("结果: %s %s %s = %.4f\n\n", parts[0], operator, parts[2], result)
	}
}

func main() {
	calculator()
}
