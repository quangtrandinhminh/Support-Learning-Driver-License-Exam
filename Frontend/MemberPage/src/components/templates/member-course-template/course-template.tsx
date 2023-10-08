import CourseCommitment from "../../molecules/course-commitment/course-commitment"
import CourseContent from "../../molecules/course-content/course-content"
import CourseTable from "../../molecules/course-table/course-table"

function CourseTemplate() {
  return (
    <>
      <CourseTable />
      <CourseContent />
      <CourseCommitment />
    </>
  )
}

export default CourseTemplate
