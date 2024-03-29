import { ethers } from 'ethers';
import json from '../artifacts/contracts/OnChainDiploma.sol/OnChainDiploma.json'
import { OnChainDiploma } from '../typechain-types';
import constants from '../scripts/constants.json'

export default class OnChainDiplomaSDK {
    contract: OnChainDiploma

    constructor(address?: string, signerOrProvider?: ethers.Signer | ethers.providers.Provider) {
        if (address == undefined)
            address = constants.addresses.onChainDiploma
        this.contract = new ethers.Contract(address, json.abi, signerOrProvider ? signerOrProvider : new ethers.providers.JsonRpcProvider()) as unknown as OnChainDiploma
    }

    addNewStudents = async (students: Student[]) => {
        return await this.contract.addNewStudents(students)
    }

    getStudentById = async (id: number) => {
        return await this.contract.students(id)
    }

    changeStatusToGraduate = async (ids: number[]) => {
        return await this.contract.changeStudentStatusGraduate(ids)
    }

    changeStatusToExpelled = async (ids: number[]) => {
        return await this.contract.changeStudentStatusExpelled(ids)
    }

    registerUniversity = async (address: string, name: string) => {
        return await this.contract.registerUniversity(address, name)
    }

    isStudentGraduated = async (id: number) => {
        return await this.contract.isStudentGraduated(id)
    }

    makeStudent = (fio: string, photo: string, birthday: number, directionOfStudyCode: string, qualification: AcademicQualification): Student => {
        return {
            fio,
            photo,
            birthday,
            directionOfStudyCode,
            universityAddress: '',
            qualification,
            id: 0,
            status: StudentStatus.student,
        }
    }
}


export enum StudentStatus {
    student,
    expelled,
    academy,
    graduate
}
export enum AcademicQualification {
    bachelor,
    magistracy,
    specialist
}

export type Student = {
    id: number;
    fio: string;
    photo: string;
    birthday: number;
    directionOfStudyCode: string;
    universityAddress: string;
    status: StudentStatus;
    qualification: AcademicQualification;
}

