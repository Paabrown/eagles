const dotenv = require('dotenv').config();
const gclass = require('./../gclass/gclass.js');

var exampleProfile;
var exampleCourses

describe('Get first valid class', () => {
  // Applies only to tests in this describe block

  beforeEach(() => {
    exampleProfile = {
      id: '113023615147360761759',
      courses: [
        {
          "id": "7975169558",
          "name": "Example",
          "section": "2",
          "descriptionHeading": "Example 2",
          "ownerId": "113023615147360761759",
          "creationTime": "2017-10-03T18:42:57.533Z",
          "updateTime": "2017-10-03T18:42:56.591Z",
          "enrollmentCode": "em74vj7",
          "courseState": "ACTIVE",
          "alternateLink": "http://classroom.google.com/c/Nzk3NTE2OTU1OFpa",
          "teacherGroupEmail": "Example_2_teachers_0c89c763@classroom.google.com",
          "courseGroupEmail": "Example_2_ec09148f@classroom.google.com",
          "teacherFolder": {
              "id": "0By1klvMUz8W2fnlCcklxMFNBNE1xOGV4YUtFRVJEanR3eDV6UnZGUFB5cmUtS0lJRTl3V1k",
              "title": "Example 2",
              "alternateLink": "https://drive.google.com/drive/folders/0By1klvMUz8W2fnlCcklxMFNBNE1xOGV4YUtFRVJEanR3eDV6UnZGUFB5cmUtS0lJRTl3V1k"
          },
          "guardiansEnabled": false,
          "calendarId": "classroom111688772478550726892@group.calendar.google.com"
        },
        {
          "id": "7991479107",
          "name": "cactus",
          "section": "cactus",
          "descriptionHeading": "cactus cactus",
          "ownerId": "113759565923940941388",
          "creationTime": "2017-10-05T00:24:45.447Z",
          "updateTime": "2017-10-05T00:24:44.391Z",
          "enrollmentCode": "lxcjq",
          "courseState": "ACTIVE",
          "alternateLink": "http://classroom.google.com/c/Nzk5MTQ3OTEwN1pa",
          "teacherGroupEmail": "cactus_cactus_teachers_b68dd61c@classroom.google.com",
          "courseGroupEmail": "cactus_cactus_0f0615c6@classroom.google.com",
          "guardiansEnabled": false,
          "calendarId": "classroom109631009975707105705@group.calendar.google.com"
        }
      ],
      access: process.env.EXAMPLE_ACCESS
    }
  });

  test('should be a function', () => {
    console.log(exampleProfile);
    expect(gclass.ForTesting.getFirstValidCourse).toBeInstanceOf(Function)
  });

  test('should find the first course in which user is a teacher', () => {
    expect(gclass.ForTesting.getFirstValidCourse(exampleProfile, exampleProfile.courses, true)).toBe(exampleProfile.courses[0])
  })

  test('should find the first course in which user is a student', () => {
    expect(gclass.ForTesting.getFirstValidCourse(exampleProfile, exampleProfile.courses, false)).toBe(exampleProfile.courses[1])
  })

})
