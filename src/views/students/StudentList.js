import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CContainer,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CButtonGroup,
} from "@coreui/react";
import $ from "jquery";
import "gasparesganga-jquery-loading-overlay";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            if (!token) {
                console.error("No token found");
                return;
            }

            setIsLoading(true);
            $("#CCard").LoadingOverlay("show", { scale: 0.2 });

            try {
                const response = await fetch(`http://localhost:8084/students?page=${page}`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'token': token,
                    },
                });

                if (response.status === 401) {
                    console.error("Unauthorized");
                    return;
                }

                const data = await response.json();
                setStudents(data);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Error fetching students", error);
            } finally {
                setIsLoading(false);
                $("#CCard").LoadingOverlay("hide", { scale: 0.5 });
            }
        };

        fetchStudents();
    }, [page, token]);

    const handleDelete = (id) => {
        setStudentToDelete(id);
        setIsModalVisible(true);
    };

    const confirmDelete = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/students?id=${studentToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token,
                },
            });

            if (response.status === 200) {
                setStudents(students.filter(student => student.id !== studentToDelete));
            } else {
                console.error("Failed to delete student");
            }
        } catch (error) {
            console.error("Error deleting student", error);
        } finally {
            setIsModalVisible(false);
            setStudentToDelete(null);
        }
    };

    const cancelDelete = () => {
        setIsModalVisible(false);
        setStudentToDelete(null);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
          setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <CContainer>
            <CRow>
                <CCol>
                    <CCard id="CCard">
                        <CCardHeader>Student List</CCardHeader>
                        <CCardBody>
                            <CTable>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell>Student ID</CTableHeaderCell>
                                        <CTableHeaderCell>First Name</CTableHeaderCell>
                                        <CTableHeaderCell>Last Name</CTableHeaderCell>
                                        <CTableHeaderCell>Email</CTableHeaderCell>
                                        <CTableHeaderCell>Age</CTableHeaderCell>
                                        <CTableHeaderCell>Major</CTableHeaderCell>
                                        <CTableHeaderCell>GPA</CTableHeaderCell>
                                        <CTableHeaderCell>Actions</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {students.map((student) => (
                                        <CTableRow key={student.id}>
                                            <CTableDataCell>{student.id}</CTableDataCell>
                                            <CTableDataCell>{student.firstName}</CTableDataCell>
                                            <CTableDataCell>{student.lastName}</CTableDataCell>
                                            <CTableDataCell>{student.email}</CTableDataCell>
                                            <CTableDataCell>{student.age}</CTableDataCell>
                                            <CTableDataCell>{student.major}</CTableDataCell>
                                            <CTableDataCell>{student.gpa}</CTableDataCell>
                                            <CTableDataCell>
                                                <CButtonGroup className="d-flex justify-content-between gap-2">
                                                    <CButton color="primary" onClick={() => navigate(`/dashboard/newStudent?id=${student.id}`)}>
                                                        Edit
                                                    </CButton>
                                                    <CButton color="danger" onClick={() => handleDelete(student.id)}>
                                                        Delete
                                                    </CButton>
                                                </CButtonGroup>
                                            </CTableDataCell>
                                        </CTableRow>
                                    ))}
                                </CTableBody>
                            </CTable>
                            <div className="d-flex justify-content-between">
                            <CButton type="button" color="info" onClick={handlePreviousPage} disabled={page === 0}>
                                    Previous Page
                                </CButton>
                                <CButton type="button" color="info" onClick={handleNextPage} disabled={page === totalPages - 1}>
                                    Next Page
                                </CButton>
                            </div>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>

            <CModal visible={isModalVisible} onClose={cancelDelete}>
                <CModalHeader>
                    <CModalTitle>Confirm Deletion</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    Are you sure you want to delete this student?
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={cancelDelete}>
                        Cancel
                    </CButton>
                    <CButton color="danger" onClick={confirmDelete}>
                        Delete
                    </CButton>
                </CModalFooter>
            </CModal>
        </CContainer>
    );
};

export default StudentList;