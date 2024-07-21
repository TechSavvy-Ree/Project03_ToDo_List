import inquirer from "inquirer";
import chalk from "chalk";
import Choices from "inquirer/lib/objects/choices.js";

let todoList: string[] = [];
let conditions = true;

// Print Welcome Message
console.log(chalk.bold.whiteBright(`\n \t<<<========================================>>>`))
console.log(chalk.magenta.bold    (`\n \t\t Welcome in ToDo-List Application`));
console.log(chalk.bold.whiteBright(`\n \t<<<========================================>>>`));

let main = async() =>{
    while(conditions){
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option you want to do:",
                choices: [
                    {value: "Add Task"}, 
                    {value: "View Todo-List"},
                    {value: "Update Task"}, 
                    {value: "Delete Task"}, 
                    {value:"Exit"}
                ],
            }
        ]);
        if(option.choice === "Add Task"){
            await addTask();
        }
        else if(option.choice === "View Todo-List"){
            await viewTask();
        }
        else if (option.choice === "Update Task"){
            await updateTask();
        }
        else if(option.choice === "Delete Task"){
            await deleteTask();
        }
        else if(option.choice === "Exit"){
            conditions = false;
        }

    }
}
// Function to add new task in the list
let addTask = async() =>{
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: chalk.green("Enter Your Task :")
        }
    ]);
     todoList.push(newTask.task);    // it push the added task in an array 
console.log(`\n "${chalk.cyanBright.bold(newTask.task)}" Task added in ToDO-List Successfully\n`);
}

//Funtion to view all Todo-List
let viewTask = () =>{
    console.log("\n Your Todo-List:\n");
    todoList.forEach((task,index) =>{
        console.log(`${index+1}: ${task}`);
    }) 
}
//  Function to update the Task
let updateTask = async() =>{
    await viewTask();
    let update_task_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index-no. of the Task you want to update:",
        },
        {
            name: "new_task",
            type: "input",
            message: "Now, Enter the updated task name:",

        }
    ]);
    todoList[update_task_index.index-1] = update_task_index.new_task;
    console.log(`\n Task at index-no. ${update_task_index.index-1} updated successfully. [For view the updated list please go to "View Todo-List" option]`);
    
}

// Function to delete a task from list
let deleteTask = async() =>{
    await viewTask()
    let taskIndex =await inquirer.prompt([
        {
            name: "Index",
            type: "number",
            message: "Enter the Index no. to delete the task:",
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.Index-1, 1);
    console.log(`\n ${deletedTask} task has been deleted successfully from your Todo-List`);   
}

main();