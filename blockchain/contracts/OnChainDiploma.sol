// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.0;

// Uncomment this line to use console.log
import "hardhat/console.sol";

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract OnChainDiploma is Ownable {
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

    enum Faculty {
        O,
        E,
        I,
        R,
        A
    }

    uint bachelorSec = 118195200;
    uint specialistSec = 149731200;
    uint magistracySec = 55036800;

    struct Student {
        uint id;
        string name;
        string secondName;
        string thirdName;
        uint start;
        uint end;
        string photo;
        uint birthday;
        string directionOfStudyCode;
        Faculty faculty;
        StudentStatus status;
        AcademicQualification qualification;
    }

    mapping(uint => Student) students;

    uint private studentsCounter = 0;

    constructor(bool isDev,uint _bachelorSec,uint _specialistSec, uint _magistracySec ) {
        if(isDev){
            bachelorSec = _bachelorSec;
            specialistSec = _specialistSec;
            magistracySec = _magistracySec;
        }
    }

    function addNewStudents(Student[] memory newStudents) public {
        uint len = newStudents.length;
        for (uint i = 0; i < len; i++) {
            // require(newStudents[i].start >= block.timestamp,"addNewStudents: start < block.timestamp");
            uint sec = newStudents[i].qualification == AcademicQualification.bachelor ? bachelorSec 
            : newStudents[i].qualification == AcademicQualification.magistracy ? magistracySec 
            : specialistSec;
            newStudents[i].end = newStudents[i].start + sec;
            newStudents[i].status == StudentStatus.student;
            students[studentsCounter++] = newStudents[i];
        }
    }

    function getStudentById(uint id) public view returns(Student memory){
        return students[id];
    }

    function changeStatusToGraduate(uint[] calldata ids) public {
        uint len = ids.length;
        for (uint i = 0; i < len; i++) {
            require(students[ids[i]].end < block.timestamp,'changeStatusGraduate: it is too early');
            students[ids[i]].status = StudentStatus.graduate;
        }
    }
}