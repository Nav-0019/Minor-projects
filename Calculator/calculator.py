class calculator:
    def __init__(self):
        self.history = []
        self.current_expression = ""
        self.result = None

    def add(self, a, b):
        self.result = a + b
        self.history.append(f"{a} + {b} = {self.result}")
        return self.result
    
    def subtract(self, a, b):
        self.result = a - b
        self.history.append(f"{a} - {b} = {self.result}")
        return self.result
    
    def multiply(self, a, b):
        self.result = a * b
        self.history.append(f"{a} * {b} = {self.result}")
        return self.result
    
    def divide(self, a, b):
        if b == 0:
            return "Cannot divide by zero!"
        self.result = a / b
        self.history.append(f"{a} / {b} = {self.result}")
        return self.result
    
    def view_history(self):
        for i, item in enumerate(self.history, start=1):
            print(f"{i}. {item}")
        else:
            if not self.history:
                print("No history available!")
        
    def clear_history(self):
        self.history = []
        print("History cleared!")

    


def calculator_app():
    calc = calculator()
    while True:
        print("\nOptions: \n\n1) Add  \n2) Subtract  \n3) Multiply  \n4) Divide  \n5) View History  \n6) Clear History  \n7) Exit")
        try:
            choice = input("Choose an option (1-7): ")
            def get_numbers():
                try:
                    a = float(input("Enter first number: "))
                    b = float(input("Enter second number: "))
                    return a, b
                except ValueError:
                    print("Invalid input! Please enter valid numbers.")
                    return None, None
            if choice == '1':
                a, b = get_numbers()
                print(f"Result: {calc.add(a, b)}")
            elif choice == '2':
                a, b = get_numbers()
                print(f"Result: {calc.subtract(a, b)}")
            elif choice == '3':
                a, b = get_numbers()
                print(f"Result: {calc.multiply(a, b)}")
            elif choice == '4':
                a, b = get_numbers()
                print(f"Result: {calc.divide(a, b)}")
            elif choice == '5':
                calc.view_history()
            elif choice == '6':
                calc.clear_history()
            elif choice == '7':
                print("Thankyou for using the Calculator!")
                break
            else:
                print("Invalid choice!")
        except ValueError:
            print("Invalid input! Please enter a number.")
    
if __name__ == "__main__":
    calculator_app()