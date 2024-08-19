
1.Write API to create Mentor

2.Write API to create Student

3.Write API to Assign a student to Mentor

Select one mentor and Add multiple Student

A student who has a mentor should not be shown in List

4.Write API to Assign or Change Mentor for particular Student

Select One Student and Assign one Mentor

5.Write API to show all students for a particular mentor

Base URL https://zen-assign-mentors.herokuapp.com

Mentor Api's
GET          /mentor 
POST         /create 

Student Api's
GET           /student
POST          /create
To get list of students whose mentors weren't assigned

GET          /no-mentor
To assign Mentor for student

PUT       /mentor/:mentorId/student/:studentId
To assign mentors for multiple Students

PUT       mentor/:mentorId
To Assign or Change Mentor for particular student

Pass Mentor ID in request Body

PUT       /mentor/:mentorId/:studentId
To Assign mentor for multiple students

Pass Mentor ID and Student ID as list in student fro particular mentor

GET        /mentor/:mentorId/student
To get all previous mentor for particular student

GET          /:studentId/previous-mentor
