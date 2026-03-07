import { useEffect, useRef, useState } from "react";
import { callSupabase } from "../../../../../helpers/supabaseWrapper";

const useAddQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionImage, setQuestionImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const fileRefQuestion = useRef(null);

  const [options, setOptions] = useState([
    { text: "", image: null, preview: null },
    { text: "", image: null, preview: null },
    { text: "", image: null, preview: null },
    { text: "", image: null, preview: null },
  ]);

  const [correctIndex, setCorrectIndex] = useState(0);
  const [subjectId, setSubjectId] = useState(null);
  const [classId, setClassId] = useState(null);

  const uploadImage = async (file, folder) => {
    if (!file) return null;

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await callSupabase((sb) =>
      sb.storage.from("question-images").upload(`${folder}/${fileName}`, file)
    );

    if (error) throw error;

    const { data } = await callSupabase((sb) =>
      sb.storage.from("question-images").getPublicUrl(`${folder}/${fileName}`)
    );

    return data.publicUrl;
  };

  const AddQuestion = async () => {
      setErrorMessage(null);
      setMessage(null);
      setIsCreating(true);
    try {

      // get logged in user
      const { data: sessionData } = await callSupabase((sb) =>
        sb.auth.getUser()
      );

      const userId = sessionData?.user?.id;

      // get admin profile
      const { data: adminProfile } = await callSupabase((sb) =>
        sb.from("profile").select("school_id").eq("id", userId).single()
      );

      const schoolId = adminProfile.school_id;

      console.log(userId);

      const questionImageUrl = await uploadImage(questionImage, "questions");

      const { data: question, error: qError } = await callSupabase((sb) =>
        sb
          .from("questions")
          .insert({
            question_text: questionTitle,
            question_image: questionImageUrl,
            subject_id: subjectId,
            class_id: classId,
            school_id: schoolId,
          })
          .select()
          .single()
      );

      if (qError) throw qError;

      const questionId = question.id;

      const optionRows = [];

      for (let i = 0; i < options.length; i++) {
        const imageUrl = await uploadImage(options[i].image, "options");

        optionRows.push({
          question_id: questionId,
          option_text: options[i].text,
          option_image: imageUrl,
          is_correct: i === correctIndex,
        });
      }

      const { error: optionError } = await callSupabase((sb) =>
        sb.from("options").insert(optionRows)
      );

      if (optionError) throw optionError;

       setMessage("Question created successfully");
       setIsCreating(false);
    } catch (error) {
      console.error(error);
      setErrorMessage("Error creating question", error);
      setIsCreating(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setQuestionImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleOptionImageChange = (e, index) => {
    const file = e.target.files[0];

    if (!file) return;

    const copy = [...options];
    copy[index].image = file;
    copy[index].preview = URL.createObjectURL(file);

    setOptions(copy);
  };

    useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data: sessionData } = await callSupabase((sb) =>
          sb.auth.getUser()
        );

        const userId = sessionData?.user?.id;

        const { data: adminProfile } = await callSupabase((sb) =>
          sb.from("profile").select("school_id").eq("id", userId).single()
        );

        const schoolId = adminProfile.school_id;

        const { data: classes } = await callSupabase((sb) =>
          sb.from("classes").select("name, id").eq("school_id", schoolId)
        );

        const { data: subjects } = await callSupabase((sb) =>
          sb.from("subjects").select("name, id").eq("school_id", schoolId)
        );

        setClasses(classes || []);
        setSubjects(subjects || []);
      } catch (err) {
        console.error("Error fetching classes:", err);
      }
    };

    fetchClasses();
  }, []);

  return {
    questionTitle,
    setQuestionTitle,
    questionImage,
    preview,
    fileRefQuestion,
    handleImageChange,
    options,
    setOptions,
    handleOptionImageChange,
    correctIndex,
    setCorrectIndex,
    subjectId,
    setSubjectId,
    classId,
    setClassId,
    classes,
    AddQuestion,
    message,
    errorMessage,
    subjects,
    isCreating,
  };
};

export default useAddQuestion;