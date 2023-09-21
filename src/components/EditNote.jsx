import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { editNote, fetchNotes } from "../store/api/NoteSlice";
import { useParams, useNavigate } from "react-router-dom";

const EditNote = () => {
  const dispatch = useDispatch();
  const [initialValues, setCurrentNote] = useState({
    title: "",
    content: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  const notes = useSelector((state) => state.note.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  useEffect(() => {
    const note = notes.find((note) => note.id === Number(params.id));
    if (note) {
      setCurrentNote(note);
    }
  }, [notes, params.id]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("content is required"),
  });

  const handleSubmit = (values, {resetForm}) => {
    dispatch(
      editNote({
        noteId: Number(params.id),
        updatedNote: values,
      })
    ).then(() => {
      navigate("/");
    });
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form>
          <div className="mb-5">
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Title"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500"
            />
          </div>

          <div className="mb-5">
            <Field
              as="textarea"
              name="content"
              placeholder="Body"
              className="border border-gray-300 shadow p-3 w-full rounded mb-"
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-red-500"
            />
          </div>

          <button
            type="submit"
            className="block w-full bg-yellow-400 text-black font-bold p-4 rounded-lg hover:bg-yellow-500"
          >
            Update Note
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditNote;
