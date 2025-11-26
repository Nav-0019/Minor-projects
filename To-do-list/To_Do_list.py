class To_Do:
    def __init__(self):
        self.tasks = []
    
    def add_task(self, task, due_date=None, priority='Medium'):
        self.tasks.append({
            'task': task,
            'due_date': due_date,
            'priority': priority,
            'status': 'Pending'
        })
        print(f'Task added: {task}')

    def view_tasks(self):
        if not self.tasks:
            print("No tasks available.")
        else:
            print("\nTo-Do List:")
            for i, task in enumerate(self.tasks, 1):
                print(f"{i}. {task['task']} - {task['priority']} - {task['status']}" + (f" (Due: {task['due_date']})" if task['due_date'] else ""))

    def mark_done(self, task_number):
        if 0 < task_number <= len(self.tasks):
            self.tasks[task_number - 1]['status'] = 'Completed'
            print(f"Task '{self.tasks[task_number - 1]['task']}' marked as completed!")
        else:
            print("Invalid task number!")

    def delete_task(self, task_number):
        if 0 < task_number <= len(self.tasks):
            removed_task = self.tasks.pop(task_number - 1)
            print(f"Task '{removed_task['task']}' deleted.")
        else:
            print("Invalid task number!")
    

def To_Do_list():
    to_do = To_Do()
    while True:
        print("\nOptions: \n\n1) Add Task  \n2) View Tasks  \n3) Mark as Done  \n4) Delete Task  \n5) Exit")
        choice = input("Choose an option (1-5): ")
        
        if choice == '1':
            task = input("Enter task: ")
            due_date = input("Enter due date (optional): ") or None
            priority = input("Enter priority (Low/Medium/High, default: Medium): ") or 'Medium'
            to_do.add_task(task, due_date, priority)
        elif choice == '2':
            to_do.view_tasks()
        elif choice == '3':
            to_do.view_tasks()
            to_do.mark_done(int(input("Enter task number to mark as completed: ")))
        elif choice == '4':
            to_do.view_tasks()
            to_do.delete_task(int(input("Enter task number to delete: ")))
        elif choice == '5':
            print("Thankyou for using the To-Do List!")
            break
        else:
            print("Invalid choice!")

if __name__ == "__main__":
    To_Do_list()
