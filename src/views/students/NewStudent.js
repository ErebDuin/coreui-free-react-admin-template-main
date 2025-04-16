import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    CCard,
    CCardHeader,
    CContainer,
    CRow,
    CCol,
    CCardBody,
    CForm,
    CFormInput,
    CFormLabel,
    CButton,
    CAlert,
    
  } from '@coreui/react'

  
  const NewStudent = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState(null)
    const [major, setMajor] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
  
    const handleSave = async (e) => {
      e.preventDefault()

      if (!firstName || !lastName || !email || !age || !major) {
        setError('All fields are required')
        return
      }

      const idRegex = /^[1-9]\d*$/
      const nameRegex = /^.{3,15}$/
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const ageRegex = /^(1[89]|[2-9]\d|1[0-4]\d|150)$/
      const majorTypes = ['ART', 'MATH', 'ECONOMICS']


      if (!nameRegex.test(firstName)) {
        setError('First name must be between 3 and 15 characters')
        return
      }

      if (!nameRegex.test(lastName)) {
        setError('Last name must be between 3 and 15 characters')
        return
      }

      if (!emailRegex.test(email)) {
        setError('Invalid email')
        return
      }

      if (!ageRegex.test(age)) {
        setError('Age must be between 18 and 150')
        return
      }

      if (!majorTypes.includes(major)) {
        setError('Invalid major')
        return
      }

      setLoading(true)
      setError('')
      setSuccess('')
  
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/students', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token,
          },
          body: JSON.stringify({ firstName, lastName, email, age, major }),
        })
        if (response.status === 200) {
            setSuccess('Student added successfully')
            clearInputFealds()
        } else {
          setError('Failed to add student')
        }
      } catch (error) {
        setError('An error occurred while adding the student')
      } finally {
        setLoading(false)
      }
    }

    const clearInputFealds = () => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setAge('')
        setMajor('')
    }

    const handleInputChange = () => {
        setLoading(false)
        setError('')
        setSuccess('')
      }
  
    return (
      <CContainer>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>New Student</CCardHeader>
              <CCardBody>
                {success && <CAlert color="success">{success}</CAlert>}
                {error && <CAlert color="danger">{error}</CAlert>}
                <CForm onSubmit={handleSave}>
                  <CFormLabel htmlFor="firstName">First Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); handleInputChange(); }}
                    placeholder='Enter first name'
                  />
                  <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
                  <CFormInput
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); handleInputChange(); }}
                    placeholder='Enter last name'
                  />
                  <CFormLabel htmlFor="email">Email</CFormLabel>
                  <CFormInput
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); handleInputChange(); }}
                    placeholder='Enter email'
                  />
                  <CFormLabel htmlFor="age">Age</CFormLabel>
                  <CFormInput
                    type="text"
                    id="age"
                    value={age}
                    onChange={(e) => { setAge(e.target.value); handleInputChange(); }}
                    placeholder='Enter age'
                  />
                  <CFormLabel htmlFor="major">Major</CFormLabel>
                  <CFormInput
                    type="text"
                    id="major"
                    value={major}
                    onChange={(e) => { setMajor(e.target.value.toUpperCase()); handleInputChange(); }}
                    placeholder='Enter major'
                  />
                  <div style={{ justifyContent: 'center', display: 'flex', marginTop: '15px' }}>
                    <CButton type="submit" color="primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save'}
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    )
  }
  
  export default NewStudent