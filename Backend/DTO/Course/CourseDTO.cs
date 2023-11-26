﻿namespace Backend.DTO.Course
{
    public class CourseDTO
    {
        public string CourseId { get; set; }

        public string Name { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int NumberOfStudents { get; set; }

        public int LimitStudent { get; set; }

        public decimal CourseFee { get; set; }

        public decimal PassTheoryLs { get; set; }

        public string TheoryTeacher { get; set; }

        public int PassKm { get; set; }

        public DateTime? CreateTime { get; set; }

        public int CourseMonth { get; set; }

        public int CourseYear { get; set; }

        public bool Status { get; set; }
    }
}
