// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";


    enum StudentStatus {
        student,
        expelled,
        academy,
        graduate
    }

    enum AcademicQualification {
        bachelor,
        magistracy,
        specialist
    }


contract OnChainDiploma is Ownable, AccessControlEnumerable {

    bytes32 University = keccak256(abi.encodePacked('University')); 


    struct Student {
        uint id;
        string fio;
        string photo;
        uint birthday;
        string directionOfStudyCode;
        address universityAddress;
        StudentStatus status;
        AcademicQualification qualification;
    }

    mapping(address => string) public universityNames;
    mapping(uint => Student) public students;

    uint public studentsCounter = 0;
    uint public universityCounter = 0;

    function getStudentsCounter() public view returns(uint){
        return studentsCounter;
    }

    Student[] public allStudents;

    function getAllStudents() public view returns(Student[] memory){
        return allStudents;
    }

    constructor(string memory name) {
        registerUniversity(msg.sender, name);
    }

    function registerUniversity(address universityAddress, string memory name) public onlyOwner {
        _grantRole(University,universityAddress);
        universityNames[universityAddress] = name;
    }

    function addNewStudents(Student[] memory newStudents) public onlyRole(University) {
        uint len = newStudents.length;
        for (uint i = 0; i < len; i++) {
            uint studentId = studentsCounter++;
            newStudents[i].id = studentId;
            newStudents[i].universityAddress = msg.sender;
            students[studentId] = newStudents[i];
            allStudents.push(newStudents[i]);
        }
    }

    function updateStudent(Student memory student) public onlyRole(University) {
        require(student.universityAddress == msg.sender, 'not your student');
        students[student.id] = student;
    }

    function isStudentGraduated(uint id) public view returns(bool){
        return students[id].status == StudentStatus.graduate;
    }

    function changeStudentStatusGraduate(uint[] calldata ids) public onlyRole(University){
        _changeStatus(ids,StudentStatus.graduate);
    }

    function changeStudentStatusExpelled(uint[] calldata ids) public onlyRole(University){
        _changeStatus(ids,StudentStatus.expelled);
    }

    function _changeStatus(uint[] calldata ids, StudentStatus status) private {
        uint len = ids.length;
        for (uint i = 0; i < len; i++) {
            require(students[ids[i]].universityAddress == msg.sender,'changeStatusGraduate: its not your student');
            students[ids[i]].status = status;
        }
    }
}