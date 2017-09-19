

function LessonPreview(props) {
  return (
    <div className="LessonPreview" onClick={props.onLessonPreviewClick(props)}>
      <div className="LessonTitle">
        {props.lesson.name}
      </div>
      <div className="LessonDescription">
        {props.lesson.description} 
      </div>
    </div>
  )
}

export default LessonPreviewContainer;