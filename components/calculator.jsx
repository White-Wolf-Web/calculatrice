"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";

export default function Calculator() {
	const [calculation, setCalculation] = useState("");
	const [result, setResult] = useState("");
	const [displayedResults, setDisplayedResults] = useState(false);

	const handleDigit = (digit) => {
		setCalculation((prevCalculation) => {
			if (displayedResults) {
				setDisplayedResults(false);
				return digit;
			} else {
				return prevCalculation === "0" ? digit : prevCalculation + digit;
			}
		});
	};

	const handleOpenParenthesis = () => {
		setCalculation((prevCalculation) => prevCalculation + "(");
	};

	const handleCloseParenthesis = () => {
		setCalculation((prevCalculation) => prevCalculation + ")");
	};

	const handleSquareRoot = () => {
		setCalculation((prevCalculation) => {
			try {
				const result = Math.sqrt(eval(prevCalculation)).toString();
				return result;
			} catch (error) {
				return "Error";
			}
		});
	};

	const handleSquare = () => {
		setCalculation((prevCalculation) => {
			try {
				const result = (eval(prevCalculation) ** 2).toString();
				return result;
			} catch (error) {
				return "Error";
			}
		});
	};

	const handleOperator = (operator) => {
		setCalculation((prevCalculation) => {
			if (displayedResults) {
				setDisplayedResults(false);
				return result + operator;
			} else if (prevCalculation === "") {
				return prevCalculation;
			} else if (prevCalculation.endsWith(operator)) {
				return prevCalculation;
			} else {
				return prevCalculation + operator;
			}
		});
	};

	const handleDecimal = () => {
		setCalculation((prevCalculation) => {
			if (!prevCalculation.includes(".")) {
				return prevCalculation + ".";
			}
			return prevCalculation;
		});
	};

	const calculateResult = () => {
		try {
			const calculatedResult = eval(calculation).toString();
			setResult(calculatedResult);
			setCalculation(calculatedResult);
			setDisplayedResults(true);
		} catch (error) {
			setResult("Error");
		}
	};

	const clearAll = () => {
		setCalculation("");
		setResult("");
		setDisplayedResults(false);
	};

	const handlePercentage = () => {
		setCalculation((prevCalculation) => {
			return String(Number(prevCalculation) / 100);
		});
	};

	const toggleSign = () => {
		setCalculation((prevCalculation) => {
			if (prevCalculation.startsWith("-")) {
				return prevCalculation.substring(1);
			} else {
				return "-" + prevCalculation;
			}
		});
	};

	return (
		<div className={styles.calculator}>
			<div className={styles.display}>
				<p className={styles.calculation}>{calculation}</p>
				<p className={styles.result}>{result || 0}</p>
			</div>
			<div className={styles.grid}>
				<button onClick={clearAll}>C</button>
				<button onClick={toggleSign}>-/+</button>
				<button onClick={handleOpenParenthesis}>(</button>
				<button onClick={handleCloseParenthesis}>)</button>
				<button onClick={handlePercentage}>%</button>
				<button onClick={handleSquareRoot}>√</button>
				<button onClick={handleSquare}>x²</button>
				<button onClick={() => handleOperator("+")}>+</button>
				<button onClick={() => handleDigit("7")}>7</button>
				<button onClick={() => handleDigit("8")}>8</button>
				<button onClick={() => handleDigit("9")}>9</button>
				<button onClick={() => handleOperator("-")}>-</button>
				<button onClick={() => handleDigit("4")}>4</button>
				<button onClick={() => handleDigit("5")}>5</button>
				<button onClick={() => handleDigit("6")}>6</button>
				<button onClick={() => handleOperator("*")}>x</button>
				<button onClick={() => handleDigit("1")}>1</button>
				<button onClick={() => handleDigit("2")}>2</button>
				<button onClick={() => handleDigit("3")}>3</button>
				<button onClick={() => handleOperator("/")}>/</button>
				<button onClick={() => handleDigit("0")}>0</button>
				<button onClick={handleDecimal}>.</button>
				<button onClick={calculateResult}>=</button>
			</div>
		</div>
	);
}