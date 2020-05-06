import React, {Component} from 'react';

export class Projects extends Component{
  render(){
    return (
        <div>
            <div class="project">
                <a href="https://www.github.com/syang1297/Bank_Teller">
                    <img alt="proj" class="project img" src={require("../Images/bankTeller.jpeg")}/>
                </a>
            <div class="project desc"> Project to model an actual bank system using SQL, JDBC, and Java. Implemented functions such as create customer, create account, and print monthly statement.</div>
            </div>

            <div class="project">
                <a href="https://www.github.com/syang1297/KOS">
                    <img alt="proj" class="project img" src={require("../Images/os.jpeg")}/>
                </a>
            <div class="project desc">Operating system modeled after Linux. Implemented system calls susch as fork, exec, and getpid.</div>
            </div>
        </div>
    );
  }
}

export default Projects;